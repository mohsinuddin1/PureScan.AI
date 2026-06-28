import fs from 'fs';
import path from 'path';

const pagesDir = './src/pages';

function fixAstroFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Skip if already modified
    if (content.includes('WithTranslations')) return;

    const componentMatches = content.match(/import (\w+) from '(?:\.\.\/)+components\/([^']+)\.jsx';/g);
    if (!componentMatches) return;
    
    // We only care about the main components like App, Grading, Blog, Alternative, PrivacyPolicy, Terms, Support
    const mainComponents = ['App', 'Grading', 'Blog', 'Alternative', 'PrivacyPolicy', 'Terms', 'Support'];
    let modified = false;

    for (const match of componentMatches) {
        const componentName = match.match(/import (\w+) from/)[1];
        if (mainComponents.includes(componentName)) {
            // Add imports if needed
            if (!content.includes('getTranslations')) {
                content = content.replace(/---/, "---\nimport { getTranslations } from '../lib/i18n-utils';\nimport WithTranslations from '../components/WithTranslations.jsx';");
                
                // Adjust import depth for getTranslations based on file depth
                const depth = filePath.split(path.sep).length - 3; // src/pages is 2, index is 3
                let prefix = '../'.repeat(depth > 0 ? depth : 1);
                
                // It's easier to just use standard logic
                if (filePath.includes('alternatives/') || filePath.includes('blog/')) {
                    content = content.replace(/import { getTranslations } from '\.\.\/lib\/i18n-utils';/, "import { getTranslations } from '../../lib/i18n-utils';");
                    content = content.replace(/import WithTranslations from '\.\.\/components\/WithTranslations\.jsx';/, "import WithTranslations from '../../components/WithTranslations.jsx';");
                }
            }

            if (!content.includes('const translations')) {
                // Insert const translations before ---
                content = content.replace(/---(\s*)$/m, "const lang = Astro.currentLocale || 'en';\nconst translations = await getTranslations(lang);\n---$1");
            }

            // Replace <Component client:load ... /> with <WithTranslations client:load component={Component} lang={lang} translations={translations} ... />
            const compRegex = new RegExp(`<${componentName}\\s+client:(load|idle)([^>]*)>`, 'g');
            content = content.replace(compRegex, `<WithTranslations client:$1 component={${componentName}} lang={lang} translations={translations}$2>`);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.astro') && !fullPath.includes('[slug].astro')) {
            fixAstroFile(fullPath);
        }
    }
}

walkDir(pagesDir);
console.log('Fixed Astro pages');
