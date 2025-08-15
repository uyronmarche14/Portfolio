/**
 * Code splitting utilities for dynamic imports and lazy loading
 */

import { ComponentType, lazy, LazyExoticComponent } from 'react';
import { AppError } from '@/lib/types/error';
import { createNetworkError, logError } from './errorHandling';

/**
 * Options for dynamic imports
 */
interface DynamicImportOptions {
  /**
   * Retry attempts for failed imports
   */
  retries?: number;
  /**
   * Delay between retry attempts (ms)
   */
  retryDelay?: number;
  /**
   * Timeout for import attempts (ms)
   */
  timeout?: number;
  /**
   * Whether to preload the component
   */
  preload?: boolean;
  /**
   * Error handler for failed imports
   */
  onError?: (error: AppError) => void;
}

/**
 * Enhanced dynamic import with retry logic and error handling
 */
export function createDynamicImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: DynamicImportOptions = {}
): LazyExoticComponent<T> {
  const {
    retries = 3,
    retryDelay = 1000,
    timeout = 30000,
    preload = false,
    onError,
  } = options;

  let retryCount = 0;

  const enhancedImportFn = async (): Promise<{ default: T }> => {
    const attemptImport = async (): Promise<{ default: T }> => {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(createNetworkError(
            `Dynamic import timeout after ${timeout}ms`,
            undefined,
            'dynamic-import',
            'GET'
          ));
        }, timeout);
      });

      try {
        const result = await Promise.race([importFn(), timeoutPromise]);
        retryCount = 0; // Reset on success
        return result;
      } catch (error) {
        const appError = error instanceof Error 
          ? createNetworkError(
              `Failed to load component: ${error.message}`,
              undefined,
              'dynamic-import',
              'GET'
            )
          : createNetworkError(
              'Failed to load component',
              undefined,
              'dynamic-import',
              'GET'
            );

        logError(appError, {
          retryCount,
          maxRetries: retries,
          component: 'createDynamicImport',
        });

        if (retryCount < retries) {
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, retryDelay * retryCount));
          return attemptImport();
        }

        onError?.(appError);
        throw appError;
      }
    };

    return attemptImport();
  };

  const LazyComponent = lazy(enhancedImportFn);

  // Preload if requested
  if (preload && typeof window !== 'undefined') {
    // Preload after a short delay to not block initial render
    setTimeout(() => {
      enhancedImportFn().catch(() => {
        // Ignore preload errors
      });
    }, 100);
  }

  return LazyComponent;
}

/**
 * Create a lazy-loaded component with loading and error states
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: DynamicImportOptions & {
    displayName?: string;
  } = {}
): LazyExoticComponent<T> {
  const LazyComponent = createDynamicImport(importFn, options);
  
  if (options.displayName) {
    LazyComponent.displayName = `Lazy(${options.displayName})`;
  }

  return LazyComponent;
}

/**
 * Preload a dynamic component
 */
export async function preloadComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): Promise<T | null> {
  try {
    const module = await importFn();
    return module.default;
  } catch (error) {
    console.warn('Failed to preload component:', error);
    return null;
  }
}

/**
 * Batch preload multiple components
 */
export async function preloadComponents(
  importFns: Array<() => Promise<{ default: ComponentType<any> }>>
): Promise<Array<ComponentType<any> | null>> {
  const results = await Promise.allSettled(
    importFns.map(fn => preloadComponent(fn))
  );

  return results.map(result => 
    result.status === 'fulfilled' ? result.value : null
  );
}

/**
 * Route-based code splitting helper
 */
export const createRouteComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  routeName: string
) => {
  return createLazyComponent(importFn, {
    displayName: `Route(${routeName})`,
    retries: 2,
    timeout: 15000,
    onError: (error) => {
      logError(error, {
        route: routeName,
        component: 'RouteComponent',
      });
    },
  });
};

/**
 * Feature-based code splitting helper
 */
export const createFeatureComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  featureName: string,
  options: { preload?: boolean } = {}
) => {
  return createLazyComponent(importFn, {
    displayName: `Feature(${featureName})`,
    retries: 3,
    timeout: 20000,
    preload: options.preload,
    onError: (error) => {
      logError(error, {
        feature: featureName,
        component: 'FeatureComponent',
      });
    },
  });
};

/**
 * Heavy component code splitting helper (for components with large dependencies)
 */
export const createHeavyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  componentName: string
) => {
  return createLazyComponent(importFn, {
    displayName: `Heavy(${componentName})`,
    retries: 2,
    timeout: 30000,
    preload: false, // Don't preload heavy components
    onError: (error) => {
      logError(error, {
        component: componentName,
        type: 'HeavyComponent',
      });
    },
  });
};

/**
 * Utility to check if dynamic imports are supported
 */
export const supportsDynamicImports = (): boolean => {
  try {
    // Check if dynamic import is supported
    return typeof import === 'function';
  } catch {
    return false;
  }
};

/**
 * Fallback component loader for environments that don't support dynamic imports
 */
export const createFallbackLoader = <T extends ComponentType<any>>(
  component: T,
  importFn: () => Promise<{ default: T }>
): LazyExoticComponent<T> | T => {
  if (supportsDynamicImports()) {
    return createLazyComponent(importFn);
  }
  return component;
};

/**
 * Bundle analyzer helper - logs chunk information in development
 */
export const logChunkInfo = (chunkName: string, size?: number) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`📦 Loaded chunk: ${chunkName}${size ? ` (${size} bytes)` : ''}`);
  }
};

/**
 * Performance monitoring for dynamic imports
 */
export const measureImportPerformance = async <T>(
  importFn: () => Promise<T>,
  label: string
): Promise<T> => {
  const startTime = performance.now();
  
  try {
    const result = await importFn();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ Import "${label}" took ${duration.toFixed(2)}ms`);
    }
    
    // Report to analytics in production
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      // You could integrate with performance monitoring services here
      if ((window as any).gtag) {
        (window as any).gtag('event', 'timing_complete', {
          name: 'dynamic_import',
          value: Math.round(duration),
          custom_map: {
            component: label,
          },
        });
      }
    }
    
    return result;
  } catch (error) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    console.error(`❌ Import "${label}" failed after ${duration.toFixed(2)}ms:`, error);
    throw error;
  }
};

/**
 * Smart preloader that considers network conditions
 */
export const createSmartPreloader = () => {
  const isSlowConnection = (): boolean => {
    if (typeof navigator === 'undefined' || !('connection' in navigator)) {
      return false;
    }
    
    const connection = (navigator as any).connection;
    return connection.effectiveType === 'slow-2g' || 
           connection.effectiveType === '2g' ||
           connection.saveData === true;
  };

  const shouldPreload = (priority: 'high' | 'medium' | 'low' = 'medium'): boolean => {
    if (isSlowConnection()) {
      return priority === 'high';
    }
    return true;
  };

  return {
    preloadComponent: async <T extends ComponentType<any>>(
      importFn: () => Promise<{ default: T }>,
      priority: 'high' | 'medium' | 'low' = 'medium'
    ): Promise<T | null> => {
      if (!shouldPreload(priority)) {
        return null;
      }
      return preloadComponent(importFn);
    },
    shouldPreload,
    isSlowConnection,
  };
};