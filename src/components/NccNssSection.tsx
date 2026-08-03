import React, { useState } from 'react';
import { ArrowRight, Flag } from 'lucide-react';
import { NCC_HOME } from '../data/nccData';
import { Container, GlassCard } from './ui';
import { NccExploreModal } from './NccExploreModal';

export const NccNssSection: React.FC = () => {
  const [showExploreModal, setShowExploreModal] = useState(false);

  return (
    <>
      <section
        id="ncc-nss"
        className="section-padding-sm bg-gradient-to-b from-[#071D49] via-[#0B3C91] to-[#06245C] text-white scroll-mt-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(251,191,36,0.1)_0%,_transparent_55%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 bg-[#FBBF24]/15 text-[#FBBF24] px-3.5 py-1.5 rounded-full text-eyebrow border border-[#FBBF24]/30">
              <Flag className="w-3.5 h-3.5" aria-hidden="true" />
              3 AP BN Accredited NCC Unit
            </span>
            <h2 className="text-section-title text-white">{NCC_HOME.title}</h2>
            <p className="text-sm sm:text-base text-[#FBBF24] font-semibold leading-relaxed">
              {NCC_HOME.subheading}
            </p>
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">{NCC_HOME.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {NCC_HOME.featureCards.map((card) => (
              <GlassCard
                key={card.id}
                variant="dark"
                hover={false}
                className="p-4 sm:p-5 h-full border border-white/15 bg-[#031333]/60 text-center"
              >
                <span className="text-2xl sm:text-3xl block mb-2 leading-none" aria-hidden="true">
                  {card.emoji}
                </span>
                <p className="text-sm sm:text-[15px] font-bold text-white leading-snug">{card.label}</p>
              </GlassCard>
            ))}
          </div>

          <div className="flex justify-center mt-8 sm:mt-10">
            <button
              type="button"
              onClick={() => setShowExploreModal(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl shadow-lg transition-all cursor-pointer min-h-[48px]"
            >
              {NCC_HOME.ctaLabel}
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </section>

      <NccExploreModal isOpen={showExploreModal} onClose={() => setShowExploreModal(false)} />
    </>
  );
};
