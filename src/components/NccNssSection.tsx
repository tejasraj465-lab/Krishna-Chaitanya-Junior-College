import React, { useState } from 'react';
import { ArrowRight, Flag, Shield } from 'lucide-react';
import { NCC_HOME } from '../data/nccData';
import nccLogo from '../assets/ncc-logo.png';
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(251,191,36,0.12)_0%,_transparent_55%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 flex pointer-events-none" aria-hidden="true">
          <span className="flex-1 bg-[#DC2626]" />
          <span className="flex-1 bg-[#0B3C91]" />
          <span className="flex-1 bg-[#38BDF8]" />
        </div>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-[1fr_min(100%,20rem)] gap-8 lg:gap-10 items-center mb-8 sm:mb-10">
            <div className="text-center lg:text-left space-y-3">
              <span className="inline-flex items-center gap-2 bg-[#FBBF24]/15 text-[#FBBF24] px-3.5 py-1.5 rounded-full text-eyebrow border border-[#FBBF24]/30">
                <Flag className="w-3.5 h-3.5" aria-hidden="true" />
                3 AP BN Accredited NCC Unit
              </span>
              <h2 className="text-section-title text-white">{NCC_HOME.title}</h2>
              <p className="text-sm sm:text-base text-[#FBBF24] font-semibold leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {NCC_HOME.subheading}
              </p>
              <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {NCC_HOME.description}
              </p>
            </div>

            <div className="mx-auto lg:mx-0 w-full max-w-[17rem] sm:max-w-xs">
              <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/30 text-center">
                <div className="mx-auto w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center rounded-xl bg-slate-50 p-3 mb-3">
                  <img
                    src={nccLogo}
                    alt="National Cadet Corps (NCC) India official logo"
                    className="max-w-full max-h-full object-contain drop-shadow-sm"
                    loading="lazy"
                  />
                </div>
                <p className="text-[#0B3C91] font-bold text-sm sm:text-base font-serif leading-snug">
                  National Cadet Corps
                </p>
                <p className="text-[#F97316] font-extrabold text-xs sm:text-sm mt-1 tracking-wide">
                  {NCC_HOME.motto}
                </p>
                <p className="text-slate-500 text-[10px] sm:text-xs font-semibold mt-0.5">
                  {NCC_HOME.mottoEnglish}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#0B3C91]/10 text-[#0B3C91] px-3 py-1 text-[10px] sm:text-xs font-bold border border-[#0B3C91]/15">
                  <Shield className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  3 AP BN · Accredited Unit
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto mb-8 sm:mb-10">
            {NCC_HOME.highlightStats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-xl sm:rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm px-2 py-3 sm:p-4 text-center shadow-lg"
              >
                <p className="text-sm sm:text-xl font-black text-[#FBBF24] font-serif leading-tight">
                  {stat.value}
                </p>
                <p className="text-[9px] sm:text-xs text-blue-100/90 font-semibold mt-1 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {NCC_HOME.featureCards.map((card) => (
              <GlassCard
                key={card.id}
                variant="dark"
                hover
                className="p-4 sm:p-5 h-full border border-white/15 bg-[#031333]/60 text-left group"
              >
                <span className="text-2xl sm:text-3xl block mb-2.5 leading-none" aria-hidden="true">
                  {card.emoji}
                </span>
                <p className="text-sm sm:text-[15px] font-bold text-white leading-snug mb-1.5">
                  {card.label}
                </p>
                <p className="text-[11px] sm:text-xs text-blue-100/75 leading-relaxed">
                  {card.description}
                </p>
              </GlassCard>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
            <button
              type="button"
              onClick={() => setShowExploreModal(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl shadow-lg transition-all cursor-pointer min-h-[48px] w-full sm:w-auto"
            >
              {NCC_HOME.ctaLabel}
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
            <p className="text-[10px] sm:text-xs text-blue-200/70 text-center sm:text-left max-w-xs leading-snug">
              Training, camps, cadet opportunities &amp; Defence career benefits
            </p>
          </div>
        </Container>
      </section>

      <NccExploreModal isOpen={showExploreModal} onClose={() => setShowExploreModal(false)} />
    </>
  );
};
