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
  private locations: WebGLLocations;
  private buffers: WebGLBuffers;
  private gridDimensions: GridDimensions;
  private isInitialized = false;
  private isActive = false;
  private animationFrame: number | null = null;

  private isDragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;
  private momentum = { x: 0, y: 0 };
  private scale = 1;

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
    uniform sampler2D u_image;
    uniform float u_opacity;
    varying vec2 v_texCoord;
    void main() {
      vec4 texColor = texture2D(u_image, v_texCoord);
      gl_FragColor = vec4(texColor.rgb, texColor.a * u_opacity);
    }
  `;

  static async create(canvas: HTMLCanvasElement, options: GridOptions): Promise<WebGLGrid> {
    const instance = new WebGLGrid(canvas);
    await instance.initialize(options);
    return instance;
  }

  private constructor(canvas: HTMLCanvasElement) {
    console.log('Creating WebGL Grid...');
    this.gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
    });

    if (!this.gl) {
      throw new Error('WebGL not supported');
    }

    this.setupWebGL();
  }

  private async initialize(options: GridOptions): Promise<void> {
    try {
      console.log('Initializing WebGL Grid...');
      await this.loadImages(options.images);
      this.setupGrid(options);
      this.bindEvents();
      this.isInitialized = true;
      console.log('WebGL Grid initialization complete');
    } catch (error) {
      console.error('Error during WebGL Grid initialization:', error);
      throw error;
    }
  }

  private setupWebGL(): void {
    const { gl } = this;

    // Create shaders
    const vertexShader = this.createShader(gl.VERTEX_SHADER, this.vertexShader);
    const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, this.fragmentShader);

    // Create program
    this.program = this.createProgram(vertexShader, fragmentShader);

    // Get locations
    this.locations = {
      position: gl.getAttribLocation(this.program, 'a_position'),
      texCoord: gl.getAttribLocation(this.program, 'a_texCoord'),
      matrix: gl.getUniformLocation(this.program, 'u_matrix'),
      image: gl.getUniformLocation(this.program, 'u_image'),
      opacity: gl.getUniformLocation(this.program, 'u_opacity'),
    };

    // Create buffers
    this.buffers = {
      position: gl.createBuffer(),
      texCoord: gl.createBuffer(),
    };

    // Set up vertex data
    const positions = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);
    const texCoords = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texCoord);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    // Enable transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  private createShader(type: number, source: string): WebGLShader {
    const { gl } = this;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Could not compile WebGL shader. \n\n${info}`);
    }

    return shader;
  }

  private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    const { gl } = this;
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(`Could not link WebGL program. \n\n${info}`);
    }

    return program;
  }

  private async loadImages(urls: string[]): Promise<void> {
    console.log('Loading images:', urls.length);
    const loadPromises = urls.map((url) => this.loadImage(url));
    await Promise.all(loadPromises);
    console.log('Images loaded:', this.images.length);

    // Create textures once images are loaded
    this.images.forEach((image) => {
      const texture = this.createTexture(image.element);
      this.textures.set(image.url, texture);
    });
  }

  private loadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        this.images.push({
          url,
          element: img,
          width: img.width,
          height: img.height,
        });
        resolve();
      };
      img.onerror = () => {
        console.error('Failed to load image:', url);
        reject(new Error(`Failed to load image: ${url}`));
      };
      img.src = url;
    });
  }

  private createTexture(image: HTMLImageElement): WebGLTexture {
    const { gl } = this;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Upload image to texture
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    return texture;
  }

  private setupGrid(options: GridOptions): void {
    const { columnCount, rowCount } = options;
    const totalImages = this.images.length;
    const viewport = {
      width: this.gl.canvas.width,
      height: this.gl.canvas.height,
    };

    console.log('Setting up grid with dimensions:', viewport);

    // Calculate item dimensions
    const itemWidth = viewport.width / columnCount;
    const itemHeight = itemWidth * (3 / 4); // 4:3 aspect ratio
    const padding = itemWidth * 0.1; // 10% padding

    // Clear existing items
    this.gridItems = [];

    // Create grid items with initial positions
    for (let row = -1; row < rowCount + 1; row++) {
      for (let col = -1; col < columnCount + 1; col++) {
        const imageIndex = (((row * columnCount + col) % totalImages) + totalImages) % totalImages;

        this.gridItems.push({
          x: col * (itemWidth + padding),
          y: row * (itemHeight + padding),
          width: itemWidth,
          height: itemHeight,
          imageIndex,
          opacity: 1,
          velocity: { x: 0, y: 0 },
        });
      }
    }

    this.gridDimensions = {
      itemWidth,
      itemHeight,
      padding,
      columnCount,
      rowCount,
      totalWidth: (columnCount + 2) * (itemWidth + padding),
      totalHeight: (rowCount + 2) * (itemHeight + padding),
    };
  }

  private bindEvents(): void {
    const canvas = this.gl.canvas as HTMLCanvasElement;
    canvas.style.cursor = 'grab';

    // Mouse events
    canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));

    // Touch events
    canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    window.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    window.addEventListener('touchend', this.handleTouchEnd.bind(this));

    // Wheel event for zoom
    canvas.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
  }

  private handleMouseDown(e: MouseEvent): void {
    e.preventDefault();
    this.isDragging = true;
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    this.momentum = { x: 0, y: 0 };
    (this.gl.canvas as HTMLCanvasElement).style.cursor = 'grabbing';
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.isDragging) return;

    const deltaX = e.clientX - this.lastMouseX;
    const deltaY = e.clientY - this.lastMouseY;

    this.momentum = {
      x: deltaX * 0.1,
      y: deltaY * 0.1,
    };

    this.moveGrid(deltaX, deltaY);

    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
  }

  private handleMouseUp(): void {
    this.isDragging = false;
    (this.gl.canvas as HTMLCanvasElement).style.cursor = 'grab';
  }

  private handleTouchStart(e: TouchEvent): void {
    e.preventDefault();
    if (e.touches.length === 1) {
      this.isDragging = true;
      this.lastMouseX = e.touches[0].clientX;
      this.lastMouseY = e.touches[0].clientY;
      this.momentum = { x: 0, y: 0 };
    }
  }

  private handleTouchMove(e: TouchEvent): void {
    e.preventDefault();
    if (!this.isDragging || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - this.lastMouseX;
    const deltaY = e.touches[0].clientY - this.lastMouseY;

    this.momentum = {
      x: deltaX * 0.1,
      y: deltaY * 0.1,
    };

    this.moveGrid(deltaX, deltaY);

    this.lastMouseX = e.touches[0].clientX;
    this.lastMouseY = e.touches[0].clientY;
  }

  private handleTouchEnd(): void {
    this.isDragging = false;
  }

  private handleWheel(e: WheelEvent): void {
    e.preventDefault();
    const delta = -Math.sign(e.deltaY) * 0.1;
    this.zoom(delta < 0 ? 'out' : 'in');
  }

  private moveGrid(deltaX: number, deltaY: number): void {
    this.gridItems.forEach((item) => {
      item.x += deltaX;
      item.y += deltaY;

      // Wrap items when they move off screen
      const { totalWidth, totalHeight } = this.gridDimensions;
      const viewport = {
        width: this.gl.canvas.width,
        height: this.gl.canvas.height,
      };

      if (item.x < -viewport.width) {
        item.x += totalWidth;
      } else if (item.x > viewport.width) {
        item.x -= totalWidth;
      }

      if (item.y < -viewport.height) {
        item.y += totalHeight;
      } else if (item.y > viewport.height) {
        item.y -= totalHeight;
      }
    });
  }

  public zoom(direction: 'in' | 'out'): void {
    if (!this.isActive) return;

    const factor = direction === 'in' ? 1.2 : 0.8;
    const newScale = Math.max(0.5, Math.min(3, this.scale * factor));

    if (newScale !== this.scale) {
      gsap.to(this, {
        scale: newScale,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: () => {
          this.updateGridScale();
        },
      });
    }
  }

  private updateGridScale(): void {
    this.gridItems.forEach((item) => {
      item.width = this.gridDimensions.itemWidth * this.scale;
      item.height = this.gridDimensions.itemHeight * this.scale;
    });
  }

  private render = (): void => {
    if (!this.isActive || !this.isInitialized) {
      return;
    }

    const { gl } = this;

    // Apply momentum
    if (
      !this.isDragging &&
      (Math.abs(this.momentum.x) > 0.01 || Math.abs(this.momentum.y) > 0.01)
    ) {
      this.moveGrid(this.momentum.x, this.momentum.y);
      this.momentum.x *= 0.95;
      this.momentum.y *= 0.95;
    }

    // Clear canvas
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Use shader program
    gl.useProgram(this.program);

    // Set up attribute arrays
    gl.enableVertexAttribArray(this.locations.position);
    gl.enableVertexAttribArray(this.locations.texCoord);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
    gl.vertexAttribPointer(this.locations.position, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texCoord);
    gl.vertexAttribPointer(this.locations.texCoord, 2, gl.FLOAT, false, 0, 0);

    // Draw each grid item
    this.gridItems.forEach((item) => {
      const image = this.images[item.imageIndex];
      if (!image) return;

      const texture = this.textures.get(image.url);
      if (!texture) return;

      // Set texture
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(this.locations.image, 0);

      // Set opacity
      gl.uniform1f(this.locations.opacity, item.opacity);

      // Set transformation matrix
      const matrix = this.calculateMatrix(item);
      gl.uniformMatrix4fv(this.locations.matrix, false, matrix);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    });

    // Request next frame
    this.animationFrame = requestAnimationFrame(this.render);
  };

  private calculateMatrix(item: GridItem): Float32Array {
    // Create projection matrix (converts to clip space)
    const projectionMatrix = new Float32Array([
      2 / this.gl.canvas.width,
      0,
      0,
      0,
      0,
      -2 / this.gl.canvas.height,
      0,
      0,
      0,
      0,
      1,
      0,
      -1,
      1,
      0,
      1,
    ]);

    // Create transform matrix
    const translateMatrix = new Float32Array([
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      item.x,
      item.y,
      0,
      1,
    ]);

    const scaleMatrix = new Float32Array([
      item.width,
      0,
      0,
      0,
      0,
      item.height,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
    ]);

    return this.multiplyMatrices(
      projectionMatrix,
      this.multiplyMatrices(translateMatrix, scaleMatrix)
    );
  }

  private multiplyMatrices(a: Float32Array, b: Float32Array): Float32Array {
    const result = new Float32Array(16);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
          sum += a[i * 4 + k] * b[k * 4 + j];
        }
        result[i * 4 + j] = sum;
      }
    }

    return result;
  }

  public start(): void {
    if (!this.isInitialized) {
      console.warn('Cannot start: WebGL Grid not initialized');
      return;
    }
    console.log('Starting WebGL Grid');
    this.isActive = true;
    this.render();
  }

  public pause(): void {
    this.isActive = false;
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  public resize(width: number, height: number): void {
    const canvas = this.gl.canvas as HTMLCanvasElement;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    if (this.isInitialized) {
      this.setupGrid({
        columnCount: this.gridDimensions.columnCount,
        rowCount: this.gridDimensions.rowCount,
        images: this.images.map((img) => img.url),
        pixelRatio: window.devicePixelRatio,
      });
    }
  }

  public destroy(): void {
    this.pause();
    const { gl } = this;

    // Delete textures
    this.textures.forEach((texture) => gl.deleteTexture(texture));
    this.textures.clear();

    // Delete buffers
    gl.deleteBuffer(this.buffers.position);
    gl.deleteBuffer(this.buffers.texCoord);

    // Delete program and shaders
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

    // Clear arrays
    this.images = [];
    this.gridItems = [];
  }
}
