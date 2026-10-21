import type { APIRoute } from 'astro';
import { guides } from '../data/guides';

// Static pages, in trailing-slash form to match the canonical URLs.
// Add a route here whenever a new top-level page is created.
const staticRoutes = [
  '/',
  '/features/',
  '/guides/',
  '/about/',
  '/contact/',
  '/privacy/',
  '/privacy-policy/',
  '/terms/',
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
  const urls = [
    ...staticRoutes.map((path) => ({ loc: new URL(path, base).href })),
    ...guides.map((guide) => ({
      loc: new URL(`/guides/${guide.slug}/`, base).href,
      lastmod: guide.dateISO,
    })),
  ];

  const entries = urls
    .map(
      ({ loc, lastmod }) =>
        `  <url>\n    <loc>${escapeXml(loc)}</loc>${
          lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
        }\n  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
