import { gsap } from 'gsap';

import {
  BoundEvents,
  GridDimensions,
  GridItem,
  GridOptions,
  ImageInfo,
  WebGLBuffers,
  WebGLLocations,
} from './types';

export class WebGLGrid {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private images: ImageInfo[] = [];
  private textures: Map<string, WebGLTexture> = new Map();
  private gridItems: GridItem[] = [];
  private dimensions: GridDimensions;
  private locations: WebGLLocations;
  private buffers: WebGLBuffers;

  private isInitialized = false;
  private isActive = false;
  private isDragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;
  private lastTouchX = 0;
  private lastTouchY = 0;
  private momentum = { x: 0, y: 0 };
  private viewportCenter = { x: 0, y: 0 };
  private maxScale = 18;
  private minScale = 0.7;
  private maxImageWidth = 0.6;
  private boundEvents: BoundEvents;

  private viewTransform = {
    scale: 1,
    x: 0,
    y: 0,
  };

  // Add these properties to the WebGLGrid class
  private getResponsiveZoomLevels(): number[] {
    const { width: screenWidth } = this.gl.canvas.getBoundingClientRect();

    // Define breakpoints
    const isMobile = screenWidth <= 768;
    const isTablet = screenWidth > 768 && screenWidth <= 1024;

    if (isMobile) {
      return [1, 1.5, 3, 6, 10, 14, 18]; // Mobile zoom levels
    }
    if (isTablet) {
      return [0.7, 1.25, 2.5, 5, 8, 12]; // Tablet zoom levels
    }
    return [0.7, 1, 3, 6, 8]; // Desktop zoom levels
  }

  private getResponsiveMaxScale(): number {
    const zoomLevels = this.getResponsiveZoomLevels();
    return zoomLevels[zoomLevels.length - 1];
  }

  private getNextZoomLevel(factor: number): number {
    const zoomLevels = this.getResponsiveZoomLevels();
    const currentScale = this.viewTransform.scale;

    if (factor > 1) {
      // Zooming in
      for (const level of zoomLevels) {
        if (level > currentScale + 0.1) {
          return level;
        }
      }
      return zoomLevels[zoomLevels.length - 1]; // Return max level if no higher level found
    } // Zooming out
    for (let i = zoomLevels.length - 1; i >= 0; i--) {
      if (zoomLevels[i] < currentScale - 0.1) {
        return zoomLevels[i];
      }
    }
    return zoomLevels[0]; // Return min level if no lower level found
  }

  private vertexShader = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    uniform mat4 u_matrix;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = u_matrix * a_position;
      v_texCoord = a_texCoord;
    }
  `;

  private fragmentShader = `
    precision mediump float;
    uniform sampler2D u_texture;
    uniform float u_opacity;
    varying vec2 v_texCoord;
    void main() {
      vec4 texColor = texture2D(u_texture, v_texCoord);
      gl_FragColor = vec4(texColor.rgb, texColor.a * u_opacity);
    }
  `;

  constructor(canvas: HTMLCanvasElement) {
    this.updateCanvasSize(canvas);

    this.gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });

    if (!this.gl) {
      throw new Error('WebGL not supported');
    }

    this.setupWebGL();
    this.bindEvents(canvas);
    this.updateViewportCenter();
  }

  private updateCanvasSize(canvas: HTMLCanvasElement): void {
    const pixelRatio = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();

    canvas.style.width = '100%';
    canvas.style.height = '100%';

    canvas.width = rect.width * pixelRatio;
    canvas.height = rect.height * pixelRatio;
  }

  private updateViewportCenter(): void {
    const { width, height } = this.gl.canvas;
    this.viewportCenter = {
      x: width / 2,
      y: height / 2,
    };
  }

  private setupWebGL(): void {
    const { gl } = this;

    const vertShader = this.createShader(this.vertexShader, gl.VERTEX_SHADER);
    const fragShader = this.createShader(this.fragmentShader, gl.FRAGMENT_SHADER);
    this.program = this.createProgram(vertShader, fragShader);

    this.locations = {
      position: gl.getAttribLocation(this.program, 'a_position'),
      texCoord: gl.getAttribLocation(this.program, 'a_texCoord'),
      matrix: gl.getUniformLocation(this.program, 'u_matrix'),
      texture: gl.getUniformLocation(this.program, 'u_texture'),
      opacity: gl.getUniformLocation(this.program, 'u_opacity'),
    };

    this.buffers = {
      position: gl.createBuffer(),
      texCoord: gl.createBuffer(),
    };

    const positions = new Float32Array([0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1]);
    const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texCoord);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  private createShader(source: string, type: number): WebGLShader {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      throw new Error(`Shader compile error: ${this.gl.getShaderInfoLog(shader)}`);
    }

    return shader;
  }

  private createProgram(vertShader: WebGLShader, fragShader: WebGLShader): WebGLProgram {
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertShader);
    this.gl.attachShader(program, fragShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      throw new Error(`Program link error: ${this.gl.getProgramInfoLog(program)}`);
    }

    return program;
  }

  private bindEvents(canvas: HTMLCanvasElement): void {
    const boundMouseDown = this.handleMouseDown.bind(this);
    const boundMouseMove = this.handleMouseMove.bind(this);
    const boundMouseUp = this.handleMouseUp.bind(this);
    const boundTouchStart = this.handleTouchStart.bind(this);
    const boundTouchMove = this.handleTouchMove.bind(this);
    const boundTouchEnd = this.handleTouchEnd.bind(this);

    canvas.addEventListener('mousedown', boundMouseDown);
    window.addEventListener('mousemove', boundMouseMove);
    window.addEventListener('mouseup', boundMouseUp);

    canvas.addEventListener('touchstart', boundTouchStart, { passive: false });
    window.addEventListener('touchmove', boundTouchMove, { passive: false });
    window.addEventListener('touchend', boundTouchEnd);

    // Store bound functions for cleanup
    this.boundEvents = {
      mouseDown: boundMouseDown,
      mouseMove: boundMouseMove,
      mouseUp: boundMouseUp,
      touchStart: boundTouchStart,
      touchMove: boundTouchMove,
      touchEnd: boundTouchEnd,
    };

    // Prevent default scroll behavior
    canvas.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
  }

  private handleMouseDown(e: MouseEvent): void {
    this.isDragging = true;
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    this.momentum = { x: 0, y: 0 };

    const canvas = e.target as HTMLCanvasElement;
    canvas.style.cursor = 'grabbing';
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.isDragging) return;

    const deltaX = e.clientX - this.lastMouseX;
    const deltaY = e.clientY - this.lastMouseY;

    this.handleDrag(deltaX, deltaY);

    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
  }

  private handleMouseUp(): void {
    this.isDragging = false;
    const canvas = this.gl.canvas as HTMLCanvasElement;
    canvas.style.cursor = 'grab';
  }

  private handleTouchStart(e: TouchEvent): void {
    e.preventDefault();
    if (e.touches.length === 1) {
      this.isDragging = true;
      this.lastTouchX = e.touches[0].clientX;
      this.lastTouchY = e.touches[0].clientY;
      this.momentum = { x: 0, y: 0 };
    }
  }

  private handleTouchMove(e: TouchEvent): void {
    e.preventDefault();
    if (!this.isDragging || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - this.lastTouchX;
    const deltaY = e.touches[0].clientY - this.lastTouchY;

    this.handleDrag(deltaX, deltaY);

    this.lastTouchX = e.touches[0].clientX;
    this.lastTouchY = e.touches[0].clientY;
  }

  private handleTouchEnd(): void {
    this.isDragging = false;
  }

  private handleDrag(deltaX: number, deltaY: number): void {
    // Simple position update without grid alignment
    this.viewTransform.x += deltaX;
    this.viewTransform.y += deltaY;

    this.momentum = {
      x: deltaX,
      y: deltaY,
    };

    this.updateGridPositions();
  }

  private async loadImages(imageUrls: string[]): Promise<void> {
    const loadPromises = imageUrls.map((url) => {
      return new Promise<ImageInfo>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const texture = this.createTexture(img);
          this.textures.set(url, texture);
          resolve({
            url,
            element: img,
            width: img.naturalWidth,
            height: img.naturalHeight,
            color: '#000000',
          });
        };
        img.onerror = reject;
        img.src = url;
      });
    });

    this.images = await Promise.all(loadPromises);
  }

  private createTexture(image: HTMLImageElement): WebGLTexture {
    const { gl } = this;
    const texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    return texture;
  }

  private calculateImageDimensions(
    image: ImageInfo,
    containerWidth: number,
    containerHeight: number
  ): { width: number; height: number; offsetY: number } {
    const imageAspect = image.width / image.height;
    const containerAspect = containerWidth / containerHeight;
    const maxWidth = containerWidth * this.maxImageWidth;

    let width: number;
    let height: number;

    if (imageAspect > containerAspect) {
      width = Math.min(containerWidth, maxWidth);
      height = width / imageAspect;
    } else {
      height = containerHeight;
      width = Math.min(height * imageAspect, maxWidth);
    }

    const offsetY = 0;

    return { width, height, offsetY };
  }

  private calculateGridDimensions(options: GridOptions): void {
    const { width: canvasWidth, height: canvasHeight } = this.gl.canvas;
    const maxItemWidth = canvasWidth * this.maxImageWidth;

    const itemWidth = Math.min(maxItemWidth, canvasWidth / (options.columnCount + 1));
    const itemHeight = itemWidth * 0.75;
    const padding = itemWidth * 0.6;

    const minColumns = Math.ceil(canvasWidth / (itemWidth + padding)) + 8;
    const minRows = Math.ceil(canvasHeight / (itemHeight + padding)) + 8;

    this.dimensions = {
      itemWidth,
      itemHeight,
      padding,
      columnCount: Math.max(options.columnCount, minColumns),
      rowCount: Math.max(options.rowCount, minRows),
      totalWidth: Math.max(options.columnCount, minColumns) * (itemWidth + padding),
      totalHeight: Math.max(options.rowCount, minRows) * (itemHeight + padding),
    };
  }

  private setupGrid(options: GridOptions): void {
    this.calculateGridDimensions(options);

    this.gridItems = [];
    let index = 0;

    // Center the grid on (0,0) in world space
    const startCol = Math.floor(-this.dimensions.columnCount / 2);
    const startRow = Math.floor(-this.dimensions.rowCount / 2);

    const cellWidth = this.dimensions.itemWidth + this.dimensions.padding;
    const cellHeight = this.dimensions.itemHeight + this.dimensions.padding;

    for (let row = startRow; row <= startRow + this.dimensions.rowCount; row++) {
      for (let col = startCol; col <= startCol + this.dimensions.columnCount; col++) {
        const imageIndex = index % this.images.length;
        this.gridItems.push({
          x: col * cellWidth,
          y: row * cellHeight,
          width: this.dimensions.itemWidth,
          height: this.dimensions.itemHeight,
          imageIndex: Math.abs(imageIndex),
          opacity: 1,
          velocity: { x: 0, y: 0 },
        });
        index++;
      }
    }

    // Initialize view transform to center
    const { width: canvasWidth, height: canvasHeight } = this.gl.canvas;
    this.viewTransform = {
      scale: 1,
      x: canvasWidth / 2,
      y: canvasHeight / 2,
    };
  }

  private updateGridPositions(): void {
    const { width: canvasWidth, height: canvasHeight } = this.gl.canvas;

    // Adjust buffer based on zoom level
    const viewScale = this.viewTransform.scale;
    const bufferFactor = viewScale > 4 ? 1.2 : 1.5; // Reduce buffer at high zoom

    const viewportWidth = (canvasWidth / viewScale) * bufferFactor;
    const viewportHeight = (canvasHeight / viewScale) * bufferFactor;

    // Calculate world space center of viewport
    const worldCenterX = -this.viewTransform.x / viewScale + canvasWidth / 2 / viewScale;
    const worldCenterY = -this.viewTransform.y / viewScale + canvasHeight / 2 / viewScale;

    // Optimization: Only update visible and near-visible items
    this.gridItems.forEach((item) => {
      const relativeX = item.x - worldCenterX;
      const relativeY = item.y - worldCenterY;

      // Calculate distance from viewport center
      const distanceFromCenter = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
      const isNearViewport = distanceFromCenter < Math.max(viewportWidth, viewportHeight);

      // Only wrap items that are near the viewport
      if (isNearViewport) {
        if (relativeX < -viewportWidth / 2) {
          item.x += this.dimensions.totalWidth;
        } else if (relativeX > viewportWidth / 2) {
          item.x -= this.dimensions.totalWidth;
        }

        if (relativeY < -viewportHeight / 2) {
          item.y += this.dimensions.totalHeight;
        } else if (relativeY > viewportHeight / 2) {
          item.y -= this.dimensions.totalHeight;
        }
      }
    });

    this.draw();
  }

  public setZoom(factor: number, originX?: number, originY?: number): void {
    const canvas = this.gl.canvas as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();

    // Get current zoom levels and max scale
    const zoomLevels = this.getResponsiveZoomLevels();
    const maxScale = zoomLevels[zoomLevels.length - 1];

    // If we're already at max scale and trying to zoom in, exit early
    if (this.viewTransform.scale >= maxScale && factor > 1) {
      return;
    }

    // If we're already at min scale and trying to zoom out, exit early
    if (this.viewTransform.scale <= zoomLevels[0] && factor < 1) {
      return;
    }

    // Always zoom from exact center of viewport
    const pixelRatio = window.devicePixelRatio;
    const centerX = (rect.width * pixelRatio) / 2;
    const centerY = (rect.height * pixelRatio) / 2;

    // Get the next discrete zoom level
    const newScale = this.getNextZoomLevel(factor);

    // If we're already at this scale, exit early
    if (Math.abs(newScale - this.viewTransform.scale) < 0.001) return;

    // Convert viewport center to world space
    const worldCenterX = (centerX - this.viewTransform.x) / this.viewTransform.scale;
    const worldCenterY = (centerY - this.viewTransform.y) / this.viewTransform.scale;

    // Calculate new position that keeps the center point fixed
    const newX = centerX - worldCenterX * newScale;
    const newY = centerY - worldCenterY * newScale;

    // Update transform with animation
    gsap.to(this.viewTransform, {
      scale: newScale,
      x: newX,
      y: newY,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: () => {
        this.updateGridPositions();
      },
    });
  }

  private createMatrix(
    item: GridItem,
    width: number,
    height: number,
    xOffset: number,
    yOffset: number
  ): Float32Array {
    const matrix = new Float32Array(16);
    const { width: canvasWidth, height: canvasHeight } = this.gl.canvas;

    // Calculate final dimensions without rounding
    const finalWidth = width * this.viewTransform.scale;
    const finalHeight = height * this.viewTransform.scale;

    // Calculate final position without rounding
    const finalX = (item.x + xOffset) * this.viewTransform.scale + this.viewTransform.x;
    const finalY = (item.y + yOffset) * this.viewTransform.scale + this.viewTransform.y;

    // Convert to clip space
    matrix[0] = (finalWidth * 2) / canvasWidth;
    matrix[5] = (finalHeight * 2) / canvasHeight;
    matrix[12] = (finalX * 2) / canvasWidth - 1;
    matrix[13] = (-finalY * 2) / canvasHeight + 1;
    matrix[15] = 1;

    return matrix;
  }

  private draw(): void {
    const { gl } = this;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.program);

    gl.enableVertexAttribArray(this.locations.position);
    gl.enableVertexAttribArray(this.locations.texCoord);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
    gl.vertexAttribPointer(this.locations.position, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texCoord);
    gl.vertexAttribPointer(this.locations.texCoord, 2, gl.FLOAT, false, 0, 0);

    // Optimization: Sort items by texture to reduce texture bindings
    const sortedItems = [...this.gridItems].sort((a, b) => a.imageIndex - b.imageIndex);
    let currentTexture: WebGLTexture | null = null;

    sortedItems.forEach((item) => {
      const image = this.images[item.imageIndex];
      const texture = this.textures.get(image.url);

      if (!texture) return;

      // Only bind texture if it's different from the current one
      if (texture !== currentTexture) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(this.locations.texture, 0);
        currentTexture = texture;
      }

      const dimensions = this.calculateImageDimensions(image, item.width, item.height);
      const xOffset = (item.width - dimensions.width) / 2;
      const yOffset = dimensions.offsetY;

      gl.uniform1f(this.locations.opacity, item.opacity);

      const matrix = this.createMatrix(item, dimensions.width, dimensions.height, xOffset, yOffset);
      gl.uniformMatrix4fv(this.locations.matrix, false, matrix);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    });
  }

  private render = (): void => {
    if (!this.isActive || !this.isInitialized) return;

    if (!this.isDragging) {
      const friction = 0.95;
      this.momentum.x *= friction;
      this.momentum.y *= friction;

      if (Math.abs(this.momentum.x) > 0.01 || Math.abs(this.momentum.y) > 0.01) {
        this.handleDrag(this.momentum.x, this.momentum.y);
      }
    }

    this.draw();
    requestAnimationFrame(this.render);
  };

  public async init(options: GridOptions): Promise<void> {
    await this.loadImages(options.images);
    this.setupGrid(options);
    this.isInitialized = true;
  }

  public start(): void {
    if (!this.isInitialized) return;
    this.isActive = true;
    this.render();
  }

  public resize(width: number, height: number): void {
    const canvas = this.gl.canvas as HTMLCanvasElement;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;

    this.gl.viewport(0, 0, canvas.width, canvas.height);
    this.updateViewportCenter();

    if (this.isInitialized) {
      this.setupGrid({
        columnCount: this.dimensions.columnCount,
        rowCount: this.dimensions.rowCount,
        images: this.images.map((img) => img.url),
        pixelRatio,
      });
    }
  }

  public destroy(): void {
    this.isActive = false;
    const { gl } = this;
    const canvas = gl.canvas as HTMLCanvasElement;

    // Clean up textures
    this.textures.forEach((texture) => {
      gl.deleteTexture(texture);
    });
    this.textures.clear();

    // Delete buffers
    gl.deleteBuffer(this.buffers.position);
    gl.deleteBuffer(this.buffers.texCoord);

    // Delete program and shaders
    gl.useProgram(null);
    gl.deleteProgram(this.program);

    // Remove event listeners with proper bindings
    if (this.boundEvents) {
      canvas.removeEventListener('mousedown', this.boundEvents.mouseDown);
      window.removeEventListener('mousemove', this.boundEvents.mouseMove);
      window.removeEventListener('mouseup', this.boundEvents.mouseUp);
      canvas.removeEventListener('touchstart', this.boundEvents.touchStart);
      window.removeEventListener('touchmove', this.boundEvents.touchMove);
      window.removeEventListener('touchend', this.boundEvents.touchEnd);
    }
  }
}
