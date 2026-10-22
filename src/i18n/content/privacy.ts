import type { Locale } from '../config';
import type { PrivacyContent } from './types';
import { privacyEnUS } from './privacy.en-US';
import { privacyEnGB } from './privacy.en-GB';
import { privacyEnIN } from './privacy.en-IN';
import { privacyDeDE } from './privacy.de-DE';
import { privacyFrFR } from './privacy.fr-FR';

export const privacyContent: Record<Locale, PrivacyContent> = {
  'en-US': privacyEnUS,
  'en-GB': privacyEnGB,
  'en-IN': privacyEnIN,
  'de-DE': privacyDeDE,
  'fr-FR': privacyFrFR,
};

export function getPrivacyContent(locale: Locale): PrivacyContent {
  return privacyContent[locale] ?? privacyEnUS;
}
