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
  redirects: {
    '/ar/blog/2-': '/ar/blog/2-mash-mustahdarat-al-tajmil-kayfa-tarifu-al-muntajat-al-aminah',
    '/ar/blog/3-': '/ar/blog/3-hal-taqyimat-al-taam-daqiqah-kayfa-yuhaddidu-tatbiquna-al-sihhi',
    '/ar/blog/4-': '/ar/blog/4-hal-al-mukawwinat-fi-muntajat-al-inayah-bi-al-bashrah-sammah',
    '/ar/blog/5-': '/ar/blog/5-kayfa-taqra-al-mulsawat-al-ghidhaiyyah-ka-al-muhtarifin',
    '/ar/blog/6-': '/ar/blog/6-al-haqiqah-hawla-al-jamal-al-nazif-al-mukawwinat-al-tabiiyyah',

    '/el/blog/2-': '/el/blog/2-sarosi-kallyntikon-pos-na-gnorizete-poia-einai-asfali',
    '/el/blog/3-': '/el/blog/3-einai-akriveis-oi-axiologiseis-trofimon',
    '/el/blog/4-': '/el/blog/4-einai-toxika-ta-systatika-stin-peripoiisi-dermatos',
    '/el/blog/5-': '/el/blog/5-pos-na-diavazete-diatrofikes-etiketes-san-epangelmatias',

    '/ja/blog/2-': '/ja/blog/2-mutenka-keshohin-anzen-keshohin-seibun-kaiseki-app',
    '/ja/blog/3-': '/ja/blog/3-shokuhin-anzen-hyoka-seikaku-app-shikumi',
    '/ja/blog/4-': '/ja/blog/4-skin-care-seibun-yugai-kikendo-score-mikata',
    '/ja/blog/5-': '/ja/blog/5-diet-shokuhin-hyoji-eiyo-seibun-hyoji-tadashii-mikata',
    '/ja/blog/6-vs': '/ja/blog/6-clean-beauty-shinjitsu-tennen-seibun-vs-gosei-seibun',

    '/ko/blog/2-': '/ko/blog/2-hwajangpum-seongbun-bunseok-anjeonhan-hwajangpum-chatneun-beop',
    '/ko/blog/3-': '/ko/blog/3-sikpum-pyeongjeom-jeonghwakhalkka-bunseok-wonli',
    '/ko/blog/4-': '/ko/blog/4-skin-care-seongbun-yuhaehalkka-wiheomdo-jeomsu-haeseok',
    '/ko/blog/5-': '/ko/blog/5-diet-yeongyang-seongbunpyo-jedaelo-ikneun-beop',
    '/ko/blog/6-vs': '/ko/blog/6-clean-beauty-jinsil-cheonyeon-seongbun-vs-hapseong-seongbun',

    '/ru/blog/2-': '/ru/blog/2-skanirovanie-kosmetiki-kak-uznat-kakaya-kosmetika-bezopasna',
    '/ru/blog/3-': '/ru/blog/3-tochny-li-reytingi-edy-kak-app-opredelyaet-zdorovuyu-pishchu',
    '/ru/blog/4-': '/ru/blog/4-toksichny-li-ingredienty-v-moey-kosmetike-opasnost',
    '/ru/blog/5-': '/ru/blog/5-kak-chitat-etiketki-kak-professional-dlya-pokhudeniya',

    '/zh/blog/2-': '/zh/blog/2-huazhuangpin-chengfen-chaxun-hufupin-anquan',
    '/zh/blog/3-': '/zh/blog/3-shipin-pingfen-zhunquema-shipin-anquan-xitong',
    '/zh/blog/4-': '/zh/blog/4-wode-hufu-chengfen-youdu-ma-weihai-pingfen',
    '/zh/blog/5-': '/zh/blog/5-jianfei-daka-bibei-yuedu-yingyang-biaoqian',
    '/zh/blog/6-vs': '/zh/blog/6-chunjing-meizhuang-zhenxiang-tianran-vs-hecheng',
  },
  integrations: [react(), mdx(), sitemap({
    filter: (page) => {
      const url = new URL(page);
      const path = url.pathname;

      // Exclude incomplete slugs or redirect paths from sitemap
      if (path.match(/\/blog\/\d+-(?:vs)?$/)) return false;

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