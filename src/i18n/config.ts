/**
 * Single source of truth for the languages this site publishes.
 *
 * The default locale lives at the root of the site (`/features/`), every other
 * locale gets its own prefix (`/de-DE/features/`). That keeps the existing
 * English URLs stable while giving each translation a distinct, crawlable URL
 * for search engines.
 */

export const LOCALES = ['en-US', 'en-GB', 'en-IN', 'de-DE', 'fr-FR'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en-US';

export interface LocaleConfig {
  /** BCP-47 tag used by `hreflang` and `lang`. */
  code: Locale;
  /** The language of the content, without the region. */
  language: string;
  /** Native-language name shown in the language picker. */
  label: string;
  /** Name in English, used for the accessible label and schema. */
  englishLabel: string;
  /** Open Graph locale, e.g. `de_DE`. */
  ogLocale: string;
  /** Intl locale used for dates and numbers. */
  intl: string;
  /** URL prefix. Empty for the default locale. */
  prefix: string;
  dir: 'ltr' | 'rtl';
  /** The region this edition is written for. */
  region: 'US' | 'GB' | 'IN' | 'DE' | 'FR';
  currency: string;
}

export const localeConfig: Record<Locale, LocaleConfig> = {
  'en-US': {
    code: 'en-US',
    language: 'en',
    label: 'English (US)',
    englishLabel: 'English (United States)',
    ogLocale: 'en_US',
    intl: 'en-US',
    prefix: '',
    dir: 'ltr',
    region: 'US',
    currency: 'USD',
  },
  'en-GB': {
    code: 'en-GB',
    language: 'en',
    label: 'English (UK)',
    englishLabel: 'English (United Kingdom)',
    ogLocale: 'en_GB',
    intl: 'en-GB',
    prefix: '/en-GB',
    dir: 'ltr',
    region: 'GB',
    currency: 'GBP',
  },
  'en-IN': {
    code: 'en-IN',
    language: 'en',
    label: 'English (India)',
    englishLabel: 'English (India)',
    ogLocale: 'en_IN',
    intl: 'en-IN',
    prefix: '/en-IN',
    dir: 'ltr',
    region: 'IN',
    currency: 'INR',
  },
  'de-DE': {
    code: 'de-DE',
    language: 'de',
    label: 'Deutsch',
    englishLabel: 'German (Germany)',
    ogLocale: 'de_DE',
    intl: 'de-DE',
    prefix: '/de-DE',
    dir: 'ltr',
    region: 'DE',
    currency: 'EUR',
  },
  'fr-FR': {
    code: 'fr-FR',
    language: 'fr',
    label: 'Français',
    englishLabel: 'French (France)',
    ogLocale: 'fr_FR',
    intl: 'fr-FR',
    prefix: '/fr-FR',
    dir: 'ltr',
    region: 'FR',
    currency: 'EUR',
  },
};

/** Locales that live under a URL prefix, in the order the picker shows them. */
export const LOCALIZED_LOCALES: Locale[] = LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE,
);

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Read the locale from a pathname, falling back to the default. */
export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0];
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
}

/** Strip a locale prefix from a pathname. */
export function stripLocalePrefix(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (locale === DEFAULT_LOCALE) return pathname;
  const prefix = localeConfig[locale].prefix;
  const stripped = pathname.slice(prefix.length);
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

/** Add the locale prefix to a root-relative path. */
export function localizePath(locale: Locale, path: string): string {
  const [pathname, ...rest] = path.split(/(?=[?#])/);
  const suffix = rest.join('');
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const withSlash = normalized === '/' ? '/' : normalized.replace(/\/?$/, '/');
  const prefix = localeConfig[locale].prefix;
  return `${prefix}${withSlash}${suffix}`;
}

/** Absolute URL for a locale + path. */
export function absoluteLocalizedUrl(
  site: URL,
  locale: Locale,
  path: string,
): string {
  return new URL(localizePath(locale, path), site).href;
}

/**
 * `x-default` and the canonical `hreflang` value for a locale. Both are the
 * full BCP-47 tag so regional editions are unambiguous.
 */
export function hreflangFor(locale: Locale): string {
  return localeConfig[locale].code;
}
