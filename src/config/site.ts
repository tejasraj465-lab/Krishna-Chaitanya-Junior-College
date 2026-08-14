export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ||
  (typeof window !== 'undefined' ? window.location.origin : 'https://krishna-chaitanya-junior-college.vercel.app')
).replace(/\/+$/, '');

export const SITE_NAME = 'Krishna Chaitanya Junior College';

export const FEED_LINKS = [
  { title: 'KCJC Overview', href: '/feeds/overview.xml' },
  { title: 'KCJC Campuses', href: '/feeds/campuses.xml' },
  { title: 'Life at KCJC', href: '/feeds/life-at-kcjc.xml' },
  { title: 'KCJC Courses', href: '/feeds/courses.xml' },
] as const;
