import React from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { CAMPUSES } from '../data/collegeData';
import { CampusCard } from './CampusCard';

interface CampusesSectionProps {
  onOpenApplyModal: (course?: string, campusName?: string) => void;
  onViewAllCampuses: () => void;
  onNavigateToCampus: (campusSlug: string) => void;
}

export const CampusesSection: React.FC<CampusesSectionProps> = ({
  onOpenApplyModal,
  onViewAllCampuses,
  onNavigateToCampus,
}) => {
  const previewCampuses = CAMPUSES.slice(0, 3);

  return (
    <section id="campuses" className="py-16 md:py-24 bg-white text-[#1E293B] scroll-mt-20">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#0B3C91] bg-blue-50 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider border border-blue-200">
            12 Premier Campuses in & Around Nellore
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3C91] font-serif mt-3.5">
            Our Campuses
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            Explore a preview of the campuses already listed in the site and view the full campus directory for the complete set.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <div className="mt-12 text-center">
          <button
            onClick={onViewAllCampuses}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0B3C91] hover:bg-[#072B6B] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#FBBF24]" />
            <span>View All Campuses</span>
          </button>
        </div>

      </div>
    </section>
  );
};
