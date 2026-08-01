import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquareMore, Sparkles, X, MessageCircle } from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';
import { CuteRobotIcon } from './CuteRobotIcon';

interface AIBotWidgetFloatingProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenApplyModal: () => void;
}

export const AIBotWidgetFloating: React.FC<AIBotWidgetFloatingProps> = ({
  isOpen,
  onToggle,
  onOpenApplyModal
}) => {
  const [showCallout, setShowCallout] = useState(true);
  const [calloutText, setCalloutText] = useState("Chat with KC AI Guide 🤖");

  // Cycle callout messages periodically to engage visitors
  useEffect(() => {
    const messages = [
      "Have questions? Ask AI Guide 🤖",
      "2026-27 Admissions Open! 🎓",
      "Ask about JEE/NEET Coaching 🏆",
      "12 Nellore Campuses Info 📍"
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % messages.length;
      setCalloutText(messages[idx]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-[76px] md:bottom-6 right-3 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 font-sans pointer-events-auto">
      {/* Speech Callout Pill (matching screenshot style) */}
      <AnimatePresence>
        {showCallout && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="relative bg-white text-[#0B3C91] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg border border-[#0070CD]/30 flex items-center gap-1.5 cursor-pointer group"
            onClick={onToggle}
          >
            {/* Online Green Pulsing Indicator */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>

            <p className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap text-[#0B3C91]">
              {calloutText}
            </p>

            {/* Close callout cross */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCallout(false);
              }}
              className="text-slate-400 hover:text-slate-600 p-0.5 ml-0.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              title="Dismiss prompt"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Speech bubble arrow tail pointing to circular button */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-6 border-y-transparent border-l-6 border-l-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Circular AI Chat Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onToggle}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer relative border-2 ${
          isOpen
            ? 'bg-[#0866FF] text-white border-white ring-4 ring-blue-300/50'
            : 'bg-gradient-to-br from-[#0866FF] via-[#0064E0] to-[#0052CC] text-white border-white ring-4 ring-blue-300/50 hover:ring-amber-300'
        }`}
        title={isOpen ? "Close AI Assistant" : "Open Campus Guide AI"}
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Cute Robot Icon */}
            <CuteRobotIcon className="w-9 h-9 sm:w-11 sm:h-11 drop-shadow-md transition-transform group-hover:scale-110" />
            
            {/* Mini AI Badge */}
            <span className="absolute -top-1 -right-1.5 bg-[#FBBF24] text-[#0B3C91] text-[9px] font-black px-1 rounded-full border border-white shadow-xs">
              AI
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
};
