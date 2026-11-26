import fs from 'fs';
import path from 'path';
import { COMPETITORS } from '../src/data/competitorData.js';

const KNOWN_LOCALES = new Set([
  'en', 'ar', 'ar-MA', 'bg', 'cs', 'da', 'de', 'el', 'es', 'fi', 'fr',
  'hu', 'it', 'ja', 'ko', 'lt', 'lv', 'nl', 'no', 'pl', 'pt', 'ro',
  'ru', 'sv', 'tr', 'zh',
]);

const STATIC_PAGES = {
  'ingredient-scanner': `# Klar Ingredient Scanner App

> Scan any food or cosmetic ingredient label instantly with AI.

Source: https://scaningredients.com/ingredient-scanner

Klar (formerly PureScan AI) uses barcode scanning and AI camera OCR (supporting all world languages) to detect hidden toxins, endocrine disruptors, carcinogens, allergens, and ultra-processed additives — personalized to your unique health conditions and allergies.

## What Klar Detects
- **Endocrine Disruptors**: Parabens, phthalates, BPA/BPS, oxybenzone, triclosan.
- **Carcinogens**: Formaldehyde releasers, coal tar dyes, BHA, BHT.
- **Allergens**: 14+ major allergen categories and hidden chemical derivatives.
- **Ultra-Processed Additives**: NOVA Group 4 emulsifiers, artificial sweeteners, synthetic flavor enhancers.
- **Artificial Dyes**: Red 40, Yellow 5, Blue 1.
- **Comedogenic Ingredients**: 0–5 pore-clogging scale for acne-prone skin.

## Download
- [App Store (iOS)](https://apps.apple.com/app/pure-ai/id6762176490)
- [Google Play (Android)](https://play.google.com/store/apps/details?id=com.pureai.com)`,

  'food-scanner-app': `# Klar Food Scanner App — Nutri-Score, NOVA & Allergen Detection

> AI food barcode and label scanner with Nutri-Score (A–E), NOVA classification (1–4), and personalized health alerts.

Source: https://scaningredients.com/food-scanner-app

Klar cross-references every food ingredient against PubMed, EFSA, and FDA research to flag ultra-processed foods, hidden sugars, seed oils, artificial dyes, and 14+ allergens tailored to conditions such as PCOS, diabetes, celiac disease, and IBS.

## How It Works
1. Scan a food barcode or photograph the ingredient list in any language.
2. View Nutri-Score (A–E), NOVA processing level (1–4), and flagged additives.
3. Receive personalized safety grades matched to your allergies and health goals.`,

  'cosmetic-safety-checker': `# Klar Cosmetic Safety Checker — Skincare & Makeup Toxicology

> Scan skincare, sunscreen, and makeup ingredients for endocrine disruptors, carcinogens, allergens, and comedogenic ratings.

Source: https://scaningredients.com/cosmetic-safety-checker

Klar evaluates every INCI cosmetic ingredient against SCCS, EWG, and PubMed toxicology literature, assigning a personalized hazard score and 0–5 comedogenic rating for sensitive, acne-prone, or pregnancy-safe skincare routines.`,

  'allergy-scanner': `# Klar Allergy Scanner App — Detect 14+ Hidden Food Allergens

> Instant barcode and AI label scanner for gluten, dairy, nuts, soy, shellfish, sesame, and hidden chemical derivatives.

Source: https://scaningredients.com/allergy-scanner

Klar detects 14+ major allergen categories and flags hidden derivatives (such as casein, whey, maltodextrin, modified food starch, and sodium caseinate) personalized to your family's allergy profiles.`,

  'grading': `# Klar Safety & Nutritional Scoring System

> Transparent methodology behind Klar's Nutri-Score (A–E), NOVA classification (1–4), and personalized Safety Grade.

Source: https://scaningredients.com/grading

1. **Nutri-Score (A–E)**: Balances negative points (energy, saturated fat, sugars, sodium) against positive points (fruits, vegetables, pulses, nuts, beneficial oils, fiber, protein) per 100g/100ml.
2. **NOVA Classification (1–4)**: Categorizes industrial food processing from Group 1 (unprocessed/minimally processed) to Group 4 (ultra-processed formulations with industrial additives).
3. **Personalized Safety Grade (A–E)**: Starts at Grade A and deducts risk points for user-specific allergens, toxicological hazards (endocrine disruptors, carcinogens, irritants), NOVA 4 processing, or cosmetic hazards.`,

  'pricing': `# Klar Pro Pricing & Plans

> Upgrade to Klar Pro for unlimited food and cosmetic scans, personalized allergen alerts, and deep AI ingredient toxicology analysis.

Source: https://scaningredients.com/pricing

Klar offers a free tier with barcode scanning, basic ingredient analysis, and allergen alerts, plus Klar Pro plans with unlimited AI camera label scans, full condition personalization (PCOS, diabetes, pregnancy, fungal acne), and cross-device sync.`,

  'docs/api': `# Klar AI Agent & Developer Documentation

> Machine-readable discovery, OpenAPI specification, MCP server card, and agent skills for scaningredients.com.

Source: https://scaningredients.com/docs/api

- **API Catalog (RFC 9727)**: https://scaningredients.com/.well-known/api-catalog
- **AI Catalog (ARD)**: https://scaningredients.com/.well-known/ai-catalog.json
- **MCP Server Card**: https://scaningredients.com/.well-known/mcp/server-card.json
- **Agent Skills Index**: https://scaningredients.com/.well-known/agent-skills/index.json
- **OpenAPI Spec**: https://scaningredients.com/api/openapi.json
- **LLMs.txt**: https://scaningredients.com/llms.txt`,
};

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function mdxToMarkdown(rawMdx, canonicalUrl) {
  const fmMatch = rawMdx.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const fm = fmMatch ? fmMatch[1] : '';
  let body = fmMatch ? fmMatch[2] : rawMdx;

  const getField = (name) => {
    const m = fm.match(new RegExp(`^${name}:\\s*["']?(.*?)["']?\\s*$`, 'm'));
    return m ? m[1].trim() : '';
  };

  const title = getField('title');
  const description = getField('description');
  const badge = getField('badge');
  const publishDate = getField('publishDate');

  // Remove ESM imports and convert common HTML/JSX structures to clean Markdown
  body = body
    .replace(/^import\s+.*$/gm, '')
    .replace(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => `[${text.replace(/<[^>]+>/g, '').trim()}](${href})`)
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `\n\n## ${t.replace(/<[^>]+>/g, '').trim()}\n\n`)
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `\n\n### ${t.replace(/<[^>]+>/g, '').trim()}\n\n`)
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, t) => `\n\n#### ${t.replace(/<[^>]+>/g, '').trim()}\n\n`)
    .replace(/<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, '**$1**')
    .replace(/<(?:em|i)[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, '*$1*')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `- ${t.replace(/<[^>]+>/g, '').trim()}\n`)
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ');

  body = decodeEntities(body)
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const header = [
    title ? `# ${title}` : '# Klar Health Guide',
    description ? `\n> ${description}` : '',
    `\nSource: ${canonicalUrl}`,
    badge ? `Category: ${badge}` : '',
    publishDate ? `Published: ${publishDate}` : '',
  ].filter(Boolean).join('\n');

  return `${header}\n\n${body}`;
}

export default function handler(req, res) {
  const reqPath = (req.query?.path || '').replace(/^\/+|\/+$/g, '');

  let markdownContent = '';

  try {
    if (reqPath === '' || reqPath === 'index.html' || reqPath === 'index') {
      const llmsPath = path.join(process.cwd(), 'public', 'llms.txt');
      if (fs.existsSync(llmsPath)) {
        markdownContent = fs.readFileSync(llmsPath, 'utf8');
      }
    } else if (reqPath === 'full' || reqPath === 'llms-full.txt') {
      const fullPath = path.join(process.cwd(), 'public', 'llms-full.txt');
      if (fs.existsSync(fullPath)) {
        markdownContent = fs.readFileSync(fullPath, 'utf8');
      }
    } else if (STATIC_PAGES[reqPath]) {
      markdownContent = STATIC_PAGES[reqPath];
    } else if (reqPath.startsWith('alternatives/')) {
      const compId = reqPath.slice('alternatives/'.length).toLowerCase().trim();
      const comp = COMPETITORS[compId];
      if (comp) {
        const lines = [
          `# Klar vs ${comp.name} — Comparison Guide`,
          '',
          `> ${comp.summary}`,
          '',
          `Source: https://scaningredients.com/alternatives/${comp.id}`,
          '',
          '## Key Differences',
          ...comp.features.map((f) => `- **${f.feature}**: Klar (${f.klar === true ? 'Yes' : f.klar}) vs ${comp.name} (${f.comp === true ? 'Yes' : f.comp === false ? 'No' : f.comp}) — ${f.note}`),
          '',
          '## Why Users Switch to Klar',
          comp.deepDive,
        ];
        if (Array.isArray(comp.faqs) && comp.faqs.length > 0) {
          lines.push('', '## Frequently Asked Questions');
          for (const f of comp.faqs) {
            lines.push(``, `### ${f.question}`, f.answer);
          }
        }
        markdownContent = lines.join('\n');
      }
    } else {
      const blogMatch = reqPath.match(/^(?:([a-z]{2}(?:-[a-zA-Z]{2})?)\/)?blog\/([a-z0-9-]+)$/i);
      if (blogMatch) {
        const rawLang = blogMatch[1] || 'en';
        const locale = rawLang.toLowerCase() === 'ar-ma' ? 'ar-MA' : rawLang;
        const slug = blogMatch[2];
        if (KNOWN_LOCALES.has(locale) && /^[a-z0-9-]+$/i.test(slug)) {
          const mdxPath = path.join(process.cwd(), 'src', 'content', 'blog', locale, `${slug}.mdx`);
          if (fs.existsSync(mdxPath)) {
            const rawMdx = fs.readFileSync(mdxPath, 'utf8');
            const canonicalUrl = locale === 'en'
              ? `https://scaningredients.com/blog/${slug}`
              : `https://scaningredients.com/${locale}/blog/${slug}`;
            markdownContent = mdxToMarkdown(rawMdx, canonicalUrl);
          }
        }
      }
    }
  } catch (e) {
    console.error('Error reading markdown file:', e);
  }

  if (!markdownContent) {
    markdownContent = `# Klar (formerly PureScan AI)

> The smartest AI-powered food and cosmetic ingredient scanner app for iOS and Android.

Scan barcodes and ingredient lists to instantly detect harmful chemicals, endocrine disruptors, allergens, Nutri-Score, and NOVA ultra-processed additives.

## Core Capabilities
- **Food Scanner**: Nutri-Score (A-E), NOVA classification (1-4), allergen warnings, and PubMed-backed toxin detection.
- **Cosmetic Scanner**: Endocrine disruptor detection, comedogenic rating, paraben/phthalate checks, and contact allergen alerts.
- **Personalized Risk Profiling**: Tailored safety alerts for PCOS, diabetes, pregnancy, and dietary preferences.

## Quick Links
- **API Catalog**: https://scaningredients.com/.well-known/api-catalog
- **AI Catalog / ARD**: https://scaningredients.com/.well-known/ai-catalog.json
- **Agent Auth (Auth.md)**: https://scaningredients.com/auth.md
- **MCP Server Card**: https://scaningredients.com/.well-known/mcp/server-card.json
- **Grading Standards**: https://scaningredients.com/grading
- **Pricing & Pro**: https://scaningredients.com/pricing

## Apps
- [iOS App Store](https://apps.apple.com/app/pure-ai/id6762176490)
- [Google Play Store](https://play.google.com/store/apps/details?id=com.pureai.com)
`;
  }

  const tokenCount = Math.ceil(markdownContent.length / 4);

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('x-markdown-tokens', String(tokenCount));
  res.setHeader('Vary', 'Accept');
  res.setHeader(
    'Link',
    '</.well-known/api-catalog>; rel="api-catalog", </.well-known/ai-catalog.json>; rel="describedby", </llms.txt>; rel="describedby"'
  );

  return res.status(200).send(markdownContent);
}
