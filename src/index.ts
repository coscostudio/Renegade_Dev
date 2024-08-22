import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

// ----- Barba Initialization ----- //
barba.init({
  debug: true,
  sync: true,
  transitions: [
    {
      name: 'slide-transition',
      sync: true,
      leave(data) {
        const direction = data.current.namespace === 'index' ? '-100%' : '100%';

        return gsap.to(data.current.container, {
          x: direction,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      },

      enter(data) {
        const isFromLeft = data.next.namespace === 'index';

        // Set the initial position of the entering page *before* the animation
        gsap.set(data.next.container, { x: isFromLeft ? '-100%' : '100%' });

        // Make the entering page visible
        data.next.container.style.visibility = 'visible';

        // Slide the entering page in
        return gsap.to(data.next.container, {
          x: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      },
    },
  ],

  views: [
    {
      namespace: 'info',
      beforeLeave({ current }) {
        current.container.querySelectorAll('.event-video').forEach((video) => video.pause());
      },
    },
    {
      namespace: 'index',
      beforeLeave({ current }) {
        current.container.querySelectorAll('.event-video').forEach((video) => video.pause());
      },
    },
  ],
});

// --- Barba Hooks --- //
barba.hooks.before(() => {
  document.querySelectorAll('.event-video').forEach((video) => video.pause());
});

barba.hooks.enter(() => {
  window.scrollTo(0, 0);
  const preloader = document.querySelector('.loader_wrapper');
  if (preloader) {
    preloader.style.display = 'none';
  }
});

barba.hooks.after(async ({ next }) => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  restartWebflow();

  // Wait for a short delay
  await new Promise((resolve) => setTimeout(resolve, 100));
});
