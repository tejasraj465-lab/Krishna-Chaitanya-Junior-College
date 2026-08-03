import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import {
  X,
  CheckCircle,
  Sparkles,
  Tablet,
  BrainCircuit,
  BarChart3,
  Tv,
  Video,
  Award,
  BookOpen,
  ChevronRight,
  ChevronDown,
  GraduationCap,
  Layers,
  Target,
} from 'lucide-react';
import { PROGRAM_DETAILS, ProgramDetail } from '../data/courseDetailsData';

interface CourseDetailModalProps {
  programId: string | null;
  onClose: () => void;
  onApplyForProgram: (programName: string) => void;
}

interface DetailSectionProps {
  title: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const DetailSection: React.FC<DetailSectionProps> = ({ title, defaultOpen = true, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-slate-200/80 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 text-left cursor-pointer hover:bg-slate-50/80 transition-colors"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 min-w-0">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-0 border-t border-slate-100">{children}</div>}
    </div>
  );
};

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  programId,
  onClose,
  onApplyForProgram,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const program: ProgramDetail | null =
    programId && PROGRAM_DETAILS[programId] ? PROGRAM_DETAILS[programId] : null;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!program) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus();
    };
  }, [programId, program, handleClose]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [programId]);

  if (!program) return null;

  const modalMarkup = (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center overflow-hidden overscroll-none bg-slate-950/70 backdrop-blur-md p-0 sm:p-4 sm:py-6"
      onClick={handleClose}
      role="presentation"
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.25 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-detail-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-4xl bg-white rounded-t-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col min-h-0 max-h-[min(90dvh,calc(100dvh-1rem))] sm:max-h-[min(85dvh,calc(100dvh-3rem))] lg:max-h-[min(80dvh,calc(100dvh-3rem))]"
      >
        {/* Sticky header */}
        <div className="shrink-0 bg-gradient-to-r from-[#0B3C91] via-[#072B6B] to-[#0A2558] text-white px-4 py-3.5 sm:px-6 sm:py-5 relative">
          <div className="flex items-start gap-3 pr-12 sm:pr-14">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="bg-[#FBBF24] text-[#0B3C91] text-[10px] sm:text-xs font-black px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider">
                  {program.badge}
                </span>
                <span className="bg-white/10 text-blue-100 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/20">
                  {program.stream} Stream
                </span>
              </div>
              <h2
                id="course-detail-modal-title"
                className="text-lg sm:text-2xl font-black font-serif text-white tracking-tight leading-snug line-clamp-2"
              >
                {program.name}
              </h2>
              <p className="text-[11px] sm:text-sm text-blue-200 mt-0.5 font-medium line-clamp-2">{program.tagline}</p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-6 sm:py-4 space-y-3 sm:space-y-3.5 min-h-0 custom-scrollbar"
        >
          <DetailSection
            title={
              <>
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B3C91] shrink-0" />
                <span className="text-sm sm:text-base font-bold font-serif text-[#0B3C91] uppercase tracking-wider">
                  Course Overview
                </span>
              </>
            }
          >
            <div className="space-y-2.5 text-slate-700 text-xs sm:text-sm leading-relaxed bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200/80 mt-2">
              {program.overview.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </DetailSection>

          <DetailSection
            title={
              <>
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B3C91] shrink-0" />
                <span className="text-sm sm:text-base font-bold font-serif text-[#0B3C91] uppercase tracking-wider">
                  Course Structure
                </span>
              </>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {program.structure.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 sm:p-3 bg-blue-50/60 rounded-xl border border-blue-100"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-800 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </DetailSection>

          {program.techLearning && (
            <DetailSection
              defaultOpen={false}
              title={
                <>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B3C91] shrink-0" />
                  <span className="text-sm sm:text-base font-bold font-serif text-[#0B3C91] uppercase tracking-wider">
                    Technology-Driven Learning
                  </span>
                </>
              }
            >
              <div className="mt-2 bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-4 sm:p-5 rounded-2xl shadow-lg border border-blue-800 space-y-3">
                <p className="text-[11px] sm:text-xs text-blue-200">
                  Krishna Chaitanya&apos;s Next-Gen Academic Technology Framework
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#FBBF24]">
                      <BrainCircuit className="w-4 h-4" />
                      <h4 className="font-bold text-xs sm:text-sm text-white">AI-Integrated Rank Proven Model</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed">{program.techLearning.aiModel}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#FBBF24]">
                      <Tablet className="w-4 h-4" />
                      <h4 className="font-bold text-xs sm:text-sm text-white">Free Personal Learning Tablet</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed">{program.techLearning.tablet}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#FBBF24]">
                      <Target className="w-4 h-4" />
                      <h4 className="font-bold text-xs sm:text-sm text-white">Complete Objective Exams on Tablet</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed">
                      {program.techLearning.examsOnTablet}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#FBBF24]">
                      <BarChart3 className="w-4 h-4" />
                      <h4 className="font-bold text-xs sm:text-sm text-white">360° Exam Performance Analysis</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed">
                      {program.techLearning.analysis360}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#FBBF24]">
                      <Tv className="w-4 h-4" />
                      <h4 className="font-bold text-xs sm:text-sm text-white">Digital Board Teaching</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed">
                      {program.techLearning.digitalBoard}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#FBBF24]">
                      <Video className="w-4 h-4" />
                      <h4 className="font-bold text-xs sm:text-sm text-white">Recorded Video Lectures</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed">
                      {program.techLearning.videoLectures}
                    </p>
                  </div>
                </div>
              </div>
            </DetailSection>
          )}

          {(program.advantages || program.features) && (
            <DetailSection
              title={
                <>
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B3C91] shrink-0" />
                  <span className="text-sm sm:text-base font-bold font-serif text-[#0B3C91] uppercase tracking-wider">
                    {program.advantages ? 'Elite Program Advantages' : 'Program Features'}
                  </span>
                </>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {(program.advantages || program.features || []).map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200/80"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#0B3C91] mt-1.5 shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </DetailSection>
          )}

          <DetailSection
            title={
              <>
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0" />
                <span className="text-sm sm:text-base font-extrabold uppercase tracking-wider font-serif text-emerald-800">
                  Program Outcome
                </span>
              </>
            }
          >
            <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed bg-emerald-50 border border-emerald-200 p-3 sm:p-4 rounded-xl mt-2">
              {program.outcome}
            </p>
          </DetailSection>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="text-[11px] sm:text-xs text-slate-500 text-center sm:text-left">
            Admissions open for 2026-27 batch across all campuses.
          </p>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition-all cursor-pointer min-h-[44px]"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                handleClose();
                onApplyForProgram(program.name);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider min-h-[44px]"
            >
              <span>Apply Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalMarkup, document.body);
};
