import { gsap } from 'gsap';

import {
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
  private scale = 1;
  private targetScale = 1;
  private zoomOrigin = { x: 0, y: 0 };
  private maxScale = 2;
  private minScale = 0.5;
  private maxImageWidth = 0.6;

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

    const texCoords = new Float32Array([
      0,
      1, // bottom-left
      1,
      1, // bottom-right
      0,
      0, // top-left
      1,
      1, // bottom-right
      1,
      0, // top-right
      0,
      0, // top-left
    ]);

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

  public setZoom(factor: number, originX?: number, originY?: number): void {
    const newScale = this.scale * factor;
    this.targetScale = Math.max(this.minScale, Math.min(this.maxScale, newScale));

    const canvas = this.gl.canvas as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();

    this.zoomOrigin = {
      x: originX ?? rect.width / 2,
      y: originY ?? rect.height / 2,
    };

    gsap.to(this, {
      scale: this.targetScale,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: () => {
        this.handleZoomUpdate();
      },
    });
  }

  private handleZoomUpdate(): void {
    const scaleDelta = this.targetScale / this.scale;

    this.gridItems.forEach((item) => {
      // Calculate position relative to zoom origin
      const dx = item.x - this.zoomOrigin.x;
      const dy = item.y - this.zoomOrigin.y;

      // Apply zoom transformation
      item.x = this.zoomOrigin.x + dx * scaleDelta;
      item.y = this.zoomOrigin.y + dy * scaleDelta;
    });

    this.scale = this.targetScale;
  }

  private bindEvents(canvas: HTMLCanvasElement): void {
    canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));

    canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    window.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    window.addEventListener('touchend', this.handleTouchEnd.bind(this));

    canvas.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
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

  private handleWheel(e: WheelEvent): void {
    e.preventDefault();
    const { deltaX } = e;
    const { deltaY } = e;
    this.handleDrag(-deltaX * 0.5, -deltaY * 0.5);
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
  ): { width: number; height: number } {
    const imageAspect = image.width / image.height;
    const containerAspect = containerWidth / containerHeight;
    const maxWidth = containerWidth * this.maxImageWidth;

    if (imageAspect > containerAspect) {
      const width = Math.min(containerWidth, maxWidth);
      return {
        width,
        height: width / imageAspect,
      };
    }
    const height = containerHeight;
    const width = Math.min(height * imageAspect, maxWidth);
    return {
      width,
      height,
    };
  }

  private calculateGridDimensions(options: GridOptions): void {
    const { width: canvasWidth, height: canvasHeight } = this.gl.canvas;
    const maxItemWidth = canvasWidth * this.maxImageWidth;

    const itemWidth = Math.min(maxItemWidth, canvasWidth / (options.columnCount + 1));
    const itemHeight = itemWidth * 0.75;
    const padding = itemWidth * 0.3;

    // Add more buffer rows/columns to ensure seamless wrapping
    const minColumns = Math.ceil(canvasWidth / (itemWidth + padding)) + 6; // Increased from 4
    const minRows = Math.ceil(canvasHeight / (itemHeight + padding)) + 6;

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

  private wrapItemPosition(item: GridItem): void {
    const halfWidth = this.dimensions.totalWidth / 2;
    const halfHeight = this.dimensions.totalHeight / 2;
    const buffer = this.dimensions.padding; // Add small buffer

    if (item.x - this.viewportCenter.x < -halfWidth - buffer) {
      item.x += this.dimensions.totalWidth;
    } else if (item.x - this.viewportCenter.x > halfWidth + buffer) {
      item.x -= this.dimensions.totalWidth;
    }

    if (item.y - this.viewportCenter.y < -halfHeight - buffer) {
      item.y += this.dimensions.totalHeight;
    } else if (item.y - this.viewportCenter.y > halfHeight + buffer) {
      item.y -= this.dimensions.totalHeight;
    }
  }

  private setupGrid(options: GridOptions): void {
    this.calculateGridDimensions(options);

    this.gridItems = [];
    let index = 0;

    const startCol = Math.floor(-this.dimensions.columnCount / 2);
    const startRow = Math.floor(-this.dimensions.rowCount / 2);

    // Fix the nested loops
    for (let row = startRow; row <= startRow + this.dimensions.rowCount; row++) {
      for (let col = startCol; col <= startCol + this.dimensions.columnCount; col++) {
        const imageIndex = index % this.images.length;
        this.gridItems.push({
          x: col * (this.dimensions.itemWidth + this.dimensions.padding) + this.viewportCenter.x,
          y: row * (this.dimensions.itemHeight + this.dimensions.padding) + this.viewportCenter.y,
          width: this.dimensions.itemWidth,
          height: this.dimensions.itemHeight,
          imageIndex: Math.abs(imageIndex),
          opacity: 1,
          velocity: { x: 0, y: 0 },
        });
        index++;
      }
    }
  }

  private handleDrag(deltaX: number, deltaY: number): void {
    const speedFactor = 1.0;

    this.momentum = {
      x: deltaX * speedFactor,
      y: deltaY * speedFactor,
    };

    this.gridItems.forEach((item) => {
      item.x += deltaX;
      item.y += deltaY;
      this.wrapItemPosition(item);
    });
  }

  private wrapItemPosition(item: GridItem): void {
    const halfWidth = this.dimensions.totalWidth / 2;
    const halfHeight = this.dimensions.totalHeight / 2;

    if (item.x - this.viewportCenter.x < -halfWidth) {
      item.x += this.dimensions.totalWidth;
    } else if (item.x - this.viewportCenter.x > halfWidth) {
      item.x -= this.dimensions.totalWidth;
    }

    if (item.y - this.viewportCenter.y < -halfHeight) {
      item.y += this.dimensions.totalHeight;
    } else if (item.y - this.viewportCenter.y > halfHeight) {
      item.y -= this.dimensions.totalHeight;
    }
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

    const scaledWidth = width * this.scale;
    const scaledHeight = height * this.scale;

    // Position and scale
    matrix[0] = (scaledWidth * 2) / canvasWidth;
    matrix[5] = (scaledHeight * 2) / canvasHeight;
    matrix[12] = ((item.x + xOffset) * 2) / canvasWidth - 1;
    matrix[13] = (-(item.y + yOffset) * 2) / canvasHeight + 1;
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

    this.gridItems.forEach((item) => {
      const image = this.images[item.imageIndex];
      const texture = this.textures.get(image.url);

      if (!texture) return;

      const dimensions = this.calculateImageDimensions(image, item.width, item.height);
      const xOffset = (item.width - dimensions.width) / 2;
      const yOffset = 0; // Align to top

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(this.locations.texture, 0);
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
        this.gridItems.forEach((item) => {
          item.x += this.momentum.x;
          item.y += this.momentum.y;
          this.wrapItemPosition(item);
        });
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

    // Remove event listeners
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.removeEventListener('mousedown', this.handleMouseDown.bind(this));
    window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    window.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    canvas.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    window.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    window.removeEventListener('touchend', this.handleTouchEnd.bind(this));
    canvas.removeEventListener('wheel', this.handleWheel.bind(this));
  }
}
