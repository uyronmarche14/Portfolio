/**
 * Scroll behavior management hook
 * Provides scroll position tracking, smooth scrolling, and scroll-based interactions
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface ScrollPosition {
  x: number;
  y: number;
}

export interface ScrollDirection {
  horizontal: 'left' | 'right' | 'none';
  vertical: 'up' | 'down' | 'none';
}

export interface ScrollMetrics {
  position: ScrollPosition;
  direction: ScrollDirection;
  progress: number; // 0-1, how far scrolled down the page
  velocity: number; // pixels per second
  isScrolling: boolean;
  isAtTop: boolean;
  isAtBottom: boolean;
  isNearTop: boolean; // within threshold
  isNearBottom: boolean; // within threshold
}

export interface UseScrollBehaviorOptions {
  threshold?: number; // pixels from top/bottom to consider "near"
  throttleMs?: number; // throttle scroll event handling
  enableVelocity?: boolean; // track scroll velocity
  enableDirection?: boolean; // track scroll direction
  onScroll?: (metrics: ScrollMetrics) => void;
  onScrollStart?: () => void;
  onScrollEnd?: () => void;
  onReachTop?: () => void;
  onReachBottom?: () => void;
}

export interface UseScrollBehaviorReturn extends ScrollMetrics {
  scrollTo: (options: ScrollToOptions | number) => void;
  scrollToTop: (smooth?: boolean) => void;
  scrollToBottom: (smooth?: boolean) => void;
  scrollToElement: (element: Element | string, options?: ScrollIntoViewOptions) => void;
  scrollBy: (x: number, y: number, smooth?: boolean) => void;
  isElementInView: (element: Element | string) => boolean;
  getElementPosition: (element: Element | string) => { top: number; left: number } | null;
}

/**
 * Custom hook for managing scroll behavior and tracking scroll metrics
 */
export function useScrollBehavior(options: UseScrollBehaviorOptions = {}): UseScrollBehaviorReturn {
  const {
    threshold = 100,
    throttleMs = 16, // ~60fps
    enableVelocity = true,
    enableDirection = true,
    onScroll,
    onScrollStart,
    onScrollEnd,
    onReachTop,
    onReachBottom,
  } = options;

  const [scrollMetrics, setScrollMetrics] = useState<ScrollMetrics>({
    position: { x: 0, y: 0 },
    direction: { horizontal: 'none', vertical: 'none' },
    progress: 0,
    velocity: 0,
    isScrolling: false,
    isAtTop: true,
    isAtBottom: false,
    isNearTop: true,
    isNearBottom: false,
  });

  const lastScrollTime = useRef<number>(0);
  const lastScrollPosition = useRef<ScrollPosition>({ x: 0, y: 0 });
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const throttleTimeout = useRef<NodeJS.Timeout>();
  const velocityHistory = useRef<Array<{ time: number; position: ScrollPosition }>>([]);

  /**
   * Calculate scroll velocity
   */
  const calculateVelocity = useCallback((currentPos: ScrollPosition, currentTime: number): number => {
    if (!enableVelocity) return 0;

    const history = velocityHistory.current;
    
    // Add current position to history
    history.push({ time: currentTime, position: currentPos });
    
    // Keep only recent history (last 100ms)
    const cutoffTime = currentTime - 100;
    velocityHistory.current = history.filter(entry => entry.time > cutoffTime);
    
    if (history.length < 2) return 0;
    
    // Calculate velocity based on recent history
    const oldest = history[0];
    const newest = history[history.length - 1];
    const timeDiff = newest.time - oldest.time;
    
    if (timeDiff === 0) return 0;
    
    const yDiff = newest.position.y - oldest.position.y;
    return Math.abs(yDiff / timeDiff * 1000); // pixels per second
  }, [enableVelocity]);

  /**
   * Calculate scroll direction
   */
  const calculateDirection = useCallback((currentPos: ScrollPosition, lastPos: ScrollPosition): ScrollDirection => {
    if (!enableDirection) return { horizontal: 'none', vertical: 'none' };

    const xDiff = currentPos.x - lastPos.x;
    const yDiff = currentPos.y - lastPos.y;

    return {
      horizontal: xDiff > 0 ? 'right' : xDiff < 0 ? 'left' : 'none',
      vertical: yDiff > 0 ? 'down' : yDiff < 0 ? 'up' : 'none',
    };
  }, [enableDirection]);

  /**
   * Update scroll metrics
   */
  const updateScrollMetrics = useCallback(() => {
    if (typeof window === 'undefined') return;

    const currentTime = Date.now();
    const currentPos: ScrollPosition = {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop,
    };

    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    const windowHeight = window.innerHeight;
    const scrollableHeight = documentHeight - windowHeight;
    const progress = scrollableHeight > 0 ? currentPos.y / scrollableHeight : 0;

    const direction = calculateDirection(currentPos, lastScrollPosition.current);
    const velocity = calculateVelocity(currentPos, currentTime);

    const isAtTop = currentPos.y <= 0;
    const isAtBottom = currentPos.y >= scrollableHeight - 1; // -1 for rounding errors
    const isNearTop = currentPos.y <= threshold;
    const isNearBottom = currentPos.y >= scrollableHeight - threshold;

    const newMetrics: ScrollMetrics = {
      position: currentPos,
      direction,
      progress: Math.max(0, Math.min(1, progress)),
      velocity,
      isScrolling: true,
      isAtTop,
      isAtBottom,
      isNearTop,
      isNearBottom,
    };

    setScrollMetrics(newMetrics);

    // Call callbacks
    onScroll?.(newMetrics);

    // Check for top/bottom reach events
    if (isAtTop && !scrollMetrics.isAtTop) {
      onReachTop?.();
    }
    if (isAtBottom && !scrollMetrics.isAtBottom) {
      onReachBottom?.();
    }

    // Update references
    lastScrollTime.current = currentTime;
    lastScrollPosition.current = currentPos;

    // Handle scroll end detection
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      setScrollMetrics(prev => ({ ...prev, isScrolling: false }));
      onScrollEnd?.();
    }, 150);
  }, [
    calculateDirection,
    calculateVelocity,
    threshold,
    onScroll,
    onReachTop,
    onReachBottom,
    onScrollEnd,
    scrollMetrics.isAtTop,
    scrollMetrics.isAtBottom,
  ]);

  /**
   * Throttled scroll handler
   */
  const handleScroll = useCallback(() => {
    if (throttleTimeout.current) return;

    // Call scroll start callback on first scroll
    if (!scrollMetrics.isScrolling) {
      onScrollStart?.();
    }

    throttleTimeout.current = setTimeout(() => {
      updateScrollMetrics();
      throttleTimeout.current = undefined;
    }, throttleMs);
  }, [throttleMs, updateScrollMetrics, onScrollStart, scrollMetrics.isScrolling]);

  /**
   * Scroll to specific position or options
   */
  const scrollTo = useCallback((options: ScrollToOptions | number) => {
    if (typeof window === 'undefined') return;

    if (typeof options === 'number') {
      window.scrollTo({
        top: options,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(options);
    }
  }, []);

  /**
   * Scroll to top of page
   */
  const scrollToTop = useCallback((smooth = true) => {
    scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, [scrollTo]);

  /**
   * Scroll to bottom of page
   */
  const scrollToBottom = useCallback((smooth = true) => {
    if (typeof window === 'undefined') return;

    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    scrollTo({
      top: documentHeight,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, [scrollTo]);

  /**
   * Scroll to specific element
   */
  const scrollToElement = useCallback((element: Element | string, options: ScrollIntoViewOptions = {}) => {
    if (typeof window === 'undefined') return;

    const targetElement = typeof element === 'string' 
      ? document.querySelector(element)
      : element;

    if (!targetElement) {
      console.warn('Element not found for scrolling:', element);
      return;
    }

    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      ...options,
    });
  }, []);

  /**
   * Scroll by relative amount
   */
  const scrollBy = useCallback((x: number, y: number, smooth = true) => {
    if (typeof window === 'undefined') return;

    window.scrollBy({
      left: x,
      top: y,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  /**
   * Check if element is in viewport
   */
  const isElementInView = useCallback((element: Element | string): boolean => {
    if (typeof window === 'undefined') return false;

    const targetElement = typeof element === 'string' 
      ? document.querySelector(element)
      : element;

    if (!targetElement) return false;

    const rect = targetElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= windowHeight &&
      rect.right <= windowWidth
    );
  }, []);

  /**
   * Get element position relative to document
   */
  const getElementPosition = useCallback((element: Element | string): { top: number; left: number } | null => {
    if (typeof window === 'undefined') return null;

    const targetElement = typeof element === 'string' 
      ? document.querySelector(element)
      : element;

    if (!targetElement) return null;

    const rect = targetElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
    };
  }, []);

  // Set up scroll event listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initial metrics calculation
    updateScrollMetrics();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      
      // Clean up timeouts
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, [handleScroll, updateScrollMetrics]);

  return {
    ...scrollMetrics,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    scrollToElement,
    scrollBy,
    isElementInView,
    getElementPosition,
  };
}

/**
 * Hook for scroll-based animations and effects
 */
export function useScrollAnimation(options: {
  threshold?: number;
  onEnterView?: () => void;
  onExitView?: () => void;
} = {}) {
  const { threshold = 0.1, onEnterView, onExitView } = options;
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        
        if (inView !== isInView) {
          setIsInView(inView);
          
          if (inView) {
            onEnterView?.();
          } else {
            onExitView?.();
          }
        }
      },
      { threshold }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, onEnterView, onExitView, isInView]);

  return {
    ref: elementRef,
    isInView,
  };
}