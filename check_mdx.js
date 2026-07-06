import fs from 'fs';
import path from 'path';
import { compile } from '@mdx-js/mdx';

async function findMdxFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            await findMdxFiles(fullPath, fileList);
        } else if (fullPath.endsWith('.mdx')) {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

async function run() {
    const files = await findMdxFiles('./src/content/blog');
    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        try {
            await compile(content);
        } catch (e) {
            console.error(`\nError compiling ${file}:`);
            console.error(e.message);
        }
    }
}
run();
