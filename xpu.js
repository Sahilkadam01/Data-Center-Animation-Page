document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".xpu-blocks");

    if (!section) return;


    const canvas = section.querySelector(".xpu-blocks__canvas");
    const ctx = canvas.getContext("2d");

    const intro = section.querySelector(".xpu-blocks__intro");
    const media = section.querySelector(".xpu-blocks__media");


    const TOTAL_FRAMES = 570;

    const frames = [];

    let currentFrame = 1;
    let progress = 0;



    /* =====================================
       FRAME PATH
    ===================================== */

    function framePath(index){

        const number = 999 + index;

        return `assets/images/Third section/3_Creating the building blocks for the XPU_${number}.png`;

    }



    /* =====================================
       LOAD FRAME
    ===================================== */

    function loadFrame(index){

        return new Promise(resolve=>{

            const img = new Image();

            img.onload = () => {

                frames[index] = img;

                resolve();

            };


            img.onerror = () => {

                console.log(
                    "Missing frame:",
                    framePath(index)
                );

                resolve();

            };


            img.src = framePath(index);


        });

    }



    /* =====================================
       PRELOAD FIRST 40
    ===================================== */

    async function preloadFirst(){

        let jobs=[];


        for(let i=1;i<=40;i++){

            jobs.push(loadFrame(i));

        }


        await Promise.all(jobs);


        console.log("First frames loaded");

    }



    /* =====================================
       LOAD REMAINING
    ===================================== */

    async function loadRemaining(){

        for(let i=41;i<=TOTAL_FRAMES;i++){

            if(!frames[i]){

                await loadFrame(i);

            }

        }


        console.log("All frames loaded");

    }




    /* =====================================
       CANVAS SIZE
    ===================================== */

    function resizeCanvas(){

        const rect =
        canvas.getBoundingClientRect();


        canvas.width =
        rect.width * window.devicePixelRatio;


        canvas.height =
        rect.height * window.devicePixelRatio;


        ctx.setTransform(
            window.devicePixelRatio,
            0,
            0,
            window.devicePixelRatio,
            0,
            0
        );


        drawFrame(currentFrame);

    }



    window.addEventListener(
        "resize",
        resizeCanvas
    );




    /* =====================================
       DRAW FRAME
    ===================================== */

    function drawFrame(index){

        const img = frames[index];


        if(!img) return;


        const width =
        canvas.clientWidth;


        const height =
        canvas.clientHeight;


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        ctx.drawImage(
            img,
            0,
            0,
            width,
            height
        );

    }




    /* =====================================
       SCROLL PROGRESS
    ===================================== */

    function updateScroll(){


        const rect =
        section.getBoundingClientRect();



        progress =
        Math.min(
            Math.max(
                -rect.top /
                (section.offsetHeight -
                window.innerHeight),
                0
            ),
            1
        );



        /* INTRO */

        if(progress < .25){


            let p =
            progress/.25;


            intro.style.opacity = 1;


            intro.style.transform =
            `scale(${1+p*.4})`;


            media.style.opacity = 0;


        }



        else {


            intro.style.opacity = 0;


            media.style.opacity = 1;


            let videoProgress =
            (progress-.25)/.75;



            currentFrame =
            Math.floor(
                videoProgress *
                (TOTAL_FRAMES-1)
            ) + 1;



            drawFrame(currentFrame);


        }


    }




    window.addEventListener(
        "scroll",
        updateScroll
    );




    /* =====================================
       INIT
    ===================================== */

    async function init(){


        await preloadFirst();


        resizeCanvas();


        drawFrame(1);


        loadRemaining();


    }



    init();



});