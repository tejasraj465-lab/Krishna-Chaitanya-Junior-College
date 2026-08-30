import React from 'react';

interface CuteRobotIconProps {
  className?: string;
  size?: number;
}

/** Compact AI robot mark that fits inside the circular chat button. */
export const CuteRobotIcon: React.FC<CuteRobotIconProps> = ({ className = 'w-8 h-8', size }) => {
  const uid = React.useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
    >
      <rect x="12" y="14" width="40" height="36" rx="14" fill={`url(#${uid}-head)`} />
      <rect x="18" y="22" width="28" height="18" rx="9" fill="#0F172A" />
      <circle cx="27" cy="31" r="3.6" fill="#38BDF8" />
      <circle cx="37" cy="31" r="3.6" fill="#38BDF8" />
      <path d="M29 40c1.6 2 4.4 2 6 0" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="26" y="50" width="12" height="6" rx="3" fill="#93C5FD" />
      <defs>
        <linearGradient id={`${uid}-head`} x1="12" y1="14" x2="52" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E0F2FE" />
        </linearGradient>
      </defs>
    </svg>
  );
};
