// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import fs from 'fs';
import path from 'path';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Ensure environment variables from .env are available in process.env during dev and build
const env = loadEnv('development', process.cwd(), '');
Object.assign(process.env, env);

/**
 * Dev-only plugin to serve serverless functions from /api/*.js during `astro dev`
 * In production, Vercel natively serves root /api/ directory as serverless functions.
 */
function localApiDevPlugin() {
  return {
    name: 'local-api-dev-plugin',
    apply: 'serve', // Runs only during `astro dev`, never during `astro build`
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();
        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        if (url.pathname.startsWith('/api/')) {
          // Dynamically refresh process.env from .env in dev
          try {
            const currentEnv = loadEnv('development', process.cwd(), '');
            Object.assign(process.env, currentEnv);
          } catch {}

          const route = url.pathname.replace(/^\/api\//, '').replace(/\/$/, '');
          const filePath = path.resolve(process.cwd(), `api/${route}.js`);

          if (fs.existsSync(filePath)) {
            // Polyfill Express/Vercel helpers on res
            if (!res.status) {
              res.status = function (code) {
                res.statusCode = code;
                return res;
              };
            }
            if (!res.json) {
              res.json = function (data) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
                return res;
              };
            }

            // Parse JSON body for mutation requests if not parsed
            if (['POST', 'PUT', 'PATCH'].includes(req.method || '') && !req.body) {
              const chunks = [];
              for await (const chunk of req) {
                chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
              }
              const str = Buffer.concat(chunks).toString('utf8');
              req.rawBody = str;
              try {
                req.body = str ? JSON.parse(str) : {};
              } catch {
                req.body = {};
              }
            }

            try {
              const mod = await server.ssrLoadModule(`/api/${route}.js`);
              if (mod && typeof mod.default === 'function') {
                return await mod.default(req, res);
              }
            } catch (err) {
              console.error(`[Dev API] Error executing /api/${route}:`, err);
              return res.status(500).json({ error: err.message || 'Internal Server Error' });
            }
          }
        }
        next();
      });
    },
  };
}

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
      const localeBlogMatch = path.match(/^\/([a-z]{2}(?:-[a-zA-Z]{2})?)\//);
      if (localeBlogMatch) {
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
    server: {
      allowedHosts: true
    },
    envPrefix: ['VITE_', 'PUBLIC_'],
    plugins: [tailwindcss(), localApiDevPlugin()]
  }
});