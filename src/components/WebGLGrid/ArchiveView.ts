import { gsap } from 'gsap';

import { WebGLGrid } from './WebGLGrid';

export class ArchiveView {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement | null = null;
  private grid: WebGLGrid | null = null;
  private images: string[] = [];
  private resizeObserver: ResizeObserver | null = null;
  private zoomUI: HTMLElement | null = null;
  private isTransitioning = false;
  private cleanup: (() => void) | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    const imageElements = Array.from(container.querySelectorAll('.cms-image'));
    this.images = imageElements.map((img) => (img as HTMLImageElement).src);

    // Start with everything hidden
    gsap.set(container, { autoAlpha: 0 });

    this.setupStyles();
    this.setupViewportDetection();
    this.createZoomUI();
  }

  private setupViewportDetection(): void {
    // Add viewport unit support detection
    const viewportUnitsSupported = CSS.supports('height', '100svh');
    document.documentElement.dataset.viewportUnits = viewportUnitsSupported ? 'svh' : 'vh';

    // Set up fallback for non-SVH browsers
    if (!viewportUnitsSupported) {
      const updateVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };

      // Initial set
      updateVh();

      // Update on resize and orientation change
      window.addEventListener('resize', updateVh);
      window.addEventListener('orientationchange', () => {
        setTimeout(updateVh, 100);
      });

      // Store cleanup function
      this.cleanup = () => {
        window.removeEventListener('resize', updateVh);
        window.removeEventListener('orientationchange', updateVh);
      };
    }
  }

  private setupStyles(): void {
    const style = document.createElement('style');
    style.setAttribute('data-archive-styles', '');
    style.textContent = `
      .archive-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh; /* Fallback */
        height: 100svh; /* Small viewport height */
        overflow: hidden;
        background: #000;
        z-index: 1;
      }

      @supports not (height: 100svh) {
        .archive-container {
          height: calc(var(--vh, 1vh) * 100);
        }
      }

      .archive-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
        display: block;
        cursor: grab;
        touch-action: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
      }

      .archive-canvas:active {
        cursor: grabbing;
      }

      .archive-zoom {
  position: fixed;
  z-index: 9999;
  display: flex;
  pointer-events: auto;
  transition: transform 0.3s ease;
  bottom: max(2rem, 5svh);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  left: 50%;
  transform: translateX(-50%);
  will-change: transform;
}

      @supports not (bottom: 5svh) {
  .archive-zoom {
    bottom: max(2rem, calc(var(--vh, 1vh) * 5));
  }
}

.zoom-button {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.75rem;
  background-color: #424242;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  margin: 0;
}

.zoom-button svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Desktop hover */
@media (hover: hover) and (pointer: fine) {
  .zoom-button:hover {
    background-color: #2B2B2B;
  }
}

/* Touch/click state for all devices */
.zoom-button:active {
  background-color: #2B2B2B;
}

/* Responsive zoom button sizes */
@media (max-width: 1024px) {
  .zoom-button {
    width: 2.75rem;
    height: 2.75rem;
    padding: 0.85rem;
  }
}

@media (max-width: 768px) {
  .zoom-button {
    width: 3rem;
    height: 3rem;
    padding: 0.9rem;
  }
  .archive-zoom {
    bottom: max(2rem, 7svh);
  }
}

@media (max-width: 479px) {
  .zoom-button {
    width: 3.25rem;
    height: 3.25rem;
    padding: 1rem;
  }
    `;

    document.head.appendChild(style);
  }

  private createZoomUI(): void {
    this.zoomUI = document.createElement('div');
    this.zoomUI.className = 'archive-zoom';

    // Set initial state
    gsap.set(this.zoomUI, {
      autoAlpha: 0,
      visibility: 'visible',
    });

    const zoomOutBtn = this.createZoomButton(
      'out',
      `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
        <path d="M1 7H13" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/>
      </svg>
    `
    );

    const zoomInBtn = this.createZoomButton(
      'in',
      `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
        <path d="M7 1V13M1 7H13" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/>
      </svg>
    `
    );

    this.zoomUI.appendChild(zoomOutBtn);
    this.zoomUI.appendChild(zoomInBtn);

    // Append to body for reliable fixed positioning
    document.body.appendChild(this.zoomUI);

    zoomOutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleZoom(0.8);
    });

    zoomInBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleZoom(1.2);
    });
  }

  private createZoomButton(type: 'in' | 'out', svg: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'zoom-button';
    button.setAttribute('data-zoom', type);
    button.setAttribute('aria-label', `Zoom ${type}`);
    button.innerHTML = svg;
    return button;
  }

  private handleZoom(factor: number): void {
    if (!this.grid || !this.canvas) return;

    const rect = this.canvas.getBoundingClientRect();
    const center = {
      x: rect.width / 2,
      y: rect.height / 2,
    };

    this.grid.setZoom(factor, center.x, center.y);
  }

  public async init(): Promise<void> {
    try {
      this.isTransitioning = true;
      await this.initializeContainer();
      await this.initializeGrid();
      this.setupResizeObserver();
      this.isTransitioning = false;
    } catch (error) {
      console.error('Failed to initialize archive view:', error);
      throw error;
    }
  }

  private async initializeContainer(): Promise<void> {
    let archiveContainer = this.container.querySelector('.archive-container');
    if (!archiveContainer) {
      archiveContainer = document.createElement('div');
      archiveContainer.className = 'archive-container';
      this.container.appendChild(archiveContainer);
    }

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'archive-canvas';
    archiveContainer.appendChild(this.canvas);
  }

  private async initializeGrid(): Promise<void> {
    if (!this.canvas) throw new Error('Canvas not initialized');

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    this.grid = new WebGLGrid(this.canvas);

    await this.grid.init({
      images: this.images,
      columnCount: isMobile ? 2 : 3,
      rowCount: isMobile ? 3 : 4,
      pixelRatio: window.devicePixelRatio,
    });
  }

  private setupResizeObserver(): void {
    if (!this.canvas) return;

    this.resizeObserver = new ResizeObserver(
      this.debounce(() => {
        this.handleResize();
      }, 150)
    );

    this.resizeObserver.observe(this.canvas);
  }

  private handleResize = (): void => {
    if (!this.canvas || !this.grid) return;
    const rect = this.canvas.parentElement!.getBoundingClientRect();
    this.grid.resize(rect.width, rect.height);
  };

  private debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  public show(): void {
    if (!this.canvas || !this.grid) {
      console.error('Show called but canvas or grid is missing');
      return;
    }

    // Ensure everything starts hidden
    gsap.set([this.canvas, this.zoomUI], {
      autoAlpha: 0,
      visibility: 'visible', // Set visibility here to prevent layout shifts
    });

    // Start grid
    this.grid.start();

    // Create master timeline for smooth fade in
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power2.inOut',
      },
    });

    // Fade in both elements together
    tl.to([this.canvas, this.zoomUI], {
      autoAlpha: 1,
      stagger: 0,
    });
  }

  public async fadeOut(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.canvas && !this.zoomUI) return resolve();

      gsap.to([this.canvas, this.zoomUI], {
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: resolve,
      });
    });
  }

  public destroy(): void {
    if (this.grid) {
      this.grid.destroy();
      this.grid = null;
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    if (this.cleanup) {
      this.cleanup();
      this.cleanup = null;
    }

    if (this.canvas) {
      this.canvas.remove();
      this.canvas = null;
    }

    if (this.zoomUI) {
      this.zoomUI.remove();
      this.zoomUI = null;
    }

    const style = document.querySelector('style[data-archive-styles]');
    if (style) style.remove();
  }
}
