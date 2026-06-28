import fs from 'fs';
import path from 'path';

const srcDir = './src/data/blogs';
const outDir = './src/content/blog';

// Ensure outDir exists
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
    const lang = file.replace('.jsx', '');
    const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');

    const langOutDir = path.join(outDir, lang);
    if (!fs.existsSync(langOutDir)) {
        fs.mkdirSync(langOutDir, { recursive: true });
    }

    // A simple regex approach to find objects inside the array.
    // The structure is roughly { id: 1, title: "...", badge: "...", description: "...", image: "...", content: (...) }
    const regex = /\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*badge:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*image:\s*"([^"]+)",\s*content:\s*\(([\s\S]*?)\)\s*\}/g;

    let match;
    let postCount = 0;
    while ((match = regex.exec(content)) !== null) {
        const id = match[1];
        const title = match[2];
        const badge = match[3];
        const description = match[4];
        const image = match[5];
        const jsxContent = match[6];

        const mdxContent = `---
id: ${id}
title: "${title.replace(/"/g, '\\"')}"
badge: "${badge}"
description: "${description.replace(/"/g, '\\"')}"
image: "${image}"
---
import { Zap, Search, ShieldAlert } from 'lucide-react';

${jsxContent.trim()}
`;
        
        // create a slug from the title (very simple slugifier)
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        fs.writeFileSync(path.join(langOutDir, `${id}-${slug}.mdx`), mdxContent);
        postCount++;
    }
    console.log(`Converted ${postCount} posts for language: ${lang}`);
}
