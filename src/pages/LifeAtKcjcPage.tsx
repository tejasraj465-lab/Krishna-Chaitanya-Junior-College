import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { StudentLifeSection } from '../components/StudentLifeSection';

interface LifeAtKcjcPageProps {
  onNavigateHome: () => void;
  onOpenApplyModal: () => void;
  onOpenCampusVisit: () => void;
}

export const LifeAtKcjcPage: React.FC<LifeAtKcjcPageProps> = ({
  onNavigateHome,
  onOpenApplyModal,
  onOpenCampusVisit,
}) => {
  return (
    <main className="w-full overflow-hidden">
      <PageBanner
        variant="hero"
        eyebrow="Student Experience"
        title="Life at Krishna Chaitanya"
        description="A complete student experience shaped through academics, clubs, cultural celebrations, sports, NCC, NSS, workshops, and memorable campus events."
        currentLabel="Life at KCJC"
        onHomeClick={onNavigateHome}
      />
      <StudentLifeSection
        variant="page"
        onOpenApplyModal={onOpenApplyModal}
        onOpenCampusVisit={onOpenCampusVisit}
      />
    </main>
  );
};