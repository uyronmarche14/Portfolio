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
 * TechBadge: icon + label pill
 */
const TechBadge = React.forwardRef<HTMLDivElement, TechBadgeProps>(
  ({ technology, index = 0, className, size = "default", ...props }, ref) => {
    const IconComponent = techIconMap[technology] || SiReact;

    const sizeClasses = {
      sm: "px-2 py-1 text-xs",
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
          "inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.04] text-foreground/80 font-mono font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
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
