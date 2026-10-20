/**
 * Finds opaque redaction bars in a raster image.
 *
 * The detector is deliberately conservative. It looks for large, solid,
 * near-neutral dark rectangles, which is what an ink-black redaction looks
 * like. Text, icons, and dark mode chrome usually fail the rectangularity
 * check. Everything is computed from raw pixels — no OCR and no network.
 */

export type DetectionSensitivity = 'strict' | 'balanced' | 'broad';

export interface PixelImage {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

export interface DetectedArea {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Share of the bounding box that is actually dark. 1 means fully solid. */
  fill: number;
}

interface Settings {
  maxLuma: number;
  maxChroma: number;
  minFill: number;
  minSide: number;
  minArea: number;
  maxAreaRatio: number;
}

const SETTINGS: Record<DetectionSensitivity, Settings> = {
  strict: {
    maxLuma: 42,
    maxChroma: 18,
    minFill: 0.9,
    minSide: 10,
    minArea: 120,
    maxAreaRatio: 0.3,
  },
  balanced: {
    maxLuma: 58,
    maxChroma: 24,
    minFill: 0.8,
    minSide: 10,
    minArea: 120,
    maxAreaRatio: 0.36,
  },
  broad: {
    maxLuma: 88,
    maxChroma: 34,
    minFill: 0.7,
    minSide: 8,
    minArea: 80,
    maxAreaRatio: 0.42,
  },
};

export function detectRedactionAreas(
  image: PixelImage,
  sensitivity: DetectionSensitivity = 'balanced'
): DetectedArea[] {
  const { width, height, data } = image;
  const total = width * height;
  if (total === 0) return [];

  const settings = SETTINGS[sensitivity];
  const mask = new Uint8Array(total);

  for (let pixel = 0; pixel < total; pixel += 1) {
    const offset = pixel * 4;
    const alpha = data[offset + 3];
    if (alpha < 200) continue;

    const red = data[offset];
    const green = data[offset + 1];
    const blue = data[offset + 2];
    const high = Math.max(red, green, blue);
    const low = Math.min(red, green, blue);
    if (high - low > settings.maxChroma) continue;

    const luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    if (luma <= settings.maxLuma) mask[pixel] = 1;
  }

  const queue = new Int32Array(total);
  const areas: DetectedArea[] = [];

  for (let start = 0; start < total; start += 1) {
    if (mask[start] === 0) continue;

    let head = 0;
    let tail = 0;
    queue[tail] = start;
    tail += 1;
    mask[start] = 0;

    let area = 0;
    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    while (head < tail) {
      const index = queue[head];
      head += 1;
      area += 1;

      const x = index % width;
      const y = (index - x) / width;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;

      if (x > 0) {
        const next = index - 1;
        if (mask[next] === 1) {
          mask[next] = 0;
          queue[tail] = next;
          tail += 1;
        }
      }
      if (x + 1 < width) {
        const next = index + 1;
        if (mask[next] === 1) {
          mask[next] = 0;
          queue[tail] = next;
          tail += 1;
        }
      }
      if (y > 0) {
        const next = index - width;
        if (mask[next] === 1) {
          mask[next] = 0;
          queue[tail] = next;
          tail += 1;
        }
      }
      if (y + 1 < height) {
        const next = index + width;
        if (mask[next] === 1) {
          mask[next] = 0;
          queue[tail] = next;
          tail += 1;
        }
      }
    }

    const boxWidth = maxX - minX + 1;
    const boxHeight = maxY - minY + 1;
    if (boxWidth < settings.minSide || boxHeight < settings.minSide) continue;
    if (area < settings.minArea) continue;

    // Barcode stripes and other rule lines are long and thin. A redaction
    // bar can be thin too, but it is rarely a 1:3 needle. Skipping these
    // keeps the candidate list usable on documents with barcodes.
    const shortSide = Math.min(boxWidth, boxHeight);
    const longSide = Math.max(boxWidth, boxHeight);
    if (shortSide < 14 && longSide > shortSide * 3) continue;

    const boxArea = boxWidth * boxHeight;
    const fill = area / boxArea;
    if (fill < settings.minFill) continue;
    if (boxArea > total * settings.maxAreaRatio) continue;
    if (boxWidth >= width - 1 && boxHeight >= height - 1) continue;

    let edges = 0;
    if (minX <= 1) edges += 1;
    if (maxX >= width - 2) edges += 1;
    if (minY <= 1) edges += 1;
    if (maxY >= height - 2) edges += 1;
    if (edges >= 4) continue;

    areas.push({ x: minX, y: minY, w: boxWidth, h: boxHeight, fill });
  }

  areas.sort((a, b) => a.y - b.y || a.x - b.x);
  return areas;
}
