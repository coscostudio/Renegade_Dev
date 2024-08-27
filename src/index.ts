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

document.addEventListener('DOMContentLoaded', () => {
  console.log('Attaching initial event listeners...');
  restartWebflow();
  loadAutoVideo();
});

barba.hooks.after(() => {
  console.log('Re-attaching Webflow interactions after Barba.js transition...');
  restartWebflow();
  loadAutoVideo();
});

function loadAutoVideo() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-autovideo@1/autovideo.js';
  script.defer = true;
  document.body.appendChild(script);
}
