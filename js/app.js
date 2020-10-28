let controller;
let sildeScene;
let pageScene;

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
        
        const slideTl = gsap.timeline({defaults: {duration:1, ease: 'power2.inOut'}});
        slideTl.fromTo(revealImg, {x: '0%'}, {x: '100%'});
        slideTl.fromTo(img, {scale: 2}, {scale: 1}, '-=1');
        slideTl.fromTo(revealText, {x: '0%'}, {x: '100%'}, '-=0.75');
        slideTl.fromTo(nav, {y: '-100%'}, {y: '0%'}, '-=0.5');
        // create scene
        sildeScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false,
            // reverse: true,
        })
        .setTween(slideTl)
        .addTo(controller);
        
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

        // new anim
        const pageTl = gsap.timeline();
        let nextSlide = slides.lenght - 1  === index ? 'end' : slides[index + 1];
        pageTl.fromTo(nextSlide, {y: '0%'}, {y: '25%'});
        pageTl.fromTo(slide, {opacity:1, scale: 1}, {opacity: 0, scale: 0.5});
        pageTl.fromTo(nextSlide, {y: '25%'}, {y: '0%'}, '-=0.5');

        // new scene
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: '90%',
            triggerHook: 0,
        })
        .setPin(slide, {pushFollowers: false})
        .setTween(pageTl)
        .addTo(controller)
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

    if (item.classList.contains('logo') || item.classList.contains('ham')) {
        mouse.classList.add('nav-active')
    } else {
        mouse.classList.remove('nav-active')
    }
    if (item.classList.contains('explore')) {
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
const logo = document.querySelectorAll('.logo');
barba.init({
    views: [
        {
            namespace: 'home',
            beforeEnter(){
                animateSlides();
                logo.href = './index.html'
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
                logo.href = '../index.html',
                gsap.fromTo('.nav-header', 1, {y: '-100%'}, {y:'0%', ease: 'power2.inOut'})
            },
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
                tl.fromTo(next.container, 1, {opacity: 0}, {opacity: 1});
                tl.fromTo('.swipe', 1, {x: '0%'}, {x: '100%', stagger:0.2, onComplete: done}, '-=1');
            },
        }
    ]
})


burger.addEventListener('click', navToggle);
window.addEventListener('mousemove', cursor);
window.addEventListener('mousemove', activeCursor);


