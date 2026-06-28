// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'ar-MA', 'cs', 'da', 'de', 'el', 'es', 'fr', 'it', 'ja', 'ko', 'lt', 'lv', 'nb', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'tr', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    envPrefix: ['VITE_', 'PUBLIC_'],
    plugins: [tailwindcss()]
  }
});