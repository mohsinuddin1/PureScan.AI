import fs from 'fs';
import path from 'path';
import { translate } from '@vitalets/google-translate-api';

const locales = ['ar', 'ar-MA', 'cs', 'da', 'de', 'el', 'es', 'fr', 'it', 'ja', 'ko', 'lt', 'lv', 'nb', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'tr', 'zh', 'bg'];

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    const slug = '47-why-is-red-dye-40-being-banned.mdx';
    const enContent = fs.readFileSync(`./src/content/blog/en/${slug}`, 'utf-8');
    
    // Extract frontmatter fields
    const titleMatch = enContent.match(/title:\s*"(.*?)"/);
    const badgeMatch = enContent.match(/badge:\s*"(.*?)"/);
    const descMatch = enContent.match(/description:\s*"(.*?)"/);
    
    // Extract HTML tags inner text
    const htmlRegex = /<(p|h3|li)[^>]*>(.*?)<\/\1>/gs;
    const htmlMatches = [...enContent.matchAll(htmlRegex)];
    
    const uniqueTexts = [];
    uniqueTexts.push(titleMatch[1]);
    uniqueTexts.push(badgeMatch[1]);
    uniqueTexts.push(descMatch[1]);
    
    for (const match of htmlMatches) {
        uniqueTexts.push(match[2].trim());
    }

    console.log(`Found ${uniqueTexts.length} strings to translate.`);

    for (const lang of locales) {
        console.log(`Translating to ${lang}...`);
        
        let translatedMap = {};
        
        const chunkSize = 10;
        for (let i = 0; i < uniqueTexts.length; i += chunkSize) {
            const chunk = uniqueTexts.slice(i, i + chunkSize);
            const combinedText = chunk.join('\n\n|||\n\n');
            
            try {
                let toLang = lang;
                if (lang === 'ar-MA') toLang = 'ar';
                if (lang === 'nb' || lang === 'no') toLang = 'no';
                if (lang === 'zh') toLang = 'zh-CN';
                
                const res = await translate(combinedText, { to: toLang });
                const translatedChunks = res.text.split(/\|\|\|/g).map(s => s.trim());
                
                for (let j = 0; j < chunk.length; j++) {
                    translatedMap[chunk[j]] = translatedChunks[j] || chunk[j];
                }
                
                await sleep(500); 
            } catch (e) {
                console.error(`Translation error for ${lang}:`, e.message);
                // fallback to original if error
                for (let j = 0; j < chunk.length; j++) {
                    translatedMap[chunk[j]] = chunk[j];
                }
            }
        }
        
        let targetContent = enContent;
        
        // Replace frontmatter
        if (translatedMap[titleMatch[1]]) {
            targetContent = targetContent.replace(`title: "${titleMatch[1]}"`, `title: "${translatedMap[titleMatch[1]].replace(/"/g, '\\"')}"`);
        }
        if (translatedMap[badgeMatch[1]]) {
            targetContent = targetContent.replace(`badge: "${badgeMatch[1]}"`, `badge: "${translatedMap[badgeMatch[1]].replace(/"/g, '\\"')}"`);
        }
        if (translatedMap[descMatch[1]]) {
            targetContent = targetContent.replace(`description: "${descMatch[1]}"`, `description: "${translatedMap[descMatch[1]].replace(/"/g, '\\"')}"`);
        }
        
        // Replace HTML inner text carefully
        for (const match of htmlMatches) {
            const originalInner = match[2].trim();
            const translatedInner = translatedMap[originalInner];
            if (translatedInner && translatedInner !== originalInner) {
                // escape for replacement
                const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const tagRegex = new RegExp(`(<${match[1]}[^>]*>)\\s*${escapeRegExp(originalInner)}\\s*(</${match[1]}>)`, 'g');
                targetContent = targetContent.replace(tagRegex, `$1${translatedInner}$2`);
            }
        }
        
        const targetDir = `./src/content/blog/${lang}`;
        if (!fs.existsSync(targetDir)){
            fs.mkdirSync(targetDir, { recursive: true });
        }
        fs.writeFileSync(`${targetDir}/${slug}`, targetContent);
        console.log(`Updated ${targetDir}/${slug}`);
    }
}

run();
