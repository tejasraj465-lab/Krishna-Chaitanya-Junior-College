import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { ChevronRight, BookOpen, X, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Container, SectionHeader, GlassCard, Button } from './ui';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { COLLEGE_INFO } from '../data/collegeData';

const CHOICE_CARDS = [
  {
    title: '👨‍🏫 Experienced Faculty',
    desc: 'Experienced subject experts, concept-based teaching, and continuous academic monitoring.',
  },
  {
    title: '🎯 Personalized Mentoring',
    desc: 'Regular tests, performance tracking, doubt clarification, and parent updates for every student.',
  },
  {
    title: '📚 Integrated Competitive Coaching',
    desc: 'Intermediate + IIT-JEE, NEET, EAPCET, CA/CMA & Long-Term preparation under one system.',
  },
  {
    title: '🏫 Safe & Disciplined Campus',
    desc: "Separate boys' & girls' campuses, CCTV surveillance, transport, hostels, and a focused learning environment.",
  },
] as const;

const LEGACY_STORY = [
  'Established in 1998, Krishna Chaitanya Junior College was founded with a vision of providing quality Intermediate education that empowers students with knowledge, discipline, confidence, and strong values.',
  'For over 28 years, we have earned the trust of thousands of students and parents through experienced faculty, personalized mentoring, integrated competitive exam preparation, and a student-first approach to learning.',
  'Today, Krishna Chaitanya continues to nurture future engineers, doctors, professionals, entrepreneurs, and leaders by combining academic excellence with character development in a safe and disciplined environment.',
] as const;

const LEGACY_STATS = [
  { emoji: '📅', title: 'Established 1998', subtitle: '' },
  { emoji: '🎓', title: 'Academic Excellence', subtitle: '28+ Years' },
  { emoji: '🏫', title: 'Campuses', subtitle: '17 Across Nellore' },
  { emoji: '👨‍🎓', title: 'Students', subtitle: '13,000+' },
  { emoji: '👩‍🏫', title: 'Faculty & Staff', subtitle: '500+' },
  { emoji: '🎖', title: 'Special Recognition', subtitle: "Home to Nellore's Only Private Intermediate College NCC Unit" },
] as const;

const LEGACY_PHILOSOPHY = [
  'At Krishna Chaitanya, we believe every student has the potential to succeed when provided with the right guidance, quality teaching, and continuous encouragement.',
  'Our academic approach focuses on concept clarity, disciplined learning, regular assessments, personalized mentoring, and integrated preparation for Board examinations as well as national and state-level competitive examinations.',
  'Beyond academics, we strive to develop confidence, responsibility, leadership, and lifelong learning skills that prepare students for success in higher education and beyond.',
] as const;

const LEGACY_VALUES = [
  'Academic Excellence',
  'Discipline & Integrity',
  'Student-First Approach',
  'Experienced Faculty',
  'Continuous Improvement',
  'Parent Trust',
] as const;

const LEGACY_QUOTE =
  'For over 28 years, our greatest achievement has been the trust placed in us by generations of students and parents. We remain committed to shaping confident learners, responsible citizens, and successful future leaders.';

interface WelcomeSectionProps {
  onOpenApplyModal?: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onOpenApplyModal }) => {
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
            eyebrow="WHY CHOOSE KRISHNA CHAITANYA?"
            title="Why Thousands of Parents Trust Krishna Chaitanya"
            description="For over 28 years, Krishna Chaitanya Junior College has helped students build strong academic foundations through experienced faculty, disciplined learning, personalized mentoring, and integrated competitive exam coaching—all in a safe and student-focused environment."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            {CHOICE_CARDS.map((item) => (
              <GlassCard key={item.title} className="p-5 sm:p-6 h-full flex flex-col">
                <h3 className="text-sm sm:text-base font-bold text-[#0B3C91] font-serif mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">{item.desc}</p>
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
              className="glass-card rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[min(92dvh,calc(100dvh-2rem))] overflow-y-auto relative"
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6 sm:space-y-8 pr-2">
                <div>
                  <h3 id="legacy-modal-title" className="text-2xl font-bold font-serif text-[#0B3C91]">
                    Our Legacy Since 1998
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-[#F97316] mt-1">
                    28+ Years of Academic Excellence, Trust & Student Success
                  </p>
                </div>

                <section className="space-y-3">
                  <h4 className="text-lg font-bold font-serif text-[#0B3C91]">Our Story</h4>
                  <div className="text-slate-700 text-sm leading-relaxed space-y-3">
                    {LEGACY_STORY.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <h4 className="text-lg font-bold font-serif text-[#0B3C91]">A Legacy of Excellence</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {LEGACY_STATS.map((stat) => (
                      <GlassCard key={stat.title} className="p-4 text-center h-full" hover={false}>
                        <span className="text-2xl mb-2 block" aria-hidden="true">
                          {stat.emoji}
                        </span>
                        <p className="text-sm font-bold text-[#0B3C91] font-serif">{stat.title}</p>
                        {stat.subtitle && (
                          <p className="text-xs text-slate-600 mt-1 leading-snug">{stat.subtitle}</p>
                        )}
                      </GlassCard>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <h4 className="text-lg font-bold font-serif text-[#0B3C91]">Our Educational Philosophy</h4>
                  <div className="text-slate-700 text-sm leading-relaxed space-y-3">
                    {LEGACY_PHILOSOPHY.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <h4 className="text-lg font-bold font-serif text-[#0B3C91]">The Values That Guide Us</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {LEGACY_VALUES.map((value) => (
                      <li key={value} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="rounded-2xl bg-gradient-to-br from-[#0B3C91] via-[#072B6B] to-[#031333] text-white p-5 sm:p-6">
                  <p className="text-sm sm:text-base leading-relaxed italic">&ldquo;{LEGACY_QUOTE}&rdquo;</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button variant="primary" size="md" fullWidth className="sm:flex-1" onClick={() => { handleClose(); onOpenApplyModal?.(); }}>
                    Apply for Admission
                  </Button>
                  <a
                    href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Krishna Chaitanya! I would like to talk to an admission counselor.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white stroke-none" aria-hidden="true" />
                    <span>Talk to an Admission Counselor</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </section>
  );
};
