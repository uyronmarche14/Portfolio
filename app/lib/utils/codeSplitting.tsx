import React, { lazy, ComponentType } from "react";
import { AppError } from "@/lib/types/error";

interface LazyComponentOptions {
  displayName?: string;
  preload?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

interface LazyComponentResult<T = any> {
  default: ComponentType<T>;
}

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
 * Create a lazy component with enhanced error handling and preloading
 */
export function createLazyComponent<T = any>(
  importFn: () => Promise<LazyComponentResult<T>>,
  options: LazyComponentOptions = {}
): ComponentType<T> {
  const {
    displayName = "LazyComponent",
    preload = false,
    retryCount = 3,
    retryDelay = 1000,
  } = options;

  // Enhanced import function with retry logic
  const enhancedImportFn = async (): Promise<LazyComponentResult<T>> => {
    let lastError: Error;

    for (let attempt = 0; attempt <= retryCount; attempt++) {
      try {
        const result = await importFn();
        return result;
      } catch (error) {
        lastError = error as Error;

        if (attempt < retryCount) {
          // Wait before retrying
          await new Promise((resolve) =>
            setTimeout(resolve, retryDelay * (attempt + 1))
          );
          console.warn(
            `Retry ${attempt + 1}/${retryCount} for ${displayName}:`,
            error
          );
        }
      }
    }

    throw lastError!;
  };

  const LazyComponent = lazy(enhancedImportFn) as ComponentType<T> & { displayName?: string };
  (LazyComponent as any).displayName = displayName;

  // Preload the component if requested
  if (preload && typeof window !== "undefined") {
    // Preload after a short delay to not block initial render
    setTimeout(() => {
      enhancedImportFn().catch((error) => {
        console.warn(`Preload failed for ${displayName}:`, error);
      });
    }, 100);
  }

  return LazyComponent;
}

/**
 * Preload a lazy component
 */
export function preloadComponent<T = any>(
  importFn: () => Promise<LazyComponentResult<T>>
): Promise<LazyComponentResult<T>> {
  return importFn();
}

/**
 * Create a lazy component with route-based code splitting
 */
export function createLazyRoute<T = any>(
  routePath: string,
  importFn: () => Promise<LazyComponentResult<T>>,
  options: LazyComponentOptions = {}
): ComponentType<T> {
  return createLazyComponent(importFn, {
    displayName: `Route(${routePath})`,
    ...options,
  });
}

/**
 * Create dynamic import with enhanced error handling
 */
export function createDynamicImport<T>(
  importFn: () => Promise<{ default: T }>,
  options: DynamicImportOptions = {}
): () => Promise<{ default: T }> {
  const { retries = 3, retryDelay = 1000, timeout = 10000, onError } = options;

  return async () => {
    let lastError: Error;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error("Import timeout")), timeout);
        });

        const result = await Promise.race([importFn(), timeoutPromise]);
        return result;
      } catch (error) {
        lastError = error as Error;

        if (attempt < retries) {
          await new Promise((resolve) =>
            setTimeout(resolve, retryDelay * (attempt + 1))
          );
        }
      }
    }

    if (onError) {
      onError({
        code: "IMPORT_FAILED",
        message: lastError!.message,
        category: "system",
        severity: "medium",
        timestamp: new Date(),
        retryable: true,
        logged: false,
      });
    }

    throw lastError!;
  };
}

/**
 * Preload multiple components
 */
export function preloadComponents(
  importFns: Array<() => Promise<{ default: ComponentType<any> }>>
): Promise<void> {
  return Promise.all(
    importFns.map((importFn) =>
      importFn().catch((error) => {
        console.warn("Failed to preload component:", error);
      })
    )
  ).then(() => {});
}

/**
 * Utility to check if a component is currently loading
 */
export function useComponentLoadingState() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const loadComponent = React.useCallback(
    async <T,>(importFn: () => Promise<LazyComponentResult<T>>) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await importFn();
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, error, loadComponent };
}
