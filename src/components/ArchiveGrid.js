// Consolidated ArchiveGrid.js
// This file replaces the entire /components/ArchiveGrid/ folder

// DeviceSettings detection utility
function detectDeviceCapabilities() {
  // Check if device is mobile based on screen width or touch capability
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
  const isTablet = !isMobile && window.innerWidth <= 1024;

  // Adjust pixel ratio for performance
  const rawPixelRatio = window.devicePixelRatio || 1;
  const pixelRatio = isMobile ? Math.min(rawPixelRatio, 2) : rawPixelRatio;

  // Mobile devices show fewer columns/rows to improve performance
  const columnCount = isMobile ? 4 : isTablet ? 5 : 6;
  const rowCount = isMobile ? 4 : isTablet ? 5 : 6;

  // Adjust interaction sensitivity based on device type
  const dragMultiplier = isMobile ? 1.5 : 1;

  // Limit concurrent image loads based on device capability
  const maxConcurrentLoads = isMobile ? 2 : isTablet ? 4 : 6;
  const maxTextureSize = isMobile ? 1024 : isTablet ? 2048 : 4096;

  return {
    isMobile,
    pixelRatio,
    columnCount,
    rowCount,
    dragMultiplier,
    maxConcurrentLoads,
    maxTextureSize,
  };

  // Main ArchiveGrid class - export this
  class ArchiveGrid {
    constructor(canvas) {
      this.canvas = canvas;
      this.deviceSettings = detectDeviceCapabilities();
      this.transform = { scale: 1, x: 0, y: 0 };
      this.isActive = false;
      this.animationFrameId = null;

      // Initialize components
      this.renderer = new GridRenderer(canvas, this.deviceSettings);
      this.interactionManager = new InteractionManager(canvas, this.transform, this.deviceSettings);

      // Listen for transform changes
      this.interactionManager.addTransformCallback((transform) => {
        this.transform = transform;
        this.renderer.updateVisibility(transform);
      });

      console.log('ArchiveGrid initialized');
    }

    // Initialize the grid with images
    async init(options) {
      try {
        console.log('ArchiveGrid.init called with options:', options);

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
        return true;
      } catch (error) {
        console.error('Failed to initialize ArchiveGrid:', error);
        throw error;
      }
    }

    // Start rendering
    start() {
      if (this.isActive) return;

      this.isActive = true;
      this.interactionManager.setActive(true);
      this.render();

      console.log('ArchiveGrid started');
    }

    // Stop rendering
    stop() {
      this.isActive = false;
      this.interactionManager.setActive(false);

      if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }

      console.log('ArchiveGrid stopped');
    }

    // Main render loop
    render = () => {
      if (!this.isActive) return;

      // Update grid visibility based on current transform
      this.renderer.updateVisibility(this.transform);

      // Draw grid
      this.renderer.draw(this.transform);

      // Continue animation loop
      this.animationFrameId = requestAnimationFrame(this.render);
    };

    // Get current transform
    getTransform() {
      return { ...this.transform };
    }

    // Set transform (for external control)
    setTransform(transform) {
      this.interactionManager.setTransform(transform);
    }

    // Zoom in or out
    zoom(action) {
      const factor = action === 'in' ? 1.5 : 0.67;
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;

      this.interactionManager.zoom(factor, centerX, centerY);
    }

    // Handle resize
    resize(width, height) {
      if (!width || !height) return;

      console.log(`Resizing grid to ${width}x${height}`);

      // Resize the canvas and update the renderer
      this.canvas.width = width * this.deviceSettings.pixelRatio;
      this.canvas.height = height * this.deviceSettings.pixelRatio;

      // Update renderer
      this.renderer.resize(width, height);

      // Update visibility with new dimensions
      this.renderer.updateVisibility(this.transform);
    }

    // Clean up resources
    destroy() {
      this.stop();
      this.interactionManager.destroy();
      this.renderer.destroy();

      console.log('ArchiveGrid destroyed');
    }
  }

  // Make available globally and export as module
  if (typeof window !== 'undefined') {
    window.ArchiveGrid = ArchiveGrid;
  }

  export { ArchiveGrid };
}

// Linear interpolation helper
function lerp(start, end, t) {
  t = Math.max(0, Math.min(1, t));
  return start * (1 - t) + end * t;
}

// Texture Manager class
class TextureManager {
  constructor(gl, deviceSettings) {
    this.gl = gl;
    this.textures = new Map();
    this.imageInfo = new Map();
    this.loadingQueue = [];
    this.activeLoads = 0;
    this.deviceSettings = deviceSettings;
    this.maxConcurrentLoads = deviceSettings.maxConcurrentLoads;

    // Create placeholder texture for use while loading
    this.placeholderTexture = this.createEmptyTexture('#303030');

    // Detect supported formats
    this.supportedFormats = { webp: false, avif: false };
    this.detectSupportedFormats();
  }

  async detectSupportedFormats() {
    try {
      // Check for WebP support
      this.supportedFormats.webp = await this.checkWebpSupport();

      // Check for AVIF support
      this.supportedFormats.avif = await this.checkAvifSupport();

      console.log('Supported formats:', this.supportedFormats);
    } catch (error) {
      console.warn('Error detecting format support:', error);
    }
  }

  checkWebpSupport() {
    return new Promise((resolve) => {
      const webpImg = new Image();
      webpImg.onload = () => resolve(true);
      webpImg.onerror = () => resolve(false);
      webpImg.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    });
  }

  checkAvifSupport() {
    return new Promise((resolve) => {
      const avifImg = new Image();
      avifImg.onload = () => resolve(true);
      avifImg.onerror = () => resolve(false);
      avifImg.src =
        'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    });
  }

  createEmptyTexture(hexColor = '#303030') {
    const texture = this.gl.createTexture();

    // Parse hex color
    const r = parseInt(hexColor.slice(1, 3), 16) || 0;
    const g = parseInt(hexColor.slice(3, 5), 16) || 0;
    const b = parseInt(hexColor.slice(5, 7), 16) || 0;

    // Create a 1x1 pixel texture with the specified color
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      1,
      1,
      0,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      new Uint8Array([r, g, b, 255])
    );

    // Set texture parameters
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

    return texture;
  }

  queueTexture(url, priority, callback, isHD = false) {
    // If we already have this texture loaded, use it immediately
    if (this.textures.has(url) && this.imageInfo.has(url)) {
      const texture = this.textures.get(url);
      const info = this.imageInfo.get(url);
      callback(texture, info);
      return;
    }

    // Check if it's already queued
    const existingItem = this.loadingQueue.find((item) => item.url === url && item.isHD === isHD);
    if (existingItem) {
      // Update priority if the new one is higher
      if (priority < existingItem.priority) {
        existingItem.priority = priority;
        // Re-sort queue
        this.loadingQueue.sort((a, b) => a.priority - b.priority);
      }

      // Add callback to existing queue item
      const originalCallback = existingItem.callback;
      existingItem.callback = (texture, info) => {
        originalCallback(texture, info);
        callback(texture, info);
      };

      return;
    }

    // Add to queue
    this.loadingQueue.push({ url, priority, callback, isHD });

    // Sort by priority (lower number = higher priority)
    this.loadingQueue.sort((a, b) => a.priority - b.priority);

    // Try to start loading
    this.processQueue();
  }

  processQueue() {
    // Check if we can load more images
    if (this.activeLoads >= this.maxConcurrentLoads || this.loadingQueue.length === 0) {
      return;
    }

    const nextItem = this.loadingQueue.shift();
    if (!nextItem) return;

    this.activeLoads++;

    // If we already have this texture loaded, use it immediately
    if (this.textures.has(nextItem.url) && this.imageInfo.has(nextItem.url)) {
      const texture = this.textures.get(nextItem.url);
      const info = this.imageInfo.get(nextItem.url);
      nextItem.callback(texture, info);
      this.activeLoads--;
      this.processQueue();
      return;
    }

    // Provide placeholder texture immediately
    const placeholderInfo = {
      url: nextItem.url,
      element: null,
      width: 1,
      height: 1,
      isLoaded: false,
      isHD: nextItem.isHD,
      color: this.stringToColor(nextItem.url),
    };

    // Return placeholder immediately to prevent UI blocking
    nextItem.callback(this.placeholderTexture, placeholderInfo);

    // Continue loading the actual texture
    this.loadImage(nextItem.url, nextItem.isHD)
      .then(({ image, imageInfo }) => {
        // Create the texture
        const texture = this.createTexture(image);

        // Store in cache
        this.textures.set(nextItem.url, texture);
        this.imageInfo.set(nextItem.url, imageInfo);

        // Provide loaded texture
        nextItem.callback(texture, imageInfo);
      })
      .catch((error) => {
        console.error(`Failed to load texture: ${nextItem.url}`, error);
        // Keep using placeholder on failure
        nextItem.callback(this.placeholderTexture, placeholderInfo);
      })
      .finally(() => {
        this.activeLoads--;
        this.processQueue();
      });
  }

  async loadImage(url, isHD = false) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      // For mobile or non-HD, resize the image
      const resizedUrl = this.getResizedImageUrl(url, isHD);

      img.onload = () => {
        const imageInfo = {
          url,
          element: img,
          width: img.naturalWidth,
          height: img.naturalHeight,
          isLoaded: true,
          isHD,
          color: this.stringToColor(url),
        };

        resolve({ image: img, imageInfo });
      };

      img.onerror = () => {
        reject(new Error(`Failed to load image: ${resizedUrl}`));
      };

      img.src = resizedUrl;

      // Set a timeout for mobile devices to prevent hanging on slow connections
      if (this.deviceSettings.isMobile) {
        setTimeout(() => {
          if (!img.complete) {
            img.src = ''; // Cancel the request
            reject(new Error(`Timeout loading image: ${resizedUrl}`));
          }
        }, 10000); // 10 second timeout
      }
    });
  }

  getResizedImageUrl(url, isHD) {
    try {
      // Parse the URL to extract any query parameters
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);

      // Determine size based on HD and device
      const sizeFactor = this.deviceSettings.pixelRatio;
      const baseSize = isHD
        ? this.deviceSettings.isMobile
          ? 600
          : 1200
        : this.deviceSettings.isMobile
          ? 300
          : 600;

      const size = Math.round(baseSize * sizeFactor);
      const maxSize = this.deviceSettings.maxTextureSize;

      // Update or add the size parameter (use appropriate param based on URL)
      if (url.includes('fit=') || url.includes('height=') || url.includes('width=')) {
        // Contentful or similar CDN
        if (url.includes('height=') || url.includes('h=')) {
          params.set('h', String(Math.min(size, maxSize)));
        } else if (url.includes('width=') || url.includes('w=')) {
          params.set('w', String(Math.min(size, maxSize)));
        }
      } else {
        // Generic parameter
        params.set('size', String(Math.min(size, maxSize)));
      }

      // Set quality based on HD
      if (url.includes('quality=') || url.includes('q=')) {
        params.set('q', isHD ? '80' : '60');
      }

      // Add format if supported
      if (this.supportedFormats.avif) {
        params.set('fm', 'avif');
      } else if (this.supportedFormats.webp) {
        params.set('fm', 'webp');
      }

      // Update the URL with the new parameters
      urlObj.search = params.toString();
      return urlObj.toString();
    } catch (error) {
      // If URL parsing fails, return original
      console.warn('Error parsing URL:', error);
      return url;
    }
  }

  createTexture(image, options = {}) {
    const texture = this.gl.createTexture();

    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

    // If no image yet, create a 1x1 placeholder
    if (!image || !image.complete || image.naturalWidth === 0) {
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        0,
        this.gl.RGBA,
        1,
        1,
        0,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 255])
      );
    } else {
      // When we have actual data
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        0,
        this.gl.RGBA,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        image
      );
    }

    // Configure texture parameters
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

    return texture;
  }

  // Generate a color from a string (used for placeholders)
  stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }

    return color;
  }

  // Check if a texture is loaded
  isTextureLoaded(url) {
    return this.textures.has(url) && this.imageInfo.has(url);
  }

  // Get texture if available
  getTexture(url) {
    return this.textures.get(url) || null;
  }

  // Get image info if available
  getImageInfo(url) {
    return this.imageInfo.get(url) || null;
  }

  // Release texture resources
  releaseTexture(url) {
    if (this.textures.has(url)) {
      const texture = this.textures.get(url);
      this.gl.deleteTexture(texture);
      this.textures.delete(url);
      this.imageInfo.delete(url);
    }
  }

  // Release all textures
  releaseAllTextures() {
    this.textures.forEach((texture) => {
      this.gl.deleteTexture(texture);
    });
    this.textures.clear();
    this.imageInfo.clear();
  }
}

// Interaction Manager class
class InteractionManager {
  constructor(canvas, transform, deviceSettings) {
    this.canvas = canvas;
    this.transform = { ...transform };
    this.targetTransform = { ...transform };
    this.deviceSettings = deviceSettings;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.lastTouchX = 0;
    this.lastTouchY = 0;
    this.velocity = { x: 0, y: 0 };
    this.isZooming = false;
    this.minScale = 0.25;
    this.maxScale = 5;
    this.transformCallbacks = [];
    this.isActive = true;
    this.animationId = null;

    this.bindEvents();
  }

  bindEvents() {
    // Mouse events for dragging
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    // Touch events for dragging
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.canvas.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    window.addEventListener('touchend', this.handleTouchEnd);
    window.addEventListener('touchcancel', this.handleTouchEnd);

    // Start animation loop
    this.startAnimationLoop();
  }

  handleMouseDown(e) {
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
  }

  handleMouseMove(e) {
    if (!this.isActive || !this.isDragging) return;

    // Calculate deltas
    const deltaX = e.clientX - this.lastMouseX;
    const deltaY = e.clientY - this.lastMouseY;

    // Scale by device settings (for drag sensitivity)
    const scaledDeltaX = deltaX * this.deviceSettings.dragMultiplier;
    const scaledDeltaY = deltaY * this.deviceSettings.dragMultiplier;

    // Apply drag
    this.handleDrag(scaledDeltaX, scaledDeltaY);

    // Track last position for next frame
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
  }

  handleMouseUp() {
    if (!this.isActive) return;

    this.isDragging = false;

    // Reset cursor
    this.canvas.style.cursor = 'grab';
  }

  handleTouchStart(e) {
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
  }

  handleTouchMove(e) {
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
  }

  handleTouchEnd() {
    if (!this.isActive) return;

    // End all touch interactions
    this.isDragging = false;
  }

  handleDrag(deltaX, deltaY) {
    // Update target position
    this.targetTransform.x += deltaX;
    this.targetTransform.y += deltaY;

    // Update velocity for momentum effect
    this.velocity = {
      x: deltaX * 0.8, // Reduce intensity a bit
      y: deltaY * 0.8,
    };
  }

  zoom(factor, originX, originY) {
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

  update() {
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

    return { ...this.transform };
  }

  startAnimationLoop() {
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

  addTransformCallback(callback) {
    this.transformCallbacks.push(callback);
  }

  notifyTransformChanged() {
    for (const callback of this.transformCallbacks) {
      callback({ ...this.transform });
    }
  }

  setTransform(transform) {
    if (transform.x !== undefined) this.targetTransform.x = transform.x;
    if (transform.y !== undefined) this.targetTransform.y = transform.y;
    if (transform.scale !== undefined) this.targetTransform.scale = transform.scale;
  }

  getTransform() {
    return { ...this.transform };
  }

  resetTransform() {
    this.targetTransform = {
      x: 0,
      y: 0,
      scale: 1,
    };

    this.velocity = { x: 0, y: 0 };
  }

  setActive(active) {
    this.isActive = active;

    if (active && !this.animationId) {
      this.startAnimationLoop();
    }
  }

  destroy() {
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

// Grid Renderer class
class GridRenderer {
  constructor(canvas, deviceSettings) {
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
    this.textureManager = new TextureManager(this.gl, deviceSettings);
    this.gridItems = [];
    this.isInitialized = false;
    this.animations = new Map();

    // Initialize WebGL context
    this.initWebGL();
  }

  initWebGL() {
    const { gl } = this;

    // Create shaders
    const vertexShader = this.createShader(
      gl.VERTEX_SHADER,
      `
        attribute vec4 a_position;
        attribute vec2 a_texCoord;
        uniform mat4 u_matrix;
        varying vec2 v_texCoord;
        
        void main() {
          gl_Position = u_matrix * a_position;
          v_texCoord = a_texCoord;
        }
      `
    );

    const fragmentShader = this.createShader(
      gl.FRAGMENT_SHADER,
      `
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
      `
    );

    // Create and link program
    this.program = this.createProgram(vertexShader, fragmentShader);

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

    // Set clear color (transparent)
    gl.clearColor(0, 0, 0, 0);
  }

  createShader(type, source) {
    const { gl } = this;
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Shader compile error: ${info}`);
    }

    return shader;
  }

  createProgram(vertexShader, fragmentShader) {
    const { gl } = this;
    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(`Program link error: ${info}`);
    }

    return program;
  }

  async setupGrid(options) {
    const { gl } = this;
    const { width, height } = gl.canvas;

    // Calculate grid dimensions based on screen size and device capabilities
    this.columnCount = options.columnCount || this.deviceSettings.columnCount;
    this.rowCount = options.rowCount || this.deviceSettings.rowCount;

    // Calculate item size and spacing
    const maxWidth = width * 0.8;
    const itemsPerRow = this.columnCount;

    // Calculate item width with spacing
    this.itemWidth = Math.min(maxWidth / itemsPerRow, 300 * this.deviceSettings.pixelRatio);

    // Maintain aspect ratio (default to 4:3)
    this.itemHeight = this.itemWidth * 0.75;

    // Set grid spacing
    this.gridSpacing = this.itemWidth * 0.2;

    // Calculate total grid dimensions
    this.totalWidth = (this.itemWidth + this.gridSpacing) * this.columnCount;
    this.totalHeight = (this.itemHeight + this.gridSpacing) * this.rowCount;

    // Generate the grid items with positions
    await this.generateGridItems(options.images);

    // Mark as initialized
    this.isInitialized = true;

    return true;
  }

  async generateGridItems(imageUrls) {
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
        const gridItem = {
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

  updateVisibility(transform) {
    if (!this.isInitialized) return;

    const { gl } = this;
    const { width, height } = gl.canvas;

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
        itemBounds.top > extendedVisibleArea.bottom
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

  wrapGridItems(visibleArea, scale) {
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

  draw(transform) {
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

  updateAnimations() {
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

  calculateItemMatrix(item, transform) {
    const { gl } = this;
    const { width, height } = gl.canvas;

    // Create 4x4 identity matrix
    const matrix = new Float32Array(16);
    matrix.fill(0);
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

  hexToRgb(hex) {
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

  resize(width, height) {
    const { gl } = this;

    // Update viewport
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

  destroy() {
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
}
