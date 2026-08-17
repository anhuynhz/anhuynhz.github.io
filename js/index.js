/*
=========================================================
    Source by PBL
    PBL | HOME Source v1.0
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const typingText = document.getElementById("typing-text");

    const typingMessages = [
        "Welcome to PBL | HOME",
        "Pham Bao Long",
        "Thằng bé đầy tham vọng",
        "HTML | CSS | JavaScript",
        "Have a nice day <3"
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typingStyles = [
        "typing-style-1",
        "typing-style-2",
        "typing-style-3",
        "typing-style-4",
        "typing-style-5",
        "typing-style-6"
    ];

    function changeTypingStyle() {

        if (!typingText) return;

        typingStyles.forEach(style => {
            typingText.classList.remove(style);
        });

        const randomStyle =
            typingStyles[
                Math.floor(
                    Math.random() * typingStyles.length
                )
            ];

        typingText.classList.add(randomStyle);
    }

    function typeEffect() {

        if (!typingText) return;

        const currentMessage =
            typingMessages[messageIndex];

        if (!deleting) {

            typingText.textContent =
                currentMessage.substring(
                    0,
                    charIndex + 1
                );

            charIndex++;

            if (charIndex >= currentMessage.length) {

                deleting = true;

                setTimeout(typeEffect, 1800);

                return;

            }

            setTimeout(typeEffect, 75);

        } else {

            typingText.textContent =
                currentMessage.substring(
                    0,
                    charIndex - 1
                );

            charIndex--;

            if (charIndex <= 0) {

                deleting = false;

                messageIndex =
                    (messageIndex + 1)
                    % typingMessages.length;

                changeTypingStyle();

                setTimeout(typeEffect, 400);

                return;

            }

            setTimeout(typeEffect, 40);

        }

    }

    changeTypingStyle();

    typeEffect();


    /* =====================================================
       CONTRIBUTION GRID
    ===================================================== */

    const contributionGrid =
        document.getElementById(
            "contribution-grid"
        );

    if (contributionGrid) {

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
             * Random active dots
             */
            if (Math.random() < 0.28) {

                dot.classList.add(
                    "jd-active"
                );

            }

            contributionGrid.appendChild(dot);

        }

    }


    /* =====================================================
       MUSIC
    ===================================================== */

    const musicBtn =
        document.getElementById(
            "music-btn"
        );

    const audio =
        document.getElementById(
            "bg-music"
        );

    /*
     * Thay link nhạc ở đây.
     *
     * Có thể thêm nhiều bài.
     */
    const musicList = [
        "https://files.catbox.moe/7xqf5k.mp3"
    ];

    let currentMusic = 0;

    function loadMusic(index) {

        if (!audio || !musicList.length) {
            return;
        }

        currentMusic =
            (index + musicList.length)
            % musicList.length;

        audio.src =
            musicList[currentMusic];

        audio.load();

    }

    function updateMusicIcon() {

        if (!musicBtn) return;

        const icon =
            musicBtn.querySelector("i");

        if (!icon) return;

        if (!audio.paused) {

            icon.className =
                "fa-solid fa-pause";

            musicBtn.classList.add(
                "playing"
            );

        } else {

            icon.className =
                "fa-solid fa-music";

            musicBtn.classList.remove(
                "playing"
            );

        }

    }

    async function playMusic() {

        if (!audio || !musicList.length) {
            return;
        }

        try {

            await audio.play();

            updateMusicIcon();

        } catch (error) {

            console.log(
                "Không thể phát nhạc:",
                error
            );

        }

    }

    function pauseMusic() {

        if (!audio) return;

        audio.pause();

        updateMusicIcon();

    }

    /*
     * Nút music:
     *
     * - Đang tắt -> bật
     * - Đang bật -> dừng
     * - Bấm lại sau khi dừng -> tiếp tục
     */
    if (musicBtn) {

        musicBtn.addEventListener(
            "click",
            () => {

                if (!audio) return;

                if (audio.paused) {

                    playMusic();

                } else {

                    pauseMusic();

                }

            }
        );

    }

    /*
     * Khi bài hát kết thúc:
     * chuyển sang bài tiếp theo.
     */
    if (audio) {

        audio.addEventListener(
            "ended",
            () => {

                if (
                    musicList.length <= 1
                ) {

                    audio.currentTime = 0;

                    playMusic();

                    return;

                }

                currentMusic++;

                loadMusic(currentMusic);

                playMusic();

            }
        );

    }

    /*
     * Load bài đầu tiên nhưng KHÔNG tự phát.
     */
    loadMusic(0);


    /* =====================================================
       SAKURA
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

        sakura.className = "sakura";

        const size =
            Math.random() * 20 + 15;

        const left =
            Math.random() * 100;

        const wind =
            (Math.random() * 300 - 150);

        const rotate =
            Math.random() * 720 - 360;

        const duration =
            Math.random() * 7 + 7;

        const delay =
            Math.random() * 2;

        sakura.style.width =
            `${size}px`;

        sakura.style.height =
            `${size}px`;

        sakura.style.left =
            `${left}%`;

        sakura.style.setProperty(
            "--wind",
            `${wind}px`
        );

        sakura.style.setProperty(
            "--rotate",
            `${rotate}deg`
        );

        sakura.style.animationDuration =
            `${duration}s`;

        sakura.style.animationDelay =
            `${delay}s`;

        sakuraContainer.appendChild(
            sakura
        );

        setTimeout(() => {

            sakura.remove();

        }, (duration + delay) * 1000 + 500);

    }

    /*
     * Tạo hoa rơi.
     * Không tạo quá dày để mobile đỡ lag.
     */
    for (let i = 0; i < 18; i++) {

        setTimeout(
            createSakura,
            i * 300
        );

    }

    setInterval(
        createSakura,
        700
    );


    /* =====================================================
       LOADING TOAST
    ===================================================== */

    const toast =
        document.createElement("div");

    toast.id =
        "pbl-loading-toast";

    toast.innerHTML = `

        <div class="pbl-toast-title">

            <i class="fa-solid fa-spinner"></i>

            PBL | HOME

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

        <span id="pbl-loading-percent">
            0%
        </span>

    `;

    document.body.appendChild(toast);

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

    toast.classList.add("show");

    let loadingPercent = 0;

    const loadingInterval =
        setInterval(() => {

            loadingPercent +=
                Math.floor(
                    Math.random() * 8
                ) + 2;

            if (
                loadingPercent >= 100
            ) {

                loadingPercent = 100;

                clearInterval(
                    loadingInterval
                );

                if (progress) {

                    progress.style.width =
                        "100%";

                }

                if (percent) {

                    percent.textContent =
                        "100%";

                }

                setTimeout(
                    showMusicQuestion,
                    400
                );

                return;

            }

            if (progress) {

                progress.style.width =
                    loadingPercent + "%";

            }

            if (percent) {

                percent.textContent =
                    loadingPercent + "%";

            }

        }, 80);


    /* =====================================================
       MUSIC QUESTION
    ===================================================== */

    function showMusicQuestion() {

        const musicIcon =
            document.querySelector(
                "#pbl-loading-toast .pbl-toast-title i"
            );

        if (musicIcon) {

            musicIcon.className =
                "fa-solid fa-circle-check";

        }

        if (message) {

            message.innerHTML =
                "Load web thành công! 🎉<br>" +
                "Bạn có muốn bật nhạc không?";

        }

        const loadingBar =
            document.querySelector(
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

        /*
         * Không tạo button lần 2
         */
        if (
            document.querySelector(
                ".pbl-music-buttons"
            )
        ) {

            return;

        }

        const buttons =
            document.createElement("div");

        buttons.className =
            "pbl-music-buttons";

        buttons.innerHTML = `

            <button
                class="pbl-music-btn yes"
                id="pbl-music-yes">

                <i class="fa-solid fa-volume-high"></i>

                Có

            </button>

            <button
                class="pbl-music-btn no"
                id="pbl-music-no">

                <i class="fa-solid fa-volume-xmark"></i>

                Không

            </button>

        `;

        toast.appendChild(buttons);


        /* =================================================
           CÓ
        ================================================= */

        const yesBtn =
            document.getElementById(
                "pbl-music-yes"
            );

        if (yesBtn) {

            yesBtn.addEventListener(
                "click",
                async () => {

                    await playMusic();

                    closeToast();

                }
            );

        }


        /* =================================================
           KHÔNG
        ================================================= */

        const noBtn =
            document.getElementById(
                "pbl-music-no"
            );

        if (noBtn) {

            noBtn.addEventListener(
                "click",
                () => {

                    closeToast();

                }
            );

        }

    }


    /* =====================================================
       CLOSE TOAST
    ===================================================== */

    function closeToast() {

        if (!toast) return;

        toast.classList.remove(
            "show"
        );

        setTimeout(() => {

            if (toast) {
                toast.remove();
            }

        }, 400);

    }

});
