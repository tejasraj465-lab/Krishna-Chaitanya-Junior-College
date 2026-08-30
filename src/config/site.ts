export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ||
  (typeof window !== 'undefined' ? window.location.origin : 'https://krishna-chaitanya-junior-college.vercel.app')
).replace(/\/+$/, '');

export const SITE_NAME = 'Krishna Chaitanya Junior College';
