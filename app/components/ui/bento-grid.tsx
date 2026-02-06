"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid auto-rows-[14rem] sm:auto-rows-[16rem] md:auto-rows-[18rem] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-7xl mx-auto     sm:px-2 lg:px-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-2xl hover:shadow-primary/20 transition duration-200 shadow-input dark:hover:shadow-primary/20 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col relative overflow-hidden",
        "border-border/50 bg-background/40 backdrop-blur-xl shadow-lg", // Glassmorphism overrides
        className
      )}
    >
      {/* Background Header */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        {header}
        {/* Subtle Gradient Scrim for Text Readability */}
        {/* Gradient removed: Provided by header prop for flexibility */}
      </div>

      {/* Content Content - Pushed to bottom or distributed */}
      <div className="relative z-10 flex flex-col justify-between h-full p-4 sm:p-5 md:p-6 transition duration-200 group-hover/bento:translate-x-2">
        <div className="self-start rounded-full bg-background/50 p-1.5 sm:p-2 backdrop-blur-sm border border-border/20">
            {icon}
        </div>
        
        <div className="mt-auto">
            <div className="font-rawkner font-bold text-sm sm:text-base md:text-lg text-foreground mb-1 mt-2">
            {title}
            </div>
            <div className="font-sans font-normal text-muted-foreground text-[10px] sm:text-xs leading-relaxed">
            {description}
            </div>
        </div>
      </div>
    </motion.div>
  );
};
