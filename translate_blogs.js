import fs from 'fs';
import path from 'path';
import { translate } from '@vitalets/google-translate-api';

const locales = ['ar', 'ar-MA', 'cs', 'da', 'de', 'el', 'es', 'fr', 'it', 'ja', 'ko', 'lt', 'lv', 'nb', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'tr', 'zh'];

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function extractTexts(jsx) {
    // Find everything between > and <
    const regex = />([^<]+)</g;
    const texts = [];
    let match;
    while ((match = regex.exec(jsx)) !== null) {
        const text = match[1].trim();
        // Ignore single characters, numbers, and pure whitespace
        if (text.length > 1 && /[a-zA-Z]/.test(text)) {
            texts.push(text);
        }
    }
    // Deduplicate
    return [...new Set(texts)];
}

async function run() {
    const enContent = fs.readFileSync('./src/data/blogs/en.jsx', 'utf-8');
    
    // Extract the 6 content blocks from en.jsx
    const contentBlocks = [];
    const blockRegex = /content:\s*\(([\s\S]*?)\n\s*\)/g;
    let bMatch;
    while ((bMatch = blockRegex.exec(enContent)) !== null) {
        contentBlocks.push(bMatch[1]);
    }
    
    if (contentBlocks.length !== 6) {
        console.error(`Expected 6 content blocks, found ${contentBlocks.length}`);
        return;
    }

    const allTexts = [];
    for (const block of contentBlocks) {
        allTexts.push(...extractTexts(block));
    }
    const uniqueTexts = [...new Set(allTexts)];
    console.log(`Found ${uniqueTexts.length} unique text strings to translate.`);

    for (const lang of locales) {
        console.log(`Translating to ${lang}...`);
        
        let translatedMap = {};
        
        // Translate in chunks of 20 to avoid payload too large
        const chunkSize = 20;
        for (let i = 0; i < uniqueTexts.length; i += chunkSize) {
            const chunk = uniqueTexts.slice(i, i + chunkSize);
            const combinedText = chunk.join('\n\n|||\n\n');
            
            try {
                // translate mapping lang for google translate
                let toLang = lang;
                if (lang === 'ar-MA') toLang = 'ar';
                if (lang === 'nb' || lang === 'no') toLang = 'no';
                if (lang === 'zh') toLang = 'zh-CN';
                
                const res = await translate(combinedText, { to: toLang });
                const translatedChunks = res.text.split(/\|\|\|/g).map(s => s.trim());
                
                for (let j = 0; j < chunk.length; j++) {
                    translatedMap[chunk[j]] = translatedChunks[j] || chunk[j];
                }
                
                await sleep(500); // polite sleep
            } catch (e) {
                console.error(`Translation error for ${lang}:`, e.message);
            }
        }
        
        // Now construct the translated blocks
        const translatedBlocks = [];
        for (const block of contentBlocks) {
            let tBlock = block;
            for (const originalText of Object.keys(translatedMap)) {
                const translatedText = translatedMap[originalText];
                if (translatedText && translatedText !== originalText) {
                    // Replace exact string carefully. Escape for regex.
                    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(`>\\s*${escapeRegExp(originalText)}\\s*<`, 'g');
                    tBlock = tBlock.replace(regex, `>\n${translatedText}\n<`);
                }
            }
            translatedBlocks.push(tBlock);
        }
        
        // Now read the target lang file and replace its content blocks!
        const langFilePath = `./src/data/blogs/${lang}.jsx`;
        if (fs.existsSync(langFilePath)) {
            let targetContent = fs.readFileSync(langFilePath, 'utf-8');
            let blockIndex = 0;
            targetContent = targetContent.replace(/content:\s*\(([\s\S]*?)\n\s*\)/g, () => {
                const replacement = `content: (\n${translatedBlocks[blockIndex]}\n        )`;
                blockIndex++;
                return replacement;
            });
            fs.writeFileSync(langFilePath, targetContent);
            console.log(`Updated ${langFilePath}`);
        } else {
            console.error(`Missing ${langFilePath}`);
        }
    }
}

run();
