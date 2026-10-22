import type { Locale } from '../config';
import { LOCALES } from '../config';
import type { Guide } from '../../data/guides';
import { guidesEnUS } from './guides.en-US';
import { guidesEnGB } from './guides.en-GB';
import { guidesEnIN } from './guides.en-IN';
import { guidesDeDE } from './guides.de-DE';
import { guidesFrFR } from './guides.fr-FR';

/**
 * Every guide that has been published for a locale. The English regional
 * editions carry the full set; the German and French editions launch with the
 * three guides that answer the most common questions and grow from there.
 */
export const guideCatalog: Record<Locale, Guide[]> = {
  'en-US': guidesEnUS,
  'en-GB': guidesEnGB,
  'en-IN': guidesEnIN,
  'de-DE': guidesDeDE,
  'fr-FR': guidesFrFR,
};

/** Most recent first, matching the English `guidesByDate` helper. */
export function getGuides(locale: Locale): Guide[] {
  return [...(guideCatalog[locale] ?? guidesEnUS)].sort((a, b) =>
    b.dateISO.localeCompare(a.dateISO),
  );
}

export function getGuide(locale: Locale, slug: string): Guide | undefined {
  return (guideCatalog[locale] ?? guidesEnUS).find((guide) => guide.slug === slug);
}

/** Locales that publish a given guide, in picker order. */
export function getGuideLocales(slug: string): Locale[] {
  return LOCALES.filter((locale) => getGuide(locale, slug) !== undefined);
}

/** True when the locale has a translation of the guide. */
export function hasGuide(locale: Locale, slug: string): boolean {
  return getGuide(locale, slug) !== undefined;
}
