import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, LucideIcon } from 'lucide-react';

export type ThemedSelectOption = {
  value: string;
  label: string;
};

interface ThemedSelectProps {
  id?: string;
  value: string;
  options: ThemedSelectOption[];
  onChange: (value: string) => void;
  icon?: LucideIcon;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: 'md' | 'lg';
}

type MenuCoords = {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
  openUp: boolean;
};

const MENU_GAP = 6;
const MENU_MIN = 160;
const MENU_MAX = 280;
const VIEWPORT_PAD = 10;
const CLOSE_EVENT = 'kcjc-themed-select-close';

export const ThemedSelect: React.FC<ThemedSelectProps> = ({
  id,
  value,
  options,
  onChange,
  icon: Icon,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  size = 'md',
}) => {
  const generatedId = useId();
  const triggerId = id ?? generatedId;
  const listboxId = `${triggerId}-listbox`;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<MenuCoords | null>(null);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.findIndex((option) => option.value === value))
  );

  const selected = options.find((option) => option.value === value);
  const selectedIndex = options.findIndex((option) => option.value === value);

  const setOpenExclusive = useCallback((next: boolean) => {
    if (next) {
      window.dispatchEvent(new CustomEvent(CLOSE_EVENT, { detail: triggerId }));
    }
    setOpen(next);
  }, [triggerId]);

  const updateCoords = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const viewportW = window.innerWidth;
    const spaceBelow = viewportH - rect.bottom - VIEWPORT_PAD;
    const spaceAbove = rect.top - VIEWPORT_PAD;
    const openUp = spaceBelow < MENU_MIN && spaceAbove > spaceBelow;
    const available = Math.max(openUp ? spaceAbove : spaceBelow, 120);
    const maxHeight = Math.min(MENU_MAX, available - MENU_GAP);
    const width = Math.min(rect.width, viewportW - VIEWPORT_PAD * 2);
    const left = Math.min(Math.max(VIEWPORT_PAD, rect.left), viewportW - width - VIEWPORT_PAD);

    setCoords({
      top: openUp ? rect.top - MENU_GAP : rect.bottom + MENU_GAP,
      left,
      width,
      maxHeight,
      openUp,
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updateCoords();
    const selectedIdx = Math.max(0, options.findIndex((option) => option.value === value));
    setActiveIndex(selectedIdx);
    window.requestAnimationFrame(() => {
      menuRef.current?.focus();
    });
  }, [open, options, updateCoords, value]);

  useEffect(() => {
    if (!open) return;

    const onReposition = () => updateCoords();
    window.addEventListener('resize', onReposition);
    window.addEventListener('scroll', onReposition, true);

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };

    const onCloseOthers = (event: Event) => {
      const otherId = (event as CustomEvent<string>).detail;
      if (otherId !== triggerId) setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener(CLOSE_EVENT, onCloseOthers);

    return () => {
      window.removeEventListener('resize', onReposition);
      window.removeEventListener('scroll', onReposition, true);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener(CLOSE_EVENT, onCloseOthers);
    };
  }, [open, triggerId, updateCoords]);

  useEffect(() => {
    if (!open) return;
    optionRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  const commit = (nextValue: string) => {
    onChange(nextValue);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpenExclusive(true);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setOpenExclusive(true);
    }
  };

  const onMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(options.length - 1, index + 1));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(0, index - 1));
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(options.length - 1);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) commit(option.value);
    }
  };

  const heightClass = size === 'lg' ? 'h-12 py-0' : 'py-2.5 sm:py-3';

  return (
    <div className={`relative ${className}`}>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpenExclusive(!open)}
        onKeyDown={onTriggerKeyDown}
        className={`relative w-full ${Icon ? 'pl-10' : 'pl-3.5'} pr-10 ${heightClass} rounded-xl border text-left text-sm font-medium outline-none transition-shadow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          open
            ? 'border-[#0B3C91] ring-2 ring-[#0B3C91]/15 bg-white'
            : 'border-slate-200 bg-slate-50/80 hover:border-[#0B3C91]/40'
        } text-[#0B3C91]`}
      >
        {Icon ? (
          <Icon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        ) : null}
        <span className={`block truncate ${selected ? '' : 'text-slate-400'}`}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#0B3C91] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && coords
        ? createPortal(
            <div
              ref={menuRef}
              id={listboxId}
              role="listbox"
              tabIndex={-1}
              aria-labelledby={triggerId}
              aria-activedescendant={`${listboxId}-option-${activeIndex}`}
              onKeyDown={onMenuKeyDown}
              onClick={(event) => event.stopPropagation()}
              onPointerDown={(event) => event.stopPropagation()}
              style={{
                position: 'fixed',
                left: coords.left,
                width: coords.width,
                maxHeight: coords.maxHeight,
                zIndex: 200,
                overflowY: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                ...(coords.openUp
                  ? { bottom: window.innerHeight - coords.top }
                  : { top: coords.top }),
              }}
              className="no-scrollbar overscroll-contain bg-white border border-[#0B3C91]/15 shadow-2xl p-1 outline-none rounded-xl"
            >
              {options.map((option, index) => {
                const isSelected = option.value === value;
                const isActive = index === activeIndex;

                return (
                  <button
                    key={option.value}
                    ref={(node) => {
                      optionRefs.current[index] = node;
                    }}
                    type="button"
                    role="option"
                    id={`${listboxId}-option-${index}`}
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => commit(option.value)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-semibold cursor-pointer transition-colors rounded-lg ${
                      isSelected
                        ? 'bg-[#0B3C91] text-white'
                        : isActive
                          ? 'bg-[#FFF7ED] text-[#0B3C91]'
                          : 'text-slate-700 hover:bg-[#FFF7ED] hover:text-[#0B3C91]'
                    }`}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected ? <Check className="w-4 h-4 shrink-0 text-[#FBBF24]" /> : null}
                  </button>
                );
              })}
            </div>,
            document.body
          )
        : null}

      {selectedIndex >= 0 ? <span className="sr-only">{options[selectedIndex]?.label}</span> : null}
    </div>
  );
};
