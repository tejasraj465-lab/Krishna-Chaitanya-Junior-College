import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const wellKnownDir = join(publicDir, '.well-known');
const dataFile = join(root, 'src', 'data', 'collegeData.ts');

const SITE_URL = (
  process.env.VITE_SITE_URL ||
  process.env.APP_URL ||
  'https://krishna-chaitanya-junior-college.vercel.app'
).replace(/\/+$/, '');

const LASTMOD = new Date().toISOString().slice(0, 10);

const CAMPUSES = [
  { id: 'c1', name: 'Prabhanjana Campus (Girls)' },
  { id: 'c2', name: 'Vasista Campus (Boys)' },
  { id: 'c3', name: 'Sarvagna Campus, Stonehousepeta' },
  { id: 'c4', name: 'Durgahmitta Campus (Girls)' },
  { id: 'c5', name: 'Durgahmitta Campus (Boys)' },
  { id: 'c6', name: 'Einstein Campus (Girls AC)' },
  { id: 'c7', name: 'Einstein Campus (Boys AC)' },
  { id: 'c8', name: 'Buchireddy Palem Campus' },
  { id: 'c9', name: 'Einstein Campus (Girls AC Residential)' },
  { id: 'c10', name: 'Chandrahasa Campus (Boys AC)' },
  { id: 'c11', name: 'Gomathy Campus (Girls)' },
  { id: 'c12', name: 'Durgahmitta Campus (Boys Residential)' },
];

const DUPLICATE_XML = [
  'sitemap-pages.xml',
  'sitemap-images.xml',
  'overview.xml',
  'facilities.xml',
  'gallery.xml',
  'campuses.xml',
  'life-at-kcjc.xml',
  'courses.xml',
];

function xmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function urlLoc(path) {
  if (path === '/') return SITE_URL;
  return `${SITE_URL}${path}`;
}

function sliceExport(source, exportName) {
  const start = source.indexOf(`export const ${exportName}`);
  if (start < 0) return '';
  const next = source.indexOf('\nexport const ', start + 12);
  return next < 0 ? source.slice(start) : source.slice(start, next);
}

function extractPairs(block, titleKey, imageKey) {
  const items = [];
  const titleRe = new RegExp(`${titleKey}:\\s*'((?:\\\\'|[^'])*)'`, 'g');
  const imageRe = new RegExp(`${imageKey}:\\s*'((?:\\\\'|[^'])*)'`, 'g');
  const titles = [...block.matchAll(titleRe)].map((m) => m[1]);
  const images = [...block.matchAll(imageRe)].map((m) => m[1]);
  const count = Math.min(titles.length, images.length);
  for (let i = 0; i < count; i += 1) {
    if (images[i]?.startsWith('http')) {
      items.push({ title: titles[i], image: images[i] });
    }
  }
  return items;
}

function imageTags(images) {
  return images
    .map(
      (img) => `    <image:image>
      <image:loc>${xmlEscape(img.image)}</image:loc>
      <image:title>${xmlEscape(img.title)}</image:title>
    </image:image>`
    )
    .join('\n');
}

mkdirSync(wellKnownDir, { recursive: true });

const source = existsSync(dataFile) ? readFileSync(dataFile, 'utf8') : '';
const galleryImages = extractPairs(sliceExport(source, 'GALLERY_ITEMS'), 'title', 'image');
const campusImages = extractPairs(sliceExport(source, 'CAMPUSES'), 'name', 'image');
const facilityImages = extractPairs(sliceExport(source, 'FACILITIES'), 'title', 'image');

const entries = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/overview', changefreq: 'weekly', priority: '0.9' },
  { path: '/why-choose-kcjc', changefreq: 'weekly', priority: '0.8' },
  { path: '/facilities', changefreq: 'weekly', priority: '0.8', images: facilityImages },
  { path: '/gallery', changefreq: 'weekly', priority: '0.8', images: galleryImages },
  { path: '/life-at-kcjc', changefreq: 'weekly', priority: '0.8' },
  { path: '/courses', changefreq: 'weekly', priority: '0.9' },
  { path: '/campuses', changefreq: 'weekly', priority: '0.9' },
  { path: '/campuses?category=Day', changefreq: 'weekly', priority: '0.6' },
  { path: '/campuses?category=Residential', changefreq: 'weekly', priority: '0.6' },
  ...CAMPUSES.map((campus, index) => ({
    path: `/campuses/${campus.id}`,
    changefreq: 'weekly',
    priority: '0.8',
    images: campusImages[index] ? [campusImages[index]] : [],
  })),
];

const body = entries
  .map((entry) => {
    const extra = entry.images?.length ? `\n${imageTags(entry.images)}` : '';
    return `  <url>
    <loc>${xmlEscape(urlLoc(entry.path))}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${extra}
  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>
`;

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);

writeFileSync(
  join(publicDir, 'robots.txt'),
  `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

Disallow: /api/
Disallow: /gemini-config.php

Sitemap: ${SITE_URL}/sitemap.xml
`
);

writeFileSync(
  join(wellKnownDir, 'security.txt'),
  `Contact: mailto:admissions@kcjc.edu.in
Preferred-Languages: en, te
Canonical: ${SITE_URL}/.well-known/security.txt
Expires: 2027-12-31T23:59:59.000Z
`
);

const logoSrc = join(root, 'src', 'assets', 'kc_logo.svg');
if (existsSync(logoSrc)) {
  copyFileSync(logoSrc, join(publicDir, 'logo.svg'));
}

for (const file of DUPLICATE_XML) {
  const path = join(publicDir, file);
  if (existsSync(path)) unlinkSync(path);
}

const feedsDir = join(publicDir, 'feeds');
if (existsSync(feedsDir)) {
  rmSync(feedsDir, { recursive: true, force: true });
}

const imageCount = galleryImages.length + campusImages.length + facilityImages.length;
console.log(`SEO XML generated for ${SITE_URL}`);
console.log(`One sitemap.xml | Pages: ${entries.length} | Images: ${imageCount}`);
console.log(`Google Search Console: submit ${SITE_URL}/sitemap.xml`);
