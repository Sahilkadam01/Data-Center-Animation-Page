document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTS
    ========================================== */

    const section =
    document.querySelector(".asic-section");

    if (!section) return;

    const wrapper =
    section.querySelector(".media-wrapper");

    const video =
    section.querySelector(".asic-video");

    const image =
    section.querySelector(".asic-image");

    const card =
    section.querySelector(".asic-card");

    const content =
    section.querySelector(".asic-content");

    const title =
    section.querySelector(".asic-title");

    const tabs =
    section.querySelectorAll(".tab");

    const source =
    video.querySelector("source");

    let triggered = false;

    /* ==========================================
       SHOW MEDIA
    ========================================== */

    function hideAllMedia() {

        video.pause();

        video.style.display = "none";

        image.style.display = "none";

        card.style.display = "none";

    }

    function playVideo(src) {

        hideAllMedia();

        video.style.display = "block";

        source.src = src;

        video.load();

        video.currentTime = 0;

        video.play().catch(() => {});

    }

    function showImage(src) {

        hideAllMedia();

        image.style.display = "block";

        image.src = src;

    }

    function showCard(tab) {

        hideAllMedia();

        card.style.display = "flex";

        /* Multiple Cards */

        if (tab.dataset.card1Title) {

            card.querySelector(".card1-title").textContent =
            tab.dataset.card1Title;

            card.querySelector(".card1-desc").textContent =
            tab.dataset.card1Desc;

            card.querySelector(".card2-title").textContent =
            tab.dataset.card2Title;

            card.querySelector(".card2-desc").textContent =
            tab.dataset.card2Desc;

            card.querySelector(".card3-title").textContent =
            tab.dataset.card3Title;

            card.querySelector(".card3-desc").textContent =
            tab.dataset.card3Desc;

        }

        /* Single Card */

        else if (tab.dataset.cardTitle) {

            card.querySelector(".card1-title").textContent =
            tab.dataset.cardTitle;

            card.querySelector(".card1-desc").textContent =
            tab.dataset.cardDescription;

        }

    }

    /* ==========================================
       SECTION ENTRY
    ========================================== */

    function activate() {

        if (triggered) return;

        triggered = true;

        const activeTab =
        section.querySelector(".tab.active");

        if (!activeTab) return;

        switch (activeTab.dataset.type) {

            case "video":

                playVideo(activeTab.dataset.video);

                break;

            case "image":

                showImage(activeTab.dataset.image);

                break;

            case "card":

                showCard(activeTab);

                break;

        }

        setTimeout(() => {

            wrapper.classList.add("shrink");

            setTimeout(() => {

                content.classList.add("show");

            }, 500);

        }, 300);

    }
    /* ==========================================
       INTERSECTION OBSERVER
    ========================================== */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                activate();

            } else {

                triggered = false;

                /* -------------------------
                   Reset Section
                ------------------------- */

                wrapper.classList.remove("shrink");

                content.classList.remove("show");

                /* -------------------------
                   Stop Video
                ------------------------- */

                video.pause();

                video.currentTime = 0;

                /* -------------------------
                   Reset Media
                ------------------------- */

                hideAllMedia();

                image.removeAttribute("src");

                /* -------------------------
                   Reset Tabs
                ------------------------- */

                tabs.forEach((tab, index) => {

                    tab.classList.remove("active");

                    if (index === 0) {

                        tab.classList.add("active");

                    }

                });

                /* -------------------------
                   Reset Title
                ------------------------- */

                if (tabs.length) {

                    title.textContent =
                    tabs[0].dataset.title;

                }

                /* -------------------------
                   Restore First Tab
                ------------------------- */

                const firstTab = tabs[0];

                if (firstTab) {

                    switch (firstTab.dataset.type) {

                        case "video":

                            playVideo(firstTab.dataset.video);

                            break;

                        case "image":

                            showImage(firstTab.dataset.image);

                            break;

                        case "card":

                            showCard(firstTab);

                            break;

                    }

                }

                /* -------------------------
                   Reset Animation
                ------------------------- */

                title.style.transition = "";

                title.style.transform = "translateX(0)";

                title.style.opacity = "1";

                video.style.transition = "";

                video.style.transform = "translateX(0)";

                video.style.opacity = "1";

                image.style.transition = "";

                image.style.transform = "translateX(0)";

                image.style.opacity = "1";

                card.style.transition = "";

                card.style.transform = "translateX(0)";

                card.style.opacity = "1";

            }

        });

    }, {

        threshold: 0.6

    });

    observer.observe(section);
    /* ==========================================
       TAB SWITCHER
    ========================================== */

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            if (tab.classList.contains("active")) return;

            /* -------------------------
               Active Tab
            ------------------------- */

            tabs.forEach(btn => {

                btn.classList.remove("active");

            });

            tab.classList.add("active");

            const type = tab.dataset.type;

            const newTitle = tab.dataset.title;

            /* -------------------------
               Current Media
            ------------------------- */

            let currentMedia = video;

            if (image.style.display === "block") {

                currentMedia = image;

            }

            if (card.style.display === "flex") {

                currentMedia = card;

            }

            /* Stop current video */

            if (video.style.display === "block") {

                video.pause();

            }

            /* -------------------------
               Animate OUT
            ------------------------- */

            title.style.transform =
            "translateX(-300px)";

            title.style.opacity = "0";

            currentMedia.style.transform =
            "translateX(-300px)";

            currentMedia.style.opacity = "0";

            setTimeout(() => {

                /* -------------------------
                   Update Title
                ------------------------- */

                title.textContent = newTitle;

                /* -------------------------
                   Switch Media
                ------------------------- */

                if (type === "video") {

                    playVideo(tab.dataset.video);

                }

                else if (type === "image") {

                    showImage(tab.dataset.image);

                }

                else if (type === "card") {

                    showCard(tab);

                }

                /* -------------------------
                   Get Active Media
                ------------------------- */

                let nextMedia = video;

                if (type === "image") {

                    nextMedia = image;

                }

                if (type === "card") {

                    nextMedia = card;

                }

                /* -------------------------
                   Start From Right
                ------------------------- */

                title.style.transition = "none";

                nextMedia.style.transition = "none";

                title.style.transform =
                "translateX(300px)";

                title.style.opacity = "0";

                nextMedia.style.transform =
                "translateX(300px)";

                nextMedia.style.opacity = "0";
                /* -------------------------
                   Force Repaint
                ------------------------- */

                void nextMedia.offsetWidth;

                /* -------------------------
                   Restore Transition
                ------------------------- */

                title.style.transition =
                "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

                nextMedia.style.transition =
                "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

                requestAnimationFrame(() => {

                    title.style.transform =
                    "translateX(0)";

                    title.style.opacity =
                    "1";

                    nextMedia.style.transform =
                    "translateX(0)";

                    nextMedia.style.opacity =
                    "1";

                });

                /* -------------------------
                   Play Video if Active
                ------------------------- */

                if (type === "video") {

                    video.currentTime = 0;

                    video.play().catch(() => {});

                }

            }, 400);

        });

    });

});
// document.addEventListener("DOMContentLoaded", () => {

//     /* ==========================================
//        ELEMENTS
//     ========================================== */

//     const section =
//     document.querySelector(".asic-section");

//     const wrapper =
//     document.querySelector(".media-wrapper");

//     const video =
//     document.querySelector(".asic-video");

//     const image =
//     document.querySelector(".asic-image");

//     const content =
//     document.querySelector(".asic-content");

//     const title =
//     document.querySelector(".asic-title");

//     const tabs =
//     document.querySelectorAll(".tab");

//     let triggered = false;

//     /* ==========================================
//        SECTION ENTRY ANIMATION
//     ========================================== */

//     function activate() {

//         if (triggered) return;

//         triggered = true;

//         /* Play only if the first tab is video */

//         const activeTab =
//         document.querySelector(".tab.active");

//         if (
//             activeTab &&
//             activeTab.dataset.type === "video"
//         ) {

//             video.currentTime = 0;

//             video.play().catch(() => {});

//             video.style.display = "block";

//             image.style.display = "none";

//         }

//         setTimeout(() => {

//             wrapper.classList.add("shrink");

//             setTimeout(() => {

//                 content.classList.add("show");

//             }, 500);

//         }, 300);

//     }
//         /* ==========================================
//        INTERSECTION OBSERVER
//     ========================================== */

//     const observer = new IntersectionObserver((entries) => {

//         entries.forEach(entry => {

//             if (entry.isIntersecting) {

//                 activate();

//             } else {

//                 triggered = false;

//                 /* Reset Section */

//                 wrapper.classList.remove("shrink");

//                 content.classList.remove("show");

//                 /* Stop Video */

//                 video.pause();

//                 video.currentTime = 0;

//                 /* Reset First Tab */

//                 tabs.forEach((tab, index) => {

//                     tab.classList.remove("active");

//                     if (index === 0) {

//                         tab.classList.add("active");

//                     }

//                 });

//                 /* Reset Title */

//                 if (tabs.length) {

//                     title.textContent =
//                     tabs[0].dataset.title;

//                 }

//                 /* Reset Media */

//                 if (
//                     tabs.length &&
//                     tabs[0].dataset.type === "video"
//                 ) {

//                     image.style.display = "none";

//                     image.src = "";

//                     video.style.display = "block";

//                     const source =
//                     video.querySelector("source");

//                     source.src =
//                     tabs[0].dataset.video;

//                     video.load();

//                 } else if (tabs.length) {

//                     video.pause();

//                     video.style.display = "none";

//                     image.style.display = "block";

//                     image.src =
//                     tabs[0].dataset.image;

//                 }

//                 /* Reset Animation */

//                 video.style.opacity = "1";
//                 video.style.transform = "translateX(0)";

//                 image.style.opacity = "1";
//                 image.style.transform = "translateX(0)";

//                 title.style.opacity = "1";
//                 title.style.transform = "translateX(0)";

//             }

//         });

//     }, {
//         threshold: 0.6
//     });

//     observer.observe(section);

//         /* ==========================================
//        TAB SWITCHER
//     ========================================== */

//     tabs.forEach(tab => {

//         tab.addEventListener("click", () => {

//             if (tab.classList.contains("active")) return;

//             tabs.forEach(btn => btn.classList.remove("active"));
//             tab.classList.add("active");

//             const newTitle = tab.dataset.title;
//             const type = tab.dataset.type;
//             const newVideo = tab.dataset.video;
//             const newImage = tab.dataset.image;

//             /* Current visible media */

//             const currentMedia =
//             video.style.display === "none"
//                 ? image
//                 : video;

//             /* Animate current title & media out */

//             title.style.transform = "translateX(-300px)";
//             title.style.opacity = "0";

//             currentMedia.style.transform =
//                 "translateX(-300px)";
//             currentMedia.style.opacity = "0";

//             setTimeout(() => {

//                 /* Update title */

//                 title.textContent = newTitle;

//                 /* Switch media */

//                 if (type === "video") {

//                     image.style.display = "none";

//                     video.style.display = "block";

//                     const source =
//                     video.querySelector("source");

//                     source.src = newVideo;

//                     video.load();

//                     video.play().catch(() => {});

//                 } else {

//                     video.pause();

//                     video.style.display = "none";

//                     image.style.display = "block";

//                     image.src = newImage;

//                 }

//                 const nextMedia =
//                 type === "video"
//                     ? video
//                     : image;

//                 /* Start from right */

//                 title.style.transition = "none";
//                 nextMedia.style.transition = "none";

//                 title.style.transform =
//                     "translateX(300px)";
//                 title.style.opacity = "0";

//                 nextMedia.style.transform =
//                     "translateX(300px)";
//                 nextMedia.style.opacity = "0";

//                 /* Force repaint */

//                 void title.offsetWidth;

//                 /* Restore transition */

//                 title.style.transition =
//                     "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

//                 nextMedia.style.transition =
//                     "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";

//                 requestAnimationFrame(() => {

//                     title.style.transform =
//                         "translateX(0)";
//                     title.style.opacity = "1";

//                     nextMedia.style.transform =
//                         "translateX(0)";
//                     nextMedia.style.opacity = "1";

//                 });

//             }, 400);

//         });

//     });

// });