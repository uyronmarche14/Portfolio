"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ 
  as: Component = "h2", 
  className, 
  children, 
  ...props 
}) => {
  const baseStyles = "font-rawkner font-bold text-headline leading-tight uppercase";
  
  const sizeStyles = {
    h1: "text-4xl sm:text-5xl md:text-6xl",
    h2: "text-3xl sm:text-4xl md:text-5xl",
    h3: "text-2xl sm:text-3xl md:text-4xl",
    h4: "text-xl sm:text-2xl md:text-3xl",
    h5: "text-lg sm:text-xl md:text-2xl",
    h6: "text-base sm:text-lg md:text-xl",
  };

  return (
    <Component 
      className={cn(baseStyles, sizeStyles[Component], className)} 
      {...props}
    >
      {children}
    </Component>
  );
};

export default Heading;
