import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { X, MessageCircle, CheckCircle2, MapPin, ChevronDown } from 'lucide-react';
import { Button } from './ui';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { COLLEGE_INFO } from '../data/collegeData';

const LEGACY_STORY = [
  'Established in 1998, Krishna Chaitanya Junior College was founded with a vision of providing quality Intermediate education that empowers students with knowledge, discipline, confidence, and strong values.',
  'For over 28 years, we have earned the trust of thousands of students and parents through experienced faculty, personalized mentoring, integrated competitive exam preparation, and a student-first approach to learning.',
  'Today, Krishna Chaitanya continues to nurture future engineers, doctors, professionals, entrepreneurs, and leaders by combining academic excellence with character development in a safe and disciplined environment.',
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

const CHILD_NEEDS = [
  '28+ Years of Academic Excellence',
  'Experienced & Dedicated Faculty',
  'IIT-JEE, NEET & EAPCET Coaching',
  'CA & CMA Foundation Programmes',
  'Personalized Mentoring & Doubt Support',
  'Weekly Tests & Performance Analysis',
  'Smart Classrooms & Modern Laboratories',
  'Library & Digital Learning Resources',
  'Separate Boys & Girls Hostels',
  'Safe Campus & Transport Facilities',
  'Career Guidance & Counselling',
  'NCC, Sports & Personality Development',
] as const;

const ADVANTAGE_ITEMS = [
  {
    title: 'Academic Excellence',
    description: 'Concept-based teaching focused on strong Board and competitive examination results.',
  },
  {
    title: 'Integrated Coaching',
    description:
      'Intermediate education combined with IIT-JEE, NEET, EAPCET, CA Foundation, CMA Foundation and Long-Term preparation.',
  },
  {
    title: 'Experienced Faculty',
    description: 'Dedicated educators providing concept clarity, individual attention and continuous mentoring.',
  },
  {
    title: 'Personalized Support',
    description: 'Regular assessments, doubt clarification, performance tracking and one-to-one guidance.',
  },
  {
    title: 'Modern Learning Environment',
    description: 'Smart classrooms, laboratories, library, digital resources and technology-enabled learning.',
  },
  {
    title: 'Beyond Academics',
    description:
      'Leadership, communication, personality development, NCC, sports, cultural activities and community engagement.',
  },
] as const;

const APPROACH_STEPS = [
  'Concept Learning',
  'Daily Practice',
  'Assignments',
  'Weekly Tests',
  'Performance Analysis',
  'Personalized Mentoring',
  'Parent Reviews',
  'Continuous Improvement',
] as const;

const TECHNOLOGY_ITEMS = [
  'Smart Digital Classrooms',
  'Interactive Teaching',
  'Digital Resources',
  'Performance Monitoring',
  'Online Academic Support',
  'Modern Laboratories',
] as const;

const COMPETITIVE_PROGRAMMES = [
  'IIT-JEE',
  'NEET',
  'EAPCET',
  'CA Foundation',
  'CMA Foundation',
  'Long-Term Programmes',
] as const;

const PARENT_ITEMS = [
  'Regular review meetings',
  'Progress reports',
  'Attendance monitoring',
  'Academic counselling',
  'Performance discussions',
  'Career guidance',
] as const;

const SUPPORT_ITEMS = [
  'Academic Mentoring',
  'Doubt Clarification',
  'Career Counselling',
  'Time Management',
  'Exam Strategies',
  'Goal Setting',
  'Individual Support',
] as const;

const CAMPUS_FACILITIES = [
  'Smart Classrooms',
  'Physics, Chemistry & Biology Labs',
  'Computer Lab',
  'Library',
  'Seminar Hall',
  'Hostels',
  'Transport',
  'CCTV Surveillance',
  'Clean & Green Campus',
] as const;

const RECOMMEND_ITEMS = [
  'Consistent Academic Results',
  'Individual Student Attention',
  'Experienced Faculty',
  'Strong Discipline',
  'Integrated Competitive Coaching',
  'Safe Learning Environment',
  'Transparent Parent Communication',
  'Complete Student Development',
] as const;

const FAQS = [
  {
    question: 'Is integrated coaching available?',
    answer:
      'Yes. IIT-JEE, NEET, EAPCET, CA Foundation, CMA Foundation and other programmes are integrated with Intermediate education.',
  },
  {
    question: 'Are hostels available?',
    answer: 'Yes. Separate hostel facilities are available for boys and girls.',
  },
  {
    question: 'Is transportation available?',
    answer: 'Yes. Transport services cover multiple routes across Nellore.',
  },
  {
    question: 'Do students receive individual attention?',
    answer: 'Yes. Students receive personalized mentoring, regular assessments and doubt support.',
  },
  {
    question: 'How are parents updated?',
    answer: 'Through parent meetings, attendance updates, academic reports and counselling sessions.',
  },
] as const;

interface LegacyModalProps {
  open: boolean;
  onClose: () => void;
  onOpenApplyModal?: () => void;
  onOpenCampusVisit?: () => void;
  variant?: 'story' | 'whyKcjc';
}

function CheckGrid({ items, columns = 2 }: { items: readonly string[]; columns?: 1 | 2 | 3 }) {
  return (
    <ul
      className={`grid gap-x-4 gap-y-2 ${
        columns === 3
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          : columns === 1
            ? 'grid-cols-1'
            : 'grid-cols-1 sm:grid-cols-2'
      }`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-slate-700 leading-snug">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ChipList({ items, dark = false }: { items: readonly string[]; dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={
            dark
              ? 'inline-flex px-2.5 py-1.5 rounded-lg bg-[#0B3C91] text-white text-xs font-bold'
              : 'inline-flex items-center px-2.5 py-1.5 rounded-full bg-[#EFF6FF] border border-blue-100 text-xs font-semibold text-[#0B3C91]'
          }
        >
          {item}
        </span>
      ))}
    </div>
  );
}

const WhyKcjcBody: React.FC<{
  onApply: () => void;
  onCampusVisit?: () => void;
}> = ({ onApply, onCampusVisit }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const whatsappUrl = `https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Krishna Chaitanya! I would like to talk to an admission counselor.'
  )}`;

  return (
    <div className="space-y-6 sm:space-y-7">
      <p className="text-sm text-slate-700 leading-relaxed">
        For <strong>28+ years</strong>, Krishna Chaitanya Junior College has helped students achieve academic excellence
        through experienced faculty, disciplined learning, integrated competitive coaching, personalized mentoring, and
        a supportive learning environment.
      </p>

      <section className="space-y-3">
        <h4 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91]">Everything Your Child Needs</h4>
        <CheckGrid items={CHILD_NEEDS} />
      </section>

      <section className="space-y-3">
        <div>
          <h4 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91]">The KCJC Advantage</h4>
          <p className="text-sm font-semibold text-[#F97316] mt-1">
            More Than a College — A Complete Learning Ecosystem
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ADVANTAGE_ITEMS.map((item) => (
            <div key={item.title} className="rounded-xl border border-blue-100 bg-white p-3.5 sm:p-4">
              <p className="text-sm font-bold text-[#0B3C91]">{item.title}</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91]">Our Approach to Student Success</h4>
        <div className="flex flex-wrap gap-2">
          {APPROACH_STEPS.map((step, index) => (
            <span
              key={step}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-2.5 py-1.5 text-xs font-semibold text-[#0B3C91]"
            >
              <span className="w-5 h-5 rounded-full bg-[#0B3C91] text-white text-[10px] font-bold flex items-center justify-center">
                {index + 1}
              </span>
              {step}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91]">Technology-Enabled Learning</h4>
        <ChipList items={TECHNOLOGY_ITEMS} />
      </section>

      <section className="space-y-3">
        <h4 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91]">Complete Competitive Preparation</h4>
        <p className="text-sm text-slate-700 leading-relaxed">
          Students prepare for <strong>Board + Competitive Examinations</strong> through an integrated academic system.
        </p>
        <ChipList items={COMPETITIVE_PROGRAMMES} dark />
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <section className="space-y-3 rounded-xl border border-blue-100 bg-blue-50/40 p-4">
          <h4 className="text-base font-bold font-serif text-[#0B3C91]">Strong Parent Partnership</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Parents stay connected through regular updates and counselling.
          </p>
          <CheckGrid items={PARENT_ITEMS} columns={1} />
        </section>
        <section className="space-y-3 rounded-xl border border-blue-100 bg-blue-50/40 p-4">
          <h4 className="text-base font-bold font-serif text-[#0B3C91]">Student Support</h4>
          <ChipList items={SUPPORT_ITEMS} />
        </section>
      </div>

      <section className="space-y-3">
        <h4 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91]">Campus Facilities</h4>
        <CheckGrid items={CAMPUS_FACILITIES} columns={3} />
      </section>

      <section className="space-y-3">
        <h4 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91]">Why Parents Recommend KCJC</h4>
        <CheckGrid items={RECOMMEND_ITEMS} />
      </section>

      <section className="space-y-3">
        <h4 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91]">Frequently Asked Questions</h4>
        <div className="space-y-2">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.question} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-[#0B3C91]">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <p className="px-4 pb-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-[#0B3C91] via-[#072B6B] to-[#031333] text-white p-5 sm:p-6 text-center space-y-3">
        <span className="inline-flex bg-[#FBBF24] text-[#0B3C91] font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider">
          Admissions Open for 2026–27
        </span>
        <h4 className="text-lg sm:text-xl font-bold font-serif leading-snug text-white">
          Begin Your Journey Towards Academic Excellence
        </h4>
        <p className="text-sm text-blue-100 leading-relaxed">
          Build the knowledge, discipline, confidence and skills needed to achieve your future goals.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2 pt-1">
          <button
            type="button"
            onClick={onApply}
            className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm px-5 py-3 rounded-xl min-h-[44px] cursor-pointer"
          >
            Apply for Admission
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-3 rounded-xl min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4 fill-white stroke-none" aria-hidden="true" />
            Talk to an Admission Counselor
          </a>
          {onCampusVisit && (
            <button
              type="button"
              onClick={onCampusVisit}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3 rounded-xl border border-white/25 min-h-[44px] cursor-pointer"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Schedule a Campus Visit
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export const LegacyModal: React.FC<LegacyModalProps> = ({
  open,
  onClose,
  onOpenApplyModal,
  onOpenCampusVisit,
  variant = 'story',
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isWhyKcjc = variant === 'whyKcjc';

  useBodyScrollLock(open);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

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
  }, [open, handleClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-hidden overscroll-none"
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
        className={`glass-card rounded-3xl w-full max-h-[min(92dvh,calc(100dvh-2rem))] relative flex flex-col overflow-hidden ${
          isWhyKcjc ? 'max-w-4xl' : 'max-w-3xl'
        }`}
      >
        <div className="shrink-0 relative px-5 sm:px-8 pt-5 sm:pt-6 pb-4 pr-16 sm:pr-20 bg-white/95 backdrop-blur-sm border-b border-slate-100">
          {isWhyKcjc ? (
            <>
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#F97316] mb-1">WHY KCJC</p>
              <h3 id="legacy-modal-title" className="text-xl sm:text-2xl font-bold font-serif text-[#0B3C91] leading-snug">
                Why Thousands of Parents Trust Krishna Chaitanya
              </h3>
            </>
          ) : (
            <>
              <h3 id="legacy-modal-title" className="text-2xl font-bold font-serif text-[#0B3C91]">
                Our Legacy Since 1998
              </h3>
              <p className="text-sm sm:text-base font-semibold text-[#F97316] mt-1">
                28+ Years of Academic Excellence, Trust & Student Success
              </p>
            </>
          )}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full border-2 border-[#F97316] bg-white hover:bg-orange-50 text-[#F97316] flex items-center justify-center cursor-pointer transition-colors z-10 shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-8 py-5 sm:py-6 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {isWhyKcjc ? (
            <WhyKcjcBody
              onApply={() => {
                handleClose();
                onOpenApplyModal?.();
              }}
              onCampusVisit={
                onOpenCampusVisit
                  ? () => {
                      handleClose();
                      onOpenCampusVisit();
                    }
                  : undefined
              }
            />
          ) : (
            <div className="space-y-6 sm:space-y-8">
              <section className="space-y-3">
                <h4 className="text-lg font-bold font-serif text-[#0B3C91]">Our Story</h4>
                <div className="text-slate-700 text-sm leading-relaxed space-y-3">
                  {LEGACY_STORY.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
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
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  className="sm:flex-1"
                  onClick={() => {
                    handleClose();
                    onOpenApplyModal?.();
                  }}
                >
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
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};
