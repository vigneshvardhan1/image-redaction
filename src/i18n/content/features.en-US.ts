import type { FeaturesContent } from './types';

export const featuresEnUS: FeaturesContent = {
  meta: {
    title: 'Features — Redact',
    description:
      'On-device PII detection, four redaction styles, verification re-scan, metadata-free exports, keyboard shortcuts, and clearly stated limits.',
    keywords: [
      'image redaction features',
      'on-device ocr redaction',
      'redact image metadata',
      'image redaction shortcuts',
      'verify redaction',
    ],
  },
  hero: {
    eyebrow: 'Features',
    title: 'Serious redaction. No upload ritual.',
    lead: 'Everything you need to remove sensitive details from a screenshot — plus the checks most tools skip, and an honest account of what still needs a human eye.',
    primaryCta: 'Open the editor',
    secondaryCta: 'How privacy works',
  },
  features: [
    {
      icon: 'sparkles',
      title: 'Smart PII detection',
      copy: 'OCR finds emails, card numbers, phones, IDs, addresses, and likely names — on your device.',
    },
    {
      icon: 'scan',
      title: 'All text mode',
      copy: 'Cover every detected line when you would rather not make a judgement call about each one.',
    },
    {
      icon: 'square',
      title: 'Four redaction styles',
      copy: 'Opaque ink, pixelate, blur, or an emoji sticker. Use rectangles or ovals.',
    },
    {
      icon: 'move',
      title: 'Move and resize',
      copy: 'Nudge a box or drag a corner until it covers the edges. Undo and redo are a keystroke away.',
    },
    {
      icon: 'shield-check',
      title: 'Verification re-scan',
      copy: 'Run OCR on the flattened result and flag anything that still reads as sensitive.',
    },
    {
      icon: 'download',
      title: 'Clean exports',
      copy: 'Download PNG, JPG, or WebP — or copy to the clipboard. Metadata stays behind, and the file can be shrunk before you send it.',
    },
  ],
  detection: {
    eyebrow: 'Detection',
    title: 'Find the text before you share it.',
    copy: 'Smart detection reads the screenshot with Tesseract OCR in a Web Worker, then checks each line against patterns for common identifiers. The image is passed to the worker inside the page; it is never part of a network request.',
    cards: [
      {
        title: 'What it looks for',
        copy: 'Emails, Luhn-valid cards, SSNs, Aadhaar, PAN, GSTIN, IBAN, phone numbers, IP addresses, dates, address keywords, and likely names.',
      },
      {
        title: 'What you control',
        copy: 'Every box is included by default only when it matches. Click any box to exclude it, or use All text to cover every line.',
      },
    ],
    cta: 'Try it on a sample',
  },
  styles: {
    eyebrow: 'Styles',
    title: 'Pick the cover that matches the risk.',
    copy: 'Ink is the default for a reason. The softer effects are useful when the detail is context rather than identity.',
  },
  review: {
    eyebrow: 'Review',
    title: 'A second pass, without leaving the tab.',
    copy: 'A redaction is easy to get almost right. Verify re-scans the flattened image for readable PII. Compare flips back to the original so you can see exactly what changed. Undo is there when you spot a mistake.',
    points: [
      {
        icon: 'shield-check',
        title: 'Verify the result, not the preview',
        copy: 'The re-scan runs on the rendered output, so it sees what the exported file will contain.',
      },
      {
        icon: 'eye',
        title: 'Compare without losing your work',
        copy: 'Toggle the original on and off. Your boxes and history stay intact.',
      },
      {
        icon: 'undo',
        title: 'Undo the whole history',
        copy: 'Drawing, moving, resizing, and clearing all join the same undo stack.',
      },
    ],
    panel: {
      title: 'Verification',
      badge: 'Example result',
      okTitle: 'No readable PII found',
      okCopy: 'The flattened image was re-scanned. Give it a final visual check anyway.',
      checks: ['Email patterns', 'Card-number patterns', 'Phone patterns', 'ID and date patterns'],
      matches: '0 matches',
      footnote: 'Best-effort OCR. A clean scan is evidence, not a guarantee.',
    },
    cta: 'Open the editor',
  },
  delivery: {
    eyebrow: 'Delivery',
    title: 'Redact it, then make it small enough to send.',
    copy: 'A redacted screenshot is often still too heavy for a chat, a ticket, or an email. The Size panel measures the real export in your browser: lower the quality for JPG and WebP, cap the longest edge, and read the actual byte count before you download anything.',
    points: [
      {
        icon: 'gauge',
        title: 'A live estimate, not a guess',
        copy: 'The panel encodes the export in your tab and reports the real file size and the percentage saved against the full-size version.',
      },
      {
        icon: 'shrink',
        title: 'Cap the longest edge',
        copy: 'Rescale the flattened result to 2560, 1920, 1280, or 960 px. The scene is scaled as a whole, so every redaction lands exactly where you drew it.',
      },
      {
        icon: 'info',
        title: 'Honest about PNG',
        copy: 'PNG is lossless, so the quality slider is switched off for it. Use the size cap instead — or pick WebP, which is usually far lighter for screenshots.',
      },
    ],
    panel: {
      title: 'Reduce size',
      badge: 'Example result',
      quality: 'Quality',
      qualityValue: '72%',
      qualityNote: 'Applies to JPG and WebP exports. PNG stays lossless.',
      edge: 'Longest edge',
      edgeValue: '1920 px',
      edgeNote: 'Rescales the flattened result. Redactions stay baked in.',
      estimate: 'Estimated export',
      estimateValue: '212 KB · 1920 × 1080',
      estimateNote: '−86% vs 1.5 MB at full size',
    },
    cta: 'Open the size panel',
  },
  proof: {
    eyebrow: 'Proof',
    title: 'See the pixels, not a promise.',
    copy: 'The after image is baked, not layered. Drag the handle and inspect the edge of every bar. If anything is still readable, it is not redacted.',
    primaryCta: 'Try the ID sample',
    secondaryCta: 'Which style is safe?',
  },
  shortcuts: {
    eyebrow: 'Speed',
    title: 'Keep your hands on the keyboard.',
    copy: 'Paste an image from the clipboard, drop one onto the editor, or replace the current file without reloading. Then switch tools and undo without reaching for the mouse.',
    points: [
      'Ctrl / ⌘ + V pastes an image while the editor is in view.',
      'Drag and drop works on the start screen.',
      'Replace the image from the toolbar without losing the page.',
    ],
    panelTitle: 'Shortcuts',
    list: [
      { keys: 'B', action: 'Ink black' },
      { keys: 'P', action: 'Pixelate' },
      { keys: 'L', action: 'Blur' },
      { keys: 'E', action: 'Emoji sticker' },
      { keys: 'R', action: 'Rectangle selection' },
      { keys: 'O', action: 'Oval selection' },
      { keys: 'C', action: 'Compare with the original' },
      { keys: 'Ctrl / ⌘ + Z', action: 'Undo' },
      { keys: 'Ctrl / ⌘ + Shift + Z', action: 'Redo' },
      { keys: 'Delete', action: 'Remove the selected redaction' },
      { keys: 'Esc', action: 'Clear the current selection' },
    ],
  },
  limits: {
    eyebrow: 'Honest limits',
    title: 'What this tool does not do yet.',
    copy: 'A redaction tool should be clear about its blind spots. These are the ones worth knowing before you rely on the output.',
    items: [
      {
        title: 'Faces and machine codes are manual',
        copy: 'Faces, QR codes, barcodes, MRZs, and logos are not detected yet. Draw a box over each one — and check both sides of an ID.',
        badge: 'Manual',
      },
      {
        title: 'Names are best-effort',
        copy: 'Names use a pattern for short, capitalised lines. Unusual names, lowercase handles, and stylised text can slip through.',
        badge: 'Best-effort',
      },
      {
        title: 'One image at a time',
        copy: 'There is no batch queue yet. Replace the image and repeat; each export is independent and metadata-free.',
        badge: 'Not yet',
      },
      {
        title: 'No text annotation',
        copy: 'You cannot add a “for Acme only” label inside the editor. Add context with a separate markup tool, away from the redacted area.',
        badge: 'Not yet',
      },
    ],
    footnote:
      'No automated check can replace a final look at the exported image. When in doubt, use ink and crop more.',
  },
  cta: {
    eyebrow: 'Ready when you are',
    title: 'Use the features, then use your eyes.',
    copy: 'Smart detection saves the first pass. Ink, Verify, and a final look at 100% save the last one.',
    primary: 'Redact an image',
    secondary: 'Read the guides',
    secondaryHref: '/guides',
  },
};
