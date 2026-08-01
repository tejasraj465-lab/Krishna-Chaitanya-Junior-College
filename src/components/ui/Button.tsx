import React from 'react';
import { LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#F97316] hover:bg-[#EA580C] text-white shadow-lg hover:shadow-orange-500/25 border border-transparent',
  secondary:
    'bg-[#0B3C91] hover:bg-[#072B6B] text-white shadow-md hover:shadow-blue-900/20 border border-transparent',
  outline:
    'bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md',
  ghost:
    'bg-slate-100 hover:bg-slate-200 text-[#0B3C91] border border-slate-200',
  whatsapp:
    'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/30 shadow-md',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs min-h-[40px] rounded-xl gap-1.5',
  md: 'px-6 py-3 text-sm min-h-[48px] rounded-xl gap-2',
  lg: 'px-8 py-4 text-sm min-h-[52px] rounded-2xl gap-2',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-bold uppercase tracking-wider
        transition-all duration-200 cursor-pointer
        transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
        disabled:opacity-50 disabled:pointer-events-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
    </button>
  );
};
