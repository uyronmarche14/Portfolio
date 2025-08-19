import { useCallback, useRef } from 'react';

interface PerformanceMetrics {
  [key: string]: number;
}

/**
 * Hook for monitoring component performance
 */
export function usePerformanceMonitor(componentName: string) {
  const metricsRef = useRef<PerformanceMetrics>({});

  const startMeasure = useCallback((measureName: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      const markName = `${componentName}-${measureName}-start`;
      performance.mark(markName);
      metricsRef.current[measureName] = performance.now();
    }
  }, [componentName]);

  const endMeasure = useCallback((measureName: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      const startTime = metricsRef.current[measureName];
      if (startTime) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        const markName = `${componentName}-${measureName}`;
        performance.mark(`${markName}-end`);
        
        try {
          performance.measure(markName, `${markName}-start`, `${markName}-end`);
        } catch {
          // Ignore if marks don't exist
        }

        if (process.env.NODE_ENV === 'development') {
          console.warn(`${componentName} ${measureName}: ${duration.toFixed(2)}ms`);
        }

        delete metricsRef.current[measureName];
        return duration;
      }
    }
    return 0;
  }, [componentName]);

  return { startMeasure, endMeasure };
}

/**
 * Measure render performance
 */
export function measureRender(componentName: string) {
  if (typeof window === 'undefined' || !window.performance) {
    return () => {};
  }

  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (process.env.NODE_ENV === 'development') {
      console.warn(`${componentName} render: ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  };
}

/**
 * Performance observer for monitoring web vitals
 */
export function observeWebVitals() {
  if (typeof window === 'undefined' || !window.PerformanceObserver) {
    return;
  }

  try {
    // Observe Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((_list) => {
        const entries = _list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (process.env.NODE_ENV === 'development' && lastEntry) {
          console.warn('LCP:', lastEntry.startTime);
        }
      });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Observe First Input Delay
    const fidObserver = new PerformanceObserver((_list) => {
      const entries = _list.getEntries();
      entries.forEach((_entry) => {
        const timingEntry = _entry as PerformanceEventTiming;
        if (process.env.NODE_ENV === 'development' && timingEntry.processingStart) {
          console.warn('FID:', timingEntry.processingStart - timingEntry.startTime);
        }
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Observe Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((_list) => {
      const entries = _list.getEntries();
      entries.forEach((_entry) => {
        if (process.env.NODE_ENV === 'development') {
          const layoutShiftEntry = _entry as PerformanceEntry & { value: number };
          console.warn('CLS:', layoutShiftEntry.value);
        }
      });
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

  } catch (_error) {
    console.error('Performance observation not supported:', _error);
  }
}