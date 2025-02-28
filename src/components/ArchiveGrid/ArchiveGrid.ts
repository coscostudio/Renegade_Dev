import { GridRenderer } from './GridRenderer';
import { InteractionManager } from './InteractionManager';
import { DeviceSettings, GridOptions, Transform } from './types';
import { detectDeviceCapabilities } from './utils';

export class ArchiveGrid {
  private canvas: HTMLCanvasElement;
  private renderer: GridRenderer;
  private interactionManager: InteractionManager;
  private isActive: boolean = false;
  private transform: Transform = { scale: 1, x: 0, y: 0 };
  private deviceSettings: DeviceSettings;
  private animationFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement, options?: Partial<GridOptions>) {
    this.canvas = canvas;

    // Detect device capabilities for optimal performance
    this.deviceSettings = detectDeviceCapabilities();

    // Apply custom pixel ratio if provided
    if (options?.pixelRatio) {
      this.deviceSettings.pixelRatio = options.pixelRatio;
    }

    // Initialize components
    this.renderer = new GridRenderer(canvas, this.deviceSettings);
    this.interactionManager = new InteractionManager(canvas, this.transform, this.deviceSettings);

    // Listen for transform changes
    this.interactionManager.addTransformCallback(this.handleTransformChange);
  }

  // Initialize the grid with images
  public async init(options: GridOptions): Promise<void> {
    try {
      // Set initial transform (centered with appropriate zoom level)
      const { isMobile } = this.deviceSettings;
      const initialScale = isMobile ? 0.8 : 1;

      this.transform = {
        scale: initialScale,
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
      };

      // Apply initial transform
      this.interactionManager.setTransform(this.transform);

      // Set up grid in renderer
      await this.renderer.setupGrid({
        ...options,
        // Ensure we use detected capabilities if not specified
        columnCount: options.columnCount || this.deviceSettings.columnCount,
        rowCount: options.rowCount || this.deviceSettings.rowCount,
      });

      // Initialize visibility
      this.renderer.updateVisibility(this.transform);

      console.log('ArchiveGrid initialized successfully');
    } catch (error) {
      console.error('Failed to initialize ArchiveGrid:', error);
      throw error;
    }
  }

  // Start rendering
  public start(): void {
    if (this.isActive) return;

    this.isActive = true;
    this.interactionManager.setActive(true);
    this.render();

    console.log('ArchiveGrid started');
  }

  // Stop rendering
  public stop(): void {
    this.isActive = false;
    this.interactionManager.setActive(false);

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    console.log('ArchiveGrid stopped');
  }

  // Handle transform changes from interaction manager
  private handleTransformChange = (transform: Transform): void => {
    this.transform = transform;
    this.renderer.updateVisibility(transform);
  };

  // Main render loop
  private render = (): void => {
    if (!this.isActive) return;

    // Update grid visibility based on current transform
    this.renderer.updateVisibility(this.transform);

    // Draw grid
    this.renderer.draw(this.transform);

    // Continue animation loop
    this.animationFrameId = requestAnimationFrame(this.render);
  };

  // Get current transform
  public getTransform(): Transform {
    return { ...this.transform };
  }

  // Set transform (for external control)
  public setTransform(transform: Partial<Transform>): void {
    this.interactionManager.setTransform(transform);
  }

  // Zoom in or out
  public zoom(action: 'in' | 'out'): void {
    const factor = action === 'in' ? 1.5 : 0.67;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    this.interactionManager.zoom(factor, centerX, centerY);
  }

  // Handle resize
  public resize(width: number, height: number): void {
    if (!width || !height) return;

    // Resize the canvas and update the renderer
    this.canvas.width = width * this.deviceSettings.pixelRatio;
    this.canvas.height = height * this.deviceSettings.pixelRatio;

    // Update renderer
    this.renderer.resize(width, height);

    // Update visibility with new dimensions
    this.renderer.updateVisibility(this.transform);
  }

  // Clean up resources
  public destroy(): void {
    this.stop();
    this.interactionManager.destroy();
    this.renderer.destroy();

    console.log('ArchiveGrid destroyed');
  }
}
