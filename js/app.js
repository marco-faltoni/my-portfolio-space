let controller;
let sildeScene;
let pageScene;
let detailScene;


// function animateSlides(){
//     // inite controller
//     controller = new ScrollMagic.Controller();
//     const sliders = document.querySelectorAll('.slide'); 
//     const nav = document.querySelectorAll('.nav-header');
//     // loop over each slide
//     sliders.forEach((slide, index, slides) => {
//         const revealImg = slide.querySelector('.reveal-img');
//         const revealText = slide.querySelector('.reveal-text');
//         const img = slide.querySelector('img');
        
//         const slideTl = gsap.timeline({
//             defaults: {duration:1, ease: 'power2.inOut'}
//         });
//         slideTl.fromTo(revealImg, {x: '0%'}, {x: '100%'});
//         slideTl.fromTo(img, {scale: 2}, {scale: 1}, '-=1');
//         slideTl.fromTo(revealText, {x: '0%'}, {x: '100%'}, '-=0.75');
        
//         // create scene
//         sildeScene = new ScrollMagic.Scene({
//             triggerElement: slide,
//             triggerHook: 0.5,
//             reverse: false,
//             // reverse: true,
//         })
//         .setTween(slideTl)
//         // .addIndicators({
//         //     colorStart: "white",
//         //     colorTrigger: "white",
//         //     name: "slide"
//         // })
//         .addTo(controller);

//         // // new anim
//         // const pageTl = gsap.timeline();
//         // let nextSlide = slides.lenght - 1  === index ? 'end' : slides[index + 1];
//         // pageTl.fromTo(nextSlide, {y: '0%'}, {y: '25%'});
//         // pageTl.fromTo(slide, {opacity:1, scale: 1}, {opacity: 0, scale: 0.5});
//         // pageTl.fromTo(nextSlide, {y: '25%'}, {y: '0%'}, '-=0.5');

//         // // new scene
//         // pageScene = new ScrollMagic.Scene({
//         //     triggerElement: slide,
//         //     duration: '100%',
//         //     triggerHook: 0,
//         // })
//         // .addIndicators({
//         //     colorStart: "white",
//         //     colorTrigger: "white",
//         //     name: "page",
//         //     indent: 200
//         // })
//         // .setPin(slide, {pushFollowers: false})
//         // .setTween(pageTl)
//         // .addTo(controller);
//     })
// }

function animeSlides(){
    const sliders = document.querySelectorAll('.slide');
    // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    // console.log(vh);
    // var el = document.querySelector('.viewport')

    // el.style.height = vh;
    // console.log(el);
    

    // const homeRevimg = document.querySelector('.home .reveal-img');
    // const homeRevtext = document.querySelector('.home .reveal-text');
    // const homeImg = document.querySelector('.home img');

    // const homeTl = gsap.timeline({
    //     defaults: {duration:1.5, ease: 'power2.inOut'},

    // });

    // homeTl.fromTo(homeRevimg, {x: '0%'}, {x: '100%'});
    // homeTl.fromTo(homeImg, {scale: 2}, {scale: 1}, '-=1');
    // homeTl.fromTo(homeRevtext, {x: '0%'}, {x: '100%'}, '-=1.5');

    // let ScrollAmount = document.querySelector('.slide').offsetHeight;
    // console.log(ScrollAmount);
    // let ScrollMore = ScrollAmount + 50;
    // console.log(ScrollMore);

    // gsap.utils.toArray(".slide").forEach((slide, i) => {
    //     ScrollTrigger.create({
    //         trigger: slide,
    //         start: "top top", 
    //         pin: true, 
    //         pinSpacing: false,
    //         markers: true,
    //         end: () => "+=" + document.querySelector('.slide').offsetHeight,
    //     });
    // });



    gsap.utils.toArray(".slide").forEach(slide => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: slide,
                start: "top top", 
                pin: true, 
                pinSpacing: false,
                markers: true,
                end: () => "+=" + document.querySelector('.slide').offsetHeight,
            },
            defaults: {duration:1.5, ease: 'power2.inOut'},
        });
        tl.fromTo(slide.querySelector(".reveal-img"), {x: '0%'}, {x: '100%'});
        tl.fromTo(slide.querySelector("img"), {scale: 2}, {scale: 1}, '-=1');
        tl.fromTo(slide.querySelectorAll(".reveal-text"), {x: '0%'}, {x: '100%'}, '-=1.5');
    });


    // sliders.forEach((slide, index, slides) => {
    //     // const revealImg = slide.querySelector('.reveal-img');
    //     // const revealText = slide.querySelector('.reveal-text');
    //     // const img = slide.querySelector('img');

    //     // const slideTl = gsap.timeline({
    //     //     defaults: {duration:1.5, ease: 'power2.inOut'},
    //     // });
        
    //     // // slideTl.to(revealImg, {
    //     // //     x: '100%',
    //     // //     duration: 1.5
    //     // // })

    //     // slideTl.fromTo(revealImg, {x: '0%'}, {x: '100%'});
    //     // slideTl.fromTo(img, {scale: 2}, {scale: 1}, '-=1');
    //     // slideTl.fromTo(revealText, {x: '0%'}, {x: '100%'}, '-=0.75');

    //     // ScrollTrigger.create({
    //     //     animation:slideTl,
    //     //     trigger: slide,
    //     //     toggleActions: "restart pause none none",
    //     //     start: "top top",
    //     //     end: () => "+=" + slide.offsetHeight,
    //     //     markers: true,
    //     //     // scrub: true,
    //     //     // snap: 1 / (sliders.length - 1),
    //     //     pin: true,
    //     //     pinSpacing: false
    //     // });
        

    //     // let tl = gsap.timeline({
    //     //     defaults: {duration:1, ease: 'power2.inOut'},
    //     //     scrollTrigger: {
    //     //         trigger: slide,
    //     //         scrub: true,
    //     //         pin: true,
    //     //         start: "top top",
    //     //         end: "+=100%",
    //     //         toggleActions: "restart pause resume pause"
    //     //     }
    //     // })
    //     // tl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    //     // tl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    //     // tl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    //     // tl.fromTo(revealImg, {x: '100%'}, {x: '0%'});
    //     // tl.fromTo(img, {scale: 1}, {scale: 2}, '-=1');
    //     // tl.fromTo(revealText, {x: '100%'}, {x: '0%'}, '-=0.75');

    //     // let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    //     // let pageTl = gsap.timeline({
    //     //     defaults: {duration:1, ease: 'power2.inOut'},
    //     //     scrollTrigger: {
    //     //         trigger: slide,
    //     //         scrub: true,
    //     //         pin: true,
    //     //         start: "top top",
    //     //         end: "+=100%"
    //     //     }
    //     // })
        
    //     // pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    //     // pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    //     // pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");

    //     // tl.fromTo(revealImg, {x: '0%'}, {x: '100%'});
    //     // tl.fromTo(img, {scale: 2}, {scale: 1}, '-=1');
    //     // tl.fromTo(revealText, {x: '0%'}, {x: '100%'}, '-=0.75');

    //     // // create scene
    //     // sildeScene = new ScrollMagic.Scene({
    //     //     triggerElement: slide,
    //     //     triggerHook: 0.5,
    //     //     reverse: false,
    //     //     // reverse: true,
    //     // })
    //     // .setTween(slideTl)
    //     // // .addIndicators({
    //     // //     colorStart: "white",
    //     // //     colorTrigger: "white",
    //     // //     name: "slide"
    //     // // })
    //     // .addTo(controller);

    // })
    
    
}


animeSlides();






const mouse = document.querySelector('.cursor');
const mouseTxt = document.querySelector('.cursor-text');
const burger = document.querySelector('.ham');
const lineHam = document.querySelector('.middle');

// function cursor(e){
//     let mouse = document.querySelector('.cursor');
//     mouse.style.top = e.pageY + 'px';
//     mouse.style.left = e.pageX + 'px';
// }

// function activeCursor(e){
//     const item = e.target;
//     // console.log(item);

//     if (item.classList.contains('logo') || item.classList.contains('ham')) {
//         mouse.classList.add('nav-active')
//     } else {
//         mouse.classList.remove('nav-active')
//     }
//     if (item.classList.contains('explore')) {
//         mouse.classList.add('explore-active');
//         gsap.to('.title-swipe', 1, {y: '0%'});
//         mouseTxt.innerText = 'tap';
//     } else {
//         mouse.classList.remove('explore-active');
//         gsap.to('.title-swipe', 1, {y: '100%'});
//         mouseTxt.innerText = '';
//     }
// }

function navToggle(e) {
    if (!e.target.classList.contains('active')) {
        e.target.classList.add('active')
        lineHam.setAttribute('d', 'm 30,50 h 40')
        burger.classList.add('active');
        gsap.to('.logo', 0.8, {color: 'black'});
        gsap.to('.nav-bar', 1, {clipPath: 'circle(3000px at 100% -10%)'});
        document.body.classList.add('hide');
    } else {
        e.target.classList.remove('active');
        gsap.to('.nav-bar', 1, {clipPath: 'circle(50px at 100% -10%)'});
        lineHam.setAttribute('d', 'm 45,50 h 40');
        burger.classList.remove('active');
        gsap.to('.logo', 1.2, {color: 'whitesmoke'});
        document.body.classList.remove('hide');
    }
    
}
// barba page transition
const logo = document.querySelector('.logo');
barba.init({
    views: [
        {
            namespace: 'home',
            beforeEnter() {
                // animeSlides();
                logo.href = "./index.html";
            },
            beforeLeave(){
                sildeScene.destroy();
                controller.destroy();
            }
        },
        { 
            namespace: 'webdev',
            beforeEnter(){
                logo.href = "../index.html";
                detailAnimation();
            },
            beforeLeave(){
                controller.destroy();
                detailScene.destroy();
            }
        }
    ],
    transitions: [
        {
            leave({current, next}){
                let done = this.async();
                // an animation
                const tl = gsap.timeline({defaults: {duration:1, ease: 'power2.inOut'}});
                tl.fromTo(current.container, 1, {opacity: 1}, {opacity: 0});
                tl.fromTo('.swipe', 0.75, {x: '-100%'}, {x: '0%', onComplete: done}, '-=0.5');
            },
            enter({current, next}){
                let done = this.async();
                // scroll to the top
                window.scrollTo(0, 0);
                // an animation
                const tl = gsap.timeline({defaults: {duration:1, ease: 'power2.inOut'}});
                tl.fromTo(
                    '.swipe', 
                    1, 
                    {x: '0%'}, 
                    {x: '100%', stagger:0.2, onComplete: done}
                );
                tl.fromTo(next.container, 1, {opacity: 0}, {opacity: 1});
                tl.fromTo('.nav-header', 1, {y: '-100%'}, {y:'0%', ease: 'power2.inOut'}, '-=1.5');
            },
        }
    ]
})

function detailAnimation() {
    controller = new ScrollMagic.Controller();
    const slides = document.querySelectorAll('.detail-slide');
    slides.forEach((slide, index, slides) => {
        const slideTl = gsap.timeline({ defaults: {duration:1} });
        let nextSlide = slides.lenght - 1  === index ? 'end' : slides[index + 1];
        const nextImg = nextSlide.querySelector('img');
        slideTl.fromTo(slide, {opacity: 1}, {opacity: 0});
        slideTl.fromTo(nextSlide, {opacity: 0}, {opacity: 1}, '-=1');
        slideTl.fromTo(nextImg, {opacity: 0, x:'50%'}, {opacity: 1, x:'0%'});

        detailScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: '100%',
            triggerHook: 0,
        })
        .setPin(slide, {pushFollowers: false})
        .setTween(slideTl)
        .addTo(controller)
    })

}

// events listener
burger.addEventListener('click', navToggle);
    // window.addEventListener('mousemove', cursor);
    // window.addEventListener('mousemove', activeCursor);


        // const slideNav = gsap.timeline({defaults: {duration:2, ease: 'power2.inOut'}});
        // slideNav.fromTo(nav, {y: '-100%'}, {y: '0%'}, '-=0.5');
        // // create scene
        // sildeScene2 = new ScrollMagic.Scene({
        //     triggerElement: slide,
        //     triggerHook: 0.25,
        //     reverse: false
        // })
        // .setTween(slideNav)
        // .addTo(controller);