// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://purescan.droploop.in',
  integrations: [react(), mdx(), sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bg', 'ar', 'ar-MA', 'cs', 'da', 'de', 'el', 'es', 'fr', 'it', 'ja', 'ko', 'lt', 'lv', 'nb', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'tr', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    envPrefix: ['VITE_', 'PUBLIC_'],
    plugins: [tailwindcss()]
  }
});