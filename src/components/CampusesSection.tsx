import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Building2, ChevronRight, Home, MapPin, X, type LucideIcon } from 'lucide-react';
import { CAMPUSES_SECTION, CampusBrowseCategory } from '../data/campusesSectionData';
import { CAMPUSES } from '../data/collegeData';
import { Container, SectionHeader, GlassCard, Button } from './ui';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Building2,
  Home,
};

interface CampusesSectionProps {
  onOpenApplyModal?: (course?: string, campusName?: string) => void;
  onViewAllCampuses: () => void;
  onNavigateToCampus: (campusSlug: string) => void;
  onBrowseByCategory?: (category: CampusBrowseCategory) => void;
}

type CategoryCard = (typeof CAMPUSES_SECTION.categories)[number];

export const CampusesSection: React.FC<CampusesSectionProps> = ({
  onViewAllCampuses,
  onBrowseByCategory,
}) => {
  const data = CAMPUSES_SECTION;
  const [selectedCategory, setSelectedCategory] = useState<CategoryCard | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isOpen = selectedCategory !== null;
  useBodyScrollLock(isOpen);

  const handleClose = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

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
  }, [selectedCategory, handleClose]);

  const categoryCampuses = selectedCategory
    ? CAMPUSES.filter((campus) => campus.category === selectedCategory.category)
    : [];

  return (
    <>
      <section
        id="campuses"
        className="section-padding-sm max-sm:py-6 bg-gradient-to-b from-[#F8FAFC] via-white to-[#EFF6FF]/40 text-[#1E293B] scroll-mt-[5.5rem] sm:scroll-mt-28 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-mesh-light pointer-events-none" />

        <Container className="relative z-10">
          <SectionHeader
            eyebrow={data.eyebrow}
            title={data.title}
            className="max-sm:mb-4 max-sm:!space-y-1.5 mb-6 sm:mb-8"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 max-w-3xl mx-auto">
            {data.categories.map((item) => {
              const Icon = CATEGORY_ICONS[item.icon] ?? Building2;
              return (
                <GlassCard
                  key={item.id}
                  as="button"
                  onClick={() => setSelectedCategory(item)}
                  className="w-full p-3 sm:p-4 flex items-center gap-3 text-left cursor-pointer group"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0B3C91] to-[#072B6B] text-white ring-2 ring-[#0B3C91]/10 group-hover:ring-[#F97316]/40 transition-all">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#FBBF24]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-[#F97316] leading-tight">
                      {item.count} Campuses
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#0B3C91] font-serif leading-snug mt-0.5 line-clamp-2">
                      {item.label}
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

          <div className="flex justify-center mt-5 sm:mt-6">
            <Button variant="secondary" size="md" onClick={onViewAllCampuses}>
              Explore All Campuses
              <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      {isOpen &&
        selectedCategory &&
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
                aria-labelledby="campus-category-title"
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
                    const Icon = CATEGORY_ICONS[selectedCategory.icon] ?? Building2;
                    return (
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0B3C91] to-[#072B6B] text-white">
                          <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-[#FBBF24]" aria-hidden="true" />
                        </div>
                        <div className="space-y-1.5 min-w-0">
                          <p className="text-[11px] text-[#F97316] font-bold uppercase tracking-wider">
                            {selectedCategory.count} Campuses
                          </p>
                          <h3
                            id="campus-category-title"
                            className="text-xl sm:text-2xl font-extrabold font-serif text-[#0B3C91] leading-snug"
                          >
                            {selectedCategory.label}
                          </h3>
                        </div>
                      </div>
                    );
                  })()}

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedCategory.description}
                  </p>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Campuses in this category
                    </p>
                    <ul className="space-y-1.5">
                      {categoryCampuses.map((campus) => (
                        <li
                          key={campus.id}
                          className="text-sm text-slate-700 flex items-start gap-2 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="font-medium text-[#0B3C91]">{campus.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    {onBrowseByCategory && (
                      <Button
                        variant="secondary"
                        size="md"
                        className="sm:flex-1"
                        onClick={() => {
                          handleClose();
                          onBrowseByCategory(selectedCategory.category);
                        }}
                      >
                        View {selectedCategory.label}
                        <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                      </Button>
                    )}
                    <Button variant="ghost" size="md" className="sm:flex-1" onClick={handleClose}>
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
