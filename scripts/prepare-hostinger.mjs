import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const hostingerDir = join(root, 'hostinger');

if (!existsSync(distDir)) {
  throw new Error('dist/ is missing. Run vite build first.');
}

cpSync(join(hostingerDir, '.htaccess'), join(distDir, '.htaccess'));
cpSync(join(hostingerDir, '.user.ini'), join(distDir, '.user.ini'));

const apiDest = join(distDir, 'api');
mkdirSync(apiDest, { recursive: true });
cpSync(join(hostingerDir, 'api', 'ai-guide.php'), join(apiDest, 'ai-guide.php'));
cpSync(join(hostingerDir, 'api', 'gemini-config.example.php'), join(apiDest, 'gemini-config.example.php'));

console.log('Hostinger files copied into dist/');
console.log('Upload the contents of dist/ to public_html.');
