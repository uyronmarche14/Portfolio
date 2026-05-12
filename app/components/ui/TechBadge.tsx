"use client";

import { techIconMap } from "@/lib/data/icons";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import * as React from "react";
import { SiReact } from "react-icons/si";

export interface TechBadgeProps {
  /**
   * The technology name to display
   */
  technology: string;
  /**
   * Index for staggered animations
   */
  index?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Size variant
   */
  size?: "sm" | "default" | "lg";
}

/**
 * TechBadge component — Neo-Brutalist style
 */
const TechBadge = React.forwardRef<HTMLDivElement, TechBadgeProps>(
  ({ technology, index = 0, className, size = "default", ...props }, ref) => {
    const IconComponent = techIconMap[technology] || SiReact;

    const sizeClasses = {
      sm: "px-2 py-1 text-[10px]",
      default: "px-3 py-1.5 text-xs",
      lg: "px-4 py-2 text-sm",
    };

    const iconSizes = {
      sm: 10,
      default: 14,
      lg: 18,
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: index * 0.03 }}
        className={cn(
          "inline-flex items-center gap-2 border-2 border-foreground bg-background text-foreground font-mono font-bold uppercase tracking-wider shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-brutal transition-all duration-150",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <IconComponent size={iconSizes[size]} />
        <span>{technology}</span>
      </motion.div>
    );
  }
);

TechBadge.displayName = "TechBadge";

export { TechBadge };
export default TechBadge;
