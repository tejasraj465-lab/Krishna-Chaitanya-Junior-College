import React from 'react';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { PageBanner } from '../components/PageBanner';
import { WHY_CHOOSE_PAGE_INTRO } from '../data/whyChooseData';

interface WhyChooseKcjcPageProps {
  onNavigateHome: () => void;
  onOpenApplyModal: (course?: string, campus?: string) => void;
  onOpenCampusVisit: () => void;
}

export const WhyChooseKcjcPage: React.FC<WhyChooseKcjcPageProps> = ({
  onNavigateHome,
}) => {
  return (
    <main className="w-full overflow-hidden">
      <PageBanner
        variant="hero"
        eyebrow="Why KCJC"
        title="Why Choose Krishna Chaitanya Junior College?"
        description={WHY_CHOOSE_PAGE_INTRO}
        currentLabel="Why Choose KCJC"
        onHomeClick={onNavigateHome}
      />
      <WhyChooseUs variant="page" />
    </main>
  );
};
