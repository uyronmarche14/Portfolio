import React from 'react';
import { cn } from '@/lib/utils';

export type PatternVariant = 'confetti' | 'geometric' | 'waves' | 'crosshairs';

interface BrutalistCornerPatternProps {
  variant?: PatternVariant;
  className?: string;
  color?: string; // e.g., 'text-primary' or 'text-foreground'
}

export const BrutalistCornerPattern: React.FC<BrutalistCornerPatternProps> = ({ 
  variant = 'confetti', 
  className,
  color = 'text-primary'
}) => {
  const baseClasses = cn("absolute opacity-80 pointer-events-none z-10", color, className);

  // Confetti: Abstract burst lines and squares
  if (variant === 'confetti') {
    return (
      <svg 
        className={cn(baseClasses, "w-24 h-24 sm:w-32 sm:h-32")} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M100 0 L75 25" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
        <path d="M90 0 L55 35" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
        <path d="M100 10 L65 45" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="square" />
        <rect x="70" y="15" width="8" height="8" fill="currentColor" transform="rotate(45 74 19)" />
        <rect x="50" y="20" width="6" height="6" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(15 53 23)" />
        <circle cx="85" cy="40" r="3" fill="currentColor" />
        <path d="M100 35 L80 55" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      </svg>
    );
  }

  // Geometric: Solid brutalist shapes (pluses, circles, heavy blocks)
  if (variant === 'geometric') {
    return (
      <svg 
        className={cn(baseClasses, "w-28 h-28 sm:w-40 sm:h-40")} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="80" y="10" width="15" height="15" stroke="currentColor" strokeWidth="3" fill="none" />
        <rect x="65" y="30" width="10" height="10" fill="currentColor" />
        {/* Plus sign */}
        <path d="M90 45 L90 65 M80 55 L100 55" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
        <path d="M50 15 L65 15 M57.5 7.5 L57.5 22.5" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
        <circle cx="50" cy="40" r="4" fill="currentColor" />
        {/* Dotted border line */}
        <path d="M100 0 L60 0 L60 40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="square" />
      </svg>
    );
  }

  // Waves: Heavy zigzag / raw waves
  if (variant === 'waves') {
    return (
      <svg 
        className={cn(baseClasses, "w-24 h-24 sm:w-32 sm:h-32")} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M100 10 L85 25 L70 10 L55 25 L40 10" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" />
        <path d="M100 30 L85 45 L70 30 L55 45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="square" />
        <rect x="80" y="60" width="6" height="6" fill="currentColor" />
        <circle cx="60" cy="65" r="3" fill="currentColor" />
      </svg>
    );
  }

  // Crosshairs: Targeting marks and corners
  if (variant === 'crosshairs') {
    return (
      <svg 
        className={cn(baseClasses, "w-24 h-24 sm:w-32 sm:h-32")} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M80 0 L80 20 M90 10 L70 10" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
        <path d="M50 30 L50 40 M55 35 L45 35" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        <path d="M100 50 L90 50 L90 40" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
        <rect x="65" y="55" width="8" height="8" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  return null;
};
