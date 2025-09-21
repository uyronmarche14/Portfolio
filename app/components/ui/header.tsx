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
      <h2 className="text-xl sm:text-2xl md:text-5xl font-bold text-headline leading-tight text-center mb-4"> 
        {introText} 
        <span className="font-rawkner bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> 
          {" "} 
          {highlightText} 
        </span> 
      </h2>
      {description && (
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-4 text-center">
          {description}
        </p>
      )}
    </div>
  )
}

export default Header
