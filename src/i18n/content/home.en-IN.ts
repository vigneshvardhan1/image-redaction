import type { HomeContent } from './types';
import { homeEnUS } from './home.en-US';
import { toBritishEnglish } from './englishVariants';

const base = toBritishEnglish(homeEnUS);

export const homeEnIN: HomeContent = {
  ...base,
  meta: {
    title: 'Image Redaction Tool India — Redact Aadhaar, PAN & Screenshots | Redact',
    description:
      'Free image redaction tool for India. Hide Aadhaar numbers, PAN, UPI IDs, names, emails and card numbers on your device — no uploads, no account, DPDP-friendly by design.',
    keywords: [
      'image redaction india',
      'redact aadhaar number from image',
      'redact pan card image',
      'redact screenshot online india',
      'hide upi id in screenshot',
      'dpdp act image redaction',
      'image redaction tool',
    ],
    ogImageAlt: 'Redact — a free image redaction tool for screenshots and Indian IDs',
  },
  hero: {
    ...base.hero,
    badge: 'Image redaction in India, on your device',
    lead: 'Redact Aadhaar numbers, PAN, UPI IDs, names, emails and card numbers in your browser. Smart detection runs on your device, and every export leaves its metadata behind.',
  },
  useCases: base.useCases.map((item) =>
    item.icon === 'id-card'
      ? {
          ...item,
          title: 'IDs & documents',
          copy: 'Aadhaar, PAN, dates of birth, addresses, photographs and machine-readable codes.',
        }
      : item,
  ),
  detection: {
    ...base.detection,
    points: [
      'Finds emails, card numbers, phone numbers, Aadhaar, PAN, GSTIN, addresses and dates.',
      'Every box is a suggestion — include or exclude it before you redact.',
      'All text mode covers every detected line when you would rather not decide.',
      'Verify re-scans the flattened result for text that still looks sensitive.',
    ],
  },
  cta: {
    ...base.cta,
    secondary: 'Read the privacy notes',
  },
};
