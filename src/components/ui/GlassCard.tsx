import React from 'react';

type GlassVariant = 'light' | 'dark' | 'subtle';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: GlassVariant;
  hover?: boolean;
  as?: 'div' | 'article' | 'button';
  onClick?: () => void;
}

const variantClasses: Record<GlassVariant, string> = {
  light: 'glass-card rounded-2xl',
  dark: 'glass-card-dark rounded-2xl text-white',
  subtle: 'bg-white/60 backdrop-blur-sm border border-slate-200/70 rounded-2xl shadow-sm',
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'light',
  hover = true,
  as: Tag = 'div',
  onClick,
}) => {
  return (
    <Tag
      onClick={onClick}
      className={`${variantClasses[variant]} ${hover ? 'hover-lift' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
};
