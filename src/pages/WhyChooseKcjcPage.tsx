import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { KcjcAdvantageContent } from '../components/KcjcAdvantageContent';
import { KcjcAdvantageSectionNav } from '../components/KcjcAdvantageSectionNav';
import { Container } from '../components/ui';
import { KCJC_ADVANTAGE_PAGE } from '../data/whyChooseAdvantageData';

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
    <main className="w-full overflow-x-hidden">
      <PageBanner
        variant="hero"
        eyebrow={KCJC_ADVANTAGE_PAGE.eyebrow}
        title="The KCJC Advantage"
        description="Academic excellence, integrated coaching, and holistic development — everything your child needs under one trusted institution."
        currentLabel="Why Choose KCJC"
        onHomeClick={onNavigateHome}
      />

      <Container className="relative z-20 -mt-5 sm:-mt-7 max-w-6xl">
        <div className="rounded-xl sm:rounded-2xl bg-white border border-blue-100 shadow-lg p-3 sm:p-4">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            {KCJC_ADVANTAGE_PAGE.trustStats.map((stat) => (
              <div key={stat.label} className="text-center py-1">
                <p className="text-base sm:text-lg lg:text-xl font-black text-[#0B3C91] leading-none tabular-nums">
                  {stat.value}
                </p>
                <p className="text-[9px] sm:text-[11px] text-slate-500 font-semibold mt-1 leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <section className="py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-[#F8FAFC] via-white to-[#EFF6FF]/30">
        <Container className="max-w-6xl">
          <KcjcAdvantageSectionNav />
          <KcjcAdvantageContent
            variant="page"
            onOpenApplyModal={() => onOpenApplyModal()}
            onOpenCampusVisit={onOpenCampusVisit}
          />
        </Container>
      </section>
    </main>
  );
};
