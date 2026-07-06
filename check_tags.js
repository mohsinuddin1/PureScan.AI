import fs from 'fs';
import path from 'path';

function findMdxFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findMdxFiles(fullPath, fileList);
        } else if (fullPath.endsWith('.mdx') || fullPath.endsWith('.jsx')) {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

const files = findMdxFiles('./src/content/blog');
for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    // Check for `<something> <other> ... </something> ... </other>` -> not possible with simple regex, 
    // but maybe we can just build astro to catch the file name?
}
