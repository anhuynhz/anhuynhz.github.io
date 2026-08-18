/*
=========================================================
    Source by PBL
    PBL | HOME Source v1.0
    Main JavaScript
=========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       CONFIG
    ===================================================== */

    const musicList = [
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


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const musicBtn = document.getElementById("music-btn");
    const audio = document.getElementById("bg-music");
    const contributionGrid =
        document.getElementById("contribution-grid");


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const typingText =
        document.getElementById("typing-text");

    const typingMessages = [
        "Welcome to PBL | HOME",
        "Pham Bao Long",
        "HTML | CSS | JavaScript",
        "Developer",
        "Student",
        "Hưng Yên, Việt Nam",
        "Always learning..."
    ];

    let typingMessageIndex = 0;
    let typingCharIndex = 0;
    let typingDeleting = false;

    const typingSpeed = 75;
    const deletingSpeed = 40;
    const typingDelay = 1500;

    function typingEffect() {

        if (!typingText) {
            return;
        }

        const currentMessage =
            typingMessages[typingMessageIndex];


        if (!typingDeleting) {

            typingText.textContent =
                currentMessage.substring(
                    0,
                    typingCharIndex + 1
                );

            typingCharIndex++;


            if (
                typingCharIndex >=
                currentMessage.length
            ) {

                typingDeleting = true;

                setTimeout(
                    typingEffect,
                    typingDelay
                );

                return;
            }


            setTimeout(
                typingEffect,
                typingSpeed
            );

        } else {

            typingText.textContent =
                currentMessage.substring(
                    0,
                    typingCharIndex - 1
                );

            typingCharIndex--;


            if (typingCharIndex <= 0) {

                typingDeleting = false;

                typingMessageIndex =
                    (typingMessageIndex + 1) %
                    typingMessages.length;

                setTimeout(
                    typingEffect,
                    400
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


    /* =====================================================
       LED / CONTRIBUTION GRID
    ===================================================== */

    function createContributionGrid() {

        if (!contributionGrid) {
            return;
        }

        contributionGrid.innerHTML = "";


        /*
            52 tuần x 7 ngày
        */

        const totalDots = 52 * 7;

        for (
            let i = 0;
            i < totalDots;
            i++
        ) {

            const dot =
                document.createElement("div");

            dot.className = "dot";


            /*
                Tạo pattern ngẫu nhiên
            */

            const random =
                Math.random();


            if (random > 0.58) {

                dot.classList.add(
                    "jd-active"
                );

            }


            contributionGrid.appendChild(dot);
        }
    }

    createContributionGrid();


    /* =====================================================
       LED ANIMATION
    ===================================================== */

    function animateLED() {

        if (!contributionGrid) {
            return;
        }

        const dots =
            contributionGrid.querySelectorAll(
                ".dot"
            );

        if (!dots.length) {
            return;
        }


        /*
            Một vài LED ngẫu nhiên sáng lên
        */

        const amount =
            Math.floor(
                Math.random() * 10
            ) + 4;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    dots.length
                );

            const dot =
                dots[randomIndex];


            dot.classList.add(
                "jd-active"
            );


            setTimeout(
                function () {

                    /*
                        Chỉ tắt một số LED,
                        giữ hiệu ứng tự nhiên
                    */

                    if (
                        Math.random() > 0.35
                    ) {

                        dot.classList.remove(
                            "jd-active"
                        );

                    }

                },
                400 + Math.random() * 1200
            );
        }
    }


    setInterval(
        animateLED,
        250
    );


    /* =====================================================
       MUSIC SYSTEM
    ===================================================== */

    let currentSong = 0;
    let musicStarted = false;


    function loadSong(index, autoplay = false) {

        if (!audio || !musicList.length) {
            return;
        }

        currentSong =
            (index + musicList.length) %
            musicList.length;


        const song =
            musicList[currentSong];


        audio.src = song.url;

        audio.load();


        /*
            Lưu tên bài hiện tại
        */

        audio.dataset.songName =
            song.name;


        if (autoplay) {

            const playPromise =
                audio.play();


            if (
                playPromise !== undefined
            ) {

                playPromise
                    .then(function () {

                        musicStarted = true;

                        setMusicPlayingState(
                            true
                        );

                    })
                    .catch(function (error) {

                        console.log(
                            "Không thể phát nhạc:",
                            error
                        );

                        setMusicPlayingState(
                            false
                        );

                    });
            }
        }
    }


    function playMusic() {

        if (!audio) {
            return;
        }


        /*
            Nếu chưa có bài thì load bài đầu
        */

        if (!audio.src) {

            loadSong(
                currentSong,
                false
            );

        }


        const promise =
            audio.play();


        if (
            promise !== undefined
        ) {

            promise
                .then(function () {

                    musicStarted = true;

                    setMusicPlayingState(
                        true
                    );

                })
                .catch(function (error) {

                    console.log(
                        "Browser chặn phát nhạc:",
                        error
                    );

                });
        }
    }


    function pauseMusic() {

        if (!audio) {
            return;
        }

        audio.pause();

        musicStarted = false;

        setMusicPlayingState(
            false
        );
    }


    function setMusicPlayingState(
        playing
    ) {

        if (!musicBtn) {
            return;
        }

        if (playing) {

            musicBtn.classList.add(
                "playing"
            );

            musicBtn.innerHTML =
                '<i class="fa-solid fa-volume-high"></i>';

        } else {

            musicBtn.classList.remove(
                "playing"
            );

            musicBtn.innerHTML =
                '<i class="fa-solid fa-music"></i>';
        }
    }


    /*
        Nút nhạc
    */

    if (musicBtn) {

        musicBtn.addEventListener(
            "click",
            function () {

                if (
                    audio &&
                    !audio.paused
                ) {

                    pauseMusic();

                } else {

                    playMusic();

                }

            }
        );

    }


    /*
        Tự động chuyển bài
    */

    if (audio) {

        audio.addEventListener(
            "ended",
            function () {

                currentSong++;

                if (
                    currentSong >=
                    musicList.length
                ) {

                    currentSong = 0;

                }


                loadSong(
                    currentSong,
                    true
                );

            }
        );


        /*
            Nếu file nhạc lỗi thì
            chuyển bài tiếp theo
        */

        audio.addEventListener(
            "error",
            function () {

                console.log(
                    "Không tải được bài:",
                    musicList[currentSong]
                        ?.name
                );


                setTimeout(
                    function () {

                        currentSong++;

                        if (
                            currentSong >=
                            musicList.length
                        ) {

                            currentSong = 0;

                        }


                        loadSong(
                            currentSong,
                            true
                        );

                    },
                    1000
                );

            }
        );

    }


    /*
        Load bài đầu tiên
    */

    if (audio) {

        loadSong(
            0,
            false
        );

    }


    /* =====================================================
       TOAST OVERLAY
    ===================================================== */

    function createToastStyles() {

        if (
            document.getElementById(
                "pbl-toast-style"
            )
        ) {
            return;
        }


        const style =
            document.createElement("style");

        style.id =
            "pbl-toast-style";


        style.textContent = `

            /* ================================
               OVERLAY
            ================================= */

            #pbl-loading-overlay {
                position: fixed;
                inset: 0;

                width: 100%;
                height: 100%;

                background:
                    rgba(0, 0, 0, 0.62);

                backdrop-filter:
                    blur(8px);

                -webkit-backdrop-filter:
                    blur(8px);

                z-index: 99998;

                opacity: 1;

                transition:
                    opacity 0.45s ease;

                pointer-events:
                    auto;
            }


            #pbl-loading-overlay.hide {
                opacity: 0;

                pointer-events:
                    none;
            }


            /* ================================
               TOAST
            ================================= */

            #pbl-loading-toast {
                position: fixed;

                top: 50%;
                left: 50%;

                transform:
                    translate(-50%, -50%)
                    scale(0.92);

                width:
                    min(430px, calc(100vw - 40px));

                padding: 30px 28px;

                background:
                    rgba(15, 15, 15, 0.92);

                border:
                    1px solid
                    rgba(255, 255, 255, 0.22);

                border-radius:
                    24px;

                box-shadow:
                    0 25px 80px
                    rgba(0, 0, 0, 0.7);

                backdrop-filter:
                    blur(25px);

                -webkit-backdrop-filter:
                    blur(25px);

                color: #fff;

                z-index: 99999;

                box-sizing:
                    border-box;

                text-align:
                    center;

                opacity: 0;

                transition:
                    opacity 0.35s ease,
                    transform 0.35s ease;

                font-family:
                    'Quicksand',
                    sans-serif;
            }


            #pbl-loading-toast.show {
                opacity: 1;

                transform:
                    translate(-50%, -50%)
                    scale(1);
            }


            #pbl-loading-toast.hide {
                opacity: 0;

                transform:
                    translate(-50%, -50%)
                    scale(0.92);

                pointer-events:
                    none;
            }


            /* ================================
               TITLE
            ================================= */

            .pbl-toast-title {
                display:
                    flex;

                align-items:
                    center;

                justify-content:
                    center;

                gap: 11px;

                font-size:
                    1.3rem;

                font-weight:
                    800;

                margin-bottom:
                    14px;

                color:
                    #fff;
            }


            .pbl-toast-title i {
                font-size:
                    20px;
            }


            /*
                Icon loading xoay
            */

            .pbl-toast-title
            .pbl-spinner {
                animation:
                    pblSpinner
                    0.9s
                    linear
                    infinite;
            }


            @keyframes pblSpinner {

                from {
                    transform:
                        rotate(0deg);
                }

                to {
                    transform:
                        rotate(360deg);
                }

            }


            /* ================================
               MESSAGE
            ================================= */

            .pbl-toast-message {
                font-size:
                    0.95rem;

                font-weight:
                    600;

                line-height:
                    1.6;

                color:
                    rgba(
                        255,
                        255,
                        255,
                        0.9
                    );

                margin-bottom:
                    18px;
            }


            /* ================================
               LOADING BAR
            ================================= */

            .pbl-loading-bar {
                width:
                    100%;

                height:
                    10px;

                background:
                    rgba(
                        255,
                        255,
                        255,
                        0.1
                    );

                border-radius:
                    20px;

                overflow:
                    hidden;

                margin-top:
                    8px;
            }


            #pbl-loading-progress {
                width:
                    0%;

                height:
                    100%;

                border-radius:
                    inherit;

                background:
                    linear-gradient(
                        90deg,
                        #a8edea,
                        #fed6e3,
                        #fac1ff,
                        #d4fc79,
                        #96e6a1,
                        #a8edea
                    );

                background-size:
                    200% auto;

                animation:
                    pblRainbow
                    2s
                    linear
                    infinite;

                transition:
                    width 0.12s linear;
            }


            @keyframes pblRainbow {

                0% {
                    background-position:
                        0% center;
                }

                100% {
                    background-position:
                        200% center;
                }

            }


            /* ================================
               PERCENT
            ================================= */

            #pbl-loading-percent {
                display:
                    block;

                margin-top:
                    10px;

                font-size:
                    0.82rem;

                font-weight:
                    700;

                opacity:
                    0.75;
            }


            /* ================================
               MUSIC BUTTONS
            ================================= */

            .pbl-music-buttons {
                display:
                    flex;

                justify-content:
                    center;

                gap:
                    12px;

                margin-top:
                    22px;
            }


            .pbl-music-btn {
                border:
                    1px solid
                    rgba(
                        255,
                        255,
                        255,
                        0.2
                    );

                border-radius:
                    12px;

                padding:
                    12px 24px;

                min-width:
                    110px;

                color:
                    #fff;

                background:
                    rgba(
                        255,
                        255,
                        255,
                        0.1
                    );

                font-family:
                    'Quicksand',
                    sans-serif;

                font-size:
                    0.9rem;

                font-weight:
                    700;

                cursor:
                    pointer;

                transition:
                    0.25s ease;
            }


            .pbl-music-btn:hover {
                transform:
                    translateY(-3px);

                background:
                    rgba(
                        255,
                        255,
                        255,
                        0.2
                    );
            }


            .pbl-music-btn:active {
                transform:
                    scale(0.96);
            }


            .pbl-music-btn i {
                margin-right:
                    6px;
            }


            /* ================================
               MOBILE
            ================================= */

            @media (max-width: 480px) {

                #pbl-loading-toast {

                    width:
                        calc(100vw - 30px);

                    padding:
                        26px 20px;

                    border-radius:
                        21px;
                }


                .pbl-toast-title {

                    font-size:
                        1.15rem;
                }


                .pbl-toast-message {

                    font-size:
                        0.88rem;
                }


                .pbl-music-buttons {

                    gap:
                        9px;
                }


                .pbl-music-btn {

                    min-width:
                        95px;

                    padding:
                        11px 15px;
                }

            }

        `;


        document.head.appendChild(
            style
        );
    }


    createToastStyles();


    /* =====================================================
       CREATE TOAST
    ===================================================== */

    const overlay =
        document.createElement("div");

    overlay.id =
        "pbl-loading-overlay";


    const toast =
        document.createElement("div");

    toast.id =
        "pbl-loading-toast";


    toast.innerHTML = `

        <div class="pbl-toast-title">

            <i
                class="
                    fa-solid
                    fa-spinner
                    pbl-spinner
                ">
            </i>

            <span>
                PBL | HOME
            </span>

        </div>


        <div
            class="pbl-toast-message"
            id="pbl-toast-message">

            Đang tải website...

        </div>


        <div class="pbl-loading-bar">

            <div
                id="pbl-loading-progress">
            </div>

        </div>


        <span
            id="pbl-loading-percent">

            0%

        </span>

    `;


    document.body.appendChild(
        overlay
    );

    document.body.appendChild(
        toast
    );


    /*
        Hiện overlay + toast
    */

    requestAnimationFrame(
        function () {

            overlay.classList.remove(
                "hide"
            );

            toast.classList.add(
                "show"
            );

        }
    );


    /* =====================================================
       TOAST ELEMENTS
    ===================================================== */

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


    /* =====================================================
       LOADING
    ===================================================== */

    let loadingPercent = 0;


    const loadingInterval =
        setInterval(
            function () {

                loadingPercent +=
                    Math.floor(
                        Math.random() * 7
                    ) + 2;


                if (
                    loadingPercent >= 100
                ) {

                    loadingPercent =
                        100;

                    clearInterval(
                        loadingInterval
                    );

                }


                if (progress) {

                    progress.style.width =
                        loadingPercent +
                        "%";

                }


                if (percent) {

                    percent.textContent =
                        loadingPercent +
                        "%";

                }


                if (
                    loadingPercent >=
                    100
                ) {

                    setTimeout(
                        showMusicQuestion,
                        500
                    );

                }

            },
            80
        );


    /* =====================================================
       MUSIC QUESTION
    ===================================================== */

    function showMusicQuestion() {

        const icon =
            toast.querySelector(
                ".pbl-toast-title i"
            );


        if (icon) {

            icon.className =
                "fa-solid fa-circle-check";

        }


        if (message) {

            message.innerHTML =
                "Load web thành công! 🎉<br>" +
                "Bạn có muốn bật nhạc không?";

        }


        const loadingBar =
            toast.querySelector(
                ".pbl-loading-bar"
            );


        if (loadingBar) {

            loadingBar.style.display =
                "none";

        }


        if (percent) {

            percent.style.display =
                "none";

        }


        const buttons =
            document.createElement("div");

        buttons.className =
            "pbl-music-buttons";


        buttons.innerHTML = `

            <button
                class="pbl-music-btn yes"
                id="pbl-music-yes">

                <i
                    class="fa-solid
                           fa-volume-high">
                </i>

                Có

            </button>


            <button
                class="pbl-music-btn no"
                id="pbl-music-no">

                <i
                    class="fa-solid
                           fa-volume-xmark">
                </i>

                Không

            </button>

        `;


        toast.appendChild(
            buttons
        );


        /* ===============================================
           CÓ
        =============================================== */

        const yesBtn =
            document.getElementById(
                "pbl-music-yes"
            );


        if (yesBtn) {

            yesBtn.addEventListener(
                "click",
                function () {

                    /*
                        Vì đây là click của người dùng,
                        browser cho phép audio.play()
                    */

                    playMusic();

                    closeToast();

                }
            );

        }


        /* ===============================================
           KHÔNG
        =============================================== */

        const noBtn =
            document.getElementById(
                "pbl-music-no"
            );


        if (noBtn) {

            noBtn.addEventListener(
                "click",
                function () {

                    closeToast();

                }
            );

        }

    }


    /* =====================================================
       CLOSE TOAST
    ===================================================== */

    function closeToast() {

        toast.classList.remove(
            "show"
        );

        toast.classList.add(
            "hide"
        );


        overlay.classList.add(
            "hide"
        );


        /*
            Sau animation mới xóa
        */

        setTimeout(
            function () {

                if (toast) {
                    toast.remove();
                }

                if (overlay) {
                    overlay.remove();
                }

            },
            500
        );
    }


    /* =====================================================
       SAKURA / FALLING IMAGE
    ===================================================== */

    const sakuraContainer =
        document.getElementById(
            "sakura-container"
        );


    function createSakura() {

        if (!sakuraContainer) {
            return;
        }


        const sakura =
            document.createElement("div");

        sakura.className =
            "sakura";


        /*
            Random size
        */

        const size =
            Math.floor(
                Math.random() * 18
            ) + 15;


        sakura.style.width =
            size + "px";

        sakura.style.height =
            size + "px";


        /*
            Random position
        */

        sakura.style.left =
            Math.random() * 100 +
            "vw";


        /*
            Random wind
        */

        const wind =
            Math.floor(
                Math.random() * 300
            ) - 150;


        const rotate =
            Math.floor(
                Math.random() * 720
            ) - 360;


        sakura.style.setProperty(
            "--wind",
            wind + "px"
        );


        sakura.style.setProperty(
            "--rotate",
            rotate + "deg"
        );


        /*
            Random duration
        */

        const duration =
            Math.floor(
                Math.random() * 5
            ) + 7;


        sakura.style.animationDuration =
            duration + "s";


        sakuraContainer.appendChild(
            sakura
        );


        /*
            Xóa sau khi rơi
        */

        setTimeout(
            function () {

                sakura.remove();

            },
            (duration + 1) * 1000
        );
    }


    /*
        Tạo hoa liên tục
    */

    if (sakuraContainer) {

        setInterval(
            createSakura,
            550
        );


        /*
            Tạo sẵn vài bông
        */

        for (
            let i = 0;
            i < 8;
            i++
        ) {

            setTimeout(
                createSakura,
                i * 250
            );

        }

    }


    /* =====================================================
       DISABLE IMAGE DRAG
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(function (img) {

            img.addEventListener(
                "dragstart",
                function (event) {

                    event.preventDefault();

                }
            );

        });


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c PBL | HOME ",
        "color:#fff;" +
        "background:#111;" +
        "padding:8px 15px;" +
        "border-radius:8px;" +
        "font-weight:bold;"
    );

    console.log(
        "Welcome to PBL | HOME ❤️"
    );

});
