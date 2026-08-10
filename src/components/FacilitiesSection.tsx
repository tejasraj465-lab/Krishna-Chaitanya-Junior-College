import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Presentation,
  Zap,
  FlaskConical,
  Microscope,
  Laptop,
  BookOpen,
  Home,
  Bus,
  Activity,
  HeartPulse,
  Utensils,
  Eye,
  X,
  CheckCircle,
  Sparkles,
  ChevronRight,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { FACILITIES } from '../data/collegeData';
import { Facility } from '../types';
import { Container, SectionHeader, GlassCard, Button } from './ui';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface FacilitiesSectionProps {
  variant?: 'home' | 'page';
  onViewAll?: () => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Presentation,
  Zap,
  FlaskConical,
  Microscope,
  Laptop,
  BookOpen,
  Home,
  Bus,
  Activity,
  HeartPulse,
  Utensils,
  Eye,
};

const HOME_FACILITIES = FACILITIES.slice(0, 3);

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({
  variant = 'home',
  onViewAll,
}) => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isOpen = selectedFacility !== null;
  useBodyScrollLock(isOpen);

  const handleClose = useCallback(() => {
    setSelectedFacility(null);
  }, []);

  useEffect(() => {
    if (!selectedFacility) return;

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
  }, [selectedFacility, handleClose]);

  const getIcon = (iconName: string) => ICON_MAP[iconName] ?? Sparkles;

  if (variant === 'page') {
    return (
      <section id="facilities" className="py-8 md:py-12 bg-white text-[#1E293B]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-[#0B3C91] bg-[#EFF6FF] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200">
              World-Class Campus Amenities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B3C91] font-serif mt-3">
              Complete Facilities & Infrastructure
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl">
              From digital classrooms and advanced laboratories to secure hostels, transport, medical care, and student support spaces, every facility is designed for focused learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {FACILITIES.map((facility, idx) => {
              const Icon = getIcon(facility.iconName);
              return (
                <motion.div
                  key={facility.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  onClick={() => setSelectedFacility(facility)}
                  className="bg-white rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 group cursor-pointer flex flex-col"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute top-4 left-4 bg-[#0B3C91]/90 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-white/20">
                      {facility.category}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className="p-2.5 bg-blue-50 rounded-xl shrink-0">
                        <Icon className="w-5 h-5 text-[#0B3C91]" aria-hidden="true" />
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-[#0B3C91] font-serif">
                        {facility.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">{facility.description}</p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {facility.features.slice(0, 4).map((feature) => (
                        <span
                          key={feature}
                          className="text-[11px] font-semibold text-[#0B3C91] bg-[#EFF6FF] border border-blue-100 px-2.5 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 mt-auto">
                      <span className="text-[11px] font-bold text-[#F97316] group-hover:underline flex items-center gap-1">
                        View Facility Details →
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {isOpen &&
          selectedFacility &&
          createPortal(
            <FacilityDetailModal
              facility={selectedFacility}
              closeButtonRef={closeButtonRef}
              onClose={handleClose}
              getIcon={getIcon}
            />,
            document.body
          )}
      </section>
    );
  }

  return (
    <>
      <section
        id="facilities"
        className="section-padding-sm max-sm:py-6 bg-gradient-to-b from-[#F8FAFC] via-white to-[#EFF6FF]/40 text-[#1E293B] scroll-mt-[5.5rem] sm:scroll-mt-28 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-mesh-light pointer-events-none" />

        <Container className="relative z-10">
          <SectionHeader
            eyebrow="World-Class Campus Amenities"
            title="Campus Facilities & Infrastructure"
            className="max-sm:mb-4 max-sm:!space-y-1.5 mb-6 sm:mb-8"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 max-w-5xl mx-auto">
            {HOME_FACILITIES.map((facility) => {
              const Icon = getIcon(facility.iconName);
              return (
                <GlassCard
                  key={facility.id}
                  as="button"
                  onClick={() => setSelectedFacility(facility)}
                  className="w-full p-3 sm:p-4 flex items-center gap-3 text-left cursor-pointer group"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl shrink-0 flex items-center justify-center bg-blue-50 text-[#0B3C91] ring-2 ring-[#0B3C91]/10 group-hover:ring-[#F97316]/40 transition-all">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-[#F97316] leading-tight">
                      {facility.category}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#0B3C91] font-serif leading-snug mt-0.5 line-clamp-2">
                      {facility.title}
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

          {onViewAll && (
            <div className="flex justify-center mt-5 sm:mt-6">
              <Button variant="secondary" size="md" onClick={onViewAll}>
                Explore All Facilities
                <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Button>
            </div>
          )}
        </Container>
      </section>

      {isOpen &&
        selectedFacility &&
        createPortal(
          <FacilityDetailModal
            facility={selectedFacility}
            closeButtonRef={closeButtonRef}
            onClose={handleClose}
            getIcon={getIcon}
          />,
          document.body
        )}
    </>
  );
};

interface FacilityDetailModalProps {
  facility: Facility;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  getIcon: (iconName: string) => LucideIcon;
}

const FacilityDetailModal: React.FC<FacilityDetailModalProps> = ({
  facility,
  closeButtonRef,
  onClose,
  getIcon,
}) => {
  const Icon = getIcon(facility.iconName);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-hidden overscroll-none"
        onClick={onClose}
        role="presentation"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="facility-detail-title"
          onClick={(e) => e.stopPropagation()}
          className="glass-card rounded-3xl max-w-xl w-full overflow-hidden relative shadow-2xl max-h-[min(92dvh,calc(100dvh-2rem))] overflow-y-auto"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer"
            aria-label="Close facility details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative h-44 sm:h-56">
            <img
              src={facility.image}
              alt={facility.title}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C91] via-[#0B3C91]/40 to-transparent" />
            <div className="absolute bottom-4 left-5 right-12 text-white">
              <span className="bg-[#FBBF24] text-[#0B3C91] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full mb-1 inline-block">
                {facility.category}
              </span>
              <h3 id="facility-detail-title" className="text-lg sm:text-xl font-bold font-serif text-white flex items-center gap-2">
                <Icon className="w-5 h-5 text-[#FBBF24] shrink-0" aria-hidden="true" />
                {facility.title}
              </h3>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{facility.description}</p>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B3C91] mb-2">
                Key Highlights & Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {facility.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 p-2 bg-blue-50 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="secondary" size="md" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
