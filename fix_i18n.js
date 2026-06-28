import fs from 'fs';
import path from 'path';

const compsDir = './src/components';
const files = fs.readdirSync(compsDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(compsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace import
  content = content.replace(/import\s*\{\s*useTranslation\s*\}\s*from\s*['"]react-i18next['"];?/g, "import { useTranslation } from './TranslationProvider';");

  fs.writeFileSync(filePath, content);
}
console.log('Replaced useTranslation imports');
