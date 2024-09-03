import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

barba.init({
  debug: false,
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
      afterEnter({ next }) {
        loadAutoVideo();
        setupAccordionScroll();
      },
    },
    {
      namespace: 'info',
      afterEnter({ next }) {
        loadAutoVideo();
        setupAccordionScroll();
      },
    },
  ],
});


function setupAccordionScroll() {
  document.querySelectorAll('.Accordion_Wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: wrapper,
          offsetY: 60px,  
        },
        ease: 'power2.inOut',
      });
    });
  });
}

// --- Barba Hooks --- //
barba.hooks.beforeLeave(({ current }) => {
  current.container.querySelectorAll('.event-video').forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });
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
  setupAccordionScroll();

  // Wait for a short delay
  await new Promise((resolve) => setTimeout(resolve, 100));
});

document.addEventListener('DOMContentLoaded', () => {
  loadAutoVideo();
  setupAccordionScroll();
});

function loadAutoVideo() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-autovideo@1/autovideo.js';
  script.defer = true;
  document.body.appendChild(script);
}
