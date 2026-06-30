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

const titleWrap = packagingSection.querySelector(".title-wrap");

    

if (
    packagingSection &&
    packagingVideo &&
    packagingContent &&
    packTabs.length
) {

    let packagingTriggered = false;
    let played = false;

    /* ==========================================
       SECTION ENTRY ANIMATION
    ========================================== */

    function playTitleAnimation(){

        if(played) return;

        played = true;

        // Reset state
        titleWrap.classList.remove("animate");

        void titleWrap.offsetWidth;

        // Wait a little so the title is visible first
        setTimeout(()=>{

            titleWrap.classList.add("animate");

        },600);

    }


    function activatePackaging() {

        if (packagingTriggered) return;
    
        packagingTriggered = true;
    
        // Reset title animation
        played = false;
        titleWrap.classList.remove("animate");
        void titleWrap.offsetWidth;
    
        // Keep title visible for a moment
        setTimeout(() => {
    
            titleWrap.classList.add("animate");
    
        }, 600);
    
        // Wait until title animation completes
        setTimeout(() => {
    
            // Hide title completely
            titleWrap.style.display = "none";
    
            // Start video
            packagingVideo.currentTime = 0;
            packagingVideo.play().catch(() => {});
    
            // Shrink video

            // Play video
packagingVideo.currentTime = 0;
packagingVideo.play().catch(() => {});

// Wait until video metadata is loaded
const startShrink = () => {

    const duration = packagingVideo.duration;

    // If duration isn't available, use a fallback
    if (!duration || isNaN(duration)) {

        setTimeout(() => {

            packVideos.forEach(video => {
                video.classList.add("shrink");
            });

            const activeContent = document.querySelector(".packaging-content.active");

            if (activeContent) {
                activeContent.classList.add("show");
            }

        }, 5000);

        return;
    }

    // Shrink 2 seconds before the video ends
    const shrinkTime = Math.max((duration - 2) * 1000, 0);

    setTimeout(() => {

        packVideos.forEach(video => {
            video.classList.add("shrink");
        });

        setTimeout(() => {

            const activeContent = document.querySelector(".packaging-content.active");

            if (activeContent) {
                activeContent.classList.add("show");
            }

        }, 500);

    }, shrinkTime);
};

// Metadata may already be loaded
if (packagingVideo.readyState >= 1) {
    startShrink();
} else {
    packagingVideo.addEventListener("loadedmetadata", startShrink, { once: true });
}
    
        }, 1800);
    
    }

    const packagingObserver =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                activatePackaging();

            } else {

                titleWrap.style.display = "flex";
titleWrap.classList.remove("animate");

                played = false;

                titleWrap.classList.remove("animate");


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

// mouse drag
/* ==========================================
   MOUSE DRAG / SWIPE TABS
========================================== */
/* ==========================================
   DRAG TO CHANGE TAB
========================================== */

let dragStartX = 0;
let dragging = false;
let currentIndex = 0;

// Keep current index updated
packTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        currentIndex = index;
    });
});

// Drag on the whole packaging area
const dragArea = document.querySelector(".packaging-wrap");

dragArea.addEventListener("pointerdown", (e) => {

    dragging = true;
    dragStartX = e.clientX;

});

window.addEventListener("pointerup", (e) => {

    if (!dragging) return;

    dragging = false;

    const distance = e.clientX - dragStartX;

    // Ignore tiny movements
    if (Math.abs(distance) < 100) return;

    // Swipe Left
    if (distance < 0) {

        if (currentIndex < packTabs.length - 1) {

            currentIndex++;

            packTabs[currentIndex].click();

        }

    }

    // Swipe Right
    else {

        if (currentIndex > 0) {

            currentIndex--;

            packTabs[currentIndex].click();

        }

    }

});

    

}



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


// partner section js start from here
const cards = document.querySelectorAll(".partner-card");

/* EXPAND BUTTON */
cards.forEach(card => {

    const btn = card.querySelector(".expand-btn");

    btn.addEventListener("click", (e) => {

        e.stopPropagation();

        if(card.classList.contains("active")){

            card.classList.remove("active");

            cards.forEach(other => {
                other.classList.remove("hide");
            });

            return;
        }

        cards.forEach(other => {

            other.classList.remove("active");
            other.classList.remove("hide");

        });

        card.classList.add("active");

        cards.forEach(other => {

            if(other !== card){
                other.classList.add("hide");
            }

        });

    });

    /* CLICK ACTIVE CARD TO CLOSE */
    card.addEventListener("click", (e) => {

        if(
            card.classList.contains("active") &&
            !e.target.closest(".expand-btn")
        ){

            card.classList.remove("active");

            cards.forEach(other => {
                other.classList.remove("hide");
            });

        }

    });

});

/* CLICK OUTSIDE */
document.addEventListener("click", (e) => {

    if(!e.target.closest(".partner-card")){

        cards.forEach(card => {

            card.classList.remove("active");
            card.classList.remove("hide");

        });

    }

});



// end here

// navbar js start from here
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");
    menuBtn.classList.toggle("active");

    if(menuBtn.classList.contains("active")){

        menuBtn.children[0].style.transform =
        "rotate(45deg) translateY(10px)";

        menuBtn.children[1].style.opacity = "0";

        menuBtn.children[2].style.transform =
        "rotate(-45deg) translateY(-10px)";
    }
    else{

        menuBtn.children[0].style.transform = "";

        menuBtn.children[1].style.opacity = "1";

        menuBtn.children[2].style.transform = "";
    }
});
// end here

});