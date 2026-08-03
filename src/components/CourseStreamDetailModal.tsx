import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { CheckCircle, ChevronDown, X } from 'lucide-react';
import { Course } from '../types';
import { CourseStreamDetail } from '../data/courseStreamDetails';

interface CourseStreamDetailModalProps {
  course: Course;
  detail: CourseStreamDetail | undefined;
  onClose: () => void;
  onApply: (courseCode: string) => void;
  renderIcon: (iconName: string) => React.ReactNode;
}

interface DetailSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const DetailSection: React.FC<DetailSectionProps> = ({ title, defaultOpen = true, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-slate-100 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 text-left cursor-pointer hover:bg-slate-50/80 transition-colors"
        aria-expanded={open}
      >
        <span className="text-xs sm:text-sm font-bold text-[#0B3C91] uppercase tracking-wide">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-0 border-t border-slate-100">{children}</div>}
    </div>
  );
};

export const CourseStreamDetailModal: React.FC<CourseStreamDetailModalProps> = ({
  course,
  detail,
  onClose,
  onApply,
  renderIcon,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const whyChooseTitle =
    course.code === 'Long Term' ? 'Why Choose KCJC Long Term?' : `Why Choose KCJC ${course.code}?`;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
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
  }, [course.id, handleClose]);

  useLayoutEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [course.id]);

  const modalMarkup = (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center overflow-hidden overscroll-none bg-black/60 backdrop-blur-sm p-0 sm:p-4 sm:py-6"
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
        aria-labelledby="course-stream-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full sm:max-w-2xl flex flex-col min-h-0 shadow-2xl border border-blue-100 overflow-hidden rounded-t-2xl sm:rounded-3xl max-h-[min(90dvh,calc(100dvh-1rem))] sm:max-h-[min(85dvh,calc(100dvh-3rem))] lg:max-h-[min(80dvh,calc(100dvh-3rem))]"
      >
        {/* Sticky header */}
        <div className="shrink-0 flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 border-b border-slate-100 bg-white">
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0"
            style={{ backgroundColor: course.color }}
          >
            {renderIcon(course.iconName)}
          </div>
          <div className="min-w-0 flex-1">
            <h3
              id="course-stream-modal-title"
              className="text-base sm:text-lg font-bold font-serif text-[#0B3C91] leading-snug line-clamp-2"
            >
              {detail?.title ?? course.title}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{course.duration}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer shrink-0 transition-colors"
            aria-label="Close program details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body only */}
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-5 sm:py-4 space-y-3 sm:space-y-3.5 min-h-0"
        >
          {detail ? (
            <>
              <DetailSection title="Overview" defaultOpen>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">{detail.bestFor}</p>
              </DetailSection>

              {detail.availablePrograms && detail.availablePrograms.length > 0 && (
                <DetailSection title="Available Programs" defaultOpen={false}>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {detail.availablePrograms.map((program) => (
                      <span
                        key={program}
                        className="inline-flex px-2.5 py-1.5 rounded-lg bg-[#EFF6FF] border border-blue-100 text-[11px] sm:text-xs font-semibold text-[#0B3C91]"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </DetailSection>
              )}

              {detail.careerPathways.length > 0 && (
                <DetailSection title="Career Pathways" defaultOpen={false}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {detail.careerPathways.map((pathway) => (
                      <div
                        key={pathway}
                        className="flex items-start gap-2 p-2 sm:p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] sm:text-xs text-slate-700 leading-snug"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pathway}</span>
                      </div>
                    ))}
                  </div>
                </DetailSection>
              )}

              <DetailSection title={whyChooseTitle} defaultOpen={false}>
                <ul className="space-y-1.5 pt-2">
                  {detail.whyChoose.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[11px] sm:text-sm text-slate-700 leading-relaxed"
                    >
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>

              {detail.subjects.length > 0 && (
                <DetailSection title="Subjects" defaultOpen>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                    {detail.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="inline-flex px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-[11px] sm:text-xs font-semibold text-[#0B3C91]"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </DetailSection>
              )}

              <DetailSection title="Eligibility" defaultOpen>
                <p className="text-[11px] sm:text-sm text-slate-700 leading-relaxed pt-2">{detail.eligibility}</p>
              </DetailSection>
            </>
          ) : (
            <p className="text-sm text-slate-600">Program details are not available for this stream.</p>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-4 py-3 sm:px-5 sm:py-3.5 border-t border-slate-100 bg-white flex justify-end">
          <button
            type="button"
            onClick={() => onApply(course.code)}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md cursor-pointer min-h-[44px]"
          >
            Apply for This Program
          </button>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalMarkup, document.body);
};
