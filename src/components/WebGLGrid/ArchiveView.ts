import { gsap } from 'gsap';

import { WebGLGrid } from './WebGLGrid';

export class ArchiveView {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement | null = null;
  private grid: WebGLGrid | null = null;
  private images: string[] = [];
  private resizeObserver: ResizeObserver | null = null;
  private zoomUI: HTMLElement | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    const imageElements = Array.from(container.querySelectorAll('.cms-image'));
    this.images = imageElements.map((img) => (img as HTMLImageElement).src);

    this.setupStyles();
    this.createZoomUI();
  }

  private createZoomUI(): void {
    const archiveContainer = this.container.querySelector('.archive-container');
    if (!archiveContainer) return;

    this.zoomUI = document.createElement('div');
    this.zoomUI.className = 'archive-zoom';

    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.className = 'zoom-button';
    zoomOutBtn.setAttribute('data-zoom', 'out');
    zoomOutBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
        <path d="M1 9H17" stroke="currentColor" stroke-width="1.62" stroke-linecap="square" stroke-linejoin="round"/>
      </svg>
    `;

    const zoomInBtn = document.createElement('button');
    zoomInBtn.className = 'zoom-button';
    zoomInBtn.setAttribute('data-zoom', 'in');
    zoomInBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
        <path d="M8.99994 1.43945V16.5595M1.43994 8.99945H16.5599" stroke="currentColor" stroke-width="1.62" stroke-linecap="square" stroke-linejoin="round"/>
      </svg>
    `;

    this.zoomUI.appendChild(zoomOutBtn);
    this.zoomUI.appendChild(zoomInBtn);
    archiveContainer.appendChild(this.zoomUI); // Append to archiveContainer instead of container

    zoomOutBtn.addEventListener('click', () => this.handleZoom(0.8));
    zoomInBtn.addEventListener('click', () => this.handleZoom(1.2));
  }

  private setupStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .archive-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100dvh; /* Use dynamic viewport height */
        overflow: hidden;
        background: #000;
        display: flex; /* Add flex to help with positioning */
        flex-direction: column;
      }
  
      .archive-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
        display: block;
        cursor: grab;
      }
  
      .archive-canvas:active {
        cursor: grabbing;
      }
  
      .archive-zoom {
        position: absolute; /* Changed to absolute */
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        bottom: 2rem;
        display: flex;
        gap: 0.5rem;
      }
  
      .zoom-button {
        width: 2.5rem;
        height: 2.5rem;
        padding: 0.5rem;
        background-color: #424242;
        cursor: pointer;
        transition: background-color 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        border: none;
      }
  
      @media (max-width: 1024px) {
        .zoom-button {
          width: 2.75rem;
          height: 2.75rem;
        }
      }
  
      @media (max-width: 768px) {
        .zoom-button {
          width: 3rem;
          height: 3rem;
        }
        .archive-zoom {
          bottom: max(2rem, 5vh);
        }
      }
  
      @media (max-width: 479px) {
        .zoom-button {
          width: 3.25rem;
          height: 3.25rem;
        }
      }
    `;

    document.head.appendChild(style);
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

  private updateZoomPosition(): void {
    if (!this.zoomUI) return;

    const viewportHeight = window.innerHeight;
    const bottomPadding = Math.max(32, viewportHeight * 0.05);
    const safeAreaInset = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0'
    );

    gsap.set(this.zoomUI, {
      bottom: bottomPadding + safeAreaInset,
      left: '50%',
      xPercent: -50,
      position: 'fixed',
      zIndex: 100,
    });
  }

  public async init(): Promise<void> {
    try {
      let archiveContainer = this.container.querySelector('.archive-container');
      if (!archiveContainer) {
        archiveContainer = document.createElement('div');
        archiveContainer.className = 'archive-container';
        this.container.appendChild(archiveContainer);
      }

      this.canvas = document.createElement('canvas');
      this.canvas.className = 'archive-canvas';
      archiveContainer.appendChild(this.canvas);

      // Create zoom UI after container is ready
      this.createZoomUI();

      const isMobile = window.innerWidth <= 768;
      this.grid = new WebGLGrid(this.canvas);

      await this.grid.init({
        images: this.images,
        columnCount: isMobile ? 2 : 3,
        rowCount: isMobile ? 3 : 4,
        pixelRatio: window.devicePixelRatio,
      });

      this.resizeObserver = new ResizeObserver(this.debounce(this.handleResize.bind(this), 150));
      this.resizeObserver.observe(this.canvas);
    } catch (error) {
      console.error('Failed to initialize grid:', error);
      throw error;
    }
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

    gsap.set([this.canvas, this.zoomUI], { autoAlpha: 0 });
    this.grid.start();

    gsap.to([this.canvas, this.zoomUI], {
      autoAlpha: 1,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.2,
    });
  }

  public fadeOut(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.canvas && !this.zoomUI) return resolve();

      gsap.to([this.canvas, this.zoomUI], {
        autoAlpha: 0,
        duration: 0.5,
        ease: 'expo.out',
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
