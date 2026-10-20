export type Mode = 'ink' | 'pixelate' | 'blur' | 'emoji';
export type ShapeKind = 'rect' | 'ellipse';

export interface Shape {
  id: number;
  mode: Mode;
  kind: ShapeKind;
  x: number;
  y: number;
  w: number;
  h: number;
  emoji?: string;
}

interface RenderOptions {
  canvas: HTMLCanvasElement;
  source: CanvasImageSource;
  width: number;
  height: number;
  shapes: Shape[];
  background?: string;
}

const INK = '#141414';

function clipShape(context: CanvasRenderingContext2D, shape: Shape): void {
  context.beginPath();
  if (shape.kind === 'ellipse') {
    context.ellipse(
      shape.x + shape.w / 2,
      shape.y + shape.h / 2,
      Math.max(1, shape.w / 2),
      Math.max(1, shape.h / 2),
      0,
      0,
      Math.PI * 2
    );
  } else {
    context.rect(shape.x, shape.y, shape.w, shape.h);
  }
  context.clip();
}

function makeTempCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  return canvas;
}

function applyPixelate(
  context: CanvasRenderingContext2D,
  source: CanvasImageSource,
  shape: Shape
): void {
  const block = Math.max(7, Math.round(Math.min(shape.w, shape.h) / 13));
  const sampleWidth = Math.max(1, Math.round(shape.w / block));
  const sampleHeight = Math.max(1, Math.round(shape.h / block));
  const temp = makeTempCanvas(sampleWidth, sampleHeight);
  const tempContext = temp.getContext('2d');
  if (!tempContext) return;

  tempContext.imageSmoothingEnabled = true;
  tempContext.drawImage(
    source,
    shape.x,
    shape.y,
    shape.w,
    shape.h,
    0,
    0,
    sampleWidth,
    sampleHeight
  );

  context.save();
  clipShape(context, shape);
  context.imageSmoothingEnabled = false;
  context.drawImage(temp, 0, 0, sampleWidth, sampleHeight, shape.x, shape.y, shape.w, shape.h);
  context.imageSmoothingEnabled = true;
  context.restore();
}

function applyBlur(
  context: CanvasRenderingContext2D,
  source: CanvasImageSource,
  shape: Shape
): void {
  const radius = Math.max(7, Math.min(shape.w, shape.h) * 0.07);
  const pad = Math.ceil(radius * 2);
  const tempWidth = Math.ceil(shape.w + pad * 2);
  const tempHeight = Math.ceil(shape.h + pad * 2);
  const temp = makeTempCanvas(tempWidth, tempHeight);
  const tempContext = temp.getContext('2d');
  if (!tempContext) return;

  tempContext.drawImage(
    source,
    shape.x - pad,
    shape.y - pad,
    tempWidth,
    tempHeight,
    0,
    0,
    tempWidth,
    tempHeight
  );

  context.save();
  clipShape(context, shape);

  if (typeof context.filter === 'string') {
    context.filter = `blur(${radius}px)`;
    context.drawImage(temp, 0, 0, tempWidth, tempHeight, shape.x - pad, shape.y - pad, tempWidth, tempHeight);
    context.filter = 'none';
  } else {
    // Older Safari has no canvas filter support. A mosaic is a safer fallback
    // than silently drawing the original pixels back.
    context.restore();
    applyPixelate(context, source, shape);
    return;
  }

  context.restore();
}

function applyEmoji(
  context: CanvasRenderingContext2D,
  shape: Shape,
  emoji: string
): void {
  context.save();
  clipShape(context, shape);
  // The sticker sits on an opaque plate. This matters: a transparent emoji
  // should never leave the original detail visible around its edges.
  context.fillStyle = '#ffffff';
  context.fillRect(shape.x, shape.y, shape.w, shape.h);

  const size = Math.max(18, Math.min(shape.w, shape.h) * 0.72);
  context.fillStyle = '#141414';
  context.font = `${size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(emoji, shape.x + shape.w / 2, shape.y + shape.h / 2 + size * 0.03);
  context.restore();
}

/**
 * Draws one redaction onto a context. `source` must be the same image, in the
 * same coordinate space as the canvas, so pixelate and blur sample original
 * pixels rather than an already-redacted layer.
 */
export function drawShape(
  context: CanvasRenderingContext2D,
  source: CanvasImageSource,
  shape: Shape
): void {
  if (shape.w < 1 || shape.h < 1) return;

  if (shape.mode === 'ink') {
    context.save();
    clipShape(context, shape);
    context.fillStyle = INK;
    context.fillRect(shape.x, shape.y, shape.w, shape.h);
    context.restore();
    return;
  }

  if (shape.mode === 'pixelate') {
    applyPixelate(context, source, shape);
    return;
  }

  if (shape.mode === 'emoji') {
    applyEmoji(context, shape, shape.emoji ?? '😎');
    return;
  }

  applyBlur(context, source, shape);
}

export function renderScene(options: RenderOptions): void {
  const { canvas, source, width, height, shapes, background } = options;
  if (canvas.width !== Math.round(width) || canvas.height !== Math.round(height)) {
    canvas.width = Math.round(width);
    canvas.height = Math.round(height);
  }

  const context = canvas.getContext('2d');
  if (!context) return;

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (background) {
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(source, 0, 0, canvas.width, canvas.height);

  for (const shape of shapes) {
    drawShape(context, source, shape);
  }
}
