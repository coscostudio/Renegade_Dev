import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Video Preloader Class
class VideoPreloader {
  private initialized: boolean = false;

  private init(): void {
    if (this.initialized) return;

    const style = document.createElement('style');
    style.textContent = `
      body.loading {
        overflow: hidden !important;
        height: 100vh !important;
      }

      .preloader-container {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100vh !important;
        z-index: 9999 !important;
        background: black !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }

      .preloader-video {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        display: block !important;
        visibility: hidden !important;
        opacity: 0 !important;
        transition: visibility 0.3s, opacity 0.3s !important;
      }

      .preloader-video.is-playing {
        visibility: visible !important;
        opacity: 1 !important;
      }

      .preloader-logo {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        mix-blend-mode: difference !important;
        z-index: 10000 !important;
        pointer-events: none !important;
        visibility: visible !important;
        opacity: 1 !important;
      }

      .page-wrapper {
        transform: translateY(100vh);
        position: fixed;
        width: 100%;
      }
    `;
    document.head.appendChild(style);

    this.initialized = true;
  }

  async playPreloader(): Promise<void> {
    this.init();

    const preloader = document.querySelector('.preloader-container') as HTMLElement;
    const video = preloader.querySelector('.preloader-video') as HTMLVideoElement;
    const pageWrapper = document.querySelector('.page-wrapper') as HTMLElement;

    // Store original page wrapper styles
    const computedStyle = window.getComputedStyle(pageWrapper);
    const originalWidth = computedStyle.width;

    // Immediately set initial states
    document.body.classList.add('loading');

    // Force initial positions
    gsap.set(pageWrapper, {
      y: '100vh',
      position: 'fixed',
      width: '100%',
    });

    // Play video and set up transition
    await new Promise<void>((resolve) => {
      video.muted = true;
      video.playsInline = true;

      video.addEventListener('playing', () => {
        video.classList.add('is-playing');
      });

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Video play failed:', error);
        });
      }

      const checkVideo = setInterval(() => {
        if (!isNaN(video.duration)) {
          clearInterval(checkVideo);

          setTimeout(
            () => {
              const tl = gsap.timeline({
                onComplete: () => {
                  // Explicitly set back to static
                  pageWrapper.style.position = 'static';
                  pageWrapper.style.width = originalWidth;
                  pageWrapper.style.transform = 'none';

                  // Then remove loading class and preloader
                  document.body.classList.remove('loading');
                  gsap.set(preloader, { display: 'none' });
                  preloader.remove();

                  resolve();
                },
              });

              tl.to(preloader, {
                y: '-100vh',
                duration: 0.3,
                ease: 'power2.inOut',
              }).to(
                pageWrapper,
                {
                  y: 0,
                  duration: 0.3,
                  ease: 'power2.inOut',
                },
                '<'
              );
            },
            (video.duration - 0.3) * 1000
          );
        }
      }, 100);

      // Fallback
      setTimeout(() => {
        if (!video.duration) {
          clearInterval(checkVideo);

          const tl = gsap.timeline({
            onComplete: () => {
              // Explicitly set back to static
              pageWrapper.style.position = 'static';
              pageWrapper.style.width = originalWidth;
              pageWrapper.style.transform = 'none';

              // Then remove loading class and preloader
              document.body.classList.remove('loading');
              gsap.set(preloader, { display: 'none' });
              preloader.remove();

              resolve();
            },
          });

          tl.to(preloader, {
            y: '-100vh',
            duration: 0.3,
            ease: 'power2.inOut',
          }).to(
            pageWrapper,
            {
              y: 0,
              duration: 0.3,
              ease: 'power2.inOut',
            },
            '<'
          );
        }
      }, 3000);
    });
  }
}

// Create preloader instance
const preloader = new VideoPreloader();

gsap.registerPlugin(Flip, ScrollToPlugin);

// Initialize preloader before anything else
document.addEventListener('DOMContentLoaded', () => {
  preloader.playPreloader().catch(console.error);
});

function initializeAccordion() {
  const accordion = (function () {
    const settings = {
      duration: 1,
      ease: 'power3.inOut',
    };

    function getViewportHeight() {
      return '100dvh';
    }

    function scrollToTop($element) {
      // Force scroll to 0 when in full mobile viewport
      if (window.innerWidth <= 768 && window.visualViewport) {
        return gsap.to(window, {
          duration: settings.duration,
          scrollTo: 0,
          autoKill: false,
          ease: settings.ease,
        });
      }

      // Existing behavior for all other cases
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
        let resizeObserver;

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
                    gsap.set(accordionBody, { height: getViewportHeight() });

                    // Initialize ResizeObserver for dynamic height updates
                    resizeObserver = new ResizeObserver(() => {
                      if ($clicked.hasClass('active')) {
                        gsap.set(accordionBody, { height: getViewportHeight() });
                      }
                    });
                    resizeObserver.observe(document.documentElement);

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
                gsap.set(accordionBody, { height: getViewportHeight() });

                // Initialize ResizeObserver for dynamic height updates
                resizeObserver = new ResizeObserver(() => {
                  if ($clicked.hasClass('active')) {
                    gsap.set(accordionBody, { height: getViewportHeight() });
                  }
                });
                resizeObserver.observe(document.documentElement);

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

          // Cleanup function for ResizeObserver
          const cleanup = () => {
            if (resizeObserver) {
              resizeObserver.disconnect();
            }
            $clicked.off('click', cleanup);
          };

          $clicked.on('click', cleanup);
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
                  // Cleanup ResizeObserver when closing
                  if (resizeObserver) {
                    resizeObserver.disconnect();
                  }
                },
              });
            }, 'start+=0.2');
        }
      },
    };
  })();

  // Updated styles with mobile viewport support
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
      height: 100vh;  /* Fallback for older browsers */
      height: 100dvh; /* Modern browsers will use this */
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
