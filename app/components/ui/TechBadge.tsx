"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiReact,
  SiPrisma,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiNodedotjs,
  SiJavascript,
  SiGooglemaps,
  SiStripe,
  SiRedux,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

const techIconMap: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  TailwindCSS: SiTailwindcss,
  React: SiReact,
  Prisma: SiPrisma,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Firebase: SiFirebase,
  "Node.js": SiNodedotjs,
  JavaScript: SiJavascript,
  "Google Maps API": SiGooglemaps,
  "Stripe API": SiStripe,
  Redux: SiRedux,
  "C#": SiReact,
  Java: SiReact,
  "Android Studio": SiReact,
  WinForms: SiReact,
  "OpenAI API": SiReact,
};

export interface TechBadgeProps {
  /**
   * The technology name to display
   */
  technology: string;
  /**
   * Index for staggered animations and color variation
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
 * TechBadge component for displaying technology badges with icons
 *
 * @example
 * ```tsx
 * <TechBadge technology="React" index={0} size="default" />
 * ```
 */
const TechBadge = React.forwardRef<HTMLDivElement, TechBadgeProps>(
  ({ technology, index = 0, className, size = "default", ...props }, ref) => {
    const IconComponent = techIconMap[technology] || SiReact;

    const colors = [
      "bg-primary/10 text-primary border-primary/20",
      "bg-secondary/10 text-secondary border-secondary/20",
      "bg-accent/10 text-accent border-accent/20",
      "bg-primary/20 text-primary-foreground border-primary/30",
      "bg-secondary/20 text-secondary-foreground border-secondary/30",
      "bg-accent/20 text-accent-foreground border-accent/30",
      "bg-primary/30 text-primary-foreground border-primary/40",
      "bg-secondary/30 text-secondary-foreground border-secondary/40",
    ];

    const sizeClasses = {
      sm: "px-2 py-1 text-xs",
      default: "px-3 py-1.5 text-sm",
      lg: "px-4 py-2 text-base",
    };

    const iconSizes = {
      sm: 12,
      default: 16,
      lg: 20,
    };

    const colorClass = colors[index % colors.length];

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border font-medium",
          sizeClasses[size],
          colorClass,
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
