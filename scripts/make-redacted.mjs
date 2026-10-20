import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve('public/samples');

const jobs = [
  {
    source: 'chat.svg',
    target: 'chat-redacted.svg',
    bars: [
      [150, 52, 190, 28],
      [112, 320, 358, 28],
      [112, 392, 300, 28],
      [112, 544, 628, 28],
      [622, 626, 424, 28],
      [112, 698, 396, 28],
    ],
  },
  {
    source: 'receipt.svg',
    target: 'receipt-redacted.svg',
    bars: [
      [200, 262, 190, 26],
      [200, 628, 410, 26],
      [200, 670, 540, 26],
      [200, 712, 450, 26],
      [200, 744, 180, 26],
      [200, 796, 360, 26],
      [200, 838, 330, 26],
    ],
  },
  {
    source: 'dashboard.svg',
    target: 'dashboard-redacted.svg',
    bars: [
      [64, 790, 135, 24],
      [64, 810, 200, 22],
      [330, 512, 150, 26],
      [630, 512, 220, 26],
      [330, 574, 150, 26],
      [630, 574, 220, 26],
      [330, 636, 150, 26],
      [630, 636, 220, 26],
      [330, 698, 150, 26],
      [630, 698, 220, 26],
      [330, 760, 150, 26],
      [630, 760, 220, 26],
    ],
  },
];

for (const job of jobs) {
  const source = readFileSync(resolve(root, job.source), 'utf8');
  const group = `<g fill="#141414">${job.bars
    .map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`)
    .join('')}</g>`;
  const output = source.replace(/<\/svg>\s*$/, `${group}</svg>`);
  writeFileSync(resolve(root, job.target), output, 'utf8');
  console.log(`wrote ${job.target}`);
}
