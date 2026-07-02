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

});