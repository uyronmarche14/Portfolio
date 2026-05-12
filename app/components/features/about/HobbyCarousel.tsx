"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hobbiesData } from "@/lib/data/hobbies";
import HeaderTitle from "@/components/ui/header";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HobbyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % hobbiesData.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + hobbiesData.length) % hobbiesData.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const activeHobby = useMemo(() => hobbiesData[activeIndex], [activeIndex]);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center py-16 sm:py-24 overflow-hidden transition-colors duration-700">
      
      {/* === Section Background === */}
      {/* Color fallback when no image */}
      <AnimatePresence>
        {!activeHobby.image && (
          <motion.div 
            key="bg-color-fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0 pointer-events-none bg-foreground/5"
          />
        )}
      </AnimatePresence>
      {/* Blurred image background when image exists */}
      <AnimatePresence mode="wait">
        {activeHobby.image && (
          <motion.div
            key={activeHobby.id + "-bg"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none blur-2xl scale-110"
            style={{ backgroundImage: `url(${activeHobby.image})` }}
          />
        )}
      </AnimatePresence>
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 z-0 bg-background/60 pointer-events-none" />

      {/* === Section Header === */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 mb-8 md:mb-12">
        <HeaderTitle 
          introText="Off Screen"
          highlightText="Activities"
          description="A visual look at the activities, leadership roles, competitions, event work, and campus experiences that shaped me outside the core project list."
        />
      </div>

      {/* === Carousel Area === */}
      <div className="relative z-10 w-full flex flex-col h-full">
        <div className="relative w-full h-[50vh] sm:h-[60vh] flex items-center justify-center perspective-[1000px]">
          
          {/* Nav Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 md:left-6 z-50 p-3 bg-background border-2 border-foreground shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all hidden md:flex items-center justify-center"
            aria-label="Previous hobby"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-2 md:right-6 z-50 p-3 bg-background border-2 border-foreground shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all hidden md:flex items-center justify-center"
            aria-label="Next hobby"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Container with edge fade */}
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', 
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' 
            }}
          >
            <AnimatePresence initial={false}>
              {hobbiesData.map((hobby, index) => {
                const diff = index - activeIndex;
                
                // Handle wrap-around
                let adjustedDiff = diff;
                if (diff > hobbiesData.length / 2) adjustedDiff -= hobbiesData.length;
                if (diff < -hobbiesData.length / 2) adjustedDiff += hobbiesData.length;

                const isVisible = Math.abs(adjustedDiff) <= 2;
                if (!isVisible) return null;

                const isActive = adjustedDiff === 0;
                const Icon = hobby.icon;

                const xPos = adjustedDiff * 90;
                const scale = isActive ? 1 : 0.85;
                const zIndex = 10 - Math.abs(adjustedDiff);
                const opacity = isActive ? 1 : Math.abs(adjustedDiff) === 1 ? 0.5 : 0;

                const hasImage = !!hobby.image;

                return (
                  <motion.div
                    key={hobby.id}
                    onClick={() => setActiveIndex(index)}
                    initial={{ opacity: 0, x: adjustedDiff > 0 ? "100%" : "-100%" }}
                    animate={{ 
                      opacity, 
                      x: `${xPos}%`, 
                      scale, 
                      zIndex 
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30,
                      mass: 0.8
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);
                      if (swipe < -swipeConfidenceThreshold) {
                        handleNext();
                      } else if (swipe > swipeConfidenceThreshold) {
                        handlePrev();
                      }
                    }}
                    className={`
                      absolute w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-6xl h-full 
                      overflow-hidden cursor-pointer border-2 bg-background group
                      transition-all duration-300
                      ${isActive 
                        ? 'border-foreground shadow-brutal-xl' 
                        : 'border-foreground/30 shadow-none opacity-60'
                      }
                    `}
                  >
                    {/* === Card Background Layer === */}
                    {hasImage ? (
                      <>
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url(${hobby.image})` }} 
                        />
                        {/* Bottom gradient for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />
                      </>
                    ) : (
                      <div 
                        className={`absolute inset-0 transition-opacity duration-700 ${isActive ? hobby.colorClass : 'opacity-0'}`}
                      />
                    )}

                    {/* === Card Inner Layout === */}
                    <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col h-full pointer-events-none">
                      
                      {/* Top Row: Icon Box + Index Number */}
                      <div className="flex items-start justify-between mb-auto">
                        {/* Brutalist Icon Box */}
                        <div className={`
                          flex items-center justify-center border-2 p-3 sm:p-4
                          transition-all duration-500
                          ${hasImage 
                            ? 'border-white/80 bg-black/40 backdrop-blur-sm' 
                            : 'border-foreground bg-primary/10 shadow-brutal-sm'
                          }
                          ${isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-50'}
                        `}>
                          <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${hasImage ? 'text-white' : 'text-foreground'}`} />
                        </div>

                        {/* Card Number */}
                        <span className={`
                          font-mono text-xs sm:text-sm font-bold uppercase tracking-widest
                          transition-all duration-500
                          ${hasImage ? 'text-white/40' : 'text-foreground/20'}
                          ${isActive ? 'opacity-100' : 'opacity-0'}
                        `}>
                          {String(index + 1).padStart(2, '0')}/{String(hobbiesData.length).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Bottom Content: Title + Description + Tags + Meta */}
                      <div className={`
                        mt-auto flex flex-col gap-4
                        transition-all duration-500 transform
                        ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                      `}>
                        {/* Title */}
                        <div className={`font-rawkner font-bold uppercase tracking-wide text-3xl sm:text-4xl md:text-5xl leading-tight ${hasImage ? 'text-white' : 'text-foreground'}`}>
                          {hobby.title}
                        </div>

                        {/* Description */}
                        <div className={`font-sans font-normal text-sm sm:text-base leading-relaxed max-w-xl ${hasImage ? 'text-white/80' : 'text-foreground/60'}`}>
                          {hobby.description}
                        </div>

                        {/* Tags */}
                        {hobby.tags && hobby.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {hobby.tags.map(tag => (
                              <span 
                                key={tag} 
                                className={`
                                  px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border
                                  ${hasImage 
                                    ? 'border-white/30 text-white/90 bg-white/10 backdrop-blur-sm' 
                                    : 'border-primary/30 text-primary bg-primary/10'
                                  }
                                `}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Separator + Meta Row */}
                        {(hobby.years || hobby.quote) && (
                          <div className={`pt-3 border-t-2 ${hasImage ? 'border-white/20' : 'border-foreground/20'}`}>
                            <div className="flex items-center justify-between gap-4">
                              {hobby.years && (
                                <div className="flex items-center gap-2">
                                  <span className={`w-2 h-2 ${hasImage ? 'bg-white' : 'bg-primary'}`} />
                                  <span className={`font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider ${hasImage ? 'text-white/90' : 'text-foreground'}`}>
                                    {hobby.years}
                                  </span>
                                </div>
                              )}
                              {hobby.quote && (
                                <p className={`text-[10px] sm:text-xs italic truncate ${hasImage ? 'text-white/50' : 'text-foreground/50'}`}>
                                  &quot;{hobby.quote}&quot;
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* External Links */}
                        {hobby.links && hobby.links.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2 pt-2 pointer-events-auto">
                            {hobby.links.map((link) => {
                              const LinkIcon = link.icon;
                              return (
                                <a
                                  key={link.label}
                                  href={link.url}
                                  target={link.url.startsWith('#') ? '_self' : '_blank'}
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className={`
                                    inline-flex items-center gap-2 px-3 py-1.5 border-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider
                                    transition-all duration-200 hover:translate-x-[-1px] hover:translate-y-[-1px]
                                    ${hasImage 
                                      ? 'border-white/50 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white hover:shadow-[3px_3px_0px_rgba(255,255,255,0.3)]' 
                                      : 'border-foreground text-foreground bg-background hover:shadow-brutal-sm'
                                    }
                                  `}
                                  aria-label={`Visit ${link.label}`}
                                >
                                  {LinkIcon && <LinkIcon className="w-3.5 h-3.5" />}
                                  {link.label}
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* === Indicators === */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-2 sm:gap-3 px-4 relative z-10">
          {hobbiesData.map((hobby, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={`indicator-${hobby.id}`}
                onClick={() => setActiveIndex(index)}
                className={`
                  relative h-2 sm:h-3 transition-all duration-300 ease-out border-2 border-foreground
                  ${isActive ? 'w-16 sm:w-24 bg-primary shadow-brutal-sm' : 'w-6 sm:w-8 bg-foreground/20 hover:bg-foreground/40'}
                `}
                aria-label={`Select ${hobby.title}`}
                title={hobby.title}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
