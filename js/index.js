/*
=========================================================
    Source by PBL
    PBL | HOME Source v1.0
=========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       GLOBAL
    ========================================================= */

    const musicBtn = document.getElementById("music-btn");
    const bgMusic = document.getElementById("bg-music");
    const grid = document.getElementById("contribution-grid");
    const typingText = document.getElementById("typing-text");


    /* =========================================================
       PLAYLIST
    ========================================================= */

    const playlist = [

        {
            name: "Anh Nhớ Em",
            url: "https://files.catbox.moe/ihobra.mp3"
        },

        {
            name: "Rồi mùa yêu thương dần đang đến",
            url: "https://files.catbox.moe/bgwso3.mp3"
        },

        {
            name: "Chỉ bằng cái gật đầu",
            url: "https://files.catbox.moe/s1hyzo.mp3"
        },

        {
            name: "Đừng quên tên anh",
            url: "https://files.catbox.moe/h43f1s.mp3"
        },

        {
            name: "Hối hận trong anh",
            url: "https://files.catbox.moe/aebu0g.mp3"
        },

        {
            name: "Anh từng cố gắng",
            url: "https://files.catbox.moe/mm085n.mp3"
        },

        {
            name: "Hình bóng em",
            url: "https://files.catbox.moe/21c1fl.mp3"
        },

        {
            name: "Lời chúc không thật",
            url: "https://files.catbox.moe/v6sqz2.mp3"
        },

        {
            name: "Quên anh trong từng cơn đau",
            url: "https://files.catbox.moe/crphp2.mp3"
        },

        {
            name: "Em nào có tội",
            url: "https://thanhdieu.com/files/Em-Nào-Có-Tội.mp3"
        },

        {
            name: "Anh đã quen với cô đơn",
            url: "https://thanhdieu.com/files/Anh-Đã-Quen-Với-Cô-Đơn.mp3"
        },

        {
            name: "Về bên anh",
            url: "https://thanhdieu.com/files/Về-Bên-Anh.mp3"
        }

    ];


    /* =========================================================
       MUSIC VARIABLES
    ========================================================= */

    let currentSong = -1;
    let hasStarted = false;

    let audioContext = null;
    let analyser = null;
    let audioSource = null;
    let audioData = null;

    let visualizerStarted = false;


    /* =========================================================
       CREATE AUDIO ANALYSER
    ========================================================= */

    function setupAudioAnalyser() {

        if (!bgMusic) {
            return;
        }

        if (audioContext) {
            return;
        }

        try {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

            analyser =
                audioContext.createAnalyser();

            analyser.fftSize = 256;

            analyser.smoothingTimeConstant = 0.82;

            audioData =
                new Uint8Array(
                    analyser.frequencyBinCount
                );

            audioSource =
                audioContext.createMediaElementSource(
                    bgMusic
                );

            audioSource.connect(analyser);

            analyser.connect(
                audioContext.destination
            );

        } catch (error) {

            console.error(
                "Không thể tạo Audio Analyser:",
                error
            );

        }
    }


    /* =========================================================
       RESUME AUDIO CONTEXT
    ========================================================= */

    async function resumeAudioContext() {

        if (
            audioContext &&
            audioContext.state === "suspended"
        ) {

            try {

                await audioContext.resume();

            } catch (error) {

                console.log(
                    "AudioContext resume error:",
                    error
                );

            }

        }

    }


    /* =========================================================
       LOAD SONG
    ========================================================= */

    function loadSong(index) {

        if (!bgMusic || playlist.length === 0) {
            return;
        }

        if (index < 0) {
            index = playlist.length - 1;
        }

        if (index >= playlist.length) {
            index = 0;
        }

        currentSong = index;

        bgMusic.pause();

        bgMusic.currentTime = 0;

        bgMusic.src =
            playlist[currentSong].url;

        bgMusic.load();

        console.log(
            "Đang tải:",
            playlist[currentSong].name
        );

    }


    /* =========================================================
       PLAYING STATE
    ========================================================= */

    function setPlayingState() {

        if (!musicBtn) {
            return;
        }

        musicBtn.classList.add("playing");

        musicBtn.innerHTML =
            '<i class="fa-solid fa-music"></i>';

    }


    /* =========================================================
       PAUSED STATE
    ========================================================= */

    function setPausedState() {

        if (!musicBtn) {
            return;
        }

        musicBtn.classList.remove("playing");

        musicBtn.innerHTML =
            '<i class="fa-solid fa-music"></i>';

    }


    /* =========================================================
       PLAY MUSIC
    ========================================================= */

    async function playMusic() {

        if (!bgMusic) {
            return false;
        }

        try {

            await resumeAudioContext();

            await bgMusic.play();

            setPlayingState();

            console.log(
                "Đang phát:",
                playlist[currentSong].name
            );

            return true;

        } catch (error) {

            console.error(
                "Không thể phát nhạc:",
                error
            );

            setPausedState();

            return false;

        }

    }


    /* =========================================================
       FIRST PLAY
    ========================================================= */

    async function startMusic() {

        if (!bgMusic || playlist.length === 0) {
            return;
        }

        setupAudioAnalyser();

        await resumeAudioContext();

        if (!hasStarted) {

            hasStarted = true;

            currentSong =
                Math.floor(
                    Math.random() *
                    playlist.length
                );

            loadSong(currentSong);

        }

        /*
         * Vì đây được gọi trực tiếp từ
         * click nút "Có", trình duyệt cho phép
         * phát audio.
         */

        const success =
            await playMusic();

        if (!success) {

            nextSong();

        }

    }


    /*
     * Cho Toast gọi hàm này
     */

    window.pblStartMusic =
        startMusic;


    /* =========================================================
       NEXT SONG
    ========================================================= */

    async function nextSong() {

        if (!bgMusic || playlist.length === 0) {
            return;
        }

        hasStarted = true;

        currentSong++;

        if (
            currentSong >=
            playlist.length
        ) {

            currentSong = 0;

        }

        loadSong(currentSong);

        /*
         * Đợi browser load audio
         */

        try {

            await new Promise(
                function (resolve, reject) {

                    let finished = false;

                    function ready() {

                        if (finished) {
                            return;
                        }

                        finished = true;

                        bgMusic.removeEventListener(
                            "canplay",
                            ready
                        );

                        bgMusic.removeEventListener(
                            "error",
                            failed
                        );

                        resolve();

                    }

                    function failed() {

                        if (finished) {
                            return;
                        }

                        finished = true;

                        bgMusic.removeEventListener(
                            "canplay",
                            ready
                        );

                        bgMusic.removeEventListener(
                            "error",
                            failed
                        );

                        reject();

                    }

                    bgMusic.addEventListener(
                        "canplay",
                        ready
                    );

                    bgMusic.addEventListener(
                        "error",
                        failed
                    );

                    /*
                     * Một số browser đã load sẵn
                     */

                    if (
                        bgMusic.readyState >= 3
                    ) {

                        ready();

                    }

                }
            );

            await playMusic();

        } catch (error) {

            console.log(
                "Bài lỗi, chuyển bài tiếp theo..."
            );

            setTimeout(
                nextSong,
                300
            );

        }

    }


    /* =========================================================
       MUSIC BUTTON
       
       Lần đầu:
       RANDOM + PLAY

       Những lần sau:
       NEXT SONG
    ========================================================= */

    if (musicBtn && bgMusic) {

        musicBtn.addEventListener(
            "click",
            async function () {

                setupAudioAnalyser();

                await resumeAudioContext();

                /*
                 * Lần đầu bấm
                 */

                if (!hasStarted) {

                    await startMusic();

                    return;

                }

                /*
                 * Những lần sau
                 * → NEXT BÀI
                 */

                await nextSong();

            }
        );


        /* =====================================================
           HẾT BÀI
        ===================================================== */

        bgMusic.addEventListener(
            "ended",
            function () {

                console.log(
                    "Hết bài:",
                    playlist[currentSong].name
                );

                nextSong();

            }
        );


        /* =====================================================
           AUDIO ERROR
        ===================================================== */

        bgMusic.addEventListener(
            "error",
            function () {

                if (!hasStarted) {
                    return;
                }

                console.log(
                    "Không tải được:",
                    playlist[currentSong]
                        ? playlist[currentSong].name
                        : "Unknown"
                );

                setTimeout(
                    function () {

                        nextSong();

                    },
                    500
                );

            }
        );

    }


    /* =========================================================
       LED CONTRIBUTION GRID
       
       7 ROWS
       52 COLUMNS
       
       Không random nhấp nháy.
       Tạo hiệu ứng sóng chạy ngang.
    ========================================================= */

    let dots = [];

    const rows = 7;
    const cols = 52;


    if (grid) {

        grid.innerHTML = "";

        for (
            let i = 0;
            i < rows * cols;
            i++
        ) {

            const dot =
                document.createElement("div");

            dot.className = "dot";

            grid.appendChild(dot);

            dots.push(dot);

        }

    }


    /* =========================================================
       LED WAVE
    ========================================================= */

    function renderLEDWave(time) {

        if (!grid || dots.length === 0) {
            return;
        }

        const audioValues =
            analyser && audioData
                ? getAudioValues()
                : null;


        for (
            let column = 0;
            column < cols;
            column++
        ) {

            /*
             * Sóng chính
             */

            const wave =
                (
                    Math.sin(
                        column * 0.42 -
                        time * 0.005
                    ) + 1
                ) / 2;


            /*
             * Sóng phụ
             */

            const wave2 =
                (
                    Math.sin(
                        column * 0.19 -
                        time * 0.0025
                    ) + 1
                ) / 2;


            let height =
                1 +
                Math.floor(
                    wave * 3.5 +
                    wave2 * 1.5
                );


            /*
             * Nếu đang phát nhạc
             * → lấy bass/frequency
             */

            if (audioValues) {

                const frequency =
                    audioValues[
                        Math.floor(
                            column /
                            cols *
                            audioValues.length
                        )
                    ] || 0;


                const audioBoost =
                    frequency / 255;


                height +=
                    Math.floor(
                        audioBoost * 3
                    );

            }


            /*
             * Giới hạn chiều cao
             */

            height =
                Math.max(
                    1,
                    Math.min(
                        rows,
                        height
                    )
                );


            /*
             * Render từng cột
             */

            for (
                let row = 0;
                row < rows;
                row++
            ) {

                const index =
                    row * cols +
                    column;

                const dot =
                    dots[index];

                if (!dot) {
                    continue;
                }


                /*
                 * Từ dưới lên
                 */

                const active =
                    row >=
                    rows - height;


                if (active) {

                    dot.classList.add(
                        "jd-active"
                    );

                } else {

                    dot.classList.remove(
                        "jd-active"
                    );

                }

            }

        }


        requestAnimationFrame(
            renderLEDWave
        );

    }


    /* =========================================================
       AUDIO DATA
    ========================================================= */

    function getAudioValues() {

        if (
            !analyser ||
            !audioData
        ) {

            return null;

        }

        analyser.getByteFrequencyData(
            audioData
        );

        return audioData;

    }


    /*
     * Chạy visualizer
     */

    if (!visualizerStarted) {

        visualizerStarted = true;

        requestAnimationFrame(
            renderLEDWave
        );

    }


    /* =========================================================
       TYPING EFFECT
    ========================================================= */

    if (typingText) {

        const typingMessages = [

            {
                text:
                    "Hello everyone. I'm Phạm Bảo Long",
                className:
                    "typing-style-1"
            },

            {
                text:
                    "I'm a Developer",
                className:
                    "typing-style-2"
            },

            {
                text:
                    "Welcome to my website",
                className:
                    "typing-style-3"
            },

            {
                text:
                    "Cần lên Locket Gold vĩnh viễn ib nha",
                className:
                    "typing-style-4"
            },

            {
                text:
                    "Have a nice day ✨",
                className:
                    "typing-style-5"
            },

            {
                text:
                    "Thank you for visiting!",
                className:
                    "typing-style-6"
            }

        ];


        let messageIndex = 0;

        let charIndex = 0;

        let deleting = false;


        const typingSpeed = 75;

        const deletingSpeed = 40;

        const pauseAfterTyping = 1800;

        const pauseAfterDeleting = 500;


        function typingEffect() {

            const current =
                typingMessages[
                    messageIndex
                ];


            typingText.className =
                current.className;


            if (!deleting) {

                typingText.textContent =
                    current.text.substring(
                        0,
                        charIndex + 1
                    );

                charIndex++;


                if (
                    charIndex >=
                    current.text.length
                ) {

                    setTimeout(
                        function () {

                            deleting = true;

                            typingEffect();

                        },
                        pauseAfterTyping
                    );

                    return;

                }


                setTimeout(
                    typingEffect,
                    typingSpeed
                );


            } else {

                charIndex--;


                typingText.textContent =
                    current.text.substring(
                        0,
                        charIndex
                    );


                if (charIndex <= 0) {

                    charIndex = 0;

                    deleting = false;

                    messageIndex++;


                    if (
                        messageIndex >=
                        typingMessages.length
                    ) {

                        messageIndex = 0;

                    }


                    setTimeout(
                        typingEffect,
                        pauseAfterDeleting
                    );

                    return;

                }


                setTimeout(
                    typingEffect,
                    deletingSpeed
                );

            }

        }


        typingEffect();

    }


    /* =========================================================
       LOADING OVERLAY + TOAST
    ========================================================= */

    const overlay =
        document.createElement("div");

    overlay.id =
        "pbl-loading-overlay";


    /*
     * Inline CSS để không cần sửa CSS cũ
     */

    Object.assign(
        overlay.style,
        {

            position: "fixed",

            inset: "0",

            width: "100%",

            height: "100%",

            background:
                "rgba(0,0,0,0.58)",

            backdropFilter:
                "blur(7px)",

            WebkitBackdropFilter:
                "blur(7px)",

            zIndex: "99998",

            opacity: "0",

            visibility: "hidden",

            transition:
                "opacity .35s ease",

            pointerEvents: "all"

        }
    );


    document.body.appendChild(
        overlay
    );


    /* =========================================================
       TOAST
    ========================================================= */

    const toast =
        document.createElement("div");


    toast.id =
        "pbl-loading-toast";


    toast.innerHTML = `

        <div class="pbl-toast-title">

            <i
                class="fa-solid fa-spinner fa-spin">
            </i>

            PBL | HOME

        </div>


        <div
            class="pbl-toast-message"
            id="pbl-toast-message">

            Đang tải website...

        </div>


        <div
            class="pbl-loading-bar">

            <div
                id="pbl-loading-progress">
            </div>

        </div>


        <span
            id="pbl-loading-percent">

            0%

        </span>

    `;


    /*
     * Ép toast ra giữa màn hình
     * và lớn hơn CSS cũ một chút
     */

    Object.assign(
        toast.style,
        {

            position: "fixed",

            top: "50%",

            left: "50%",

            transform:
                "translate(-50%, -50%) scale(.95)",

            width:
                "min(480px, calc(100% - 30px))",

            padding:
                "28px 30px",

            background:
                "rgba(12,12,12,.94)",

            border:
                "1px solid rgba(255,255,255,.22)",

            borderRadius:
                "24px",

            backdropFilter:
                "blur(22px)",

            WebkitBackdropFilter:
                "blur(22px)",

            boxShadow:
                "0 25px 80px rgba(0,0,0,.75)",

            zIndex: "99999",

            opacity: "0",

            visibility: "hidden",

            transition:
                "opacity .35s ease, transform .35s ease",

            boxSizing: "border-box",

            textAlign: "center"

        }
    );


    document.body.appendChild(
        toast
    );


    /* =========================================================
       TOAST ELEMENTS
    ========================================================= */

    const progress =
        document.getElementById(
            "pbl-loading-progress"
        );

    const percent =
        document.getElementById(
            "pbl-loading-percent"
        );

    const message =
        document.getElementById(
            "pbl-toast-message"
        );


    /*
     * Toast title
     */

    const toastTitle =
        toast.querySelector(
            ".pbl-toast-title"
        );


    if (toastTitle) {

        toastTitle.style.fontSize =
            "1.25rem";

        toastTitle.style.marginBottom =
            "12px";

    }


    /*
     * Message
     */

    if (message) {

        message.style.fontSize =
            "1rem";

        message.style.lineHeight =
            "1.7";

        message.style.marginBottom =
            "18px";

    }


    /*
     * Loading bar
     */

    const loadingBar =
        toast.querySelector(
            ".pbl-loading-bar"
        );


    if (loadingBar) {

        loadingBar.style.height =
            "8px";

        loadingBar.style.marginTop =
            "15px";

        loadingBar.style.borderRadius =
            "20px";

    }


    /*
     * Progress
     */

    if (progress) {

        progress.style.width =
            "0%";

        progress.style.height =
            "100%";

        progress.style.background =
            "linear-gradient(90deg,#a8edea,#fed6e3,#fac1ff,#d4fc79,#96e6a1)";

        progress.style.backgroundSize =
            "200% auto";

        progress.style.animation =
            "rainbow_move 3s linear infinite";

        progress.style.transition =
            "width .12s linear";

    }


    /*
     * Percent
     */

    if (percent) {

        percent.style.display =
            "block";

        percent.style.marginTop =
            "10px";

        percent.style.fontWeight =
            "700";

    }


    /* =========================================================
       SHOW TOAST
    ========================================================= */

    requestAnimationFrame(
        function () {

            overlay.style.opacity =
                "1";

            overlay.style.visibility =
                "visible";


            toast.style.opacity =
                "1";

            toast.style.visibility =
                "visible";

            toast.style.transform =
                "translate(-50%, -50%) scale(1)";

        }
    );


    /* =========================================================
       LOADING
    ========================================================= */

    let loadingPercent = 0;


    const loadingInterval =
        setInterval(
            function () {

                loadingPercent +=
                    Math.floor(
                        Math.random() * 7
                    ) + 2;


                if (
                    loadingPercent >=
                    100
                ) {

                    loadingPercent = 100;

                    clearInterval(
                        loadingInterval
                    );

                }


                if (progress) {

                    progress.style.width =
                        loadingPercent + "%";

                }


                if (percent) {

                    percent.textContent =
                        loadingPercent + "%";

                }


                if (
                    loadingPercent >=
                    100
                ) {

                    setTimeout(
                        showMusicQuestion,
                        450
                    );

                }

            },
            80
        );


    /* =========================================================
       SHOW MUSIC QUESTION
    ========================================================= */

    function showMusicQuestion() {

        const musicIcon =
            toast.querySelector(
                ".pbl-toast-title i"
            );


        if (musicIcon) {

            musicIcon.className =
                "fa-solid fa-circle-check";

        }


        message.innerHTML =
            "Load web thành công! 🎉<br>" +
            "Bạn có muốn bật nhạc không?";


        if (loadingBar) {

            loadingBar.style.display =
                "none";

        }


        if (percent) {

            percent.style.display =
                "none";

        }


        /*
         * Buttons
         */

        const buttons =
            document.createElement("div");


        buttons.className =
            "pbl-music-buttons";


        buttons.style.display =
            "flex";

        buttons.style.justifyContent =
            "center";

        buttons.style.gap =
            "14px";

        buttons.style.marginTop =
            "22px";


        buttons.innerHTML = `

            <button
                type="button"
                class="pbl-music-btn yes"
                id="pbl-music-yes">

                <i
                    class="fa-solid fa-volume-high">
                </i>

                Có

            </button>


            <button
                type="button"
                class="pbl-music-btn no"
                id="pbl-music-no">

                <i
                    class="fa-solid fa-volume-xmark">
                </i>

                Không

            </button>

        `;


        /*
         * Style buttons
         */

        const allButtons =
            buttons.querySelectorAll(
                ".pbl-music-btn"
            );


        allButtons.forEach(
            function (button) {

                Object.assign(
                    button.style,
                    {

                        border: "0",

                        padding:
                            "12px 24px",

                        borderRadius:
                            "12px",

                        color: "#fff",

                        fontFamily:
                            "Quicksand, sans-serif",

                        fontSize:
                            "15px",

                        fontWeight:
                            "700",

                        cursor:
                            "pointer",

                        transition:
                            ".25s ease",

                        background:
                            "rgba(255,255,255,.12)"

                    }
                );


                button.addEventListener(
                    "mouseenter",
                    function () {

                        button.style.transform =
                            "translateY(-3px)";

                        button.style.background =
                            "rgba(255,255,255,.22)";

                    }
                );


                button.addEventListener(
                    "mouseleave",
                    function () {

                        button.style.transform =
                            "translateY(0)";

                        button.style.background =
                            "rgba(255,255,255,.12)";

                    }
                );

            }
        );


        toast.appendChild(
            buttons
        );


        /* =====================================================
           CÓ
        ===================================================== */

        const yes =
            document.getElementById(
                "pbl-music-yes"
            );


        if (yes) {

            yes.addEventListener(
                "click",
                async function () {

                    yes.disabled = true;

                    /*
                     * Phát trực tiếp trong
                     * user gesture
                     */

                    await startMusic();

                    closeToast();

                }
            );

        }


        /* =====================================================
           KHÔNG
        ===================================================== */

        const no =
            document.getElementById(
                "pbl-music-no"
            );


        if (no) {

            no.addEventListener(
                "click",
                function () {

                    closeToast();

                }
            );

        }

    }


    /* =========================================================
       CLOSE TOAST
    ========================================================= */

    function closeToast() {

        toast.style.opacity =
            "0";

        toast.style.visibility =
            "hidden";

        toast.style.transform =
            "translate(-50%, -50%) scale(.95)";


        overlay.style.opacity =
            "0";

        overlay.style.visibility =
            "hidden";


        setTimeout(
            function () {

                if (toast) {
                    toast.remove();
                }

                if (overlay) {
                    overlay.remove();
                }

            },
            400
        );

    }


    /* =========================================================
       FLYING FISH BACKGROUND
    ========================================================= */

    if (
        typeof jQuery !== "undefined" &&
        document.getElementById(
            "jsi-flying-fish-container"
        )
    ) {

        const $ =
            jQuery;


        const container =
            document.getElementById(
                "jsi-flying-fish-container"
            );


        const canvas =
            document.createElement(
                "canvas"
            );


        container.appendChild(
            canvas
        );


        const ctx =
            canvas.getContext(
                "2d"
            );


        let width =
            window.innerWidth;

        let height =
            window.innerHeight;


        function resizeCanvas() {

            width =
                window.innerWidth;

            height =
                window.innerHeight;


            canvas.width =
                width;

            canvas.height =
                height;

        }


        resizeCanvas();


        window.addEventListener(
            "resize",
            resizeCanvas
        );


        const fish = [];


        const fishCount =
            Math.max(
                3,
                Math.floor(
                    width / 500
                )
            );


        for (
            let i = 0;
            i < fishCount;
            i++
        ) {

            fish.push({

                x:
                    Math.random() *
                    width,

                y:
                    height *
                    (
                        0.25 +
                        Math.random() *
                        0.5
                    ),

                size:
                    18 +
                    Math.random() *
                    30,

                speed:
                    0.2 +
                    Math.random() *
                    0.45,

                wave:
                    Math.random() *
                    Math.PI *
                    2,

                alpha:
                    0.12 +
                    Math.random() *
                    0.15

            });

        }


        function drawFish(f) {

            ctx.save();


            ctx.translate(
                f.x,
                f.y
            );


            ctx.globalAlpha =
                f.alpha;


            ctx.fillStyle =
                "#ffffff";


            ctx.beginPath();


            /*
             * Body
             */

            ctx.ellipse(
                0,
                0,
                f.size,
                f.size * 0.45,
                0,
                0,
                Math.PI * 2
            );


            ctx.fill();


            /*
             * Tail
             */

            ctx.beginPath();

            ctx.moveTo(
                -f.size,
                0
            );

            ctx.lineTo(
                -f.size * 1.65,
                -f.size * 0.55
            );

            ctx.lineTo(
                -f.size * 1.65,
                f.size * 0.55
            );

            ctx.closePath();

            ctx.fill();


            /*
             * Fin
             */

            ctx.beginPath();

            ctx.moveTo(
                0,
                -f.size * 0.3
            );

            ctx.lineTo(
                f.size * 0.4,
                -f.size * 0.8
            );

            ctx.lineTo(
                f.size * 0.65,
                -f.size * 0.15
            );

            ctx.closePath();

            ctx.fill();


            ctx.restore();

        }


        function animateFish() {

            ctx.clearRect(
                0,
                0,
                width,
                height
            );


            fish.forEach(
                function (f) {

                    f.x +=
                        f.speed;

                    f.wave +=
                        0.015;

                    f.y +=
                        Math.sin(
                            f.wave
                        ) * 0.25;


                    if (
                        f.x >
                        width +
                        f.size * 3
                    ) {

                        f.x =
                            -f.size * 3;

                        f.y =
                            height *
                            (
                                0.25 +
                                Math.random() *
                                0.5
                            );

                    }


                    drawFish(f);

                }
            );


            requestAnimationFrame(
                animateFish
            );

        }


        animateFish();

    }


    /* =========================================================
       PREVENT RIGHT CLICK ON IMAGES
    ========================================================= */

    document.addEventListener(
        "contextmenu",
        function (event) {

            if (
                event.target.tagName ===
                "IMG"
            ) {

                event.preventDefault();

            }

        }
    );

});
