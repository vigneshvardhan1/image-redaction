// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://imageredaction.com',
  // Astro's built-in i18n routing gives us `Astro.currentLocale`, the
  // `astro:i18n` URL helpers, and the right redirect/validation behaviour for
  // localized folders. English (US) stays at the root so existing URLs do not
  // move; every other locale lives under its BCP-47 prefix (e.g. `/de-DE/`).
  i18n: {
    locales: ['en-US', 'en-GB', 'en-IN', 'de-DE', 'fr-FR'],
    defaultLocale: 'en-US',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
