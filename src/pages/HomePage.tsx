import React, { lazy, Suspense } from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { WelcomeSection } from '../components/WelcomeSection';
import { CoursesSection } from '../components/CoursesSection';
import type { HomeSectionId } from '../utils/homeSectionNavigation';

const CampusesSection = lazy(() =>
  import('../components/CampusesSection').then((module) => ({ default: module.CampusesSection }))
);
const FacilitiesSection = lazy(() =>
  import('../components/FacilitiesSection').then((module) => ({ default: module.FacilitiesSection }))
);
const NccNssSection = lazy(() =>
  import('../components/NccNssSection').then((module) => ({ default: module.NccNssSection }))
);
const StudentLifeSection = lazy(() =>
  import('../components/StudentLifeSection').then((module) => ({ default: module.StudentLifeSection }))
);
const LeadershipSection = lazy(() =>
  import('../components/LeadershipSection').then((module) => ({ default: module.LeadershipSection }))
);
const FinalCTA = lazy(() =>
  import('../components/FinalCTA').then((module) => ({ default: module.FinalCTA }))
);

const SectionFallback = ({ id }: { id: string }) => (
  <section id={id} className="min-h-[12rem]" aria-hidden="true" />
);

interface HomePageProps {
  onOpenApplyModal: (course?: string, campus?: string) => void;
  onOpenAIGuide: () => void;
  onOpenCampusVisit: () => void;
  onSelectProgram: (programId: string) => void;
  onNavigateToPath: (path: string, options?: { fromSection?: HomeSectionId }) => void;
  onNavigateToCampus: (campusSlug: string, options?: { fromSection?: HomeSectionId }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenApplyModal,
  onOpenAIGuide,
  onOpenCampusVisit,
  onSelectProgram,
  onNavigateToPath,
  onNavigateToCampus,
}) => {
  return (
    <main className="w-full overflow-hidden">
      <HeroSlider
        onOpenApplyModal={() => onOpenApplyModal()}
        onOpenAIGuide={onOpenAIGuide}
      />

      <CoursesSection
        onOpenApplyModal={onOpenApplyModal}
        onSelectProgram={onSelectProgram}
      />

      <WelcomeSection
        onOpenApplyModal={() => onOpenApplyModal()}
        onOpenCampusVisit={onOpenCampusVisit}
      />

      <Suspense fallback={<SectionFallback id="campuses" />}>
        <CampusesSection
          onOpenApplyModal={onOpenApplyModal}
          onViewAllCampuses={() => onNavigateToPath('/campuses', { fromSection: 'campuses' })}
          onNavigateToCampus={(slug) => onNavigateToCampus(slug, { fromSection: 'campuses' })}
          onBrowseByCategory={(category) =>
            onNavigateToPath(`/campuses?category=${category}`, { fromSection: 'campuses' })
          }
        />
      </Suspense>

      <Suspense fallback={<SectionFallback id="facilities" />}>
        <FacilitiesSection
          variant="home"
          onViewAll={() => onNavigateToPath('/facilities', { fromSection: 'facilities' })}
        />
      </Suspense>

      <Suspense fallback={<SectionFallback id="ncc" />}>
        <NccNssSection />
      </Suspense>

      <Suspense fallback={<SectionFallback id="explore-kcjc" />}>
        <StudentLifeSection
          variant="home"
          onOpenApplyModal={() => onOpenApplyModal()}
          onOpenCampusVisit={onOpenCampusVisit}
          onExploreFullPage={() => onNavigateToPath('/life-at-kcjc', { fromSection: 'explore-kcjc' })}
        />
      </Suspense>

      <Suspense fallback={<SectionFallback id="leadership" />}>
        <LeadershipSection />
      </Suspense>

      <Suspense fallback={null}>
        <FinalCTA
          onOpenApplyModal={() => onOpenApplyModal()}
          onOpenCampusVisit={onOpenCampusVisit}
        />
      </Suspense>
    </main>
  );
};
