import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Sparkles, Award } from 'lucide-react';
import kcLogo from '../assets/kc_logo.svg';

interface OpeningAnimationProps {
  onComplete?: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const statusMessages = [
    'Initialising Campus Gateway...',
    'Loading Academic Streams & Syllabus...',
    'Preparing 3 AP BN NCC & Campus Highlights...',
    'Welcome to Krishna Chaitanya!'
  ];

  useEffect(() => {
    // Time-based progress counter guaranteed to run for at least 1.5 seconds (1500ms)
    const startTime = Date.now();
    const totalDuration = 1500; // 1.5 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.round((elapsed / totalDuration) * 100), 100);

      setProgress(currentProgress);

      if (currentProgress >= 75) setStatusIndex(3);
      else if (currentProgress >= 45) setStatusIndex(2);
      else if (currentProgress >= 20) setStatusIndex(1);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsDone(true);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-[#04122B] text-white flex flex-col items-center justify-between p-6 overflow-hidden select-none"
        >
          {/* Animated Background Rays & Ambient Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,60,145,0.6)_0%,rgba(4,18,43,0.95)_70%)] pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-80 h-80 sm:w-96 sm:h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 sm:w-96 sm:h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

          {/* Top Bar - Skip Option */}
          <div className="w-full max-w-5xl flex justify-between items-center relative z-10 pt-2 sm:pt-4">
            <div className="flex items-center gap-2 text-xs text-blue-300 font-semibold tracking-wider uppercase bg-blue-950/60 px-3 py-1.5 rounded-full border border-blue-800/60 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>Sri Krishna Chaitanya Institutions</span>
            </div>

            <button
              onClick={handleSkip}
              className="text-xs text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-full border border-white/20 backdrop-blur-md transition-all cursor-pointer font-bold active:scale-95"
            >
              Skip Intro
            </button>
          </div>

          {/* Central Logo & Brand Reveal */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto max-w-xl px-4">
            
            {/* Animated Logo Container with Glow Ring */}
            <div className="relative mb-6 sm:mb-8 group">
              {/* Spinning Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 sm:-inset-5 rounded-full border-2 border-dashed border-[#FBBF24]/40"
              />
              
              {/* Glowing Pulse Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full blur-xl opacity-60 animate-pulse" />
              
              {/* Logo Box */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 180 }}
                className="relative w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-3xl p-3 sm:p-4 shadow-2xl flex items-center justify-center border-2 border-[#FBBF24]"
              >
                <img
                  src={kcLogo}
                  alt="Krishna Chaitanya Educational Institutions"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>

            {/* Title Text with Gradient */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-display text-white uppercase leading-tight">
                KRISHNA <span className="text-[#FBBF24]">CHAITANYA</span>
              </h1>
              <p className="text-brand-sub text-blue-200 mt-2">
                Junior College
              </p>
            </motion.div>

            {/* Tagline Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] sm:text-xs text-blue-300"
            >
              <span className="inline-flex items-center gap-1 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700/50">
                <GraduationCap className="w-3.5 h-3.5 text-[#FBBF24]" /> IIT-JEE • NEET • EAPCET
              </span>
              <span className="inline-flex items-center gap-1 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700/50">
                <Award className="w-3.5 h-3.5 text-[#FBBF24]" /> 3 AP BN NCC Unit
              </span>
            </motion.div>
          </div>

          {/* Bottom Progress Bar & Loading Status */}
          <div className="w-full max-w-md relative z-10 space-y-3 pb-4 sm:pb-8">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-1">
              <span className="text-blue-300 font-medium truncate max-w-[280px]">
                {statusMessages[statusIndex]}
              </span>
              <span className="text-[#FBBF24] font-serif text-sm ml-2">{progress}%</span>
            </div>

            {/* Bar Container */}
            <div className="w-full h-2.5 sm:h-3 bg-blue-950 rounded-full p-0.5 border border-blue-800/80 shadow-inner overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-[#FBBF24] to-amber-500 rounded-full shadow-lg"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
              />
            </div>

            <p className="text-[10px] text-center text-slate-400 font-medium tracking-wide">
              Nellore's No. 1 Premier Academic Institution
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
