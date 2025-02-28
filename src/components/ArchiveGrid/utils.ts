import { DeviceSettings, GridItem, Viewport } from './types';

// Detects device capabilities and returns appropriate settings
export function detectDeviceCapabilities(): DeviceSettings {
  // Check if device is mobile based on screen width or touch capability
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
  const isTablet = !isMobile && window.innerWidth <= 1024;

  // Adjust pixel ratio for performance
  // Limit to 2 on mobile devices to prevent performance issues
  const rawPixelRatio = window.devicePixelRatio || 1;
  const pixelRatio = isMobile ? Math.min(rawPixelRatio, 2) : rawPixelRatio;

  // Determine texture size based on device capabilities
  // Mobile devices use smaller textures to save memory
  const maxTextureSize = isMobile ? 1024 : isTablet ? 2048 : 4096;

  // Mobile devices show fewer columns/rows to improve performance
  const columnCount = isMobile ? 4 : isTablet ? 5 : 6;
  const rowCount = isMobile ? 4 : isTablet ? 5 : 6;

  // Adjust interaction sensitivity based on device type
  const dragMultiplier = isMobile ? 1.5 : 1;

  // Limit concurrent image loads based on device capability
  const maxConcurrentLoads = isMobile ? 2 : isTablet ? 4 : 6;

  // Return device settings
  return {
    isMobile,
    pixelRatio,
    maxTextureSize,
    columnCount,
    rowCount,
    dragMultiplier,
    maxConcurrentLoads,
  };
}

// Linear interpolation helper
export function lerp(start: number, end: number, t: number): number {
  // Ensure t is clamped between 0 and 1
  t = Math.max(0, Math.min(1, t));
  return start * (1 - t) + end * t;
}

// Checks if a value is a power of 2 (needed for texture optimization)
export function isPowerOf2(value: number): boolean {
  return (value & (value - 1)) === 0 && value !== 0;
}

// Creates a WebGL shader
export function createShader(gl: WebGLRenderingContext, source: string, type: number): WebGLShader {
  // Create shader of appropriate type
  const shader = gl.createShader(type);

  // Set shader source and compile
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  // Check for compilation errors
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }

  return shader;
}

// Creates a WebGL program from vertex and fragment shaders
export function createProgram(
  gl: WebGLRenderingContext,
  vertShader: WebGLShader,
  fragShader: WebGLShader
): WebGLProgram {
  // Create new program
  const program = gl.createProgram();

  // Attach shaders
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);

  // Link program
  gl.linkProgram(program);

  // Check for linking errors
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${info}`);
  }

  return program;
}

// Helper to resize canvas with proper pixel ratio
export function resizeCanvas(canvas: HTMLCanvasElement, pixelRatio: number): void {
  // Get current display dimensions
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // Check if canvas is not the right size
  const needResize =
    canvas.width !== displayWidth * pixelRatio || canvas.height !== displayHeight * pixelRatio;

  if (needResize) {
    // Set canvas dimensions with pixel ratio applied
    canvas.width = displayWidth * pixelRatio;
    canvas.height = displayHeight * pixelRatio;
  }
}

// Calculate visible items in the viewport
export function calculateVisibleItems(
  items: GridItem[],
  viewport: Viewport,
  buffer: number = 100
): GridItem[] {
  // Create extended viewport with buffer zone for smoother scrolling
  const extendedViewport = {
    left: viewport.left - buffer,
    right: viewport.right + buffer,
    top: viewport.top - buffer,
    bottom: viewport.bottom + buffer,
  };

  // Filter items that are visible in the extended viewport
  return items.filter((item) => {
    // Calculate item bounds
    const itemRight = item.x + item.width / 2;
    const itemLeft = item.x - item.width / 2;
    const itemBottom = item.y + item.height / 2;
    const itemTop = item.y - item.height / 2;

    // Check if item overlaps with the extended viewport
    return !(
      itemRight < extendedViewport.left ||
      itemLeft > extendedViewport.right ||
      itemBottom < extendedViewport.top ||
      itemTop > extendedViewport.bottom
    );
  });
}

// Debounce function to limit frequent calls (e.g., resize events)
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = window.setTimeout(later, wait);
  };
}

// Format file size for display
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return bytes + ' B';
  }
  if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + ' KB';
  }
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Generate a deterministic color from a string (e.g., for image placeholders)
export function stringToColor(str: string): string {
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

// Create matrix for transformations
export function createTransformMatrix(
  x: number,
  y: number,
  scaleX: number,
  scaleY: number,
  canvasWidth: number,
  canvasHeight: number
): Float32Array {
  // Create identity matrix
  const matrix = new Float32Array(16);
  matrix[0] = 1;
  matrix[5] = 1;
  matrix[10] = 1;
  matrix[15] = 1;

  // Set scale (mapping item dimensions to clip space)
  matrix[0] = (scaleX * 2) / canvasWidth;
  matrix[5] = (scaleY * 2) / canvasHeight;

  // Set translation (mapping item position to clip space)
  matrix[12] = (x * 2) / canvasWidth - 1;
  matrix[13] = (-y * 2) / canvasHeight + 1;

  return matrix;
}

// Check if WebP format is supported by the browser
export function checkWebpSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const webpImg = new Image();
    webpImg.onload = () => resolve(true);
    webpImg.onerror = () => resolve(false);
    webpImg.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  });
}

// Check if AVIF format is supported by the browser
export function checkAvifSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const avifImg = new Image();
    avifImg.onload = () => resolve(true);
    avifImg.onerror = () => resolve(false);
    avifImg.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
}
