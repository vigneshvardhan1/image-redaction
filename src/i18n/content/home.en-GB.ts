import type { HomeContent } from './types';
import { homeEnUS } from './home.en-US';
import { toBritishEnglish } from './englishVariants';

const base = toBritishEnglish(homeEnUS);

export const homeEnGB: HomeContent = {
  ...base,
  meta: {
    title: 'Image & PDF Redaction Tool — Free, Private, Online | Redact',
    description:
      'Free image and PDF redaction software for UK screenshots and documents. Hide names, emails, card numbers and addresses on your device — no uploads, no account, no watermark.',
    keywords: [
      'image redaction uk',
      'pdf redaction uk',
      'redact image online uk',
      'redact pdf online',
      'redact screenshot',
      'blur sensitive information in image',
      'gdpr image redaction',
      'redact personal data from screenshot',
      'image redaction tool',
    ],
    ogImageAlt: 'Redact — a free image and PDF redaction tool for screenshots and documents',
  },
  hero: {
    ...base.hero,
    lead: 'Redact images and PDFs in your browser: hide names, emails, card numbers and addresses in seconds. Smart detection runs on your device, and every export leaves its metadata behind.',
  },
  detection: {
    ...base.detection,
    copy: 'Smart detection reads the text already visible in your screenshot or on the current PDF page and suggests the lines that look like identifiers. It runs in a Web Worker on your device, so the file never leaves the page.',
  },
  cta: {
    ...base.cta,
    secondary: 'Read the privacy notes',
  },
};
