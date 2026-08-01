import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Container, GlassCard } from './ui';

interface PageBannerProps {
  eyebrow: string;
  title: string;
  description: string;
  currentLabel: string;
  onHomeClick?: () => void;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  eyebrow,
  title,
  description,
  currentLabel,
  onHomeClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#EFF6FF]/60 py-10 md:py-16">
      <div className="absolute inset-0 bg-mesh-light pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <nav className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-6" aria-label="Breadcrumb">
          <button
            onClick={onHomeClick}
            className="inline-flex items-center gap-1.5 text-[#0B3C91] hover:text-[#F97316] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-300" aria-hidden="true" />
          <span className="text-slate-500">{currentLabel}</span>
        </nav>

        <GlassCard className="p-6 sm:p-10 max-w-4xl" hover={false}>
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-[#0B3C91] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border border-blue-200/80">
              {eyebrow}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B3C91] font-serif leading-tight tracking-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              {description}
            </p>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
};
