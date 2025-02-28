import { TextureManager } from './TextureManager';
import {
  DeviceSettings,
  GridItem,
  GridOptions,
  ImageInfo,
  Transform,
  Viewport,
  WebGLBuffers,
  WebGLLocations,
} from './types';
import { calculateVisibleItems, createProgram, createShader, lerp, resizeCanvas } from './utils';

export class GridRenderer {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private textureManager: TextureManager;
  private gridItems: GridItem[] = [];
  private deviceSettings: DeviceSettings;
  private viewport: Viewport = { left: 0, right: 0, top: 0, bottom: 0 };
  private isInitialized = false;
  private buffers: WebGLBuffers;
  private locations: WebGLLocations;
  private lastTransform: Transform = { scale: 1, x: 0, y: 0 };

  // Grid configuration
  private gridSpacing = 0;
  private itemWidth = 0;
  private itemHeight = 0;
  private totalWidth = 0;
  private totalHeight = 0;
  private columnCount = 0;
  private rowCount = 0;
  private animations: Map<string, { target: number; current: number }> = new Map();

  // Vertex shader for drawing grid items
  private vertexShaderSource = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    uniform mat4 u_matrix;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = u_matrix * a_position;
      v_texCoord = a_texCoord;
    }
  `;

  // Fragment shader for drawing grid items with transitions and effects
  private fragmentShaderSource = `
    precision mediump float;
    uniform sampler2D u_texture;
    uniform float u_opacity;
    uniform float u_grayscale;
    uniform float u_r;
    uniform float u_g;
    uniform float u_b;
    varying vec2 v_texCoord;
    
    void main() {
      vec4 texColor = texture2D(u_texture, v_texCoord);
      
      // Apply background color for transparent areas
      texColor = vec4(
        mix(u_r, texColor.r, texColor.a),
        mix(u_g, texColor.g, texColor.a),
        mix(u_b, texColor.b, texColor.a),
        max(texColor.a, 0.1)
      );
      
      // Apply grayscale effect
      if (u_grayscale > 0.0) {
        float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
        texColor.rgb = mix(texColor.rgb, vec3(gray), u_grayscale);
      }
      
      // Apply opacity
      gl_FragColor = vec4(texColor.rgb, texColor.a * u_opacity);
    }
  `;

  constructor(canvas: HTMLCanvasElement, deviceSettings: DeviceSettings) {
    // Get WebGL context with appropriate settings
    this.gl = canvas.getContext('webgl', {
      antialias: true,
      premultipliedAlpha: false,
      alpha: true,
    });

    if (!this.gl) {
      throw new Error('WebGL not supported');
    }

    this.deviceSettings = deviceSettings;

    // Initialize WebGL context
    this.initWebGL();

    // Create texture manager
    this.textureManager = new TextureManager(this.gl, deviceSettings);

    // Prepare initial canvas size
    resizeCanvas(canvas, deviceSettings.pixelRatio);
  }

  // Initialize WebGL context, shaders, buffers, etc.
  private initWebGL(): void {
    const { gl } = this;

    // Create shaders
    const vertexShader = createShader(gl, this.vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, this.fragmentShaderSource, gl.FRAGMENT_SHADER);

    // Create and link program
    this.program = createProgram(gl, vertexShader, fragmentShader);

    // Get attribute and uniform locations
    this.locations = {
      position: gl.getAttribLocation(this.program, 'a_position'),
      texCoord: gl.getAttribLocation(this.program, 'a_texCoord'),
      matrix: gl.getUniformLocation(this.program, 'u_matrix'),
      texture: gl.getUniformLocation(this.program, 'u_texture'),
      opacity: gl.getUniformLocation(this.program, 'u_opacity'),
      grayscale: gl.getUniformLocation(this.program, 'u_grayscale'),
      backgroundR: gl.getUniformLocation(this.program, 'u_r'),
      backgroundG: gl.getUniformLocation(this.program, 'u_g'),
      backgroundB: gl.getUniformLocation(this.program, 'u_b'),
    };

    // Create position and texture coordinate buffers
    const positionBuffer = gl.createBuffer();
    const texCoordBuffer = gl.createBuffer();

    // Store buffers
    this.buffers = {
      position: positionBuffer,
      texCoord: texCoordBuffer,
    };

    // Upload geometry to GPU
    // Positions for a quad (two triangles)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
      gl.STATIC_DRAW
    );

    // Texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
      gl.STATIC_DRAW
    );

    // Set up blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Set clear color
    gl.clearColor(0, 0, 0, 0);
  }

  // Set up the grid with proper dimensions
  public async setupGrid(options: GridOptions): Promise<void> {
    const { gl } = this;
    const { width, height } = gl.canvas;
    const { pixelRatio, columnCount, rowCount } = this.deviceSettings;

    // Calculate grid dimensions based on screen size and device capabilities
    this.columnCount = options.columnCount || columnCount;
    this.rowCount = options.rowCount || rowCount;

    // Calculate item size and spacing
    const maxWidth = width * 0.8;
    const itemsPerRow = this.columnCount;

    // Calculate item width with spacing
    this.itemWidth = Math.min(maxWidth / itemsPerRow, 300 * pixelRatio);

    // Maintain aspect ratio (default to 4:3)
    this.itemHeight = this.itemWidth * 0.75;

    // Set grid spacing
    this.gridSpacing = this.itemWidth * 0.2;

    // Calculate total grid dimensions with enough items to fill viewport
    this.totalWidth = (this.itemWidth + this.gridSpacing) * this.columnCount;
    this.totalHeight = (this.itemHeight + this.gridSpacing) * this.rowCount;

    // Reset viewport
    this.viewport = {
      left: -this.totalWidth / 2,
      right: this.totalWidth / 2,
      top: -this.totalHeight / 2,
      bottom: this.totalHeight / 2,
    };

    // Generate the grid items with positions
    this.generateGridItems(options.images);

    // Mark as initialized
    this.isInitialized = true;
  }

  // Generate grid items with positions and load textures
  private async generateGridItems(imageUrls: string[]): Promise<void> {
    this.gridItems = [];

    // Seed image URLs for random selection
    const availableImages = [...imageUrls];

    // Create an evenly distributed pattern but with randomization
    const cellWidth = this.itemWidth + this.gridSpacing;
    const cellHeight = this.itemHeight + this.gridSpacing;

    // Calculate start positions for centering the grid
    const startX = -this.totalWidth / 2 + this.itemWidth / 2;
    const startY = -this.totalHeight / 2 + this.itemHeight / 2;

    // Create all grid items
    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.columnCount; col++) {
        // Get a random image URL for this position
        const imageIndex = Math.floor(Math.random() * availableImages.length);
        const imageUrl = availableImages[imageIndex];

        // Calculate position
        const x = startX + col * cellWidth;
        const y = startY + row * cellHeight;

        // Create grid item
        const gridItem: GridItem = {
          x,
          y,
          width: this.itemWidth,
          height: this.itemHeight,
          textureUrl: imageUrl,
          isVisible: true,
          opacity: 0, // Start with 0 opacity for fade-in animation
          zIndex: 0,
          velocity: { x: 0, y: 0 },
        };

        // Store animation state
        this.animations.set(`${x}-${y}`, {
          target: 1, // Target opacity
          current: 0, // Current opacity
        });

        // Queue texture loading
        this.textureManager.queueTexture(
          imageUrl,
          row * this.columnCount + col, // Priority based on position
          (texture, info) => {
            // Texture loaded callback
            gridItem.isVisible = true;
          }
        );

        // Add to grid items
        this.gridItems.push(gridItem);
      }
    }
  }

  // Update visibility of grid items based on viewport transform
  public updateVisibility(transform: Transform): void {
    if (!this.isInitialized) return;

    const { gl } = this;
    const { width, height } = gl.canvas;

    // Store last transform for animations
    this.lastTransform = { ...transform };

    // Calculate the visible area based on the current transform
    const visibleArea = {
      left: -transform.x / transform.scale,
      right: (width - transform.x) / transform.scale,
      top: -transform.y / transform.scale,
      bottom: (height - transform.y) / transform.scale,
    };

    // Add padding for better performance (load items slightly outside viewport)
    const padding = Math.max(this.itemWidth, this.itemHeight) * 2;
    const extendedVisibleArea = {
      left: visibleArea.left - padding,
      right: visibleArea.right + padding,
      top: visibleArea.top - padding,
      bottom: visibleArea.bottom + padding,
    };

    // Wrap grid items if they go outside the grid boundaries
    this.wrapGridItems(extendedVisibleArea, transform.scale);

    // Update item visibility
    for (const item of this.gridItems) {
      // Calculate item bounds
      const itemBounds = {
        left: item.x - item.width / 2,
        right: item.x + item.width / 2,
        top: item.y - item.height / 2,
        bottom: item.y + item.height / 2,
      };

      // Check if item is visible in the extended viewport
      const isVisible = !(
        itemBounds.right < extendedVisibleArea.left ||
        itemBounds.left > extendedVisibleArea.right ||
        itemBounds.bottom < extendedVisibleArea.top ||
        itemBounds.bottom > extendedVisibleArea.bottom
      );

      // Update item visibility
      item.isVisible = isVisible;

      // Update animation target
      const animKey = `${item.x}-${item.y}`;
      if (this.animations.has(animKey)) {
        this.animations.get(animKey).target = isVisible ? 1 : 0;
      } else {
        this.animations.set(animKey, { target: isVisible ? 1 : 0, current: item.opacity });
      }

      // Load high-resolution texture for visible items when zoomed in
      if (isVisible && transform.scale > 2) {
        this.textureManager.queueTexture(
          item.textureUrl,
          0, // High priority
          (texture, info) => {
            // HD texture loaded callback
          },
          true // Request HD version
        );
      }
    }
  }

  // Wrap grid items to create an infinite effect
  private wrapGridItems(visibleArea: Viewport, scale: number): void {
    // Calculate grid bounds
    const gridWidth = this.totalWidth;
    const gridHeight = this.totalHeight;

    for (const item of this.gridItems) {
      // Check if item needs to be wrapped horizontally
      if (item.x - item.width / 2 > visibleArea.right) {
        item.x -= gridWidth;
      } else if (item.x + item.width / 2 < visibleArea.left) {
        item.x += gridWidth;
      }

      // Check if item needs to be wrapped vertically
      if (item.y - item.height / 2 > visibleArea.bottom) {
        item.y -= gridHeight;
      } else if (item.y + item.height / 2 < visibleArea.top) {
        item.y += gridHeight;
      }
    }
  }

  // Draw the grid to the canvas
  public draw(transform: Transform): void {
    if (!this.isInitialized) return;

    const { gl } = this;

    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Set up WebGL for drawing
    gl.useProgram(this.program);

    // Set up attributes
    gl.enableVertexAttribArray(this.locations.position);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
    gl.vertexAttribPointer(this.locations.position, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(this.locations.texCoord);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texCoord);
    gl.vertexAttribPointer(this.locations.texCoord, 2, gl.FLOAT, false, 0, 0);

    // Update animations
    this.updateAnimations();

    // Sort items by zIndex for proper layering
    const sortedItems = [...this.gridItems]
      .filter((item) => item.isVisible)
      .sort((a, b) => a.zIndex - b.zIndex);

    // Draw each visible item
    for (const item of sortedItems) {
      // Skip items with zero opacity
      if (item.opacity <= 0.01) continue;

      // Get texture
      const texture = this.textureManager.getTexture(item.textureUrl);
      if (!texture) continue;

      // Calculate item transform
      const matrix = this.calculateItemMatrix(item, transform);

      // Get image info for background color
      const imageInfo = this.textureManager.getImageInfo(item.textureUrl);
      const color = imageInfo?.color || '#000000';
      const { r, g, b } = this.hexToRgb(color);

      // Bind texture
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(this.locations.texture, 0);

      // Set uniforms
      gl.uniformMatrix4fv(this.locations.matrix, false, matrix);
      gl.uniform1f(this.locations.opacity, item.opacity);
      gl.uniform1f(this.locations.grayscale, 0); // No grayscale by default
      gl.uniform1f(this.locations.backgroundR, r / 255);
      gl.uniform1f(this.locations.backgroundG, g / 255);
      gl.uniform1f(this.locations.backgroundB, b / 255);

      // Draw the item
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  }

  // Update animation states
  private updateAnimations(): void {
    // Update opacity animations
    for (const [key, anim] of this.animations.entries()) {
      // Interpolate towards target
      anim.current = lerp(anim.current, anim.target, 0.1);

      // Update corresponding grid item
      for (const item of this.gridItems) {
        if (`${item.x}-${item.y}` === key) {
          item.opacity = anim.current;
          break;
        }
      }
    }
  }

  // Calculate transformation matrix for an item
  private calculateItemMatrix(item: GridItem, transform: Transform): Float32Array {
    const { gl } = this;
    const { width, height } = gl.canvas;

    // Create 4x4 identity matrix
    const matrix = new Float32Array(16);
    matrix[0] = 1;
    matrix[5] = 1;
    matrix[10] = 1;
    matrix[15] = 1;

    // Calculate transformed position and size
    const x = item.x * transform.scale + transform.x;
    const y = item.y * transform.scale + transform.y;
    const w = item.width * transform.scale;
    const h = item.height * transform.scale;

    // Set scale (mapping item dimensions to clip space)
    matrix[0] = (w * 2) / width;
    matrix[5] = (h * 2) / height;

    // Set translation (mapping item position to clip space)
    matrix[12] = (x * 2) / width - 1 + w / width;
    matrix[13] = (-y * 2) / height + 1 - h / height;

    return matrix;
  }

  // Helper to convert hex color to RGB components
  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    // Default to black if invalid
    if (!hex || !hex.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      return { r: 0, g: 0, b: 0 };
    }

    // Expand shorthand form (e.g. "#03F") to full form (e.g. "#0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    // Extract RGB components
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }

  // Clean up resources
  public destroy(): void {
    const { gl } = this;

    // Delete program and shaders
    gl.deleteProgram(this.program);

    // Delete buffers
    gl.deleteBuffer(this.buffers.position);
    gl.deleteBuffer(this.buffers.texCoord);

    // Clean up texture manager
    this.textureManager.releaseAllTextures();

    // Reset state
    this.isInitialized = false;
    this.gridItems = [];
    this.animations.clear();
  }

  // Resize handler
  public resize(width: number, height: number): void {
    const { gl } = this;

    // Resize the canvas
    resizeCanvas(gl.canvas as HTMLCanvasElement, this.deviceSettings.pixelRatio);

    // Update viewport
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }
}
