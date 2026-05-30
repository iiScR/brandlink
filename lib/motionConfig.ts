import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const EASE = {
  cinematic: 'power3.inOut',
  smooth: 'power2.out',
  snap: 'power4.out',
  bounce: 'back.out(1.2)',
};

export const DURATION = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  cinematic: 1.8,
};

export function pinSection(
  trigger: string | HTMLElement,
  start: string = 'top top',
  end: string = '+=150%',
  scrub: boolean | number = 1
) {
  return ScrollTrigger.create({
    trigger,
    start,
    end,
    pin: true,
    scrub,
    anticipatePin: 1,
  });
}

export function createScrollTimeline(
  trigger: string | HTMLElement,
  start: string = 'top top',
  end: string = '+=150%'
) {
  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });
}

export function fadeInUp(
  target: string | HTMLElement | NodeListOf<Element>,
  delay = 0,
  duration = DURATION.normal
) {
  return gsap.fromTo(
    target,
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration, delay, ease: EASE.smooth }
  );
}

export function fadeOutDown(
  target: string | HTMLElement | NodeListOf<Element>,
  delay = 0,
  duration = DURATION.normal
) {
  return gsap.fromTo(
    target,
    { y: 0, opacity: 1 },
    { y: -40, opacity: 0, duration, delay, ease: EASE.smooth }
  );
}

export function scaleIn(
  target: string | HTMLElement | NodeListOf<Element>,
  delay = 0,
  duration = DURATION.slow
) {
  return gsap.fromTo(
    target,
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration, delay, ease: EASE.cinematic }
  );
}
