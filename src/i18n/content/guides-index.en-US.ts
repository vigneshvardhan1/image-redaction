import type { GuidesIndexContent } from './types';

export const guidesIndexEnUS: GuidesIndexContent = {
  meta: {
    title: 'Guides — Redact',
    description:
      'Practical guides to redacting screenshots, receipts, ID cards, and work dashboards. Learn which redaction style is safe and how to verify your own work.',
    keywords: [
      'how to redact a screenshot',
      'redaction guide',
      'redact receipt',
      'redact id card',
      'blur vs pixelate',
      'work screenshot checklist',
    ],
  },
  hero: {
    eyebrow: 'Guides',
    title: 'Less sharing. More thinking.',
    lead: 'Short, practical notes on what to cover, which style to trust, and how to check your own redaction before the image leaves your hands.',
    primaryCta: 'Open the editor',
    secondaryCta: 'Start with the latest',
  },
  latestLabel: 'Latest guide',
  readGuide: 'Read the guide',
  allGuidesEyebrow: 'All guides',
  allGuidesTitle: 'The rest of the field notes.',
  allGuidesCopy: 'Written for people who would rather not learn about redaction the hard way.',
  rule: {
    title: 'The 60-second rule.',
    copy: 'If you would not read the detail aloud in a crowded room, cover it before the screenshot leaves your device. Three questions make the decision easier:',
    questions: [
      {
        question: 'Could this identify a person?',
        copy: 'Name, photo, handle, email, phone, address, ID number.',
      },
      {
        question: 'Could this cost money?',
        copy: 'Card number, expiry, CVV, bank details, invoice number.',
      },
      {
        question: 'Could this unlock an account?',
        copy: 'Order number, date of birth, tax ID, security answer.',
      },
    ],
  },
  cta: {
    eyebrow: 'Put it into practice',
    title: 'Read less. Redact something.',
    copy: 'The editor is free and local. Load a sample, cover a few details, and verify the result before you download it.',
    primary: 'Open the editor',
    secondary: 'Read the privacy notes',
    secondaryHref: '/privacy',
  },
};
