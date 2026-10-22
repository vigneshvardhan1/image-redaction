/**
 * Copies the static runtime assets PDF.js needs (CMaps, standard fonts, ICC
 * profiles, WASM decoders, and the worker) into `public/pdfjs/` so PDF support
 * stays fully self-hosted. The site promises that documents never leave the
 * browser — an asset CDN would undermine that promise.
 *
 * Run after upgrading pdfjs-dist: `npm run pdfjs-assets`.
 */
import { cp, copyFile, mkdir, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const packageRoot = dirname(require.resolve('pdfjs-dist/package.json'));
const destination = join(process.cwd(), 'public', 'pdfjs');

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });

for (const folder of ['cmaps', 'standard_fonts', 'wasm', 'iccs']) {
  await cp(join(packageRoot, folder), join(destination, folder), { recursive: true });
}

await copyFile(
  join(packageRoot, 'build', 'pdf.worker.min.mjs'),
  join(destination, 'pdf.worker.min.mjs')
);

// Apache-2.0 requires the licence to travel with the redistributed runtime.
await copyFile(join(packageRoot, 'LICENSE'), join(destination, 'LICENSE'));

console.log('Copied PDF.js runtime assets to public/pdfjs/');
