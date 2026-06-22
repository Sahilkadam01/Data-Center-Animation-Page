const slides = document.querySelectorAll(".cap-slide");
const dots = document.querySelectorAll(".slider-dots span");

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let current = 0;
let autoSlide;

// INITIAL ACTIVE
slides[0].classList.add("active");
dots[0]?.classList.add("active");

function showSlide(index){

    if(index === current) return;

    const currentSlide = slides[current];
    const nextSlide = slides[index];

    // remove old helper classes
    slides.forEach(slide => {
        slide.classList.remove("active");
        slide.classList.remove("prev-slide");
    });

    // old slide out left
    currentSlide.classList.add("prev-slide");

    // new slide in right
    nextSlide.classList.add("active");

    // dots
    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    if(dots[index]){
        dots[index].classList.add("active");
    }

    current = index;
}

function nextSlide(){

    let nextIndex = current + 1;

    if(nextIndex >= slides.length){
        nextIndex = 0;
    }

    showSlide(nextIndex);
}

function prevSlide(){

    let prevIndex = current - 1;

    if(prevIndex < 0){
        prevIndex = slides.length - 1;
    }

    showSlide(prevIndex);
}

// RIGHT ARROW
if(next){

    next.addEventListener("click", () => {

        nextSlide();
        restartAuto();

    });

}

// LEFT ARROW
if(prev){

    prev.addEventListener("click", () => {

        prevSlide();
        restartAuto();

    });

}

// DOTS
dots.forEach((dot,index) => {

    dot.addEventListener("click", () => {

        showSlide(index);
        restartAuto();

    });

});

// AUTOPLAY
function startAuto(){

    autoSlide = setInterval(() => {

        nextSlide();

    }, 5000);

}

function restartAuto(){

    clearInterval(autoSlide);
    startAuto();

}

startAuto();

// js for read more text functionality
document.querySelectorAll(".read-more-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        const moreText =
        btn.previousElementSibling.querySelector(".more-text");

        moreText.classList.toggle("show");

        btn.textContent =
        moreText.classList.contains("show")
            ? "Read Less"
            : "Read More";

    });

});