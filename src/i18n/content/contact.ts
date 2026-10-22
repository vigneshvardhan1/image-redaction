import type { Locale } from '../config';
import type { ContactContent } from './types';
import { contactEnUS } from './contact.en-US';
import { contactEnGB } from './contact.en-GB';
import { contactEnIN } from './contact.en-IN';
import { contactDeDE } from './contact.de-DE';
import { contactFrFR } from './contact.fr-FR';

export const contactContent: Record<Locale, ContactContent> = {
  'en-US': contactEnUS,
  'en-GB': contactEnGB,
  'en-IN': contactEnIN,
  'de-DE': contactDeDE,
  'fr-FR': contactFrFR,
};

export function getContactContent(locale: Locale): ContactContent {
  return contactContent[locale] ?? contactEnUS;
}
