/*
=========================================================
    Source by PBL
    PBL | HOME Source v1.0
    View source đi trước khi bị đóng :>
=========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       PBL LOADING + MUSIC TOAST
    ========================================================= */

    const toast = document.createElement("div");

    toast.id = "pbl-loading-toast";

    toast.innerHTML = `
        <div class="pbl-toast-title">
            <i class="fa-solid fa-spinner fa-spin"></i>
            PBL | HOME
        </div>

        <div class="pbl-toast-message" id="pbl-toast-message">
            Đang tải website...
        </div>

        <div class="pbl-loading-bar">
            <div id="pbl-loading-progress"></div>
        </div>

        <span id="pbl-loading-percent">0%</span>
    `;

    document.body.appendChild(toast);

    const progress =
        document.getElementById("pbl-loading-progress");

    const percent =
        document.getElementById("pbl-loading-percent");

    const message =
        document.getElementById("pbl-toast-message");

    toast.classList.add("show");

    let loadingPercent = 0;

    const loadingInterval = setInterval(function () {

        loadingPercent +=
            Math.floor(Math.random() * 8) + 2;

        if (loadingPercent >= 100) {

            loadingPercent = 100;

            clearInterval(loadingInterval);

            progress.style.width = "100%";
            percent.textContent = "100%";

            setTimeout(showMusicQuestion, 500);

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
            document.querySelector(
                "#pbl-loading-toast .pbl-toast-title i"
            );

        if (icon) {

            icon.className =
                "fa-solid fa-circle-check";

        }

        message.innerHTML =
            "Load web thành công! 🎉<br>" +
            "Bạn có muốn bật nhạc không?";

        const loadingBar =
            document.querySelector(
                ".pbl-loading-bar"
            );

        if (loadingBar) {
            loadingBar.style.display = "none";
        }

        percent.style.display = "none";


        const oldButtons =
            toast.querySelector(".pbl-music-buttons");

        if (oldButtons) {
            oldButtons.remove();
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


        /* =====================================================
           NÚT CÓ
        ===================================================== */

        const yesButton =
            document.getElementById(
                "pbl-music-yes"
            );

        if (yesButton) {

            yesButton.addEventListener(
                "click",
                function () {

                    const musicBtn =
                        document.getElementById(
                            "music-btn"
                        );

                    if (musicBtn) {

                        musicBtn.click();

                    } else {

                        console.log(
                            "Không tìm thấy #music-btn"
                        );
                    }

                    closeToast();
                }
            );
        }


        /* =====================================================
           NÚT KHÔNG
        ===================================================== */

        const noButton =
            document.getElementById(
                "pbl-music-no"
            );

        if (noButton) {

            noButton.addEventListener(
                "click",
                function () {

                    closeToast();

                }
            );
        }
    }


    /* =========================================================
       ĐÓNG TOAST
    ========================================================= */

    function closeToast() {

        toast.classList.remove("show");

        setTimeout(function () {

            if (toast) {
                toast.remove();
            }

        }, 400);
    }



    /* =========================================================
       CONTRIBUTION GRID
    ========================================================= */

    const grid =
        document.getElementById(
            "contribution-grid"
        );

    if (grid) {

        const dots = [];

        const rows = 7;
        const cols = 52;

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


        function jdVisualizer() {

            for (
                let i = 0;
                i < dots.length;
                i++
            ) {

                dots[i].classList.remove(
                    "jd-active"
                );
            }


            for (
                let c = 0;
                c < cols;
                c++
            ) {

                const height =
                    Math.floor(
                        Math.random() * rows
                    );


                for (
                    let r = 0;
                    r <= height;
                    r++
                ) {

                    const index =
                        (rows - 1 - r) *
                        cols +
                        c;


                    if (dots[index]) {

                        dots[index].classList.add(
                            "jd-active"
                        );
                    }
                }
            }
        }


        jdVisualizer();

        setInterval(
            jdVisualizer,
            180
        );
    }



    /* =========================================================
       TYPING EFFECT
    ========================================================= */

    const typingText =
        document.getElementById(
            "typing-text"
        );

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
       MUSIC PLAYER

       Lần đầu:
       → Random bài

       Đang phát:
       → Pause

       Pause rồi bấm:
       → Next bài

       Hết bài:
       → Next bài

       Hết bài cuối:
       → Quay lại bài đầu

       File lỗi:
       → Tự bỏ qua bài lỗi
    ========================================================= */

    const playlist = [

        {
            name: "Về bên anh",
            url:
                "//thanhdieu.com/files/Về-Bên-Anh.mp3"
        },

        {
            name: "Anh đã quen với cô đơn",
            url:
                "//thanhdieu.com/files/Anh-Đã-Quen-Với-Cô-Đơn.mp3"
        },

        {
            name: "Em nào có tội",
            url:
                "//thanhdieu.com/files/Em-Nào-Có-Tội.mp3"
        },

        {
            name: "Anh Nhớ Em",
            url:
                "https://files.catbox.moe/ihobra.mp3"
        },

        {
            name:
                "Rồi mùa yêu thương dần đang đến",
            url:
                "https://files.catbox.moe/bgwso3.mp3"
        },

        {
            name:
                "Chỉ bằng cái gật đầu",
            url:
                "https://files.catbox.moe/s1hyzo.mp3"
        },

        {
            name:
                "Đừng quên tên anh",
            url:
                "https://files.catbox.moe/h43f1s.mp3"
        },

        {
            name:
                "Hối hận trong anh",
            url:
                "https://files.catbox.moe/aebu0g.mp3"
        },

        {
            name:
                "Anh từng cố gắng",
            url:
                "https://files.catbox.moe/mm085n.mp3"
        },

        {
            name:
                "Hình bóng em",
            url:
                "https://files.catbox.moe/21c1fl.mp3"
        },

        {
            name:
                "Lời chúc không thật",
            url:
                "https://files.catbox.moe/v6sqz2.mp3"
        },

        {
            name:
                "Quên anh trong từng cơn đau",
            url:
                "https://files.catbox.moe/crphp2.mp3"
        }

    ];


    const musicBtn =
        document.getElementById(
            "music-btn"
        );

    const bgMusic =
        document.getElementById(
            "bg-music"
        );


    if (
        musicBtn &&
        bgMusic &&
        playlist.length > 0
    ) {

        let currentSong = 0;

        let hasStarted = false;

        let changingSong = false;


        /* =====================================================
           LOAD SONG
        ===================================================== */

        function loadSong(index) {

            if (index < 0) {

                index =
                    playlist.length - 1;
            }

            if (
                index >=
                playlist.length
            ) {

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


        /* =====================================================
           PLAYING STATE
        ===================================================== */

        function setPlayingState() {

            musicBtn.classList.add(
                "playing"
            );

            musicBtn.innerHTML =
                '<i class="fa-solid fa-pause"></i>';
        }


        /* =====================================================
           PAUSED STATE
        ===================================================== */

        function setPausedState() {

            musicBtn.classList.remove(
                "playing"
            );

            musicBtn.innerHTML =
                '<i class="fa-solid fa-music"></i>';
        }


        /* =====================================================
           PLAY
        ===================================================== */

        function playMusic() {

            if (changingSong) {
                return;
            }

            changingSong = true;


            const promise =
                bgMusic.play();


            if (
                promise &&
                typeof promise.then ===
                "function"
            ) {

                promise
                    .then(function () {

                        changingSong = false;

                        setPlayingState();

                        console.log(
                            "Đang phát:",
                            playlist[currentSong].name
                        );

                    })
                    .catch(function (error) {

                        changingSong = false;

                        setPausedState();

                        console.log(
                            "Không thể phát:",
                            playlist[currentSong].name,
                            error
                        );
                    });

            } else {

                changingSong = false;

                setPlayingState();
            }
        }


        /* =====================================================
           PLAY WHEN READY
        ===================================================== */

        function playWhenReady() {

            if (
                bgMusic.readyState >= 2
            ) {

                playMusic();

                return;
            }


            const handler =
                function () {

                    bgMusic.removeEventListener(
                        "canplay",
                        handler
                    );

                    playMusic();
                };


            bgMusic.addEventListener(
                "canplay",
                handler
            );
        }


        /* =====================================================
           NEXT SONG
        ===================================================== */

        function nextSong() {

            if (changingSong) {
                return;
            }


            currentSong++;


            if (
                currentSong >=
                playlist.length
            ) {

                currentSong = 0;

                console.log(
                    "Hết playlist → quay lại bài đầu"
                );
            }


            loadSong(currentSong);

            playWhenReady();
        }


        /* =====================================================
           MUSIC BUTTON
        ===================================================== */

        musicBtn.addEventListener(
            "click",
            function () {

                /* Đang phát → PAUSE */

                if (
                    !bgMusic.paused
                ) {

                    bgMusic.pause();

                    setPausedState();

                    console.log(
                        "Pause:",
                        playlist[currentSong].name
                    );

                    return;
                }


                /* Lần đầu → RANDOM */

                if (!hasStarted) {

                    hasStarted = true;

                    currentSong =
                        Math.floor(
                            Math.random() *
                            playlist.length
                        );

                    loadSong(currentSong);

                    playWhenReady();

                    return;
                }


                /* Đã phát → NEXT */

                nextSong();

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
                    "File lỗi:",
                    playlist[currentSong].name
                );


                /*
                 * Đợi một chút rồi bỏ qua
                 * bài lỗi
                 */

                setTimeout(
                    function () {

                        if (
                            !bgMusic.error
                        ) {
                            return;
                        }

                        changingSong = false;

                        currentSong++;


                        if (
                            currentSong >=
                            playlist.length
                        ) {

                            currentSong = 0;
                        }


                        loadSong(
                            currentSong
                        );

                        playWhenReady();

                    },
                    500
                );
            }
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

        var RENDERER = {

            POINT_INTERVAL: 5,

            FISH_COUNT: 3,

            MAX_INTERVAL_COUNT: 50,

            INIT_HEIGHT_RATE: 0.5,

            THRESHOLD: 50,


            init: function () {

                this.setParameters();

                this.reconstructMethods();

                this.setup();

                this.bindEvent();

                this.render();
            },


            setParameters: function () {

                this.$window =
                    $(window);

                this.$container =
                    $(
                        "#jsi-flying-fish-container"
                    );

                this.$canvas =
                    $("<canvas />");


                this.context =
                    this.$canvas
                        .appendTo(
                            this.$container
                        )
                        .get(0)
                        .getContext("2d");


                this.points = [];

                this.fishes = [];

                this.watchIds = [];
            },


            createSurfacePoints:
                function () {

                    var count =
                        Math.round(
                            this.width /
                            this.POINT_INTERVAL
                        );


                    this.pointInterval =
                        this.width /
                        (count - 1);


                    this.points.push(
                        new SURFACE_POINT(
                            this,
                            0
                        )
                    );


                    for (
                        var i = 1;
                        i < count;
                        i++
                    ) {

                        var point =
                            new SURFACE_POINT(
                                this,
                                i *
                                this.pointInterval
                            );


                        var previous =
                            this.points[
                                i - 1
                            ];


                        point.setPreviousPoint(
                            previous
                        );


                        previous.setNextPoint(
                            point
                        );


                        this.points.push(
                            point
                        );
                    }
                },


            reconstructMethods:
                function () {

                    this.watchWindowSize =
                        this.watchWindowSize
                            .bind(this);

                    this.jdugeToStopResize =
                        this.jdugeToStopResize
                            .bind(this);

                    this.startEpicenter =
                        this.startEpicenter
                            .bind(this);

                    this.moveEpicenter =
                        this.moveEpicenter
                            .bind(this);

                    this.reverseVertical =
                        this.reverseVertical
                            .bind(this);

                    this.render =
                        this.render
                            .bind(this);
                },


            setup: function () {

                this.points.length = 0;

                this.fishes.length = 0;

                this.watchIds.length = 0;

                this.intervalCount =
                    this.MAX_INTERVAL_COUNT;

                this.width =
                    this.$container.width();

                this.height =
                    this.$container.height();


                this.fishCount =
                    Math.max(
                        1,
                        Math.floor(
                            this.FISH_COUNT *
                            this.width / 500 *
                            this.height / 500
                        )
                    );


                this.$canvas.attr({

                    width:
                        this.width,

                    height:
                        this.height

                });


                this.reverse = false;


                this.fishes.push(
                    new FISH(this)
                );


                this.createSurfacePoints();
            },


            watchWindowSize:
                function () {

                    this.clearTimer();

                    this.tmpWidth =
                        this.$window.width();

                    this.tmpHeight =
                        this.$window.height();


                    this.watchIds.push(
                        setTimeout(
                            this.jdugeToStopResize,
                            300
                        )
                    );
                },


            clearTimer:
                function () {

                    while (
                        this.watchIds.length > 0
                    ) {

                        clearTimeout(
                            this.watchIds.pop()
                        );
                    }
                },


            jdugeToStopResize:
                function () {

                    var width =
                        this.$window.width();

                    var height =
                        this.$window.height();


                    var stopped =
                        (
                            width ===
                            this.tmpWidth &&
                            height ===
                            this.tmpHeight
                        );


                    this.tmpWidth =
                        width;

                    this.tmpHeight =
                        height;


                    if (stopped) {

                        this.setup();
                    }
                },


            bindEvent:
                function () {

                    this.$window.on(
                        "resize",
                        this.watchWindowSize
                    );


                    this.$container.on(
                        "mouseenter",
                        this.startEpicenter
                    );


                    this.$container.on(
                        "mousemove",
                        this.moveEpicenter
                    );


                    this.$container.on(
                        "click",
                        this.reverseVertical
                    );
                },


            getAxis:
                function (event) {

                    var offset =
                        this.$container.offset();


                    return {

                        x:
                            event.clientX -
                            offset.left +
                            this.$window.scrollLeft(),

                        y:
                            event.clientY -
                            offset.top +
                            this.$window.scrollTop()

                    };
                },


            startEpicenter:
                function (event) {

                    this.axis =
                        this.getAxis(event);
                },


            moveEpicenter:
                function (event) {

                    var axis =
                        this.getAxis(event);


                    if (!this.axis) {

                        this.axis = axis;
                    }


                    this.generateEpicenter(
                        axis.x,
                        axis.y,
                        axis.y -
                        this.axis.y
                    );


                    this.axis = axis;
                },


            generateEpicenter:
                function (
                    x,
                    y,
                    velocity
                ) {

                    if (
                        y <
                        this.height / 2 -
                        this.THRESHOLD ||

                        y >
                        this.height / 2 +
                        this.THRESHOLD
                    ) {

                        return;
                    }


                    var index =
                        Math.round(
                            x /
                            this.pointInterval
                        );


                    if (
                        index < 0 ||
                        index >=
                        this.points.length
                    ) {

                        return;
                    }


                    this.points[index]
                        .interfere(
                            y,
                            velocity
                        );
                },


            reverseVertical:
                function () {

                    this.reverse =
                        !this.reverse;


                    for (
                        var i = 0,
                        count =
                            this.fishes.length;

                        i < count;

                        i++
                    ) {

                        this.fishes[i]
                            .reverseVertical();
                    }
                },


            controlStatus:
                function () {

                    for (
                        var i = 0,
                        count =
                            this.points.length;

                        i < count;

                        i++
                    ) {

                        this.points[i]
                            .updateSelf();
                    }


                    for (
                        var j = 0,
                        count2 =
                            this.points.length;

                        j < count2;

                        j++
                    ) {

                        this.points[j]
                            .updateNeighbors();
                    }


                    if (
                        this.fishes.length <
                        this.fishCount
                    ) {

                        if (
                            --this.intervalCount ===
                            0
                        ) {

                            this.intervalCount =
                                this.MAX_INTERVAL_COUNT;


                            this.fishes.push(
                                new FISH(this)
                            );
                        }
                    }
                },


            render: function () {

                requestAnimationFrame(
                    this.render
                );


                this.controlStatus();


                this.context.clearRect(
                    0,
                    0,
                    this.width,
                    this.height
                );


                this.context.fillStyle =
                    "rgba(255,255,255,0.22)";


                for (
                    var i = 0,
                    count =
                        this.fishes.length;

                    i < count;

                    i++
                ) {

                    this.fishes[i]
                        .render(
                            this.context
                        );
                }


                this.context.save();


                this.context
                    .globalCompositeOperation =
                    "xor";


                this.context.beginPath();


                this.context.moveTo(
                    0,
                    this.reverse
                        ? 0
                        : this.height
                );


                for (
                    var j = 0,
                    count2 =
                        this.points.length;

                    j < count2;

                    j++
                ) {

                    this.points[j]
                        .render(
                            this.context
                        );
                }


                this.context.lineTo(
                    this.width,
                    this.reverse
                        ? 0
                        : this.height
                );


                this.context.closePath();

                this.context.fill();

                this.context.restore();
            }
        };


        /* =====================================================
           SURFACE POINT
        ===================================================== */

        var SURFACE_POINT =
            function (
                renderer,
                x
            ) {

                this.renderer =
                    renderer;

                this.x = x;

                this.init();
            };


        SURFACE_POINT.prototype = {

            SPRING_CONSTANT: 0.03,

            SPRING_FRICTION: 0.9,

            WAVE_SPREAD: 0.3,

            ACCELARATION_RATE: 0.01,


            init: function () {

                this.initHeight =
                    this.renderer.height *
                    this.renderer
                        .INIT_HEIGHT_RATE;


                this.height =
                    this.initHeight;


                this.fy = 0;


                this.force = {

                    previous: 0,

                    next: 0

                };
            },


            setPreviousPoint:
                function (previous) {

                    this.previous =
                        previous;
                },


            setNextPoint:
                function (next) {

                    this.next =
                        next;
                },


            interfere:
                function (
                    y,
                    velocity
                ) {

                    this.fy =
                        this.renderer.height *
                        this.ACCELARATION_RATE *
                        (
                            (
                                this.renderer.height -
                                this.height -
                                y
                            ) >= 0
                                ? -1
                                : 1
                        ) *
                        Math.abs(
                            velocity
                        );
                },


            updateSelf:
                function () {

                    this.fy +=
                        this.SPRING_CONSTANT *
                        (
                            this.initHeight -
                            this.height
                        );


                    this.fy *=
                        this.SPRING_FRICTION;


                    this.height +=
                        this.fy;
                },


            updateNeighbors:
                function () {

                    if (this.previous) {

                        this.force.previous =
                            this.WAVE_SPREAD *
                            (
                                this.height -
                                this.previous.height
                            );
                    }


                    if (this.next) {

                        this.force.next =
                            this.WAVE_SPREAD *
                            (
                                this.height -
                                this.next.height
                            );
                    }
                },


            render:
                function (context) {

                    if (this.previous) {

                        this.previous.height +=
                            this.force.previous;

                        this.previous.fy +=
                            this.force.previous;
                    }


                    if (this.next) {

                        this.next.height +=
                            this.force.next;

                        this.next.fy +=
                            this.force.next;
                    }


                    context.lineTo(
                        this.x,
                        this.renderer.height -
                        this.height
                    );
                }
        };


        /* =====================================================
           FISH
        ===================================================== */

        var FISH =
            function (renderer) {

                this.renderer =
                    renderer;

                this.init();
            };


        FISH.prototype = {

            GRAVITY: 0.4,


            init: function () {

                this.direction =
                    Math.random() < 0.5;


                this.x =
                    this.direction
                        ? (
                            this.renderer.width +
                            this.renderer.THRESHOLD
                        )
                        : -this.renderer.THRESHOLD;


                this.vx =
                    (
                        Math.random() * 5 + 3
                    ) *
                    (
                        this.direction
                            ? -1
                            : 1
                    );


                this.y =
                    (
                        Math.random() *
                        this.renderer.height *
                        0.3
                    ) +
                    (
                        this.renderer.height *
                        0.6
                    );


                this.vy =
                    Math.random() * -3 - 2;


                this.ay =
                    Math.random() * -0.15 - 0.05;


                this.isOut = false;
            },


            reverseVertical:
                function () {

                    this.isOut =
                        !this.isOut;

                    this.ay *= -1;
                },


            controlStatus:
                function () {

                    this.previousY =
                        this.y;


                    this.x +=
                        this.vx;


                    this.y +=
                        this.vy;


                    this.vy +=
                        this.ay;


                    if (
                        this.y <
                        this.renderer.height *
                        this.renderer
                            .INIT_HEIGHT_RATE
                    ) {

                        this.vy +=
                            this.GRAVITY;

                        this.isOut = true;

                    } else {

                        this.isOut = false;
                    }


                    this.renderer
                        .generateEpicenter(
                            this.x,
                            this.y,
                            this.y -
                            this.previousY
                        );


                    if (
                        (
                            this.vx > 0 &&
                            this.x >
                            this.renderer.width +
                            this.renderer.THRESHOLD
                        )
                        ||
                        (
                            this.vx < 0 &&
                            this.x <
                            -this.renderer.THRESHOLD
                        )
                    ) {

                        this.init();
                    }
                },


            render:
                function (context) {

                    context.save();


                    context.translate(
                        this.x,
                        this.y
                    );


                    context.rotate(
                        Math.PI +
                        Math.atan2(
                            this.vy,
                            this.vx
                        )
                    );


                    context.scale(
                        1,
                        this.direction
                            ? 1
                            : -1
                    );


                    context.beginPath();


                    context.moveTo(
                        -25,
                        0
                    );


                    context.bezierCurveTo(
                        -15,
                        12,
                        10,
                        8,
                        30,
                        0
                    );


                    context.bezierCurveTo(
                        10,
                        -8,
                        -15,
                        -12,
                        -25,
                        0
                    );


                    context.fill();


                    context.restore();


                    this.controlStatus();
                }
        };


        /* =====================================================
           START FISH
        ===================================================== */

        $(function () {

            RENDERER.init();

        });

    }



    /* =========================================================
       SAKURA / FALLING IMAGE
       
       Ảnh:
       https://files.catbox.moe/k5h1qm.png

       Đã sửa:
       - Gán ảnh trực tiếp bằng JS
       - Không phụ thuộc background-image trong CSS
       - Có 3D
       - Có gió
       - Có xoay
       - Không bị mất hoa
    ========================================================= */

    (function () {

        const sakuraContainer =
            document.createElement("div");

        sakuraContainer.id =
            "sakura-container";

        document.body.appendChild(
            sakuraContainer
        );


        /* =====================================================
           STYLE CHO CONTAINER
        ===================================================== */

        sakuraContainer.style.position =
            "fixed";

        sakuraContainer.style.top =
            "0";

        sakuraContainer.style.left =
            "0";

        sakuraContainer.style.width =
            "100vw";

        sakuraContainer.style.height =
            "100vh";

        sakuraContainer.style.pointerEvents =
            "none";

        sakuraContainer.style.overflow =
            "hidden";

        sakuraContainer.style.zIndex =
            "9998";


        function createSakura() {

            const sakura =
                document.createElement("img");

            sakura.className =
                "sakura";


            /* =================================================
               ẢNH HOA
            ================================================= */

            sakura.src =
                "https://files.catbox.moe/k5h1qm.png";


            /* =================================================
               KÍCH THƯỚC
            ================================================= */

            const size =
                Math.random() * 12 + 10;


            /* =================================================
               VỊ TRÍ
            ================================================= */

            const startX =
                Math.random() *
                window.innerWidth;


            /* =================================================
               TỐC ĐỘ
            ================================================= */

            const duration =
                Math.random() * 5 + 6;


            const delay =
                Math.random() * 1.5;


            /* =================================================
               GIÓ
            ================================================= */

            const wind =
                (
                    Math.random() - 0.5
                ) * 250;


            /* =================================================
               XOAY
            ================================================= */

            const rotate =
                Math.random() * 720 - 360;


            /* =================================================
               STYLE
            ================================================= */

            sakura.style.position =
                "absolute";

            sakura.style.width =
                size + "px";

            sakura.style.height =
                size + "px";

            sakura.style.objectFit =
                "contain";

            sakura.style.left =
                startX + "px";

            sakura.style.top =
                "-40px";

            sakura.style.pointerEvents =
                "none";

            sakura.style.userSelect =
                "none";

            sakura.style.willChange =
                "transform";


            sakura.style.setProperty(
                "--wind",
                wind + "px"
            );


            sakura.style.setProperty(
                "--rotate",
                rotate + "deg"
            );


            /* =================================================
               ANIMATION
            ================================================= */

            sakura.style.animation =
                `pblSakuraFall ${duration}s linear ${delay}s forwards`;


            sakuraContainer.appendChild(
                sakura
            );


            /* =================================================
               XÓA HOA
            ================================================= */

            setTimeout(
                function () {

                    if (
                        sakura &&
                        sakura.parentNode
                    ) {

                        sakura.remove();
                    }

                },
                (
                    duration +
                    delay
                ) * 1000 + 1000
            );
        }


        /* =====================================================
           TẠO KEYFRAME BẰNG JS
           
           Không cần thêm CSS.
        ===================================================== */

        if (
            !document.getElementById(
                "pbl-sakura-style"
            )
        ) {

            const style =
                document.createElement("style");

            style.id =
                "pbl-sakura-style";

            style.textContent = `

                @keyframes pblSakuraFall {

                    0% {

                        transform:
                            translate3d(
                                0,
                                -50px,
                                0
                            )
                            rotate(
                                0deg
                            )
                            scale(
                                0.7
                            );

                        opacity:
                            0;
                    }

                    8% {

                        opacity:
                            1;
                    }

                    30% {

                        transform:
                            translate3d(
                                calc(
                                    var(--wind) * 0.25
                                ),
                                30vh,
                                120px
                            )
                            rotate(
                                calc(
                                    var(--rotate) * 0.3
                                )
                            )
                            scale(
                                1
                            );
                    }

                    60% {

                        transform:
                            translate3d(
                                calc(
                                    var(--wind) * -0.5
                                ),
                                65vh,
                                -100px
                            )
                            rotate(
                                calc(
                                    var(--rotate) * 0.7
                                )
                            )
                            scale(
                                0.85
                            );
                    }

                    100% {

                        transform:
                            translate3d(
                                var(--wind),
                                115vh,
                                0
                            )
                            rotate(
                                var(--rotate)
                            )
                            scale(
                                0.7
                            );

                        opacity:
                            0;
                    }
                }

            `;

            document.head.appendChild(
                style
            );
        }


        /* =====================================================
           HOA LIÊN TỤC
        ===================================================== */

        setInterval(
            createSakura,
            120
        );


        /* =====================================================
           TẠO SẴN
        ===================================================== */

        for (
            let i = 0;
            i < 25;
            i++
        ) {

            setTimeout(
                createSakura,
                i * 100
            );
        }

    })();

});
