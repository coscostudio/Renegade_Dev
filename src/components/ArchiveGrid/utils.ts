// Detects device capabilities and returns appropriate settings
export function detectDeviceCapabilities(): {
  isMobile: boolean;
  pixelRatio: number;
  maxTextureSize: number;
  columnCount: number;
  rowCount: number;
  dragMultiplier: number;
  maxConcurrentLoads: number;
} {
  // Check if device is mobile based on screen width or touch capability
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

  // Limit pixel ratio to 2 for performance
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  // Determine texture size based on device capabilities
  // Mobile devices use smaller textures to save memory
  const maxTextureSize = isMobile ? 1024 : 2048;

  // Mobile devices show fewer columns/rows to improve performance
  const columnCount = isMobile ? 2 : 3;
  const rowCount = isMobile ? 3 : 4;

  // Adjust interaction sensitivity based on device type
  const dragMultiplier = isMobile ? 4.5 : 2.5;

  // Limit concurrent image loads based on device capability
  const maxConcurrentLoads = isMobile ? 2 : 4;

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
  return start * (1 - t) + end * t;
}

// Checks if a value is a power of 2 (needed for texture optimization)
export function isPowerOf2(value: number): boolean {
  return (value & (value - 1)) === 0;
}

// Creates a WebGL shader
export function createShader(gl: WebGLRenderingContext, source: string, type: number): WebGLShader {
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

// Creates a WebGL program from vertex and fragment shaders
export function createProgram(
  gl: WebGLRenderingContext,
  vertShader: WebGLShader,
  fragShader: WebGLShader
): WebGLProgram {
  const program = gl.createProgram();
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${info}`);
  }

  return program;
}

// Helper to resize canvas with proper pixel ratio
export function resizeCanvas(canvas: HTMLCanvasElement, pixelRatio: number): void {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * pixelRatio;
  canvas.height = rect.height * pixelRatio;
}

// Calculate visible items in the viewport
export function calculateVisibleItems(
  items: any[],
  viewport: { left: number; right: number; top: number; bottom: number },
  buffer: number = 100
): any[] {
  const visibleItems = [];
  const extendedViewport = {
    left: viewport.left - buffer,
    right: viewport.right + buffer,
    top: viewport.top - buffer,
    bottom: viewport.bottom + buffer,
  };

  for (const item of items) {
    const right = item.x + item.width;
    const bottom = item.y + item.height;

    if (
      right >= extendedViewport.left &&
      item.x <= extendedViewport.right &&
      bottom >= extendedViewport.top &&
      item.y <= extendedViewport.bottom
    ) {
      visibleItems.push(item);
    }
  }

  return visibleItems;
}
