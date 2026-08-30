import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { CoursesSection } from '../components/CoursesSection';
import { ADMISSION_YEAR } from '../data/collegeData';

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
        eyebrow={`Programmes ${ADMISSION_YEAR}`}
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
