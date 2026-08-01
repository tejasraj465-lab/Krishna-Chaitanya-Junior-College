import React from 'react';

interface CuteRobotIconProps {
  className?: string;
  size?: number;
}

export const CuteRobotIcon: React.FC<CuteRobotIconProps> = ({ className = "w-8 h-8", size }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
    >
      {/* Antenna Pole */}
      <rect x="30" y="5" width="4" height="10" rx="2" fill="#FBBF24" />
      {/* Antenna Light Bulb */}
      <circle cx="32" cy="5" r="4.5" fill="#F59E0B" className="animate-pulse" />
      <circle cx="32" cy="5" r="2" fill="#FEF08A" />

      {/* Ears / Side Bolts */}
      <rect x="7" y="25" width="6" height="12" rx="3" fill="#3B82F6" />
      <rect x="51" y="25" width="6" height="12" rx="3" fill="#3B82F6" />

      {/* Main Robot Head */}
      <rect x="11" y="15" width="42" height="34" rx="14" fill="url(#bot-head-grad)" stroke="#3B82F6" strokeWidth="2" />

      {/* Screen / Visor Area */}
      <rect x="17" y="21" width="30" height="22" rx="9" fill="#0F172A" />

      {/* Cute Eyes - Left Eye */}
      <circle cx="25" cy="29" r="4.5" fill="#38BDF8" />
      <circle cx="23.5" cy="27.5" r="1.5" fill="#FFFFFF" />

      {/* Cute Eyes - Right Eye */}
      <circle cx="39" cy="29" r="4.5" fill="#38BDF8" />
      <circle cx="37.5" cy="27.5" r="1.5" fill="#FFFFFF" />

      {/* Cute Rosy Cheeks */}
      <circle cx="20" cy="36" r="2.5" fill="#FB7185" opacity="0.8" />
      <circle cx="44" cy="36" r="2.5" fill="#FB7185" opacity="0.8" />

      {/* Happy Smile Mouth */}
      <path
        d="M28 35.5C28 35.5 30 38.5 32 38.5C34 38.5 36 35.5 36 35.5"
        stroke="#38BDF8"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Body Neck Base */}
      <path d="M26 49H38V54C38 55.1 37.1 56 36 56H28C26.9 56 26 55.1 26 54V49Z" fill="#1D4ED8" />

      <defs>
        <linearGradient id="bot-head-grad" x1="11" y1="15" x2="53" y2="49" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
