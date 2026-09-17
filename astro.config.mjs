// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://purescan.droploop.in',
  trailingSlash: 'never',
  integrations: [react(), mdx(), sitemap({
    filter: (page) => {
      const url = new URL(page);
      const path = url.pathname;

      // Always include non-blog pages
      if (!path.includes('/blog/')) return true;

      // Always include blog index pages
      if (path.endsWith('/blog') || path.endsWith('/blog/')) return true;

      // Always include English blog posts (no locale prefix)
      if (path.match(/^\/blog\/.+$/)) return true;

      // For localized blog posts: exclude English-looking slugs (fallback pages)
      // These exist for language switcher but shouldn't be in the sitemap
      const localeBlogMatch = path.match(/^\/([a-z]{2}(?:-[a-zA-Z]{2})?)\//);
      if (localeBlogMatch) {
        // Common English function words that appear in English blog slugs
        const englishPatterns = [
          '-why-', '-how-', '-what-', '-are-', '-is-', '-the-', '-do-', '-does-',
          '-hidden-', '-your-', '-and-', '-for-', '-that-', '-you-', '-my-',
          '-in-my-', '-of-', '-to-', '-after-', '-cause-'
        ];
        const hasEnglishWords = englishPatterns.some(p => path.includes(p));
        if (hasEnglishWords) return false;
      }

      return true;
    },
    lastmod: new Date(),
  })],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bg', 'ar', 'ar-MA', 'cs', 'da', 'de', 'el', 'es', 'fi', 'fr', 'hu', 'it', 'ja', 'ko', 'lt', 'lv', 'nb', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'tr', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    envPrefix: ['VITE_', 'PUBLIC_'],
    plugins: [tailwindcss()]
  }
});