'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ScreenshotCarouselProps {
  screenshots: string[];
  alt: string;
}

export default function ScreenshotCarousel({ screenshots, alt, onImageClick }: ScreenshotCarouselProps & { onImageClick?: (imageUrl: string, index: number) => void }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!screenshots || screenshots.length === 0) {
    return (
      <div className="relative aspect-video w-full bg-foreground/5 border-2 border-foreground flex items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-wider text-foreground/40">No screenshots available</span>
      </div>
    );
  }

  const handleImageClick = (screenshot: string, index: number) => {
    setSelectedImage(screenshot);
    onImageClick?.(screenshot, index);
  };

  const getGridLayout = () => {
    if (screenshots.length === 1) return 'grid-cols-1 max-w-3xl mx-auto';
    if (screenshots.length === 2) return 'grid-cols-2';
    if (screenshots.length === 3) return 'grid-cols-3';
    return 'grid-cols-2 md:grid-cols-4';
  };

  const visibleImages = screenshots.length === 3 ? screenshots : screenshots.slice(0, screenshots.length)

  return (
    <div className="w-full">
      <div className={`grid ${getGridLayout()} gap-4`}>
        {visibleImages.map((screenshot, index) => (
          <div 
            key={index}
            className="relative aspect-video overflow-hidden bg-foreground/5 cursor-pointer group border-2 border-foreground shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal transition-all duration-150"
            onClick={() => handleImageClick(screenshot, index)}
          >
            <Image
              src={screenshot}
              alt={`${alt} - Screenshot ${index + 1}`}
              fill
              className="object-cover"
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
              <span className="text-white font-mono text-xs font-bold uppercase tracking-wider">Click to view</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}