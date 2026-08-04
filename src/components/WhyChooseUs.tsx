import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  WHY_CHOOSE_HOME_EYEBROW,
  WHY_CHOOSE_HOME_TITLE,
  WHY_CHOOSE_HOME_INTRO,
  WHY_CHOOSE_HOME_FEATURE_CARDS,
  WHY_CHOOSE_HOME_TRUST_STATEMENT,
  WHY_CHOOSE_HOME_CTA_SUBTEXT,
} from '../data/whyChooseData';
import { Container, SectionHeader, GlassCard, Button } from './ui';
import { KcjcAdvantageModal } from './KcjcAdvantageModal';

interface WhyChooseUsProps {
  onOpenApplyModal?: () => void;
  onOpenCampusVisit?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  onOpenApplyModal,
  onOpenCampusVisit,
}) => {
  const [showAdvantageModal, setShowAdvantageModal] = useState(false);

  return (
    <>
      <section
        id="why-us"
        className="section-padding-sm max-sm:py-5 bg-gradient-to-b from-[#F8FAFC] via-white to-[#EFF6FF]/40 text-[#1E293B] scroll-mt-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-mesh-light pointer-events-none" />

        <Container className="relative z-10">
          <SectionHeader
            eyebrow={WHY_CHOOSE_HOME_EYEBROW}
            title={WHY_CHOOSE_HOME_TITLE}
            description={WHY_CHOOSE_HOME_INTRO}
            align="center"
            className="max-sm:mb-4 max-sm:!space-y-1.5 max-sm:[&>span]:text-[10px] max-sm:[&>span]:px-2 max-sm:[&>span]:py-0.5 max-sm:[&>h2]:text-base max-sm:[&>h2]:leading-snug max-sm:[&>p]:text-[11px] max-sm:[&>p]:leading-snug max-sm:[&>p]:line-clamp-3"
          />

          {/* Mobile: compact horizontal scroll */}
          <div className="sm:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory flex gap-2.5 pb-1 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {WHY_CHOOSE_HOME_FEATURE_CARDS.map((item) => (
              <GlassCard
                key={item.id}
                className="snap-start shrink-0 w-[min(78vw,17rem)] p-3 flex flex-col gap-1"
              >
                <h3 className="text-[11px] font-bold text-[#0B3C91] leading-snug">{item.title}</h3>
                <p className="text-[10px] font-semibold text-slate-800 leading-snug">{item.subtitle}</p>
                <p className="text-[10px] text-slate-600 leading-snug">{item.description}</p>
              </GlassCard>
            ))}
          </div>

          {/* Tablet / desktop: equal-height grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 max-w-6xl mx-auto items-stretch auto-rows-fr">
            {WHY_CHOOSE_HOME_FEATURE_CARDS.map((item) => (
              <GlassCard key={item.id} className="p-4 sm:p-5 h-full min-h-[11rem] flex flex-col">
                <h3 className="text-sm sm:text-base font-bold text-[#0B3C91] leading-snug mb-1.5">{item.title}</h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug mb-2">{item.subtitle}</p>
                <p className="text-body-sm text-slate-600 leading-relaxed flex-1">{item.description}</p>
              </GlassCard>
            ))}
          </div>

          <div className="mt-5 sm:mt-10 max-w-2xl mx-auto text-center">
            <p className="text-sm sm:text-base max-sm:text-[11px] max-sm:line-clamp-2 text-slate-700 leading-snug sm:leading-relaxed font-medium">
              &ldquo;{WHY_CHOOSE_HOME_TRUST_STATEMENT}&rdquo;
            </p>

            <div className="mt-4 sm:mt-8 flex flex-col items-center gap-2 sm:gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowAdvantageModal(true)}
                className="w-full sm:w-auto normal-case tracking-normal font-bold max-sm:text-xs max-sm:min-h-[40px] max-sm:px-4"
              >
                Discover the KCJC Advantage
                <ArrowRight className="w-4 h-4 max-sm:w-3.5 max-sm:h-3.5 ml-1" aria-hidden="true" />
              </Button>
              <p className="hidden sm:block text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
                {WHY_CHOOSE_HOME_CTA_SUBTEXT}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <KcjcAdvantageModal
        isOpen={showAdvantageModal}
        onClose={() => setShowAdvantageModal(false)}
        onOpenApplyModal={onOpenApplyModal}
        onOpenCampusVisit={onOpenCampusVisit}
      />
    </>
  );
};
