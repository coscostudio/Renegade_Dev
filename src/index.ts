import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

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
        gsap.set(data.next.container, { x: isFromLeft ? '-100%' : '100%' });
        data.next.container.style.visibility = 'visible';
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
      namespace: 'index',
      beforeEnter({ next }) {
        restartWebflow();
        loadAutoVideo();
      },
    },
    {
      namespace: 'info',
      afterEnter({ next }) {
        console.log('Entered info view...');
        restartWebflow();
      },
    },
  ],
});

// Initial DOM Load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Attaching initial event listeners...');
  restartWebflow(); // Restart Webflow interactions on initial load
  loadAutoVideo(); // Initialize Auto Video
});

// After Barba.js transitions, reinitialize Webflow, Auto Video, and Mirror Click Events
barba.hooks.after(() => {
  console.log('Re-attaching Webflow interactions after Barba.js transition...');
  restartWebflow(); // Restart Webflow interactions
  loadAutoVideo(); // Re-initialize Auto Video after page transition
});

// Finsweet Auto Video function to reinitialize after Barba.js transitions
function loadAutoVideo() {
  // This function re-applies Finsweet Auto Video logic after page transitions
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-autovideo@1/autovideo.js';
  script.defer = true;
  document.body.appendChild(script);
}
