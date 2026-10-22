import type { Locale } from '../config';
import type { FeaturesContent } from './types';
import { featuresEnUS } from './features.en-US';
import { featuresEnGB } from './features.en-GB';
import { featuresEnIN } from './features.en-IN';
import { featuresDeDE } from './features.de-DE';
import { featuresFrFR } from './features.fr-FR';

export const featuresContent: Record<Locale, FeaturesContent> = {
  'en-US': featuresEnUS,
  'en-GB': featuresEnGB,
  'en-IN': featuresEnIN,
  'de-DE': featuresDeDE,
  'fr-FR': featuresFrFR,
};

export function getFeaturesContent(locale: Locale): FeaturesContent {
  return featuresContent[locale] ?? featuresEnUS;
}
