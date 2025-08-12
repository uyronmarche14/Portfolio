'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface ScreenshotCarouselProps {
  screenshots: string[];
  alt: string;
}

export default function ScreenshotCarousel({ screenshots, alt }: ScreenshotCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  if (!screenshots || screenshots.length === 0) {
    return (
      <div className="relative aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">No screenshots available</span>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={screenshots[currentIndex]}
              alt={`${alt} - Screenshot ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {screenshots.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/80 text-primary-foreground p-2 rounded-full hover:bg-primary transition-colors duration-200 z-10"
              aria-label="Previous image"
            >
              <IoChevronBack size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/80 text-primary-foreground p-2 rounded-full hover:bg-primary transition-colors duration-200 z-10"
              aria-label="Next image"
            >
              <IoChevronForward size={24} />
            </button>
          </>
        )}

        {/* Image counter */}
        {screenshots.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {screenshots.length}
          </div>
        )}
      </div>

      {/* Thumbnail navigation */}
      {screenshots.length > 1 && (
        <div className="flex gap-2 mt-4 justify-center">
          {screenshots.map((screenshot, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-20 h-12 rounded-md overflow-hidden transition-all duration-200 ${
                index === currentIndex
                  ? 'ring-2 ring-primary scale-110'
                  : 'hover:scale-105 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={screenshot}
                alt={`${alt} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}