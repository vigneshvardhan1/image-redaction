import type { PrivacyContent } from './types';

export const privacyEnUS: PrivacyContent = {
  meta: {
    title: 'Privacy — Redact',
    description:
      'Your screenshot is never uploaded. See exactly what runs in your browser, the one disclosed CDN request used for optional OCR, and how to verify the claims yourself.',
    keywords: [
      'image redaction privacy',
      'browser based image redaction',
      'no upload image editor',
      'verify no upload',
    ],
  },
  hero: {
    eyebrow: 'Privacy',
    title: 'The image never leaves this tab.',
    lead: 'Not after processing. Not for moderation. Not as an anonymous analytics event. Your browser reads the file, redacts it, and writes a new one.',
    primaryCta: 'Open the editor',
    secondaryCta: 'Verify it yourself',
  },
  policyNotice:
    'This page explains how the editor handles your image. For the formal policy — cookies, hosting logs, and your rights — read the Privacy Policy.',
  badges: ['No image uploads', 'No account', 'No analytics', 'No tracking cookies'],
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
        copy: 'The image is drawn to an in-memory canvas. This is the same canvas API every image editor uses.',
      },
      {
        icon: 'square',
        title: 'You draw the boxes',
        copy: 'Redactions are drawn over the local pixels. Undo history lives in JavaScript memory, not a database.',
      },
      {
        icon: 'download',
        title: 'Canvas exports a new image',
        copy: 'The download is a fresh file encoded from the canvas. It carries no EXIF, GPS, or device metadata.',
      },
    ],
    noServerTitle: 'No server in the middle.',
    noServerCopy: 'There is no endpoint to receive an image, so there is nothing to retain, log, moderate, or sell. Closing the tab clears the working copy from memory.',
    requestLabel: 'Illustrative request',
    requestText: 'POST /upload',
    requestResult: '→ 404 Not Found',
    requestNote: 'No such endpoint exists on imageredaction.com.',
  },
  network: {
    eyebrow: 'Network requests',
    title: 'The honest list.',
    copy: 'Smart detection is optional, and it is the only feature that needs to fetch code after the page loads. Here is every request the editor can make.',
    columns: { request: 'Request', when: 'When', contains: 'What it contains' },
    rows: [
      {
        request: 'This page and its font',
        when: 'When you open the site',
        contains: 'HTML, CSS, JavaScript, and the self-hosted Inter font. No image.',
      },
      {
        request: 'Tesseract.js',
        when: 'First time you run Smart detect',
        contains: 'The OCR library from jsDelivr. No image.',
      },
      {
        request: 'OCR core and English model',
        when: 'First Smart detect in a browser',
        contains: 'WebAssembly and language data requested by Tesseract.js. No image.',
      },
      {
        request: 'Your screenshot',
        when: 'Never',
        contains: 'Nothing. There is no upload endpoint to receive it.',
        never: true,
      },
    ],
    whenLabel: 'When:',
    noteTitle: 'What “on-device” means here',
    noteCopy:
      'The OCR engine is downloaded code, and the recognition runs inside your browser. Your image is not sent with the request. The static host and the CDN may keep ordinary access logs for the requests that do happen, as any website or CDN does. Those logs contain the request URL, not your screenshot.',
  },
  verify: {
    eyebrow: 'Verify it yourself',
    title: 'Do not take the page’s word for it.',
    copy: 'The claim is testable in about two minutes. If you find a request that contains your image, that is a bug worth reporting.',
    cta: 'Report a problem',
    steps: [
      'Open your browser’s developer tools and switch to the Network tab. Clear the list.',
      'Load an image and draw a few boxes. Watch the request list: no image request appears.',
      'Run Smart detect. You will see requests for the OCR library and model. The screenshot is not among them.',
      'Disconnect from the internet. Manual redaction, copy, and download still work because the pixels are already local.',
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
      copy: 'The editor is plain JavaScript and canvas. There is no hidden native layer. Use the network tab, read the request list, and test the offline behaviour.',
    },
  ],
  faq: {
    eyebrow: 'Privacy questions',
    title: 'The short version, repeated.',
    copy: 'The same answers as the FAQ, focused on where the image goes and what leaves the page.',
  },
  cta: {
    eyebrow: 'See for yourself',
    title: 'Bring an image. Watch the network tab.',
    copy: 'The editor is the proof. Load a screenshot, redact it, export it, and inspect the file. Nothing needs to leave the tab.',
    primary: 'Open the editor',
    secondary: 'Read the guides',
    secondaryHref: '/guides',
  },
};
