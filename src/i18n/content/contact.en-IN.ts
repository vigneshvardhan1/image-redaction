import type { ContactContent } from './types';
import { contactEnUS } from './contact.en-US';
import { toBritishEnglish } from './englishVariants';

const base = toBritishEnglish(contactEnUS);

export const contactEnIN: ContactContent = {
  ...base,
  meta: {
    title: 'Contact — Redact',
    description:
      'Email the team behind Redact about a bug, a privacy question or a feature request. No ticket portal, no chatbot — just one inbox.',
    keywords: ['contact redact', 'image redaction support india', 'dpdp question'],
  },
};
