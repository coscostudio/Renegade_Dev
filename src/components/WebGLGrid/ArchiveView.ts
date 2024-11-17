import { gsap } from 'gsap';

import { WebGLGrid } from './WebGLGrid';

export class ArchiveView {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement | null = null;
  private grid: WebGLGrid | null = null;
  private images: string[] = [];
  private resizeObserver: ResizeObserver | null = null;

  constructor(container: HTMLElement) {
    this.container = container;

    const imageElements = Array.from(container.querySelectorAll('.cms-image'));
    this.images = imageElements.map((img) => (img as HTMLImageElement).src);

    this.setupStyles();
    this.bindExternalControls();
  }

  private setupStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .archive-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background: #000;
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
    `;

    document.head.appendChild(style);
  }

  private bindExternalControls(): void {
    const zoomInButton = this.container.querySelector('[data-zoom="in"]');
    const zoomOutButton = this.container.querySelector('[data-zoom="out"]');

    if (zoomInButton) {
      zoomInButton.addEventListener('click', () => {
        console.log('Zoom in clicked');
        this.handleZoom(1.2);
      });
    }

    if (zoomOutButton) {
      zoomOutButton.addEventListener('click', () => {
        console.log('Zoom out clicked');
        this.handleZoom(0.8);
      });
    }
  }

  private handleZoom(factor: number): void {
    if (!this.grid || !this.canvas) {
      console.log('Grid or canvas not initialized');
      return;
    }

    const rect = this.canvas.getBoundingClientRect();
    console.log('Zooming with factor:', factor);
    this.grid.setZoom(factor, rect.width / 2, rect.height / 2);
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

      const isMobile = window.innerWidth <= 768;
      this.grid = new WebGLGrid(this.canvas);

      await this.grid.init({
        images: this.images,
        columnCount: isMobile ? 2 : 3,
        rowCount: isMobile ? 3 : 4,
        pixelRatio: window.devicePixelRatio,
      });

      this.resizeObserver = new ResizeObserver(this.debounce(this.handleResize, 150));
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

    gsap.set(this.canvas, { autoAlpha: 0 });
    this.grid.start();

    gsap.to(this.canvas, {
      autoAlpha: 1,
      duration: 1,
      ease: 'expo.out',
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

    const style = document.querySelector('style[data-archive-styles]');
    if (style) style.remove();
  }
}
