"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
  children: React.ReactNode;
  variant?: "default" | "muted" | "small" | "large";
}

const Text: React.FC<TextProps> = ({ 
  as: Component = "p", 
  className, 
  children, 
  variant = "default",
  ...props 
}) => {
  const variants = {
    default: "text-base sm:text-lg leading-relaxed text-paragraph",
    muted: "text-sm sm:text-base text-muted-foreground leading-relaxed",
    small: "text-xs sm:text-sm text-paragraph",
    large: "text-lg sm:text-xl md:text-2xl text-paragraph leading-relaxed",
  };

  return (
    <Component 
      className={cn(variants[variant], className)} 
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;
