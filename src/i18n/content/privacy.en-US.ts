import type { PrivacyContent } from './types';

export const privacyEnUS: PrivacyContent = {
  meta: {
    title: 'Privacy — Redact',
    description:
      'Your image or PDF is never uploaded. See exactly what runs in your browser, the disclosed OCR and PDF requests, and how to verify the claims yourself.',
    keywords: [
      'image redaction privacy',
      'pdf redaction privacy',
      'browser based image redaction',
      'no upload image editor',
      'verify no upload',
    ],
  },
  hero: {
    eyebrow: 'Privacy',
    title: 'The file never leaves this tab.',
    lead: 'Not after processing. Not for moderation. Not as an anonymous analytics event. Your browser reads the file — image or PDF — redacts it, and writes a new one.',
    primaryCta: 'Open the editor',
    secondaryCta: 'Verify it yourself',
  },
  policyNotice:
    'This page explains how the editor handles your file. For the formal policy — cookies, hosting logs, and your rights — read the Privacy Policy.',
  badges: ['No image or PDF uploads', 'No account', 'One functional cookie', 'Ads only with consent'],
  flow: {
    eyebrow: 'Data flow',
    title: 'The whole trip happens inside the page.',
    copy: 'There is no processing queue, no temporary bucket, and no “we delete it after 24 hours” promise to trust. The file is decoded by your browser.',
    localTitle: 'In this browser tab',
    localBadge: 'Local only',
    steps: [
      {
        icon: 'file',
        title: 'You choose a file',
        copy: 'A file picker, a paste, or a drop. The browser creates a local object URL — no request leaves the page.',
      },
      {
        icon: 'monitor',
        title: 'The browser decodes it',
        copy: 'An image is drawn to an in-memory canvas; PDF pages are rendered one at a time by the bundled PDF engine. No file data is sent anywhere.',
      },
      {
        icon: 'square',
        title: 'You draw the boxes',
        copy: 'Redactions are drawn over the local pixels. Undo history lives in JavaScript memory, not a database.',
      },
      {
        icon: 'download',
        title: 'The editor exports a new file',
        copy: 'Image exports are re-encoded from the canvas; PDF exports are rebuilt page by page as images. Neither carries the original EXIF, GPS, or document metadata.',
      },
    ],
    noServerTitle: 'No server in the middle.',
    noServerCopy: 'There is no endpoint to receive a file, so there is nothing to retain, log, moderate, or sell. Closing the tab clears the working copy from memory.',
    requestLabel: 'Illustrative request',
    requestText: 'POST /upload',
    requestResult: '→ 404 Not Found',
    requestNote: 'No such endpoint exists on imageredaction.com.',
  },
  network: {
    eyebrow: 'Network requests',
    title: 'The honest list.',
    copy: 'The editor loads its core code up front. Smart detection and PDF support fetch extra code only when you use them. Here is every request the editor can make.',
    columns: { request: 'Request', when: 'When', contains: 'What it contains' },
    rows: [
      {
        request: 'This page and its font',
        when: 'When you open the site',
        contains: 'HTML, CSS, JavaScript, and the self-hosted Inter font. No file data.',
      },
      {
        request: 'Google AdSense (when enabled)',
        when: 'After the page loads, if advertising is configured',
        contains:
          'The ad script, ad units, and consent signals. It may set or read cookies after you accept the consent banner. No file data.',
      },
      {
        request: 'Tesseract.js',
        when: 'First time you run Smart detect',
        contains: 'The OCR library from jsDelivr. No file data.',
      },
      {
        request: 'OCR core and English model',
        when: 'First Smart detect in a browser',
        contains: 'WebAssembly and language data requested by Tesseract.js. No file data.',
      },
      {
        request: 'MediaPipe face detector',
        when: 'First time you run Detect faces',
        contains: 'The face detection library and WebAssembly runtime from jsDelivr. No file data.',
      },
      {
        request: 'BlazeFace model',
        when: 'First Detect faces in a browser',
        contains: 'A small face-detection model from Google Cloud Storage. No file data.',
      },
      {
        request: 'PDF engine and assets',
        when: 'First time you open a PDF',
        contains: 'The self-hosted PDF.js worker, fonts, and WebAssembly modules. No file data.',
      },
      {
        request: 'Your image or PDF',
        when: 'Never',
        contains: 'Nothing. There is no upload endpoint to receive it.',
        never: true,
      },
    ],
    whenLabel: 'When:',
    noteTitle: 'What “on-device” means here',
    noteCopy:
      'The OCR engine, face detector, and PDF support are downloaded code, and all recognition, detection, and rendering run inside your browser. Your file is not sent with those requests. The static host, the CDN, and Google Cloud Storage may keep ordinary access logs for the requests that do happen, as any website or CDN does. Those logs contain the request URL, not your file.',
  },
  verify: {
    eyebrow: 'Verify it yourself',
    title: 'Do not take the page’s word for it.',
    copy: 'The claim is testable in about two minutes. If you find a request that contains your file, that is a bug worth reporting.',
    cta: 'Report a problem',
    steps: [
      'Open your browser’s developer tools and switch to the Network tab. Clear the list.',
      'Load an image or PDF and draw a few boxes. Watch the request list: no upload request appears.',
      'Run Smart detect or Detect faces, or open a PDF. You will see requests for the OCR, face, or PDF engine. Your file is not among them.',
      'Check the full request list for an upload. The only requests are for code, fonts, models, and — if advertising is enabled — Google AdSense. Your file is never among them.',
      'Open the downloaded file’s properties. There is no camera, GPS, or device metadata field to find.',
    ],
  },
  cards: [
    {
      icon: 'monitor',
      title: 'Your device, your responsibility',
      copy: 'Browser extensions, clipboard managers, and screen-recording tools can read what happens in a tab. If your threat model includes a compromised browser, use a clean profile or a separate device.',
    },
    {
      icon: 'shield',
      title: 'No account, no profile',
      copy: 'There is no sign-in, no email capture, and no per-user storage. The editor has no idea who you are. That is also why there is no usage history to export.',
    },
    {
      icon: 'code',
      title: 'Open to inspection',
      copy: 'The editor is plain JavaScript and canvas. There is no hidden native layer. Use the network tab, read the request list, and watch what the page fetches.',
    },
  ],
  faq: {
    eyebrow: 'Privacy questions',
    title: 'The short version, repeated.',
    copy: 'The same answers as the FAQ, focused on where the file goes and what leaves the page.',
  },
  cta: {
    eyebrow: 'See for yourself',
    title: 'Bring a file. Watch the network tab.',
    copy: 'The editor is the proof. Load a screenshot or PDF, redact it, export it, and inspect the file. Nothing needs to leave the tab.',
    primary: 'Open the editor',
    secondary: 'Read the guides',
    secondaryHref: '/guides',
  },
};
