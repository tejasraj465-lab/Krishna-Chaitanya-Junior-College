import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Quote, ShieldCheck, X } from 'lucide-react';
import { LEADERSHIP_MEMBERS, CHAIRMAN_MESSAGE } from '../data/collegeData';
import { Container, SectionHeader, GlassCard, Button } from './ui';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

type Leader = (typeof LEADERSHIP_MEMBERS)[number];

export const LeadershipSection: React.FC = () => {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isOpen = selectedLeader !== null;
  useBodyScrollLock(isOpen);

  const handleClose = useCallback(() => {
    setSelectedLeader(null);
  }, []);

  useEffect(() => {
    if (!selectedLeader) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [selectedLeader, handleClose]);

  const isChairman = selectedLeader?.id === 'l1';

  return (
    <>
      <section
        id="leadership"
        className="section-padding-sm max-sm:py-6 bg-gradient-to-b from-[#F8FAFC] via-white to-[#EFF6FF]/40 text-[#1E293B] scroll-mt-[5.5rem] sm:scroll-mt-28 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-mesh-light pointer-events-none" />

        <Container className="relative z-10">
          <SectionHeader
            eyebrow="Visionary Leadership"
            title="Leadership at Krishna Chaitanya"
            className="max-sm:mb-4 max-sm:!space-y-1.5 mb-6 sm:mb-8"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 max-w-5xl mx-auto">
            {LEADERSHIP_MEMBERS.map((leader) => (
              <GlassCard
                key={leader.id}
                as="button"
                onClick={() => setSelectedLeader(leader)}
                className="w-full p-3 sm:p-4 flex items-center gap-3 text-left cursor-pointer group"
              >
                <img
                  src={leader.photo}
                  alt={leader.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover object-top shrink-0 ring-2 ring-[#0B3C91]/15 group-hover:ring-[#F97316]/40 transition-all"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-[#F97316] leading-tight">
                    {leader.title}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-[#0B3C91] font-serif leading-snug mt-0.5 line-clamp-2">
                    {leader.name}
                  </p>
                </div>
                <ChevronRight
                  className="w-4 h-4 text-slate-400 group-hover:text-[#0B3C91] shrink-0 transition-colors"
                  aria-hidden="true"
                />
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {isOpen &&
        selectedLeader &&
        createPortal(
          <AnimatePresence>
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-hidden overscroll-none"
              onClick={handleClose}
              role="presentation"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="leadership-profile-title"
                onClick={(e) => e.stopPropagation()}
                className="glass-card rounded-3xl max-w-2xl w-full p-5 sm:p-8 max-h-[min(92dvh,calc(100dvh-2rem))] overflow-y-auto relative"
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleClose}
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors z-10"
                  aria-label="Close profile"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-5 sm:space-y-6 pr-2">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
                    <div className="relative shrink-0">
                      <img
                        src={selectedLeader.photo}
                        alt={selectedLeader.name}
                        className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover object-top border-2 border-[#0B3C91] shadow-md"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -top-2 -left-2 bg-[#0B3C91] text-white px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md border border-white/20 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#F97316]" aria-hidden="true" />
                        <span>{selectedLeader.badge}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 min-w-0">
                      <p className="text-[11px] text-[#F97316] font-bold uppercase tracking-wider">
                        {selectedLeader.qualification}
                      </p>
                      <h3
                        id="leadership-profile-title"
                        className="text-xl sm:text-2xl font-extrabold font-serif text-[#0B3C91] leading-snug"
                      >
                        {selectedLeader.name}
                      </h3>
                      <div className="inline-block bg-blue-50 text-[#0B3C91] px-3 py-1 rounded-lg text-xs font-bold border border-blue-100">
                        {selectedLeader.title}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedLeader.description}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm text-slate-700 italic relative">
                    <Quote className="w-4 h-4 text-[#0B3C91] inline-block mr-1 opacity-70" aria-hidden="true" />
                    <span>&ldquo;{selectedLeader.quote}&rdquo;</span>
                  </div>

                  {isChairman && (
                    <section className="space-y-3">
                      <h4 className="text-base font-bold font-serif text-[#0B3C91]">
                        Chairman&apos;s Message
                      </h4>
                      <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-700 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                        {CHAIRMAN_MESSAGE.messageFull}
                      </div>
                    </section>
                  )}

                  <div className="flex justify-end pt-1">
                    <Button variant="secondary" size="md" onClick={handleClose}>
                      Close Profile
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
