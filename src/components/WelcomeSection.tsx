import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { ChevronRight, BookOpen, X } from 'lucide-react';
import { Container, SectionHeader, GlassCard, Button } from './ui';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

const CHOICE_CARDS = [
  {
    title: 'Academic Excellence',
    desc: 'A structured curriculum, experienced faculty, and regular assessments help every student achieve strong academic results.',
  },
  {
    title: 'Personalized Mentoring',
    desc: 'Individual attention, performance tracking, and continuous guidance ensure every student reaches their full potential.',
  },
  {
    title: 'Integrated Competitive Coaching',
    desc: 'Intermediate education combined with IIT-JEE, NEET, EAPCET, CA/CMA, and Long-Term coaching under one academic system.',
  },
  {
    title: 'Safe & Student-Centered Campus',
    desc: 'A disciplined environment, modern infrastructure, transport, hostels, and dedicated student support create the ideal place to learn.',
  },
] as const;

const LEGACY_PARAGRAPHS = [
  'Since 1998, Krishna Chaitanya Junior College has been committed to providing quality Intermediate education with integrated preparation for competitive examinations.',
  'Over the past 28+ years, we have earned the trust of thousands of students and parents through disciplined academics, experienced faculty, and a student-first approach. Our focus has always been on helping every student build a strong academic foundation while preparing for future careers and higher education.',
  "Today, Krishna Chaitanya has grown into one of Nellore's well-established educational institutions, offering modern campuses, technology-enabled learning, personalized mentoring, and comprehensive coaching for IIT-JEE, NEET, EAPCET, CA/CMA, and other competitive examinations.",
  'Beyond academic success, we believe in nurturing confident, responsible, and value-driven individuals through opportunities in NCC, NSS, cultural activities, leadership programs, and community service.',
  'At Krishna Chaitanya, our greatest achievement is the success and trust of the generations of students and families who have been part of our journey.',
] as const;

export const WelcomeSection: React.FC = () => {
  const [showLegacyModal, setShowLegacyModal] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useBodyScrollLock(showLegacyModal);

  const handleClose = useCallback(() => {
    setShowLegacyModal(false);
  }, []);

  useEffect(() => {
    if (!showLegacyModal) return;

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
  }, [showLegacyModal, handleClose]);

  return (
    <section id="welcome" className="section-padding bg-white text-[#1E293B] scroll-mt-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-light pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto space-y-8 sm:space-y-10"
        >
          <SectionHeader
            eyebrow="Why Parents Choose Krishna Chaitanya"
            title="A Trusted Foundation for Your Child's Future"
            description="For over 28 years, Krishna Chaitanya Junior College has helped thousands of students achieve academic excellence through experienced faculty, disciplined learning, personalized mentoring, and integrated competitive exam coaching. Every student receives the guidance, support, and opportunities needed to build a successful future."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {CHOICE_CARDS.map((item) => (
              <GlassCard key={item.title} className="p-5 sm:p-6">
                <h3 className="text-sm sm:text-base font-bold text-[#0B3C91] font-serif mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </GlassCard>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button variant="secondary" size="md" icon={BookOpen} onClick={() => setShowLegacyModal(true)}>
              Our Legacy Since 1998
              <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>
      </Container>

      {showLegacyModal &&
        createPortal(
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
              aria-labelledby="legacy-modal-title"
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[min(90dvh,calc(100dvh-2rem))] overflow-y-auto relative"
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <h3 id="legacy-modal-title" className="text-2xl font-bold font-serif text-[#0B3C91]">
                  Our Legacy Since 1998
                </h3>
                <div className="text-slate-700 text-sm leading-relaxed space-y-3">
                  {LEGACY_PARAGRAPHS.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <Button variant="secondary" size="sm" onClick={handleClose}>
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </section>
  );
};
