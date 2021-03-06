var edgeOffset = 50; // px
zenscroll.setup(null, edgeOffset);

let controller;
let sildeScene;
let pageScene;
let detailScene;
let cursorCircle;
// check if device is smartphone/tablet or none
let isMobile = window.matchMedia("only screen and (max-width: 1024px)").matches;

function animateSlides(){
    // inite controller
    controller = new ScrollMagic.Controller();
    const sliders = document.querySelectorAll('.slide'); 
    const nav = document.querySelectorAll('.nav-header');


    // loop over each slide
    sliders.forEach((slide, index, slides) => {
        const revealImg = slide.querySelector('.reveal-img');
        const revealText = slide.querySelector('.reveal-text');
        const img = slide.querySelector('img');
        
        const slideTl = gsap.timeline({
            defaults: {duration:1.5, ease: 'power2.inOut'}
        });
        slideTl.fromTo(revealText, {x: '0%'}, {x: '-250%'}, '+=0.30');
        slideTl.fromTo(revealImg, {x: '0%'}, {x: '-100%'}, '-=1.5');
        slideTl.fromTo(img, {scale: 2}, {scale: 1}, '-=1');
        
        // create scene
        sildeScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.5,
            reverse: false,
            // reverse: true,
        })
        .setTween(slideTl)
        .addTo(controller);

        // new anim
        const pageTl = gsap.timeline();
        let nextSlide = slides.lenght - 1  === index ? 'end' : slides[index + 1];
        pageTl.fromTo(nextSlide, {y: '0%'}, {y: '25%'});
        pageTl.fromTo(slide, {opacity:1, scale: 1}, {opacity: 0, scale: 0.5});
        pageTl.fromTo(nextSlide, {y: '25%'}, {y: '0%'}, '-=0.5');

        // new scene
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: '100%',
            triggerHook: 0,
        })
        .setPin(slide, {pushFollowers: false})
        .setTween(pageTl)
        .addTo(controller);
    })
}


const mouse = document.querySelector('.cursor');
const mouseTxt = document.querySelector('.cursor-text');
const burger = document.querySelector('.ham');
const lineHam = document.querySelector('.middle');

function cursor(e){
    let mouse = document.querySelector('.cursor');
    mouse.style.top = e.pageY + 'px';
    mouse.style.left = e.pageX + 'px';
}

function activeCursor(e){
    const item = e.target;
    // console.log(item);
    const hNav = document.querySelector('.logo h3');
    const spanNav = hNav.querySelector('span');

    

    if (item == hNav || item == spanNav || item.classList.contains('ham')) {
        mouse.classList.add('nav-active')
    } else {
        mouse.classList.remove('nav-active')
    }

    if (item.classList.contains('explore') || item.classList.contains('pexplore')) {
        mouse.classList.add('explore-active');
        gsap.to('.title-swipe', 1, {y: '0%'});
        mouseTxt.innerText = 'tap';
    } else {
        mouse.classList.remove('explore-active');
        gsap.to('.title-swipe', 1, {y: '100%'});
        mouseTxt.innerText = '';
    }
}

function navToggle(e) {

    // variabili necessarie per animare le voci del menu
    const textWrapper = document.querySelector('.menu-text');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    const textWrapper2 = document.querySelector('.menu-text2');
    textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    const textWrapper3 = document.querySelector('.menu-text3');
    textWrapper3.innerHTML = textWrapper3.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    const textWrapper4 = document.querySelector('.menu-text4');
    textWrapper4.innerHTML = textWrapper4.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    const textWrapper5 = document.querySelector('.menu-text5');
    textWrapper5.innerHTML = textWrapper5.textContent.replace(/\S/g, "<span class='letter'>$&</span>");



    if (!e.target.classList.contains('active')) {
        // console.log(e.target);
        burger.classList.add('active');

        anime.timeline({loop: false})
            .add({
                targets: '.letter',
                translateX: [40,0],
                translateZ: 0,
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 1200,
                delay: (el, i) => 300 + 30 * i
        })
        lineHam.setAttribute('d', 'm 30,50 h 40')
        burger.classList.add('active');
        gsap.to('.logo', 0.8, {color: 'black'});
        // gsap.to('#logo-div span', 0.8, {color: 'black'});
        if (isMobile) {
            gsap.to('.nav-bar', 1.5, { clipPath: 'circle(1500px at 100% -10%)'});
        } else {
            gsap.to('.nav-bar', 1.5, { clipPath: 'circle(3000px at 100% -10%)'});
        }
        gsap.to('.nav-bar', 2, {  opacity:1});
        document.body.classList.add('hide');
    } else {
        anime.timeline({loop: false})
        .add({
            targets: '.letter',
            translateX: [0,-30],
            opacity: [1,0],
            easing: "easeInExpo",
            duration: 500,
            delay: (el, i) => 50 + 30 * i
        });
        setTimeout(function () {
            e.target.classList.remove('active');
            if (isMobile) {
                gsap.to('.nav-bar', 1.5, { clipPath: 'circle(20px at 86.5% 5.5%)'});
            } else {
                gsap.to('.nav-bar', 1, {  clipPath: 'circle(20px at 88.5% 5%)'});
            }
            gsap.to('.nav-bar', 1.8, {  opacity:0}, '+=2');
            lineHam.setAttribute('d', 'm 45,50 h 40');
            burger.classList.remove('active');
            gsap.to('.logo', 1.2, {color: 'whitesmoke'});
            // gsap.to('#logo-div span', 0.8, {color: 'whitesmoke'});
            document.body.classList.remove('hide');
        }, 1400);
        
    }
    
}
// barba page transition
const logo = document.querySelector('.logo');
barba.init({
    views: [
        {
            namespace: 'home',
            beforeEnter() {
                animateSlides();
                logo.href = "./index.html";
            },
            beforeLeave(){
                sildeScene.destroy();
                pageScene.destroy();
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
        },
        { 
            namespace: 'design',
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
                let navbar = document.querySelector('.nav-bar');
                if (navbar.style.opacity == 1) {
                    gsap.to('.nav-bar', 1, {  clipPath: 'circle(20px at 88.5% 5%)'});
                    gsap.to('.nav-bar', 1.8, {  opacity:0}, '+=2');
                    burger.classList.remove('active');
                    document.body.classList.remove('hide');
                    gsap.to('.logo', 1.2, {color: 'whitesmoke'});
                }
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
        slideTl.fromTo(nextImg, {opacity: 0, y:'50%'}, {opacity: 1, y:'0%'});

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
// if device is not a smartphone or tablet the dynamic cursor pointer is active
if (!isMobile) {
    cursorCircle = document.querySelector('.cursor');
    cursorCircle.style.opacity= '1';
    window.addEventListener('mousemove', cursor);
    window.addEventListener('mousemove', activeCursor);
} else {
    cursorCircle = document.querySelector('.cursor');
    cursorCircle.style.display= 'none';
}



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





// function animeSlides(){ 
//     const sliders = document.querySelectorAll('.slide'); 
//     // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0); 
//     // console.log(vh); 
//     // var el = document.querySelector('.viewport') 

//     // el.style.height = vh; 
//     // console.log(el); 
    

//     const homeRevimg = document.querySelector('.home .reveal-img'); 
//     const homeRevtext = document.querySelector('.home .reveal-text'); 
//     const homeImg = document.querySelector('.home img'); 

//     const homeTl = gsap.timeline({ 
//         scrollTrigger: { 
//             trigger: 'slidec', 
//             start: "top top",  
//             pin: true,  
//             pinSpacing: false, 
//             end: () => "+=" + document.querySelector('.slider').offsetHeight, 
//         }, 
//         defaults: {duration:1.5, ease: 'power2.inOut'}, 
//     }); 

//     homeTl.fromTo(homeRevimg, {x: '0%'}, {x: '100%'}); 
//     homeTl.fromTo(homeImg, {scale: 2}, {scale: 1}, '-=1'); 
//     homeTl.fromTo(homeRevtext, {x: '0%'}, {x: '100%'}, '-=1.5'); 

//     // let ScrollAmount = document.querySelector('.slide').offsetHeight; 
//     // console.log(ScrollAmount); 
//     // let ScrollMore = ScrollAmount + 50; 
//     // console.log(ScrollMore); 

//     // gsap.utils.toArray(".slide").forEach((slide, i) => { 
//     //     ScrollTrigger.create({ 
//     //         trigger: slide, 
//     //         start: "top top",  
//     //         pin: true,  
//     //         pinSpacing: false, 
//     //         markers: true, 
//     //         end: () => "+=" + document.querySelector('.slide').offsetHeight, 
//     //     }); 
//     // }); 





//     gsap.utils.toArray(".slider").forEach(slide => { 
//         let tl = gsap.timeline({ 
//             scrollTrigger: { 
//                 trigger: slide, 
//                 start: "top top",  
//                 pin: true,  
//                 pinSpacing: false, 
//                 markers: true, 
//                 end: () => "+=" + document.querySelector('.slider').offsetHeight, 
//             }, 
//             defaults: {duration:1.5, ease: 'power2.inOut'}, 
//         }); 
//         tl.fromTo(slide.querySelector(".reveal-img"), {y: '0%'}, {y: '100%'}); 
//         tl.fromTo(slide.querySelector("img"), {scale: 2}, {scale: 1}, '-=1'); 
//         tl.fromTo(slide.querySelector(".reveal-text"), {y: '0%'}, {y: '100%'}, '-=1.5'); 
        
//     }); 

//     // sliders.forEach((slide, index, slides) => { 
//     //     // const revealImg = slide.querySelector('.reveal-img'); 
//     //     // const revealText = slide.querySelector('.reveal-text'); 
//     //     // const img = slide.querySelector('img'); 

//     //     // const slideTl = gsap.timeline({ 
//     //     //     defaults: {duration:1.5, ease: 'power2.inOut'}, 
//     //     // }); 

//     //     // // slideTl.to(revealImg, { 
//     //     // //     x: '100%', 
//     //     // //     duration: 1.5 
//     //     // // }) 

//     //     // slideTl.fromTo(revealImg, {x: '0%'}, {x: '100%'}); 
//     //     // slideTl.fromTo(img, {scale: 2}, {scale: 1}, '-=1'); 
//     //     // slideTl.fromTo(revealText, {x: '0%'}, {x: '100%'}, '-=0.75'); 

//     //     // ScrollTrigger.create({ 
//     //     //     animation:slideTl, 
//     //     //     trigger: slide, 
//     //     //     toggleActions: "restart pause none none", 
//     //     //     start: "top top", 
//     //     //     end: () => "+=" + slide.offsetHeight, 
//     //     //     markers: true, 
//     //     //     // scrub: true, 
//     //     //     // snap: 1 / (sliders.length - 1), 
//     //     //     pin: true, 
//     //     //     pinSpacing: false 
//     //     // }); 
    

//     //     // let tl = gsap.timeline({ 
//     //     //     defaults: {duration:1, ease: 'power2.inOut'}, 
//     //     //     scrollTrigger: { 
//     //     //         trigger: slide, 
//     //     //         scrub: true, 
//     //     //         pin: true, 
//     //     //         start: "top top", 
//     //     //         end: "+=100%", 
//     //     //         toggleActions: "restart pause resume pause" 
//     //     //     } 
//     //     // }) 
//     //     // tl.fromTo(nextSlide, { y: "0%" }, { y: "50%" }); 
//     //     // tl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 }); 
//     //     // tl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5"); 
//     //     // tl.fromTo(revealImg, {x: '100%'}, {x: '0%'}); 
//     //     // tl.fromTo(img, {scale: 1}, {scale: 2}, '-=1'); 
//     //     // tl.fromTo(revealText, {x: '100%'}, {x: '0%'}, '-=0.75'); 

//     //     // let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1]; 
//     //     // let pageTl = gsap.timeline({ 
//     //     //     defaults: {duration:1, ease: 'power2.inOut'}, 
//     //     //     scrollTrigger: { 
//     //     //         trigger: slide, 
//     //     //         scrub: true, 
//     //     //         pin: true, 
//     //     //         start: "top top", 
//     //     //         end: "+=100%" 
//     //     //     } 
//     //     // }) 
    
//     //     // pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" }); 
//     //     // pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 }); 
//     //     // pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5"); 

//     //     // tl.fromTo(revealImg, {x: '0%'}, {x: '100%'}); 
//     //     // tl.fromTo(img, {scale: 2}, {scale: 1}, '-=1'); 
//     //     // tl.fromTo(revealText, {x: '0%'}, {x: '100%'}, '-=0.75'); 

//     //     // // create scene 
//     //     // sildeScene = new ScrollMagic.Scene({ 
//     //     //     triggerElement: slide, 
//     //     //     triggerHook: 0.5, 
//     //     //     reverse: false, 
//     //     //     // reverse: true, 
//     //     // }) 
//     //     // .setTween(slideTl) 
//     //     // // .addIndicators({ 
//     //     // //     colorStart: "white", 
//     //     // //     colorTrigger: "white", 
//     //     // //     name: "slide" 
//     //     // // }) 
//     //     // .addTo(controller); 

//     // }) 
    

// } 


// animateSlides();