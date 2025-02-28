// Define all your types here for good TypeScript integration
export interface DeviceSettings {
  isMobile: boolean;
  pixelRatio: number;
  maxTextureSize: number;
  columnCount: number;
  rowCount: number;
  dragMultiplier: number;
  maxConcurrentLoads: number;
}

export interface GridItem {
  x: number;
  y: number;
  width: number;
  height: number;
  textureUrl: string;
  isVisible: boolean;
  // Other properties
}

export interface Transform {
  scale: number;
  x: number;
  y: number;
}

// Other type definitions
