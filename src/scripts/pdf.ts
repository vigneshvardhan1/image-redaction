import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

/**
 * PDF support is loaded lazily. The reader (PDF.js), the writer (pdf-lib), and
 * their runtime assets are only fetched when someone actually opens a PDF, so
 * the image editor keeps its small first-load footprint.
 */
let pdfjsPromise: Promise<typeof import('pdfjs-dist')> | null = null;

export const PDF_EDIT_MAX_EDGE = 1800;
export const PDF_EXPORT_MAX_EDGE = 2400;
export const PDF_EXPORT_SCALE = 2.5;

export interface OpenedPdf {
  document: PDFDocumentProxy;
  /** Releases the PDF.js worker and parsed page data. */
  destroy: () => Promise<void>;
}

export async function openPdf(data: Uint8Array): Promise<OpenedPdf> {
  if (!pdfjsPromise) {
    pdfjsPromise = import('pdfjs-dist').then((pdfjs) => {
      // Self-hosted worker and runtime assets. A CDN would mean a network
      // request while a private document is open.
      pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';
      return pdfjs;
    });
  }

  const pdfjs = await pdfjsPromise;
  const loadingTask = pdfjs.getDocument({
    data,
    cMapUrl: '/pdfjs/cmaps/',
    cMapPacked: true,
    iccUrl: '/pdfjs/iccs/',
    standardFontDataUrl: '/pdfjs/standard_fonts/',
    wasmUrl: '/pdfjs/wasm/',
  });
  const document = await loadingTask.promise;
  return { document, destroy: () => loadingTask.destroy() };
}

export function pageScale(size: { width: number; height: number }, maxEdge: number, cap = 2): number {
  return Math.min(cap, maxEdge / Math.max(size.width, size.height));
}

/** Renders one PDF page into a white, opaque canvas. */
export async function renderPdfPage(
  page: PDFPageProxy,
  canvas: HTMLCanvasElement,
  scale: number
): Promise<{ width: number; height: number }> {
  const viewport = page.getViewport({ scale });
  canvas.width = Math.max(1, Math.round(viewport.width));
  canvas.height = Math.max(1, Math.round(viewport.height));

  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas is unavailable in this browser');

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvas, canvasContext: context, viewport }).promise;
  return { width: canvas.width, height: canvas.height };
}

export function canvasToJpeg(canvas: HTMLCanvasElement, quality = 0.92): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Could not encode the PDF page'));
          return;
        }
        blob
          .arrayBuffer()
          .then((buffer) => resolve(new Uint8Array(buffer)))
          .catch(reject);
      },
      'image/jpeg',
      quality
    );
  });
}

export interface PdfImagePage {
  data: Uint8Array;
  /** Page size in PDF points. */
  width: number;
  height: number;
}

/**
 * Builds the export. Every page is an image, so no original text, links, form
 * fields, or metadata survive the round trip.
 */
export async function buildPdf(pages: PdfImagePage[]): Promise<Blob> {
  const { PDFDocument } = await import('pdf-lib');
  // No producer, author, or timestamp fields: the export should carry no
  // document metadata at all, not even the library's defaults.
  const output = await PDFDocument.create({ updateMetadata: false });

  for (const item of pages) {
    const image = await output.embedJpg(item.data);
    const page = output.addPage([item.width, item.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: item.width,
      height: item.height,
    });
  }

  const bytes = await output.save();
  return new Blob([new Uint8Array(bytes)], { type: 'application/pdf' });
}
