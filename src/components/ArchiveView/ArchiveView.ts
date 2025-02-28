import { gsap } from 'gsap';

import { ArchiveGrid } from './ArchiveGrid';
import { GridOptions } from './types';

interface S3Config {
  bucketUrl: string;
  prefix?: string;
}

export class ArchiveView {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement | null = null;
  private grid: ArchiveGrid | null = null;
  private images: string[] = [];
  private resizeObserver: ResizeObserver | null = null;
  private zoomUI: HTMLElement | null = null;
  private isTransitioning = false;
  private cleanup: (() => void) | null = null;
  private s3Config: S3Config;
  private loadingElement: HTMLElement | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    console.log('ArchiveView initialized with container:', container);

    // Find the CMS image element to extract configuration
    const firstImage = container.querySelector('.cms-image') as HTMLImageElement;
    if (!firstImage) {
      console.error(
        'No .cms-image elements found in container. Container HTML:',
        container.innerHTML
      );
      return;
    }

    // Store configuration data for later use
    this.s3Config = {
      bucketUrl: firstImage.dataset.s3Bucket || '',
      prefix: firstImage.dataset.s3Prefix || '',
    };

    // Set up basic styling and UI immediately
    this.setupStyles();
    this.setupViewportDetection();
    this.createZoomUI();
    this.createLoadingIndicator();

    // Start with everything hidden until initialization is complete
    gsap.set(container, { autoAlpha: 0 });

    console.log('Stored S3 config:', this.s3Config);
  }

  private setupViewportDetection(): void {
    // Add viewport unit support detection
    const viewportUnitsSupported = CSS.supports('height', '100svh');
    document.documentElement.dataset.viewportUnits = viewportUnitsSupported ? 'svh' : 'vh';

    // Set up fallback for browsers without SVH support
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

      // Store cleanup function for later
      this.cleanup = () => {
        window.removeEventListener('resize', updateVh);
        window.removeEventListener('orientationchange', updateVh);
      };
    }
  }

  private setupStyles(): void {
    // Add required CSS styles for the archive container and UI
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
        background: #0f0f0f;
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

      /* Loading indicator */
      .archive-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ffffff;
        font-size: 1rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      .archive-loading-spinner {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-top-color: #ffffff;
        animation: archive-spinner 0.8s linear infinite;
        margin-bottom: 1rem;
      }

      @keyframes archive-spinner {
        to {
          transform: rotate(360deg);
        }
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
      }
    `;

    document.head.appendChild(style);
  }

  private createZoomUI(): void {
    // Create zoom controls UI
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

    // Set up event listeners
    zoomOutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleZoom('out');
    });

    zoomInBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleZoom('in');
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

  private createLoadingIndicator(): void {
    this.loadingElement = document.createElement('div');
    this.loadingElement.className = 'archive-loading';

    const spinner = document.createElement('div');
    spinner.className = 'archive-loading-spinner';

    const text = document.createElement('div');
    text.textContent = 'Loading images...';

    this.loadingElement.appendChild(spinner);
    this.loadingElement.appendChild(text);

    // Hide initially
    gsap.set(this.loadingElement, { autoAlpha: 0 });
  }

  private handleZoom(action: 'in' | 'out'): void {
    if (!this.grid) return;

    // Forward zoom action to grid implementation
    this.grid.zoom(action);
  }

  public async init(): Promise<void> {
    try {
      console.log('ArchiveView init started');
      this.isTransitioning = true;

      if (!this.s3Config.bucketUrl) {
        throw new Error('No S3 bucket URL provided');
      }

      // Add loading indicator
      await this.initializeContainer();

      if (this.loadingElement && this.canvas && this.canvas.parentElement) {
        this.canvas.parentElement.appendChild(this.loadingElement);
        gsap.to(this.loadingElement, { autoAlpha: 1, duration: 0.3 });
      }

      // Load images first
      console.log('Loading images from S3...');
      this.images = await this.loadImagesFromS3();
      console.log('Loaded URLs:', this.images.length);

      // Create grid with the new implementation
      console.log('Initializing grid with image count:', this.images.length);

      // Get device pixel ratio but cap it for performance reasons
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      // Check if mobile device
      const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;

      // Set up grid options
      const gridOptions: GridOptions = {
        images: this.images,
        pixelRatio,
        columnCount: isMobile ? 4 : 6,
        rowCount: isMobile ? 4 : 6,
      };

      // Initialize our new ArchiveGrid implementation
      if (this.canvas) {
        this.grid = new ArchiveGrid(this.canvas);

        // Set up resize handling
        console.log('Setting up resize observer');
        this.setupResizeObserver();

        // Initialize the grid
        await this.grid.init(gridOptions);
      }

      // Hide loading indicator
      if (this.loadingElement) {
        gsap.to(this.loadingElement, {
          autoAlpha: 0,
          duration: 0.3,
          onComplete: () => {
            this.loadingElement?.remove();
          },
        });
      }

      this.isTransitioning = false;
      console.log('ArchiveView init completed');
    } catch (error) {
      console.error('Failed to initialize archive view:', error);

      // Hide loading indicator on error
      if (this.loadingElement) {
        this.loadingElement.innerHTML = `
          <div>Error loading images</div>
          <div style="font-size: 0.875rem; opacity: 0.7; margin-top: 0.5rem;">Please try refreshing the page</div>
        `;

        gsap.to(this.loadingElement, {
          autoAlpha: 0,
          duration: 0.3,
          delay: 3,
          onComplete: () => {
            this.loadingElement?.remove();
          },
        });
      }

      throw error;
    }
  }

  private async loadImagesFromS3(): Promise<string[]> {
    try {
      const prefix = this.s3Config.prefix
        ? this.s3Config.prefix.endsWith('/')
          ? this.s3Config.prefix
          : `${this.s3Config.prefix}/`
        : '';

      console.log('Using prefix:', prefix);

      const baseUrl = this.s3Config.bucketUrl.endsWith('/')
        ? this.s3Config.bucketUrl.slice(0, -1)
        : this.s3Config.bucketUrl;

      console.log('Using base URL:', baseUrl);

      const listUrl = `${baseUrl}?list-type=2&prefix=${prefix}&delimiter=/`;
      console.log('Fetching image list from:', listUrl);

      const response = await fetch(listUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: '*/*',
        },
      });

      console.log('S3 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      const contents = xmlDoc.getElementsByTagName('Contents');
      console.log('Found Contents nodes:', contents.length);

      const keys = Array.from(contents)
        .map((content) => content.getElementsByTagName('Key')[0]?.textContent)
        .filter((key) => key && /\.(jpg|jpeg|png|webp)$/i.test(key))
        .filter(Boolean);

      console.log('Found image keys:', keys.length);

      const urls = keys.map((key) => `${baseUrl}/${key}`);

      // In mobile environments, limit the number of images to avoid memory issues
      const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
      const maxImages = isMobile ? 50 : 100;

      // Randomize the array and take a subset to ensure variety
      const shuffledUrls = this.shuffleArray(urls).slice(0, maxImages);

      console.log(`Using ${shuffledUrls.length} images (limited from ${urls.length})`);

      return shuffledUrls;
    } catch (error) {
      console.error('Failed to load images from S3:', error);
      return [];
    }
  }

  // Fisher-Yates shuffle algorithm for randomizing the image array
  private shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  private async initializeContainer(): Promise<void> {
    // Create or find archive container
    let archiveContainer = this.container.querySelector('.archive-container');
    if (!archiveContainer) {
      archiveContainer = document.createElement('div');
      archiveContainer.className = 'archive-container';
      this.container.appendChild(archiveContainer);
    }

    // Create canvas if it doesn't exist
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'archive-canvas';
      archiveContainer.appendChild(this.canvas);
    }
  }

  private setupResizeObserver(): void {
    if (!this.canvas) return;

    // Create resize observer with debounced handler
    this.resizeObserver = new ResizeObserver(
      this.debounce(() => {
        this.handleResize();
      }, 150)
    );

    this.resizeObserver.observe(this.canvas);
  }

  private handleResize = (): void => {
    if (!this.canvas || !this.grid) return;

    // Get actual dimensions and tell grid to resize
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
    console.log('Show method called', {
      hasCanvas: !!this.canvas,
      hasGrid: !!this.grid,
      zoomUI: !!this.zoomUI,
    });

    if (!this.canvas || !this.grid) {
      console.error('Show called but canvas or grid is missing');
      return;
    }

    // Ensure everything starts hidden
    gsap.set([this.canvas, this.zoomUI], {
      autoAlpha: 0,
      visibility: 'visible', // Set visibility here to prevent layout shifts
    });

    // Start the grid
    this.grid.start();

    // Create master timeline for smooth fade in
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power2.inOut',
      },
      onComplete: () => console.log('Show animation completed'),
    });

    // Fade in both elements together
    tl.to([this.canvas, this.zoomUI], {
      autoAlpha: 1,
      stagger: 0.1,
    });
  }

  public async fadeOut(): Promise<void> {
    // Create a timeline for coordinated fade out
    return new Promise((resolve) => {
      if (!this.canvas && !this.zoomUI) return resolve();

      const tl = gsap.timeline({
        onComplete: resolve,
      });

      // Fade out both elements with same timing as page transition
      tl.to([this.canvas, this.zoomUI], {
        autoAlpha: 0,
        duration: 1.5, // Match the page transition duration
        ease: 'expo.inOut', // Match the page transition ease
      });
    });
  }

  public destroy(): void {
    // Clean up grid
    if (this.grid) {
      this.grid.destroy();
      this.grid = null;
    }

    // Clean up resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    // Clean up event listeners
    if (this.cleanup) {
      this.cleanup();
      this.cleanup = null;
    }

    // Remove elements
    if (this.canvas) {
      this.canvas.remove();
      this.canvas = null;
    }

    if (this.zoomUI) {
      this.zoomUI.remove();
      this.zoomUI = null;
    }

    if (this.loadingElement) {
      this.loadingElement.remove();
      this.loadingElement = null;
    }

    // Remove styles
    const style = document.querySelector('style[data-archive-styles]');
    if (style) style.remove();
  }
}
