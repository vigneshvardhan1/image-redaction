import type { GuidesIndexContent } from './types';
import { guidesIndexEnUS } from './guides-index.en-US';
import { toBritishEnglish } from './englishVariants';

const base = toBritishEnglish(guidesIndexEnUS);

export const guidesIndexEnGB: GuidesIndexContent = {
  ...base,
  meta: {
    ...base.meta,
    description:
      'Practical guides to redacting screenshots, receipts, ID cards and work dashboards. Learn which redaction style is safe and how to verify your own work.',
    keywords: [
      'how to redact a screenshot uk',
      'redaction guide',
      'gdpr redaction guide',
      'redact receipt',
      'redact id card',
      'blur vs pixelate',
    ],
  },
};
