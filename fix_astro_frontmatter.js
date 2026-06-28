import fs from 'fs';
import path from 'path';

const pagesDir = './src/pages';

function fixAstroFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if it starts with "const lang"
    if (content.startsWith("const lang = Astro.currentLocale || 'en';")) {
        // Remove the top 2 lines
        content = content.replace(/^const lang = Astro\.currentLocale \|\| 'en';\nconst translations = await getTranslations\(lang\);\n/, '');
        
        // Insert them before the second `---`
        // We find the second `---` by finding the first one, then the second one.
        const firstDash = content.indexOf('---');
        const secondDash = content.indexOf('---', firstDash + 3);
        
        if (secondDash !== -1) {
            const before = content.substring(0, secondDash);
            const after = content.substring(secondDash);
            content = before + "const lang = Astro.currentLocale || 'en';\nconst translations = await getTranslations(lang);\n" + after;
            fs.writeFileSync(filePath, content);
            console.log(`Fixed ${filePath}`);
        }
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
