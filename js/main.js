// JS scripts placed here
const backleg1 = document.querySelector('#back_leg1');
const backleg2 = document.querySelector('#back_leg_2');
const repeatWithPause = document.querySelector('#poop_smell');

const tl = gsap.timeline({ repeat: -1 });
const tl2 = gsap.timeline({ repeat: -1 });

tl.to("#back_leg1", { duration: 1, rotate: -100, yoyo: true, repeat: 7, onStart: () => {
    console.log("Animation started!");
    element.classList.add('active');
  } })
  .to("#poop_smell", { duration: 1, y: 500 })
  .to(".element-3", { duration: 1, rotation: 360 });

// poop timeline
tl2.to("#poop_smell", { duration: 1, y: 8, yoyo: true, ease: Power3.easeInOut })


