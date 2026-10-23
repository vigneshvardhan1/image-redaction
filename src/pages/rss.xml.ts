import type { APIRoute } from 'astro';
import { DEFAULT_LOCALE } from '../i18n/config';
import { getGuides } from '../i18n/content/guides';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

/**
 * English guide feed. The discovery link in BaseLayout is only emitted on
 * English pages, so the feed never claims to be a translation it is not.
 */
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://imageredaction.com');
  const feedUrl = new URL('/rss.xml', base).href;
  const guides = getGuides(DEFAULT_LOCALE);

  const items = guides
    .map((guide) => {
      const url = new URL(`/guides/${guide.slug}/`, base).href;
      const pubDate = new Date(`${guide.dateISO}T00:00:00Z`).toUTCString();
      return [
        '    <item>',
        `      <title>${escapeXml(guide.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <category>${escapeXml(guide.category)}</category>`,
        `      <description>${escapeXml(guide.description)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const latest = guides[0]?.dateISO
    ? new Date(`${guides[0].dateISO}T00:00:00Z`).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Redact guides</title>
    <link>${escapeXml(new URL('/guides/', base).href)}</link>
    <description>Practical notes on redacting screenshots, IDs, receipts, PDFs, and work dashboards before you share them.</description>
    <language>en-us</language>
    <lastBuildDate>${latest}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
