import type { Locale } from '../config';
import type { AboutContent } from './types';
import { aboutEnUS } from './about.en-US';
import { aboutEnGB } from './about.en-GB';
import { aboutEnIN } from './about.en-IN';
import { aboutDeDE } from './about.de-DE';
import { aboutFrFR } from './about.fr-FR';

export const aboutContent: Record<Locale, AboutContent> = {
  'en-US': aboutEnUS,
  'en-GB': aboutEnGB,
  'en-IN': aboutEnIN,
  'de-DE': aboutDeDE,
  'fr-FR': aboutFrFR,
};

export function getAboutContent(locale: Locale): AboutContent {
  return aboutContent[locale] ?? aboutEnUS;
}
