import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const hostingerDir = join(root, 'hostinger');
const uploadDir = join(root, 'hostinger-upload');

if (!existsSync(distDir)) {
  throw new Error('dist/ is missing. Run vite build first.');
}

cpSync(join(hostingerDir, '.htaccess'), join(distDir, '.htaccess'));
cpSync(join(hostingerDir, '.user.ini'), join(distDir, '.user.ini'));

const apiDest = join(distDir, 'api');
mkdirSync(apiDest, { recursive: true });
cpSync(join(hostingerDir, 'api', 'ai-guide.php'), join(apiDest, 'ai-guide.php'));
cpSync(join(hostingerDir, 'api', 'gemini-config.example.php'), join(apiDest, 'gemini-config.example.php'));

writeFileSync(
  join(distDir, 'HOSTINGER-UPLOAD.txt'),
  `Upload EVERY file in this folder into Hostinger public_html (not the folder itself).
Turn on "Show hidden files" so .htaccess and .user.ini are uploaded.

Then on the server copy api/gemini-config.example.php to api/gemini-config.php
and paste your Gemini API key. See HOSTINGER.md in the project.
`
);

rmSync(uploadDir, { recursive: true, force: true });
cpSync(distDir, uploadDir, { recursive: true });

console.log('Hostinger files copied into dist/ and hostinger-upload/');
console.log('Upload the CONTENTS of hostinger-upload/ to Hostinger public_html.');
console.log('See HOSTINGER.md for the full checklist.');
