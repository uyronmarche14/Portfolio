"use client";

import * as React from "react";
import { PortfolioErrorBoundary } from "@/components/ui/ErrorBoundary";
import { PageSkeleton } from "@/components/ui/LoadingSkeletons";
import { usePerformanceMonitor, measureRender } from "@/lib/utils/performance";
import { createLazyComponent } from "@/lib/utils/codeSplitting";
import { cn } from "@/lib/utils";

// Lazy load heavy components
const Navigation = createLazyComponent(() => import("./navbar"), {
  displayName: "Navigation",
  preload: true,
});

const Footer = createLazyComponent(() => import("./footer"), {
  displayName: "Footer",
});

interface PerformantLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  enablePerformanceMonitoring?: boolean;
}

/**
 * Performance-optimized layout component with error boundaries,
 * lazy loading, and performance monitoring
 */
export const PerformantLayout: React.FC<PerformantLayoutProps> = ({
  children,
  className,
  showNavigation = true,
  showFooter = true,
  enablePerformanceMonitoring = process.env.NODE_ENV === "development",
}) => {
  const { startMeasure, endMeasure } =
    usePerformanceMonitor("PerformantLayout");
  const [_isNavigationLoaded, setIsNavigationLoaded] = React.useState(false);
  const [_isFooterLoaded, setIsFooterLoaded] = React.useState(false);

  // Measure render performance
  React.useLayoutEffect(() => {
    if (enablePerformanceMonitoring) {
      const endRenderMeasure = measureRender("PerformantLayout");
      return endRenderMeasure;
    }
  });

  // Track component lifecycle
  React.useEffect(() => {
    if (enablePerformanceMonitoring) {
      startMeasure("mount");
      return () => {
        endMeasure("mount");
      };
    }
  }, [startMeasure, endMeasure, enablePerformanceMonitoring]);

  // Intersection observer for footer lazy loading
  const footerRef = React.useRef<HTMLDivElement>(null);
  const [shouldLoadFooter, setShouldLoadFooter] = React.useState(false);

  React.useEffect(() => {
    if (!showFooter || !footerRef.current) return;

    const observer = new IntersectionObserver(
      ([_entry]) => {
        if (_entry.isIntersecting) {
          setShouldLoadFooter(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load footer when it's 200px away
    );

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [showFooter]);

  return (
    <div className={cn("flex min-h-screen flex-col", className)}>
      {/* Navigation */}
      {showNavigation && (
        <PortfolioErrorBoundary section="navigation">
          <React.Suspense
            fallback={
              <div className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                  <div className="h-8 w-32 animate-pulse rounded bg-muted" />
                  <div className="hidden space-x-6 md:flex">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-6 w-16 animate-pulse rounded bg-muted"
                      />
                    ))}
                  </div>
                  <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                </div>
              </div>
            }
          >
            <Navigation onLoad={() => setIsNavigationLoaded(true)} />
          </React.Suspense>
        </PortfolioErrorBoundary>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <PortfolioErrorBoundary section="main-content">
          {children}
        </PortfolioErrorBoundary>
      </main>

      {/* Footer */}
      {showFooter && (
        <div ref={footerRef}>
          <PortfolioErrorBoundary section="footer">
            {shouldLoadFooter ? (
              <React.Suspense
                fallback={
                  <div className="border-t bg-muted/50 py-8">
                    <div className="container">
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="space-y-4">
                            <div className="h-6 w-24 animate-pulse rounded bg-muted" />
                            <div className="space-y-2">
                              {Array.from({ length: 3 }).map((_, j) => (
                                <div
                                  key={j}
                                  className="h-4 w-32 animate-pulse rounded bg-muted"
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                }
              >
                <Footer onLoad={() => setIsFooterLoaded(true)} />
              </React.Suspense>
            ) : (
              <div className="h-32" /> // Placeholder to maintain layout
            )}
          </PortfolioErrorBoundary>
        </div>
      )}
    </div>
  );
};

/**
 * HOC for wrapping pages with performant layout
 */
export function withPerformantLayout<P extends object>(
  Component: React.ComponentType<P>,
  layoutOptions: Omit<PerformantLayoutProps, "children"> = {}
) {
  const WrappedComponent: React.FC<P> = (props) => {
    return (
      <PerformantLayout {...layoutOptions}>
        <Component {...props} />
      </PerformantLayout>
    );
  };

  WrappedComponent.displayName = `withPerformantLayout(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

/**
 * Optimized page wrapper with loading states
 */
export const OptimizedPageWrapper: React.FC<{
  children: React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  className?: string;
}> = ({ children, isLoading, error, onRetry, className }) => {
  if (error) {
    return (
      <div className={cn("container mx-auto px-4 py-8", className)}>
        <PortfolioErrorBoundary section="page">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-destructive">
              Something went wrong
            </h1>
            <p className="text-muted-foreground mb-6">
              {error.message || "An unexpected error occurred"}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="text-primary-foreground rounded-md bg-primary px-4 py-2 hover:bg-primary/90"
              >
                Try Again
              </button>
            )}
          </div>
        </PortfolioErrorBoundary>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cn("container mx-auto px-4 py-8", className)}>
        <PageSkeleton includeNav={false} />
      </div>
    );
  }

  return (
    <div className={cn("container mx-auto px-4 py-8", className)}>
      {children}
    </div>
  );
};

/**
 * Lazy section wrapper for code splitting at section level
 */
export const LazySection: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  sectionName: string;
  className?: string;
}> = ({ children, fallback, sectionName, className }) => {
  const [isInView, setIsInView] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([_entry]) => {
        if (_entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={className}>
      <PortfolioErrorBoundary section={sectionName}>
        {isInView
          ? children
          : fallback || <div className="h-64 animate-pulse rounded bg-muted" />}
      </PortfolioErrorBoundary>
    </div>
  );
};
