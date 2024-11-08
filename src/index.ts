import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { preloader } from './preloader';
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
        scrollTo: {
          y: $element.offset().top,
          autoKill: false,
        },
        ease: settings.ease,
      });
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
        const accordionHeader = $clicked.find('.js-accordion-header')[0];
        const isOpening = !$clicked.hasClass('active');

        if (isOpening) {
          const $openItem = $('.js-accordion-item.active');
          if ($openItem.length) {
            const openVideo = $openItem.find('.event-video')[0];
            const openBody = $openItem.find('.js-accordion-body')[0];
            const openHeader = $openItem.find('.js-accordion-header')[0];

            const closeTl = gsap.timeline({
              onComplete: () => {
                const targetPosition = $clicked.offset().top;
                const openTl = gsap.timeline();

                openTl
                  .add(() => scrollToTop($clicked), 'start')
                  .add(() => {
                    $clicked.addClass('active');
                    gsap.set(accordionBody, {
                      display: 'block',
                      height: 0,
                    });

                    const openState = Flip.getState(accordionBody);
                    gsap.set(accordionBody, { height: '100vh' });

                    // Animate padding alongside FLIP animation
                    gsap.to(accordionHeader, {
                      duration: settings.duration,
                      paddingTop: 60,
                      paddingBottom: 60,
                      ease: settings.ease,
                    });

                    return Flip.from(openState, {
                      duration: settings.duration,
                      ease: settings.ease,
                      absoluteOnLeave: true,
                      onUpdate: function () {
                        const currentTop = $clicked.offset().top;
                        if (Math.abs(currentTop - targetPosition) > 2) {
                          gsap.set(window, { scrollTo: targetPosition });
                        }
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

            closeTl
              .to(
                openVideo,
                {
                  duration: settings.duration / 2,
                  opacity: 0,
                  ease: 'power2.in',
                  onComplete: () => {
                    openVideo.setAttribute('data-autoplay', 'false');
                  },
                },
                'start'
              )
              // Animate padding back to original alongside closing
              .to(
                openHeader,
                {
                  duration: settings.duration,
                  paddingTop: '', // Back to original Webflow value
                  paddingBottom: '', // Back to original Webflow value
                  ease: settings.ease,
                },
                'start'
              )
              .add(() => {
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
            const openTl = gsap.timeline();
            const targetPosition = $clicked.offset().top;

            openTl
              .add(scrollToTop($clicked), 'start')
              .add(() => {
                $clicked.addClass('active');
                gsap.set(accordionBody, {
                  display: 'block',
                  height: 0,
                });

                const openState = Flip.getState(accordionBody);
                gsap.set(accordionBody, { height: '100vh' });

                // Animate padding for direct opens
                gsap.to(accordionHeader, {
                  duration: settings.duration,
                  paddingTop: 60,
                  paddingBottom: 60,
                  ease: settings.ease,
                });

                return Flip.from(openState, {
                  duration: settings.duration,
                  ease: settings.ease,
                  absoluteOnLeave: true,
                  onUpdate: function () {
                    const currentTop = $clicked.offset().top;
                    if (Math.abs(currentTop - targetPosition) > 2) {
                      gsap.set(window, { scrollTo: targetPosition });
                    }
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
            // Animate padding back alongside closing
            .to(
              accordionHeader,
              {
                duration: settings.duration,
                paddingTop: '', // Back to original Webflow value
                paddingBottom: '', // Back to original Webflow value
                ease: settings.ease,
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

  // Original styles without padding transition
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
