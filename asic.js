document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       ELEMENTS
    ========================================================== */

    const section = document.querySelector(".asic-section");

    if (!section) return;

    const wrapper = section.querySelector(".media-wrapper");

    const content = section.querySelector(".asic-content");

    const title = section.querySelector(".asic-title");

    const subtitle = section.querySelector(".asic-subtitle");

    const description = section.querySelector(".asic-desc");

    const tabs = section.querySelectorAll(".tab");

    const slides = section.querySelectorAll(".asic-slide");

    let currentIndex = 0;

    let triggered = false;



    /* ==========================================================
       INITIAL STATE
    ========================================================== */

    slides.forEach((slide, index) => {

        slide.classList.remove("active");

        if (index === 0) {

            slide.classList.add("active");

        }

    });

    tabs.forEach((tab, index) => {

        tab.classList.remove("active");

        if (index === 0) {

            tab.classList.add("active");

        }

    });



    /* ==========================================================
       COPY CONTENT FROM FIRST SLIDE
    ========================================================== */

    updateContent(slides[0]);



    /* ==========================================================
       AUTOPLAY FIRST VIDEO
    ========================================================== */

    const firstVideo = slides[0].querySelector("video");

    if (firstVideo) {

        firstVideo.muted = true;

        firstVideo.play().catch(() => {});

    }



    /* ==========================================================
       UPDATE TITLE / SUBTITLE / DESCRIPTION
    ========================================================== */

    function updateContent(slide) {

        const data = slide.querySelector(".slide-content");

        if (!data) return;

        const slideTitle =
            data.querySelector(".slide-title");

        const slideSubtitle =
            data.querySelector(".slide-subtitle");

        const slideDesc =
            data.querySelector(".slide-description");

        if (slideTitle) {

            title.innerHTML = slideTitle.innerHTML;

        }

        if (slideSubtitle) {

            subtitle.innerHTML = slideSubtitle.innerHTML;

        }

        if (slideDesc) {

            description.innerHTML = slideDesc.innerHTML;

        }

    }



    /* ==========================================================
       STOP ALL VIDEOS
    ========================================================== */

    function stopAllVideos() {

        slides.forEach(slide => {

            const video = slide.querySelector("video");

            if (!video) return;

            video.pause();

            video.currentTime = 0;

        });

    }



    /* ==========================================================
       PLAY VIDEO OF ACTIVE SLIDE
    ========================================================== */

    function playVideo(slide) {

        stopAllVideos();

        const video = slide.querySelector("video");

        if (!video) return;

        video.currentTime = 0;

        video.play().catch(() => {});

    }
    /* ==========================================================
       ACTIVATE SECTION
    ========================================================== */

    function activate() {

        if (triggered) return;

        triggered = true;

        const currentSlide = slides[currentIndex];

        currentSlide.classList.add("active");

        updateContent(currentSlide);

        const video = currentSlide.querySelector("video");

        if (video && video.paused) {

            video.play().catch(() => {});

        }

        setTimeout(() => {

            wrapper.classList.add("shrink");

            setTimeout(() => {

                content.classList.add("show");

            }, 500);

        }, 300);

    }



    /* ==========================================================
       RESET SECTION
    ========================================================== */

    function resetSection() {

        triggered = false;

        wrapper.classList.remove("shrink");

        content.classList.remove("show");

    }



    /* ==========================================================
       INTERSECTION OBSERVER
    ========================================================== */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                activate();

            } else {

                resetSection();

            }

        });

    }, {

        threshold: 0.6

    });

    observer.observe(section);



    /* ==========================================================
       SHOW SLIDE
    ========================================================== */

    function showSlide(index) {

        slides.forEach(slide => {

            slide.classList.remove("active");

        });

        slides[index].classList.add("active");

        updateContent(slides[index]);

        playVideo(slides[index]);

        currentIndex = index;

    }
    /* ==========================================================
       TAB SWITCHER
    ========================================================== */

    tabs.forEach((tab, index) => {

        tab.addEventListener("click", () => {

            if (index === currentIndex) return;

            tabs.forEach(btn => btn.classList.remove("active"));
            tab.classList.add("active");

            const currentSlide = slides[currentIndex];
            const nextSlide = slides[index];

            /* ----------------------------------
               Animate OUT
            ---------------------------------- */

            title.style.transform = "translateX(-300px)";
            subtitle.style.transform = "translateX(-300px)";
            description.style.transform = "translateX(-300px)";
            currentSlide.style.transform = "translateX(-300px)";

            title.style.opacity = "0";
            subtitle.style.opacity = "0";
            description.style.opacity = "0";
            currentSlide.style.opacity = "0";

            setTimeout(() => {

                /* ----------------------------------
                   Hide Current Slide
                ---------------------------------- */

                currentSlide.classList.remove("active");

                /* ----------------------------------
                   Show Next Slide
                ---------------------------------- */

                nextSlide.classList.add("active");

                updateContent(nextSlide);

                playVideo(nextSlide);

                /* ----------------------------------
                   Prepare Animation
                ---------------------------------- */

                nextSlide.style.transition = "none";
                title.style.transition = "none";
                subtitle.style.transition = "none";
                description.style.transition = "none";

                nextSlide.style.transform = "translateX(300px)";
                title.style.transform = "translateX(300px)";
                subtitle.style.transform = "translateX(300px)";
                description.style.transform = "translateX(300px)";

                nextSlide.style.opacity = "0";
                title.style.opacity = "0";
                subtitle.style.opacity = "0";
                description.style.opacity = "0";

                void nextSlide.offsetWidth;

                /* ----------------------------------
                   Restore Transition
                ---------------------------------- */

                nextSlide.style.transition =
                    "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

                title.style.transition =
                    "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

                subtitle.style.transition =
                    "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

                description.style.transition =
                    "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

                requestAnimationFrame(() => {

                    nextSlide.style.transform = "translateX(0)";
                    title.style.transform = "translateX(0)";
                    subtitle.style.transform = "translateX(0)";
                    description.style.transform = "translateX(0)";

                    nextSlide.style.opacity = "1";
                    title.style.opacity = "1";
                    subtitle.style.opacity = "1";
                    description.style.opacity = "1";

                });

                currentIndex = index;
                /* ----------------------------------
                   RESET INLINE STYLES
                ---------------------------------- */

                nextSlide.addEventListener(
                    "transitionend",
                    function handler(e) {

                        if (e.propertyName !== "transform") return;

                        nextSlide.removeEventListener(
                            "transitionend",
                            handler
                        );

                        /* Reset Previous Slide */

                        currentSlide.style.transform = "";
                        currentSlide.style.opacity = "";
                        currentSlide.style.transition = "";

                        /* Reset Current Slide */

                        nextSlide.style.transform = "";
                        nextSlide.style.opacity = "";
                        nextSlide.style.transition = "";

                        /* Reset Title */

                        title.style.transform = "";
                        title.style.opacity = "";
                        title.style.transition = "";

                        /* Reset Subtitle */

                        subtitle.style.transform = "";
                        subtitle.style.opacity = "";
                        subtitle.style.transition = "";

                        /* Reset Description */

                        description.style.transform = "";
                        description.style.opacity = "";
                        description.style.transition = "";

                    },
                    { once: true }
                );

            }, 400);

        });

    });

});








// document.addEventListener("DOMContentLoaded", () => 
// {

//     /* ==========================================
//        ELEMENTS
//     ========================================== */

//     const section = document.querySelector(".asic-section");

//     if (!section) return;

//     const wrapper =
//     section.querySelector(".media-wrapper");

//     const content =
//     section.querySelector(".asic-content");

//     const title =
//     section.querySelector(".asic-title");

//     const subtitle =
//     section.querySelector(".asic-subtitle");

//     const description =
//     section.querySelector(".asic-desc");

//     const tabs =
//     section.querySelectorAll(".tab");

//     const slides =
//     section.querySelectorAll(".asic-slide");

//     let currentIndex = 0;

//     let triggered = false;

//     /* ==========================================
//        INITIAL CONTENT
//     ========================================== */

//     updateContent(slides[0]);

//     /* ==========================================
//        PLAY FIRST VIDEO
//     ========================================== */

//     const firstVideo =
//     slides[0].querySelector("video");

//     if (firstVideo) {

//         firstVideo.play().catch(() => {});

//     }

//     /* ==========================================
//        UPDATE CONTENT
//     ========================================== */

//     function updateContent(slide) {

//         const data =
//         slide.querySelector(".slide-content");

//         if (!data) return;

//         title.innerHTML =
//         data.querySelector(".slide-title").innerHTML;

//         subtitle.innerHTML =
//         data.querySelector(".slide-subtitle").innerHTML;

//         description.innerHTML =
//         data.querySelector(".slide-description").innerHTML;

//     }
//     /* ==========================================
//        SECTION ENTRY
//     ========================================== */

//     function activate() {

//         if (triggered) return;

//         triggered = true;

//         const currentSlide = slides[currentIndex];

//         currentSlide.classList.add("active");

//         const video = currentSlide.querySelector("video");

//         if (video && video.paused) {

//             video.play().catch(() => {});

//         }

//         setTimeout(() => {

//             wrapper.classList.add("shrink");

//             setTimeout(() => {

//                 content.classList.add("show");

//             }, 500);

//         }, 300);

//     }

//     /* ==========================================
//        INTERSECTION OBSERVER
//     ========================================== */

//     const observer = new IntersectionObserver((entries) => {

//         entries.forEach(entry => {

//             if (entry.isIntersecting) {

//                 activate();

//             } else {

//                 triggered = false;

//                 wrapper.classList.remove("shrink");

//                 content.classList.remove("show");

//             }

//         });

//     }, {

//         threshold: 0.6

//     });

//     observer.observe(section);

//     /* ==========================================
//        VIDEO HELPERS
//     ========================================== */

//     function stopAllVideos() {

//         slides.forEach(slide => {

//             const video = slide.querySelector("video");

//             if (!video) return;

//             video.pause();

//         });

//     }

//     function playVideo(slide) {

//         stopAllVideos();

//         const video = slide.querySelector("video");

//         if (!video) return;

//         video.currentTime = 0;

//         video.play().catch(() => {});

//     }

//     /* ==========================================
//        SHOW SLIDE
//     ========================================== */

//     function showSlide(index) {

//         slides.forEach(slide => {

//             slide.classList.remove("active");

//         });

//         slides[index].classList.add("active");

//         playVideo(slides[index]);

//         updateContent(slides[index]);

//         currentIndex = index;

//     }
//     /* ==========================================
//        TAB SWITCHER
//     ========================================== */

//     tabs.forEach((tab, index) => 
// {

//         tab.addEventListener("click", () => {

//             if (index === currentIndex) return;

//             tabs.forEach(btn => btn.classList.remove("active"));
//             tab.classList.add("active");

//             const currentSlide = slides[currentIndex];
//             const nextSlide = slides[index];

//             /* ----------------------------------
//                Animate current content OUT
//             ---------------------------------- */

//             title.style.transform = "translateX(-300px)";
//             title.style.opacity = "0";

//             subtitle.style.transform = "translateX(-300px)";
//             subtitle.style.opacity = "0";

//             description.style.transform = "translateX(-300px)";
//             description.style.opacity = "0";

//             currentSlide.style.transform = "translateX(-300px)";
//             currentSlide.style.opacity = "0";

//             setTimeout(() => {

//                 /* ----------------------------------
//                    Update Content
//                 ---------------------------------- */

//                 updateContent(nextSlide);

//                 /* ----------------------------------
//                    Switch Slides
//                 ---------------------------------- */

//                 currentSlide.classList.remove("active");
//                 nextSlide.classList.add("active");

//                 /* ----------------------------------
//                    Prepare New Slide
//                 ---------------------------------- */

//                 nextSlide.style.transition = "none";
//                 nextSlide.style.transform = "translateX(300px)";
//                 nextSlide.style.opacity = "0";

//                 title.style.transition = "none";
//                 subtitle.style.transition = "none";
//                 description.style.transition = "none";

//                 title.style.transform = "translateX(300px)";
//                 subtitle.style.transform = "translateX(300px)";
//                 description.style.transform = "translateX(300px)";

//                 title.style.opacity = "0";
//                 subtitle.style.opacity = "0";
//                 description.style.opacity = "0";

//                 /* Force Repaint */

//                 void nextSlide.offsetWidth;

//                 /* ----------------------------------
//                    Restore Transition
//                 ---------------------------------- */

//                 nextSlide.style.transition =
//                     "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

//                 title.style.transition =
//                     "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

//                 subtitle.style.transition =
//                     "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

//                 description.style.transition =
//                     "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

//                 /* ----------------------------------
//                    Animate Everything In
//                 ---------------------------------- */

//                 requestAnimationFrame(() => {

//                     title.style.transform = "translateX(0)";
//                     subtitle.style.transform = "translateX(0)";
//                     description.style.transform = "translateX(0)";

//                     title.style.opacity = "1";
//                     subtitle.style.opacity = "1";
//                     description.style.opacity = "1";

//                     nextSlide.style.transform = "translateX(0)";
//                     nextSlide.style.opacity = "1";

//                 });

//                 /* ----------------------------------
//                    Play Video (if any)
//                 ---------------------------------- */

//                 playVideo(nextSlide);

//                 currentIndex = index;

//             }, 400);

//         });

// });

//                 /* ----------------------------------
//                    RESET INLINE STYLES
//                 ---------------------------------- */

//                 nextSlide.addEventListener(
//                     "transitionend",
//                     function handler(e) {

//                         if (e.propertyName !== "transform") return;

//                         nextSlide.removeEventListener(
//                             "transitionend",
//                             handler
//                         );

//                         /* Reset Previous Slide */

//                         currentSlide.style.transform = "";
//                         currentSlide.style.opacity = "";
//                         currentSlide.style.transition = "";

//                         /* Reset Current Slide */

//                         nextSlide.style.transform = "";
//                         nextSlide.style.opacity = "";
//                         nextSlide.style.transition = "";

//                         /* Reset Title */

//                         title.style.transform = "";
//                         title.style.opacity = "";
//                         title.style.transition = "";

//                         /* Reset Subtitle */

//                         subtitle.style.transform = "";
//                         subtitle.style.opacity = "";
//                         subtitle.style.transition = "";

//                         /* Reset Description */

//                         description.style.transform = "";
//                         description.style.opacity = "";
//                         description.style.transition = "";

//                     },
//                     { once: true }
//                 );

//                 /* ----------------------------------
//                    UPDATE INDEX
//                 ---------------------------------- */

//                 currentIndex = index;

//             }, 400);
// // ********************************************************************************************************************
