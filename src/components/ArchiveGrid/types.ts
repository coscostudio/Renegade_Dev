// Settings based on device capabilities
export interface DeviceSettings {
  isMobile: boolean;
  pixelRatio: number;
  maxTextureSize: number;
  columnCount: number;
  rowCount: number;
  dragMultiplier: number;
  maxConcurrentLoads: number;
}

// Grid item representing an image in the infinite grid
export interface GridItem {
  x: number;
  y: number;
  width: number;
  height: number;
  textureUrl: string;
  isVisible: boolean;
  opacity: number;
  zIndex: number;
  velocity?: { x: number; y: number };
}

// Information about loaded images and their textures
export interface ImageInfo {
  url: string;
  element: HTMLImageElement | null;
  width: number;
  height: number;
  isLoaded: boolean;
  isHD?: boolean;
  color: string;
}

// Transform data for viewport positioning
export interface Transform {
  scale: number;
  x: number;
  y: number;
}

// WebGL program locations
export interface WebGLLocations {
  position: number;
  texCoord: number;
  matrix: WebGLUniformLocation;
  texture: WebGLUniformLocation;
  opacity: WebGLUniformLocation;
  grayscale?: WebGLUniformLocation;
  backgroundR?: WebGLUniformLocation;
  backgroundG?: WebGLUniformLocation;
  backgroundB?: WebGLUniformLocation;
}

// WebGL buffer objects
export interface WebGLBuffers {
  position: WebGLBuffer;
  texCoord: WebGLBuffer;
}

// Options for texture creation
export interface TextureOptions {
  useMipmaps?: boolean;
  minFilter?: number;
  magFilter?: number;
  wrapS?: number;
  wrapT?: number;
}

// Options for initializing the grid
export interface GridOptions {
  images: string[];
  pixelRatio?: number;
  columnCount?: number;
  rowCount?: number;
}

// Options for viewing area
export interface Viewport {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

// Animation state tracking
export interface AnimationState {
  value: number;
  target: number;
  velocity: number;
}

// Image loading options
export interface ImageLoadOptions {
  priority: number;
  isHD?: boolean;
}

// Image data for the grid
export interface ImageData {
  url: string;
  width: number;
  height: number;
  color?: string;
}

// Performance monitoring metrics
export interface PerformanceMetrics {
  fps: number;
  renderTime: number;
  loadedTextures: number;
  visibleItems: number;
}

// Zoom level configuration
export interface ZoomLevel {
  scale: number;
  gridSpacing: number;
  itemSize: number;
}

// Update event for the grid
export interface GridUpdateEvent {
  transform: Transform;
  visibleItems: number;
  timestamp: number;
}

// Batch texture loading progress
export interface LoadingProgress {
  loaded: number;
  total: number;
  isComplete: boolean;
  failedUrls: string[];
}
