import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KCJC_ADVANTAGE_PAGE } from '../data/whyChooseAdvantageData';

export const KcjcAdvantageSectionNav: React.FC = () => {
  const [activeId, setActiveId] = useState(KCJC_ADVANTAGE_PAGE.pageSections[0].id);
  const isScrollingRef = useRef(false);
  const scrollTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const sectionIds = KCJC_ADVANTAGE_PAGE.pageSections.map((s) => `kcjc-${s.id}`);

    const updateActiveSection = () => {
      if (isScrollingRef.current) return;

      const offset = 140;
      let current = sectionIds[0]?.replace('kcjc-', '') ?? 'overview';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) {
          current = id.replace('kcjc-', '');
        }
      }

      setActiveId(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(`kcjc-${id}`);
    if (!el) return;

    isScrollingRef.current = true;
    setActiveId(id);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = window.setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  }, []);

  useEffect(
    () => () => {
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    },
    []
  );

  return (
    <nav aria-label="Why KCJC sections" className="sticky top-24 sm:top-[5.5rem] z-40 mb-6 sm:mb-8">
      <div className="rounded-xl border border-blue-100 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="flex gap-1 overflow-x-auto p-1.5 snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {KCJC_ADVANTAGE_PAGE.pageSections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollTo(section.id)}
                className={`snap-start shrink-0 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  isActive ? 'bg-[#0B3C91] text-white' : 'text-[#0B3C91] hover:bg-blue-50'
                }`}
                aria-current={isActive ? 'true' : undefined}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
