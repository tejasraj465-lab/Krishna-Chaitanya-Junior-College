import React from 'react';
import {
  Phone,
  MessageCircle,
  Sparkles,
  Send,
  MapPin,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { ADMISSION_YEAR, COLLEGE_INFO, toTelHref } from '../data/collegeData';

interface FinalCTAProps {
  onOpenApplyModal: () => void;
  onOpenCampusVisit: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onOpenApplyModal,
  onOpenCampusVisit,
}) => {
  return (
    <section className="py-6 sm:py-12 md:py-20 bg-gradient-to-br from-[#0B3C91] via-[#072B6B] to-[#031333] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-dark pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 text-center space-y-3 sm:space-y-6 md:space-y-8">
        <div className="inline-flex items-center gap-1 sm:gap-2 bg-[#FBBF24] text-[#0B3C91] font-extrabold text-[9px] sm:text-xs px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase tracking-wide sm:tracking-wider shadow-lg max-w-[95%]">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 fill-[#0B3C91] shrink-0" aria-hidden="true" />
          <span className="leading-tight">Admissions Open {ADMISSION_YEAR}</span>
        </div>

        <div className="max-w-3xl mx-auto space-y-1.5 sm:space-y-3">
          <h2 className="text-lg sm:text-3xl md:text-4xl font-extrabold font-serif text-white tracking-tight leading-snug">
            Take The First Step Toward Your Dream Rank Today
          </h2>
          <p className="text-[11px] sm:text-base md:text-lg text-blue-100 font-normal leading-snug line-clamp-2 sm:line-clamp-none">
            Limited seats per campus. Secure early batch preference, preferred stream selection, and hostel allocation.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-stretch sm:items-center justify-center gap-2 sm:gap-3 pt-0.5 sm:pt-2">
          <button
            type="button"
            onClick={onOpenApplyModal}
            className="col-span-2 sm:col-auto sm:w-auto px-3 sm:px-8 py-2.5 sm:py-4 min-h-[40px] sm:min-h-[48px] bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-[11px] sm:text-sm rounded-xl sm:rounded-2xl shadow-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 uppercase tracking-wide sm:tracking-wider cursor-pointer active:scale-[0.98]"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
            <span>Apply Now</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
          </button>

          <a
            href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Krishna Chaitanya Admission Team! I want to apply for Intermediate ${ADMISSION_YEAR}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:w-auto px-3 sm:px-6 py-2.5 sm:py-4 min-h-[40px] sm:min-h-[48px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] sm:text-sm rounded-xl sm:rounded-2xl shadow-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 border border-emerald-400/30"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white stroke-none shrink-0" aria-hidden="true" />
            <span className="sm:hidden">WhatsApp</span>
            <span className="hidden sm:inline">Chat on WhatsApp</span>
          </a>

          <a
            href={toTelHref(COLLEGE_INFO.phonePrimary)}
            className="sm:w-auto px-3 sm:px-6 py-2.5 sm:py-4 min-h-[40px] sm:min-h-[48px] bg-blue-900/80 hover:bg-blue-800 text-blue-100 font-bold text-[11px] sm:text-sm rounded-xl sm:rounded-2xl border border-blue-400/30 transition-all flex items-center justify-center gap-1.5 sm:gap-2"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FBBF24] shrink-0" aria-hidden="true" />
            <span>Call Desk</span>
          </a>

          <button
            type="button"
            onClick={onOpenCampusVisit}
            className="col-span-2 sm:col-auto sm:w-auto px-3 sm:px-6 py-2.5 sm:py-4 min-h-[40px] sm:min-h-[48px] bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] sm:text-sm rounded-xl sm:rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer active:scale-[0.98]"
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FBBF24] shrink-0" aria-hidden="true" />
            <span className="sm:hidden">Campus Visit</span>
            <span className="hidden sm:inline">Book Campus Visit</span>
          </button>
        </div>

        <p className="text-[10px] sm:text-xs text-blue-300 pt-0.5 sm:pt-2 flex items-center justify-center gap-1 sm:gap-1.5 leading-snug">
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          <span className="line-clamp-1 sm:line-clamp-none">
            Zero hidden charges • Immediate counselor callback
          </span>
        </p>
      </div>
    </section>
  );
};
