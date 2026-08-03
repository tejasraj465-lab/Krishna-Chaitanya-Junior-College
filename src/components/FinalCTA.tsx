import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  Sparkles, 
  Send, 
  MapPin, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

interface FinalCTAProps {
  onOpenApplyModal: () => void;
  onOpenCampusVisit: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onOpenApplyModal,
  onOpenCampusVisit
}) => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-[#0B3C91] via-[#072B6B] to-[#031333] text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-mesh-dark pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 text-center space-y-8">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FBBF24] text-[#0B3C91] font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
          <Sparkles className="w-4 h-4 fill-[#0B3C91]" /> Admissions Open For Academic Year 2026-27
        </div>

        {/* Heading */}
        <div className="max-w-3xl mx-auto space-y-3">
          <h2 className="text-section-title text-white tracking-tight leading-tight">
            Take The First Step Toward Your Dream Rank Today
          </h2>
          <p className="text-body-sm sm:text-lg text-blue-100 font-normal">
            Limited seats per campus. Secure early batch preference, preferred stream selection, and hostel allocation.
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* Apply Now */}
          <button
            onClick={onOpenApplyModal}
            className="w-full sm:w-auto px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Send className="w-4 h-4" />
            <span>Apply Now Online</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Krishna Chaitanya Admission Team! I want to apply for Intermediate 2026-27.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 border border-emerald-400/30"
          >
            <MessageCircle className="w-4 h-4 fill-white stroke-none" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Call Now */}
          <a
            href={`tel:${COLLEGE_INFO.phonePrimary}`}
            className="w-full sm:w-auto px-6 py-4 bg-blue-900/80 hover:bg-blue-800 text-blue-100 font-bold text-sm rounded-2xl border border-blue-400/30 transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#FBBF24]" />
            <span>Call Desk</span>
          </a>

          {/* Book Campus Visit */}
          <button
            onClick={onOpenCampusVisit}
            className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#FBBF24]" />
            <span>Book Campus Visit</span>
          </button>
        </div>

        {/* Guarantee line */}
        <p className="text-xs text-blue-300 pt-2 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Zero admission processing hidden charges • Immediate counselor callback</span>
        </p>

      </div>
    </section>
  );
};
