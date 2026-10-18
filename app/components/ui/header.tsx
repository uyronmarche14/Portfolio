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
    <div className={`flex w-full flex-col items-start ${className}`}>
      <h2 className="font-display text-4xl font-semibold leading-tight text-headline md:text-5xl">
        <span className="mb-3 block font-mono text-xs font-medium text-primary">
          {introText}
        </span>
        {highlightText}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}

export default Header
