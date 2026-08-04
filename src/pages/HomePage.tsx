import React from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { WelcomeSection } from '../components/WelcomeSection';
import { CoursesSection } from '../components/CoursesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { FacilitiesSection } from '../components/FacilitiesSection';
import { NccNssSection } from '../components/NccNssSection';
import { CampusesSection } from '../components/CampusesSection';
import { ResultsSection } from '../components/ResultsSection';
import { StudentLifeSection } from '../components/StudentLifeSection';
import { SuccessStories } from '../components/SuccessStories';
import { LeadershipSection } from '../components/LeadershipSection';
import { GallerySection } from '../components/GallerySection';
import { FinalCTA } from '../components/FinalCTA';

interface HomePageProps {
  onOpenApplyModal: (course?: string, campus?: string) => void;
  onOpenAIGuide: () => void;
  onOpenCampusVisit: () => void;
  onSelectProgram: (programId: string) => void;
  onNavigateToPath: (path: string) => void;
  onNavigateToCampus: (campusSlug: string) => void;
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

      <WelcomeSection onOpenApplyModal={() => onOpenApplyModal()} />

      <CoursesSection
        onOpenApplyModal={onOpenApplyModal}
        onSelectProgram={onSelectProgram}
      />

      <WhyChooseUs
        onOpenApplyModal={() => onOpenApplyModal()}
        onOpenCampusVisit={onOpenCampusVisit}
      />

      <FacilitiesSection
        variant="home"
        onViewAll={() => onNavigateToPath('/facilities')}
      />

      <NccNssSection />

      <CampusesSection
        onOpenApplyModal={onOpenApplyModal}
        onViewAllCampuses={() => onNavigateToPath('/campuses')}
        onNavigateToCampus={onNavigateToCampus}
        onBrowseByCategory={(category) => onNavigateToPath(`/campuses?category=${category}`)}
      />

      <ResultsSection />

      <StudentLifeSection
        variant="home"
        onOpenApplyModal={() => onOpenApplyModal()}
        onOpenCampusVisit={onOpenCampusVisit}
        onExploreFullPage={() => onNavigateToPath('/life-at-kcjc')}
      />

      <SuccessStories />

      <LeadershipSection />

      <GallerySection
        variant="home"
        onViewFullGallery={() => onNavigateToPath('/gallery')}
      />

      <FinalCTA
        onOpenApplyModal={() => onOpenApplyModal()}
        onOpenCampusVisit={onOpenCampusVisit}
      />
    </main>
  );
};