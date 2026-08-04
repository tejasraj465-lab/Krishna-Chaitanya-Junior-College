import React from 'react';
import { ArrowRight, Building2, Home, MapPin, LucideIcon } from 'lucide-react';
import { CAMPUSES_SECTION, CampusBrowseCategory } from '../data/campusesSectionData';
import { CAMPUSES } from '../data/collegeData';
import { CampusCard } from './CampusCard';
import { Container, GlassCard } from './ui';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Building2,
  Home,
};

interface CampusesSectionProps {
  onOpenApplyModal: (course?: string, campusName?: string) => void;
  onViewAllCampuses: () => void;
  onNavigateToCampus: (campusSlug: string) => void;
  onBrowseByCategory: (category: CampusBrowseCategory) => void;
}

export const CampusesSection: React.FC<CampusesSectionProps> = ({
  onOpenApplyModal,
  onViewAllCampuses,
  onNavigateToCampus,
  onBrowseByCategory,
}) => {
  const previewCampuses = CAMPUSES.slice(0, 3);
  const data = CAMPUSES_SECTION;

  return (
    <section id="campuses" className="section-padding-sm bg-white text-[#1E293B] scroll-mt-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-light pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-[#0B3C91] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full text-eyebrow border border-blue-200/80">
            {data.eyebrow}
          </span>
          <h2 className="text-section-title text-[#0B3C91]">{data.title}</h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{data.subheading}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-5 max-w-3xl mx-auto mb-6 sm:mb-12">
          {data.categories.map((item) => {
            const Icon = CATEGORY_ICONS[item.icon] ?? Building2;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onBrowseByCategory(item.category)}
                className="text-left cursor-pointer group w-full"
              >
                <GlassCard
                  className="p-3 sm:p-6 h-full border-2 border-transparent hover:border-[#0B3C91]/20 transition-all"
                  hover
                >
                  <div className="flex items-start gap-2.5 sm:gap-4">
                    <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0B3C91] to-[#072B6B] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4 sm:w-7 sm:h-7 text-[#FBBF24]" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-0.5 sm:mb-1">
                        <h3 className="text-sm sm:text-lg font-bold font-serif text-[#0B3C91] leading-snug">
                          {item.label}
                        </h3>
                        <span className="text-base sm:text-xl font-black text-[#F97316] tabular-nums shrink-0">
                          ({item.count})
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-sm text-slate-600 leading-snug sm:leading-relaxed mb-1.5 sm:mb-3 line-clamp-2 sm:line-clamp-none">
                        {item.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[11px] sm:text-sm font-bold text-[#0B3C91] group-hover:text-[#F97316] transition-colors">
                        {item.ctaLabel ?? 'View Campuses'}
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {previewCampuses.map((campus) => (
            <CampusCard
              key={campus.id}
              campus={campus}
              compact
              onViewCampus={() => onNavigateToCampus(campus.id)}
              onApply={() => onOpenApplyModal(undefined, campus.name)}
            />
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onViewAllCampuses}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#0B3C91] hover:bg-[#072B6B] text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer min-h-[44px]"
          >
            <MapPin className="w-4 h-4 text-[#FBBF24]" aria-hidden="true" />
            View All Campuses
          </button>
        </div>
      </Container>
    </section>
  );
};
