import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { CoursesSection } from '../components/CoursesSection';

interface CoursesPageProps {
  onNavigateHome: () => void;
  onOpenApplyModal: (course?: string) => void;
  onSelectProgram: (programId: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  onNavigateHome,
  onOpenApplyModal,
  onSelectProgram,
}) => {
  return (
    <main className="w-full overflow-hidden">
      <PageBanner
        eyebrow="Programmes 2026–27"
        title="Courses at KCJC"
        description="Intermediate MPC, BiPC, MEC, CEC and Long Term programmes with integrated IIT-JEE, NEET, EAPCET, CA and CMA coaching."
        currentLabel="Courses"
        onHomeClick={onNavigateHome}
      />
      <CoursesSection
        onOpenApplyModal={onOpenApplyModal}
        onSelectProgram={onSelectProgram}
      />
    </main>
  );
};
