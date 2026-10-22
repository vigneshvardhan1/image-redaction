import type { FeaturesContent } from './types';
import { featuresEnUS } from './features.en-US';
import { toBritishEnglish } from './englishVariants';

const base = toBritishEnglish(featuresEnUS);

export const featuresEnIN: FeaturesContent = {
  ...base,
  meta: {
    title: 'Features — Redact',
    description:
      'On-device PII detection for Aadhaar, PAN, GSTIN, cards and screenshots, four redaction styles, verification re-scan, metadata-free exports and clearly stated limits.',
    keywords: [
      'image redaction features india',
      'redact aadhaar pan image',
      'on-device ocr redaction',
      'dpdp act screenshot redaction',
      'image redaction shortcuts',
    ],
  },
};
