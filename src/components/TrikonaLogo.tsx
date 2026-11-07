import React from 'react';

interface TrikonaLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  useImage?: boolean;
  accentColor?: 'cyan' | 'white' | 'slate';
}

export const TrikonaLogo: React.FC<TrikonaLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  useImage = false,
  accentColor = 'cyan',
}) => {
  const sizeMap = {
    xs: { icon: 'w-5 h-5', text: 'text-sm', img: 'h-6' },
    sm: { icon: 'w-7 h-7', text: 'text-base', img: 'h-8' },
    md: { icon: 'w-9 h-9', text: 'text-lg', img: 'h-10' },
    lg: { icon: 'w-12 h-12', text: 'text-xl', img: 'h-14' },
    xl: { icon: 'w-16 h-16', text: 'text-2xl', img: 'h-20' },
  };

  const strokeColor =
    accentColor === 'cyan'
      ? 'stroke-cyan-400'
      : accentColor === 'white'
      ? 'stroke-white'
      : 'stroke-slate-300';

  const textColor =
    accentColor === 'cyan'
      ? 'text-white'
      : accentColor === 'white'
      ? 'text-white'
      : 'text-slate-200';

  if (useImage) {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <img
          src="/assets/aistudio/image_dedce842.png"
          alt="TRIKONA Hardware Engineering Logo"
          className={`${sizeMap[size].img} w-auto object-contain rounded-md bg-white/5 p-1 border border-cyan-500/20`}
        />
        {showWordmark && (
          <span className={`font-extrabold tracking-wider font-display ${textColor} ${sizeMap[size].text}`}>
            TRIKONA
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Geometric SVG matching the official TRIKONA 3-section triangle mark */}
      <svg
        viewBox="0 0 100 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeMap[size].icon} shrink-0 transition-transform duration-300 hover:scale-105`}
        aria-label="TRIKONA Logo Mark"
      >
        {/* Top Triangle */}
        <polygon
          points="50,6 69,38 31,38"
          className={`${strokeColor} fill-transparent transition-colors`}
          strokeWidth="4.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Bottom Left Trapezoid */}
        <polygon
          points="28,45 46,45 46,78 8,78"
          className={`${strokeColor} fill-transparent transition-colors`}
          strokeWidth="4.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Bottom Right Trapezoid */}
        <polygon
          points="54,45 72,45 92,78 54,78"
          className={`${strokeColor} fill-transparent transition-colors`}
          strokeWidth="4.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      {showWordmark && (
        <span className={`font-extrabold tracking-widest font-display uppercase ${textColor} ${sizeMap[size].text}`}>
          TRIKONA
        </span>
      )}
    </div>
  );
};
