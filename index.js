gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".asic-section");
    const wrapper = document.querySelector(".video-wrapper");
    const video = document.querySelector(".asic-video");
    const content = document.querySelector(".asic-content");
    const tabs = document.querySelectorAll(".tab");
    const title = document.querySelector(".asic-title");

    let animationPlayed = false;

    // Hide content initially
    gsap.set(content, {
        opacity: 0,
        y: 40
    });

    // SECTION ANIMATION
    function playAnimation() {

        if (animationPlayed) return;

        animationPlayed = true;

        video.play().catch(() => {});

        setTimeout(() => {

            // Keep wrapper centered
            gsap.set(wrapper, {
                top: "57%",
                left: "50%",
                xPercent: -50,
                yPercent: -50,
                transformOrigin: "center center",
                force3D: true
            });

            const tl = gsap.timeline({
                onComplete: () => {
                    animationPlayed = false;
                }
            });

            // Resize only
            tl.to(wrapper, {
                width: "1200px",
                height: "700px",
                borderRadius: "24px",

                duration: 0.90,
                ease: "expo.inOut",

                force3D: true
            })

            .to(content, {
                opacity: 1,
                y: 0,

                duration: 0.35,
                ease: "power2.out"
            }, "-=0.15");

        }, 500);

    }

    ScrollTrigger.create({
        trigger: section,
        start: "top 50%",

        onEnter: () => {

            gsap.set(wrapper, {
                clearProps: "all"
            });

            gsap.set(wrapper, {
                width: "100vw",
                height: "100vh",

                top: "57%",
                left: "50%",

                xPercent: -50,
                yPercent: -50,

                borderRadius: 0
            });

            gsap.set(content, {
                opacity: 0,
                y: 40
            });

            playAnimation();
        },

        onEnterBack: () => {

            gsap.set(wrapper, {
                clearProps: "all"
            });

            gsap.set(wrapper, {
                width: "100vw",
                height: "100vh",

                top: "57%",
                left: "50%",

                xPercent: -50,
                yPercent: -50,

                borderRadius: 0
            });

            gsap.set(content, {
                opacity: 0,
                y: 40
            });

            playAnimation();
        }
    });

    // TAB SWITCHER
    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            if (tab.classList.contains("active")) return;

            tabs.forEach(btn => btn.classList.remove("active"));
            tab.classList.add("active");

            const newVideo = tab.dataset.video;
            const newTitle = tab.dataset.title;

            if (!newVideo) return;

            const tl = gsap.timeline();

            // OLD CONTENT OUT
            tl.to(title, {
                x: -180,
                opacity: 0,
                duration: 0.45,
                ease: "power3.in"
            }, 0)

            .to(video, {
                x: -300,
                opacity: 0,
                duration: 0.55,
                ease: "power3.in"
            }, 0)

            .add(() => {

                // Update Title
                title.textContent = newTitle;

                // Update Video
                const source = video.querySelector("source");

                if (source) {
                    source.src = newVideo;
                }

                video.load();
                video.play().catch(() => {});

                // Prepare New Content
                gsap.set(title, {
                    x: 180,
                    opacity: 0
                });

                gsap.set(video, {
                    x: 300,
                    opacity: 0
                });

            })

            // NEW CONTENT IN
            .to(title, {
                x: 0,
                opacity: 1,
                duration: 0.65,
                ease: "power4.out"
            })

            .to(video, {
                x: 0,
                opacity: 1,
                duration: 0.75,
                ease: "power4.out"
            }, "<");

        });

    });

});











// immediately resize teh video ////////////////////////////////////////////////////////


// gsap.registerPlugin(ScrollTrigger);

// document.addEventListener("DOMContentLoaded", () => {

//     const section = document.querySelector(".asic-section");
//     const wrapper = document.querySelector(".video-wrapper");
//     const video = document.querySelector(".asic-video");
//     const content = document.querySelector(".asic-content");
//     const tabs = document.querySelectorAll(".tab");
//     const title = document.querySelector(".asic-title");

//     let animationPlayed = false;

//     // Hide content initially
//     gsap.set(content, {
//         opacity: 0,
//         y: 40
//     });

//     function playAnimation() {

//         if (animationPlayed) return;

//         animationPlayed = true;

//         video.play().catch(() => {});

//         gsap.set(wrapper, {
//             top: "57%",
//             left: "50%",
//             xPercent: -50,
//             yPercent: -50,
//             transformOrigin: "center center",
//             force3D: true
//         });

//         gsap.to(wrapper, {
//             width: "1200px",
//             height: "700px",
//             borderRadius: "24px",

//             duration: 0.65,
//             ease: "power4.inOut",

//             force3D: true,

//             onComplete: () => {

//                 animationPlayed = false;

//                 gsap.to(content, {
//                     opacity: 1,
//                     y: 0,
//                     duration: 0.35,
//                     ease: "power2.out"
//                 });

//             }
//         });
//     }

//     ScrollTrigger.create({
//         trigger: section,
//         start: "top 50%",

//         onEnter: () => {

//             gsap.set(wrapper, {
//                 clearProps: "all"
//             });

//             gsap.set(wrapper, {
//                 width: "100vw",
//                 height: "100vh",
//                 borderRadius: 0,

//                 top: 0,
//                 left: 0,

//                 xPercent: 0,
//                 yPercent: 0
//             });

//             gsap.set(content, {
//                 opacity: 0,
//                 y: 40
//             });

//             playAnimation();
//         },

//         onEnterBack: () => {

//             gsap.set(wrapper, {
//                 clearProps: "all"
//             });

//             gsap.set(wrapper, {
//                 width: "100vw",
//                 height: "100vh",
//                 borderRadius: 0,

//                 top: 0,
//                 left: 0,

//                 xPercent: 0,
//                 yPercent: 0
//             });

//             gsap.set(content, {
//                 opacity: 0,
//                 y: 40
//             });

//             playAnimation();
//         }
//     });

//     // Tab Video Switcher
//     tabs.forEach(tab => {

//         tab.addEventListener("click", () => {

//             tabs.forEach(btn => btn.classList.remove("active"));
//             tab.classList.add("active");

//             const newVideo = tab.dataset.video;
//             const newTitle = tab.dataset.title;

//             // Title Animation
//             gsap.to(title, {
//                 opacity: 0,
//                 y: -20,
//                 duration: 0.25,

//                 onComplete: () => {

//                     title.textContent = newTitle;

//                     gsap.to(title, {
//                         opacity: 1,
//                         y: 0,
//                         duration: 0.35
//                     });

//                 }
//             });

//             if (!newVideo) return;

//             // Video Switch Animation
//             gsap.to(video, {
//                 opacity: 0,
//                 duration: 0.3,

//                 onComplete: () => {

//                     const source = video.querySelector("source");

//                     if (source) {
//                         source.src = newVideo;
//                     }

//                     video.load();

//                     video.play().catch(() => {});

//                     gsap.to(video, {
//                         opacity: 1,
//                         duration: 0.3
//                     });

//                 }
//             });

//         });

//     });

// });