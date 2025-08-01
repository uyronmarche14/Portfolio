"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ScreenshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  screenshots: string[];
}

const ScreenshotModal = ({
  isOpen,
  onClose,
  projectTitle,
  screenshots,
}: ScreenshotModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
          break;
        case 'ArrowRight':
          setCurrentIndex((prev) => (prev + 1) % screenshots.length);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, screenshots.length]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  }, [screenshots.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length
    );
  }, [screenshots.length]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-label={`${projectTitle} screenshots`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-background rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 sm:p-4 border-b border-paragraph/10">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold text-headline">
                    {projectTitle} Screenshots
                  </h3>
                  {screenshots.length > 1 && (
                    <p className="text-sm text-paragraph/70 mt-1">
                      {currentIndex + 1} of {screenshots.length}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="text-paragraph hover:text-primary transition-colors p-1"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="relative">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[600px]"
              >
                <Image
                  src={screenshots[currentIndex]}
                  alt={`${projectTitle} screenshot ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  priority
                />
              </motion.div>

              {screenshots.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Previous image"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Next image"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {screenshots.length > 1 && (
                <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center gap-1 sm:gap-2 px-2 flex-wrap">
                  {screenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`min-w-[8px] h-2 rounded-full transition-all ${
                        currentIndex === index 
                          ? "bg-primary w-4" 
                          : "bg-white/50 hover:bg-white/75 w-2"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                      aria-current={currentIndex === index}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScreenshotModal;