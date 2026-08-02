import React from 'react';
import { ChevronRight, Home, Sparkles } from 'lucide-react';
import { Container, GlassCard } from './ui';

interface PageBannerProps {
  eyebrow: string;
  title: string;
  description: string;
  currentLabel: string;
  onHomeClick?: () => void;
  variant?: 'card' | 'hero';
}

export const PageBanner: React.FC<PageBannerProps> = ({
  eyebrow,
  title,
  description,
  currentLabel,
  onHomeClick,
  variant = 'card',
}) => {
  if (variant === 'hero') {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-[#071D49] via-[#0B3C91] to-[#06245C] text-white py-10 sm:py-14 md:py-16 border-b border-blue-900/50 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(251,191,36,0.08)_0%,_transparent_55%)] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          <nav className="flex flex-wrap items-center gap-2 text-label text-blue-200/80 mb-6 sm:mb-8" aria-label="Breadcrumb">
            <button
              onClick={onHomeClick}
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#FBBF24] transition-colors cursor-pointer font-sans normal-case tracking-normal text-sm font-semibold"
            >
              <Home className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-blue-300/60" aria-hidden="true" />
            <span className="text-blue-100/90 font-sans normal-case tracking-normal text-sm font-medium">{currentLabel}</span>
          </nav>

          <div className="max-w-4xl space-y-4 sm:space-y-5">
            <span className="inline-flex items-center gap-1.5 bg-[#FBBF24] text-[#0B3C91] px-3.5 py-1.5 rounded-full text-eyebrow shadow-md">
              <Sparkles className="w-3.5 h-3.5 fill-[#0B3C91] shrink-0" aria-hidden="true" />
              {eyebrow}
            </span>
            <h1 className="text-display text-white leading-tight">
              {title}
            </h1>
            <p className="text-body sm:text-lg text-blue-100/90 max-w-3xl leading-relaxed">
              {description}
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#EFF6FF]/60 py-10 md:py-16">
      <div className="absolute inset-0 bg-mesh-light pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <nav className="flex flex-wrap items-center gap-2 text-label text-slate-500 mb-6" aria-label="Breadcrumb">
          <button
            onClick={onHomeClick}
            className="inline-flex items-center gap-1.5 text-[#0B3C91] hover:text-[#F97316] transition-colors cursor-pointer font-sans normal-case tracking-normal text-sm font-semibold"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-300" aria-hidden="true" />
          <span className="text-slate-500 font-sans normal-case tracking-normal text-sm font-medium">{currentLabel}</span>
        </nav>

        <GlassCard className="p-6 sm:p-10 max-w-4xl" hover={false}>
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-[#0B3C91] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full text-eyebrow border border-blue-200/80">
              {eyebrow}
            </span>
            <h1 className="text-section-title text-[#0B3C91]">
              {title}
            </h1>
            <p className="text-body sm:text-base text-slate-600 max-w-3xl">
              {description}
            </p>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
};
