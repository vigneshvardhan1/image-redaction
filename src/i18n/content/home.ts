import type { Locale } from '../config';
import type { HomeContent } from './types';
import { homeEnUS } from './home.en-US';
import { homeEnGB } from './home.en-GB';
import { homeEnIN } from './home.en-IN';
import { homeDeDE } from './home.de-DE';
import { homeFrFR } from './home.fr-FR';

export const homeContent: Record<Locale, HomeContent> = {
  'en-US': homeEnUS,
  'en-GB': homeEnGB,
  'en-IN': homeEnIN,
  'de-DE': homeDeDE,
  'fr-FR': homeFrFR,
};

export function getHomeContent(locale: Locale): HomeContent {
  return homeContent[locale] ?? homeEnUS;
}
