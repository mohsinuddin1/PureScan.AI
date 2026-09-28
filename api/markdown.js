import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const reqPath = (req.query?.path || '').replace(/^\/+/, '');

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
    }
  } catch (e) {
    console.error('Error reading markdown file:', e);
  }

  if (!markdownContent) {
    markdownContent = `# PureScan AI

> The smartest AI-powered food and cosmetic ingredient scanner app for iOS and Android.

Scan barcodes and ingredient lists to instantly detect harmful chemicals, endocrine disruptors, allergens, Nutri-Score, and NOVA ultra-processed additives.

## Core Capabilities
- **Food Scanner**: Nutri-Score (A-E), NOVA classification (1-4), allergen warnings, and PubMed-backed toxin detection.
- **Cosmetic Scanner**: Endocrine disruptor detection, comedogenic rating, paraben/phthalate checks, and contact allergen alerts.
- **Personalized Risk Profiling**: Tailored safety alerts for PCOS, diabetes, pregnancy, and dietary preferences.

## Quick Links
- **API Catalog**: https://purescan.droploop.in/.well-known/api-catalog
- **AI Catalog / ARD**: https://purescan.droploop.in/.well-known/ai-catalog.json
- **Agent Auth (Auth.md)**: https://purescan.droploop.in/auth.md
- **MCP Server Card**: https://purescan.droploop.in/.well-known/mcp/server-card.json
- **Grading Standards**: https://purescan.droploop.in/grading
- **Pricing & Pro**: https://purescan.droploop.in/pricing

## Apps
- [iOS App Store](https://apps.apple.com/app/pure-ai/id6762176490)
- [Google Play Store](https://play.google.com/store/apps/details?id=com.purescanai.app)
`;
  }

  // Calculate approximate token count (~4 characters per token)
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
