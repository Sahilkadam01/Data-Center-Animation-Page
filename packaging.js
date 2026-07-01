
/* ==========================================
   PACKAGING SECTION
========================================== */

const packagingSection =
document.querySelector(".packaging-section");

const titleWrap =
packagingSection.querySelector(".title-wrap");

/* ONE INTRO VIDEO */
const introWrapper =
document.querySelector(".packaging-intro-video-wrapper");

const introVideo =
document.querySelector(".packaging-intro-video");

/* TABS */

const packTabs =
document.querySelectorAll(".pack-tab");

const packContents =
document.querySelectorAll(".packaging-content");

const packVideos =
document.querySelectorAll(".packaging-video-wrapper");

if (
    packagingSection &&
    introVideo &&
    packTabs.length
){

    let packagingTriggered = false;

    function activatePackaging(){

        if(packagingTriggered) return;

        packagingTriggered = true;

        titleWrap.style.display = "flex";
        titleWrap.classList.remove("animate");

        void titleWrap.offsetWidth;

        setTimeout(()=>{

            titleWrap.classList.add("animate");

        },600);

        /* Wait for title animation */

        setTimeout(()=>{

            titleWrap.style.display="none";

            /* Show intro video */

            introWrapper.style.display="block";

            introVideo.currentTime=0;

            introVideo.play().catch(()=>{});

            const startShrink=()=>{

                const duration=introVideo.duration;

                if(!duration || isNaN(duration)){

                    setTimeout(shrinkIntro,5000);

                    return;

                }

                const shrinkTime=
                Math.max((duration-2)*1000,0);

                setTimeout(shrinkIntro,shrinkTime);

            };

            if(introVideo.readyState>=1){

                startShrink();

            }else{

                introVideo.addEventListener(
                    "loadedmetadata",
                    startShrink,
                    {once:true}
                );

            }

        },1800);

    }
        /* ==========================================
       INTRO VIDEO SHRINK
    ========================================== */

    function shrinkIntro(){

        // Shrink all image wrappers (same effect as before)
        packVideos.forEach(wrapper=>{
            wrapper.classList.add("shrink");
        });

        // Shrink intro video
        introWrapper.classList.add("shrink");

        // Wait until CSS transition completes
        setTimeout(()=>{

            // Hide intro video
            introVideo.pause();
            introWrapper.style.display="none";

            // Show active image
            const activeWrapper =
            document.querySelector(
                ".packaging-video-wrapper.active"
            );

            if(activeWrapper){

                const activeImg =
                activeWrapper.querySelector(".img-card");

                if(activeImg){

                    activeImg.style.display="flex";

                }

            }

            // Show active content
            const activeContent =
            document.querySelector(
                ".packaging-content.active"
            );

            if(activeContent){

                activeContent.classList.add("show");

            }

        },900); // Match your CSS transition duration

    }


    /* ==========================================
       OBSERVER
    ========================================== */

    const packagingObserver =
    new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                activatePackaging();

            }else{

                packagingTriggered=false;

                /* Reset title */

                titleWrap.style.display="flex";
                titleWrap.classList.remove("animate");

                /* Show intro again */

                introWrapper.style.display="block";
                introWrapper.classList.remove("shrink");

                introVideo.pause();
                introVideo.currentTime=0;

                /* Remove shrink from image wrappers */

                packVideos.forEach(wrapper=>{

                    wrapper.classList.remove("shrink");

                });

                /* Hide all images */

                document
                .querySelectorAll(".img-card")
                .forEach(img=>{

                    img.style.display="none";

                });

                /* Remove content */

                packContents.forEach(content=>{

                    content.classList.remove("show");

                });

            }

        });

    },{
        threshold:.6
    });

    packagingObserver.observe(packagingSection);
}
/* ==========================================
   TAB SWITCHER
========================================== */

packTabs.forEach((tab, index) => {

    tab.addEventListener("click", () => {

        if (tab.classList.contains("active")) return;

        /* ACTIVE TAB */

        packTabs.forEach(t => {
            t.classList.remove("active");
        });

        tab.classList.add("active");

        const currentContent =
        document.querySelector(".packaging-content.active");

        const currentWrapper =
        document.querySelector(".packaging-video-wrapper.active");

        const currentImg =
        currentWrapper ?
        currentWrapper.querySelector(".img-card") :
        null;


        /* CURRENT CONTENT OUT */

        if(currentContent){

            currentContent.style.transform =
            "translateY(-50%) translateX(-250px)";

            currentContent.style.opacity="0";

        }


        /* CURRENT IMAGE OUT */

        if(currentImg){

            currentImg.style.transition =
            "transform .4s ease, opacity .4s ease";

            currentImg.style.transform =
            "translateX(-250px)";

            currentImg.style.opacity="0";

        }


        setTimeout(()=>{

            /* REMOVE ACTIVE */

            packContents.forEach(content=>{

                content.classList.remove("active");
                content.classList.remove("show");

            });

            packVideos.forEach(wrapper=>{

                wrapper.classList.remove("active");

                const img =
                wrapper.querySelector(".img-card");

                if(img){

                    img.style.display="none";
                    img.style.opacity="0";
                    img.style.transform="translateX(250px)";

                }

            });


            /* NEXT */

            const nextContent =
            packContents[index];

            const nextWrapper =
            packVideos[index];

            const nextImg =
            nextWrapper.querySelector(".img-card");


            nextContent.classList.add("active");
            nextContent.classList.add("show");

            nextWrapper.classList.add("active");


            /* START POSITION */

            nextContent.style.transition="none";
            nextContent.style.transform =
            "translateY(-50%) translateX(250px)";
            nextContent.style.opacity="0";


            if(nextImg){

                nextImg.style.display="flex";

                nextImg.style.transition="none";

                nextImg.style.transform=
                "translateX(250px)";

                nextImg.style.opacity="0";

            }


            void nextContent.offsetWidth;


            nextContent.style.transition =
            "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";


            if(nextImg){

                nextImg.style.transition =
                "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

            }


            requestAnimationFrame(()=>{

                nextContent.style.transform =
                "translateY(-50%) translateX(0)";

                nextContent.style.opacity="1";


                if(nextImg){

                    nextImg.style.transform =
                    "translateX(0)";

                    nextImg.style.opacity="1";

                }

            });

        },400);

    });

});



























// /* ==========================================
//    PACKAGING SECTION
// ========================================== */

// const packagingSection =document.querySelector(".packaging-section");

// const packagingVideo =document.querySelector(".packaging-video");

// const packagingContent =document.querySelector(".packaging-content");

// const packTabs =document.querySelectorAll(".pack-tab");

// const packContents =document.querySelectorAll(".packaging-content");

// const packVideos =document.querySelectorAll(".packaging-video-wrapper");

// const titleWrap = packagingSection.querySelector(".title-wrap");

// if (
//   packagingSection &&
//   packagingVideo &&
//   packagingContent &&
//   packTabs.length
// ) {

//   let packagingTriggered = false;
//   let played = false;

//   /* ==========================================
//        SECTION ENTRY ANIMATION
//     ========================================== */


//   function activatePackaging() {

//     if (packagingTriggered) return;

//     packagingTriggered = true;

//     // Reset title animation
//     played = false;
//     titleWrap.classList.remove("animate");
//     void titleWrap.offsetWidth;

//     // Keep title visible for a moment
//     setTimeout(() => {

//       titleWrap.classList.add("animate");

//     }, 600);

//     // Wait until title animation completes
//     setTimeout(() => {

//       // Hide title completely
//       titleWrap.style.display = "none";

//       // Start video
//       packagingVideo.currentTime = 0;
//       packagingVideo.play().catch(() => {});

//       // Shrink video

//       // Play video
//       packagingVideo.currentTime = 0;
//       packagingVideo.play().catch(() => {});

//       // Wait until video metadata is loaded
//       const startShrink = () => {

//         const duration = packagingVideo.duration;

//         // If duration isn't available, use a fallback
//         if (!duration || isNaN(duration)) {

//           setTimeout(() => {

//             packVideos.forEach(video => {
//               video.classList.add("shrink");
//             });

//             const activeContent = document.querySelector(".packaging-content.active");

//             if (activeContent) {
//               activeContent.classList.add("show");
//             }

//           }, 5000);

//           return;
//         }

//         // Shrink 2 seconds before the video ends
//         const shrinkTime = Math.max((duration - 2) * 1000, 0);

//         setTimeout(() => {

//           packVideos.forEach(video => {
//             video.classList.add("shrink");
//           });

//     const activeWrapper = document.querySelector(".packaging-video-wrapper.active");

//     if (!activeWrapper) return;

//     const video = activeWrapper.querySelector(".packaging-video");
//     const img = activeWrapper.querySelector(".img-card");

//     // start shrink
//     activeWrapper.classList.add("shrink");

//     // ensure video is playing (important for sync)
//     if (video) {
//         video.currentTime = 0;
//         video.play().catch(() => {});
//     }


//     // SAFETY: prevent double execution
//     let done = false;

//     const swap = () => {

//         if (done) return;
//         done = true;

//         // hide video
//         if (video) {
//             video.pause();
//             video.style.display = "none";
//         }

//         // show image
//         if (img) {
//             img.style.display = "block";
//         }

//         // show content
//         const activeContent = document.querySelector(".packaging-content.active");
//         if (activeContent) {
//             activeContent.classList.add("show");
//         }
//     };

//     // IMPORTANT: match this with CSS transition duration
//     setTimeout(swap, 900);

// }, shrinkTime);
//       };

//       // Metadata may already be loaded
//       if (packagingVideo.readyState >= 1) {
//         startShrink();
//       } else {
//         packagingVideo.addEventListener("loadedmetadata", startShrink, { once: true });
//       }

//     }, 1800);

//   }

//   const packagingObserver =
//         new IntersectionObserver((entries) => {

//           entries.forEach(entry => {

//             if (entry.isIntersecting) {

//               activatePackaging();

//             } else {

//               titleWrap.style.display = "flex";
//               titleWrap.classList.remove("animate");

//               played = false;

//               titleWrap.classList.remove("animate");


//               packagingTriggered = false;

//               /* FIX 3 */
//               packVideos.forEach(video => {
//                 video.classList.remove("shrink");
//               });

//               packContents.forEach(content => {
//                 content.classList.remove("show");
//               });

//             }

//           });

//         }, {
//           threshold: 0.6
//         });

//   packagingObserver.observe(packagingSection);

//   /* ==========================================
//        TAB SWITCHER
//     ========================================== */

//   packTabs.forEach((tab, index) => {

//     tab.addEventListener("click", () => {

//       if (tab.classList.contains("active")) return;

//       /* ACTIVE TAB */

//       packTabs.forEach(t =>
//                        t.classList.remove("active")
//                       );

//       tab.classList.add("active");

//       const currentContent =
//             document.querySelector(
//               ".packaging-content.active"
//             );

//       const currentVideo =
//             document.querySelector(
//               ".packaging-video-wrapper.active"
//             );

//       /* CURRENT CONTENT OUT */

//       if(currentContent){

//         currentContent.style.transform =
//           "translateY(-50%) translateX(-250px)";

//         currentContent.style.opacity = "0";

//       }

//       /* CURRENT VIDEO OUT */

//       if(currentVideo){

//         const currentVideoEl =
//               currentVideo.querySelector(
//                 ".packaging-video"
//               );

//         if(currentVideoEl){

//           currentVideoEl.style.transform =
//             "translateX(-250px)";

//           currentVideoEl.style.opacity =
//             "0";

//         }

//       }

//       setTimeout(() => {

//         /* REMOVE ACTIVE */

//         packContents.forEach(content => {

//           content.classList.remove("active");
//           content.classList.remove("show");

//         });

//         /* FIX 1 */
//         packVideos.forEach(videoWrap => {

//           videoWrap.classList.remove("active");

//           /* KEEP EVERY VIDEO SHRUNK */
//           videoWrap.classList.add("shrink");

//         });

//         /* NEXT ELEMENTS */

//         const nextContent =
//               packContents[index];

//         const nextVideo =
//               packVideos[index];


//         const nextVideoEl =
//               nextVideo.querySelector(
//                 ".packaging-video"
//               );

//         nextContent.classList.add("active");
//         nextContent.classList.add("show");

//         nextVideo.classList.add("active");

//         /* START FROM RIGHT */

//         nextContent.style.transition =
//           "none";

//         nextContent.style.transform =
//           "translateY(-50%) translateX(250px)";

//         nextContent.style.opacity =
//           "0";

//         if(nextVideoEl){

//           nextVideoEl.style.transition =
//             "none";

//           nextVideoEl.style.transform =
//             "translateX(250px)";

//           nextVideoEl.style.opacity =
//             "0";

//         }

//         void nextContent.offsetWidth;

//         nextContent.style.transition =
//           "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

//         if(nextVideoEl){

//           nextVideoEl.style.transition =
//             "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

//         }

//         requestAnimationFrame(() => {

//           nextContent.style.transform =
//             "translateY(-50%) translateX(0)";

//           nextContent.style.opacity =
//             "1";

//           if(nextVideoEl){

//             nextVideoEl.style.transform =
//               "translateX(0)";

//             nextVideoEl.style.opacity =
//               "1";

//           }

//         });

//         /* PLAY ACTIVE VIDEO */

//         const activeVideo =
//               nextVideo.querySelector("video");

//         if(activeVideo){

//           activeVideo.currentTime = 0;

//           activeVideo.play()
//             .catch(() => {});

//         }

//       }, 400);

//     });

//   });

//   // mouse drag
//   /* ==========================================
//    MOUSE DRAG / SWIPE TABS
// ========================================== */
//   /* ==========================================
//    DRAG TO CHANGE TAB
// ========================================== */

//   let dragStartX = 0;
//   let dragging = false;
//   let currentIndex = 0;

//   // Keep current index updated
//   packTabs.forEach((tab, index) => {
//     tab.addEventListener("click", () => {
//       currentIndex = index;
//     });
//   });

//   // Drag on the whole packaging area
//   const dragArea = document.querySelector(".packaging-wrap");

//   dragArea.addEventListener("pointerdown", (e) => {

//     dragging = true;
//     dragStartX = e.clientX;

//   });

//   window.addEventListener("pointerup", (e) => {

//     if (!dragging) return;

//     dragging = false;

//     const distance = e.clientX - dragStartX;

//     // Ignore tiny movements
//     if (Math.abs(distance) < 100) return;

//     // Swipe Left
//     if (distance < 0) {

//       if (currentIndex < packTabs.length - 1) {

//         currentIndex++;

//         packTabs[currentIndex].click();

//       }

//     }

//     // Swipe Right
//     else {

//       if (currentIndex > 0) {

//         currentIndex--;

//         packTabs[currentIndex].click();

//       }

//     }

//   });



// }


// end here