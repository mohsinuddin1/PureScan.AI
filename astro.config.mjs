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

// Collect real per-page publish dates (or file mtimes) for accurate sitemap <lastmod>
const blogDateMap = new Map();
const blogRootDir = path.resolve(process.cwd(), 'src/content/blog');
if (fs.existsSync(blogRootDir)) {
  for (const loc of fs.readdirSync(blogRootDir)) {
    const locDir = path.join(blogRootDir, loc);
    if (!fs.statSync(locDir).isDirectory()) continue;
    for (const file of fs.readdirSync(locDir)) {
      if (!file.endsWith('.mdx')) continue;
      const fullPath = path.join(locDir, file);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const dateMatch = raw.match(/^publishDate:\s*["']?(\d{4}-\d{2}-\d{2})["']?/m);
      const isoDate = dateMatch
        ? new Date(`${dateMatch[1]}T00:00:00.000Z`).toISOString()
        : fs.statSync(fullPath).mtime.toISOString();
      const slug = file.replace(/\.mdx$/, '');
      const urlPath = loc === 'en' ? `/blog/${slug}` : `/${loc}/blog/${slug}`;
      blogDateMap.set(urlPath, isoDate);
      blogDateMap.set(urlPath.toLowerCase(), isoDate);
    }
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://scaningredients.com',
  trailingSlash: 'never',
  integrations: [react(), mdx(), sitemap({
    filter: (page) => {
      const url = new URL(page);
      const pathname = url.pathname.replace(/\/$/, '') || '/';

      // Exclude incomplete slugs or redirect paths from sitemap
      if (pathname.match(/\/blog\/\d+-(?:vs)?$/)) return false;

      // Exclude utility and auth-wall pages
      if (pathname.endsWith('/delete-account') || pathname === '/pro') return false;

      // Exclude noindex localized homepages until full homepage body copy is translated
      if (pathname.match(/^\/[a-z]{2}(?:-[a-zA-Z]{2})?$/)) return false;

      return true;
    },
    serialize: (item) => {
      const pathname = new URL(item.url).pathname.replace(/\/$/, '') || '/';
      item.lastmod = blogDateMap.get(pathname) || blogDateMap.get(pathname.toLowerCase()) || '2026-11-16T00:00:00.000Z';
      return item;
    },
  })],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bg', 'ar', 'ar-MA', 'cs', 'da', 'de', 'el', 'es', 'fi', 'fr', 'hu', 'it', 'ja', 'ko', 'lt', 'lv', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'tr', 'zh'],
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