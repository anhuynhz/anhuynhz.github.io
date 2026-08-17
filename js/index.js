/*
=========================================================
    Source by PBL
    PBL | HOME Source v1.0
=========================================================
*/
document.addEventListener("DOMContentLoaded", () => {

/* =========================================================
   MUSIC
========================================================= */

const musicBtn = document.getElementById("music-btn");
const audio = document.getElementById("bg-music");
const musicTitle = document.getElementById("music-title");

const musicList = [
    {
        title: "Anh Nhớ Em",
        url: "https://files.catbox.moe/ihobra.mp3"
    },
    {
        title: "Rồi mùa yêu thương dần đang đến",
        url: "https://files.catbox.moe/bgwso3.mp3"
    },
    {
        title: "Chỉ bằng cái gật đầu",
        url: "https://files.catbox.moe/s1hyzo.mp3"
    },
    {
        title: "Đừng quên tên anh",
        url: "https://files.catbox.moe/h43f1s.mp3"
    },
    {
        title: "Hối hận trong anh",
        url: "https://files.catbox.moe/aebu0g.mp3"
    },
    {
        title: "Anh từng cố gắng",
        url: "https://files.catbox.moe/mm085n.mp3"
    },
    {
        title: "Hình bóng em",
        url: "https://files.catbox.moe/21c1fl.mp3"
    },
    {
        title: "Lời chúc không thật",
        url: "https://files.catbox.moe/v6sqz2.mp3"
    },
    {
        title: "Quên anh trong từng cơn đau",
        url: "https://files.catbox.moe/crphp2.mp3"
    },
    {
        title: "Em nào có tội",
        url: "https://thanhdieu.com/files/Em-Nào-Có-Tội.mp3"
    },
    {
        title: "Anh đã quen với cô đơn",
        url: "https://thanhdieu.com/files/Anh-Đã-Quen-Với-Cô-Đơn.mp3"
    },
    {
        title: "Về bên anh",
        url: "https://thanhdieu.com/files/Về-Bên-Anh.mp3"
    }
];

let currentSong = 0;
let isPlaying = false;


function setSong(index, autoPlay = false) {

    if (!musicList.length) {
        return;
    }

    currentSong =
        (index + musicList.length) %
        musicList.length;

    const song =
        musicList[currentSong];

    audio.src = song.url;

    audio.load();

    if (musicTitle) {
        musicTitle.textContent =
            song.title;
    }

    if (autoPlay) {
        playMusic();
    }
}


function playMusic() {

    const promise =
        audio.play();

    if (promise !== undefined) {

        promise
            .then(() => {

                isPlaying = true;

                musicBtn.classList.add(
                    "playing"
                );

                musicBtn.innerHTML =
                    '<i class="fa-solid fa-pause"></i>';

            })
            .catch(error => {

                console.warn(
                    "Không thể phát nhạc:",
                    error
                );

                isPlaying = false;

                musicBtn.classList.remove(
                    "playing"
                );

                musicBtn.innerHTML =
                    '<i class="fa-solid fa-music"></i>';

            });
    }
}


function pauseMusic() {

    audio.pause();

    isPlaying = false;

    musicBtn.classList.remove(
        "playing"
    );

    musicBtn.innerHTML =
        '<i class="fa-solid fa-music"></i>';
}


function toggleMusic() {

    if (isPlaying) {

        /*
         * Dừng bài hiện tại.
         * Lần sau bấm lại sẽ sang bài tiếp theo.
         */

        pauseMusic();

        return;
    }


    /*
     * Nếu audio chưa có source
     */
    if (!audio.src) {

        setSong(
            currentSong,
            true
        );

        return;
    }


    /*
     * Nếu bài đã chạy hết
     * thì sang bài tiếp.
     */

    if (
        audio.ended ||
        audio.currentTime >= audio.duration
    ) {

        currentSong++;

        setSong(
            currentSong,
            true
        );

        return;
    }


    /*
     * Nếu vừa mới dừng:
     * chuyển bài tiếp theo.
     */

    currentSong++;

    setSong(
        currentSong,
        true
    );
}


musicBtn.addEventListener(
    "click",
    toggleMusic
);


/*
 * Bài kết thúc:
 * tự động chuyển bài tiếp theo.
 */

audio.addEventListener(
    "ended",
    () => {

        currentSong++;

        setSong(
            currentSong,
            true
        );

    }
);


/*
 * Khởi tạo bài đầu tiên
 */

setSong(0, false);


/* =========================================================
   LED CONTRIBUTION GRID
========================================================= */

const grid =
    document.getElementById(
        "contribution-grid"
    );


function createContributionGrid() {

    if (!grid) {
        return;
    }

    grid.innerHTML = "";

    /*
     * 52 x 7 = 364 ô
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
         * Tạo pattern giống contribution graph.
         */

        const column =
            Math.floor(i / 7);

        const row =
            i % 7;


        /*
         * Một số ô được bật.
         */

        const active =
            (
                (column * 13 + row * 7) % 17 < 7
            );


        if (active) {

            dot.classList.add(
                "jd-active"
            );

            /*
             * Delay nhẹ để LED không
             * nhấp cùng một lúc.
             */

            dot.style.animationDelay =
                `${(i % 15) * 0.08}s`;
        }


        grid.appendChild(dot);
    }
}


createContributionGrid();


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingText =
    document.getElementById(
        "typing-text"
    );


const typingMessages = [
    "Welcome to my profile",
    "PBL | HOME",
    "Phạm Bảo Long",
    "Code • Music • Dream",
    "Keep moving forward"
];


let typingIndex = 0;
let charIndex = 0;
let deleting = false;


function typingEffect() {

    if (!typingText) {
        return;
    }

    const current =
        typingMessages[typingIndex];


    if (!deleting) {

        typingText.textContent =
            current.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (
            charIndex >=
            current.length
        ) {

            deleting = true;

            setTimeout(
                typingEffect,
                1800
            );

            return;
        }

    } else {

        typingText.textContent =
            current.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex <= 0) {

            deleting = false;

            typingIndex =
                (
                    typingIndex + 1
                ) %
                typingMessages.length;

            setTimeout(
                typingEffect,
                400
            );

            return;
        }
    }


    setTimeout(
        typingEffect,
        deleting ? 45 : 80
    );
}


typingEffect();


/* =========================================================
   SAKURA
========================================================= */

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


    const size =
        Math.random() * 18 + 18;

    const left =
        Math.random() * 100;

    const duration =
        Math.random() * 5 + 7;

    const wind =
        (
            Math.random() * 300
        ) - 150;

    const rotate =
        (
            Math.random() * 720
        ) - 360;


    sakura.style.width =
        `${size}px`;

    sakura.style.height =
        `${size}px`;

    sakura.style.left =
        `${left}%`;

    sakura.style.animationDuration =
        `${duration}s`;

    sakura.style.setProperty(
        "--wind",
        `${wind}px`
    );

    sakura.style.setProperty(
        "--rotate",
        `${rotate}deg`
    );


    sakuraContainer.appendChild(
        sakura
    );


    setTimeout(() => {

        sakura.remove();

    }, (duration + 1) * 1000);
}


setInterval(
    createSakura,
    450
);


/* =========================================================
   LOADING TOAST
========================================================= */

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


    <span
        id="pbl-loading-percent">

        0%

    </span>

`;


document.body.appendChild(
    toast
);


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


setTimeout(() => {

    toast.classList.add(
        "show"
    );

}, 100);


let loadingPercent = 0;


const loadingInterval =
    setInterval(() => {

        loadingPercent +=
            Math.floor(
                Math.random() * 8
            ) + 2;


        if (
            loadingPercent >=
            100
        ) {

            loadingPercent =
                100;

            clearInterval(
                loadingInterval
            );

            progress.style.width =
                "100%";

            percent.textContent =
                "100%";


            setTimeout(
                showMusicQuestion,
                450
            );

            return;
        }


        progress.style.width =
            loadingPercent + "%";

        percent.textContent =
            loadingPercent + "%";

    }, 80);


/* =========================================================
   MUSIC QUESTION
========================================================= */

function showMusicQuestion() {

    const icon =
        toast.querySelector(
            ".pbl-toast-title i"
        );


    if (icon) {

        icon.className =
            "fa-solid fa-circle-check";

    }


    message.innerHTML =
        "Load web thành công! 🎉<br>" +
        "Bạn có muốn bật nhạc không?";


    const loadingBar =
        toast.querySelector(
            ".pbl-loading-bar"
        );

    if (loadingBar) {

        loadingBar.style.display =
            "none";

    }


    percent.style.display =
        "none";


    const buttons =
        document.createElement(
            "div"
        );

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


    toast.appendChild(
        buttons
    );


    document
        .getElementById(
            "pbl-music-yes"
        )
        .addEventListener(
            "click",
            () => {

                /*
                 * Phát bài đầu tiên.
                 * Không gọi musicBtn.click()
                 * để tránh bị nhảy sang bài 2.
                 */

                setSong(
                    currentSong,
                    true
                );

                closeToast();

            }
        );


    document
        .getElementById(
            "pbl-music-no"
        )
        .addEventListener(
            "click",
            closeToast
        );
}


/* =========================================================
   CLOSE TOAST
========================================================= */

function closeToast() {

    toast.classList.remove(
        "show"
    );


    setTimeout(() => {

        toast.remove();

    }, 400);
}


});
