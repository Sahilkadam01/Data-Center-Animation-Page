document.addEventListener("DOMContentLoaded", () => 
{

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
/* ========================================================== ACTIVATE SECTION ========================================================== */

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




/* ========================================================== RESET SECTION ========================================================== */

function resetSection() {

triggered = false;

wrapper.classList.remove("shrink");

content.classList.remove("show");

/* ----------------------------------
Reset Active Tab
---------------------------------- */

tabs.forEach(tab => tab.classList.remove("active"));

tabs[0].classList.add("active");

/* ----------------------------------
Reset Active Slide
---------------------------------- */

slides.forEach(slide => {

slide.classList.remove("active");

slide.style.transform = "";
slide.style.opacity = "";
slide.style.transition = "";

});

slides[0].classList.add("active");

/* ----------------------------------
Reset Content
---------------------------------- */

updateContent(slides[0]);

/* ----------------------------------
Reset Videos
---------------------------------- */

stopAllVideos();

const firstVideo = slides[0].querySelector("video");

if (firstVideo) {

firstVideo.currentTime = 0;

firstVideo.play().catch(() => {});

}

/* ----------------------------------
Reset Index
---------------------------------- */

currentIndex = 0;

}



/* ==========================================================
INTERSECTION OBSERVER
========================================================== */

if(window.innerWidth>=1024)
{
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

}

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




// crad expand js start form here
const cardContainer = document.querySelector(".asic-card");

if (cardContainer) {

    const cards = cardContainer.querySelectorAll(".card-item");

    // ==========================================
    // RESET CARD
    // ==========================================

    function resetCard(card) {

        card.classList.remove("active");
        card.classList.remove("collapse");

        // Clear any inline styles if added
        card.removeAttribute("style");

        const img = card.querySelector(".card-img");
        const cont = card.querySelector(".cont-wrap");

        if (img) img.removeAttribute("style");
        if (cont) cont.removeAttribute("style");

    }

    cards.forEach(card => {

        card.addEventListener("click", () => {

            // ==========================================
            // COLLAPSE
            // ==========================================

            if (card.classList.contains("active")) {

                card.classList.add("collapse");

                // Show other cards before collapse finishes
                setTimeout(() => {

                    cardContainer.classList.remove("has-active");

                }, 400);

                // Reset after animation finishes
                setTimeout(() => {

                    resetCard(card);

                    cards.forEach(other => {

                        resetCard(other);

                    });

                }, 500); // Match your collapse animation duration

                return;

            }

            // ==========================================
            // EXPAND
            // ==========================================

            cards.forEach(other => {

                resetCard(other);

            });

            cardContainer.classList.add("has-active");

            requestAnimationFrame(() => {

                card.classList.add("active");

            });

        });

    });

}


