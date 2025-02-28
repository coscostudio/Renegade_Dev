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
  element: HTMLImageElement;
  width: number;
  height: number;
  texture?: WebGLTexture;
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

// Grid dimensions for layout
export interface GridDimensions {
  itemWidth: number;
  itemHeight: number;
  padding: number;
  columnCount: number;
  rowCount: number;
  totalWidth: number;
  totalHeight: number;
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
  isMobile: boolean;
  pixelRatio: number;
}

// Options for viewing area
export interface Viewport {
  left: number;
  right: number;
  top: number;
  bottom: number;
}
