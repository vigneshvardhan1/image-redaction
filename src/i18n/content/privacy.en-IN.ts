import type { PrivacyContent } from './types';
import { privacyEnUS } from './privacy.en-US';
import { toBritishEnglish } from './englishVariants';

const base = toBritishEnglish(privacyEnUS);

export const privacyEnIN: PrivacyContent = {
  ...base,
  meta: {
    title: 'Privacy — Redact',
    description:
      'Your Aadhaar, PAN or screenshot is never uploaded. See exactly what runs in your browser, the one disclosed CDN request used for optional OCR, and how to verify the claims yourself.',
    keywords: [
      'image redaction privacy india',
      'dpdp act screenshot redaction',
      'browser based image redaction',
      'no upload image editor',
    ],
  },
};
