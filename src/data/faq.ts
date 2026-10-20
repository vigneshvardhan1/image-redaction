export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'Are my images really never uploaded?',
    answer:
      'Correct. Your browser reads the file, draws it to a local canvas, and keeps it in memory. There is no upload endpoint — you can watch the network tab while you work. Smart detection downloads an OCR engine and an English text model on first use, but the image itself stays in the tab.',
  },
  {
    question: 'Is it free? Do I need an account?',
    answer:
      'It is free, with no account and no watermark. Open the editor and use it. There is no paid export, no credit counter, and no reason to hand over an email address before you start.',
  },
  {
    question: 'Which files can I use?',
    answer:
      'PNG, JPG, WebP, GIF, BMP, and AVIF up to 25 MB. Animated GIFs are flattened to their first frame. Very large images are downscaled to a 5,200 px long edge so the browser stays responsive; the export uses that same size. You can download PNG, JPG, or WebP.',
  },
  {
    question: 'How does smart detection work?',
    answer:
      'It runs Tesseract OCR in a Web Worker inside your browser, then applies pattern checks: emails, Luhn-valid card numbers, SSNs, Aadhaar numbers, PANs, GSTINs, IBANs, phone numbers, IP addresses, dates, address keywords, and likely names. Every finding is a suggestion you can include or exclude. OCR is best-effort, so review the boxes and use Verify.',
  },
  {
    question: 'What is All text mode for?',
    answer:
      'If the scan is not sure whether a line is sensitive — or you simply want everything gone — choose All text. It covers every OCR line instead of only the sensitive matches. It is the bluntest, safest option for a busy screenshot.',
  },
  {
    question: 'Does it work offline?',
    answer:
      'The editor does. Once the page is open, you can keep redacting without a network connection. Smart detection needs the OCR engine and English model on first use; your browser may cache them, but do not rely on that for a first offline run. Manual redactions, copy, and export all work offline.',
  },
  {
    question: 'Can blur or pixelation be reversed?',
    answer:
      'Sometimes, yes. Research has shown that low-resolution or lightly blurred text and faces can be partially reconstructed. Blur is fine for casual context; for card numbers, IDs, addresses, and anything financial, use ink black. Verify re-scans the flattened image for readable text, but no automated check is a guarantee.',
  },
  {
    question: 'Are the redactions permanent in the downloaded file?',
    answer:
      'Yes. The export is a new, flattened image — redactions are pixels, not a removable layer or metadata. But a box only covers what it covers: check the edges, and crop or add another box if a detail peeks out.',
  },
  {
    question: 'Is EXIF and GPS data removed?',
    answer:
      'Yes. Canvas export re-encodes the pixels, so camera metadata, GPS coordinates, device details, and the original file name do not travel with the new file. Screenshots often have no EXIF to begin with; re-encoding also normalises PNG, JPG, and WebP exports.',
  },
  {
    question: 'Can I make the exported file smaller?',
    answer:
      'Yes. The Size panel in the editor measures the real export before you download it: lower the quality for JPG and WebP, or cap the longest edge to resize the flattened image. You see the actual byte count and the percentage saved. PNG is lossless, so quality does not apply to it — use the size cap or choose WebP. Redactions stay baked in either way.',
  },
  {
    question: 'Can it detect faces, QR codes, or every name?',
    answer:
      'Not yet. Faces, QR codes, barcodes, and logos still need manual boxes. Names are detected with a best-effort pattern for short, capitalised lines, so unusual names, lowercase handles, and stylised text can slip through. Verify and a final visual pass are part of the workflow.',
  },
  {
    question: 'Can I redact more than one image at a time?',
    answer:
      'Today the editor works on one image at a time; a batch queue is on the roadmap. For now, use the replace button to load the next image and repeat. Each export is independent.',
  },
];

export const homeFaqs = faqs.slice(0, 9);
