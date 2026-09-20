const DEFAULT_SITE_URL = 'https://krishna-chaitanya-junior-college.vercel.app';

function readSiteUrl(): string {
  // Vite injects import.meta.env in the browser/build. Node (tsx server.ts) does not.
  const viteUrl = import.meta.env?.VITE_SITE_URL;
  if (viteUrl) return viteUrl;

  if (typeof process !== 'undefined') {
    const nodeUrl = process.env?.VITE_SITE_URL || process.env?.APP_URL;
    if (nodeUrl) return nodeUrl;
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }

  return DEFAULT_SITE_URL;
}

export const SITE_URL = readSiteUrl().replace(/\/+$/, '');

export const SITE_NAME = 'Krishna Chaitanya Junior College';
