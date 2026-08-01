import React from 'react';
import { Phone, Send, Sparkles } from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

interface MobileBottomNavProps {
  onOpenApplyModal: () => void;
  onOpenAIGuide?: () => void;
  onOpenWhyChoose?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenApplyModal,
  onOpenWhyChoose
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B3C91]/95 backdrop-blur-md border-t border-blue-800/80 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto items-center">
        {/* Call Button */}
        <a
          href={`tel:${COLLEGE_INFO.phonePrimary}`}
          className="flex items-center justify-center gap-2 h-12 min-h-[48px] bg-blue-900/90 text-white rounded-[16px] hover:bg-blue-800 active:scale-95 transition-all text-xs font-bold border border-blue-500/30 px-3 cursor-pointer"
          aria-label="Call College Desk"
        >
          <Phone className="w-4 h-4 text-[#FBBF24]" />
          <span>Call Desk</span>
        </a>

        {/* Apply Now - Main Highlighted Button */}
        <button
          onClick={onOpenApplyModal}
          className="flex items-center justify-center gap-2 h-12 min-h-[48px] bg-[#F97316] text-white rounded-[16px] active:scale-95 transition-all text-xs font-extrabold shadow-lg border border-orange-400/40 relative overflow-hidden group cursor-pointer px-3"
          aria-label="Open Admission Bottom Sheet"
        >
          <Send className="w-4 h-4 text-white" />
          <span>Apply Now</span>
        </button>

        <button
          onClick={onOpenWhyChoose}
          className="flex items-center justify-center gap-2 h-12 min-h-[48px] bg-white/10 text-white rounded-[16px] active:scale-95 transition-all text-[11px] font-extrabold border border-white/15 px-3 cursor-pointer"
          aria-label="Open Why Choose KCJC page"
        >
          <Sparkles className="w-4 h-4 text-[#FBBF24]" />
          <span>Why KCJC</span>
        </button>
      </div>
    </div>
  );
};
