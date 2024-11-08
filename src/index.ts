import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { preloader } from './preloader';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(Flip, ScrollToPlugin);

function initializeAccordion() {
  const accordion = (function () {
    const settings = {
      duration: 1,
      ease: 'power3.inOut',
    };

    function scrollToTop($element) {
      return gsap.to(window, {
        duration: settings.duration,
        scrollTo: $element.offset().top,
        ease: settings.ease,
      });
    }

    function correctPosition($element) {
      const currentTop = $element.offset().top;
      if (currentTop > 1) {
        // If not already at top
        return gsap.to(window, {
          duration: settings.duration / 2,
          scrollTo: $element.offset().top,
          ease: 'power2.out',
        });
      }
    }

    return {
      init() {
        $('.js-accordion-item').on('click', function () {
          accordion.toggle($(this));
        });
      },
      toggle($clicked) {
        const accordionBody = $clicked.find('.js-accordion-body')[0];
        const videoElement = $clicked.find('.event-video')[0];
        const isOpening = !$clicked.hasClass('active');

        if (isOpening) {
          const $openItem = $('.js-accordion-item.active');
          if ($openItem.length) {
            // Create a specific timeline for closing
            const closeTl = gsap.timeline({
              onComplete: () => {
                // Calculate position before any changes
                const targetPosition = $clicked.offset().top;

                // Start open sequence
                const openTl = gsap.timeline();

                openTl
                  // First scroll to position
                  .add(scrollToTop($clicked), 'start')
                  // Then start expansion
                  .add(() => {
                    $clicked.addClass('active');
                    gsap.set(accordionBody, {
                      display: 'block',
                      height: 0,
                      transformOrigin: 'top', // Force expansion from top
                    });

                    const openState = Flip.getState(accordionBody);
                    gsap.set(accordionBody, { height: '100vh' });

                    return Flip.from(openState, {
                      duration: settings.duration,
                      ease: settings.ease,
                      absoluteOnLeave: true,
                      onComplete: () => {
                        // Check and correct position after expansion
                        correctPosition($clicked);
                      },
                    });
                  }, 'start+=0.1')
                  .to(
                    videoElement,
                    {
                      duration: settings.duration,
                      opacity: 1,
                      ease: 'power2.out',
                      onStart: () => {
                        videoElement.setAttribute('data-autoplay', 'true');
                        window.dispatchEvent(new Event('resize'));
                      },
                    },
                    'start+=0.2'
                  );
              },
            });

            // Close sequence
            closeTl
              .to(
                $openItem.find('.event-video')[0],
                {
                  duration: settings.duration / 2,
                  opacity: 0,
                  ease: 'power2.in',
                  onComplete: () => {
                    $openItem.find('.event-video')[0].setAttribute('data-autoplay', 'false');
                  },
                },
                'start'
              )
              .add(() => {
                const openBody = $openItem.find('.js-accordion-body')[0];
                const closeState = Flip.getState(openBody);
                gsap.set(openBody, { height: 0 });

                return Flip.from(closeState, {
                  duration: settings.duration,
                  ease: settings.ease,
                  absoluteOnLeave: true,
                  onComplete: () => {
                    $openItem.removeClass('active');
                    gsap.set(openBody, { display: 'none' });
                  },
                });
              }, 'start+=0.2');
          } else {
            // No open accordion, just open immediately
            const openTl = gsap.timeline();

            openTl
              .add(scrollToTop($clicked), 'start')
              .add(() => {
                $clicked.addClass('active');
                gsap.set(accordionBody, {
                  display: 'block',
                  height: 0,
                  transformOrigin: 'top', // Force expansion from top
                });

                const openState = Flip.getState(accordionBody);
                gsap.set(accordionBody, { height: '100vh' });

                return Flip.from(openState, {
                  duration: settings.duration,
                  ease: settings.ease,
                  absoluteOnLeave: true,
                  onComplete: () => {
                    // Check position even for fresh opens
                    correctPosition($clicked);
                  },
                });
              }, 'start')
              .to(
                videoElement,
                {
                  duration: settings.duration,
                  opacity: 1,
                  ease: 'power2.out',
                  onStart: () => {
                    videoElement.setAttribute('data-autoplay', 'true');
                    window.dispatchEvent(new Event('resize'));
                  },
                },
                'start+=0.2'
              );
          }
        } else {
          // Just closing
          const closeTl = gsap.timeline();

          closeTl
            .to(
              videoElement,
              {
                duration: settings.duration / 2,
                opacity: 0,
                ease: 'power2.in',
                onComplete: () => {
                  videoElement.setAttribute('data-autoplay', 'false');
                },
              },
              'start'
            )
            .add(() => {
              const closeState = Flip.getState(accordionBody);
              gsap.set(accordionBody, { height: 0 });

              return Flip.from(closeState, {
                duration: settings.duration,
                ease: settings.ease,
                absoluteOnLeave: true,
                onComplete: () => {
                  $clicked.removeClass('active');
                  gsap.set(accordionBody, { display: 'none' });
                },
              });
            }, 'start+=0.2');
        }
      },
    };
  })();

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .js-accordion-item {
      background-color: transparent;
      transition: background-color 0.3s ease;
    }
    
    .js-accordion-item:not(.active):hover {
      background-color: #F3F2F0 !important;
    }
    
    .js-accordion-item.active {
      background-color: #000 !important;
    }
    
    .js-accordion-body {
      height: 100vh;
      width: 100%;
      margin: 0;
      padding: 0;
      position: relative;
      background-color: #000;
      display: none;
      transform-origin: top center;
    }
    
    .js-accordion-body .event-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;
  document.head.appendChild(style);

  // Initialize GSAP plugins
  gsap.registerPlugin(Flip, ScrollToPlugin);

  // Initialize accordion
  accordion.init();
}

// preloader
document.addEventListener('DOMContentLoaded', () => {
  preloader.playPreloader().catch(console.error);
});

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
      afterEnter({ next }) {
        restartWebflow();
        loadAutoVideo();
        initializeAccordion();
      },
    },
  ],
});

// --- Barba Hooks --- //

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

  await new Promise((resolve) => setTimeout(resolve, 100));
});

document.addEventListener('DOMContentLoaded', () => {
  loadAutoVideo();
});

function loadAutoVideo() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-autovideo@1/autovideo.js';
  script.defer = true;
  document.body.appendChild(script);
}
