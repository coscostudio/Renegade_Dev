// Types for the WebGL Grid
export interface GridOptions {
  images: string[];
  pixelRatio?: number;
  columnCount: number;
  rowCount: number;
}

export interface ImageInfo {
  url: string;
  element: HTMLImageElement;
  width: number;
  height: number;
}

export interface GridItem {
  x: number;
  y: number;
  width: number;
  height: number;
  imageIndex: number;
  opacity: number;
  velocity: {
    x: number;
    y: number;
  };
}

export interface GridDimensions {
  itemWidth: number;
  itemHeight: number;
  padding: number;
  columnCount: number;
  rowCount: number;
  totalWidth: number;
  totalHeight: number;
}

export interface WebGLLocations {
  position: number;
  texCoord: number;
  matrix: WebGLUniformLocation;
  image: WebGLUniformLocation;
  opacity: WebGLUniformLocation;
}

export interface WebGLBuffers {
  position: WebGLBuffer;
  texCoord: WebGLBuffer;
}
