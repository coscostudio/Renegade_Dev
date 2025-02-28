import { DeviceSettings, ImageInfo, TextureOptions } from './types';
import { checkAvifSupport, checkWebpSupport, isPowerOf2, stringToColor } from './utils';

export class TextureManager {
  private gl: WebGLRenderingContext;
  private textures: Map<string, WebGLTexture> = new Map();
  private imageInfo: Map<string, ImageInfo> = new Map();
  private loadingQueue: Array<{
    url: string;
    priority: number;
    callback: (texture: WebGLTexture, info: ImageInfo) => void;
    isHD?: boolean;
  }> = [];
  private activeLoads: number = 0;
  private maxConcurrentLoads: number = 3;
  private deviceSettings: DeviceSettings;
  private supportedFormats: { webp: boolean; avif: boolean } = { webp: false, avif: false };
  private isFormatDetectionComplete: boolean = false;
  private formatDetectionPromise: Promise<void>;

  // Create a placeholder texture for use while loading
  private placeholderTexture: WebGLTexture;

  constructor(gl: WebGLRenderingContext, deviceSettings: DeviceSettings) {
    this.gl = gl;
    this.deviceSettings = deviceSettings;
    this.maxConcurrentLoads = deviceSettings.maxConcurrentLoads;

    // Create placeholder texture
    this.placeholderTexture = this.createEmptyTexture('#303030');

    // Start format detection
    this.formatDetectionPromise = this.detectSupportedFormats();
  }

  // Detect which image formats the browser supports
  private async detectSupportedFormats(): Promise<void> {
    try {
      // Check for WebP support
      this.supportedFormats.webp = await checkWebpSupport();

      // Check for AVIF support
      this.supportedFormats.avif = await checkAvifSupport();

      console.log('Supported formats:', this.supportedFormats);
    } catch (error) {
      console.warn('Error detecting format support:', error);
      // Default to conservative estimates
      this.supportedFormats.webp = false;
      this.supportedFormats.avif = false;
    }

    this.isFormatDetectionComplete = true;
  }

  // Method to queue a texture for loading with priority
  public queueTexture(
    url: string,
    priority: number,
    callback: (texture: WebGLTexture, info: ImageInfo) => void,
    isHD: boolean = false
  ): void {
    // If we already have this texture loaded, use it immediately
    if (this.textures.has(url) && this.imageInfo.has(url)) {
      const texture = this.textures.get(url);
      const info = this.imageInfo.get(url);
      callback(texture, info);
      return;
    }

    // Otherwise, check if it's already queued
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

  // Process the loading queue respecting concurrent load limits
  private async processQueue(): Promise<void> {
    // Wait for format detection to complete
    if (!this.isFormatDetectionComplete) {
      await this.formatDetectionPromise;
    }

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
    const placeholderInfo: ImageInfo = {
      url: nextItem.url,
      element: null,
      width: 1,
      height: 1,
      isLoaded: false,
      isHD: nextItem.isHD,
      color: stringToColor(nextItem.url),
    };

    // Return placeholder immediately to prevent UI blocking
    nextItem.callback(this.placeholderTexture, placeholderInfo);

    // Continue loading the actual texture
    this.loadImage(nextItem.url, nextItem.isHD)
      .then(({ image, imageInfo }) => {
        // Create the texture
        const texture = this.createTexture(image, {
          useMipmaps:
            !this.deviceSettings.isMobile && isPowerOf2(image.width) && isPowerOf2(image.height),
        });

        // Store in cache
        this.textures.set(nextItem.url, texture);
        this.imageInfo.set(nextItem.url, imageInfo);

        // Provide loaded texture
        nextItem.callback(texture, imageInfo);

        // Mobile memory optimization
        if (this.deviceSettings.isMobile && this.textures.size > 50) {
          this.cleanUpLeastRecentlyUsed(10);
        }
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

  // Clean up least recently used textures for mobile devices
  private cleanUpLeastRecentlyUsed(count: number): void {
    // We would need to track usage, but for now just remove random textures
    // In a real implementation, we'd track last access time for each texture

    const textureUrls = Array.from(this.textures.keys());
    if (textureUrls.length <= count) return;

    // Remove oldest textures (for now, just random ones)
    const toRemove = textureUrls.slice(0, count);

    toRemove.forEach((url) => {
      const texture = this.textures.get(url);
      if (texture) {
        this.gl.deleteTexture(texture);
        this.textures.delete(url);
        this.imageInfo.delete(url);
      }
    });

    console.log(`Cleaned up ${count} textures to save memory`);
  }

  // Load an image and return both the image element and its info
  private async loadImage(
    url: string,
    isHD: boolean = false
  ): Promise<{
    image: HTMLImageElement;
    imageInfo: ImageInfo;
  }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      // For mobile or non-HD, resize the image
      const resizedUrl = this.getResizedImageUrl(url, isHD);

      img.onload = () => {
        const imageInfo: ImageInfo = {
          url,
          element: img,
          width: img.naturalWidth,
          height: img.naturalHeight,
          isLoaded: true,
          isHD,
          color: stringToColor(url), // Use real color extraction in production
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

  // Resize image URL based on device and HD settings
  private getResizedImageUrl(url: string, isHD: boolean): string {
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

      // Update or add the size parameter (use appropriate param based on URL)
      if (url.includes('fit=') || url.includes('height=') || url.includes('width=')) {
        // Contentful or similar CDN
        if (url.includes('height=') || url.includes('h=')) {
          params.set('h', String(Math.min(size, this.deviceSettings.maxTextureSize)));
        } else if (url.includes('width=') || url.includes('w=')) {
          params.set('w', String(Math.min(size, this.deviceSettings.maxTextureSize)));
        }
      } else {
        // Generic parameter
        params.set('size', String(Math.min(size, this.deviceSettings.maxTextureSize)));
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

  // Create a colored empty texture for placeholders
  private createEmptyTexture(hexColor: string = '#303030'): WebGLTexture {
    const { gl } = this;
    const texture = gl.createTexture();

    // Parse hex color
    const r = parseInt(hexColor.slice(1, 3), 16) || 0;
    const g = parseInt(hexColor.slice(3, 5), 16) || 0;
    const b = parseInt(hexColor.slice(5, 7), 16) || 0;

    // Create a 1x1 pixel texture with the specified color
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([r, g, b, 255])
    );

    // Set texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    return texture;
  }

  // Method to create a texture from an image
  public createTexture(image: HTMLImageElement, options: TextureOptions = {}): WebGLTexture {
    const { gl } = this;
    const texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);

    // If no image yet, create a 1x1 placeholder
    if (!image || !image.complete || image.naturalWidth === 0) {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 255])
      );
    } else {
      // When we have actual data
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    }

    // Configure texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, options.wrapS || gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, options.wrapT || gl.CLAMP_TO_EDGE);

    // Use mipmaps for better performance when appropriate
    if (
      options.useMipmaps &&
      image &&
      image.complete &&
      isPowerOf2(image.naturalWidth) &&
      isPowerOf2(image.naturalHeight)
    ) {
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        options.minFilter || gl.LINEAR_MIPMAP_LINEAR
      );
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, options.minFilter || gl.LINEAR);
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, options.magFilter || gl.LINEAR);

    return texture;
  }

  // Method to release texture resources
  public releaseTexture(url: string): void {
    if (this.textures.has(url)) {
      const texture = this.textures.get(url);
      this.gl.deleteTexture(texture);
      this.textures.delete(url);
      this.imageInfo.delete(url);
    }
  }

  // Method to release all textures
  public releaseAllTextures(): void {
    this.textures.forEach((texture) => {
      this.gl.deleteTexture(texture);
    });
    this.textures.clear();
    this.imageInfo.clear();
  }

  // Check if a texture is loaded
  public isTextureLoaded(url: string): boolean {
    return this.textures.has(url) && this.imageInfo.has(url);
  }

  // Get texture if available
  public getTexture(url: string): WebGLTexture | null {
    return this.textures.get(url) || null;
  }

  // Get image info if available
  public getImageInfo(url: string): ImageInfo | null {
    return this.imageInfo.get(url) || null;
  }
}
