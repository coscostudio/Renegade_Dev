// src/preloader.ts
import { gsap } from 'gsap';

export class VideoPreloader {
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

// Export singleton instance
export const preloader = new VideoPreloader();
