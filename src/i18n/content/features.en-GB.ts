import type { FeaturesContent } from './types';
import { featuresEnUS } from './features.en-US';
import { toBritishEnglish } from './englishVariants';

const base = toBritishEnglish(featuresEnUS);

export const featuresEnGB: FeaturesContent = {
  ...base,
  meta: {
    title: 'Features — Redact',
    description:
      'On-device PII detection, four redaction styles, verification re-scan, metadata-free exports, keyboard shortcuts and clearly stated limits.',
    keywords: [
      'image redaction features',
      'gdpr screenshot redaction',
      'on-device ocr redaction',
      'redact image metadata',
      'image redaction shortcuts',
    ],
  },
};
