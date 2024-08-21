import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { SLIDE } from '@splidejs/splide';
import { gsap } from 'gsap';

/// ----- Global Variables ----- //
let activeLinkBackground;
let observer; // MutationObserver to track style changes

// Function to Create and Style the Active Button Background Element
function createActiveLinkBackground() {
  activeLinkBackground = document.createElement('div');
  activeLinkBackground.classList.add('active-link-background');

  // Set inline styles (position: absolute is crucial)
  activeLinkBackground.style.position = 'absolute';
  activeLinkBackground.style.top = '4px';
  activeLinkBackground.style.height = 'calc(100% - 8px)';
  activeLinkBackground.style.backgroundColor = '#000';
  activeLinkBackground.style.borderRadius = '22px';
  activeLinkBackground.style.zIndex = '1';
  activeLinkBackground.style.pointerEvents = 'none';

  // Append to the navbar container
  const navbarContainer = document.querySelector('.navbar-container');
  navbarContainer.appendChild(activeLinkBackground);

  // Start observing link style changes
  startObservingLinkStyles();
}

// Function to Animate the Active Button Background
function animateBackgroundToActiveLink() {
  const infoLink = document.querySelector('[data-page="info"]');
  const projectsLink = document.querySelector('[data-page="projects"]');
  const archiveLink = document.querySelector('[data-page="archive"]');

  let activeLink, targetX, targetWidth;

  // Check for each page and its corresponding link
  if (window.location.pathname.startsWith('/projects')) {
    activeLink = projectsLink;
  } else if (window.location.pathname === '/info' || window.location.pathname === '/') {
    activeLink = infoLink;
  } else if (window.location.pathname === '/archive') {
    activeLink = archiveLink;
  } else {
    // Fallback to 'w--current' if no specific match is found
    activeLink = document.querySelector('.nav-button.w--current');
  }

  // Ensure the active link and background exist
  if (!activeLink || !activeLinkBackground) {
    return;
  }

  const activeLinkRect = activeLink.getBoundingClientRect();
  const navbarContainerRect = document.querySelector('.navbar-container').getBoundingClientRect();

  // Calculate animation properties
  targetX = activeLinkRect.left - navbarContainerRect.left;
  targetWidth = activeLinkRect.width;

  // Animate the background
  gsap.to(activeLinkBackground, {
    left: targetX,
    width: targetWidth,
    duration: 0.5,
    ease: 'power2.inOut',
  });
}

// ----- Function to Start Observing Link Styles ----- //
function startObservingLinkStyles() {
  const navLinks = document.querySelectorAll('.nav-button');

  const config = { attributes: true, attributeFilter: ['class'] };

  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        animateBackgroundToActiveLink(document);
      }
    }
  };

  observer = new MutationObserver(callback);

  navLinks.forEach((link) => {
    observer.observe(link, config);
  });
}

// ----- Function to Initialize Video Playback ----- //
function initializeVideoPlayback(videoContainer) {
  const videos = videoContainer.querySelectorAll('.project-slider-video');

  videos.forEach((video) => {
    video.muted = true;
    video.load();

    // Play/pause on visibility change and fix stalled videos
    let previousTime = 0;
    video.addEventListener('timeupdate', () => {
      if (document.visibilityState === 'visible' && video.paused) {
        video.play().catch(() => {}); // Handle autoplay with muted
      }

      // Check for stalled video
      if (video.currentTime === previousTime && !video.paused && !video.ended) {
        video.play().catch(() => {}); // Handle potential errors
      }
      previousTime = video.currentTime;
    });
  });
}

// ----- Barba Initialization ----- //
barba.init({
  debug: true,
  sync: true,
  transitions: [
    {
      name: 'slide-transition',
      sync: true,
      leave(data) {
        const direction =
          (data.current.namespace === 'info' &&
            (data.next.namespace === 'projects' || data.next.namespace === 'archive')) ||
          (data.current.namespace === 'projects' && data.next.namespace === 'archive')
            ? '-100%'
            : '100%';

        return gsap.to(data.current.container, {
          x: direction,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      },
      enter(data) {
        const isFromLeft =
          (data.current.namespace === 'projects' && data.next.namespace === 'info') ||
          (data.current.namespace === 'archive' &&
            (data.next.namespace === 'projects' || data.next.namespace === 'info'));

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
      beforeEnter(data) {},
    },
    {
      name: 'fade-transition', // New transition for within /projects/
      from: { namespace: ['projects'] }, // Apply this transition when navigating from within 'projects'
      to: { namespace: ['projects'] }, // Apply this transition when navigating to within 'projects'
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.5,
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.5,
        });
      },
    },
  ],

  views: [
    {
      namespace: 'info',
      beforeEnter({ next }) {
        animateBackgroundToActiveLink(next.container);
      },
      beforeLeave({ current }) {
        current.container
          .querySelectorAll('.project-slider-video')
          .forEach((video) => video.pause());
      },
    },
    {
      namespace: 'projects',
      beforeEnter({ next }) {
        animateBackgroundToActiveLink(next.container);
        function createAndAppendOverlay(projectSliderDiv) {
          if (projectSliderDiv) {
            const overlayDiv = document.createElement('div');
            overlayDiv.id = 'splide-overlay';
            overlayDiv.style.position = 'absolute';
            overlayDiv.style.top = '0';
            overlayDiv.style.left = '0';
            overlayDiv.style.width = '100%';
            overlayDiv.style.height = '100%';
            overlayDiv.style.backgroundColor = '#141414';
            overlayDiv.style.zIndex = '5000';

            projectSliderDiv.appendChild(overlayDiv);

            gsap.to(overlayDiv, {
              opacity: 0,
              duration: 1,
              onComplete: () => {
                overlayDiv.remove();
              },
            });
          }
        }

        // Get all project_slider_div elements
        const projectSliderDivs = next.container.querySelectorAll('#project_slider_div');

        // Apply overlay and fade-in effect to each slider
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
          projectSliderDivs.forEach(createAndAppendOverlay);
        } else {
          document.addEventListener('DOMContentLoaded', () => {
            projectSliderDivs.forEach(createAndAppendOverlay);
          });
        }

        function slider1() {
          const splides = $('.slider1');
          for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
            new Splide(splides[i], {
              type: 'loop',
              autoWidth: true,
              easing: true,
              drag: 'free',
              gap: '1rem',
              focus: 'right',
              arrows: false,
              pagination: false,
              autoScroll: {
                autoStart: true,
                speed: 0.1,
                pauseOnHover: false,
              },
            }).mount(window.splide.Extensions);
          }
        }
        slider1();
      },
      beforeLeave({ current }) {
        current.container
          .querySelectorAll('.project-slider-video')
          .forEach((video) => video.pause());
      },
    },
    {
      namespace: 'archive',
      beforeEnter({ next }) {
        animateBackgroundToActiveLink(next.container);
      },
      beforeLeave({ current }) {
        // Pause videos before leaving the page (if applicable to 'archive')
        current.container
          .querySelectorAll('.project-slider-video')
          .forEach((video) => video.pause());
      },
    },
  ],
});

// --- Barba Hooks --- //
barba.hooks.before(() => {
  document.querySelectorAll('.project-slider-video').forEach((video) => video.pause());
});

barba.hooks.enter(() => {
  window.scrollTo(0, 0);
  const preloader = document.querySelector('.preload-container');
  if (preloader) {
    preloader.style.display = 'none';
  }
});

barba.hooks.after(async ({ next }) => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  restartWebflow();
  initializeVideoPlayback(next.container);

  // Wait for a short delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Trigger animation after the delay
  animateBackgroundToActiveLink(next.container);
});

// DOMContentLoaded Event
document.addEventListener('DOMContentLoaded', () => {
  createActiveLinkBackground();
  initializeVideoPlayback(document);
  animateBackgroundToActiveLink(document);
});
// Add event listener for window resize
window.addEventListener('resize', () => {
  animateBackgroundToActiveLink(document); // Recalculate and animate on resize
});
