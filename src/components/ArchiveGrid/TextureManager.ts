import { DeviceSettings, ImageInfo, TextureOptions } from './types';
import { isPowerOf2 } from './utils';

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

  constructor(gl: WebGLRenderingContext, deviceSettings: DeviceSettings) {
    this.gl = gl;
    this.deviceSettings = deviceSettings;
    this.maxConcurrentLoads = deviceSettings.maxConcurrentLoads;
  }

  // Method to queue a texture for loading with priority
  queueTexture(
    url: string,
    priority: number,
    callback: (texture: WebGLTexture, info: ImageInfo) => void,
    isHD: boolean = false
  ): void {
    // Add to queue
    this.loadingQueue.push({ url, priority, callback, isHD });

    // Sort by priority (lower number = higher priority)
    this.loadingQueue.sort((a, b) => a.priority - b.priority);

    // Try to start loading
    this.processQueue();
  }

  // Process the loading queue respecting concurrent load limits
  private processQueue(): void {
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

    // Otherwise, load the image
    this.loadImage(nextItem.url, nextItem.isHD)
      .then(({ image, imageInfo }) => {
        const texture = this.createTexture(image, {
          useMipmaps:
            !this.deviceSettings.isMobile && isPowerOf2(image.width) && isPowerOf2(image.height),
        });

        this.textures.set(nextItem.url, texture);
        this.imageInfo.set(nextItem.url, imageInfo);

        nextItem.callback(texture, imageInfo);
        this.activeLoads--;
        this.processQueue();
      })
      .catch((error) => {
        console.error(`Failed to load texture: ${nextItem.url}`, error);
        this.activeLoads--;
        this.processQueue();
      });
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
          color: '#000000', // Default color, can be updated later
        };

        resolve({ image: img, imageInfo });
      };

      img.onerror = () => {
        reject(new Error(`Failed to load image: ${resizedUrl}`));
      };

      img.src = resizedUrl;
    });
  }

  // Resize image URL based on device and HD settings
  private getResizedImageUrl(url: string, isHD: boolean): string {
    // Parse the URL to extract any query parameters
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);

    // Determine size based on HD and device
    const size = isHD
      ? this.deviceSettings.isMobile
        ? 1000
        : 1600
      : this.deviceSettings.isMobile
        ? 500
        : 800;

    // Update or add the height parameter
    params.set('h', String(Math.min(size, this.deviceSettings.maxTextureSize)));

    // Set quality based on HD
    params.set('q', isHD ? '80' : '60');

    // Add format if supported
    if (this.supportsWebP()) {
      params.set('fm', 'webp');
    }

    // Update the URL with the new parameters
    urlObj.search = params.toString();
    return urlObj.toString();
  }

  // Check for WebP support
  private supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  }

  // Method to create a texture from an image
  createTexture(image: HTMLImageElement, options: TextureOptions = {}): WebGLTexture {
    const { gl } = this;
    const texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);

    // If no image yet, create a 1x1 placeholder
    if (!image || image.width === 0) {
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
    if (options.useMipmaps && isPowerOf2(image.width) && isPowerOf2(image.height)) {
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
  releaseTexture(url: string): void {
    if (this.textures.has(url)) {
      const texture = this.textures.get(url);
      this.gl.deleteTexture(texture);
      this.textures.delete(url);
      this.imageInfo.delete(url);
    }
  }

  // Method to release all textures
  releaseAllTextures(): void {
    this.textures.forEach((texture) => {
      this.gl.deleteTexture(texture);
    });
    this.textures.clear();
    this.imageInfo.clear();
  }

  // Check if a texture is loaded
  isTextureLoaded(url: string): boolean {
    return this.textures.has(url) && this.imageInfo.has(url);
  }

  // Get texture if available
  getTexture(url: string): WebGLTexture | null {
    return this.textures.get(url) || null;
  }

  // Get image info if available
  getImageInfo(url: string): ImageInfo | null {
    return this.imageInfo.get(url) || null;
  }
}
