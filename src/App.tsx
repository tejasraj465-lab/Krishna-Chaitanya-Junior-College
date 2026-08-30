import React, { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { SeoHead } from './components/SeoHead';
import { GoogleManager } from './components/GoogleManager';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { OpeningAnimation } from './components/OpeningAnimation';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AdmissionModalBottomSheet } from './components/AdmissionModalBottomSheet';
import { FloatingAssistancePopup } from './components/FloatingAssistancePopup';
import { AIBotWidgetFloating } from './components/AIBotWidgetFloating';
import { HomePage } from './pages/HomePage';
import { CAMPUSES } from './data/collegeData';
import type { CampusCategoryFilter } from './pages/CampusesPage';
import {
  HOME_SECTION_IDS,
  clearHomeReturnSection,
  normalizeHomeSectionId,
  scrollToHomeSectionWhenReady,
  setHomeReturnSection,
  type HomeSectionId,
} from './utils/homeSectionNavigation';

const FacilitiesPage = lazy(() => import('./pages/FacilitiesPage').then((m) => ({ default: m.FacilitiesPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const LifeAtKcjcPage = lazy(() => import('./pages/LifeAtKcjcPage').then((m) => ({ default: m.LifeAtKcjcPage })));
const CoursesPage = lazy(() => import('./pages/CoursesPage').then((m) => ({ default: m.CoursesPage })));
const WhyChooseKcjcPage = lazy(() => import('./pages/WhyChooseKcjcPage').then((m) => ({ default: m.WhyChooseKcjcPage })));
const CampusesPage = lazy(() => import('./pages/CampusesPage').then((m) => ({ default: m.CampusesPage })));
const CampusDetailPage = lazy(() => import('./pages/CampusDetailPage').then((m) => ({ default: m.CampusDetailPage })));
const AICampusGuide = lazy(() => import('./components/AICampusGuide').then((m) => ({ default: m.AICampusGuide })));
const CampusVisitModal = lazy(() => import('./components/CampusVisitModal').then((m) => ({ default: m.CampusVisitModal })));
const CourseDetailModal = lazy(() => import('./components/CourseDetailModal').then((m) => ({ default: m.CourseDetailModal })));

const PageFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center text-sm font-semibold text-slate-400">
    Loading…
  </div>
);

type RouteKey = 'home' | 'facilities' | 'gallery' | 'life-at-kcjc' | 'courses' | 'why-choose-kcjc' | 'campuses' | 'campus-detail';

type NavigatePathOptions = {
  fromSection?: HomeSectionId | string;
};

type HistoryState = {
  scrollY?: number;
  activeSection?: string;
};

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const readHistoryState = (): HistoryState => {
  const state = window.history.state;
  return state && typeof state === 'object' ? (state as HistoryState) : {};
};

/** Persist current scroll on the active history entry before leaving the page. */
const persistCurrentScroll = (activeSection?: string) => {
  window.history.replaceState(
    {
      ...readHistoryState(),
      scrollY: window.scrollY,
      ...(activeSection ? { activeSection } : {}),
    },
    '',
    window.location.href
  );
};

const getCampusFromSlug = (slug: string | null) => {
  if (!slug) return null;
  return CAMPUSES.find((campus) => slugify(campus.id) === slugify(slug)) || null;
};

const getRouteState = (pathname: string) => {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  if (normalized === '/campuses') {
    return { routeKey: 'campuses' as const, campusSlug: null };
  }

  if (normalized.startsWith('/campuses/')) {
    return {
      routeKey: 'campus-detail' as const,
      campusSlug: decodeURIComponent(normalized.split('/')[2] || '') || null,
    };
  }

  switch (normalized) {
    case '/facilities':
      return { routeKey: 'facilities' as const, campusSlug: null };
    case '/gallery':
      return { routeKey: 'gallery' as const, campusSlug: null };
    case '/life-at-kcjc':
      return { routeKey: 'life-at-kcjc' as const, campusSlug: null };
    case '/courses':
      return { routeKey: 'courses' as const, campusSlug: null };
    case '/overview':
    case '/why-choose-kcjc':
      return { routeKey: 'why-choose-kcjc' as const, campusSlug: null };
    default:
      return { routeKey: 'home' as const, campusSlug: null };
  }
};

const getSeoTitle = (routeKey: RouteKey, campusName?: string | null) => {
  switch (routeKey) {
    case 'facilities':
      return 'Facilities & Infrastructure | Krishna Chaitanya Junior College';
    case 'gallery':
      return 'Gallery | Krishna Chaitanya Junior College';
    case 'life-at-kcjc':
      return 'Life at KCJC | Krishna Chaitanya Junior College';
    case 'courses':
      return 'Courses | Krishna Chaitanya Junior College';
    case 'why-choose-kcjc':
      return 'College Overview | Krishna Chaitanya Junior College';
    case 'campuses':
      return 'Campuses | Krishna Chaitanya Junior College';
    case 'campus-detail':
      return `${campusName || 'Campus'} | Krishna Chaitanya Junior College`;
    default:
      return "Krishna Chaitanya Junior College | India's Rank 1 Junior College for IIT-JEE, NEET & Intermediate";
  }
};

const getSeoDescription = (routeKey: RouteKey, campusName?: string | null) => {
  switch (routeKey) {
    case 'facilities':
      return 'Explore the college facilities, labs, hostels, transport, medical care, and student support infrastructure.';
    case 'gallery':
      return 'Browse campus life, achievements, events, sports, NCC, NSS, and academic moments across the college.';
    case 'life-at-kcjc':
      return 'See how student life at KCJC blends academics, clubs, cultural activities, sports, NCC, NSS, and celebrations.';
    case 'courses':
      return 'Explore Intermediate MPC, BiPC, MEC, CEC and Long Term programmes with integrated IIT-JEE, NEET, EAPCET, CA and CMA coaching.';
    case 'why-choose-kcjc':
      return 'College overview of Krishna Chaitanya Junior College: academics, campuses, facilities, and why families choose KCJC.';
    case 'campuses':
      return 'Browse the existing Krishna Chaitanya campuses with search, type filters, and real campus details from the current website data.';
    case 'campus-detail':
      return campusName ? `View real details, facilities, and contact information for ${campusName}.` : 'View real campus details, facilities, and contact information.';
    default:
      return 'Top Junior College offering integrated IIT-JEE, NEET, CA/CMA, long term and Intermediate coaching with 28+ years of excellence.';
  }
};

const getCampusCategoryFromSearch = (search = window.location.search): CampusCategoryFilter => {
  const value = new URLSearchParams(search).get('category');
  if (value === 'Day' || value === 'Residential') return value;
  return 'All';
};

export default function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyCourse, setApplyCourse] = useState('MPC');
  const [applyCampus, setApplyCampus] = useState(CAMPUSES[0]?.id ?? '');

  const [isAIGuideOpen, setIsAIGuideOpen] = useState(false);
  const [isCampusVisitOpen, setIsCampusVisitOpen] = useState(false);

  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [campusCategory, setCampusCategory] = useState<CampusCategoryFilter>(() =>
    getCampusCategoryFromSearch()
  );
  const initialRouteState = getRouteState(window.location.pathname);
  const [routeKey, setRouteKey] = useState<RouteKey>(initialRouteState.routeKey);
  const [campusSlug, setCampusSlug] = useState<string | null>(initialRouteState.campusSlug);
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (initialRouteState.routeKey === 'home') {
      return window.location.hash.replace('#', '') || 'hero';
    }
    return initialRouteState.routeKey;
  });
  const [pendingSection, setPendingSection] = useState<string | null>(() => window.location.hash.replace('#', '') || null);
  const [restoreScrollY, setRestoreScrollY] = useState<number | null>(null);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Fresh entry / reload only — do not treat this as a Back navigation.
    if (initialRouteState.routeKey === 'home') {
      if (window.location.pathname !== '/') {
        window.history.replaceState({ scrollY: 0 }, '', '/');
      } else if (!window.location.hash) {
        window.history.replaceState({ scrollY: 0 }, '', window.location.href);
        window.scrollTo({ top: 0, behavior: 'auto' });
        setActiveSection('hero');
      }
    } else {
      window.history.replaceState({ scrollY: 0 }, '', window.location.href);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const nextRouteState = getRouteState(window.location.pathname);
      const nextSection = window.location.hash.replace('#', '') || null;
      const state = (event.state && typeof event.state === 'object' ? event.state : {}) as HistoryState;
      const savedScrollY = typeof state.scrollY === 'number' ? state.scrollY : null;
      const savedSection =
        typeof state.activeSection === 'string' && state.activeSection
          ? state.activeSection
          : null;

      setRouteKey(nextRouteState.routeKey);
      setCampusSlug(nextRouteState.campusSlug);
      setCampusCategory(getCampusCategoryFromSearch());

      if (savedScrollY !== null) {
        // Restore exact previous scroll for Home and every other route.
        setPendingSection(null);
        setRestoreScrollY(savedScrollY);
        setActiveSection(
          nextRouteState.routeKey === 'home'
            ? savedSection || nextSection || 'hero'
            : nextRouteState.routeKey
        );
        return;
      }

      if (nextRouteState.routeKey === 'home' && nextSection) {
        setPendingSection(nextSection);
        setRestoreScrollY(null);
        setActiveSection(nextSection);
        return;
      }

      // Legacy history entries without scrollY — keep natural top for that page.
      setPendingSection(null);
      setRestoreScrollY(0);
      setActiveSection(nextRouteState.routeKey === 'home' ? 'hero' : nextRouteState.routeKey);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useLayoutEffect(() => {
    if (restoreScrollY === null) return;

    const y = restoreScrollY;
    setRestoreScrollY(null);
    window.scrollTo({ top: y, left: 0, behavior: 'auto' });
    // Re-apply after layout settles so tall home sections restore accurately.
    requestAnimationFrame(() => {
      window.scrollTo({ top: y, left: 0, behavior: 'auto' });
    });
  }, [routeKey, restoreScrollY]);

  useEffect(() => {
    if (routeKey !== 'home') {
      setActiveSection(routeKey);
      return;
    }

    const sectionIds = [...HOME_SECTION_IDS];

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const best = visibleEntries.reduce((prev, curr) =>
          curr.intersectionRatio > prev.intersectionRatio ? curr : prev
        );
        if (best.target.id) {
          setActiveSection(best.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-96px 0px -40% 0px',
      threshold: [0.1, 0.3, 0.6]
    });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection('hero');
      } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('leadership');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [routeKey]);

  useEffect(() => {
    if (routeKey !== 'home' || !pendingSection) {
      return;
    }

    const target = normalizeHomeSectionId(pendingSection) ?? pendingSection;

    // Wait until Home is mounted and the section exists, then scroll with header offset.
    const timeoutId = window.setTimeout(() => {
      scrollToHomeSectionWhenReady(target, { behavior: 'smooth' });
      setActiveSection(target);
      setPendingSection(null);
    }, 50);

    return () => window.clearTimeout(timeoutId);
  }, [routeKey, pendingSection]);

  const rememberHomeReturnSection = (fromSection?: string) => {
    if (routeKey !== 'home') return;

    const section =
      normalizeHomeSectionId(fromSection) ??
      normalizeHomeSectionId(activeSection);

    if (section && section !== 'hero') {
      setHomeReturnSection(section);
    } else {
      clearHomeReturnSection();
    }
  };

  const navigateToPath = (path: string, options?: NavigatePathOptions) => {
    rememberHomeReturnSection(options?.fromSection);
    persistCurrentScroll(activeSection);

    const url = new URL(path, window.location.origin);
    const nextRouteState = getRouteState(url.pathname);
    const nextSection = path.includes('#')
      ? normalizeHomeSectionId(path.split('#')[1] || '') || path.split('#')[1] || null
      : null;

    window.history.pushState({ scrollY: 0, activeSection: nextRouteState.routeKey }, '', path);

    setRouteKey(nextRouteState.routeKey);
    setCampusSlug(nextRouteState.campusSlug);
    if (nextRouteState.routeKey === 'campuses') {
      setCampusCategory(getCampusCategoryFromSearch(url.search));
    }
    setPendingSection(nextSection);
    setRestoreScrollY(null);
    setActiveSection(
      nextRouteState.routeKey === 'home' ? (nextSection || 'hero') : nextRouteState.routeKey
    );

    // Explicit forward navigation to a new page starts at the top.
    if (nextRouteState.routeKey !== 'home' || !nextSection) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const handleCampusCategoryChange = (category: CampusCategoryFilter) => {
    setCampusCategory(category);
    const nextPath = category === 'All' ? '/campuses' : `/campuses?category=${category}`;
    window.history.replaceState({ ...readHistoryState(), scrollY: window.scrollY }, '', nextPath);
  };

  const navigateToCampus = (campusSlugValue: string, options?: NavigatePathOptions) => {
    navigateToPath(`/campuses/${campusSlugValue}`, options);
  };

  const navigateToSection = (sectionId: string) => {
    const normalized = normalizeHomeSectionId(sectionId) ?? sectionId;
    persistCurrentScroll(activeSection);

    if (normalized === 'hero') {
      clearHomeReturnSection();
      window.history.pushState({ scrollY: 0, activeSection: 'hero' }, '', '/');
      setRouteKey('home');
      setCampusSlug(null);
      setPendingSection(null);
      setRestoreScrollY(null);
      setActiveSection('hero');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.history.pushState({ scrollY: 0, activeSection: normalized }, '', `/#${normalized}`);
    setRouteKey('home');
    setCampusSlug(null);
    setPendingSection(normalized);
    setRestoreScrollY(null);
    setActiveSection(normalized);
  };

  /** Logo, breadcrumb Home, and footer Home always return to the homepage top. */
  const navigateHome = () => {
    clearHomeReturnSection();
    navigateToSection('hero');
  };

  const handleOpenApplyModal = (course?: string, campus?: string) => {
    if (course) setApplyCourse(course);
    if (campus) setApplyCampus(campus);
    setIsApplyModalOpen(true);
  };

  const currentCampus = routeKey === 'campus-detail' ? getCampusFromSlug(campusSlug) : null;
  const seoTitle = getSeoTitle(routeKey, currentCampus?.name ?? campusSlug);
  const seoDescription = getSeoDescription(routeKey, currentCampus?.name ?? campusSlug);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased selection:bg-[#FBBF24] selection:text-[#0B3C91] pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0 bg-mesh-light">
      <OpeningAnimation />
      <ScrollProgressBar />
      <SeoHead title={seoTitle} description={seoDescription} />
      <GoogleManager />

      <Navbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onNavigateToPath={navigateToPath}
        onNavigateToSection={navigateToSection}
        onNavigateHome={navigateHome}
        onOpenApplyModal={handleOpenApplyModal}
        onOpenAIGuide={() => setIsAIGuideOpen(true)}
        onSelectProgram={(programId) => setSelectedProgramId(programId)}
      />

      {routeKey === 'home' && (
        <HomePage
          onOpenApplyModal={handleOpenApplyModal}
          onOpenAIGuide={() => setIsAIGuideOpen(true)}
          onOpenCampusVisit={() => setIsCampusVisitOpen(true)}
          onSelectProgram={(programId) => setSelectedProgramId(programId)}
          onNavigateToPath={navigateToPath}
          onNavigateToCampus={navigateToCampus}
        />
      )}

      <Suspense fallback={<PageFallback />}>
        {routeKey === 'facilities' && (
          <FacilitiesPage onNavigateHome={navigateHome} />
        )}

        {routeKey === 'gallery' && (
          <GalleryPage onNavigateHome={navigateHome} />
        )}

        {routeKey === 'life-at-kcjc' && (
          <LifeAtKcjcPage
            onNavigateHome={navigateHome}
            onOpenApplyModal={() => handleOpenApplyModal()}
            onOpenCampusVisit={() => setIsCampusVisitOpen(true)}
          />
        )}

        {routeKey === 'courses' && (
          <CoursesPage
            onNavigateHome={navigateHome}
            onOpenApplyModal={handleOpenApplyModal}
            onSelectProgram={(programId) => setSelectedProgramId(programId)}
          />
        )}

        {routeKey === 'why-choose-kcjc' && (
          <WhyChooseKcjcPage
            onNavigateHome={navigateHome}
            onOpenApplyModal={handleOpenApplyModal}
            onOpenCampusVisit={() => setIsCampusVisitOpen(true)}
          />
        )}

        {routeKey === 'campuses' && (
          <CampusesPage
            onNavigateHome={navigateHome}
            onNavigateToCampus={navigateToCampus}
            onOpenApplyModal={handleOpenApplyModal}
            categoryFilter={campusCategory}
            onCategoryChange={handleCampusCategoryChange}
          />
        )}

        {routeKey === 'campus-detail' && (
          <CampusDetailPage
            campus={currentCampus}
            onNavigateHome={navigateHome}
            onNavigateToCampuses={() => navigateToPath('/campuses', { fromSection: 'campuses' })}
            onOpenApplyModal={handleOpenApplyModal}
          />
        )}
      </Suspense>

      <Footer
        onNavigateHome={navigateHome}
        onNavigateToSection={navigateToSection}
        onNavigateToCampus={navigateToCampus}
        onNavigateToCampuses={() => navigateToPath('/campuses', { fromSection: 'campuses' })}
      />

      <FloatingAssistancePopup
        onOpenAIGuide={() => setIsAIGuideOpen(true)}
        onOpenApplyModal={() => handleOpenApplyModal()}
      />

      <AIBotWidgetFloating
        isOpen={isAIGuideOpen}
        onToggle={() => setIsAIGuideOpen(!isAIGuideOpen)}
        onOpenApplyModal={() => handleOpenApplyModal()}
      />

      <MobileBottomNav
        onOpenApplyModal={() => handleOpenApplyModal()}
        onOpenAIGuide={() => setIsAIGuideOpen(true)}
      />

      <AdmissionModalBottomSheet
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        preSelectedCourse={applyCourse}
        preSelectedCampus={applyCampus}
      />

      {isAIGuideOpen && (
        <Suspense fallback={null}>
          <AICampusGuide
            isOpen={isAIGuideOpen}
            onClose={() => setIsAIGuideOpen(false)}
            onOpenApplyModal={() => {
              setIsAIGuideOpen(false);
              handleOpenApplyModal();
            }}
            onNavigateToSection={navigateToSection}
            onNavigateToPath={navigateToPath}
          />
        </Suspense>
      )}

      {isCampusVisitOpen && (
        <Suspense fallback={null}>
          <CampusVisitModal
            isOpen={isCampusVisitOpen}
            onClose={() => setIsCampusVisitOpen(false)}
          />
        </Suspense>
      )}

      <AnimatePresence mode="wait">
        {selectedProgramId && (
          <Suspense fallback={null}>
            <CourseDetailModal
              key={selectedProgramId}
              programId={selectedProgramId}
              onClose={() => setSelectedProgramId(null)}
              onApplyForProgram={(stream) => handleOpenApplyModal(stream)}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}