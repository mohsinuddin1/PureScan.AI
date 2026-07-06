import fs from 'fs';
import path from 'path';

const locales = ['ar', 'ar-MA', 'cs', 'da', 'de', 'el', 'es', 'fr', 'it', 'ja', 'ko', 'lt', 'lv', 'nb', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'tr', 'zh'];

const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function translateWithGroq(textArray, lang) {
    const combinedText = textArray.join('\n\n|||\n\n');
    const prompt = `You are a professional translator. Translate the following text into the language code '${lang}'. 
Maintain the exact same formatting, spacing, and use of the separator ' ||| ' between segments.
Do not add any conversational text or explanations. Return ONLY the translated segments separated by ' ||| '.

TEXT TO TRANSLATE:
${combinedText}`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.1
        })
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
    }

    const data = await res.json();
    const resultText = data.choices[0].message.content;
    return resultText.split(/\|\|\|/g).map(s => s.trim());
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function extractTexts(jsx) {
    const regex = />([^<]+)</g;
    const texts = [];
    let match;
    while ((match = regex.exec(jsx)) !== null) {
        const text = match[1].trim();
        if (text.length > 1 && /[a-zA-Z]/.test(text)) {
            texts.push(text);
        }
    }
    return [...new Set(texts)];
}

async function run() {
    const enContent = fs.readFileSync('./src/data/blogs/en.jsx', 'utf-8');
    
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
        console.log(`Translating to ${lang} via Groq...`);
        let translatedMap = {};
        
        try {
            // Groq can handle larger contexts. We can send chunks of 40 strings.
            const chunkSize = 40;
            for (let i = 0; i < uniqueTexts.length; i += chunkSize) {
                const chunk = uniqueTexts.slice(i, i + chunkSize);
                
                // Map locale codes for better AI understanding
                let langName = lang;
                const langMap = {
                    'ar': 'Arabic', 'ar-MA': 'Moroccan Arabic', 'cs': 'Czech', 'da': 'Danish',
                    'de': 'German', 'el': 'Greek', 'es': 'Spanish', 'fr': 'French',
                    'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean', 'lt': 'Lithuanian',
                    'lv': 'Latvian', 'nb': 'Norwegian Bokmål', 'nl': 'Dutch', 'no': 'Norwegian',
                    'pl': 'Polish', 'pt': 'Portuguese', 'ro': 'Romanian', 'ru': 'Russian',
                    'sv': 'Swedish', 'tr': 'Turkish', 'zh': 'Simplified Chinese'
                };
                if (langMap[lang]) langName = langMap[lang];

                let retries = 3;
                while (retries > 0) {
                    try {
                        const translatedChunks = await translateWithGroq(chunk, langName);
                        for (let j = 0; j < chunk.length; j++) {
                            // sometimes AI removes delimiters or adds extra stuff. Just do best effort.
                            translatedMap[chunk[j]] = translatedChunks[j] || chunk[j];
                        }
                        break;
                    } catch (e) {
                        if (e.message.includes('Rate limit')) {
                            console.log('Rate limit hit, sleeping 10s...');
                            await sleep(10000);
                            retries--;
                        } else {
                            throw e;
                        }
                    }
                }
                await sleep(1000);
            }
        } catch (e) {
            console.error(`Error for ${lang}:`, e.message);
        }

        const translatedBlocks = [];
        for (const block of contentBlocks) {
            let tBlock = block;
            for (const originalText of Object.keys(translatedMap)) {
                const translatedText = translatedMap[originalText];
                if (translatedText && translatedText !== originalText && translatedText.length > 0) {
                    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(`>\\s*${escapeRegExp(originalText)}\\s*<`, 'g');
                    tBlock = tBlock.replace(regex, `>\n${translatedText}\n<`);
                }
            }
            translatedBlocks.push(tBlock);
        }
        
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
