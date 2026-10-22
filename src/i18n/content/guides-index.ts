import type { Locale } from '../config';
import type { GuidesIndexContent } from './types';
import { guidesIndexEnUS } from './guides-index.en-US';
import { guidesIndexEnGB } from './guides-index.en-GB';
import { guidesIndexEnIN } from './guides-index.en-IN';
import { guidesIndexDeDE } from './guides-index.de-DE';
import { guidesIndexFrFR } from './guides-index.fr-FR';

export const guidesIndexContent: Record<Locale, GuidesIndexContent> = {
  'en-US': guidesIndexEnUS,
  'en-GB': guidesIndexEnGB,
  'en-IN': guidesIndexEnIN,
  'de-DE': guidesIndexDeDE,
  'fr-FR': guidesIndexFrFR,
};

export function getGuidesIndexContent(locale: Locale): GuidesIndexContent {
  return guidesIndexContent[locale] ?? guidesIndexEnUS;
}
