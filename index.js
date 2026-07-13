document.addEventListener("DOMContentLoaded", () => {

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



// // end here

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

// bookmark js start from here


    const links = document.querySelectorAll('.bookmark_item');
  
    links.forEach(link => {
  
      link.addEventListener('click', function(e) {
  
        e.preventDefault();
  
        links.forEach(item => {
          item.classList.remove('active');
        });
  
        this.classList.add('active');
  
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
  
        if (targetSection) {
  
          const headerOffset = 0;
  
          const targetPosition =
            targetSection.getBoundingClientRect().top +
            window.pageYOffset -
            headerOffset;
  
          // Delay before scrolling
          setTimeout(() => {
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }, 800); 
  
        }
  
      });
  
    });
  
    window.addEventListener('scroll', setActiveSection);
  
    setActiveSection();
  
  });
//end here



/* ==========================================
   PACKAGING SECTION
========================================== */

const packagingSection =
document.querySelector(".packaging-section");

if (packagingSection) 
{

    const titleWrap =
    packagingSection.querySelector(".title-wrap");

    /* ONE INTRO VIDEO */

    const introWrapper =
    packagingSection.querySelector(".packaging-intro-video-wrapper");

    const introVideo =
    packagingSection.querySelector(".packaging-intro-video");

    /* TABS */

    const packTabs =
    packagingSection.querySelectorAll(".pack-tab");

    const packContents =
    packagingSection.querySelectorAll(".packaging-content");

    const packVideos =
    packagingSection.querySelectorAll(".packaging-video-wrapper");

    let packagingTriggered = false;

    let shrinkStarted = false;


    /* ==========================================
       SECTION ENTRY
    ========================================== */

    function activatePackaging() {

        if (packagingTriggered) return;

        packagingTriggered = true;

        shrinkStarted = false;

        /* Reset title */

        titleWrap.style.display = "flex";

        titleWrap.classList.remove("animate");

        void titleWrap.offsetWidth;

        setTimeout(() => {

            titleWrap.classList.add("animate");

        }, 600);

        /* Wait for title animation */

        setTimeout(() => {

            titleWrap.style.display = "none";

            /* Show Intro Video */

            introWrapper.style.display = "block";

            introWrapper.classList.remove("shrink");

            introVideo.pause();

            introVideo.currentTime = 0;

            lockScroll();

            introVideo.play().catch(() => {});

            /* Wait for metadata */

            if (introVideo.readyState >= 1) {

                startShrink();

            } else {

                introVideo.addEventListener(

                    "loadedmetadata",

                    startShrink,

                    { once: true }

                );

            }

        }, 1800);

    }

    /* ==========================================
       START SHRINK
       Starts when only 2 seconds remain
    ========================================== */

    function startShrink() {

        introVideo.removeEventListener(
            "timeupdate",
            monitorRemainingTime
        );

        introVideo.addEventListener(
            "timeupdate",
            monitorRemainingTime
        );

    }

    function monitorRemainingTime() {

        if (shrinkStarted) return;

        if (!introVideo.duration) return;

        const remaining =
        introVideo.duration -
        introVideo.currentTime;

        if (remaining <= 2) {

            shrinkStarted = true;

            introVideo.removeEventListener(
                "timeupdate",
                monitorRemainingTime
            );

            shrinkIntro();

        }

    }
  /* ==========================================
   INTRO VIDEO SHRINK
  ========================================== */

 function shrinkIntro() {

    /* Shrink the image containers */

    packVideos.forEach(wrapper => {

        wrapper.classList.add("shrink");

    });

    /* Shrink intro video */

    introWrapper.classList.add("shrink");

    /* Wait until animation finishes */

    const onTransitionEnd = (e) => {

        if (e.target !== introWrapper) return;

        if (
            e.propertyName !== "transform" &&
            e.propertyName !== "width" &&
            e.propertyName !== "height"
        ) return;

        introWrapper.removeEventListener(
            "transitionend",
            onTransitionEnd
        );

        /* Stop intro video */

        introVideo.pause();

        introVideo.currentTime = 0;

        /* Hide intro */

        introWrapper.style.display = "none";

        /* Show active image */

        const activeWrapper =
        packagingSection.querySelector(
            ".packaging-video-wrapper.active"
        );

        if (activeWrapper) {

            const activeImg =
            activeWrapper.querySelector(".img-card");

            if (activeImg) {

                activeImg.style.display = "flex";

                activeImg.style.opacity = "0";

                activeImg.style.transform =
                "translateX(20px)";

                requestAnimationFrame(() => {

                    activeImg.style.transition =
                    "opacity .5s ease, transform .5s ease";

                    activeImg.style.opacity = "1";

                    activeImg.style.transform =
                    "translateX(0)";

                });

            }

        }

        /* Show active content */

        const activeContent =
        packagingSection.querySelector(
            ".packaging-content.active"
        );

        if (activeContent) {

            activeContent.classList.add("show");

        }

    };

    introWrapper.addEventListener(
        "transitionend",
        onTransitionEnd
    );

}


/* ==========================================
   INTERSECTION OBSERVER (Desktop Only)
========================================== */

if (window.innerWidth > 1024) {

    const packagingObserver =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                if (!packagingTriggered) {
                    activatePackaging();
                }
            
            } else {
            

                /* Allow animation again */

                packagingTriggered = false;

                shrinkStarted = false;

                /* -------------------------
                   Reset Title
                ------------------------- */

                titleWrap.style.display = "flex";

                titleWrap.classList.remove("animate");

                /* -------------------------
                   Reset Intro Video
                ------------------------- */

                introWrapper.style.display = "block";

                introWrapper.classList.remove("shrink");

                introVideo.pause();

                introVideo.currentTime = 0;

                introVideo.removeEventListener(
                    "timeupdate",
                    monitorRemainingTime
                );

                /* -------------------------
                   Reset Image Wrappers
                ------------------------- */

                packVideos.forEach(wrapper => {

                    wrapper.classList.remove("shrink");

                    wrapper.classList.remove("active");

                    const img = wrapper.querySelector(".img-card");

                    if (img) {

                        img.style.display = "none";
                        img.style.opacity = "0";
                        img.style.transform = "";
                        img.style.transition = "";

                    }

                });

                /* -------------------------
                   Reset Contents
                ------------------------- */

                packContents.forEach((content, index) => {

                    content.classList.remove("active");
                    content.classList.remove("show");

                    content.style.opacity = "";
                    content.style.transform = "";
                    content.style.transition = "";

                    if (index === 0) {

                        content.classList.add("active");

                    }

                });

                /* -------------------------
                   Reset Tabs
                ------------------------- */

                packTabs.forEach((tab, index) => {

                    tab.classList.remove("active");

                    if (index === 0) {

                        tab.classList.add("active");

                    }

                });

                /* -------------------------
                   Reset First Image
                ------------------------- */

                if (packVideos.length) {

                    packVideos[0].classList.add("active");

                }

            }

        });

    }, {
        threshold: 0.9
    });

    packagingObserver.observe(packagingSection);

} else {

    // ===============================
    // Mobile / Tablet (≤1024px)
    // Skip intro animation
    // ===============================

    titleWrap.style.display = "none";

    introWrapper.style.display = "none";

    packContents[0].classList.add("active");
    packContents[0].classList.add("show");

    packVideos[0].classList.add("active");

    const firstImg = packVideos[0].querySelector(".img-card");

    if (firstImg) {
        firstImg.style.display = "block";
        firstImg.style.opacity = "1";
        firstImg.style.transform = "translateX(0)";
    }

}


window.scrollTo()



/* ==========================================
   TAB SWITCHER
========================================== */

packTabs.forEach((tab, index) => {

    tab.addEventListener("click", () => {

        if (tab.classList.contains("active")) return;

        /* -------------------------
           ACTIVE TAB
        ------------------------- */

        packTabs.forEach(t =>
            t.classList.remove("active")
        );

        tab.classList.add("active");

        const currentContent =
        packagingSection.querySelector(
            ".packaging-content.active"
        );

        const currentWrapper =
        packagingSection.querySelector(
            ".packaging-video-wrapper.active"
        );

        const currentImg =
        currentWrapper ?
        currentWrapper.querySelector(".img-card") :
        null;

        /* -------------------------
           CONTENT OUT
        ------------------------- */

        if (currentContent) {

            currentContent.style.transition =
            "transform .45s ease, opacity .45s ease";

            currentContent.style.transform =
            "translateY(-50%) translateX(-180px)";

            currentContent.style.opacity = "0";

        }

        /* -------------------------
           IMAGE OUT
        ------------------------- */

        if (currentImg) {

            currentImg.style.transition =
            "transform .45s ease, opacity .45s ease";

            currentImg.style.transform =
            "translateX(-180px)";

            currentImg.style.opacity = "0";

        }

        setTimeout(() => {

            /* -------------------------
               RESET ACTIVE STATES
            ------------------------- */

            packContents.forEach(content => {

                content.classList.remove("active");
                content.classList.remove("show");

            });

            packVideos.forEach(wrapper => {

                wrapper.classList.remove("active");

                const img =
                wrapper.querySelector(".img-card");

                if (img) {

                    img.style.display = "none";

                    img.style.opacity = "0";

                    img.style.transform =
                    "translateX(180px)";

                }

            });

            /* -------------------------
               NEXT ITEMS
            ------------------------- */

            const nextContent =
            packContents[index];

            const nextWrapper =
            packVideos[index];

            const nextImg =
            nextWrapper.querySelector(".img-card");

            nextContent.classList.add("active");
            nextContent.classList.add("show");

            nextWrapper.classList.add("active");

            /* -------------------------
               START POSITIONS
            ------------------------- */

            nextContent.style.transition = "none";

            nextContent.style.transform =
                "translateY(-50%) translateX(180px)";

            nextContent.style.opacity = "0";

            if (nextImg) {

                nextImg.style.display = "block";

                nextImg.style.transition = "none";

                nextImg.style.transform =
                    "translateX(180px)";

                nextImg.style.opacity = "0";

            }

            /* Force Reflow */

            void nextContent.offsetWidth;

            /* -------------------------
               ENABLE TRANSITIONS
            ------------------------- */

            nextContent.style.transition =
                "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

            if (nextImg) {

                nextImg.style.transition =
                    "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

            }

            /* -------------------------
               PLAY ENTRANCE ANIMATION
            ------------------------- */

            requestAnimationFrame(() => {

                nextContent.style.transform =
                    "translateY(-50%) translateX(0)";

                nextContent.style.opacity = "1";

                if (nextImg) {

                    nextImg.style.transform =
                        "translateX(0)";

                    nextImg.style.opacity = "1";

                }

            });

        }, 400);

    });

});

}

/* ==========================================
   END PACKAGING SECTION
========================================== */



