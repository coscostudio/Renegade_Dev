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
  private isZooming = false;
  private zoomAnimation: gsap.core.Tween | null = null;
  private momentum = { x: 0, y: 0 };
  private targetX = 0;
  private targetY = 0;
  private multiplier = 2.5;
  private viewportCenter = { x: 0, y: 0 };
  private maxScale = 18;
  private minScale = 0.6;
  private maxImageWidth = 0.6;
  private boundEvents: BoundEvents;
  private lastFrameItems: Map<string, GridItem> = new Map();
  private frameCount = 0;

  private viewTransform = {
    scale: 1,
    x: 0,
    y: 0,
  };

  private isTabletViewport(): boolean {
    const { width } = this.gl.canvas.getBoundingClientRect();
    return width > 768 && width <= 1024;
  }

  private isMobileViewport(): boolean {
    const { width } = this.gl.canvas.getBoundingClientRect();
    return width <= 768 || 'ontouchstart' in window;
  }

  private getResponsiveZoomLevels(): number[] {
    const isMobile = this.isMobileViewport();
    const isTablet = this.isTabletViewport();

    if (isMobile) return [1, 2, 5, 9, 18];
    if (isTablet) return [0.9, 1.5, 3.75, 7.5, 15];
    return [0.6, 1, 3, 6, 12];
  }

  private getResponsiveMaxScale(): number {
    const zoomLevels = this.getResponsiveZoomLevels();
    return zoomLevels[zoomLevels.length - 1];
  }

  private getNextZoomLevel(factor: number): number {
    const zoomLevels = this.getResponsiveZoomLevels();
    const currentScale = this.viewTransform.scale;

    if (factor > 1) {
      for (const level of zoomLevels) {
        if (level > currentScale + 0.1) {
          return level;
        }
      }
      return zoomLevels[zoomLevels.length - 1];
    }
    for (let i = zoomLevels.length - 1; i >= 0; i--) {
      if (zoomLevels[i] < currentScale - 0.1) {
        return zoomLevels[i];
      }
    }
    return zoomLevels[0];
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
    this.initMultiplier(); // Add here
    this.updateViewportCenter();
  }

  private initMultiplier(): void {
    const { width } = this.gl.canvas.getBoundingClientRect();
    this.multiplier = width <= 768 || 'ontouchstart' in window ? 4.5 : 2.5;
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
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clearColor(0.059, 0.059, 0.059, 1);
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

    this.boundEvents = {
      mouseDown: boundMouseDown,
      mouseMove: boundMouseMove,
      mouseUp: boundMouseUp,
      touchStart: boundTouchStart,
      touchMove: boundTouchMove,
      touchEnd: boundTouchEnd,
    };

    canvas.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
  }

  private handleMouseDown(e: MouseEvent): void {
    this.isDragging = true;
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    this.momentum = { x: 0, y: 0 };

    this.targetX = this.viewTransform.x;
    this.targetY = this.viewTransform.y;

    const canvas = e.target as HTMLCanvasElement;
    canvas.style.cursor = 'grabbing';
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.isDragging) return;

    const deltaX = (e.clientX - this.lastMouseX) * this.multiplier;
    const deltaY = (e.clientY - this.lastMouseY) * this.multiplier;

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
      this.lastMouseX = e.touches[0].clientX;
      this.lastMouseY = e.touches[0].clientY;
      this.momentum = { x: 0, y: 0 };
      this.targetX = this.viewTransform.x;
      this.targetY = this.viewTransform.y;
    }
  }

  private handleTouchMove(e: TouchEvent): void {
    e.preventDefault();
    if (!this.isDragging || e.touches.length !== 1) return;

    const deltaX = (e.touches[0].clientX - this.lastMouseX) * this.multiplier;
    const deltaY = (e.touches[0].clientY - this.lastMouseY) * this.multiplier;

    this.handleDrag(deltaX, deltaY);

    this.lastMouseX = e.touches[0].clientX;
    this.lastMouseY = e.touches[0].clientY;
  }

  private handleTouchEnd(): void {
    this.isDragging = false;
  }

  private handleDrag(deltaX: number, deltaY: number): void {
    this.targetX += deltaX;
    this.targetY += deltaY;

    this.momentum = {
      x: deltaX,
      y: deltaY,
    };
  }

  private updatePosition(): void {
    // Skip position updates during zoom
    if (this.isZooming) return;

    const easing = 0.085;

    if (!this.isDragging) {
      const friction = 0.95;
      this.momentum.x *= friction;
      this.momentum.y *= friction;

      if (Math.abs(this.momentum.x) > 0.01 || Math.abs(this.momentum.y) > 0.01) {
        this.targetX += this.momentum.x;
        this.targetY += this.momentum.y;
      }
    }

    const dx = this.targetX - this.viewTransform.x;
    const dy = this.targetY - this.viewTransform.y;

    // Only apply easing if the distance is significant
    if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
      this.viewTransform.x += dx * easing;
      this.viewTransform.y += dy * easing;
    } else {
      // Snap to target if very close
      this.viewTransform.x = this.targetX;
      this.viewTransform.y = this.targetY;
    }

    this.viewTransform.x = Math.round(this.viewTransform.x * 100) / 100;
    this.viewTransform.y = Math.round(this.viewTransform.y * 100) / 100;

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

    const canvas = document.createElement('canvas');
    const size = Math.pow(2, Math.ceil(Math.log2(Math.max(image.width, image.height))));
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size, size);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);

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

    const zoomBuffer = 12;
    const minColumns = Math.ceil(canvasWidth / (itemWidth + padding)) + zoomBuffer;
    const minRows = Math.ceil(canvasHeight / (itemHeight + padding)) + zoomBuffer;

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

  private createBaseGrid(imageCount: number, columnsPerGrid: number): number[] {
    const sequence = Array.from({ length: imageCount }, (_, i) => i);
    // Fisher-Yates shuffle with Math.random()
    for (let i = sequence.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    }
    return sequence;
  }

  private updateGridPositions(): void {
    const { width: canvasWidth, height: canvasHeight } = this.gl.canvas;
    const viewScale = this.viewTransform.scale;

    let bufferFactor;
    if (viewScale >= 14) bufferFactor = 4;
    else if (viewScale >= 9) bufferFactor = 3;
    else if (viewScale >= 4) bufferFactor = 2;
    else if (viewScale <= 0.5) bufferFactor = 6;
    else bufferFactor = 1.5;

    const visibleWidth = (canvasWidth / viewScale) * bufferFactor;
    const visibleHeight = (canvasHeight / viewScale) * bufferFactor;

    const worldCenterX = -this.viewTransform.x / viewScale + canvasWidth / 2 / viewScale;
    const worldCenterY = -this.viewTransform.y / viewScale + canvasHeight / 2 / viewScale;

    const gridWidth = this.dimensions.totalWidth;
    const gridHeight = this.dimensions.totalHeight;

    this.gridItems.forEach((item) => {
      const relativeX = item.x - worldCenterX;
      const relativeY = item.y - worldCenterY;

      const wrapX = Math.floor((relativeX + visibleWidth / 2) / gridWidth);
      const wrapY = Math.floor((relativeY + visibleHeight / 2) / gridHeight);

      if (wrapX !== 0) item.x -= wrapX * gridWidth;
      if (wrapY !== 0) item.y -= wrapY * gridHeight;
    });

    if (viewScale > 4) {
      this.momentum.x *= 0.5;
      this.momentum.y *= 0.5;
    }
  }

  private setupGrid(options: GridOptions): void {
    this.calculateGridDimensions(options);
    this.gridItems = [];

    const baseColumns = this.dimensions.columnCount;
    // Adjust baseRows to ensure we have enough images to fill grid completely
    const baseRows = Math.max(
      Math.ceil(this.images.length / baseColumns),
      this.dimensions.rowCount
    );
    const baseGridPattern = this.createBaseGrid(this.images.length, baseColumns);

    const startCol = Math.floor(-this.dimensions.columnCount / 2);
    const startRow = Math.floor(-this.dimensions.rowCount / 2);
    const cellWidth = this.dimensions.itemWidth + this.dimensions.padding;
    const cellHeight = this.dimensions.itemHeight + this.dimensions.padding;

    // Track occupied positions
    const occupiedPositions = new Set<string>();

    for (let row = startRow; row <= startRow + this.dimensions.rowCount; row++) {
      for (let col = startCol; col <= startCol + this.dimensions.columnCount; col++) {
        const wrappedRow = ((row % baseRows) + baseRows) % baseRows;
        const wrappedCol = ((col % baseColumns) + baseColumns) % baseColumns;
        const baseIndex = wrappedRow * baseColumns + wrappedCol;

        // Wrap around to beginning of image set if we exceed length
        const imageIndex = baseGridPattern[baseIndex % this.images.length];

        const x = col * cellWidth;
        const y = row * cellHeight;
        const posKey = `${Math.round(x)},${Math.round(y)}`;

        if (!occupiedPositions.has(posKey)) {
          occupiedPositions.add(posKey);
          this.gridItems.push({
            x,
            y,
            width: this.dimensions.itemWidth,
            height: this.dimensions.itemHeight,
            imageIndex,
            opacity: 1,
            velocity: { x: 0, y: 0 },
          });
        }
      }
    }

    const { width: canvasWidth, height: canvasHeight } = this.gl.canvas;
    this.viewTransform = {
      scale: this.isMobileViewport() ? 2 : this.isTabletViewport() ? 1.5 : 1,
      x: canvasWidth / 2,
      y: canvasHeight / 2,
    };
  }

  public setZoom(factor: number, originX?: number, originY?: number): void {
    const canvas = this.gl.canvas as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const zoomLevels = this.getResponsiveZoomLevels();

    if (this.viewTransform.scale >= zoomLevels[zoomLevels.length - 1] && factor > 1) return;
    if (this.viewTransform.scale <= zoomLevels[0] && factor < 1) return;

    const pixelRatio = window.devicePixelRatio;
    const centerX = (rect.width * pixelRatio) / 2;
    const centerY = (rect.height * pixelRatio) / 2;

    const newScale = this.getNextZoomLevel(factor);

    if (Math.abs(newScale - this.viewTransform.scale) < 0.001) return;

    const worldCenterX = (centerX - this.viewTransform.x) / this.viewTransform.scale;
    const worldCenterY = (centerY - this.viewTransform.y) / this.viewTransform.scale;

    const newX = centerX - worldCenterX * newScale;
    const newY = centerY - worldCenterY * newScale;

    if (this.zoomAnimation) {
      this.zoomAnimation.kill();
    }

    this.isZooming = true;
    this.targetX = newX;
    this.targetY = newY;

    this.zoomAnimation = gsap.to(this.viewTransform, {
      scale: newScale,
      x: newX,
      y: newY,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: () => {
        this.updateGridPositions();
      },
      onComplete: () => {
        this.isZooming = false;
        this.zoomAnimation = null;
        this.targetX = this.viewTransform.x;
        this.targetY = this.viewTransform.y;
        this.momentum = { x: 0, y: 0 };
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

    const finalWidth = width * this.viewTransform.scale;
    const finalHeight = height * this.viewTransform.scale;

    const finalX = (item.x + xOffset) * this.viewTransform.scale + this.viewTransform.x;
    const finalY = (item.y + yOffset) * this.viewTransform.scale + this.viewTransform.y;

    matrix[0] = (finalWidth * 2) / canvasWidth;
    matrix[5] = (finalHeight * 2) / canvasHeight;
    matrix[12] = (finalX * 2) / canvasWidth - 1;
    matrix[13] = (-finalY * 2) / canvasHeight + 1;
    matrix[15] = 1;

    return matrix;
  }

  private draw(): void {
    const { gl } = this;

    if (!gl || !this.program) return;

    this.frameCount++;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.program);
    gl.enableVertexAttribArray(this.locations.position);
    gl.enableVertexAttribArray(this.locations.texCoord);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
    gl.vertexAttribPointer(this.locations.position, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texCoord);
    gl.vertexAttribPointer(this.locations.texCoord, 2, gl.FLOAT, false, 0, 0);

    const sortedItems = [...this.gridItems]
      .filter((item) => item.opacity > 0)
      .sort((a, b) => a.imageIndex - b.imageIndex);

    let currentTexture: WebGLTexture | null = null;
    const newFrameItems = new Map<string, GridItem>();

    sortedItems.forEach((item) => {
      const image = this.images[item.imageIndex];
      if (!image) return;

      const texture = this.textures.get(image.url);
      if (!texture) return;

      const itemKey = `${Math.round(item.x)}-${Math.round(item.y)}-${item.imageIndex}`;
      newFrameItems.set(itemKey, item);

      const lastItem = this.lastFrameItems.get(itemKey);
      const targetOpacity = item.opacity;
      item.opacity = lastItem
        ? lastItem.opacity + (targetOpacity - lastItem.opacity) * 0.3
        : targetOpacity;

      if (texture !== currentTexture) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(this.locations.texture, 0);
        currentTexture = texture;
      }

      const dimensions = this.calculateImageDimensions(image, item.width, item.height);
      const xOffset = (item.width - dimensions.width) / 2;
      const yOffset = dimensions.offsetY || 0;

      gl.uniform1f(this.locations.opacity, item.opacity);

      const matrix = this.createMatrix(item, dimensions.width, dimensions.height, xOffset, yOffset);

      gl.uniformMatrix4fv(this.locations.matrix, false, matrix);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    });

    this.lastFrameItems = newFrameItems;
  }

  private render = (): void => {
    if (!this.isActive || !this.isInitialized) return;

    this.updatePosition();
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

    this.textures.forEach((texture) => {
      gl.deleteTexture(texture);
    });
    this.textures.clear();

    gl.deleteBuffer(this.buffers.position);
    gl.deleteBuffer(this.buffers.texCoord);

    gl.useProgram(null);
    gl.deleteProgram(this.program);

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
