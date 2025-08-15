"use client";

import * as React from "react";
import { Button } from "./shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./shadcn/card";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import {
  createErrorBoundaryError,
  logError,
  getUserErrorMessage,
  getUserErrorAction,
} from "@/lib/utils/errorHandling";
import { AppError } from "@/lib/types/error";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  retryCount: number;
  lastErrorTime?: Date;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /**
   * Custom fallback component to render when an error occurs
   */
  fallback?: React.ComponentType<{
    error: Error;
    retry: () => void;
    goHome: () => void;
  }>;
  /**
   * Callback function called when an error occurs
   */
  onError?: (error: AppError, errorInfo: React.ErrorInfo) => void;
  /**
   * Maximum number of retries before showing permanent error state
   */
  maxRetries?: number;
  /**
   * Time window in milliseconds for retry counting
   */
  retryTimeWindow?: number;
  /**
   * Whether to show detailed error information in development
   */
  showDetails?: boolean;
  /**
   * Custom error message to display
   */
  errorMessage?: string;
  /**
   * Whether to show the "Go Home" button
   */
  showHomeButton?: boolean;
  /**
   * Whether to automatically report errors
   */
  autoReport?: boolean;
}

/**
 * Enhanced ErrorBoundary component for catching and handling React errors
 * with retry logic, error reporting, and user-friendly recovery options
 *
 * @example
 * ```tsx
 * <ErrorBoundary
 *   onError={(error) => console.error(error)}
 *   maxRetries={3}
 *   showHomeButton={true}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private retryTimeoutId?: NodeJS.Timeout;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const now = new Date();
    const { maxRetries = 3, retryTimeWindow = 60000 } = this.props;

    // Reset retry count if enough time has passed
    let retryCount = this.state.retryCount;
    if (
      this.state.lastErrorTime &&
      now.getTime() - this.state.lastErrorTime.getTime() > retryTimeWindow
    ) {
      retryCount = 0;
    }

    this.setState({
      error,
      errorInfo,
      retryCount: retryCount + 1,
      lastErrorTime: now,
    });

    // Create structured error
    const appError = createErrorBoundaryError(error, errorInfo);

    // Log the error
    logError(appError, {
      retryCount: retryCount + 1,
      maxRetries,
      component: "ErrorBoundary",
      timestamp: now.toISOString(),
    });

    // Call the onError callback if provided
    this.props.onError?.(appError, errorInfo);

    // Auto-report error if enabled
    if (this.props.autoReport) {
      this.reportError(appError, errorInfo);
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  private reportError = async (error: AppError, errorInfo: React.ErrorInfo) => {
    try {
      // In a real implementation, this would send to an error reporting service
      console.log("Reporting error to external service:", {
        error: {
          code: error.code,
          message: error.message,
          category: error.category,
          severity: error.severity,
          stack: error.cause?.stack,
        },
        errorInfo,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      });
    } catch (reportingError) {
      console.error("Failed to report error:", reportingError);
    }
  };

  handleRetry = () => {
    const { maxRetries = 3 } = this.props;

    if (this.state.retryCount >= maxRetries) {
      // Too many retries, don't allow more
      return;
    }

    // Add a small delay before retrying to prevent rapid retry loops
    this.retryTimeoutId = setTimeout(() => {
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
      });
    }, 100);
  };

  handleGoHome = () => {
    // Navigate to home page
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  handleReportBug = () => {
    const { error, errorInfo } = this.state;
    if (!error) return;

    const bugReport = {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };

    // Create mailto link with bug report
    const subject = encodeURIComponent("Bug Report: Portfolio Error");
    const body = encodeURIComponent(`
Bug Report
==========

Error: ${error.message}

Stack Trace:
${error.stack}

Component Stack:
${errorInfo?.componentStack}

Browser: ${navigator.userAgent}
URL: ${window.location.href}
Time: ${new Date().toISOString()}

Additional Information:
Please describe what you were doing when this error occurred.
    `);

    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      const {
        maxRetries = 3,
        showDetails = process.env.NODE_ENV === "development",
      } = this.props;
      const canRetry = this.state.retryCount < maxRetries;
      const error = this.state.error!;

      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={error}
            retry={this.handleRetry}
            goHome={this.handleGoHome}
          />
        );
      }

      // Default error UI
      return (
        <div className="flex min-h-[400px] items-center justify-center p-4">
          <Card className="mx-auto w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle className="text-destructive">
                {this.props.errorMessage || "Something went wrong"}
              </CardTitle>
              <CardDescription>{getUserErrorMessage(error)}</CardDescription>
              {!canRetry && (
                <CardDescription className="text-muted-foreground mt-2 text-sm">
                  Maximum retry attempts reached. Please refresh the page or go
                  home.
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {showDetails && error && (
                <details className="rounded-md border p-3 text-sm">
                  <summary className="text-muted-foreground cursor-pointer font-medium hover:text-foreground">
                    <Bug className="mr-2 inline h-4 w-4" />
                    Technical Details
                  </summary>
                  <div className="mt-3 space-y-2">
                    <div>
                      <strong>Error:</strong>
                      <pre className="mt-1 overflow-auto rounded bg-muted p-2 text-xs">
                        {error.message}
                      </pre>
                    </div>
                    {error.stack && (
                      <div>
                        <strong>Stack Trace:</strong>
                        <pre className="mt-1 max-h-32 overflow-auto rounded bg-muted p-2 text-xs">
                          {error.stack}
                        </pre>
                      </div>
                    )}
                    {this.state.errorInfo?.componentStack && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="mt-1 max-h-32 overflow-auto rounded bg-muted p-2 text-xs">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                    <div className="text-muted-foreground text-xs">
                      Retry Count: {this.state.retryCount}/{maxRetries}
                    </div>
                  </div>
                </details>
              )}

              <div className="flex flex-col gap-2 sm:flex-row">
                {canRetry && (
                  <Button
                    onClick={this.handleRetry}
                    className="flex-1"
                    variant="default"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again ({maxRetries - this.state.retryCount} left)
                  </Button>
                )}

                {this.props.showHomeButton !== false && (
                  <Button
                    onClick={this.handleGoHome}
                    variant={canRetry ? "outline" : "default"}
                    className="flex-1"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Button>
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={this.handleReportBug}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Bug className="mr-2 h-4 w-4" />
                  Report Bug
                </Button>
              </div>

              <div className="text-muted-foreground text-center text-sm">
                {getUserErrorAction(error)}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Portfolio-specific error boundary with predefined settings
 */
const PortfolioErrorBoundary: React.FC<{
  children: React.ReactNode;
  section?: string;
}> = ({ children, section }) => {
  const handleError = React.useCallback(
    (error: AppError, errorInfo: React.ErrorInfo) => {
      // Portfolio-specific error handling
      logError(error, {
        section,
        component: "PortfolioErrorBoundary",
        url: window.location.href,
        userAgent: navigator.userAgent,
      });

      // You could integrate with analytics or error reporting services here
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "exception", {
          description: error.message,
          fatal: false,
          custom_map: {
            section,
            error_code: error.code,
            error_category: error.category,
          },
        });
      }
    },
    [section]
  );

  return (
    <ErrorBoundary
      onError={handleError}
      maxRetries={3}
      retryTimeWindow={60000}
      showHomeButton={true}
      autoReport={process.env.NODE_ENV === "production"}
      errorMessage={section ? `Error in ${section} section` : undefined}
    >
      {children}
    </ErrorBoundary>
  );
};

export { ErrorBoundary, PortfolioErrorBoundary };
