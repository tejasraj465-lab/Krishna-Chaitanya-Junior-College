import React from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { WelcomeSection } from '../components/WelcomeSection';
import { CoursesSection } from '../components/CoursesSection';
import { FacilitiesSection } from '../components/FacilitiesSection';
import { NccNssSection } from '../components/NccNssSection';
import { CampusesSection } from '../components/CampusesSection';
import { StudentLifeSection } from '../components/StudentLifeSection';
import { SuccessStories } from '../components/SuccessStories';
import { LeadershipSection } from '../components/LeadershipSection';
import { FinalCTA } from '../components/FinalCTA';
import type { HomeSectionId } from '../utils/homeSectionNavigation';

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

      <WelcomeSection onOpenApplyModal={() => onOpenApplyModal()} />

      <CampusesSection
        onOpenApplyModal={onOpenApplyModal}
        onViewAllCampuses={() => onNavigateToPath('/campuses', { fromSection: 'campuses' })}
        onNavigateToCampus={(slug) => onNavigateToCampus(slug, { fromSection: 'campuses' })}
        onBrowseByCategory={(category) =>
          onNavigateToPath(`/campuses?category=${category}`, { fromSection: 'campuses' })
        }
      />

      <FacilitiesSection
        variant="home"
        onViewAll={() => onNavigateToPath('/facilities', { fromSection: 'facilities' })}
      />

      <NccNssSection />

      <SuccessStories />

      <StudentLifeSection
        variant="home"
        onOpenApplyModal={() => onOpenApplyModal()}
        onOpenCampusVisit={onOpenCampusVisit}
        onExploreFullPage={() => onNavigateToPath('/life-at-kcjc', { fromSection: 'explore-kcjc' })}
      />

      <LeadershipSection />

      <FinalCTA
        onOpenApplyModal={() => onOpenApplyModal()}
        onOpenCampusVisit={onOpenCampusVisit}
      />
    </main>
  );
};
