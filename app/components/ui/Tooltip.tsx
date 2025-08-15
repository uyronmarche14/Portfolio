'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  /**
   * The content to display in the tooltip
   */
  content: React.ReactNode;
  /**
   * The element that triggers the tooltip
   */
  children: React.ReactNode;
  /**
   * Position of the tooltip relative to the trigger
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Delay before showing the tooltip (in milliseconds)
   */
  delay?: number;
  /**
   * Additional CSS classes for the tooltip
   */
  className?: string;
  /**
   * Whether the tooltip is disabled
   */
  disabled?: boolean;
}

/**
 * Tooltip component for displaying contextual information
 * 
 * @example
 * ```tsx
 * <Tooltip content="This is a helpful tooltip" position="top">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * ```
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 500,
  className,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [showTimeout, setShowTimeout] = React.useState<NodeJS.Timeout | null>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (disabled) return;
    
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    setShowTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (showTimeout) {
      clearTimeout(showTimeout);
      setShowTimeout(null);
    }
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {isVisible && !disabled && (
        <div
          ref={tooltipRef}
          className={cn(
            'absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap',
            positionClasses[position],
            className
          )}
          role="tooltip"
        >
          {content}
          
          {/* Arrow */}
          <div
            className={cn(
              'absolute w-0 h-0 border-4',
              arrowClasses[position]
            )}
          />
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

export { Tooltip };