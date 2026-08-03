import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { NccExploreContent } from './NccExploreContent';

interface NccExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NccExploreModal: React.FC<NccExploreModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (bodyRef.current) bodyRef.current.scrollTop = 0;

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

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
  }, [isOpen, handleClose]);

  useLayoutEffect(() => {
    if (isOpen && bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
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
        aria-labelledby="ncc-explore-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full sm:max-w-3xl lg:max-w-4xl flex flex-col min-h-0 shadow-2xl border border-blue-100 overflow-hidden rounded-t-2xl sm:rounded-3xl max-h-[min(95dvh,calc(100dvh-0.5rem))] sm:max-h-[min(90dvh,calc(100dvh-3rem))]"
      >
        <div className="shrink-0 flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-3.5 border-b border-slate-100 bg-gradient-to-r from-[#0B3C91] to-[#072B6B] text-white">
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs font-extrabold text-[#FBBF24] uppercase tracking-widest">
              Accredited NCC Unit
            </p>
            <h2 id="ncc-explore-modal-title" className="text-base sm:text-lg font-bold font-serif leading-snug">
              Explore NCC at KCJC
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer shrink-0 transition-colors"
            aria-label="Close NCC details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-6 min-h-0"
        >
          <NccExploreContent variant="modal" />
        </div>
      </motion.div>
    </div>,
    document.body
  );
};
