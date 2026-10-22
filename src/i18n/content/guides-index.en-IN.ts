import type { GuidesIndexContent } from './types';
import { guidesIndexEnUS } from './guides-index.en-US';
import { toBritishEnglish } from './englishVariants';

const base = toBritishEnglish(guidesIndexEnUS);

export const guidesIndexEnIN: GuidesIndexContent = {
  ...base,
  meta: {
    ...base.meta,
    description:
      'Practical guides to redacting screenshots, Aadhaar and PAN cards, receipts and work dashboards. Learn which redaction style is safe and how to verify your own work.',
    keywords: [
      'how to redact aadhaar card',
      'redact pan card image',
      'redaction guide india',
      'redact receipt',
      'blur vs pixelate',
      'dpdp act screenshot guide',
    ],
  },
};
