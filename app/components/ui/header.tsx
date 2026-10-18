import React from 'react'

interface HeaderProps {
  introText?: string;
  highlightText?: string;
  className?: string;
  description?: string;
  index?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  introText = "Hey there i am", 
  highlightText = "Ron Marche Rhyss Q. Uy",
  className = "",
  description,
  index
}) => {
  return (
    <div className={`flex w-full flex-col items-center text-center ${className}`}>
      <h2 className="font-display text-4xl font-semibold leading-tight text-headline md:text-5xl">
        <span className="mb-4 block font-mono text-xs font-medium text-primary">
          {index ? `${index} / ${introText}` : introText}
        </span>
        {highlightText}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}

export default Header
