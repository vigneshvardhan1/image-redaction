# Redact

A browser-based image and PDF redaction studio at [imageredaction.com](https://imageredaction.com). Files are processed locally in the tab; they are never uploaded to a server.

## What it does

- Redacts screenshots, photos, receipts, IDs, and PDFs with ink, pixelate, blur, or emoji stickers.
- Suggests sensitive text and faces with on-device OCR and face detection.
- Flattens exported PDFs page by page so text layers, links, form fields, and metadata do not survive.
- Downloads PNG, JPG, WebP, or PDF, copies an image to the clipboard, and shares a redacted file through the native share sheet when the browser supports it.
- Includes a share menu for WhatsApp, Telegram, X, Facebook, LinkedIn, email, and copy-link.
- Ships English (US, UK, India), German, and French editions, with localized privacy notes.

The site intentionally has **no service worker and no offline mode**. An internet connection is required to open the site and to fetch the detection models on first use. The web manifest and install prompt remain, but installing the site does not add offline support.

## Stack

- [Astro](https://astro.build/) 7, static output
- TypeScript
- Tailwind CSS 4
- `pdfjs-dist` for PDF rendering and `pdf-lib` for PDF assembly
- Sharp scripts for icons and social cards
- Cloudflare Pages / Wrangler for deployment

Node.js 22.22.0 or newer is required.

## Getting started

```sh
npm install
npm run dev
```

The dev server runs at `http://localhost:4321` by default. For an agent or terminal that should keep running in the background:

```sh
astro dev --background
astro dev status
astro dev logs
astro dev stop
```

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start the Astro dev server |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build and deploy with Wrangler |
| `npm run astro -- <args>` | Run Astro CLI commands such as `astro check` |
| `npm run og` | Regenerate the default and per-guide Open Graph PNGs |
| `npm run icons` | Regenerate app icons |
| `npm run pdfjs-assets` | Copy the PDF.js worker and assets |
| `npm run assets` | Run the OG and icon generators |

## Environment variables

Copy `.env.example` to `.env` for local builds. Never commit `.env`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `PUBLIC_ADSENSE_CLIENT` | No | AdSense publisher ID, in `ca-pub-` form. Advertising stays completely disabled when this is blank or invalid. |
| `PUBLIC_ADSENSE_SLOT_HOME` | No | AdSense display-unit slot ID for the home page |
| `PUBLIC_ADSENSE_SLOT_ARTICLE` | No | AdSense display-unit slot ID for guide articles |
| `PUBLIC_ADSENSE_SLOT_TOOL` | No | AdSense display-unit slot ID for tool landing pages |

`PUBLIC_*` values are visible in the browser. That is expected for AdSense IDs; never put a secret in a `PUBLIC_*` variable.

## Advertising and AdSense

Advertising is opt-in at build time. With `PUBLIC_ADSENSE_CLIENT` unset, the build contains:

- no AdSense loader
- no consent banner
- no ad units
- no ad preconnects
- no publisher entry in `ads.txt`

The `ads.txt` route still returns an explanatory comment instead of a fake publisher line.

### Enabling AdSense

1. Add the real site to AdSense and get the publisher ID, for example `ca-pub-1234567890123456`. Do not use a placeholder ID for a review submission.
2. Create three display ad units in AdSense: home, article, and tool.
3. Set the four variables locally and in the Cloudflare Pages build environment:

   ```sh
   PUBLIC_ADSENSE_CLIENT=ca-pub-1234567890123456
   PUBLIC_ADSENSE_SLOT_HOME=1234567890
   PUBLIC_ADSENSE_SLOT_ARTICLE=2345678901
   PUBLIC_ADSENSE_SLOT_TOOL=3456789012
   ```

4. Build and deploy. The build validates that the publisher ID matches `ca-pub-` plus 16 digits. An invalid ID disables advertising and prints a warning.
5. After deploying, check:
   - `/ads.txt` contains `google.com, pub-..., DIRECT, f08c47fec0942fa0`
   - the page source includes the AdSense loader and the Consent Mode v2 defaults
   - the consent banner appears on a first visit
   - ad units appear on the home page, guide pages, and tool pages only
   - the editor, privacy notes, privacy policy, and terms contain no ad units
6. Submit the site for AdSense review only after the production deployment has the real ID and working ad units.

Ad placements are deliberately limited to pages with substantial editorial or product content. Legal pages and the editor remain ad-free.

Keep Auto Ads off in the AdSense account, or exclude the editor and legal pages there. Auto Ads can inject units outside these placements, which would break the page-level layout guarantees above.

### Consent

The site loads with Consent Mode v2 defaults set to denied. A first visit shows a banner with accept and reject choices. The choice is stored in `localStorage` under `ir-consent-v1`, the ad signals are updated through `gtag('consent', 'update', ...)`, and the footer exposes a **Privacy settings** button while advertising is enabled. Rejecting the banner does not disable the editor.

The custom banner is not a Google-certified CMP. Google requires a certified CMP for personalised ads in the EEA and the UK, and AdSense may limit or withhold ads there without one. If EEA/UK traffic matters, configure a Google-certified CMP in the AdSense account and keep the banner/Consent Mode integration in sync. Advertising approval is also subject to Google's content and traffic policies; this repository cannot guarantee approval.

### Consent Mode and the loader

`src/components/AdSense.astro` reads the stored choice before loading the AdSense script, so a returning visitor does not briefly default to denied. The consent bridge lives in `src/scripts/consent.ts`. The banner and footer control are rendered by `src/components/CookieConsent.astro`.

## SEO and metadata

- `src/pages/sitemap.xml.ts` generates localized sitemap entries with hreflang alternates.
- `src/pages/rss.xml.ts` publishes an English guide feed, discovered from English pages.
- Guide pages get unique OG cards at `/og/guides/<slug>.png`; regenerate them with `npm run og` after changing guide covers or titles.
- `BaseLayout.astro` owns canonical URLs, hreflang, robots directives, Organization schema, Open Graph, Twitter cards, article metadata, and the RSS discovery link.
- `public/robots.txt` allows crawling and points to the sitemap.
- `public/_headers` adds security headers and long-lived caching for built assets.

Run a production build and check `dist/` before deploying:

```sh
npm run build
```

Verify that `dist/rss.xml`, `dist/ads.txt`, `dist/sitemap.xml`, and the guide OG images exist, and that no `sw.js` or offline page is produced.

## Privacy and legal

The editor has no upload endpoint. Detection downloads its OCR and face models on first use, but the selected image stays in the tab. Exported images are re-encoded from a canvas, which removes EXIF, GPS, and other original metadata.

The legal pages are English-only and live at `/privacy-policy` and `/terms`. The localized privacy notes live at `/privacy/` and `/de-DE/privacy/`, for example. If advertising is enabled, the privacy policy's AdSense disclosures apply.

## Project structure

```text
src/
  components/       UI, editor, consent banner, ad slots
  config/ads.ts     Env-gated advertising configuration
  data/             FAQs, comparisons, tool-page content, guides
  i18n/             Locales, UI strings, localized content
  layouts/          Base layout, legal layout
  pages/            Static routes, sitemap, RSS, ads.txt
  scripts/          Editor, PWA install prompt, consent bridge
public/
  _headers          Cloudflare Pages headers
  og/guides/        Per-guide social cards
  samples/          Sample images used by the editor and guides
scripts/            OG, icon, PDF, and sample generators
```

## Deployment

The project deploys as a static Cloudflare Pages site. `wrangler.jsonc` points at `./dist`.

```sh
npm run deploy
```

Set the AdSense variables in the Cloudflare Pages project settings, not only in a local `.env` file. Production builds must include the real publisher ID before an AdSense review.

## Editorial note

The site must not claim that it works offline, that it has no advertising, or that it sets no cookies while AdSense is enabled. The editor itself has no analytics or advertising code, but AdSense can set advertising cookies after consent. Keep the FAQ, privacy notes, privacy policy, and terms aligned with what the deployed build actually does.
