import * as React from "react";
import { cn } from "@/lib/utils";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export interface PageLayoutProps {
  /**
   * Page content
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes for the main container
   */
  className?: string;
  /**
   * Whether to include padding around the content
   */
  withPadding?: boolean;
  /**
   * Maximum width constraint for the content
   */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
  /**
   * Whether to center the content horizontally
   */
  centered?: boolean;
  /**
   * Custom error boundary fallback
   */
  errorFallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

/**
 * PageLayout component provides consistent page structure and error handling
 *
 * @example
 * ```tsx
 * <PageLayout maxWidth="7xl" withPadding centered>
 *   <h1>Page Title</h1>
 *   <p>Page content...</p>
 * </PageLayout>
 * ```
 */
const PageLayout = React.forwardRef<HTMLElement, PageLayoutProps>(
  (
    {
      children,
      className,
      withPadding = true,
      maxWidth = "7xl",
      centered = true,
      errorFallback,
      ...props
    },
    ref
  ) => {
    const mainClasses = cn(
      "min-h-screen w-full",
      centered && "mx-auto",
      maxWidthClasses[maxWidth],
      withPadding && "px-4 py-8 md:px-6 lg:px-8",
      className
    );

    return (
      <ErrorBoundary fallback={errorFallback}>
        {React.createElement(
          "main",
          {
            ref,
            className: mainClasses,
            ...props,
          },
          children
        )}
      </ErrorBoundary>
    );
  }
);

PageLayout.displayName = "PageLayout";

export { PageLayout };
