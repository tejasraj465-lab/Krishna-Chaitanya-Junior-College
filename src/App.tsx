import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SeoHead } from './components/SeoHead';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { OpeningAnimation } from './components/OpeningAnimation';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AdmissionModalBottomSheet } from './components/AdmissionModalBottomSheet';
import { AICampusGuide } from './components/AICampusGuide';
import { BrochureModal } from './components/BrochureModal';
import { CampusVisitModal } from './components/CampusVisitModal';
import { CourseDetailModal } from './components/CourseDetailModal';
import { FloatingAssistancePopup } from './components/FloatingAssistancePopup';
import { AIBotWidgetFloating } from './components/AIBotWidgetFloating';
import { HomePage } from './pages/HomePage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { GalleryPage } from './pages/GalleryPage';
import { LifeAtKcjcPage } from './pages/LifeAtKcjcPage';
import { WhyChooseKcjcPage } from './pages/WhyChooseKcjcPage';
import { CampusesPage } from './pages/CampusesPage';
import { CampusDetailPage } from './pages/CampusDetailPage';
import { CAMPUSES } from './data/collegeData';

type RouteKey = 'home' | 'facilities' | 'gallery' | 'life-at-kcjc' | 'why-choose-kcjc' | 'campuses' | 'campus-detail';

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const getCampusFromSlug = (slug: string | null) => {
  if (!slug) return null;
  return CAMPUSES.find((campus) => slugify(campus.id) === slugify(slug) || slugify(campus.name) === slugify(slug)) || null;
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
    case 'why-choose-kcjc':
      return 'Why Choose KCJC | Krishna Chaitanya Junior College';
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
    case 'why-choose-kcjc':
      return 'Explore the college advantages, results, mentorship, infrastructure, and the disciplined learning culture at KCJC.';
    case 'campuses':
      return 'Browse the existing Krishna Chaitanya campuses with search, type filters, and real campus details from the current website data.';
    case 'campus-detail':
      return campusName ? `View real details, facilities, and contact information for ${campusName}.` : 'View real campus details, facilities, and contact information.';
    default:
      return 'Top Junior College offering integrated IIT-JEE, NEET, CA/CMA, long term and Intermediate coaching with 28+ years of excellence.';
  }
};

export default function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyCourse, setApplyCourse] = useState('MPC');
  const [applyCampus, setApplyCampus] = useState('Nellore Main Residential Campus');

  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isAIGuideOpen, setIsAIGuideOpen] = useState(false);
  const [isCampusVisitOpen, setIsCampusVisitOpen] = useState(false);

  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
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

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (initialRouteState.routeKey === 'home') {
      if (window.location.pathname !== '/') {
        window.history.replaceState({}, '', '/');
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
      setActiveSection('hero');
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const nextRouteState = getRouteState(window.location.pathname);
      const nextSection = window.location.hash.replace('#', '') || null;

      setRouteKey(nextRouteState.routeKey);
      setCampusSlug(nextRouteState.campusSlug);
      setPendingSection(nextSection);

      if (nextRouteState.routeKey === 'home') {
        if (!nextSection) {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
        setActiveSection(nextSection || 'hero');
        return;
      }

      window.scrollTo({ top: 0, behavior: 'auto' });
      setActiveSection(nextRouteState.routeKey);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (routeKey !== 'home') {
      setActiveSection(routeKey);
      setPendingSection(null);
      return;
    }

    const sectionIds = ['hero', 'welcome', 'courses', 'why-us', 'facilities', 'admissions', 'ncc-nss', 'campuses', 'results', 'life-at-kc', 'leadership', 'gallery'];

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
      rootMargin: '-80px 0px -40% 0px',
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
        setActiveSection('gallery');
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

    const timeoutId = window.setTimeout(() => {
      const element = document.getElementById(pendingSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(pendingSection);
      }
      setPendingSection(null);
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, [routeKey, pendingSection]);

  const navigateToPath = (path: string) => {
    window.history.pushState({}, '', path);

    const nextRouteState = getRouteState(new URL(path, window.location.origin).pathname);
    const nextSection = path.includes('#') ? (path.split('#')[1] || null) : null;

    setRouteKey(nextRouteState.routeKey);
    setCampusSlug(nextRouteState.campusSlug);
    setPendingSection(nextSection);
    setActiveSection(nextRouteState.routeKey === 'home' ? (nextSection || 'welcome') : nextRouteState.routeKey);

    if (nextRouteState.routeKey !== 'home') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const navigateToCampus = (campusSlugValue: string) => {
    navigateToPath(`/campuses/${campusSlugValue}`);
  };

  const navigateToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.history.pushState({}, '', '/');
      setRouteKey('home');
      setCampusSlug(null);
      setPendingSection(null);
      setActiveSection('hero');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.history.pushState({}, '', `/#${sectionId}`);
    setRouteKey('home');
    setCampusSlug(null);
    setPendingSection(sectionId);
    setActiveSection(sectionId);
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased selection:bg-[#FBBF24] selection:text-[#0B3C91] pb-12 md:pb-0 bg-mesh-light">
      <OpeningAnimation />
      <ScrollProgressBar />
      <SeoHead title={seoTitle} description={seoDescription} />

      <Navbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onNavigateToPath={navigateToPath}
        onNavigateToSection={navigateToSection}
        onOpenApplyModal={handleOpenApplyModal}
        onOpenBrochureModal={() => setIsBrochureModalOpen(true)}
        onOpenAIGuide={() => setIsAIGuideOpen(true)}
        onSelectProgram={(programId) => setSelectedProgramId(programId)}
      />

      {routeKey === 'home' && (
        <HomePage
          onOpenApplyModal={handleOpenApplyModal}
          onOpenBrochureModal={() => setIsBrochureModalOpen(true)}
          onOpenAIGuide={() => setIsAIGuideOpen(true)}
          onOpenCampusVisit={() => setIsCampusVisitOpen(true)}
          onSelectProgram={(programId) => setSelectedProgramId(programId)}
          onNavigateToPath={navigateToPath}
          onNavigateToCampus={navigateToCampus}
        />
      )}

      {routeKey === 'facilities' && (
        <FacilitiesPage onNavigateHome={() => navigateToSection('hero')} />
      )}

      {routeKey === 'gallery' && (
        <GalleryPage onNavigateHome={() => navigateToSection('hero')} />
      )}

      {routeKey === 'life-at-kcjc' && (
        <LifeAtKcjcPage
          onNavigateHome={() => navigateToSection('hero')}
          onOpenApplyModal={() => handleOpenApplyModal()}
          onOpenCampusVisit={() => setIsCampusVisitOpen(true)}
        />
      )}

      {routeKey === 'why-choose-kcjc' && (
        <WhyChooseKcjcPage
          onNavigateHome={() => navigateToSection('hero')}
        />
      )}

      {routeKey === 'campuses' && (
        <CampusesPage
          onNavigateHome={() => navigateToSection('hero')}
          onNavigateToCampus={navigateToCampus}
          onOpenApplyModal={handleOpenApplyModal}
        />
      )}

      {routeKey === 'campus-detail' && (
        <CampusDetailPage
          campus={currentCampus}
          onNavigateHome={() => navigateToSection('hero')}
          onNavigateToCampuses={() => navigateToPath('/campuses')}
          onOpenApplyModal={handleOpenApplyModal}
        />
      )}

      <Footer
        onNavigateHome={() => navigateToSection('hero')}
        onNavigateToSection={navigateToSection}
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
        onOpenWhyChoose={() => navigateToPath('/why-choose-kcjc')}
      />

      <AdmissionModalBottomSheet
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        preSelectedCourse={applyCourse}
        preSelectedCampus={applyCampus}
      />

      <AICampusGuide
        isOpen={isAIGuideOpen}
        onClose={() => setIsAIGuideOpen(false)}
        onOpenApplyModal={() => {
          setIsAIGuideOpen(false);
          handleOpenApplyModal();
        }}
      />

      <BrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
      />

      <CampusVisitModal
        isOpen={isCampusVisitOpen}
        onClose={() => setIsCampusVisitOpen(false)}
      />

      <CourseDetailModal
        programId={selectedProgramId}
        onClose={() => setSelectedProgramId(null)}
        onApplyForProgram={(programName) => handleOpenApplyModal(programName)}
      />
    </div>
  );
}