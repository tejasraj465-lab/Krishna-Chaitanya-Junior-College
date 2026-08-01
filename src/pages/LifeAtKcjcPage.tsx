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
        eyebrow="Student Experience"
        title="Life at KCJC"
        description="Student life here extends beyond the classroom with clubs, cultural events, sports, NCC, NSS, workshops, seminars, and regular celebrations."
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