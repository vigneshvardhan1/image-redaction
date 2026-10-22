import type { APIRoute } from 'astro';
import type { Locale } from '../i18n/config';
import { DEFAULT_LOCALE, LOCALES, absoluteLocalizedUrl } from '../i18n/config';
import { getGuides } from '../i18n/content/guides';

/**
 * Every page is published at the same path in each locale, so one entry per
 * page carries the full alternate set. Legal pages stay English-only and are
 * listed once, without `xhtml:link` alternates.
 */
const translatedRoutes = ['/', '/features/', '/guides/', '/about/', '/contact/', '/privacy/'];

const legalRoutes = ['/privacy-policy/', '/terms/'];

interface SitemapEntry {
  path: string;
  locales: Locale[];
  lastmod?: string;
}

const guideLocales = new Map<string, Locale[]>();
const guideLastmod = new Map<string, string>();

for (const locale of LOCALES) {
  for (const guide of getGuides(locale)) {
    const locales = guideLocales.get(guide.slug) ?? [];
    if (!locales.includes(locale)) locales.push(locale);
    guideLocales.set(guide.slug, locales);
    guideLastmod.set(guide.slug, guide.dateISO);
  }
}

const entries: SitemapEntry[] = [
  ...translatedRoutes.map((path) => ({ path, locales: [...LOCALES] })),
  ...legalRoutes.map((path) => ({ path, locales: [DEFAULT_LOCALE] })),
  ...[...guideLocales.entries()].map(([slug, locales]) => ({
    path: `/guides/${slug}/`,
    locales,
    lastmod: guideLastmod.get(slug),
  })),
];

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://imageredaction.com');

  const urls = entries.flatMap((entry) =>
    entry.locales.map((locale) => {
      const loc = absoluteLocalizedUrl(base, locale, entry.path);
      const alternateLinks =
        entry.locales.length > 1
          ? [
              ...entry.locales.map(
                (alternate) =>
                  `    <xhtml:link rel="alternate" hreflang="${alternate}" href="${escapeXml(
                    absoluteLocalizedUrl(base, alternate, entry.path),
                  )}" />`,
              ),
              entry.locales.includes(DEFAULT_LOCALE)
                ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
                    absoluteLocalizedUrl(base, DEFAULT_LOCALE, entry.path),
                  )}" />`
                : '',
            ]
              .filter(Boolean)
              .join('\n')
          : '';

      return [
        '  <url>',
        `    <loc>${escapeXml(loc)}</loc>`,
        entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>` : '',
        alternateLinks,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
