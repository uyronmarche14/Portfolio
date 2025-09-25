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
      <div className="relative aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">No screenshots available</span>
      </div>
    );
  }

  const handleImageClick = (screenshot: string, index: number) => {
    setSelectedImage(screenshot);
    onImageClick?.(screenshot, index);
  };

  // Determine layout based on number of screenshots
  const getGridLayout = () => {
    if (screenshots.length === 1) return 'grid-cols-1 max-w-3xl mx-auto';
    if (screenshots.length === 2) return 'grid-cols-2';
    if (screenshots.length === 3) return 'grid-cols-3';
    return 'grid-cols-2 md:grid-cols-4'; // 4 or more images - responsive grid
  };

  const visibleImages = screenshots.length === 3 ? screenshots : screenshots.slice(0, screenshots.length)

  return (
    <div className="w-full">
      {/* Responsive grid layout */}
      <div className={`grid ${getGridLayout()} gap-4`}>
        {visibleImages.map((screenshot, index) => (
          <div 
            key={index}
            className="relative aspect-video rounded-lg overflow-hidden bg-muted cursor-pointer group hover:scale-105 transition-transform duration-200"
            onClick={() => handleImageClick(screenshot, index)}
          >
            <Image
              src={screenshot}
              alt={`${alt} - Screenshot ${index + 1}`}
              fill
              className="object-cover"
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-medium">Click to view</span>
            </div>
          </div>
        ))}
      </div>

      {/* Show more button if there are more than 4 images */}
   
    </div>
  );
}