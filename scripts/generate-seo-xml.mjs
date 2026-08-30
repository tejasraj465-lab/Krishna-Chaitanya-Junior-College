import { writeFileSync, mkdirSync, copyFileSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const feedsDir = join(publicDir, 'feeds');
const wellKnownDir = join(publicDir, '.well-known');
const dataFile = join(root, 'src', 'data', 'collegeData.ts');

const SITE_URL = (
  process.env.VITE_SITE_URL ||
  process.env.APP_URL ||
  'https://krishna-chaitanya-junior-college.vercel.app'
).replace(/\/+$/, '');

const BUILD_DATE = new Date().toISOString();
const LASTMOD = BUILD_DATE.slice(0, 10);

const CAMPUSES = [
  { id: 'c1', name: 'Prabhanjana Campus (Girls)', summary: 'Girls day campus near Madras Bus Stand, Nellore.' },
  { id: 'c2', name: 'Vasista Campus (Boys)', summary: 'Boys day campus near Madras Bus Stand, Nellore.' },
  { id: 'c3', name: 'Sarvagna Campus, Stonehousepeta', summary: 'Co-education day campus at Stonehousepeta, Nellore.' },
  { id: 'c4', name: 'Durgahmitta Campus (Girls)', summary: 'Girls day campus at Dargamitta, Nellore.' },
  { id: 'c5', name: 'Durgahmitta Campus (Boys)', summary: 'Boys day campus at Dargamitta, Nellore.' },
  { id: 'c6', name: 'Einstein Campus (Girls AC)', summary: 'Girls AC day campus at Magunta Layout, Nellore.' },
  { id: 'c7', name: 'Einstein Campus (Boys AC)', summary: 'Boys AC day campus at Magunta Layout, Nellore.' },
  { id: 'c8', name: 'Buchireddy Palem Campus', summary: 'Regional campus at Buchireddypalem, Nellore District.' },
  { id: 'c9', name: 'Einstein Campus (Girls AC Residential)', summary: 'Girls AC residential campus at Magunta Layout, Nellore.' },
  { id: 'c10', name: 'Chandrahasa Campus (Boys AC)', summary: 'Boys AC residential campus at Magunta Layout, Nellore.' },
  { id: 'c11', name: 'Gomathy Campus (Girls)', summary: 'Girls residential campus beside Gomathy School, Nellore.' },
  { id: 'c12', name: 'Durgahmitta Campus (Boys Residential)', summary: 'Boys residential campus at Dargamitta, Nellore.' },
];

const COURSES = [
  { id: 'mpc', name: 'MPC — Mathematics, Physics, Chemistry', summary: 'Intermediate MPC with integrated IIT-JEE, BITSAT and EAPCET coaching.' },
  { id: 'bipc', name: 'BiPC — Biology, Physics, Chemistry', summary: 'Intermediate BiPC with integrated NEET and medical entrance coaching.' },
  { id: 'mec', name: 'MEC — Mathematics, Economics, Commerce', summary: 'Intermediate MEC with integrated CA and CMA foundation coaching.' },
  { id: 'cec', name: 'CEC — Civics, Economics, Commerce', summary: 'Intermediate CEC with CA/CMA and civil services foundation coaching.' },
  { id: 'longterm', name: 'Long Term NEET Repeater', summary: 'One-year intensive NEET repeater programme.' },
];

const LIFE_ITEMS = [
  { id: 'student-life', name: 'Student Life', summary: 'A balanced campus culture of academics, friendships and mentorship.' },
  { id: 'clubs', name: 'Clubs', summary: 'Interest-based clubs for creativity, leadership and teamwork.' },
  { id: 'cultural', name: 'Cultural Activities', summary: 'Festivals, performances and annual celebrations on campus.' },
  { id: 'sports', name: 'Sports', summary: 'Structured sports, fitness and competitive games.' },
  { id: 'events', name: 'Campus Events', summary: 'Freshers, annual day, seminars and milestone celebrations.' },
  { id: 'nss', name: 'NSS', summary: 'Service initiatives that build social responsibility.' },
  { id: 'ncc', name: 'NCC', summary: 'Leadership and discipline through NCC cadet training.' },
  { id: 'workshops', name: 'Workshops & Seminars', summary: 'Career awareness and academic enrichment sessions.' },
  { id: 'development', name: 'Student Development', summary: 'Personality, confidence and career-readiness programmes.' },
];

const OVERVIEW_ITEMS = [
  { path: '/', name: 'Krishna Chaitanya Junior College', summary: 'Official website of KCJC, Nellore — Intermediate with IIT-JEE, NEET, CA and CMA coaching.' },
  { path: '/overview', name: 'College Overview', summary: 'Overview of academics, campuses, facilities and the KCJC advantage.' },
  { path: '/why-choose-kcjc', name: 'Why Choose KCJC', summary: 'Why families choose Krishna Chaitanya Junior College.' },
  { path: '/facilities', name: 'Facilities & Infrastructure', summary: 'Labs, hostels, transport, safety and student-support facilities.' },
  { path: '/gallery', name: 'Gallery', summary: 'Campus life, events, sports, NCC and academic moments.' },
  { path: '/life-at-kcjc', name: 'Life at KCJC', summary: 'Student life, clubs, sports, NCC, NSS and campus events.' },
  { path: '/courses', name: 'Courses', summary: 'MPC, BiPC, MEC, CEC and Long Term programmes.' },
  { path: '/campuses', name: 'Campuses', summary: 'Day and residential campuses in Nellore and Buchireddypalem.' },
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

function urlset(entries, { images = false } = {}) {
  const xmlns = images
    ? ` xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`
    : ` xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`;

  const body = entries
    .map((entry) => {
      const extra = entry.images?.length ? `\n${imageTags(entry.images)}` : '';
      return `  <url>
    <loc>${xmlEscape(urlLoc(entry.path))}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${entry.changefreq || 'weekly'}</changefreq>
    <priority>${entry.priority || '0.7'}</priority>${extra}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset${xmlns}>
${body}
</urlset>
`;
}

function rss({ file, title, description, selfPath, channelPath, items }) {
  const itemXml = items
    .map(
      (item) => `    <item>
      <title>${xmlEscape(item.title)}</title>
      <link>${xmlEscape(item.link)}</link>
      <guid isPermaLink="${item.guid && item.guid !== item.link ? 'false' : 'true'}">${xmlEscape(item.guid || item.link)}</guid>
      <pubDate>${new Date(BUILD_DATE).toUTCString()}</pubDate>
      <description>${xmlEscape(item.description)}</description>
    </item>`
    )
    .join('\n');

  return {
    file,
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(title)}</title>
    <link>${xmlEscape(urlLoc(channelPath))}</link>
    <description>${xmlEscape(description)}</description>
    <language>en-in</language>
    <lastBuildDate>${new Date(BUILD_DATE).toUTCString()}</lastBuildDate>
    <atom:link href="${xmlEscape(`${SITE_URL}${selfPath}`)}" rel="self" type="application/rss+xml"/>
${itemXml}
  </channel>
</rss>
`,
  };
}

function sitemapIndexEntry(path) {
  return `  <sitemap>
    <loc>${xmlEscape(`${SITE_URL}${path}`)}</loc>
    <lastmod>${LASTMOD}</lastmod>
  </sitemap>`;
}

mkdirSync(feedsDir, { recursive: true });
mkdirSync(wellKnownDir, { recursive: true });

const source = existsSync(dataFile) ? readFileSync(dataFile, 'utf8') : '';
const galleryImages = extractPairs(sliceExport(source, 'GALLERY_ITEMS'), 'title', 'image');
const campusImages = extractPairs(sliceExport(source, 'CAMPUSES'), 'name', 'image');
const facilityImages = extractPairs(sliceExport(source, 'FACILITIES'), 'title', 'image');

const allPageEntries = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/overview', changefreq: 'weekly', priority: '0.9' },
  { path: '/why-choose-kcjc', changefreq: 'weekly', priority: '0.8' },
  { path: '/facilities', changefreq: 'weekly', priority: '0.8' },
  { path: '/gallery', changefreq: 'weekly', priority: '0.8' },
  { path: '/life-at-kcjc', changefreq: 'weekly', priority: '0.8' },
  { path: '/courses', changefreq: 'weekly', priority: '0.9' },
  { path: '/campuses', changefreq: 'weekly', priority: '0.9' },
  { path: '/campuses?category=Day', changefreq: 'weekly', priority: '0.6' },
  { path: '/campuses?category=Residential', changefreq: 'weekly', priority: '0.6' },
  ...CAMPUSES.map((campus) => ({
    path: `/campuses/${campus.id}`,
    changefreq: 'weekly',
    priority: '0.8',
  })),
];

const overviewSitemap = urlset([
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/overview', changefreq: 'weekly', priority: '0.9' },
  { path: '/why-choose-kcjc', changefreq: 'weekly', priority: '0.8' },
]);

const facilitiesSitemap = urlset(
  [{ path: '/facilities', changefreq: 'weekly', priority: '0.8', images: facilityImages }],
  { images: true }
);

const gallerySitemap = urlset(
  [{ path: '/gallery', changefreq: 'weekly', priority: '0.8', images: galleryImages }],
  { images: true }
);

const campusesSitemap = urlset(
  [
    { path: '/campuses', changefreq: 'weekly', priority: '0.9' },
    { path: '/campuses?category=Day', changefreq: 'weekly', priority: '0.6' },
    { path: '/campuses?category=Residential', changefreq: 'weekly', priority: '0.6' },
    ...CAMPUSES.map((campus, index) => ({
      path: `/campuses/${campus.id}`,
      changefreq: 'weekly',
      priority: '0.8',
      images: campusImages[index] ? [campusImages[index]] : [],
    })),
  ],
  { images: true }
);

const lifeSitemap = urlset([{ path: '/life-at-kcjc', changefreq: 'weekly', priority: '0.8' }]);
const coursesSitemap = urlset([{ path: '/courses', changefreq: 'weekly', priority: '0.9' }]);

const pagesSitemap = urlset(allPageEntries);

const imagesSitemap = urlset(
  [
    { path: '/gallery', changefreq: 'weekly', priority: '0.8', images: galleryImages },
    { path: '/facilities', changefreq: 'weekly', priority: '0.7', images: facilityImages },
    ...CAMPUSES.map((campus, index) => ({
      path: `/campuses/${campus.id}`,
      changefreq: 'weekly',
      priority: '0.7',
      images: campusImages[index] ? [campusImages[index]] : [],
    })),
  ].filter((entry) => entry.images?.length),
  { images: true }
);

const childSitemaps = [
  '/sitemap-pages.xml',
  '/sitemap-images.xml',
  '/overview.xml',
  '/facilities.xml',
  '/gallery.xml',
  '/campuses.xml',
  '/life-at-kcjc.xml',
  '/courses.xml',
];

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${childSitemaps.map(sitemapIndexEntry).join('\n')}
</sitemapindex>
`;

const overviewFeed = rss({
  file: 'overview.xml',
  title: 'KCJC College Overview',
  description: 'Official overview updates from Krishna Chaitanya Junior College, Nellore.',
  selfPath: '/feeds/overview.xml',
  channelPath: '/overview',
  items: OVERVIEW_ITEMS.map((item) => ({
    title: item.name,
    link: urlLoc(item.path),
    description: item.summary,
  })),
});

const campusesFeed = rss({
  file: 'campuses.xml',
  title: 'KCJC Campuses',
  description: 'Campus listings for Krishna Chaitanya Junior College in Nellore.',
  selfPath: '/feeds/campuses.xml',
  channelPath: '/campuses',
  items: [
    {
      title: 'All KCJC Campuses',
      link: urlLoc('/campuses'),
      description: 'Browse day and residential campuses of Krishna Chaitanya Junior College.',
    },
    ...CAMPUSES.map((campus) => ({
      title: campus.name,
      link: urlLoc(`/campuses/${campus.id}`),
      description: campus.summary,
    })),
  ],
});

const lifeFeed = rss({
  file: 'life-at-kcjc.xml',
  title: 'Life at KCJC',
  description: 'Student life, clubs, sports, NCC, NSS and campus events at Krishna Chaitanya Junior College.',
  selfPath: '/feeds/life-at-kcjc.xml',
  channelPath: '/life-at-kcjc',
  items: LIFE_ITEMS.map((item) => ({
    title: item.name,
    link: urlLoc('/life-at-kcjc'),
    guid: `${urlLoc('/life-at-kcjc')}#${item.id}`,
    description: item.summary,
  })),
});

const coursesFeed = rss({
  file: 'courses.xml',
  title: 'KCJC Courses',
  description: 'Intermediate and long-term programmes at Krishna Chaitanya Junior College.',
  selfPath: '/feeds/courses.xml',
  channelPath: '/courses',
  items: COURSES.map((course) => ({
    title: course.name,
    link: urlLoc('/courses'),
    guid: `${urlLoc('/courses')}#${course.id}`,
    description: course.summary,
  })),
});

writeFileSync(join(publicDir, 'sitemap.xml'), sitemapIndex);
writeFileSync(join(publicDir, 'sitemap-pages.xml'), pagesSitemap);
writeFileSync(join(publicDir, 'sitemap-images.xml'), imagesSitemap);
writeFileSync(join(publicDir, 'overview.xml'), overviewSitemap);
writeFileSync(join(publicDir, 'facilities.xml'), facilitiesSitemap);
writeFileSync(join(publicDir, 'gallery.xml'), gallerySitemap);
writeFileSync(join(publicDir, 'campuses.xml'), campusesSitemap);
writeFileSync(join(publicDir, 'life-at-kcjc.xml'), lifeSitemap);
writeFileSync(join(publicDir, 'courses.xml'), coursesSitemap);

for (const feed of [overviewFeed, campusesFeed, lifeFeed, coursesFeed]) {
  writeFileSync(join(feedsDir, feed.file), feed.xml);
}

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

# Submit this URL in Google Search Console → Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-pages.xml
Sitemap: ${SITE_URL}/sitemap-images.xml
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

console.log(`SEO XML generated for ${SITE_URL}`);
console.log(`Pages: ${allPageEntries.length} | Gallery images: ${galleryImages.length} | Campus images: ${campusImages.length} | Facility images: ${facilityImages.length}`);
console.log(`Google Search Console: submit ${SITE_URL}/sitemap.xml`);
