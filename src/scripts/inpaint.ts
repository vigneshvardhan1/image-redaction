import type { PixelImage } from './redaction-detect';

export interface RepairArea {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Rect {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

/**
 * Rebuilds the selected rectangles from the pixels immediately around them.
 *
 * This is a boundary-interpolation fill, not magic. It works well for flat
 * backgrounds, documents, and UI chrome. On a photograph it produces a soft
 * smear, because the pixels that were under an opaque bar no longer exist.
 *
 * All selected rectangles are masked first, so one repair never samples
 * another bar that is also about to be removed.
 */
export function inpaintAreas(image: PixelImage, areas: RepairArea[], padding = 2): number {
  const { width, height, data } = image;
  if (!width || !height || areas.length === 0) return 0;

  const mask = new Uint8Array(width * height);
  const rects: Rect[] = [];

  for (const area of areas) {
    const x0 = Math.max(0, Math.floor(area.x - padding));
    const y0 = Math.max(0, Math.floor(area.y - padding));
    const x1 = Math.min(width - 1, Math.ceil(area.x + area.w + padding) - 1);
    const y1 = Math.min(height - 1, Math.ceil(area.y + area.h + padding) - 1);
    if (x1 <= x0 || y1 <= y0) continue;

    rects.push({ x0, y0, x1, y1 });
    for (let y = y0; y <= y1; y += 1) {
      mask.fill(1, y * width + x0, y * width + x1 + 1);
    }
  }

  if (rects.length === 0) return 0;

  let fallback: [number, number, number] | null = null;

  for (const rect of rects) {
    const { x0, y0, x1, y1 } = rect;
    const rectWidth = x1 - x0 + 1;
    const top = new Int32Array(rectWidth);
    const bottom = new Int32Array(rectWidth);
    top.fill(-1);
    bottom.fill(-1);

    // Find the nearest unmasked pixel above and below every column.
    for (let x = x0; x <= x1; x += 1) {
      let y = y0 - 1;
      while (y >= 0 && mask[y * width + x] === 1) y -= 1;
      if (y >= 0) top[x - x0] = y;

      y = y1 + 1;
      while (y < height && mask[y * width + x] === 1) y += 1;
      if (y < height) bottom[x - x0] = y;
    }

    for (let y = y0; y <= y1; y += 1) {
      const rowOffset = y * width;

      let leftX = x0 - 1;
      while (leftX >= 0 && mask[rowOffset + leftX] === 1) leftX -= 1;
      let rightX = x1 + 1;
      while (rightX < width && mask[rowOffset + rightX] === 1) rightX += 1;

      const hasLeft = leftX >= 0;
      const hasRight = rightX < width;
      const hasHorizontal = hasLeft || hasRight;
      const leftOffset = hasLeft ? (rowOffset + leftX) * 4 : -1;
      const rightOffset = hasRight ? (rowOffset + rightX) * 4 : -1;

      for (let x = x0; x <= x1; x += 1) {
        let horizontalRed = 0;
        let horizontalGreen = 0;
        let horizontalBlue = 0;

        if (hasHorizontal) {
          if (hasLeft && hasRight) {
            const t = (x - leftX) / (rightX - leftX);
            horizontalRed = data[leftOffset] + (data[rightOffset] - data[leftOffset]) * t;
            horizontalGreen =
              data[leftOffset + 1] + (data[rightOffset + 1] - data[leftOffset + 1]) * t;
            horizontalBlue =
              data[leftOffset + 2] + (data[rightOffset + 2] - data[leftOffset + 2]) * t;
          } else if (hasLeft) {
            horizontalRed = data[leftOffset];
            horizontalGreen = data[leftOffset + 1];
            horizontalBlue = data[leftOffset + 2];
          } else {
            horizontalRed = data[rightOffset];
            horizontalGreen = data[rightOffset + 1];
            horizontalBlue = data[rightOffset + 2];
          }
        }

        const topY = top[x - x0];
        const bottomY = bottom[x - x0];
        const hasTop = topY >= 0;
        const hasBottom = bottomY >= 0;
        const hasVertical = hasTop || hasBottom;

        let verticalRed = 0;
        let verticalGreen = 0;
        let verticalBlue = 0;

        if (hasVertical) {
          if (hasTop && hasBottom) {
            const t = (y - topY) / (bottomY - topY);
            const topOffset = (topY * width + x) * 4;
            const bottomOffset = (bottomY * width + x) * 4;
            verticalRed = data[topOffset] + (data[bottomOffset] - data[topOffset]) * t;
            verticalGreen = data[topOffset + 1] + (data[bottomOffset + 1] - data[topOffset + 1]) * t;
            verticalBlue = data[topOffset + 2] + (data[bottomOffset + 2] - data[topOffset + 2]) * t;
          } else if (hasTop) {
            const offset = (topY * width + x) * 4;
            verticalRed = data[offset];
            verticalGreen = data[offset + 1];
            verticalBlue = data[offset + 2];
          } else {
            const offset = (bottomY * width + x) * 4;
            verticalRed = data[offset];
            verticalGreen = data[offset + 1];
            verticalBlue = data[offset + 2];
          }
        }

        let red: number;
        let green: number;
        let blue: number;

        if (hasHorizontal && hasVertical) {
          const horizontalDistance = Math.min(
            hasLeft ? x - leftX : Number.POSITIVE_INFINITY,
            hasRight ? rightX - x : Number.POSITIVE_INFINITY
          );
          const verticalDistance = Math.min(
            hasTop ? y - topY : Number.POSITIVE_INFINITY,
            hasBottom ? bottomY - y : Number.POSITIVE_INFINITY
          );
          const horizontalWeight = 1 / (horizontalDistance + 1);
          const verticalWeight = 1 / (verticalDistance + 1);
          const totalWeight = horizontalWeight + verticalWeight;

          red = (horizontalRed * horizontalWeight + verticalRed * verticalWeight) / totalWeight;
          green =
            (horizontalGreen * horizontalWeight + verticalGreen * verticalWeight) / totalWeight;
          blue = (horizontalBlue * horizontalWeight + verticalBlue * verticalWeight) / totalWeight;
        } else if (hasHorizontal) {
          red = horizontalRed;
          green = horizontalGreen;
          blue = horizontalBlue;
        } else if (hasVertical) {
          red = verticalRed;
          green = verticalGreen;
          blue = verticalBlue;
        } else {
          fallback ??= averageSurroundingColor(data, mask);
          [red, green, blue] = fallback;
        }

        const offset = (rowOffset + x) * 4;
        data[offset] = red;
        data[offset + 1] = green;
        data[offset + 2] = blue;
        data[offset + 3] = 255;
      }
    }
  }

  return rects.length;
}

function averageSurroundingColor(
  data: Uint8ClampedArray,
  mask: Uint8Array
): [number, number, number] {
  let red = 0;
  let green = 0;
  let blue = 0;
  let count = 0;
  const total = mask.length;
  const step = Math.max(1, Math.floor(total / 40000));
  for (let pixel = 0; pixel < total; pixel += step) {
    if (mask[pixel] === 1) continue;
    const offset = pixel * 4;
    red += data[offset];
    green += data[offset + 1];
    blue += data[offset + 2];
    count += 1;
  }
  if (count === 0) return [255, 255, 255];
  return [red / count, green / count, blue / count];
}
