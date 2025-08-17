import React, { lazy, ComponentType } from 'react';

interface LazyComponentOptions {
  displayName?: string;
  preload?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

interface LazyComponentResult<T = any> {
  default: ComponentType<T>;
}

/**
 * Create a lazy component with enhanced error handling and preloading
 */
export function createLazyComponent<T = any>(
  importFn: () => Promise<LazyComponentResult<T>>,
  options: LazyComponentOptions = {}
): ComponentType<T> {
  const {
    displayName = 'LazyComponent',
    preload = false,
    retryCount = 3,
    retryDelay = 1000
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
          await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
          console.warn(`Retry ${attempt + 1}/${retryCount} for ${displayName}:`, error);
        }
      }
    }
    
    throw lastError!;
  };

  const LazyComponent = lazy(enhancedImportFn);
  LazyComponent.displayName = displayName;

  // Preload the component if requested
  if (preload && typeof window !== 'undefined') {
    // Preload after a short delay to not block initial render
    setTimeout(() => {
      enhancedImportFn().catch(error => {
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
    ...options
  });
}

/**
 * Higher-order component for lazy loading with loading states
 */
export function withLazyLoading<P extends object>(
  importFn: () => Promise<LazyComponentResult<ComponentType<P>>>,
  LoadingComponent?: ComponentType,
  ErrorComponent?: ComponentType<{ error: Error; retry: () => void }>
) {
  const LazyComponent = createLazyComponent(importFn);

  return React.forwardRef<any, P>((props, ref) => {
    const [error, setError] = React.useState<Error | null>(null);
    const [retryKey, setRetryKey] = React.useState(0);

    const handleRetry = React.useCallback(() => {
      setError(null);
      setRetryKey(prev => prev + 1);
    }, []);

    if (error && ErrorComponent) {
      return <ErrorComponent error={error} retry={handleRetry} />;
    }

    return (
      <React.Suspense
        fallback={LoadingComponent ? <LoadingComponent /> : <div>Loading...</div>}
      >
        <React.ErrorBoundary
          fallback={({ error }) => {
            setError(error);
            return ErrorComponent ? (
              <ErrorComponent error={error} retry={handleRetry} />
            ) : (
              <div>Error loading component</div>
            );
          }}
        >
          <LazyComponent key={retryKey} {...props} ref={ref} />
        </React.ErrorBoundary>
      </React.Suspense>
    );
  });
}

/**
 * Utility to check if a component is currently loading
 */
export function useComponentLoadingState() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const loadComponent = React.useCallback(async <T,>(
    importFn: () => Promise<LazyComponentResult<T>>
  ) => {
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
  }, []);

  return { isLoading, error, loadComponent };
}