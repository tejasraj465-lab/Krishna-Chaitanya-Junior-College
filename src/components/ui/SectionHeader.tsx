import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  icon: Icon,
  align = 'center',
  className = '',
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl space-y-3 mb-10 sm:mb-12 ${alignClass} ${className}`}>
      <span className="inline-flex items-center gap-2 text-[#0B3C91] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full text-eyebrow border border-blue-200/80 shadow-sm">
        {Icon && <Icon className="w-3.5 h-3.5 text-[#F97316]" aria-hidden="true" />}
        {eyebrow}
      </span>
      <h2 className="text-section-title text-[#0B3C91]">
        {title}
      </h2>
      {description && (
        <p className="text-body sm:text-base text-slate-600 font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
