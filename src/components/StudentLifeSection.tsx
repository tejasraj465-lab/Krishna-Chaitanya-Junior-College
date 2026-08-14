import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  BookOpen,
  HeartHandshake,
  Target,
  Trophy,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ChevronRight,
  X,
  Users,
  Music2,
  ShieldCheck,
  CalendarDays,
  TreePine,
  type LucideIcon,
} from 'lucide-react';
import { Container, SectionHeader, GlassCard, Button } from './ui';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface StudentLifeSectionProps {
  onOpenApplyModal?: (course?: string, campus?: string) => void;
  onOpenCampusVisit?: () => void;
  variant?: 'home' | 'page';
  onExploreFullPage?: () => void;
}

interface JourneyPillar {
  id: string;
  emoji: string;
  icon: LucideIcon;
  title: string;
  description: string;
  bgGradient: string;
  iconBg: string;
}

const JOURNEY_PILLARS: JourneyPillar[] = [
  {
    id: 'morning',
    emoji: '🌅',
    icon: Sun,
    title: 'Every Morning Begins With Purpose',
    bgGradient: 'from-amber-50 to-orange-50 border-orange-200/80',
    iconBg: 'bg-orange-500 text-white shadow-orange-500/20',
    description:
      'Walk into a vibrant campus filled with energy, ambition, and dreams. Learn from experienced faculty who inspire curiosity, confidence, and excellence from the very first class.',
  },
  {
    id: 'classroom',
    emoji: '📖',
    icon: BookOpen,
    bgGradient: 'from-blue-50 to-indigo-50 border-blue-200/80',
    iconBg: 'bg-[#0B3C91] text-white shadow-blue-500/20',
    title: 'Every Classroom Builds Your Future',
    description:
      'Concept-based learning in interactive digital classrooms. Integrated IIT-JEE, NEET, EAPCET, CA & CMA coaching with daily practice, weekly assessments, and continuous mentoring.',
  },
  {
    id: 'friendship',
    emoji: '🤝',
    icon: HeartHandshake,
    bgGradient: 'from-pink-50 to-rose-50 border-pink-200/80',
    iconBg: 'bg-rose-500 text-white shadow-rose-500/20',
    title: 'Every Friendship Creates Memories',
    description:
      "College life is more than academics. Celebrate Freshers' Day, Ethnic Day, Sports, Annual Day, Educational Tours, and unforgettable cultural events.",
  },
  {
    id: 'challenge',
    emoji: '🎯',
    icon: Target,
    bgGradient: 'from-purple-50 to-violet-50 border-purple-200/80',
    iconBg: 'bg-purple-600 text-white shadow-purple-500/20',
    title: 'Every Challenge Makes You Stronger',
    description:
      'Mock Tests, Revision Programmes, Faculty Mentoring, Career Guidance, and Performance Analysis help transform hurdles into confidence.',
  },
  {
    id: 'achievement',
    emoji: '🏆',
    icon: Trophy,
    bgGradient: 'from-amber-50 to-[#FFFBEB] border-amber-300/80',
    iconBg: 'bg-amber-500 text-white shadow-amber-500/20',
    title: 'Every Achievement Opens New Doors',
    description:
      'The day finally arrives. Results are announced, dream colleges become reality, parents smile with pride, and students celebrate years of dedicated effort as a new journey begins.',
  },
];

const FULL_LIFE_HIGHLIGHTS = [
  { title: 'Student Life', icon: Users, description: 'A balanced campus culture where academics, friendships, and mentorship grow together every day.' },
  { title: 'Clubs', icon: Sparkles, description: 'Interest-based clubs that encourage creativity, leadership, communication, and teamwork.' },
  { title: 'Cultural Activities', icon: Music2, description: 'Festivals, performances, and annual celebrations that keep campus life vibrant and memorable.' },
  { title: 'Sports', icon: Trophy, description: 'Structured sports, fitness, and competitive games that build discipline and healthy routines.' },
  { title: 'Campus Events', icon: CalendarDays, description: 'Freshers, annual day, seminars, special assemblies, and milestone celebrations across the year.' },
  { title: 'NSS', icon: TreePine, description: 'Service-oriented initiatives that develop social responsibility and community engagement.' },
  { title: 'NCC', icon: ShieldCheck, description: 'Leadership, discipline, and defense-orientation through NCC training and cadet opportunities.' },
  { title: 'Workshops & Seminars', icon: BookOpen, description: 'Practical sessions that add academic depth, career awareness, and communication skills.' },
  { title: 'Student Development', icon: GraduationCap, description: 'Programs that strengthen personality, confidence, and career readiness for the future.' },
] as const;

const HOME_PILLARS = JOURNEY_PILLARS.slice(0, 3);

const PILLAR_SHORT_LABEL: Record<string, string> = {
  morning: 'Morning',
  classroom: 'Classroom',
  friendship: 'Friendship',
  challenge: 'Challenge',
  achievement: 'Achievement',
};

export const StudentLifeSection: React.FC<StudentLifeSectionProps> = ({
  onOpenApplyModal,
  onOpenCampusVisit,
  variant = 'home',
  onExploreFullPage,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<JourneyPillar | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isOpen = selectedPillar !== null;
  useBodyScrollLock(isOpen);

  const handleClose = useCallback(() => {
    setSelectedPillar(null);
  }, []);

  useEffect(() => {
    if (!selectedPillar) return;

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
  }, [selectedPillar, handleClose]);

  if (variant === 'page') {
    return (
      <section id="explore-kcjc" className="py-8 md:py-12 bg-white text-[#1E293B] scroll-mt-[5.5rem] sm:scroll-mt-28">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
            {FULL_LIFE_HIGHLIGHTS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="p-5 sm:p-6 rounded-2xl border border-blue-100 bg-gradient-to-b from-white to-[#EFF6FF] shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#0B3C91] text-white flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0B3C91] font-serif mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-[#0B3C91] via-[#092e70] to-[#041638] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-blue-900">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#F97316]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-300/30 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider inline-block">
                ✨ The Krishna Chaitanya Experience
              </span>

              <h3 className="text-2xl sm:text-4xl font-extrabold font-serif text-white">
                Two Years. Hundreds of Classes. Thousands of Memories. One Extraordinary Future.
              </h3>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl mx-auto">
                Ready to start your 730-day journey towards top rank engineering, medical, or commerce careers?
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                {onOpenApplyModal && (
                  <button
                    onClick={() => onOpenApplyModal()}
                    className="bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Start Your Journey</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {onOpenCampusVisit && (
                  <button
                    onClick={onOpenCampusVisit}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-white/20 transition-all cursor-pointer backdrop-blur-md flex items-center gap-2"
                  >
                    <span>Experience Campus Visit</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="explore-kcjc"
        className="section-padding-sm max-sm:py-6 bg-gradient-to-b from-[#F8FAFC] via-white to-[#EFF6FF]/40 text-[#1E293B] scroll-mt-[5.5rem] sm:scroll-mt-28 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-mesh-light pointer-events-none" />

        <Container className="relative z-10">
          <SectionHeader
            eyebrow="Campus Atmosphere & Experience"
            title="Life at Krishna Chaitanya"
            className="max-sm:mb-4 max-sm:!space-y-1.5 mb-6 sm:mb-8"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 max-w-5xl mx-auto">
            {HOME_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <GlassCard
                  key={pillar.id}
                  as="button"
                  onClick={() => setSelectedPillar(pillar)}
                  className="w-full p-3 sm:p-4 flex items-center gap-3 text-left cursor-pointer group"
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl shrink-0 flex items-center justify-center ${pillar.iconBg} ring-2 ring-[#0B3C91]/10 group-hover:ring-[#F97316]/40 transition-all`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-[#F97316] leading-tight">
                      {pillar.emoji} {PILLAR_SHORT_LABEL[pillar.id] ?? 'Campus Life'}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#0B3C91] font-serif leading-snug mt-0.5 line-clamp-2">
                      {pillar.title}
                    </p>
                  </div>
                  <ChevronRight
                    className="w-4 h-4 text-slate-400 group-hover:text-[#0B3C91] shrink-0 transition-colors"
                    aria-hidden="true"
                  />
                </GlassCard>
              );
            })}
          </div>

          {onExploreFullPage && (
            <div className="flex justify-center mt-5 sm:mt-6">
              <Button variant="secondary" size="md" onClick={onExploreFullPage}>
                Explore Life at KCJC
                <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Button>
            </div>
          )}
        </Container>
      </section>

      {isOpen &&
        selectedPillar &&
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
                aria-labelledby="life-pillar-title"
                onClick={(e) => e.stopPropagation()}
                className="glass-card rounded-3xl max-w-2xl w-full p-5 sm:p-8 max-h-[min(92dvh,calc(100dvh-2rem))] overflow-y-auto relative"
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleClose}
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors z-10"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-5 sm:space-y-6 pr-2">
                  {(() => {
                    const Icon = selectedPillar.icon;
                    return (
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
                        <div
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shrink-0 flex items-center justify-center ${selectedPillar.iconBg}`}
                        >
                          <Icon className="w-8 h-8 sm:w-9 sm:h-9" aria-hidden="true" />
                        </div>
                        <div className="space-y-1.5 min-w-0">
                          <p className="text-[11px] text-[#F97316] font-bold uppercase tracking-wider">
                            {selectedPillar.emoji}{' '}
                            {PILLAR_SHORT_LABEL[selectedPillar.id] ?? 'Campus Life'}
                          </p>
                          <h3
                            id="life-pillar-title"
                            className="text-xl sm:text-2xl font-extrabold font-serif text-[#0B3C91] leading-snug"
                          >
                            {selectedPillar.title}
                          </h3>
                        </div>
                      </div>
                    );
                  })()}

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedPillar.description}
                  </p>

                  <div className="flex justify-end pt-1">
                    <Button variant="secondary" size="md" onClick={handleClose}>
                      Close
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
