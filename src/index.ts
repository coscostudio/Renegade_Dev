import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { videoCacheManager } from './components/video/cacheManager';
import { initializeVideo } from './components/video/videoLoader';
gsap.registerPlugin(Draggable);

import { ArchiveView } from './components/WebGLGrid/ArchiveView';

/// ----- Global Variables ----- //
let activeLinkBackground: HTMLDivElement | null = null;
const observer: MutationObserver | null = null;

function createActiveLinkBackground() {
  activeLinkBackground = document.createElement('div');
  activeLinkBackground.classList.add('active-link-background');

  // Initial styles
  Object.assign(activeLinkBackground.style, {
    position: 'absolute',
    top: '0',
    background: '#424242',
    zIndex: '1',
    pointerEvents: 'none',
    willChange: 'transform',
  });

  const menuContainer = document.querySelector('.menu_container');
  if (menuContainer) {
    menuContainer.style.position = 'relative';
    menuContainer.appendChild(activeLinkBackground);
    setInitialPosition();
    setupActiveLinkBackgroundResize(); // Add this line
  }
}

// Helper function to set the initial position based on the current page
function setInitialPosition() {
  const currentLink = document.querySelector('.menulink.w--current');
  if (currentLink) {
    const linkRect = currentLink.getBoundingClientRect();
    const containerRect = document.querySelector('.menu_container').getBoundingClientRect();
    activeLinkBackground.style.left = `${linkRect.left - containerRect.left}px`;
    activeLinkBackground.style.width = `${linkRect.width}px`;
    activeLinkBackground.style.height = `${linkRect.height}px`; // Added height inheritance
  }
}

// Function to determine slide direction based on namespaces
function getSlideDirection(currentNS, nextNS) {
  const pages = ['index', 'info', 'archive'];
  const currentIndex = pages.indexOf(currentNS);
  const nextIndex = pages.indexOf(nextNS);
  return currentIndex < nextIndex ? 'right' : 'left';
}

// Animation function to move activeLinkBackground
function animateBackgroundToActiveLink(data) {
  if (!activeLinkBackground) return;

  const nextNamespace = data?.next?.namespace || 'index';
  const nextLink = document.querySelector(`.menulink[data-nav-target="${nextNamespace}"]`);

  if (!nextLink) return;

  const linkRect = nextLink.getBoundingClientRect();
  const containerRect = document.querySelector('.menu_container').getBoundingClientRect();

  return gsap.to(activeLinkBackground, {
    left: linkRect.left - containerRect.left,
    width: linkRect.width,
    height: linkRect.height, // Added height animation
    duration: 1.5,
    ease: 'expo.inOut',
  });
}

function setupActiveLinkBackgroundResize() {
  if (!activeLinkBackground) return;

  const resizeObserver = new ResizeObserver(
    debounce(() => {
      const currentLink = document.querySelector('.menulink.w--current');
      if (currentLink && activeLinkBackground) {
        const linkRect = currentLink.getBoundingClientRect();
        const containerRect = document.querySelector('.menu_container').getBoundingClientRect();

        gsap.to(activeLinkBackground, {
          left: linkRect.left - containerRect.left,
          width: linkRect.width,
          height: linkRect.height,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    }, 100)
  );

  // Observe both document and menu container for any size changes
  resizeObserver.observe(document.documentElement);
  const menuContainer = document.querySelector('.menu_container');
  if (menuContainer) {
    resizeObserver.observe(menuContainer);
  }
}

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function createClickBlocker() {
  const blocker = document.createElement('div');
  Object.assign(blocker.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '9998',
    backgroundColor: 'transparent', // Transparent but will still block clicks
    pointerEvents: 'all', // This is crucial - makes it intercept all clicks
    display: 'none',
    cursor: 'inherit',
  });

  // Add event listeners to prevent all interactions
  blocker.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  blocker.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  blocker.addEventListener(
    'touchstart',
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    { passive: false }
  );

  blocker.classList.add('transition-blocker');
  document.body.appendChild(blocker);
}

function blockClicks() {
  const blocker = document.querySelector('.transition-blocker');
  if (blocker) {
    blocker.style.display = 'block';
    document.body.style.pointerEvents = 'none'; // Disable clicks on the body
    blocker.style.pointerEvents = 'all'; // But keep blocker clickable
  }
}

function unblockClicks() {
  const blocker = document.querySelector('.transition-blocker');
  if (blocker) {
    blocker.style.display = 'none';
    document.body.style.pointerEvents = ''; // Re-enable clicks on the body
  }
}

function blockActivePageClicks() {
  // Clear existing blocks first
  document.querySelectorAll('.menulink, [data-nav-target="index"]').forEach((link) => {
    link.style.cursor = '';
    link.style.pointerEvents = '';
  });

  setTimeout(() => {
    const currentNamespace = document.body.getAttribute('data-barba-namespace');

    // Block current menu link
    const currentLink = document.querySelector('.menulink.w--current');
    if (currentLink) {
      currentLink.style.cursor = 'default';
      currentLink.style.pointerEvents = 'none';
    }

    // If on index, block both menu link and logo
    if (currentNamespace === 'index') {
      document
        .querySelectorAll('.menulink.w--current, [data-nav-target="index"]:not(.menulink)')
        .forEach((link) => {
          link.style.cursor = 'default';
          link.style.pointerEvents = 'none';
        });
    }
  }, 50);
}

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
        height: 101vh !important;
        height: 101dvh !important;
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

    // Initialize preloader video separately
    await initializeVideo(preloader, true);
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
      opacity: 1, // Make visible again
      visibility: 'visible', // Make visible again
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
                duration: 1,
                ease: 'expo.inOut',
              }).to(
                pageWrapper,
                {
                  y: 0,
                  duration: 1,
                  ease: 'expo.inOut',
                },
                '<'
              );
            },
            (video.duration - 1) * 1000
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
            duration: 1,
            ease: 'expo.inOut',
          }).to(
            pageWrapper,
            {
              y: 0,
              duration: 1,
              ease: 'expo.inOut',
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

function loadAutoVideo(): void {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-autovideo@1/autovideo.js';
  script.defer = true;
  document.body.appendChild(script);
}

function addLoadingStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .accordion-loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fafafa;
      z-index: 2;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .accordion-loader.is-loading {
      opacity: 1;
      visibility: visible;
    }

    .text-size-main {
      opacity: 0.8;
    }

    @keyframes loadingDots {
      0% { content: '.'; }
      33% { content: '..'; }
      66% { content: '...'; }
    }

    .accordion-loader::after {
      content: '.';
      display: inline-block;
      animation: loadingDots 1.5s infinite;
      min-width: 24px;
    }
  `;
  document.head.appendChild(style);
}

function initializeAccordion() {
  addLoadingStyles();

  async function initializeAndPlayVideo(videoElement, loaderElement) {
    if (!videoElement || !(videoElement instanceof HTMLVideoElement)) {
      console.warn('Invalid video element provided:', videoElement);
      return;
    }

    videoElement.setAttribute('data-autoplay', 'true');
    videoElement.removeAttribute('muted');
    videoElement.playsInline = true;
    videoElement.loop = true;
    videoElement.volume = 1;

    // Show loader while video is loading
    if (loaderElement) {
      loaderElement.classList.add('is-loading');
    }

    // Create a promise that resolves when the video can play
    const canPlayPromise = new Promise((resolve) => {
      const checkCanPlay = () => {
        if (videoElement.readyState >= 3) {
          resolve();
        } else {
          videoElement.addEventListener('canplay', resolve, { once: true });
        }
      };
      checkCanPlay();
    });

    try {
      // Wait for video to be ready to play
      await Promise.race([
        canPlayPromise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Video load timeout')), 30000)
        ),
      ]);

      // Hide loader once video is ready
      if (loaderElement) {
        loaderElement.classList.remove('is-loading');
      }

      await videoElement.play();
    } catch (error) {
      console.warn('Play failed:', error);
      // Hide loader on error
      if (loaderElement) {
        loaderElement.classList.remove('is-loading');
      }
    }
  }

  function resetVideo(videoElement) {
    console.log('Resetting video');
    if (videoElement && videoElement instanceof HTMLVideoElement) {
      console.log('Valid video element found:', videoElement);
      videoElement.pause();
      videoElement.currentTime = 0;
      videoElement.load();
      console.log('Video reset to:', videoElement.currentTime);
    } else {
      console.warn('Invalid video element:', videoElement);
    }
  }

  function getViewportHeight() {
    return '101dvh';
  }

  function verifyPosition($element) {
    const currentTop = $element.offset().top;
    if (Math.abs(window.pageYOffset - currentTop) > 2) {
      gsap.to(window, {
        duration: 0.5,
        scrollTo: currentTop,
        ease: 'expo.out',
      });
    }
  }

  const accordion = (function () {
    const settings = {
      duration: 1,
      ease: 'expo.inOut',
    };

    let isAnimating = false;

    return {
      init() {
        // Add loader elements to each accordion item
        $('.js-accordion-item').each(function () {
          const $item = $(this);
          const loader = document.createElement('div');
          loader.className = 'accordion-loader text-size-main';
          loader.textContent = 'LOADING';
          $item.find('.js-accordion-body').append(loader);
        });

        $('.js-accordion-item').on('click', function () {
          if (isAnimating) return;
          accordion.toggle($(this));
        });
      },
      toggle($clicked) {
        const accordionBody = $clicked.find('.js-accordion-body')[0];
        const videoElement = $clicked.find('.event-video')[0];
        const loaderElement = $clicked.find('.accordion-loader')[0];
        const accordionHeader = $clicked.find('.js-accordion-header')[0];
        const isOpening = !$clicked.hasClass('active');
        let resizeObserver;

        isAnimating = true;

        if (isOpening) {
          const $openItem = $('.js-accordion-item.active');
          if ($openItem.length) {
            const openVideo = $openItem.find('.event-video')[0];
            const openBody = $openItem.find('.js-accordion-body')[0];
            const openHeader = $openItem.find('.js-accordion-header')[0];

            const closeTl = gsap.timeline({
              onComplete: async () => {
                const targetPosition = $clicked.offset().top;
                const openTl = gsap.timeline({
                  onComplete: async () => {
                    isAnimating = false;
                    if (videoElement) {
                      await initializeAndPlayVideo(videoElement, loaderElement);
                    }
                  },
                });

                $clicked.addClass('active');
                gsap.set(accordionBody, {
                  display: 'block',
                  height: 0,
                });

                const openState = Flip.getState(accordionBody);
                gsap.set(accordionBody, { height: getViewportHeight() });

                openTl
                  .to(
                    window,
                    {
                      scrollTo: {
                        y: targetPosition,
                        autoKill: false,
                      },
                      duration: settings.duration,
                      ease: settings.ease,
                    },
                    0
                  )
                  .to(
                    accordionHeader,
                    {
                      paddingTop: '5rem',
                      duration: settings.duration,
                      ease: settings.ease,
                    },
                    0
                  )
                  .add(
                    Flip.from(openState, {
                      duration: settings.duration,
                      ease: settings.ease,
                      absoluteOnLeave: true,
                      onComplete: () => {
                        resizeObserver = new ResizeObserver(() => {
                          if ($clicked.hasClass('active')) {
                            gsap.set(accordionBody, { height: getViewportHeight() });
                            verifyPosition($clicked);
                          }
                        });
                        resizeObserver.observe(document.documentElement);
                        verifyPosition($clicked);
                      },
                    }),
                    0
                  );
              },
            });

            closeTl
              .to(
                openHeader,
                {
                  duration: settings.duration,
                  paddingTop: '0.5rem',
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
                    gsap.set(openBody, { clearProps: 'all', display: 'none' });
                    resetVideo(openVideo);
                  },
                });
              }, 'start+=0.2');
          } else {
            const targetPosition = $clicked.offset().top;
            const openTl = gsap.timeline({
              onComplete: async () => {
                isAnimating = false;
                if (videoElement) {
                  await initializeAndPlayVideo(videoElement, loaderElement);
                }
              },
            });

            $clicked.addClass('active');
            gsap.set(accordionBody, {
              display: 'block',
              height: 0,
            });

            const openState = Flip.getState(accordionBody);
            gsap.set(accordionBody, { height: getViewportHeight() });

            openTl
              .to(
                window,
                {
                  scrollTo: {
                    y: targetPosition,
                    autoKill: false,
                  },
                  duration: settings.duration,
                  ease: settings.ease,
                },
                0
              )
              .to(
                accordionHeader,
                {
                  paddingTop: '5rem',
                  duration: settings.duration,
                  ease: settings.ease,
                },
                0
              )
              .add(
                Flip.from(openState, {
                  duration: settings.duration,
                  ease: settings.ease,
                  absoluteOnLeave: true,
                  onComplete: () => {
                    resizeObserver = new ResizeObserver(() => {
                      if ($clicked.hasClass('active')) {
                        gsap.set(accordionBody, { height: getViewportHeight() });
                        verifyPosition($clicked);
                      }
                    });
                    resizeObserver.observe(document.documentElement);
                    verifyPosition($clicked);
                  },
                }),
                0
              );
          }
        } else {
          const closeTl = gsap.timeline({
            onComplete: () => {
              isAnimating = false;
            },
          });

          closeTl
            .to(
              accordionHeader,
              {
                duration: settings.duration,
                paddingTop: '0.5rem',
                ease: settings.ease,
              },
              'start'
            )
            .to(
              accordionBody,
              {
                height: 0,
                duration: settings.duration,
                ease: settings.ease,
                onComplete: () => {
                  $clicked.removeClass('active');
                  gsap.set(accordionBody, {
                    clearProps: 'all',
                    display: 'none',
                  });
                  resetVideo(videoElement);
                  if (resizeObserver) {
                    resizeObserver.disconnect();
                  }
                },
              },
              'start'
            );
        }
      },
    };
  })();

  const style = document.createElement('style');
  style.textContent = `
    .js-accordion-item {
      min-height: 3rem;
      background-color: transparent;
      transition: background-color 0.3s ease;
      font-size: 0;
      line-height: 0;
      position: relative;
      border-top: 0.5rem solid #fafafa;
      overflow: hidden;
    }
    
    @media (max-width: 768px) {
      .js-accordion-item {
        min-height: 6rem;
      }
    }
    
    .js-accordion-item > * {
      font-size: 1rem;
      line-height: normal;
    }
    
    .js-accordion-item:not(.active):hover {
      background-color: #fafafa !important;
    }
    
    .js-accordion-item.active {
      min-height: 3rem;
      background-color: #0F0F0F !important;
      color: #fafafa !important;
      border-top: none !important;
    }
    
    @media (max-width: 768px) {
      .js-accordion-item.active {
        min-height: 6rem;
      }
    }
 
    .js-accordion-item.active + .js-accordion-item {
      border-top: none !important;
    }
    
    .js-accordion-body {
      height: calc(101vh + 1rem);
      height: calc(101dvh + 1rem);
      width: 100%;
      margin: 0;
      padding: 0;
      position: absolute;
      background-color: #0F0F0F;
      display: none;
      vertical-align: top;
      line-height: 0;
      top: 0;
      left: 0;
      will-change: height;
      transform-origin: top;
    }
    
    .js-accordion-body * {
      line-height: 0;
    }
    
    .js-accordion-body .event-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      object-fit: cover;
      display: block;
    }
  `;
  document.head.appendChild(style);

  gsap.registerPlugin(Flip, ScrollToPlugin);
  accordion.init();
}

// preloader
document.addEventListener('DOMContentLoaded', () => {
  preloader.playPreloader().catch(console.error);
});

window.addEventListener('unload', () => {
  videoCacheManager.cleanup();
});

// Barba initialization
barba.init({
  transitions: [
    {
      name: 'slide-transition',
      sync: true,
      debug: true,
      before(data) {
        blockClicks();
        if (data?.next?.container) {
          gsap.set(data.next.container, {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            visibility: 'visible',
          });
        }
      },
      async leave(data) {
        const currentScroll = window.scrollY;
        const direction = getSlideDirection(data.current.namespace, data.next.namespace);
        const tl = gsap.timeline();

        gsap.set(data.current.container, {
          position: 'fixed',
          top: -currentScroll,
          left: 0,
          width: '100%',
        });

        tl.add(animateBackgroundToActiveLink(data), 0);

        if (data.current.namespace === 'archive' && (window as any).archiveView) {
          const fadeOut = (window as any).archiveView.fadeOut();
          tl.add(fadeOut, 0);
        }

        tl.to(
          data.current.container,
          {
            x: direction === 'right' ? '-100%' : '100%',
            duration: 1.5,
            ease: 'expo.inOut',
          },
          0
        );

        return tl;
      },
      enter(data) {
        const direction = getSlideDirection(data.current.namespace, data.next.namespace);

        gsap.set(data.next.container, {
          x: direction === 'right' ? '100%' : '-100%',
        });

        return gsap.to(data.next.container, {
          x: 0,
          duration: 1.5,
          ease: 'expo.inOut',
          onComplete: unblockClicks,
        });
      },
      after(data) {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }

        unblockClicks();
        gsap.set([data.current.container, data.next.container], {
          clearProps: 'position,top,left,width,transform',
        });
        window.scrollTo(0, 0);
      },
    },
  ],

  views: [
    {
      namespace: 'index',
      afterEnter() {
        restartWebflow();
        loadAutoVideo();
        initializeAccordion();
      },
    },
    {
      namespace: 'info',
      afterEnter() {
        restartWebflow();
      },
    },
    {
      namespace: 'archive',
      beforeEnter() {
        document.body.classList.add('archive-page');

        // Add initial styles to prevent flash
        const style = document.createElement('style');
        style.id = 'archive-init-styles';
        style.textContent = `
          .archive-container, 
          .archive-canvas,
          .archive-zoom {
            opacity: 0 !important;
            visibility: hidden !important;
          }
        `;
        document.head.appendChild(style);
      },

      async afterEnter(data) {
        try {
          // Ensure container is hidden during setup
          gsap.set(data.next.container, { autoAlpha: 0 });

          // Small delay to ensure DOM is ready
          await new Promise((resolve) => setTimeout(resolve, 100));

          // Initialize archive view
          const archiveView = new ArchiveView(data.next.container);
          await archiveView.init();

          // Store reference globally
          (window as any).archiveView = archiveView;

          // Remove initial hiding styles
          const initStyles = document.getElementById('archive-init-styles');
          if (initStyles) initStyles.remove();

          // Show content with smooth fade
          gsap.set(data.next.container, { autoAlpha: 1 });
          archiveView.show();
        } catch (error) {
          console.error('Error initializing archive view:', error);
        }
      },

      beforeLeave() {
        // Only remove the class, don't destroy the view yet
        document.body.classList.remove('archive-page');
      },
    },
  ],
});

// Barba Hooks
barba.hooks.before(() => {
  if ((window as any).archiveView) {
    (window as any).archiveView.isTransitioning = true;
  }
});

barba.hooks.enter(() => {
  window.scrollTo(0, 0);
  const preloader = document.querySelector('.loader_wrapper');
  if (preloader) {
    preloader.style.display = 'none';
  }
});

barba.hooks.after(async ({ current, next }) => {
  // Existing code...
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Clean up archive view only after transition is complete
  if (current?.namespace === 'archive' && (window as any).archiveView) {
    (window as any).archiveView.destroy();
    delete (window as any).archiveView;
  }

  // Update archive view state if it exists
  if ((window as any).archiveView) {
    (window as any).archiveView.isTransitioning = false;
  }

  // Clear any existing blocks before applying new ones
  document.querySelectorAll('.menulink, .logo-nav').forEach((link) => {
    link.style.cursor = '';
    link.style.pointerEvents = '';
  });

  // Apply new blocks after a short delay
  setTimeout(blockActivePageClicks, 50);

  // Restart Webflow and wait for completion
  restartWebflow();
  await new Promise((resolve) => setTimeout(resolve, 100));
  loadAutoVideo(); // Add this
  initializeVideo(document);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  createActiveLinkBackground();
  createClickBlocker();
  blockActivePageClicks();
  loadAutoVideo(); // Add this
  initializeVideo(document);
  preloader.playPreloader().catch(console.error);
});

// Exports
export { blockClicks, createClickBlocker, unblockClicks };
