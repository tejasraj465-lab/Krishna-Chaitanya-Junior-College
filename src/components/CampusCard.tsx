import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, ExternalLink, ChevronRight, Building2, Home } from 'lucide-react';
import { Campus } from '../types';

interface CampusCardProps {
  campus: Campus;
  compact?: boolean;
  onViewCampus?: () => void;
  onApply?: () => void;
}

export const CampusCard: React.FC<CampusCardProps> = ({
  campus,
  compact = false,
  onViewCampus,
  onApply,
}) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
    >
      <div className={`relative ${compact ? 'h-48' : 'h-56'} overflow-hidden shrink-0`}>
        <img
          src={campus.image}
          alt={campus.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C91] via-transparent to-transparent" />
        {campus.category === 'Residential' && (
          <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <Home className="w-3 h-3" aria-hidden="true" />
            <span>Residential</span>
          </span>
        )}
        <div className="absolute bottom-4 left-6 right-6 text-white">
          <h3 className="text-lg sm:text-xl font-bold font-serif text-white leading-snug">{campus.name}</h3>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
          <MapPin className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" aria-hidden="true" />
          <span>{campus.address}</span>
        </div>

        <div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Suitable For</p>
          <p className="text-sm font-semibold text-[#0B3C91]">{campus.suitableFor}</p>
        </div>

        <div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Courses Offered</p>
          <ul className="space-y-1">
            {campus.coursesOffered.map((course) => (
              <li key={course} className="text-xs sm:text-sm text-slate-700 leading-snug flex items-start gap-1.5">
                <span className="text-[#F97316] font-bold shrink-0 mt-0.5">•</span>
                <span>{course}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-2 mt-auto">
        {onViewCampus && (
          <button
            type="button"
            onClick={onViewCampus}
            className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-[#0B3C91]" aria-hidden="true" />
            <span>View Campus</span>
          </button>
        )}

        <a
          href={`tel:${campus.phone}`}
          className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-[#0B3C91]" aria-hidden="true" />
          <span>Call Campus</span>
        </a>

        <a
          href={campus.googleMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-[#0B3C91] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-blue-200 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Get Directions</span>
        </a>

        {onApply && (
          <button
            type="button"
            onClick={onApply}
            className="py-2.5 px-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer normal-case"
          >
            <span>Apply Now</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </motion.article>
  );
};
