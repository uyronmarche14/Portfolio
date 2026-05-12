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
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full mx-auto px-4 sm:px-6 lg:px-4",
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
      whileHover={{ x: -2, y: -2 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "group/bento transition-all duration-150 flex flex-col relative overflow-hidden",
        "border-2 border-foreground bg-background shadow-brutal hover:shadow-brutal-lg",
        className
      )}
    >
      {/* Image Block */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 border-b-2 border-foreground overflow-hidden bg-foreground/5">
        {header}
      </div>

      {/* Content Block */}
      <div className="relative z-10 flex flex-col flex-1 p-5 sm:p-6 justify-between bg-background">
        <div className="self-start border-2 border-foreground bg-primary/10 p-2 mb-4">
            {icon}
        </div>
        
        <div className="mt-auto">
            <div className="font-rawkner font-bold text-xl sm:text-2xl text-foreground mb-2 uppercase tracking-wide">
              {title}
            </div>
            <div className="font-sans font-normal text-foreground/70 text-xs sm:text-sm leading-relaxed">
              {description}
            </div>
        </div>
      </div>
    </motion.div>
  );
};
