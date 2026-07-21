import fs from 'fs';
import path from 'path';

const locales = ['ar', 'ar-MA', 'cs', 'da', 'de', 'el', 'es', 'fi', 'fr', 'hu', 'it', 'ja', 'ko', 'lt', 'lv', 'nb', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'tr', 'zh'];
const localesStr = JSON.stringify(locales);

const pagesDir = './src/pages';
const targetDir = './src/pages/[lang]';

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

function processFile(filePath) {
    const relPath = path.relative(pagesDir, filePath);
    if (relPath.startsWith('[lang]')) return;
    
    const targetPath = path.join(targetDir, relPath);
    
    if (!fs.existsSync(path.dirname(targetPath))) {
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    }

    let content = fs.readFileSync(filePath, 'utf-8');

    if (filePath.includes('[slug].astro')) {
        content = content.replace(
            /^export async function getStaticPaths\(\) \{[\s\S]*?^}/m,
            `export async function getStaticPaths() {
  const posts = await getCollection('blog');
  const slugs = new Set(posts.map(p => p.id.split('/')[1]));
  const locales = ${localesStr};
  const paths = [];
  for (const lang of locales) {
      for (const s of slugs) {
          paths.push({ params: { lang, slug: s } });
      }
  }
  return paths;
}`
        );
    } else if (filePath.includes('[competitor].astro')) {
        content = content.replace(
            /export function getStaticPaths\(\) \{[\s\S]*?return \[([\s\S]*?)\];\n\}/,
            `export function getStaticPaths() {
  const locales = ${localesStr};
  const comps = [$1];
  const paths = [];
  for (const lang of locales) {
      for (const c of comps) {
          paths.push({ params: { lang, competitor: c.params.competitor } });
      }
  }
  return paths;
}`
        );
    } else {
        content = content.replace(
            /---/,
            `---
export function getStaticPaths() {
  const locales = ${localesStr};
  return locales.map(lang => ({ params: { lang } }));
}
`
        );
    }

    content = content.replace(/from '(\.\.\/)+/g, match => match + '../');
    fs.writeFileSync(targetPath, content);
    console.log(`Generated ${targetPath}`);
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== '[lang]') walkDir(fullPath);
        } else if (fullPath.endsWith('.astro')) {
            processFile(fullPath);
        }
    }
}

walkDir(pagesDir);
