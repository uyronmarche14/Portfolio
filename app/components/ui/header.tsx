import React from 'react'

interface HeaderProps {
  introText?: string;
  highlightText?: string;
  className?: string;
  description?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  introText = "Hey there i am", 
  highlightText = "Ron Marche Rhyss Q. Uy",
  className = "",
  description
}) => {
  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Decorative line */}
      <div className="w-16 h-1 bg-primary mb-6" />
      
      <h2 className="text-xl sm:text-2xl md:text-5xl font-bold text-headline leading-tight text-center mb-4"> 
        <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-secondary block mb-2">
          {introText}
        </span>
        <span className="font-rawkner text-primary"> 
          {highlightText} 
        </span> 
      </h2>
      {description && (
        <p className="text-foreground/70 mx-auto max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-4 text-center font-medium">
          {description}
        </p>
      )}
    </div>
  )
}

export default Header
