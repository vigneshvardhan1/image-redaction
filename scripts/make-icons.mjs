/**
 * Builds the icon set from public/favicon.svg:
 *   - public/apple-touch-icon.png (180x180)
 *   - public/favicon.ico (32x32 and 16x16, PNG compressed)
 *   - public/icon-192.png, public/icon-512.png (PWA "any" icons)
 *   - public/icon-maskable-192.png, public/icon-maskable-512.png (PWA maskable)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';

const svg = readFileSync(resolve('public/favicon.svg'));

// Apple touch icon: the mark inset on a transparent square.
const appleMark = await sharp(svg).resize(140, 140).png().toBuffer();
await sharp({
  create: { width: 180, height: 180, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } },
})
  .composite([{ input: appleMark, top: 20, left: 20 }])
  .png()
  .toFile(resolve('public/apple-touch-icon.png'));

// PWA icons. "Any" keeps the rounded tile on a transparent square; the
// maskable pair is a full-bleed square with the mark inside the safe zone so
// launchers can crop it to whatever shape they use.
for (const size of [192, 512]) {
  await sharp(svg).resize(size, size).png().toFile(resolve(`public/icon-${size}.png`));

  const inset = Math.round(size * 0.22);
  const markSize = size - inset * 2;
  const maskMark = await sharp(svg).resize(markSize, markSize).png().toBuffer();
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 20, g: 20, b: 20, alpha: 1 },
    },
  })
    .composite([{ input: maskMark, top: inset, left: inset }])
    .png()
    .toFile(resolve(`public/icon-maskable-${size}.png`));
}

// Favicon: a PNG-compressed ICO container.
function ico(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  const directory = Buffer.alloc(16 * entries.length);
  let offset = header.length + directory.length;

  entries.forEach((entry, index) => {
    const at = index * 16;
    directory.writeUInt8(entry.size === 256 ? 0 : entry.size, at);
    directory.writeUInt8(entry.size === 256 ? 0 : entry.size, at + 1);
    directory.writeUInt8(0, at + 2);
    directory.writeUInt8(0, at + 3);
    directory.writeUInt16LE(1, at + 4);
    directory.writeUInt16LE(32, at + 6);
    directory.writeUInt32LE(entry.data.length, at + 8);
    directory.writeUInt32LE(offset, at + 12);
    offset += entry.data.length;
  });

  return Buffer.concat([header, directory, ...entries.map((entry) => entry.data)]);
}

const sizes = [16, 32, 48];
const rendered = await Promise.all(
  sizes.map(async (size) => ({
    size,
    data: await sharp(svg).resize(size, size).png().toBuffer(),
  }))
);

writeFileSync(resolve('public/favicon.ico'), ico(rendered));
console.log('wrote public/apple-touch-icon.png and public/favicon.ico');
