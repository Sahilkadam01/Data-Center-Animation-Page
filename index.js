document.addEventListener("DOMContentLoaded", () => {

  const section = document.querySelector(".asic-section");
  const wrapper = document.querySelector(".video-wrapper");
  const video = document.querySelector(".asic-video");
  const content = document.querySelector(".asic-content");

  let triggered = false;

  // SECTION ANIMATION
  function activate() {

      if (triggered) return;

      triggered = true;

      video.play().catch(() => {});

      setTimeout(() => {

          wrapper.classList.add("shrink");

          setTimeout(() => {
              content.classList.add("show");
          }, 500);

      }, 300);

  }

  const observer = new IntersectionObserver((entries) => {

      entries.forEach(entry => {

          if (entry.isIntersecting) {

              activate();

          } else {

              triggered = false;

              wrapper.classList.remove("shrink");
              content.classList.remove("show");

          }

      });

  }, {
      threshold: 0.6
  });

  observer.observe(section);

  // TAB SWITCHER
  const tabs = document.querySelectorAll(".tab");
  const title = document.querySelector(".asic-title");

  tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        if (tab.classList.contains("active")) return;

        tabs.forEach(btn => btn.classList.remove("active"));
        tab.classList.add("active");

        const newTitle = tab.dataset.title;
        const newVideo = tab.dataset.video;

        // OLD CONTENT ONLY GOES LEFT
        title.style.transform = "translateX(-300px)";
        title.style.opacity = "0";

        video.style.transform = "translateX(-300px)";
        video.style.opacity = "0";

        setTimeout(() => {

            title.textContent = newTitle;

            const source = video.querySelector("source");

            if (source) {
                source.src = newVideo;
            }

            video.load();
            video.play().catch(() => {});

            // NEW CONTENT STARTS FROM RIGHT
            title.style.transition = "none";
            video.style.transition = "none";

            title.style.transform = "translateX(300px)";
            title.style.opacity = "0";

            video.style.transform = "translateX(300px)";
            video.style.opacity = "0";

            // Force repaint
            void title.offsetWidth;

            // Restore transition
            title.style.transition = "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";
            video.style.transition = "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

            requestAnimationFrame(() => {

                // ONLY NEW CONTENT COMES FROM RIGHT
                title.style.transform = "translateX(0)";
                title.style.opacity = "1";

                video.style.transform = "translateX(0)";
                video.style.opacity = "1";

            });

        }, 400);

    });

});

// packing section js start from here 
/* ==========================================
   PACKAGING SECTION
========================================== */

/* ==========================================
   PACKAGING SECTION
========================================== */

const packagingSection =
document.querySelector(".packaging-section");

const packagingVideo =
document.querySelector(".packaging-video");

const packagingContent =
document.querySelector(".packaging-content");

const packTabs =
document.querySelectorAll(".pack-tab");

const packContents =
document.querySelectorAll(".packaging-content");

const packVideos =
document.querySelectorAll(".packaging-video-wrapper");

if (
    packagingSection &&
    packagingVideo &&
    packagingContent &&
    packTabs.length
) {

    let packagingTriggered = false;

    /* ==========================================
       SECTION ENTRY ANIMATION
    ========================================== */

    function activatePackaging() {

        if (packagingTriggered) return;

        packagingTriggered = true;

        packagingVideo.play().catch(() => {});

        setTimeout(() => {

            /* FIX 2 */
            packVideos.forEach(video => {
                video.classList.add("shrink");
            });

            setTimeout(() => {

                const activeContent =
                document.querySelector(
                    ".packaging-content.active"
                );

                if(activeContent){
                    activeContent.classList.add("show");
                }

            }, 500);

        }, 300);

    }

    const packagingObserver =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                activatePackaging();

            } else {

                packagingTriggered = false;

                /* FIX 3 */
                packVideos.forEach(video => {
                    video.classList.remove("shrink");
                });

                packContents.forEach(content => {
                    content.classList.remove("show");
                });

            }

        });

    }, {
        threshold: 0.6
    });

    packagingObserver.observe(packagingSection);

    /* ==========================================
       TAB SWITCHER
    ========================================== */

    packTabs.forEach((tab, index) => {

        tab.addEventListener("click", () => {

            if (tab.classList.contains("active")) return;

            /* ACTIVE TAB */

            packTabs.forEach(t =>
                t.classList.remove("active")
            );

            tab.classList.add("active");

            const currentContent =
            document.querySelector(
                ".packaging-content.active"
            );

            const currentVideo =
            document.querySelector(
                ".packaging-video-wrapper.active"
            );

            /* CURRENT CONTENT OUT */

            if(currentContent){

                currentContent.style.transform =
                "translateY(-50%) translateX(-250px)";

                currentContent.style.opacity = "0";

            }

            /* CURRENT VIDEO OUT */

            if(currentVideo){

                const currentVideoEl =
                currentVideo.querySelector(
                    ".packaging-video"
                );

                if(currentVideoEl){

                    currentVideoEl.style.transform =
                    "translateX(-250px)";

                    currentVideoEl.style.opacity =
                    "0";

                }

            }

            setTimeout(() => {

                /* REMOVE ACTIVE */

                packContents.forEach(content => {

                    content.classList.remove("active");
                    content.classList.remove("show");

                });

                /* FIX 1 */
                packVideos.forEach(videoWrap => {

                    videoWrap.classList.remove("active");

                    /* KEEP EVERY VIDEO SHRUNK */
                    videoWrap.classList.add("shrink");

                });

                /* NEXT ELEMENTS */

                const nextContent =
                packContents[index];

                const nextVideo =
                packVideos[index];

                const nextVideoEl =
                nextVideo.querySelector(
                    ".packaging-video"
                );

                nextContent.classList.add("active");
                nextContent.classList.add("show");

                nextVideo.classList.add("active");

                /* START FROM RIGHT */

                nextContent.style.transition =
                "none";

                nextContent.style.transform =
                "translateY(-50%) translateX(250px)";

                nextContent.style.opacity =
                "0";

                if(nextVideoEl){

                    nextVideoEl.style.transition =
                    "none";

                    nextVideoEl.style.transform =
                    "translateX(250px)";

                    nextVideoEl.style.opacity =
                    "0";

                }

                void nextContent.offsetWidth;

                nextContent.style.transition =
                "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

                if(nextVideoEl){

                    nextVideoEl.style.transition =
                    "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

                }

                requestAnimationFrame(() => {

                    nextContent.style.transform =
                    "translateY(-50%) translateX(0)";

                    nextContent.style.opacity =
                    "1";

                    if(nextVideoEl){

                        nextVideoEl.style.transform =
                        "translateX(0)";

                        nextVideoEl.style.opacity =
                        "1";

                    }

                });

                /* PLAY ACTIVE VIDEO */

                const activeVideo =
                nextVideo.querySelector("video");

                if(activeVideo){

                    activeVideo.currentTime = 0;

                    activeVideo.play()
                    .catch(() => {});

                }

            }, 400);

        });

    });

}

// const packagingSection = document.querySelector(".packaging-section");
// const packagingWrapper = document.querySelector(".packaging-video-wrapper");
// const packagingVideo = document.querySelector(".packaging-video");
// const packagingContent = document.querySelector(".packaging-content");

// if (
//     packagingSection &&
//     packagingWrapper &&
//     packagingVideo &&
//     packagingContent
// ) {

//     let packagingTriggered = false;

//     function activatePackaging() {

//         if (packagingTriggered) return;

//         packagingTriggered = true;

//         packagingVideo.play().catch(() => {});

//         setTimeout(() => {

//             packagingWrapper.classList.add("shrink");

//             setTimeout(() => {
//                 packagingContent.classList.add("show");
//             }, 500);

//         }, 300);
//     }

//     const packagingObserver = new IntersectionObserver((entries) => {

//         entries.forEach(entry => {

//             if (entry.isIntersecting) {

//                 activatePackaging();

//             } else {

//                 packagingTriggered = false;

//                 packagingWrapper.classList.remove("shrink");
//                 packagingContent.classList.remove("show");
//             }

//         });

//     }, {
//         threshold: 0.6
//     });

//     packagingObserver.observe(packagingSection);

//     /* ==========================================
//        PACKAGING TAB SWITCHER
//     ========================================== */

//     const packTabs = document.querySelectorAll(".pack-tab");
//     const packContents = document.querySelectorAll(".packaging-content");
//     const packVideos = document.querySelectorAll(".packaging-video-wrapper");
    
//     packTabs.forEach((tab, index) => {
    
//         tab.addEventListener("click", () => {
    
//             if(tab.classList.contains("active")) return;
    
//             packTabs.forEach(t => t.classList.remove("active"));
//             tab.classList.add("active");
    
//             const currentContent =
//                 document.querySelector(".packaging-content.active");
    
//             const currentVideo =
//                 document.querySelector(".packaging-video-wrapper.active");
    
//             // CURRENT OUT LEFT
//             if(currentContent){
//                 currentContent.style.transform =
//                     "translateY(-50%) translateX(-300px)";
//                 currentContent.style.opacity = "0";
//             }
    
//             if(currentVideo){
//                 currentVideo.style.transform =
//                     "translate(-50%,-50%) translateX(-300px)";
//                 currentVideo.style.opacity = "0";
//             }
    
//             setTimeout(() => {
    
//                 packContents.forEach(content => {
//                     content.classList.remove("active");
//                 });
    
//                 packVideos.forEach(videoWrap => {
//                     videoWrap.classList.remove("active");
//                     videoWrap.classList.remove("shrink");
//                 });
    
//                 const nextContent = packContents[index];
//                 const nextVideo = packVideos[index];
    
//                 nextContent.classList.add("active");
//                 nextVideo.classList.add("active");
    
//                 // START FROM RIGHT
//                 nextContent.style.transition = "none";
//                 nextVideo.style.transition = "none";
    
//                 nextContent.style.transform =
//                     "translateY(-50%) translateX(300px)";
//                 nextContent.style.opacity = "0";
    
//                 nextVideo.style.transform =
//                     "translate(-50%,-50%) translateX(300px)";
//                 nextVideo.style.opacity = "0";
    
//                 void nextContent.offsetWidth;
    
//                 nextContent.style.transition =
//                     "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";
    
//                 nextVideo.style.transition =
//                     "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";
    
//                 requestAnimationFrame(() => {
    
//                     nextContent.style.transform =
//                         "translateY(-50%) translateX(0)";
//                     nextContent.style.opacity = "1";
    
//                     nextVideo.style.transform =
//                         "translate(-50%,-50%) translateX(0)";
//                     nextVideo.style.opacity = "1";
    
//                 });
    
//                 const activeVideo = nextVideo.querySelector("video");
    
//                 if(activeVideo){
//                     activeVideo.currentTime = 0;
//                     activeVideo.play().catch(() => {});
//                 }
    
//                 setTimeout(() => {
//                     nextVideo.classList.add("shrink");
//                 }, 100);
    
//             }, 400);
    
//         });
    
//     });
// }

// end here

// last section tabbers cards js start from hre
const capCards = document.querySelectorAll(".cap-card");

capCards.forEach(card => {

    card.querySelector(".cap-toggle").addEventListener("click", () => {

        capCards.forEach(item => {

            if(item !== card){
                item.classList.remove("active");
            }

        });

        card.classList.toggle("active");

    });

});

// end here 


});