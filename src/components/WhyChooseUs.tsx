import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  GraduationCap,
  Layers,
  Target,
  MonitorPlay,
  FlaskConical,
  Users,
  Smartphone,
  Bus,
  Building2,
  Compass,
  ShieldCheck,
  ArrowRight,
  Phone,
  MapPin,
  LucideIcon,
} from 'lucide-react';
import {
  WHY_CHOOSE_HOME_HIGHLIGHTS,
  WHY_CHOOSE_HOME_INTRO,
  WHY_CHOOSE_CATEGORIES,
  WHY_CHOOSE_VERIFIED_ITEMS,
  WhyChooseCategoryId,
} from '../data/whyChooseData';
import { Container, SectionHeader, GlassCard, Button } from './ui';

interface WhyChooseUsProps {
  variant?: 'home' | 'page';
  onExploreFullPage?: () => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Trophy,
  GraduationCap,
  Layers,
  Target,
  MonitorPlay,
  FlaskConical,
  Users,
  Smartphone,
  Bus,
  Building2,
  Compass,
  ShieldCheck,
  Phone,
  MapPin,
};

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Building2,
  MonitorPlay,
  Compass,
};

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  variant = 'home',
  onExploreFullPage,
}) => {
  const [activeTab, setActiveTab] = useState<WhyChooseCategoryId>('academics');

  const currentCategory =
    WHY_CHOOSE_CATEGORIES.find((c) => c.id === activeTab) ?? WHY_CHOOSE_CATEGORIES[0];

  const filteredItems = WHY_CHOOSE_VERIFIED_ITEMS.filter((item) => item.category === activeTab);
  const CategoryIcon = CATEGORY_ICON_MAP[currentCategory.icon] ?? Compass;

  const renderCategoryButton = (cat: (typeof WHY_CHOOSE_CATEGORIES)[number]) => {
    const Icon = CATEGORY_ICON_MAP[cat.icon] ?? Compass;
    const isActive = activeTab === cat.id;
    const count = WHY_CHOOSE_VERIFIED_ITEMS.filter((i) => i.category === cat.id).length;

    return (
      <button
        key={cat.id}
        onClick={() => setActiveTab(cat.id)}
        aria-pressed={isActive}
        className={`snap-start shrink-0 min-w-[148px] sm:min-w-0 w-full sm:w-auto p-3.5 sm:p-4 rounded-2xl text-left transition-all cursor-pointer border ${
          isActive
            ? 'bg-[#0B3C91] text-white border-[#0B3C91] shadow-lg shadow-blue-900/15 ring-2 ring-blue-200'
            : 'glass-card text-slate-700 border-slate-200/80 hover:border-blue-200'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <div
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isActive ? 'bg-white/15' : 'bg-blue-50'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-[#FBBF24]' : 'text-[#0B3C91]'}`} />
          </div>
          <span
            className={`text-caption font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ${
              isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#0B3C91]'
            }`}
          >
            {count}
          </span>
        </div>
        <span className="text-xs sm:text-sm font-bold leading-snug block">{cat.label}</span>
      </button>
    );
  };

  if (variant === 'home') {
    return (
      <section
        id="why-us"
        className="section-padding-sm max-sm:py-8 bg-gradient-to-b from-[#F8FAFC] via-white to-[#EFF6FF]/40 text-[#1E293B] scroll-mt-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-mesh-light pointer-events-none" />

        <Container className="relative z-10">
          <SectionHeader
            eyebrow="Why Choose KCJC?"
            title="Why Choose Krishna Chaitanya Junior College?"
            description={WHY_CHOOSE_HOME_INTRO}
            align="center"
            className="max-sm:mb-5 max-sm:!space-y-2 max-sm:[&>span]:text-[10px] max-sm:[&>span]:px-2.5 max-sm:[&>span]:py-1 max-sm:[&>h2]:text-lg max-sm:[&>h2]:leading-snug max-sm:[&>p]:text-xs max-sm:[&>p]:leading-relaxed"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-sm:grid-cols-2 max-sm:gap-2 max-w-4xl mx-auto">
            {WHY_CHOOSE_HOME_HIGHLIGHTS.map((item) => {
                const ItemIcon = ICON_MAP[item.icon] ?? GraduationCap;
                return (
                  <GlassCard key={item.id} className="p-4 sm:p-5 max-sm:p-2.5 h-full flex flex-col">
                    <div className="flex items-start gap-3 mb-3 max-sm:flex-col max-sm:gap-1.5 max-sm:mb-1.5">
                      <div className="w-10 h-10 max-sm:w-8 max-sm:h-8 rounded-xl max-sm:rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                        <ItemIcon className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-[#0B3C91]" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1 max-sm:flex-col max-sm:items-start max-sm:gap-1 max-sm:mb-0">
                          <h3 className="text-sm sm:text-base max-sm:text-[11px] font-bold text-[#0B3C91] leading-snug">
                            {item.title}
                          </h3>
                          {item.badge && (
                            <span className="text-caption max-sm:text-[9px] max-sm:px-1.5 font-extrabold text-[#0B3C91] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-body-sm max-sm:text-[10px] text-slate-600 leading-relaxed flex-1 whitespace-pre-line max-sm:line-clamp-4">
                      {item.description}
                    </p>
                  </GlassCard>
                );
              })}
          </div>

          {onExploreFullPage && (
            <div className="mt-10 max-sm:mt-5 flex justify-center">
              <Button
                variant="secondary"
                size="md"
                onClick={onExploreFullPage}
                className="w-full sm:w-auto normal-case tracking-normal font-bold max-sm:text-xs max-sm:min-h-[40px] max-sm:px-4"
              >
                Explore Why Choose KCJC
                <ArrowRight className="w-4 h-4 max-sm:w-3.5 max-sm:h-3.5 ml-1" aria-hidden="true" />
              </Button>
            </div>
          )}
        </Container>
      </section>
    );
  }

  return (
    <section
      id="why-us"
      className="py-10 md:py-14 bg-gradient-to-b from-[#F8FAFC] via-white to-[#EFF6FF]/40 text-[#1E293B] scroll-mt-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-mesh-light pointer-events-none" />

      <Container className="relative z-10">
        <div className="mb-6 sm:mb-8">
          <p className="text-label text-slate-500 mb-3">Browse by Category</p>
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2.5 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-3 sm:overflow-visible sm:pb-0">
              {WHY_CHOOSE_CATEGORIES.map((cat) => renderCategoryButton(cat))}
            </div>
          </div>
        </div>

        <div className="min-w-0">
            <GlassCard className="p-4 sm:p-5 mb-5 sm:mb-6" hover={false}>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#0B3C91] text-white flex items-center justify-center shrink-0">
                  <CategoryIcon className="w-5 h-5 text-[#FBBF24]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0B3C91] leading-tight">
                    {currentCategory.label}
                  </h3>
                  <p className="text-body-sm text-slate-500 mt-0.5">{currentCategory.description}</p>
                  <p className="text-caption font-bold text-[#F97316] mt-1.5">
                    {filteredItems.length} verified item{filteredItems.length !== 1 ? 's' : ''} listed
                  </p>
                </div>
              </div>
            </GlassCard>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {filteredItems.length > 0 && (
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {filteredItems.map((item) => {
                      const ItemIcon = ICON_MAP[item.icon] ?? GraduationCap;
                      return (
                        <GlassCard key={item.id} className="p-4 sm:p-5">
                          <div className="flex items-start gap-3.5">
                            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                              <ItemIcon className="w-5 h-5 text-[#0B3C91]" aria-hidden="true" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h4 className="text-sm sm:text-base font-bold text-[#0B3C91] leading-snug">
                                  {item.title}
                                </h4>
                                {item.badge && (
                                  <span className="text-caption font-extrabold text-[#0B3C91] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-body-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </GlassCard>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
        </div>
      </Container>
    </section>
  );
};
