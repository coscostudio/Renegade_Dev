import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

/// ----- Global Variables ----- //
let activeLinkBackground;
let observer;

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
                duration: 1,
                ease: 'power2.inOut',
              }).to(
                pageWrapper,
                {
                  y: 0,
                  duration: 1,
                  ease: 'power2.inOut',
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
            ease: 'power2.inOut',
          }).to(
            pageWrapper,
            {
              y: 0,
              duration: 1,
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
      return '101dvh';
    }

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
      height: 101vh;  /* Fallback for older browsers */
      height: 101dvh; /* Modern browsers will use this */
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

// --- Style Injection for Infinite Grid --- //
function injectGridStyles() {
  const style = document.createElement('style');
  style.textContent = `
    body.archive-page {
      margin: 0;
      overflow: hidden;
    }
    .grid {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
    .grid-wrapper {
      transform-origin: center;
      position: absolute;
      will-change: transform;
    }
    .grid-clone {
      position: absolute;
      will-change: transform;
    }
    .js-plane {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      overflow: hidden;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }
    .js-plane img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      object-position: center top;
      pointer-events: none;
      user-select: none;
      -webkit-user-select: none;
      -webkit-user-drag: none;
    }
  `;
  document.head.appendChild(style);
}

// --- Infinite Grid Class --- //
class InfiniteGrid {
  private GRID_WIDTH = 3000;
  private GRID_HEIGHT = 3300;
  private position = { x: 0, y: 0 };
  private velocity = { x: 0, y: 0 };
  private zoom = 1;
  private isDragging = false;
  private lastPosition = { x: 0, y: 0 };
  private container: HTMLElement;
  private wrapper: HTMLElement;

  constructor() {
    const gridElement = document.querySelector('.js-grid');
    if (!gridElement) return;
    this.container = gridElement as HTMLElement;
    this.initialize();
  }

  private initialize() {
    const originalContent = this.container.innerHTML;

    this.container.style.width = '100vw';
    this.container.style.height = '100vh';
    this.container.style.overflow = 'hidden';
    this.container.style.position = 'fixed';

    this.wrapper = document.createElement('div');
    this.wrapper.className = 'grid-wrapper';
    this.container.innerHTML = '';
    this.container.appendChild(this.wrapper);

    // Create grid area
    for (let y = -2; y <= 2; y++) {
      for (let x = -2; x <= 2; x++) {
        const clone = document.createElement('div');
        clone.className = 'grid-clone';
        clone.innerHTML = originalContent;
        clone.style.position = 'absolute';
        clone.style.width = `${this.GRID_WIDTH}px`;
        clone.style.height = `${this.GRID_HEIGHT}px`;
        clone.style.transform = `translate(${x * this.GRID_WIDTH}px, ${y * this.GRID_HEIGHT}px)`;
        clone.style.display = 'grid';
        clone.style.gridTemplateColumns = 'repeat(10, 1fr)';
        clone.style.gridTemplateRows = 'repeat(11, 1fr)';
        clone.style.gap = '40px';
        clone.style.padding = '40px';

        this.wrapper.appendChild(clone);
      }
    }

    this.setupImages();
    this.centerGrid();
    this.addEventListeners();
    this.animate();
  }

  private setupImages(): void {
    document.querySelectorAll('.js-plane').forEach((figure) => {
      if (!figure.querySelector('img')) {
        const figureElement = figure as HTMLElement;
        const img = document.createElement('img');
        img.src = figureElement.dataset.src || '';
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.draggable = false;
        figure.appendChild(img);
      }
    });
  }

  private centerGrid(): void {
    const viewportCenter = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    this.position.x = viewportCenter.x - this.GRID_WIDTH / 2;
    this.position.y = viewportCenter.y - this.GRID_HEIGHT / 2;
  }

  private addEventListeners(): void {
    this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));

    this.container.addEventListener('wheel', this.onWheel.bind(this), { passive: false });

    this.container.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    this.container.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
    this.container.addEventListener('touchend', this.onTouchEnd.bind(this));

    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');
    if (zoomInButton) zoomInButton.addEventListener('click', () => this.adjustZoom(0.1));
    if (zoomOutButton) zoomOutButton.addEventListener('click', () => this.adjustZoom(-0.1));
  }

  private onMouseDown(e: MouseEvent): void {
    e.preventDefault();
    this.isDragging = true;
    this.lastPosition = {
      x: e.clientX - this.position.x,
      y: e.clientY - this.position.y,
    };
    this.velocity = { x: 0, y: 0 };
  }

  private onMouseMove(e: MouseEvent): void {
    if (!this.isDragging) return;

    const newX = e.clientX - this.lastPosition.x;
    const newY = e.clientY - this.lastPosition.y;

    this.velocity.x = (newX - this.position.x) * 0.1;
    this.velocity.y = (newY - this.position.y) * 0.1;

    this.position.x = newX;
    this.position.y = newY;

    this.wrapPosition();
  }

  private onMouseUp(): void {
    this.isDragging = false;
  }

  private onWheel(e: WheelEvent): void {
    e.preventDefault();

    if (e.ctrlKey) {
      this.adjustZoom(-e.deltaY * 0.001);
    } else {
      this.velocity.x -= e.deltaX * 0.5;
      this.velocity.y -= e.deltaY * 0.5;
    }
  }

  private onTouchStart(e: TouchEvent): void {
    e.preventDefault();
    this.isDragging = true;
    this.lastPosition = {
      x: e.touches[0].clientX - this.position.x,
      y: e.touches[0].clientY - this.position.y,
    };
    this.velocity = { x: 0, y: 0 };
  }

  private onTouchMove(e: TouchEvent): void {
    if (!this.isDragging) return;
    e.preventDefault();

    const newX = e.touches[0].clientX - this.lastPosition.x;
    const newY = e.touches[0].clientY - this.lastPosition.y;

    this.velocity.x = (newX - this.position.x) * 0.1;
    this.velocity.y = (newY - this.position.y) * 0.1;

    this.position.x = newX;
    this.position.y = newY;

    this.wrapPosition();
  }

  private onTouchEnd(): void {
    this.isDragging = false;
  }

  private adjustZoom(delta: number): void {
    const zoomLevels = [0.5, 0.75, 1, 1.5, 2];
    const currentZoom = this.zoom;

    let nextZoom: number;
    if (delta > 0) {
      nextZoom = zoomLevels.find((zoom) => zoom > currentZoom) || zoomLevels[zoomLevels.length - 1];
    } else {
      nextZoom =
        zoomLevels
          .slice()
          .reverse()
          .find((zoom) => zoom < currentZoom) || zoomLevels[0];
    }

    const viewportCenter = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const zoomPointX = (viewportCenter.x - this.position.x) / this.zoom;
    const zoomPointY = (viewportCenter.y - this.position.y) / this.zoom;

    gsap.to(this, {
      zoom: nextZoom,
      duration: 0.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        this.position.x = viewportCenter.x - zoomPointX * this.zoom;
        this.position.y = viewportCenter.y - zoomPointY * this.zoom;
        this.wrapPosition();
      },
    });
  }

  private wrapPosition(): void {
    const effectiveWidth = this.GRID_WIDTH * this.zoom;
    const effectiveHeight = this.GRID_HEIGHT * this.zoom;

    this.position.x = ((this.position.x % this.GRID_WIDTH) + this.GRID_WIDTH) % this.GRID_WIDTH;
    this.position.y = ((this.position.y % this.GRID_HEIGHT) + this.GRID_HEIGHT) % this.GRID_HEIGHT;
  }

  private animate(): void {
    if (!this.isDragging) {
      this.velocity.x *= 0.95;
      this.velocity.y *= 0.95;

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      this.wrapPosition();
    }

    const transform = `translate(${this.position.x}px, ${this.position.y}px) scale(${this.zoom})`;
    this.wrapper.style.transform = transform;

    requestAnimationFrame(this.animate.bind(this));
  }
}

// Barba initialization
barba.init({
  debug: true,
  sync: true,
  transitions: [
    {
      name: 'slide-transition',
      sync: true,
      beforeLeave() {
        blockClicks();
      },
      leave(data) {
        const direction = getSlideDirection(data.current.namespace, data.next.namespace);
        const tl = gsap.timeline();

        tl.to(
          data.current.container,
          {
            x: direction === 'right' ? '-100%' : '100%',
            duration: 1.5,
            ease: 'expo.inOut',
          },
          0
        ).add(animateBackgroundToActiveLink(data), 0);

        return tl;
      },
      enter(data) {
        const direction = getSlideDirection(data.current.namespace, data.next.namespace);

        gsap.set(data.next.container, {
          x: direction === 'right' ? '100%' : '-100%',
        });

        data.next.container.style.visibility = 'visible';

        const tl = gsap.to(data.next.container, {
          x: 0,
          duration: 1.5,
          ease: 'expo.inOut',
          onComplete: () => {
            unblockClicks();
          },
        });

        return tl;
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
        loadAutoVideo();
      },
    },
    {
      namespace: 'archive',
      beforeEnter() {
        injectGridStyles();
        document.body.classList.add('archive-page');
      },
      afterEnter() {
        restartWebflow();
        loadAutoVideo();
        new InfiniteGrid();
      },
      beforeLeave() {
        document.body.classList.remove('archive-page');
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  createActiveLinkBackground();
  createClickBlocker();
  loadAutoVideo();
  preloader.playPreloader().catch(console.error);
});

// Handle resize
window.addEventListener('resize', () => {});

function loadAutoVideo() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-autovideo@1/autovideo.js';
  script.defer = true;
  document.body.appendChild(script);
}
