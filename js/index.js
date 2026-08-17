document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       CONTRIBUTION GRID
    ========================================================= */

    const grid = document.getElementById("contribution-grid");

    if (grid) {

        const dots = [];
        const rows = 7;
        const cols = 52;

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

        setInterval(jdVisualizer, 180);
    }


    /* =========================================================
       TYPING EFFECT
    ========================================================= */

    const typingText =
        document.getElementById("typing-text");

    if (typingText) {

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

                    setTimeout(function () {

                        deleting = true;

                        typingEffect();

                    }, pauseAfterTyping);

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
       Lần đầu bấm  → random
       Bấm pause    → dừng
       Bấm tiếp     → next
       Hết bài      → next tự động
    ========================================================= */

    const playlist = [

        {
            name: "Về bên anh",
            url: "//thanhdieu.com/files/Về-Bên-Anh.mp3"
        },

        {
            name: "Anh đã quen với cô đơn",
            url: "//thanhdieu.com/files/Anh-Đã-Quen-Với-Cô-Đơn.mp3"
        },

        {
            name: "Em nào có tội",
            url: "//thanhdieu.com/files/Em-Nào-Có-Tội.mp3"
        },

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
        }

    ];


    const musicBtn =
        document.getElementById("music-btn");

    const bgMusic =
        document.getElementById("bg-music");


    if (
        musicBtn &&
        bgMusic &&
        playlist.length > 0
    ) {

        let currentSong = 0;
        let hasStarted = false;


        /* =====================================================
           LOAD SONG
        ===================================================== */

        function loadSong(index) {

            currentSong = index;

            bgMusic.src =
                playlist[currentSong].url;

            bgMusic.load();
        }


        /* =====================================================
           PLAYING STATE
        ===================================================== */

        function setPlayingState() {

            musicBtn.classList.add("playing");

            musicBtn.innerHTML =
                '<i class="fa-solid fa-pause"></i>';
        }


        /* =====================================================
           PAUSED STATE
        ===================================================== */

        function setPausedState() {

            musicBtn.classList.remove("playing");

            musicBtn.innerHTML =
                '<i class="fa-solid fa-music"></i>';
        }


        /* =====================================================
           PLAY MUSIC
        ===================================================== */

        function playMusic() {

            const promise =
                bgMusic.play();

            if (promise !== undefined) {

                promise
                    .then(function () {

                        setPlayingState();

                    })
                    .catch(function (error) {

                        console.log(
                            "Không thể phát nhạc:",
                            error
                        );

                        setPausedState();

                    });

            } else {

                setPlayingState();

            }
        }


        /* =====================================================
           NEXT SONG
        ===================================================== */

        function nextSong() {

            currentSong++;

            if (
                currentSong >=
                playlist.length
            ) {
                currentSong = 0;
            }

            loadSong(currentSong);

            playMusic();
        }


        /* =====================================================
           MUSIC BUTTON
        ===================================================== */

        musicBtn.addEventListener(
            "click",
            function () {

                /*
                 * Đang phát
                 * → PAUSE
                 */

                if (!bgMusic.paused) {

                    bgMusic.pause();

                    setPausedState();

                    return;
                }


                /*
                 * Lần đầu bấm
                 * → RANDOM
                 */

                if (!hasStarted) {

                    hasStarted = true;

                    currentSong =
                        Math.floor(
                            Math.random() *
                            playlist.length
                        );

                    loadSong(currentSong);

                    playMusic();

                    return;
                }


                /*
                 * Đã từng phát
                 * → NEXT
                 */

                nextSong();
            }
        );


        /* =====================================================
           HẾT BÀI
           → NEXT
        ===================================================== */

        bgMusic.addEventListener(
            "ended",
            function () {

                nextSong();

            }
        );


        /* =====================================================
           AUDIO ERROR
        ===================================================== */

        bgMusic.addEventListener(
            "error",
            function () {

                console.log(
                    "Không tải được file nhạc."
                );

                setPausedState();

            }
        );
    }


    /* =========================================================
       FLYING FISH BACKGROUND
       Chỉ chạy nếu có jQuery + container
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

                this.$window = $(window);

                this.$container =
                    $("#jsi-flying-fish-container");

                this.$canvas =
                    $("<canvas />");

                this.context =
                    this.$canvas
                        .appendTo(this.$container)
                        .get(0)
                        .getContext("2d");

                this.points = [];

                this.fishes = [];

                this.watchIds = [];
            },


            createSurfacePoints: function () {

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
                            i * this.pointInterval
                        );

                    var previous =
                        this.points[i - 1];

                    point.setPreviousPoint(
                        previous
                    );

                    previous.setNextPoint(
                        point
                    );

                    this.points.push(point);
                }
            },


            reconstructMethods: function () {

                this.watchWindowSize =
                    this.watchWindowSize.bind(this);

                this.jdugeToStopResize =
                    this.jdugeToStopResize.bind(this);

                this.startEpicenter =
                    this.startEpicenter.bind(this);

                this.moveEpicenter =
                    this.moveEpicenter.bind(this);

                this.reverseVertical =
                    this.reverseVertical.bind(this);

                this.render =
                    this.render.bind(this);
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
                    width: this.width,
                    height: this.height
                });

                this.reverse = false;

                this.fishes.push(
                    new FISH(this)
                );

                this.createSurfacePoints();
            },


            watchWindowSize: function () {

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


            clearTimer: function () {

                while (
                    this.watchIds.length > 0
                ) {

                    clearTimeout(
                        this.watchIds.pop()
                    );
                }
            },


            jdugeToStopResize: function () {

                var width =
                    this.$window.width();

                var height =
                    this.$window.height();

                var stopped =
                    (
                        width === this.tmpWidth &&
                        height === this.tmpHeight
                    );

                this.tmpWidth = width;

                this.tmpHeight = height;

                if (stopped) {

                    this.setup();
                }
            },


            bindEvent: function () {

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


            getAxis: function (event) {

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


            startEpicenter: function (event) {

                this.axis =
                    this.getAxis(event);
            },


            moveEpicenter: function (event) {

                var axis =
                    this.getAxis(event);

                if (!this.axis) {

                    this.axis = axis;
                }

                this.generateEpicenter(
                    axis.x,
                    axis.y,
                    axis.y - this.axis.y
                );

                this.axis = axis;
            },


            generateEpicenter: function (
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
                    index >= this.points.length
                ) {

                    return;
                }

                this.points[index]
                    .interfere(
                        y,
                        velocity
                    );
            },


            reverseVertical: function () {

                this.reverse =
                    !this.reverse;

                for (
                    var i = 0,
                    count = this.fishes.length;
                    i < count;
                    i++
                ) {

                    this.fishes[i]
                        .reverseVertical();
                }
            },


            controlStatus: function () {

                for (
                    var i = 0,
                    count = this.points.length;
                    i < count;
                    i++
                ) {

                    this.points[i]
                        .updateSelf();
                }

                for (
                    var j = 0,
                    count2 = this.points.length;
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
                        --this.intervalCount === 0
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
                    count = this.fishes.length;
                    i < count;
                    i++
                ) {

                    this.fishes[i]
                        .render(this.context);
                }

                this.context.save();

                this.context.globalCompositeOperation =
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
                    count2 = this.points.length;
                    j < count2;
                    j++
                ) {

                    this.points[j]
                        .render(this.context);
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
            function (renderer, x) {

                this.renderer = renderer;

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
                    this.renderer.INIT_HEIGHT_RATE;

                this.height =
                    this.initHeight;

                this.fy = 0;

                this.force = {
                    previous: 0,
                    next: 0
                };
            },


            setPreviousPoint: function (previous) {

                this.previous = previous;
            },


            setNextPoint: function (next) {

                this.next = next;
            },


            interfere: function (y, velocity) {

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
                    Math.abs(velocity);
            },


            updateSelf: function () {

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


            updateNeighbors: function () {

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


            render: function (context) {

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

                this.renderer = renderer;

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


            reverseVertical: function () {

                this.isOut =
                    !this.isOut;

                this.ay *= -1;
            },


            controlStatus: function () {

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
                    this.renderer.INIT_HEIGHT_RATE
                ) {

                    this.vy +=
                        this.GRAVITY;

                    this.isOut = true;

                } else {

                    this.isOut = false;
                }

                this.renderer.generateEpicenter(
                    this.x,
                    this.y,
                    this.y - this.previousY
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


            render: function (context) {

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

});

