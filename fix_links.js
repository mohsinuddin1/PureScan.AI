import fs from 'fs';
import path from 'path';

const compsDir = './src/components';
const files = fs.readdirSync(compsDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(compsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove import { Link }
  content = content.replace(/import\s*\{\s*(?:[^}]*,\s*)?Link(?:,\s*[^}]*)?\s*\}\s*from\s*['"]react-router-dom['"];?\n?/g, (match) => {
    // If it was just Link, remove it. If it was { useParams, Link }, leave useParams.
    if (match.includes('useParams')) {
        return "import { useParams } from 'react-router-dom';\n";
    }
    return '';
  });

  // Replace <Link to="x"> with <a href="x">
  content = content.replace(/<Link\s+to=/g, '<a href=');
  
  // Replace </Link> with </a>
  content = content.replace(/<\/Link>/g, '</a>');

  fs.writeFileSync(filePath, content);
}
console.log('Fixed Links in components');
