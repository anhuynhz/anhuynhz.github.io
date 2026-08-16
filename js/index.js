/* =========================================
   CONTRIBUTION GRID
========================================= */

const grid = document.getElementById("contribution-grid");

const dots = [];

const rows = 7;
const cols = 52;

if (grid) {

    for (let i = 0; i < rows * cols; i++) {

        const dot = document.createElement("div");

        dot.className = "dot";

        grid.appendChild(dot);

        dots.push(dot);
    }


    function jdVisualizer() {

        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("jd-active");
        }


        for (let c = 0; c < cols; c++) {

            const height =
                Math.floor(Math.random() * rows);

            for (let r = 0; r <= height; r++) {

                const index =
                    (rows - 1 - r) * cols + c;

                if (dots[index]) {
                    dots[index].classList.add("jd-active");
                }
            }
        }
    }


    jdVisualizer();

    setInterval(jdVisualizer, 130);
}


/* =========================================
   FLYING FISH
========================================= */

const fishContainer =
    document.getElementById("jsi-flying-fish-container");


if (fishContainer) {

    const canvas =
        document.createElement("canvas");

    const ctx =
        canvas.getContext("2d");

    fishContainer.appendChild(canvas);


    let width = 0;
    let height = 0;

    const fishes = [];

    const FISH_COUNT = 3;


    function resizeCanvas() {

        width = window.innerWidth;

        height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;
    }


    class Fish {

        constructor() {

            this.reset();
        }


        reset() {

            this.direction =
                Math.random() < 0.5 ? 1 : -1;

            this.x =
                this.direction === 1
                    ? -50
                    : width + 50;

            this.y =
                height * 0.55 +
                Math.random() * height * 0.3;

            this.vx =
                this.direction *
                (2.5 + Math.random() * 2.5);

            this.vy =
                -(2 + Math.random() * 2);

            this.gravity =
                0.08 + Math.random() * 0.05;
        }


        update() {

            this.x += this.vx;

            this.y += this.vy;

            this.vy += this.gravity;


            if (this.y > height * 0.55) {

                this.vy =
                    -(2 + Math.random() * 2);
            }


            if (
                (this.direction === 1 &&
                    this.x > width + 60) ||

                (this.direction === -1 &&
                    this.x < -60)
            ) {

                this.reset();
            }
        }


        draw() {

            ctx.save();

            ctx.translate(
                this.x,
                this.y
            );


            if (this.direction === -1) {
                ctx.scale(-1, 1);
            }


            ctx.rotate(
                Math.atan2(
                    this.vy,
                    this.vx
                )
            );


            ctx.beginPath();

            ctx.moveTo(-25, 0);

            ctx.bezierCurveTo(
                -15, 12,
                10, 8,
                30, 0
            );

            ctx.bezierCurveTo(
                10, -8,
                -15, -12,
                -25, 0
            );

            ctx.fillStyle =
                "rgba(255,255,255,0.22)";

            ctx.fill();

            ctx.restore();
        }
    }


    function createFishes() {

        fishes.length = 0;

        const count =
            window.innerWidth < 600
                ? 1
                : FISH_COUNT;

        for (let i = 0; i < count; i++) {
            fishes.push(new Fish());
        }
    }


    function animateFish() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        for (const fish of fishes) {

            fish.update();

            fish.draw();
        }


        requestAnimationFrame(
            animateFish
        );
    }


    resizeCanvas();

    createFishes();

    animateFish();


    let resizeTimer;

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(resizeTimer);

            resizeTimer =
                setTimeout(function () {

                    resizeCanvas();

                    createFishes();

                }, 250);
        },
        { passive: true }
    );
}


/* =========================================
   MUSIC PLAYER
========================================= */

const playlist = [

    {
        name: "Bài hát 1",
        url: "https://thanhdieu.com/files/Về-Bên-Anh.mp3"
    },

    {
        name: "Bài hát 2",
        url: "https://thanhdieu.com/files/Anh-Đã-Quen-Với-Cô-Đơn.mp3"
    },

    {
        name: "Bài hát 3",
        url: "https://thanhdieu.com/files/Em-Nào-Có-Tội.mp3"
    }

];


const musicBtn =
    document.getElementById("music-btn");

const bgMusic =
    document.getElementById("bg-music");


let currentSong = 0;

let hasStarted = false;


function loadSong(index) {

    if (!bgMusic || !playlist[index]) {
        return;
    }

    currentSong = index;

    bgMusic.src =
        playlist[currentSong].url;

    bgMusic.load();
}


function playMusic() {

    if (!bgMusic || !musicBtn) {
        return;
    }


    bgMusic.play()
        .then(function () {

            musicBtn.classList.add("playing");

            musicBtn.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

        })
        .catch(function (error) {

            console.log(
                "Không thể phát nhạc:",
                error
            );

        });
}


if (musicBtn && bgMusic) {

    musicBtn.addEventListener(
        "click",
        function () {

            if (!bgMusic.paused) {

                bgMusic.pause();

                musicBtn.classList.remove(
                    "playing"
                );

                musicBtn.innerHTML =
                    '<i class="fa-solid fa-music"></i>';

                return;
            }


            if (!hasStarted) {

                hasStarted = true;

                loadSong(currentSong);

                playMusic();

                return;
            }


            currentSong++;

            if (
                currentSong >= playlist.length
            ) {

                currentSong = 0;
            }


            loadSong(currentSong);

            playMusic();

        },
        { passive: true }
    );


    bgMusic.addEventListener(
        "ended",
        function () {

            currentSong++;

            if (
                currentSong >= playlist.length
            ) {

                currentSong = 0;
            }


            loadSong(currentSong);

            playMusic();

        }
    );
}


/* =========================================
   TYPING EFFECT
========================================= */

const typingText =
    document.getElementById("typing-text");


const typingMessages = [

    {
        text: "Hello everyone. I'm Phạm Bảo Long",
        className: "typing-style-1"
    },

    {
        text: "I'm a Developer",
        className: "typing-style-2"
    },

    {
        text: "Welcome to my website",
        className: "typing-style-3"
    },

    {
        text: "Cần lên Locket Gold vĩnh viễn ib nha",
        className: "typing-style-4"
    },

    {
        text: "Have a nice day ✨",
        className: "typing-style-5"
    },

    {
        text: "Thank you for visiting!",
        className: "typing-style-6"
    }

];


let messageIndex = 0;

let charIndex = 0;

let deleting = false;


const typingSpeed = 80;

const deletingSpeed = 45;

const pauseAfterTyping = 1800;

const pauseAfterDeleting = 500;


function typingEffect() {

    if (!typingText) {
        return;
    }


    const current =
        typingMessages[messageIndex];


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

        typingText.textContent =
            current.text.substring(
                0,
                charIndex - 1
            );

        charIndex--;


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
