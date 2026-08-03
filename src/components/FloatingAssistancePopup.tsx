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
        className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:bottom-24 right-4 sm:right-6 z-40 max-w-[340px] sm:max-w-[360px] w-full bg-white rounded-3xl p-4 shadow-2xl border-2 border-blue-200/80 font-sans"
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0B3C91] to-indigo-900 text-white flex items-center justify-center font-bold shadow-md">
                <Bot className="w-6 h-6 text-[#FBBF24]" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-serif font-extrabold text-xs sm:text-sm text-[#0B3C91]">
                  Need Admissions Help?
                </h4>
                <span className="bg-amber-100 text-[#0B3C91] text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                  2026-27
                </span>
              </div>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Counselors & AI Online
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsVisible(false);
              setIsDismissed(true);
            }}
            className="text-slate-400 hover:text-slate-600 p-2 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full hover:bg-slate-100 cursor-pointer -mr-2 -mt-2"
            title="Close Assistant Popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message body */}
        <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
          Welcome to <strong className="text-[#0B3C91]">Krishna Chaitanya Junior College</strong>! Ask our AI guide or chat on WhatsApp for 11th admissions, fees, and campus tours.
        </p>

        {/* Action Buttons */}
        <div className="mt-3 space-y-2">
          {/* AI Guide Popup Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              onOpenAIGuide();
            }}
            className="w-full py-3 px-4 min-h-[48px] bg-gradient-to-r from-[#0B3C91] to-[#072B6B] hover:from-[#072B6B] hover:to-[#0B3C91] text-white font-extrabold text-xs rounded-2xl flex items-center justify-between shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
              <span>Ask Campus Guide AI</span>
            </div>
            <ChevronRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* WhatsApp Direct Chat Button */}
          <a
            href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Krishna Chaitanya Junior College! I want to enquire about Intermediate 2026 Admissions.')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsVisible(false)}
            className="w-full py-3 px-4 min-h-[48px] bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl flex items-center justify-between shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Chat on WhatsApp</span>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
