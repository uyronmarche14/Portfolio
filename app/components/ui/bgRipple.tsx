import React from "react";

interface CleanGridBackgroundProps {
  rows?: number;
  cols?: number;
  cellSize?: number;
  opacity?: number;
  borderOpacity?: number;
  className?: string;
}

export const CleanGridBackground: React.FC<CleanGridBackgroundProps> = ({
  rows = 90,
  cols = 100,
  cellSize = 100,
  opacity = 1,
  borderOpacity = 1,
  className = ""
}) => {
  return (
    <div className={`absolute inset-0 h-full max-w-full overflow-hidden pointer-events-none ${className}`}>
      {/* Base background color */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          justifyContent: 'center',
          alignContent: 'center',
          transform: 'translateY(-5%)'
        }}
      >
        {Array.from({ length: rows * cols }, (_, idx) => (
          <div
            key={idx}
            className="border border-solid"
            style={{
              backgroundColor: 'transparent',
              width: cellSize,
              height: cellSize,
              borderColor: `rgb(var(--foreground) / ${borderOpacity})`,
              opacity: `var(--grid-opacity, ${opacity})`
            }}
          />
        ))}
      </div>
      
      {/* Subtle fade effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" 
      />
    </div>
  );
};