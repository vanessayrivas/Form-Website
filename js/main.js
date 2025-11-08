// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  // Helper: random number
  const rand = (min, max) => Math.random() * (max - min) + min;

  // ----- ELEMENTS -----
  const catHead = document.querySelector("#cat_head");
  const backTail = document.querySelector("#backandtail");
  const frontLegs = document.querySelector("#Front_legs");
  const backLeg1 = document.querySelector("#back_leg1");
  const backLeg2 = document.querySelector("#back_leg_2");
  const poop = document.querySelector("#poop");
  const smell = document.querySelector("#poop_smell");

  // Litter paths grouped into 3 groups (we'll animate all)
  const litter = [
    ...document.querySelectorAll('#Litter_1 path, #Litter_2 path, #Litter_3 path')
  ];

  // Make sure SVG groups have a transform origin
  gsap.set([backTail, frontLegs, backLeg1, backLeg2, catHead], {
    transformOrigin: "50% 50%"
  });

  // ----- TAIL WAG -----
  gsap.to(backTail, {
    rotation: 6,
    duration: 0.6,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });

  // Slight idle head bob (cute factor)
  gsap.to(catHead, {
    y: -0.8,
    duration: 1.2,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });

  // ----- LEG KICK LOOP -----
  // One "kick" ~0.55s total (matches your earlier spec)
  const kickDur = 0.55;

  // Back legs swing back-and-forth
  gsap.to(backLeg1, {
    rotation: 28,
    duration: kickDur * 0.45,
    yoyo: true,
    repeat: -1,
    ease: "power2.inOut",
    transformOrigin: "15% 50%"
  });

  gsap.to(backLeg2, {
    rotation: 32,
    duration: kickDur * 0.45,
    yoyo: true,
    repeat: -1,
    ease: "power2.inOut",
    transformOrigin: "15% 50%",
    delay: 0.1
  });

  // Front legs: micro jiggle so the cat feels alive
  gsap.to(frontLegs, {
    rotation: -3,
    duration: 0.7,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    transformOrigin: "60% 50%"
  });

  // ----- LITTER BURSTS -----
  // We’ll fake a little particle system by animating each litter path outward
  // and then snapping it back. Triggered every kickDur.
  function litterBurst() {
    litter.forEach((p, i) => {
      // Reset to origin (near back legs area of your SVG)
      gsap.set(p, { x: 0, y: 0, opacity: 0, scale: 1 });

      // Shoot mostly backward/up-left from the hind legs
      const dx = rand(-40, -120);
      const dy = rand(-12, -55);
      const spin = rand(-90, 90);

      const tl = gsap.timeline();
      tl.to(p, {
        opacity: 1,
        duration: 0.08
      })
      .to(p, {
        x: dx,
        y: dy,
        rotation: spin,
        duration: rand(0.35, 0.55),
        ease: "power2.out"
      }, "<")
      .to(p, {
        y: `+=${Math.abs(dy) * 0.7}`, // gravity-ish fall
        opacity: 0,
        duration: rand(0.25, 0.45),
        ease: "power1.in"
      });
    });
  }

  // Fire a burst on an interval to sync with kicks
  gsap.delayedCall(0.25, litterBurst); // first burst shortly after start
  gsap.to({}, {
    repeat: -1,
    repeatDelay: kickDur,
    onRepeat: litterBurst
  });

  // ----- POOP POP-IN -----
  // Start hidden
  gsap.set(poop, { scale: 0.6, opacity: 0, y: 8, transformOrigin: "50% 100%" });

  // Reveal after a short beat
  gsap.to(poop, {
    scale: 1,
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: 1.1,
    ease: "back.out(1.7)"
  });

  // Optional: dramatic bigger litter burst when poop appears
  gsap.delayedCall(1.2, litterBurst);

  // ----- SMELL WAVES -----
  // Each path in #poop_smell will float up & fade, then reset
  const smellPaths = [...smell.querySelectorAll("path")];
  smellPaths.forEach((w, i) => {
    const d = 2 + Math.random() * 0.6;
    const delay = i * 0.35;
    const float = () => {
      gsap.fromTo(w,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: -24,
          duration: d,
          delay,
          ease: "sine.inOut",
          onComplete: () => {
            gsap.to(w, {
              opacity: 0,
              y: -36,
              duration: 0.8,
              ease: "power1.in",
              onComplete: float
            });
          }
        }
      );
    };
    float();
  });

  // Accessibility nicety: pause/resume on tab out
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) gsap.globalTimeline.pause();
    else gsap.globalTimeline.resume();
  });
});