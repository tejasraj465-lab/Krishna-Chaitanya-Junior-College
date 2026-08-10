/** Canonical Home section IDs + smart return-section helpers. */

export const HOME_SECTION_IDS = [
  'hero',
  'courses',
  'why-choose',
  'campuses',
  'facilities',
  'ncc',
  'stories',
  'explore-kcjc',
  'leadership',
] as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

const HOME_SECTION_SET = new Set<string>(HOME_SECTION_IDS);

/** Legacy IDs still accepted from old hashes / AI tags. */
const SECTION_ALIASES: Record<string, HomeSectionId> = {
  welcome: 'why-choose',
  'ncc-nss': 'ncc',
  'life-at-kc': 'explore-kcjc',
  'life-at-kcjc': 'explore-kcjc',
  'why-us': 'why-choose',
  'why-choose-kcjc': 'why-choose',
  /** Gallery is a dedicated page only — return near the previous home block */
  gallery: 'leadership',
};

const STORAGE_KEY = 'kcjc:homeReturnSection';

/** Dedicated pages → related Home section (used when leaving Home without an explicit fromSection). */
export const PATH_HOME_SECTION: Record<string, HomeSectionId> = {
  '/facilities': 'facilities',
  '/gallery': 'leadership',
  '/campuses': 'campuses',
  '/life-at-kcjc': 'explore-kcjc',
  '/why-choose-kcjc': 'why-choose',
};

export function normalizeHomeSectionId(sectionId: string | null | undefined): HomeSectionId | null {
  if (!sectionId) return null;
  const trimmed = sectionId.trim().replace(/^#/, '');
  if (!trimmed) return null;
  if (HOME_SECTION_SET.has(trimmed)) return trimmed as HomeSectionId;
  return SECTION_ALIASES[trimmed] ?? null;
}

export function isHomeSectionId(sectionId: string | null | undefined): sectionId is HomeSectionId {
  return normalizeHomeSectionId(sectionId) !== null;
}

export function getHomeReturnSection(): HomeSectionId | null {
  try {
    return normalizeHomeSectionId(sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function setHomeReturnSection(sectionId: string | null | undefined): void {
  const normalized = normalizeHomeSectionId(sectionId);
  try {
    if (!normalized || normalized === 'hero') {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, normalized);
  } catch {
    // Ignore quota / private-mode failures.
  }
}

export function clearHomeReturnSection(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function getReturnSectionForPath(path: string): HomeSectionId | null {
  try {
    const url = new URL(path, window.location.origin);
    if (url.pathname.startsWith('/campuses')) return 'campuses';
    return PATH_HOME_SECTION[url.pathname] ?? null;
  } catch {
    return null;
  }
}

/**
 * Scroll to a Home section after it exists in the DOM.
 * Uses scroll-margin-top on sections for sticky-header offset.
 */
export function scrollToHomeSectionWhenReady(
  sectionId: string,
  options: { behavior?: ScrollBehavior; maxFrames?: number } = {}
): void {
  const id = normalizeHomeSectionId(sectionId) ?? 'hero';
  const behavior = options.behavior ?? 'smooth';
  const maxFrames = options.maxFrames ?? 60;
  let frames = 0;

  const attempt = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior, block: 'start' });
      return;
    }

    frames += 1;
    if (frames < maxFrames) {
      requestAnimationFrame(attempt);
    }
  };

  requestAnimationFrame(attempt);
}
