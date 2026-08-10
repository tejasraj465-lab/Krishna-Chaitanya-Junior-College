/** Allowlisted in-app navigation targets for AI-driven routing. */

import { HOME_SECTION_IDS, normalizeHomeSectionId } from './homeSectionNavigation';

export const ALLOWED_SECTION_IDS = new Set<string>([
  ...HOME_SECTION_IDS,
  // Legacy aliases still accepted from older AI tags / bookmarks
  'welcome',
  'ncc-nss',
  'life-at-kc',
  'admissions',
]);

export const ALLOWED_PATHS = new Set([
  '/',
  '/facilities',
  '/gallery',
  '/life-at-kcjc',
  '/why-choose-kcjc',
  '/campuses',
]);

const CAMPUS_SLUG_PATTERN = /^[a-z0-9-]+$/i;

export function sanitizeSectionId(sectionId: string): string | null {
  const trimmed = sectionId.trim();
  if (!trimmed || trimmed.includes('://') || trimmed.startsWith('//')) {
    return null;
  }
  const normalized = normalizeHomeSectionId(trimmed);
  if (normalized) return normalized;
  return ALLOWED_SECTION_IDS.has(trimmed) ? trimmed : null;
}

export function sanitizeInternalPath(path: string): string | null {
  if (!path || typeof path !== 'string') return null;

  const trimmed = path.trim();
  if (!trimmed.startsWith('/') || trimmed.includes('://') || trimmed.startsWith('//')) {
    return null;
  }

  const [pathname, search = ''] = trimmed.split('?');

  if (!ALLOWED_PATHS.has(pathname)) {
    if (!pathname.startsWith('/campuses/')) return null;
    const slug = pathname.slice('/campuses/'.length);
    if (!slug || !CAMPUS_SLUG_PATTERN.test(slug)) return null;
  }

  if (!search) return pathname;

  const params = new URLSearchParams(search);
  const keys = [...params.keys()];
  if (keys.length === 0) return pathname;
  if (keys.length !== 1 || keys[0] !== 'category') return null;

  const category = params.get('category');
  if (category !== 'Day' && category !== 'Residential') return null;

  return `${pathname}?category=${category}`;
}
