import fs from 'fs';
import path from 'path';

function findJsxFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fullPath.endsWith('.jsx')) {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

const files = findJsxFiles('./src/data/blogs');
for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace all instances of `>\n\s*` with `>` ONLY for inline elements: strong, li, p, em, span, a, h3
    // A simpler way is to just do: `>\n\s*` -> `>` inside the content block!
    // But we want to keep some formatting? Actually it doesn't matter for mdx/html.
    
    content = content.replace(/content:\s*\(([\s\S]*?)\n\s*\)/g, (match, block) => {
        // inside the block, remove any newline that is directly between two tags or inside a tag
        // Example: <li>\n<strong> -> <li><strong>
        let newBlock = block.replace(/>\s+</g, '><');
        
        // Also remove newlines at the start or end of text nodes
        // Example: >\nText -> >Text
        newBlock = newBlock.replace(/>\s+([^<])/g, '>$1');
        // Example: Text\n< -> Text<
        newBlock = newBlock.replace(/([^>])\s+</g, '$1<');
        
        return `content: (\n${newBlock}\n        )`;
    });

    fs.writeFileSync(file, content);
}
console.log('Fixed all whitespace in JSX files.');
