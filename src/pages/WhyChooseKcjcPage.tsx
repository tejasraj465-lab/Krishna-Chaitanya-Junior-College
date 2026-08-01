import React from 'react';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { PageBanner } from '../components/PageBanner';

interface WhyChooseKcjcPageProps {
  onNavigateHome: () => void;
  onOpenApplyModal: (course?: string, campus?: string) => void;
  onOpenCampusVisit: () => void;
}

export const WhyChooseKcjcPage: React.FC<WhyChooseKcjcPageProps> = ({
  onNavigateHome,
  onOpenApplyModal,
  onOpenCampusVisit,
}) => {
  return (
    <main className="w-full overflow-hidden">
      <PageBanner
        eyebrow="Why KCJC"
        title="Why Choose Krishna Chaitanya Junior College?"
        description="Discover the strengths behind KCJC: results, guidance, infrastructure, care, and a disciplined academic culture built for student success."
        currentLabel="Why Choose KCJC"
        onHomeClick={onNavigateHome}
      />
      <WhyChooseUs
        variant="page"
        onOpenApplyModal={onOpenApplyModal}
        onOpenCampusVisit={onOpenCampusVisit}
      />
    </main>
  );
};