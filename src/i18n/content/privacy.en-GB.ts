import type { PrivacyContent } from './types';
import { privacyEnUS } from './privacy.en-US';
import { toBritishEnglish } from './englishVariants';

const base = toBritishEnglish(privacyEnUS);

export const privacyEnGB: PrivacyContent = {
  ...base,
  meta: {
    title: 'Privacy — Redact',
    description:
      'Your image or PDF is never uploaded. See exactly what runs in your browser, the disclosed OCR and PDF requests, and how to verify the claims yourself.',
    keywords: [
      'image redaction privacy uk',
      'pdf redaction privacy uk',
      'gdpr screenshot redaction',
      'browser based image redaction',
      'no upload image editor',
    ],
  },
};
