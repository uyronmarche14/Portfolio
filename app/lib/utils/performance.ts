/**
 * Performance monitoring and optimization utilities
 */

import { AppError } from "@/lib/types/error";
import { createAppError, logError } from "./errorHandling";

/**
 * Performance metrics interface
 */
interface PerformanceMetrics {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Performance observer for monitoring various metrics
 */
class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetrics> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  /**
   * Initialize performance observers
   */
  private initializeObservers() {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
      return;
    }

    try {
      // Observe navigation timing
      const navObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "navigation") {
            this.logNavigationMetrics(entry as PerformanceNavigationTiming);
          }
        });
      });
      navObserver.observe({ entryTypes: ["navigation"] });
      this.observers.push(navObserver);

      // Observe resource loading
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "resource") {
            this.logResourceMetrics(entry as PerformanceResourceTiming);
          }
        });
      });
      resourceObserver.observe({ entryTypes: ["resource"] });
      this.observers.push(resourceObserver);

      // Observe largest contentful paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          this.logMetric("lcp", lastEntry.startTime, {
            element: (lastEntry as any).element?.tagName,
            url: (lastEntry as any).url,
          });
        }
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      this.observers.push(lcpObserver);

      // Observe first input delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.logMetric("fid", entry.processingStart - entry.startTime, {
            eventType: (entry as any).name,
          });
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });
      this.observers.push(fidObserver);

      // Observe cumulative layout shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        });
        if (clsValue > 0) {
          this.logMetric("cls", clsValue);
        }
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
      this.observers.push(clsObserver);
    } catch (error) {
      console.warn("Failed to initialize performance observers:", error);
    }
  }

  /**
   * Start measuring a custom metric
   */
  startMeasure(name: string, metadata?: Record<string, unknown>): void {
    this.metrics.set(name, {
      name,
      startTime: performance.now(),
      metadata,
    });
  }

  /**
   * End measuring a custom metric
   */
  endMeasure(
    name: string,
    additionalMetadata?: Record<string, unknown>
  ): number | null {
    const metric = this.metrics.get(name);
    if (!metric) {
      console.warn(`No measurement started for: ${name}`);
      return null;
    }

    const endTime = performance.now();
    const duration = endTime - metric.startTime;

    const finalMetric: PerformanceMetrics = {
      ...metric,
      endTime,
      duration,
      metadata: { ...metric.metadata, ...additionalMetadata },
    };

    this.metrics.set(name, finalMetric);
    this.logMetric(name, duration, finalMetric.metadata);

    return duration;
  }

  /**
   * Log a performance metric
   */
  private logMetric(
    name: string,
    value: number,
    metadata?: Record<string, unknown>
  ) {
    if (process.env.NODE_ENV === "development") {
      console.log(`📊 Performance: ${name} = ${value.toFixed(2)}ms`, metadata);
    }

    // Report to analytics in production
    if (
      process.env.NODE_ENV === "production" &&
      typeof window !== "undefined"
    ) {
      if ((window as any).gtag) {
        (window as any).gtag("event", "timing_complete", {
          name: name,
          value: Math.round(value),
          custom_map: metadata,
        });
      }
    }
  }

  /**
   * Log navigation metrics
   */
  private logNavigationMetrics(entry: PerformanceNavigationTiming) {
    const metrics = {
      dns: entry.domainLookupEnd - entry.domainLookupStart,
      tcp: entry.connectEnd - entry.connectStart,
      ssl:
        entry.secureConnectionStart > 0
          ? entry.connectEnd - entry.secureConnectionStart
          : 0,
      ttfb: entry.responseStart - entry.requestStart,
      download: entry.responseEnd - entry.responseStart,
      domParse: entry.domContentLoadedEventStart - entry.responseEnd,
      domReady:
        entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      loadComplete: entry.loadEventEnd - entry.loadEventStart,
      total: entry.loadEventEnd - entry.navigationStart,
    };

    Object.entries(metrics).forEach(([name, value]) => {
      if (value > 0) {
        this.logMetric(`nav_${name}`, value);
      }
    });
  }

  /**
   * Log resource metrics
   */
  private logResourceMetrics(entry: PerformanceResourceTiming) {
    const duration = entry.responseEnd - entry.startTime;
    const resourceType = this.getResourceType(entry.name);

    if (duration > 1000) {
      // Only log slow resources
      this.logMetric(`resource_${resourceType}`, duration, {
        url: entry.name,
        size: entry.transferSize,
      });
    }
  }

  /**
   * Get resource type from URL
   */
  private getResourceType(url: string): string {
    if (url.includes(".js")) return "script";
    if (url.includes(".css")) return "stylesheet";
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return "image";
    if (url.match(/\.(woff|woff2|ttf|eot)$/)) return "font";
    return "other";
  }

  /**
   * Get all metrics
   */
  getMetrics(): PerformanceMetrics[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics.clear();
  }

  /**
   * Cleanup observers
   */
  cleanup(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}

// Global performance monitor instance
const performanceMonitor = new PerformanceMonitor();

/**
 * Measure function execution time
 */
export const measureFunction = async <T>(
  fn: () => Promise<T> | T,
  name: string,
  metadata?: Record<string, unknown>
): Promise<T> => {
  performanceMonitor.startMeasure(name, metadata);

  try {
    const result = await fn();
    performanceMonitor.endMeasure(name, { success: true });
    return result;
  } catch (error) {
    performanceMonitor.endMeasure(name, {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
};

/**
 * Measure component render time
 */
export const measureRender = (componentName: string) => {
  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;

    if (process.env.NODE_ENV === "development" && duration > 16) {
      // Warn if render takes longer than one frame
      console.warn(
        `🐌 Slow render: ${componentName} took ${duration.toFixed(2)}ms`
      );
    }

    performanceMonitor.logMetric(`render_${componentName}`, duration);
  };
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func(...args);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Memoization utility for expensive computations
 */
export const memoize = <T extends (...args: any[]) => any>(
  fn: T,
  getKey?: (...args: Parameters<T>) => string
): T => {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  }) as T;
};

/**
 * Lazy evaluation utility
 */
export const lazy = <T>(fn: () => T): (() => T) => {
  let cached = false;
  let result: T;

  return () => {
    if (!cached) {
      result = fn();
      cached = true;
    }
    return result;
  };
};

/**
 * Check if the user is on a slow connection
 */
export const isSlowConnection = (): boolean => {
  if (typeof navigator === "undefined" || !("connection" in navigator)) {
    return false;
  }

  const connection = (navigator as any).connection;
  return (
    connection.effectiveType === "slow-2g" ||
    connection.effectiveType === "2g" ||
    connection.saveData === true
  );
};

/**
 * Get device performance tier
 */
export const getDevicePerformanceTier = (): "high" | "medium" | "low" => {
  if (typeof navigator === "undefined") {
    return "medium";
  }

  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;

  if (memory >= 8 && cores >= 8) return "high";
  if (memory >= 4 && cores >= 4) return "medium";
  return "low";
};

/**
 * Adaptive loading based on device capabilities
 */
export const shouldLoadHeavyFeatures = (): boolean => {
  const tier = getDevicePerformanceTier();
  const slowConnection = isSlowConnection();

  return tier === "high" && !slowConnection;
};

/**
 * Monitor memory usage
 */
export const monitorMemoryUsage = () => {
  if (
    typeof window === "undefined" ||
    !("performance" in window) ||
    !(window.performance as any).memory
  ) {
    return null;
  }

  const memory = (window.performance as any).memory;
  const usage = {
    used: memory.usedJSHeapSize,
    total: memory.totalJSHeapSize,
    limit: memory.jsHeapSizeLimit,
    percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
  };

  if (usage.percentage > 90) {
    console.warn("🚨 High memory usage detected:", usage);

    // Report high memory usage
    if (process.env.NODE_ENV === "production" && (window as any).gtag) {
      (window as any).gtag("event", "high_memory_usage", {
        value: Math.round(usage.percentage),
        custom_map: {
          used_mb: Math.round(usage.used / 1024 / 1024),
          total_mb: Math.round(usage.total / 1024 / 1024),
        },
      });
    }
  }

  return usage;
};

/**
 * Performance budget checker
 */
export const checkPerformanceBudget = () => {
  const budgets = {
    lcp: 2500, // Largest Contentful Paint
    fid: 100, // First Input Delay
    cls: 0.1, // Cumulative Layout Shift
    ttfb: 800, // Time to First Byte
  };

  const violations: string[] = [];
  const metrics = performanceMonitor.getMetrics();

  metrics.forEach((metric) => {
    const budget = budgets[metric.name as keyof typeof budgets];
    if (budget && metric.duration && metric.duration > budget) {
      violations.push(
        `${metric.name}: ${metric.duration}ms (budget: ${budget}ms)`
      );
    }
  });

  if (violations.length > 0) {
    console.warn("⚠️ Performance budget violations:", violations);

    // Report violations in production
    if (
      process.env.NODE_ENV === "production" &&
      typeof window !== "undefined" &&
      (window as any).gtag
    ) {
      violations.forEach((violation) => {
        (window as any).gtag("event", "performance_budget_violation", {
          custom_map: { violation },
        });
      });
    }
  }

  return violations;
};

/**
 * React hook for performance monitoring
 */
export const usePerformanceMonitor = (componentName: string) => {
  const startMeasure = (name: string, metadata?: Record<string, unknown>) => {
    performanceMonitor.startMeasure(`${componentName}_${name}`, metadata);
  };

  const endMeasure = (name: string, metadata?: Record<string, unknown>) => {
    return performanceMonitor.endMeasure(`${componentName}_${name}`, metadata);
  };

  return { startMeasure, endMeasure };
};

// Export the performance monitor instance
export { performanceMonitor };
