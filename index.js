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
// const menuBtn = document.querySelector(".menu-btn");
// const nav = document.querySelector(".nav");

// menuBtn.addEventListener("click", () => {

//     nav.classList.toggle("active");
//     menuBtn.classList.toggle("active");

//     if(menuBtn.classList.contains("active")){

//         menuBtn.children[0].style.transform =
//         "rotate(45deg) translateY(10px)";

//         menuBtn.children[1].style.opacity = "0";

//         menuBtn.children[2].style.transform =
//         "rotate(-45deg) translateY(-10px)";
//     }
//     else{

//         menuBtn.children[0].style.transform = "";

//         menuBtn.children[1].style.opacity = "1";

//         menuBtn.children[2].style.transform = "";
//     }
// });
// // end here

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



/* ==========================================PACKAGING SECTION========================================== */


/* ==========================================
   PACKAGING SECTION
========================================== */

const packagingSection =
document.querySelector(".packaging-section");

if (packagingSection)
{

    /* ==========================================
       FLAGS
    ========================================== */

    let packagingTriggered = false;

    let introPlayed = false;

    /* ==========================================
       ELEMENTS
    ========================================== */

    const titleWrap =
    packagingSection.querySelector(".title-wrap");

    const introWrapper =
    packagingSection.querySelector(
        ".packaging-intro-video-wrapper"
    );

    const introVideo =
    packagingSection.querySelector(
        ".packaging-intro-video"
    );

    const packTabs =
    packagingSection.querySelectorAll(".pack-tab");

    const packContents =
    packagingSection.querySelectorAll(
        ".packaging-content"
    );

    const packVideos =
    packagingSection.querySelectorAll(
        ".packaging-video-wrapper"
    );

    /* ==========================================
       INITIAL RESET
    ========================================== */

    function resetPackaging()
    {

        packTabs.forEach((tab, index) => {

            tab.classList.toggle("active", index === 0);

        });

        packContents.forEach((content, index) => {

            content.classList.remove("active");
            content.classList.remove("show");

            if (index === 0)
            {
                content.classList.add("active");
                content.classList.add("show");
            }

        });

        packVideos.forEach((wrapper, index) => {

            wrapper.classList.remove("active");

            const img =
            wrapper.querySelector(".img-card");

            if (!img) return;

            img.style.transition = "";
            img.style.transform = "";
            img.style.opacity = "";

            if (index === 0)
            {
                wrapper.classList.add("active");

                img.style.display = "flex";
                img.style.opacity = "1";
            }
            else
            {
                img.style.display = "none";
                img.style.opacity = "0";
            }

        });

    }

    resetPackaging();
    /* ==========================================
       ACTIVATE PACKAGING
    ========================================== */

    function activatePackaging()
    {

        if (packagingTriggered) return;

        packagingTriggered = true;

        /* ----------------------------------
           INTRO ALREADY PLAYED
        ---------------------------------- */

        if (introPlayed)
        {

            titleWrap.style.display = "none";

            introWrapper.style.display = "none";

            resetPackaging();

            return;

        }

        introPlayed = true;

        resetPackaging();

        /* ----------------------------------
           TITLE ANIMATION
        ---------------------------------- */

        titleWrap.style.display = "flex";

        titleWrap.classList.remove("animate");

        void titleWrap.offsetWidth;

        setTimeout(() => {

            titleWrap.classList.add("animate");

        }, 600);

        /* ----------------------------------
           SHOW INTRO VIDEO
        ---------------------------------- */

        setTimeout(() => {

            titleWrap.style.display = "none";

            introWrapper.style.display = "block";

            introWrapper.style.opacity = "1";

            introWrapper.style.pointerEvents = "auto";

            introVideo.pause();

            introVideo.currentTime = 0;

            introVideo.load();

            introVideo.play()
            .then(() => {

                console.log("Packaging intro started");

            })
            .catch(err => {

                console.error(err);

            });

            /* ----------------------------------
               VIDEO COMPLETE
            ---------------------------------- */

            introVideo.onended = () => {

                endIntro();

            };

        }, 1800);

    }

    /* ==========================================
       END INTRO
    ========================================== */

    function endIntro()
    {

        introWrapper.style.transition =
            "opacity .8s ease";

        introWrapper.style.opacity = "0";

        setTimeout(() => {

            introWrapper.style.display = "none";

            introWrapper.style.pointerEvents = "none";

            introWrapper.style.opacity = "";

            introWrapper.style.transition = "";

        }, 800);

    }

    /* ==========================================
       INTERSECTION OBSERVER
    ========================================== */

    const packagingObserver =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting)
            {

                activatePackaging();

            }
            else
            {

                packagingTriggered = false;

                /* ------------------------------
                   Reset First State
                ------------------------------ */

                resetPackaging();

                /* ------------------------------
                   Restore Intro
                ------------------------------ */

                titleWrap.style.display = "flex";

                titleWrap.classList.remove("animate");

                introWrapper.style.display = "block";

                introWrapper.style.opacity = "1";

                introWrapper.style.pointerEvents = "auto";

                introVideo.pause();

                introVideo.currentTime = 0;

            }

        });

    },
    {
        threshold: 0.6
    });

    packagingObserver.observe(packagingSection);

    /* ==========================================
       TAB SWITCHER
    ========================================== */

    packTabs.forEach((tab, index) => {

        tab.addEventListener("click", () => {

            if (tab.classList.contains("active")) return;

            /* ----------------------------------
               ACTIVE TAB
            ---------------------------------- */

            packTabs.forEach((t, i) => {

                t.classList.toggle("active", i === index);

            });

            /* ----------------------------------
               CONTENT
            ---------------------------------- */

            packContents.forEach((content, i) => {

                content.classList.remove("active");
                content.classList.remove("show");

                if (i === index) {

                    content.classList.add("active");
                    content.classList.add("show");

                }

            });

            /* ----------------------------------
               IMAGES
            ---------------------------------- */

            packVideos.forEach((wrapper, i) => {

                wrapper.classList.remove("active");

                const img =
                wrapper.querySelector(".img-card");

                if (!img) return;

                if (i === index) {

                    wrapper.classList.add("active");

                    img.style.display = "flex";
                    img.style.opacity = "1";
                    img.style.transform = "";
                    img.style.transition = "";

                }
                else {

                    img.style.display = "none";
                    img.style.opacity = "0";
                    img.style.transform = "";
                    img.style.transition = "";

                }

            });

        });

    });

}
/* ==========================================
   END PACKAGING SECTION
========================================== */



