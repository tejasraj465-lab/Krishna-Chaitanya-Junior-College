import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, MessageCircle, Phone, X, Sparkles, ChevronRight } from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

interface FloatingAssistancePopupProps {
  onOpenAIGuide: () => void;
  onOpenApplyModal: () => void;
}

export const FloatingAssistancePopup: React.FC<FloatingAssistancePopupProps> = ({
  onOpenAIGuide,
  onOpenApplyModal
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show popup after 3.5 seconds on page load if not dismissed
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:bottom-24 right-[4.25rem] sm:right-6 z-40 w-[min(17.5rem,calc(100vw-5.5rem))] sm:max-w-[360px] sm:w-full bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl sm:shadow-2xl border border-blue-200/80 sm:border-2 font-sans"
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-1.5 sm:gap-2 pb-1.5 sm:pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0B3C91] to-indigo-900 text-white flex items-center justify-center font-bold shadow-md">
                <Bot className="w-4 h-4 sm:w-6 sm:h-6 text-[#FBBF24]" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                <h4 className="font-serif font-extrabold text-[10px] sm:text-sm text-[#0B3C91] leading-tight">
                  Need Admissions Help?
                </h4>
                <span className="bg-amber-100 text-[#0B3C91] text-[9px] sm:text-[10px] font-extrabold px-1 sm:px-1.5 py-0.5 rounded">
                  2027-28
                </span>
              </div>
              <p className="text-[9px] sm:text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 shrink-0" />
                Counselors & AI Online
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsVisible(false);
              setIsDismissed(true);
            }}
            className="text-slate-400 hover:text-slate-600 p-1 sm:p-2 min-w-[32px] min-h-[32px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center rounded-full hover:bg-slate-100 cursor-pointer shrink-0 -mr-1 -mt-1 sm:-mr-2 sm:-mt-2"
            title="Close Assistant Popup"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Message body */}
        <p className="text-[10px] sm:text-xs text-slate-600 mt-1.5 sm:mt-2 leading-snug sm:leading-relaxed font-medium">
          <span className="sm:hidden">Ask AI or WhatsApp for admissions, fees &amp; campus tours.</span>
          <span className="hidden sm:inline">
            Welcome to <strong className="text-[#0B3C91]">Krishna Chaitanya Junior College</strong>! Ask our AI guide or chat on WhatsApp for 11th admissions, fees, and campus tours.
          </span>
        </p>

        {/* Action Buttons */}
        <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
          {/* AI Guide Popup Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              onOpenAIGuide();
            }}
            className="w-full py-2 sm:py-3 px-3 sm:px-4 min-h-[40px] sm:min-h-[48px] bg-gradient-to-r from-[#0B3C91] to-[#072B6B] hover:from-[#072B6B] hover:to-[#0B3C91] text-white font-extrabold text-[10px] sm:text-xs rounded-xl sm:rounded-2xl flex items-center justify-between shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FBBF24]" />
              <span>Ask Campus Guide AI</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-200 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          {/* WhatsApp Direct Chat Button */}
          <a
            href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Krishna Chaitanya Junior College! I want to enquire about Intermediate 2026 Admissions.')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsVisible(false)}
            className="w-full py-2 sm:py-3 px-3 sm:px-4 min-h-[40px] sm:min-h-[48px] bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] sm:text-xs rounded-xl sm:rounded-2xl flex items-center justify-between shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white stroke-none" />
              <span>Chat on WhatsApp</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200 group-hover:translate-x-1 transition-transform shrink-0" />
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
