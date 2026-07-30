import React from 'react';

interface UzMonogramProps {
  className?: string;
  theme?: 'light' | 'dark';
  size?: number;
  showSubtitle?: boolean;
}

export const UzMonogram: React.FC<UzMonogramProps> = ({
  className = '',
  theme = 'dark',
  size = 40,
  showSubtitle = false,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 transition-all duration-300 group cursor-pointer ${className}`}
      style={{ width: size, height: showSubtitle ? size * 1.15 : size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain filter transition-all duration-300"
      >
        <defs>
          {/* Main U & Z Ribbon Gradient */}
          <linearGradient id="uzGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Accent Growth Arrow Gradient */}
          <linearGradient id="uzGradAccent" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>

          {/* Background Badge Gradient */}
          <linearGradient id="uzBgDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="uzBgLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>

          {/* Drop Shadows */}
          <filter id="uzGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0284C7" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Outer Rounded Badge Container */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="24"
          fill={theme === 'dark' ? 'url(#uzBgDark)' : 'url(#uzBgLight)'}
          stroke={theme === 'dark' ? '#38BDF8' : '#0284C7'}
          strokeWidth="2.5"
          strokeOpacity={theme === 'dark' ? '0.4' : '0.3'}
          filter="url(#uzGlow)"
        />

        {/* Inner Subtle Ring Frame */}
        <rect
          x="8"
          y="8"
          width="84"
          height="84"
          rx="20"
          fill="none"
          stroke="url(#uzGradPrimary)"
          strokeWidth="1"
          strokeOpacity="0.2"
        />

        {/* Clean, Bold 'U' and 'Z' Monogram Text / Geometry */}
        <text
          x="33"
          y="63"
          fill="url(#uzGradPrimary)"
          fontSize="42"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-1"
          textAnchor="middle"
        >
          U
        </text>

        <text
          x="66"
          y="63"
          fill="url(#uzGradAccent)"
          fontSize="42"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-1"
          textAnchor="middle"
        >
          Z
        </text>

        {/* Optional Subtitle */}
        {showSubtitle && (
          <text
            x="50"
            y="88"
            textAnchor="middle"
            fill={theme === 'dark' ? '#38BDF8' : '#0284C7'}
            fontSize="7"
            fontWeight="800"
            letterSpacing="1.5"
            className="uppercase"
          >
            Performance
          </text>
        )}
      </svg>
    </div>
  );
};



