import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  CheckCircle,
  ChevronDown,
  MessageCircle,
  MapPin,
  ArrowRight,
  GraduationCap,
  Target,
  Users,
  HeartHandshake,
  MonitorPlay,
  Sparkles,
  BookOpen,
  Cpu,
  Trophy,
  Handshake,
  LifeBuoy,
  Building2,
  HelpCircle,
  LucideIcon,
} from 'lucide-react';
import { KCJC_ADVANTAGE_PAGE } from '../data/whyChooseAdvantageData';
import { COLLEGE_INFO } from '../data/collegeData';
import { GlassCard } from './ui';

interface KcjcAdvantageContentProps {
  variant?: 'page' | 'modal';
  onOpenApplyModal?: () => void;
  onOpenCampusVisit?: () => void;
  showFinalCta?: boolean;
}

const ADVANTAGE_ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  Target,
  Users,
  HeartHandshake,
  MonitorPlay,
  Sparkles,
};

const SectionBlock = memo<{
  id?: string;
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  intro?: string;
  children: React.ReactNode;
  contained?: boolean;
  cardClassName?: string;
  className?: string;
}>(function SectionBlock({
  id,
  icon: Icon,
  title,
  subtitle,
  intro,
  children,
  contained = false,
  cardClassName = '',
  className = '',
}) {
  const header = (
    <>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#0B3C91] to-[#072B6B] text-white flex items-center justify-center shrink-0 shadow-md">
            <Icon className="w-5 h-5 text-[#FBBF24]" aria-hidden="true" />
          </div>
        )}
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91] leading-snug text-balance">{title}</h3>
          {subtitle && <p className="text-xs sm:text-sm font-semibold text-[#F97316] mt-1">{subtitle}</p>}
        </div>
      </div>
      {intro && <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">{intro}</p>}
    </>
  );

  if (contained) {
    return (
      <section id={id} className={`scroll-mt-32 h-full ${className}`}>
        <GlassCard
          className={`p-4 sm:p-5 h-full flex flex-col gap-3.5 sm:gap-4 ${cardClassName}`}
          hover={false}
        >
          {header}
          <div className="flex-1 min-h-0">{children}</div>
        </GlassCard>
      </section>
    );
  }

  return (
    <section id={id} className={`scroll-mt-32 space-y-3.5 sm:space-y-4 ${className}`}>
      {header}
      {children}
    </section>
  );
});

const CheckList = memo<{ items: readonly string[]; columns?: 1 | 2 | 3 }>(function CheckList({
  items,
  columns = 2,
}) {
  return (
    <ul
      className={`grid gap-2 ${
        columns === 3
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          : columns === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1'
      }`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-snug">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
});

const ChipGrid = memo<{ items: readonly string[] }>(function ChipGrid({ items }) {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#EFF6FF] border border-blue-100 text-[11px] sm:text-xs font-semibold text-[#0B3C91]"
        >
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
          {item}
        </span>
      ))}
    </div>
  );
});

const ProgramChips = memo<{ items: readonly string[]; label?: string }>(function ProgramChips({ items, label }) {
  return (
    <div>
      {label && (
        <p className="text-xs sm:text-sm font-bold text-[#0B3C91] mb-2.5 uppercase tracking-wide">{label}</p>
      )}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-gradient-to-br from-[#0B3C91] to-[#072B6B] text-white text-[11px] sm:text-xs font-bold"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
});

const MethodologyFlow = memo<{ steps: readonly string[] }>(function MethodologyFlow({ steps }) {
  return (
    <>
      <div className="lg:hidden -mx-1 flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {steps.map((step, index) => (
          <div
            key={step}
            className="snap-start shrink-0 w-[72vw] max-w-[260px] px-3 py-3 rounded-xl bg-white border border-blue-100 shadow-sm"
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0B3C91] text-white text-[10px] font-bold mr-2">
              {index + 1}
            </span>
            <span className="text-xs font-semibold text-[#0B3C91] leading-snug">{step}</span>
          </div>
        ))}
      </div>
      <div className="hidden lg:grid lg:grid-cols-3 gap-2.5">
        {steps.map((step, index) => (
          <div
            key={step}
            className="relative flex flex-col items-center text-center px-3 py-3.5 rounded-xl bg-white border border-blue-100 shadow-sm min-h-[80px] justify-center"
          >
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FBBF24] text-[#0B3C91] text-[10px] font-black flex items-center justify-center">
              {index + 1}
            </span>
            <span className="text-xs font-bold text-[#0B3C91] leading-snug mt-1.5">{step}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const KcjcAdvantageContent: React.FC<KcjcAdvantageContentProps> = ({
  variant = 'modal',
  onOpenApplyModal,
  onOpenCampusVisit,
  showFinalCta = true,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const data = KCJC_ADVANTAGE_PAGE;
  const isPage = variant === 'page';

  const whatsappUrl = useMemo(
    () =>
      `https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent(
        'Hello Krishna Chaitanya! I would like to talk to an admission counselor about KCJC programmes.'
      )}`,
    []
  );

  const toggleFaq = useCallback((index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  }, []);

  const sectionGap = isPage ? 'space-y-10 sm:space-y-12' : 'space-y-7 sm:space-y-8';

  return (
    <div className={sectionGap}>
      {/* Overview */}
      <section id={isPage ? 'kcjc-overview' : undefined} className="scroll-mt-32 space-y-4 sm:space-y-5">
        <div
          className={`rounded-xl sm:rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 via-white to-[#EFF6FF]/40 p-4 sm:p-5 ${
            isPage ? '' : 'text-center max-w-3xl mx-auto'
          }`}
        >
          {isPage && (
            <p className="text-label text-[#F97316] font-extrabold tracking-widest uppercase mb-2">{data.eyebrow}</p>
          )}
          {isPage && (
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B3C91] leading-snug mb-3 text-balance">
              {data.title}
            </h2>
          )}
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{data.intro}</p>
        </div>

        <SectionBlock icon={BookOpen} title={data.needsHeading} contained>
          <ChipGrid items={data.needsItems} />
        </SectionBlock>
      </section>

      {/* Advantage cards */}
      <section id={isPage ? 'kcjc-advantage' : undefined} className="scroll-mt-32 space-y-4 sm:space-y-5">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-label text-[#F97316] font-extrabold tracking-widest uppercase mb-1.5">
            {data.advantageHeading}
          </p>
          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#0B3C91]">{data.advantageSubheading}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {data.advantageCards.map((card) => {
            const CardIcon = ADVANTAGE_ICONS[card.icon] ?? GraduationCap;
            return (
              <GlassCard
                key={card.id}
                className="p-4 sm:p-5 h-full border-t-[3px] border-t-[#FBBF24]"
                hover={false}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-3">
                  <CardIcon className="w-5 h-5 text-[#0B3C91]" aria-hidden="true" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[#0B3C91] mb-1.5">{card.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{card.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Methodology */}
      <SectionBlock
        id={isPage ? 'kcjc-methodology' : undefined}
        icon={Target}
        title={data.methodologyHeading}
        subtitle={data.methodologySubheading}
      >
        <GlassCard className="p-3 sm:p-5 bg-gradient-to-br from-blue-50/60 to-white" hover={false}>
          <MethodologyFlow steps={data.methodologySteps} />
        </GlassCard>
      </SectionBlock>

      {/* Programmes */}
      <div
        id={isPage ? 'kcjc-programmes' : undefined}
        className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch"
      >
        <SectionBlock icon={Cpu} title={data.technologyHeading} intro={data.technologyIntro} contained>
          <CheckList items={data.technologyItems} columns={1} />
        </SectionBlock>
        <SectionBlock icon={Trophy} title={data.competitiveHeading} intro={data.competitiveIntro} contained>
          <ProgramChips items={data.competitiveProgrammes} label="Programmes Include:" />
        </SectionBlock>
      </div>

      {/* Support cluster */}
      <div id={isPage ? 'kcjc-support' : undefined} className="scroll-mt-32 space-y-4 sm:space-y-5">
        <SectionBlock icon={Sparkles} title={data.beyondHeading} intro={data.beyondIntro} contained>
          <ProgramChips items={data.beyondActivities} label="Activities Include:" />
        </SectionBlock>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
          <SectionBlock icon={Handshake} title={data.parentsHeading} intro={data.parentsIntro} contained>
            <CheckList items={data.parentsItems} columns={1} />
          </SectionBlock>
          <SectionBlock icon={LifeBuoy} title={data.supportHeading} intro={data.supportIntro} contained>
            <CheckList items={data.supportItems} columns={1} />
          </SectionBlock>
        </div>
      </div>

      {/* Campus */}
      <SectionBlock
        id={isPage ? 'kcjc-campus' : undefined}
        icon={Building2}
        title={data.campusHeading}
        intro={data.campusIntro}
        contained
      >
        <CheckList items={data.campusFacilities} columns={3} />
      </SectionBlock>

      {/* Parent trust */}
      <SectionBlock
        id={isPage ? 'kcjc-parents-trust' : undefined}
        icon={Users}
        title={data.recommendHeading}
        intro={data.recommendIntro}
        contained
        cardClassName="bg-gradient-to-br from-emerald-50/70 to-white border-emerald-100"
      >
        <CheckList items={data.recommendItems} columns={2} />
      </SectionBlock>

      {/* FAQ */}
      <SectionBlock id={isPage ? 'kcjc-faq' : undefined} icon={HelpCircle} title={data.faqHeading}>
        <div className="space-y-2">
          {data.faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.question} className="rounded-xl border border-slate-100 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer hover:bg-slate-50/80 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-start gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-md bg-[#EFF6FF] text-[#0B3C91] text-[10px] font-black flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#0B3C91]">{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-3.5 border-t border-slate-100 ml-9">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2.5">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SectionBlock>

      {/* Final CTA */}
      {showFinalCta && (
        <section
          id={isPage ? 'kcjc-apply' : undefined}
          className="scroll-mt-32 rounded-2xl bg-gradient-to-br from-[#0B3C91] via-[#072B6B] to-[#031333] text-white p-5 sm:p-8 lg:p-10 text-center"
        >
          <div className="space-y-3.5 sm:space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex bg-[#FBBF24] text-[#0B3C91] font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              {data.finalBadge}
            </span>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-serif leading-snug">{data.finalHeading}</h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">{data.finalDescription}</p>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2 pt-1">
              {onOpenApplyModal && (
                <button
                  type="button"
                  onClick={onOpenApplyModal}
                  className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md cursor-pointer min-h-[44px] uppercase tracking-wide"
                >
                  Apply for Admission
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                Talk to an Admission Counselor
              </a>
              {onOpenCampusVisit && (
                <button
                  type="button"
                  onClick={onOpenCampusVisit}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-white/25 cursor-pointer min-h-[44px]"
                >
                  <MapPin className="w-4 h-4" />
                  Schedule a Campus Visit
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
