import type { AboutContent } from './types';
import { aboutEnUS } from './about.en-US';
import { toBritishEnglish } from './englishVariants';

const base = toBritishEnglish(aboutEnUS);

export const aboutEnIN: AboutContent = {
  ...base,
  meta: {
    title: 'About — Redact',
    description:
      'Why Redact exists: a free, browser-based redaction tool built so the screenshot you are trying to protect — Aadhaar, PAN, receipts or chats — never has to be uploaded to protect it.',
    keywords: ['about redact', 'private image redaction india', 'dpdp friendly redaction tool'],
  },
};
