"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  /**
   * Fallback image URL if the main image fails to load
   */
  fallbackSrc?: string;
  /**
   * Whether to show a skeleton while loading
   */
  showSkeleton?: boolean;
  /**
   * Custom skeleton component
   */
  skeleton?: React.ReactNode;
  /**
   * Callback when image loads successfully
   */
  onLoad?: () => void;
  /**
   * Callback when image fails to load
   */
  onError?: (error: string) => void;
  /**
   * Whether to use blur placeholder
   */
  useBlurPlaceholder?: boolean;
  /**
   * Custom blur data URL
   */
  blurDataURL?: string;
  /**
   * Loading strategy
   */
  loadingStrategy?: "lazy" | "eager" | "auto";
  /**
   * Image quality (1-100)
   */
  quality?: number;
  /**
   * Whether to optimize for performance
   */
  optimize?: boolean;
}

/**
 * Generate a simple blur placeholder
 */
const _generateBlurPlaceholder = (width: number, height: number): string => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Create a simple gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#f3f4f6");
    gradient.addColorStop(1, "#e5e7eb");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  return canvas.toDataURL();
};

/**
 * OptimizedImage component with lazy loading, error handling, and performance optimizations
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt = "", // Provide a default empty string for alt
  fallbackSrc,
  showSkeleton = true,
  skeleton,
  onLoad,
  onError,
  useBlurPlaceholder = true,
  blurDataURL,
  loadingStrategy = "lazy",
  quality = 75,
  optimize = true,
  className,
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [currentSrc, setCurrentSrc] = React.useState(src);
  const [retryCount, setRetryCount] = React.useState(0);

  const maxRetries = 2;

  // Reset state when src changes
  React.useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setCurrentSrc(src);
    setRetryCount(0);
  }, [src]);

  // Generate blur placeholder if needed
  const blurPlaceholder = React.useMemo(() => {
    if (!useBlurPlaceholder) return undefined;
    if (blurDataURL) return blurDataURL;

    // Use a simple base64 encoded 1x1 pixel
    return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";
  }, [useBlurPlaceholder, blurDataURL]);

  const handleLoad = React.useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = React.useCallback(() => {
    setIsLoading(false);

    if (retryCount < maxRetries) {
      // Retry with a delay
      setTimeout(
        () => {
          setRetryCount((prev) => prev + 1);
          setIsLoading(true);
          setHasError(false);
          // Force reload by adding timestamp
          setCurrentSrc(`${src}?retry=${retryCount + 1}`);
        },
        1000 * (retryCount + 1)
      );
      return;
    }

    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
      setHasError(false);
      setRetryCount(0);
      return;
    }

    setHasError(true);
    onError?.(`Failed to load image: ${src}`);
  }, [src, fallbackSrc, currentSrc, retryCount, maxRetries, onError]);

  // Intersection Observer for lazy loading
  const [isInView, setIsInView] = React.useState(loadingStrategy === "eager");
  const observerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (loadingStrategy === "eager" || !observerRef.current) return;

    const observer = new IntersectionObserver(
      ([_entry]) => {
        if (_entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px", // Start loading 50px before the image comes into view
        threshold: 0.1,
      }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loadingStrategy]);

  // Error fallback
  if (hasError) {
    return (
      <div
        className={cn(
          "text-muted-foreground flex items-center justify-center bg-muted",
          className
        )}
        style={{ width: props.width, height: props.height }}
      >
        <div className="p-4 text-center">
          <div className="text-sm">Failed to load image</div>
          {process.env.NODE_ENV === "development" && (
            <div className="mt-1 text-xs opacity-70">
              {typeof src === "string" ? src : "Image source"}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Loading skeleton
  if ((isLoading && showSkeleton) || !isInView) {
    const skeletonContent = skeleton || (
      <Skeleton
        className={cn("h-full w-full", className)}
        style={{ width: props.width, height: props.height }}
      />
    );

    return (
      <div ref={observerRef} className="relative">
        {skeletonContent}
        {!isInView && loadingStrategy === "lazy" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-muted-foreground text-xs">Loading...</div>
          </div>
        )}
      </div>
    );
  }

  // Optimized image props
  const imageProps: ImageProps = {
    ...props,
    src: currentSrc,
    alt,
    className: cn(className),
    onLoad: handleLoad,
    onError: handleError,
    quality: optimize ? quality : 100,
    priority: loadingStrategy === "eager",
    placeholder: blurPlaceholder ? "blur" : "empty",
    blurDataURL: blurPlaceholder,
  };

  return <Image {...imageProps} alt={imageProps.alt ?? ""} />;
};

/**
 * Optimized avatar image with fallback to initials
 */
export const OptimizedAvatar: React.FC<
  OptimizedImageProps & {
    name?: string;
    initials?: string;
  }
> = ({ name, initials, className, ...props }) => {
  const fallbackInitials = React.useMemo(() => {
    if (initials) return initials;
    if (name) {
      return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return "?";
  }, [name, initials]);

  const fallbackElement = (
    <div
      className={cn(
        "text-muted-foreground flex items-center justify-center rounded-full bg-muted font-medium",
        className
      )}
      style={{ width: props.width, height: props.height }}
    >
      {fallbackInitials}
    </div>
  );

  return (
    <OptimizedImage
      {...props}
      className={cn("rounded-full", className)}
      fallbackSrc={undefined}
      skeleton={fallbackElement}
      onError={() => {
        // Avatar will show initials on error
      }}
    />
  );
};

/**
 * Optimized project image with specific optimizations for project screenshots
 */
export const OptimizedProjectImage: React.FC<
  OptimizedImageProps & {
    projectTitle?: string;
  }
> = ({ projectTitle, alt, ...props }) => {
  const optimizedAlt =
    alt || `${projectTitle} screenshot` || "Project screenshot";

  return (
    <OptimizedImage
      {...props}
      alt={optimizedAlt || "Image"}
      quality={85} // Higher quality for project images
      useBlurPlaceholder={true}
      showSkeleton={true}
      optimize={true}
    />
  );
};

/**
 * Hook for preloading images
 */
export const useImagePreloader = () => {
  const preloadedImages = React.useRef(new Set<string>());

  const preloadImage = React.useCallback((src: string): Promise<void> => {
    if (preloadedImages.current.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        preloadedImages.current.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  const preloadImages = React.useCallback(
    (sources: string[]): Promise<void[]> => {
      return Promise.all(sources.map(preloadImage));
    },
    [preloadImage]
  );

  return { preloadImage, preloadImages };
};
