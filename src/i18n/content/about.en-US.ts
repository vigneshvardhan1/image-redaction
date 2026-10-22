import type { AboutContent } from './types';

export const aboutEnUS: AboutContent = {
  meta: {
    title: 'About — Redact',
    description:
      'Why Redact exists: a free, browser-based redaction tool built so the image or PDF you are trying to protect never has to be uploaded to protect it.',
    keywords: ['about redact', 'private image redaction', 'private pdf redaction', 'browser based redaction tool'],
  },
  hero: {
    eyebrow: 'About',
    title: 'Built so you can share less.',
    lead: 'Redact is a free, browser-based redaction studio built on one rule: the file you are trying to protect should not be uploaded in order to protect it.',
    primaryCta: 'Open the editor',
    secondaryCta: 'Contact us',
  },
  stats: [
    { value: '0', label: 'Files uploaded' },
    { value: '0', label: 'Accounts required' },
    { value: '0', label: 'Trackers or analytics' },
    { value: '100%', label: 'Processing in your browser' },
  ],
  why: {
    eyebrow: 'Why it exists',
    title: 'The upload step was the problem.',
    paragraphs: [
      'Screenshots are how work gets explained now — a support thread, a receipt, an ID, a dashboard, a chat with a delivery address in it. The detail that makes the screenshot useful is often the same detail that should not travel with it.',
      'Most redaction tools start by asking you to upload the exact file you are trying to protect. That never sat right. A tool that removes sensitive details should not collect them first, and a promise to delete the copy tomorrow is still a copy today.',
      'Redact flips the order. Your browser decodes the image — or renders each PDF page — draws it to a local canvas, and bakes the redactions into a new file. There is no upload endpoint. Smart detection downloads an OCR engine, an English model, and a face model, and the PDF engine is self-hosted, but your file is not part of those requests.',
    ],
    emphasis:
      'We are not anti-cloud. We are against the unnecessary step in the middle. When the browser can do the job, the safest place for the file is the place it already is.',
  },
  principles: {
    eyebrow: 'Principles',
    title: 'The rules the product is built on.',
    copy: 'These are not aspirations on a wall. They decide what gets shipped, what gets disclosed, and what gets left out.',
    items: [
      {
        icon: 'monitor',
        title: 'Local by default',
        copy: 'If a feature can run in the tab, it does. There is no upload endpoint, no processing queue, and no temporary bucket to trust.',
      },
      {
        icon: 'alert',
        title: 'Honest about limits',
        copy: 'Face detection is best-effort; QR codes, barcodes, and unusual names still need a manual box. A clean verification scan is evidence, not a guarantee.',
      },
      {
        icon: 'chat',
        title: 'Plain language',
        copy: 'Privacy and legal pages should be readable without a translator. Where a term is unavoidable, it gets an explanation.',
      },
      {
        icon: 'shield',
        title: 'No account, no profile',
        copy: 'No sign-in, no email wall, no usage history. The editor does not know who you are, and there is nothing to export about you.',
      },
      {
        icon: 'zap',
        title: 'Free without a catch',
        copy: 'No watermark, no export credit, no paid upgrade for the safe option. Ink black — the strongest style — costs nothing.',
      },
      {
        icon: 'code',
        title: 'Inspectable claims',
        copy: 'The Network tab is the receipt. The privacy page explains exactly what to check and what you should see when you check it.',
      },
    ],
  },
  how: {
    eyebrow: 'How it works',
    title: 'Three steps, none of them a server.',
    copy: 'The whole workflow fits in one tab. The only optional downloads are the OCR and face models used by detection and the PDF engine used for PDFs.',
    cta: 'See the data flow',
    steps: [
      {
        number: '01',
        title: 'Drop or paste a file',
        copy: 'The browser reads the image or PDF locally. PNG, JPG, WebP, GIF, BMP, AVIF, and PDF up to 100 pages are supported.',
        icon: 'image',
      },
      {
        number: '02',
        title: 'Cover what matters',
        copy: 'Smart detect suggests likely PII and Detect faces suggests faces on the current page. Draw over anything the scans miss. Ink is the default.',
        icon: 'square',
      },
      {
        number: '03',
        title: 'Verify and export',
        copy: 'Re-scan the flattened result, compare it with the original, then download a metadata-free image or a flattened PDF.',
        icon: 'shield-check',
      },
    ],
  },
  stack: {
    eyebrow: 'Under the hood',
    title: 'Small stack. No hidden service.',
    copy: 'The site is static HTML, CSS, and JavaScript. There is no backend that receives files, no analytics SDK, and no advertising code. The pieces that do the work are ordinary web APIs and open-source software.',
    note: 'Smart detection and PDF support are the features that fetch extra code after the page loads. They load Tesseract.js, language data, MediaPipe’s face model, and the self-hosted PDF engine; your file stays in the tab.',
    items: [
      { label: 'Astro', value: 'Static pages and components' },
      { label: 'Canvas API', value: 'Local decoding, redaction, and export' },
      { label: 'Tesseract.js', value: 'Optional OCR in a Web Worker' },
      { label: 'MediaPipe', value: 'Optional face detection in the tab' },
      { label: 'PDF.js', value: 'Self-hosted local PDF rendering' },
      { label: 'pdf-lib', value: 'Flattened PDF assembly in the tab' },
      { label: 'Inter', value: 'Self-hosted type, served from this site' },
    ],
  },
  limits: {
    eyebrow: 'Honest limits',
    title: 'What Redact is not.',
    items: [
      {
        title: 'Not a compliance certificate',
        copy: 'A redacted image does not prove that a document meets a privacy law, a court order, or an internal policy.',
      },
      {
        title: 'Not legal advice',
        copy: 'The guides explain practical redaction. They are not a substitute for a lawyer or a data protection officer.',
      },
      {
        title: 'Not a full editor',
        copy: 'There are no layers, text annotations, batch exports, or PDF page reordering yet. It is a focused tool for covering things.',
      },
      {
        title: 'Not infallible',
        copy: 'OCR is best-effort, and a box only covers what it covers. Always look at the exported file before sharing it.',
      },
    ],
    footnote:
      'Those limits are the reason verification and a final visual check are part of the workflow, not an optional extra.',
  },
  cta: {
    eyebrow: 'Use it for what it is',
    title: 'Share the screenshot. Not the secrets.',
    copy: 'The editor is free, local, and open to inspection. Load an image or PDF, cover what should not travel with it, and check the export before you send it.',
    primary: 'Redact a file',
    secondary: 'Talk to us',
    secondaryHref: '/contact',
  },
};
