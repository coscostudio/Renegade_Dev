import { DeviceSettings, Transform } from './types';
import { lerp } from './utils';

export class InteractionManager {
  private canvas: HTMLCanvasElement;
  private transform: Transform;
  private deviceSettings: DeviceSettings;
  private isDragging: boolean = false;
  private lastMouseX: number = 0;
  private lastMouseY: number = 0;
  private lastTouchX: number = 0;
  private lastTouchY: number = 0;
  private velocity: { x: number; y: number } = { x: 0, y: 0 };
  private targetTransform: Transform;
  private animationId: number | null = null;
  private isZooming: boolean = false;
  private zoomFactor: number = 1;
  private minScale: number = 0.5;
  private maxScale: number = 5;
  private transformCallbacks: ((transform: Transform) => void)[] = [];
  private isActive: boolean = true;

  constructor(canvas: HTMLCanvasElement, transform: Transform, deviceSettings: DeviceSettings) {
    this.canvas = canvas;
    this.transform = { ...transform };
    this.targetTransform = { ...transform };
    this.deviceSettings = deviceSettings;
    this.bindEvents();
  }

  // Bind interaction events (mouse/touch for dragging only)
  private bindEvents(): void {
    // Mouse events for dragging
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    // Touch events for dragging (no pinch zoom)
    this.canvas.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    window.addEventListener('touchend', this.handleTouchEnd);
    window.addEventListener('touchcancel', this.handleTouchEnd);

    // Start animation loop
    this.startAnimationLoop();
  }

  // Handle mouse down events
  private handleMouseDown = (e: MouseEvent): void => {
    if (!this.isActive) return;

    // Prevent default to avoid text selection
    e.preventDefault();

    this.isDragging = true;
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;

    // Reset velocity when starting a new drag
    this.velocity = { x: 0, y: 0 };

    // Update cursor
    this.canvas.style.cursor = 'grabbing';
  };

  // Handle mouse move events
  private handleMouseMove = (e: MouseEvent): void => {
    if (!this.isActive || !this.isDragging) return;

    // Calculate deltas
    const deltaX = e.clientX - this.lastMouseX;
    const deltaY = e.clientY - this.lastMouseY;

    // Scale by device settings (to account for drag sensitivity)
    const scaledDeltaX = deltaX * this.deviceSettings.dragMultiplier;
    const scaledDeltaY = deltaY * this.deviceSettings.dragMultiplier;

    // Apply drag
    this.handleDrag(scaledDeltaX, scaledDeltaY);

    // Track last position for next frame
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
  };

  // Handle mouse up events
  private handleMouseUp = (): void => {
    if (!this.isActive) return;

    this.isDragging = false;

    // Reset cursor
    this.canvas.style.cursor = 'grab';
  };

  // Handle touch start events
  private handleTouchStart = (e: TouchEvent): void => {
    if (!this.isActive) return;

    // Prevent default to avoid page scrolling
    e.preventDefault();

    if (e.touches.length === 1) {
      // Single touch = drag
      this.isDragging = true;

      this.lastTouchX = e.touches[0].clientX;
      this.lastTouchY = e.touches[0].clientY;

      // Reset velocity
      this.velocity = { x: 0, y: 0 };
    }
  };

  // Handle touch move events
  private handleTouchMove = (e: TouchEvent): void => {
    if (!this.isActive) return;

    // Prevent default to avoid page scrolling
    e.preventDefault();

    if (e.touches.length === 1 && this.isDragging) {
      // Single touch drag
      const deltaX = e.touches[0].clientX - this.lastTouchX;
      const deltaY = e.touches[0].clientY - this.lastTouchY;

      // Scale by device settings
      const scaledDeltaX = deltaX * this.deviceSettings.dragMultiplier;
      const scaledDeltaY = deltaY * this.deviceSettings.dragMultiplier;

      // Apply drag
      this.handleDrag(scaledDeltaX, scaledDeltaY);

      // Track last position
      this.lastTouchX = e.touches[0].clientX;
      this.lastTouchY = e.touches[0].clientY;
    }
  };

  // Handle touch end events
  private handleTouchEnd = (): void => {
    if (!this.isActive) return;

    // End all touch interactions
    this.isDragging = false;
  };

  // Handle dragging logic
  private handleDrag(deltaX: number, deltaY: number): void {
    // Update target position
    this.targetTransform.x += deltaX;
    this.targetTransform.y += deltaY;

    // Update velocity for momentum effect
    this.velocity = {
      x: deltaX * 0.8, // Reduce intensity a bit
      y: deltaY * 0.8,
    };
  }

  // Button-based zoom handling
  public zoom(factor: number, originX: number, originY: number): void {
    // Calculate new scale
    const newScale = Math.max(
      this.minScale,
      Math.min(this.maxScale, this.transform.scale * factor)
    );

    // Get canvas rect
    const rect = this.canvas.getBoundingClientRect();

    // Convert origin to canvas coordinates (using center if not provided)
    const canvasX = originX !== undefined ? originX - rect.left : rect.width / 2;
    const canvasY = originY !== undefined ? originY - rect.top : rect.height / 2;

    // Calculate the point in world space before scaling
    const worldX = (canvasX - this.transform.x) / this.transform.scale;
    const worldY = (canvasY - this.transform.y) / this.transform.scale;

    // Calculate the new position to keep the point under the pointer
    const newX = canvasX - worldX * newScale;
    const newY = canvasY - worldY * newScale;

    // Set flag for animation handling
    this.isZooming = true;

    // Update target transform with easing
    this.targetTransform.scale = newScale;
    this.targetTransform.x = newX;
    this.targetTransform.y = newY;

    // Reset this flag after a short delay
    setTimeout(() => {
      this.isZooming = false;
    }, 500);
  }

  // Update position based on momentum
  public update(): Transform {
    if (!this.isActive) return this.transform;

    // Apply momentum when not dragging
    if (!this.isDragging && !this.isZooming) {
      // Apply friction to velocity
      this.velocity.x *= 0.95;
      this.velocity.y *= 0.95;

      // Apply velocity to target position if significant
      if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
        this.targetTransform.x += this.velocity.x;
        this.targetTransform.y += this.velocity.y;
      } else {
        // Reset velocity when it gets too small
        this.velocity.x = 0;
        this.velocity.y = 0;
      }
    }

    // Smooth transition to target transform
    this.transform.x = lerp(this.transform.x, this.targetTransform.x, 0.2);
    this.transform.y = lerp(this.transform.y, this.targetTransform.y, 0.2);
    this.transform.scale = lerp(this.transform.scale, this.targetTransform.scale, 0.2);

    // Notify callbacks
    this.notifyTransformChanged();

    return this.transform;
  }

  // Handle animation frame updates
  private startAnimationLoop(): void {
    // Function to update on each animation frame
    const updateLoop = () => {
      if (this.isActive) {
        this.update();
        this.animationId = requestAnimationFrame(updateLoop);
      }
    };

    // Start the animation loop
    this.animationId = requestAnimationFrame(updateLoop);
  }

  // Add callback for transform changes
  public addTransformCallback(callback: (transform: Transform) => void): void {
    this.transformCallbacks.push(callback);
  }

  // Notify all transform callbacks
  private notifyTransformChanged(): void {
    for (const callback of this.transformCallbacks) {
      callback({ ...this.transform });
    }
  }

  // Set a specific transform
  public setTransform(transform: Partial<Transform>): void {
    if (transform.x !== undefined) this.targetTransform.x = transform.x;
    if (transform.y !== undefined) this.targetTransform.y = transform.y;
    if (transform.scale !== undefined) this.targetTransform.scale = transform.scale;
  }

  // Get current transform
  public getTransform(): Transform {
    return { ...this.transform };
  }

  // Reset transform to initial state
  public resetTransform(): void {
    this.targetTransform = {
      x: 0,
      y: 0,
      scale: 1,
    };

    this.velocity = { x: 0, y: 0 };
  }

  // Set active state
  public setActive(active: boolean): void {
    this.isActive = active;

    if (active && !this.animationId) {
      this.startAnimationLoop();
    }
  }

  // Clean up
  public destroy(): void {
    // Stop animation loop
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // Remove event listeners
    this.canvas.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    this.canvas.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('touchcancel', this.handleTouchEnd);

    // Clear callbacks
    this.transformCallbacks = [];

    // Mark as inactive
    this.isActive = false;
  }
}
