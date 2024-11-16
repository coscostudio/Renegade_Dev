import { gsap } from 'gsap';

import { WebGLGrid } from './WebGLGrid';

export class ArchiveView {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private grid: WebGLGrid | null = null;
  private images: string[] = [];

  constructor(container: HTMLElement) {
    this.container = container;
    this.canvas = this.container.querySelector('#archive-canvas');

    // Get all CMS images
    const imageElements = Array.from(this.container.querySelectorAll('.cms-image'));
    this.images = imageElements.map((img) => (img as HTMLImageElement).src);

    console.log('Found images:', this.images.length);

    if (this.images.length === 0) {
      console.warn('No images found in CMS collection');
    }
  }

  async init(): Promise<void> {
    if (!this.canvas || this.images.length === 0) {
      console.error('Missing canvas or images');
      return;
    }

    try {
      // Wait for grid to initialize
      this.grid = await WebGLGrid.create(this.canvas, {
        images: this.images,
        pixelRatio: window.devicePixelRatio > 1 ? 2 : 1,
        columnCount: window.innerWidth <= 768 ? 3 : 5,
        rowCount: window.innerWidth <= 768 ? 4 : 6,
      });

      // Bind zoom controls
      const zoomInBtn = this.container.querySelector('[data-action="zoom-in"]');
      const zoomOutBtn = this.container.querySelector('[data-action="zoom-out"]');

      if (zoomInBtn && this.grid) {
        zoomInBtn.addEventListener('click', () => this.grid.zoom('in'));
      }
      if (zoomOutBtn && this.grid) {
        zoomOutBtn.addEventListener('click', () => this.grid.zoom('out'));
      }

      this.bindEvents();
    } catch (error) {
      console.error('Error initializing grid:', error);
      throw error;
    }
  }

  public show(): void {
    if (this.canvas) {
      gsap.set(this.canvas, { autoAlpha: 0 });
      gsap.to(this.canvas, {
        autoAlpha: 1,
        duration: 1,
        ease: 'expo.inOut',
        onComplete: () => {
          if (this.grid) this.grid.start();
        },
      });
    }
  }

  public hide(): void {
    if (this.canvas && this.grid) {
      gsap.to(this.canvas, {
        autoAlpha: 0,
        duration: 1,
        ease: 'expo.inOut',
        onComplete: () => this.grid?.pause(),
      });
    }
  }

  public destroy(): void {
    if (this.grid) {
      this.grid.destroy();
      this.grid = null;
    }
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
}
