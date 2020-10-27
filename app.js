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
            reverse: false
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
        .addTo(controller)
    })
}

animateSlides();