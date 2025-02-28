import { GridRenderer } from './GridRenderer';
import { InteractionManager } from './InteractionManager';
import { detectDeviceCapabilities } from './utils';

export class ArchiveGrid {
  private canvas: HTMLCanvasElement;
  private renderer: GridRenderer;
  private interactionManager: InteractionManager;
  private isActive: boolean = false;
  private transform: Transform = { scale: 1, x: 0, y: 0 };
  private deviceSettings: DeviceSettings;

  constructor(canvas: HTMLCanvasElement, images: ImageData[]) {
    this.canvas = canvas;
    this.deviceSettings = detectDeviceCapabilities();

    // Initialize components
    this.renderer = new GridRenderer(canvas, this.deviceSettings);
    this.interactionManager = new InteractionManager(canvas, this.transform, this.deviceSettings);

    // Setup initial state
    this.setupGrid(images);
  }

  // Initialize the grid with images
  private setupGrid(images: ImageData[]): void {
    // Implementation here
  }

  // Start rendering
  start(): void {
    this.isActive = true;
    this.render();
  }

  // Main render loop
  private render(): void {
    if (!this.isActive) return;

    // Update positions and state
    this.interactionManager.update();

    // Update visibility based on current transform
    this.renderer.updateVisibility(this.transform);

    // Draw to canvas
    this.renderer.draw(this.transform);

    // Continue loop
    requestAnimationFrame(() => this.render());
  }

  // Clean up resources
  destroy(): void {
    this.isActive = false;
    this.interactionManager.destroy();
    this.renderer.destroy();
  }
}
