import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, ExternalLink, ChevronRight, Home, Building2, Users } from 'lucide-react';
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
      className="bg-white rounded-3xl overflow-hidden border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        <div className={`relative ${compact ? 'h-48' : 'h-56'} overflow-hidden`}>
          <img
            src={campus.image}
            alt={campus.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C91] via-transparent to-transparent" />

          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="bg-[#FBBF24] text-[#0B3C91] text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
              {campus.type}
            </span>
            {campus.category === 'Residential' && (
              <span className="bg-emerald-600 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Home className="w-3 h-3" />
                <span>Residential</span>
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              {campus.city}
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white leading-snug">
              {campus.name}
            </h3>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
            <MapPin className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
            <span>{campus.address}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 p-3 bg-blue-50/70 rounded-2xl border border-blue-100 text-center text-xs">
            <div>
              <p className="font-bold text-[#0B3C91]">{campus.stats.students}</p>
              <p className="text-[10px] text-slate-500">Students</p>
            </div>
            <div>
              <p className="font-bold text-[#0B3C91]">{campus.stats.faculty}</p>
              <p className="text-[10px] text-slate-500">Faculty</p>
            </div>
            <div>
              <p className="font-bold text-[#0B3C91]">{campus.stats.labs} Hi-Tech</p>
              <p className="text-[10px] text-slate-500">Labs</p>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              Key Features:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {campus.facilities.slice(0, compact ? 3 : 4).map((feature, index) => (
                <span
                  key={index}
                  className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-slate-200"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 flex flex-wrap items-center gap-2">
        {onViewCampus && (
          <button
            onClick={onViewCampus}
            className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-[#0B3C91]" />
            <span>View Campus</span>
          </button>
        )}

        <a
          href={`tel:${campus.phone}`}
          className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-[#0B3C91]" />
          <span>Call Campus</span>
        </a>

        <a
          href={campus.googleMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-[#0B3C91] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-blue-200 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#0B3C91]" />
          <span>Google Map</span>
        </a>

        {onApply && (
          <button
            onClick={onApply}
            className="w-full sm:w-auto py-2.5 px-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider"
          >
            <span>Apply Here</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.article>
  );
};