export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'Are my images really never uploaded?',
    answer:
      'Correct. Your browser reads the file, draws it to a local canvas, and keeps it in memory. There is no upload endpoint — you can watch the network tab while you work. Smart detection downloads an OCR engine, an English text model, and a face model on first use, but the image itself stays in the tab.',
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
      'Text detection runs Tesseract OCR in a Web Worker inside your browser, then applies pattern checks: emails, Luhn-valid card numbers, SSNs, Aadhaar numbers, PANs, GSTINs, IBANs, phone numbers, IP addresses, dates, address keywords, and likely names. Detect faces uses MediaPipe’s BlazeFace model, also on-device, to propose boxes around faces. Every finding is a suggestion you can include or exclude. Both detectors are best-effort, so review the boxes and use Verify.',
  },
  {
    question: 'What is All text mode for?',
    answer:
      'If the scan is not sure whether a line is sensitive — or you simply want everything gone — choose All text. It covers every OCR line instead of only the sensitive matches. It is the bluntest, safest option for a busy screenshot.',
  },
  {
    question: 'Does it work offline?',
    answer:
      'The editor does. Once the page is open, you can keep redacting without a network connection. Smart detection needs the OCR engine, English model, and face model on first use; your browser may cache them, but do not rely on that for a first offline run. Manual redactions, copy, and export all work offline.',
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
      'Often, yes — Detect faces runs an on-device face model and proposes a padded box around each face it finds. It is best-effort: small, turned-away, partly hidden, or illustrated faces can be missed, so review every box. QR codes, barcodes, MRZs, and logos still need manual boxes. Names use a best-effort pattern for short, capitalised lines, so unusual names, lowercase handles, and stylised text can slip through. Verify and a final visual pass are part of the workflow.',
  },
  {
    question: 'Can I redact more than one image at a time?',
    answer:
      'Today the editor works on one image at a time; a batch queue is on the roadmap. For now, use the replace button to load the next image and repeat. Each export is independent.',
  },
  {
    question: 'Can I redact a PDF?',
    answer:
      'Yes. Drop or choose a PDF up to 50 MB and 100 pages. Every page opens in the same editor with its own redaction history, and Smart detect, Detect faces, and Verify run on the page you are viewing. On export, each page is re-rendered as an image into a new PDF, so the original text layer, links, form fields, and metadata are removed. The exported PDF is not searchable or selectable.',
  },
];

/**
 * Homepage FAQ, ordered around the questions people actually search for.
 * Keep the visible copy and the FAQPage JSON-LD generated from this array in
 * sync — search engines expect structured data to match the page.
 */
export const homeFaqs: FaqItem[] = [
  {
    question: 'What redaction styles are available?',
    answer:
      'Redact has four image redaction styles: ink black, pixelate, blur, and emoji sticker. Ink black replaces the area with opaque pixels and is the safest choice for names, card numbers, IDs, addresses, QR codes, and anything financial. Pixelate and blur are softer options for faces and casual screenshots, while the emoji sticker paints an opaque plate and drops an emoji on top. All four work with rectangle or oval selections.',
  },
  {
    question: 'Is this redaction truly permanent?',
    answer:
      'Yes — in the file you download. The export is a new, flattened image, so redactions are baked into the pixels rather than saved as a removable layer, mask, or metadata tag. The original image on your device is left untouched. For details that must never be recovered, use ink black instead of blur or pixelation, and check the edges before you share the file.',
  },
  {
    question: 'Can someone undo the redaction?',
    answer:
      'Not in the exported image. The download contains no hidden layer, undo history, or original pixels, and canvas re-encoding removes EXIF and GPS metadata. Blur and pixelation deserve more caution: research has shown that lightly obscured text and faces can sometimes be partially reconstructed. Ink black removes the underlying pixels entirely, which is why it is the recommended style for identity and financial data.',
  },
  {
    question: 'How can I redact an image?',
    answer:
      'Open the Redact editor and drop, paste, or choose an image. Run Smart detect to find likely sensitive text, or Detect faces to box every face on the page — then draw a rectangle or oval over anything they miss. Pick a redaction style and adjust the box edges. Use Verify to re-scan the flattened result, then download a PNG, JPG, or WebP. Everything runs in your browser, and the image is never uploaded.',
  },
  {
    question: 'Does it detect faces?',
    answer:
      'Yes. Detect faces runs MediaPipe’s BlazeFace model inside your browser and suggests a padded box around each face. Nothing is uploaded, and the model is fetched once. It works best on clear, front-facing faces in photos; small, turned-away, heavily covered, or illustrated faces can be missed, so review the boxes. Your current redaction style is applied when you accept them.',
  },
  {
    question: 'Can I undo a redaction after drawing it?',
    answer:
      'Yes, while you are still editing. Use the Undo button or Ctrl/Cmd + Z to step back, Redo to restore a change, or select a box and press Delete to remove it. The undo history exists only in the current browser tab and is cleared when you close or reload the page. After you export, the redaction is flattened into the new image and cannot be undone in that file.',
  },
  {
    question: 'What image formats are supported?',
    answer:
      'You can redact PNG, JPG, WebP, GIF, BMP, and AVIF images up to 25 MB. Animated GIFs are flattened to their first frame, and very large images are scaled to a 5,200 px long edge so the editor stays responsive. Redacted images can be exported as PNG, JPG, or WebP, with no EXIF or GPS metadata.',
  },
  {
    question: 'Can I redact a PDF, not just an image?',
    answer:
      'Yes. Open a PDF up to 50 MB and 100 pages, scroll through the page stack, and redact each one. Smart detection, Detect faces, and Verify work on the page you are viewing. Export rebuilds every page as an image inside a new PDF, so the text layer, links, form fields, and metadata do not survive. That also means the exported PDF is not searchable.',
  },
  {
    question: 'Will you have access to my image?',
    answer:
      'No. Your browser reads the image and draws it to a local canvas inside your tab. There is no upload endpoint, so the file is never sent to a server, stored, logged, or reviewed by us. Smart detection downloads an OCR engine, an English model, and a face model on first use, but your image is not part of that request. You can confirm both claims in your browser’s Network tab.',
  },
  {
    question: 'Can I redact things other than faces?',
    answer:
      'Yes. You can cover anything visible in an image: faces, names, email addresses, phone numbers, card numbers, ID numbers, addresses, QR codes, barcodes, logos, account names, and more. Smart detection automatically suggests text that looks like emails, card numbers, phone numbers, government IDs, addresses, and dates, and Detect faces suggests faces. QR codes, barcodes, MRZs, and logos still need a manual box.',
  },
  {
    question: 'Does Redact use cookies or track me?',
    answer:
      'Only a functional one. Redact has no analytics, advertising pixels, or third-party trackers, and your image is never uploaded. The one cookie stores your light/dark theme preference, alongside a local-storage copy, so the page does not flash the wrong theme on your next visit. It contains no personal data, is never sent to a server, and can be cleared in your browser settings at any time.',
  },
];

/** Build a schema.org FAQPage node from the same items rendered on the page. */
export function buildFaqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
