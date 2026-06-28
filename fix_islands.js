import fs from 'fs';
import path from 'path';

const pagesDir = './src/pages';

const componentMap = {
    'App': 'AppIsland',
    'Grading': 'GradingIsland',
    'Blog': 'BlogIsland',
    'Alternative': 'AlternativeIsland',
    'PrivacyPolicy': 'PrivacyIsland',
    'TermsOfService': 'TermsIsland',
    'Support': 'SupportIsland'
};

function fixAstroFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    
    // Replace import WithTranslations
    if (content.includes('WithTranslations')) {
        content = content.replace(/import WithTranslations from '[^']+';\n?/g, '');
        
        for (const [comp, island] of Object.entries(componentMap)) {
            if (content.includes(`component={${comp}}`)) {
                
                // Adjust import depth
                const depth = filePath.split(path.sep).length - 3; // src/pages is 2, index is 3
                let prefix = '../'.repeat(depth > 0 ? depth : 1);
                if (filePath.includes('alternatives/') || filePath.includes('blog/')) {
                    prefix = '../../';
                }

                // Inject the Island import
                content = content.replace(/---\n(<Layout)/m, `import { ${island} } from '${prefix}components/Islands.jsx';\n---\n$1`);
                
                // Replace `<WithTranslations client:load component={App} ... />` with `<AppIsland client:load ... />`
                const regex = new RegExp(`<WithTranslations([^>]+)component=\\{${comp}\\}([^>]*)>`, 'g');
                content = content.replace(regex, `<${island}$1$2>`);
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.astro')) {
            fixAstroFile(fullPath);
        }
    }
}

walkDir(pagesDir);
