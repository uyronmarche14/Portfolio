"use client";

import * as React from "react";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Info,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Button } from "./shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./shadcn/card";
import { Alert, AlertDescription, AlertTitle } from "./shadcn/alert";
import { cn } from "@/lib/utils";
import { AppError, ErrorSeverity } from "@/lib/types/error";
import {
  getUserErrorMessage,
  getUserErrorAction,
} from "@/lib/utils/errorHandling";

interface ErrorMessageProps {
  error: AppError | Error | string;
  title?: string;
  showRetry?: boolean;
  showHome?: boolean;
  onRetry?: () => void;
  onHome?: () => void;
  className?: string;
  variant?: "card" | "alert" | "inline";
  size?: "sm" | "default" | "lg";
}

/**
 * Get icon based on error severity
 */
const getErrorIcon = (severity: ErrorSeverity) => {
  switch (severity) {
    case "critical":
      return XCircle;
    case "high":
      return AlertTriangle;
    case "medium":
      return AlertCircle;
    case "low":
      return Info;
    default:
      return AlertTriangle;
  }
};

/**
 * Get alert variant based on error severity
 */
const getAlertVariant = (severity: ErrorSeverity) => {
  switch (severity) {
    case "critical":
    case "high":
      return "destructive";
    case "medium":
      return "default";
    case "low":
      return "default";
    default:
      return "destructive";
  }
};

/**
 * ErrorMessage component for displaying user-friendly error messages
 * with recovery options
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  title,
  showRetry = false,
  showHome = false,
  onRetry,
  onHome,
  className,
  variant = "card",
  size = "default",
}) => {
  const appError = React.useMemo(() => {
    if (typeof error === "string") {
      return {
        message: error,
        severity: "medium" as ErrorSeverity,
        retryable: false,
      };
    }

    if ("severity" in error) {
      return error as AppError;
    }

    return {
      message: error.message,
      severity: "medium" as ErrorSeverity,
      retryable: false,
    };
  }, [error]);

  const severity = appError.severity || "medium";
  const Icon = getErrorIcon(severity);
  const userMessage = getUserErrorMessage(appError);
  const userAction = getUserErrorAction(appError);
  const errorTitle =
    title ||
    (severity === "critical" ? "Critical Error" : "Something went wrong");

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  if (variant === "alert") {
    return (
      <Alert variant={getAlertVariant(severity)} className={className}>
        <Icon className="h-4 w-4" />
        <AlertTitle>{errorTitle}</AlertTitle>
        <AlertDescription className="mt-2">
          <div className="space-y-3">
            <p>{userMessage}</p>
            {userAction && (
              <p className="text-muted-foreground text-sm">{userAction}</p>
            )}
            {(showRetry || showHome) && (
              <div className="mt-3 flex gap-2">
                {showRetry && onRetry && (
                  <Button onClick={onRetry} size="sm" variant="outline">
                    <RefreshCw className="mr-1 h-3 w-3" />
                    Try Again
                  </Button>
                )}
                {showHome && (
                  <Button onClick={handleHome} size="sm" variant="outline">
                    <Home className="mr-1 h-3 w-3" />
                    Go Home
                  </Button>
                )}
              </div>
            )}
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex items-start gap-3 rounded-md border border-destructive/20 bg-destructive/5 p-3",
          className
        )}
      >
        <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-destructive">{errorTitle}</p>
          <p className="text-muted-foreground mt-1 text-sm">{userMessage}</p>
          {userAction && (
            <p className="text-muted-foreground mt-1 text-xs">{userAction}</p>
          )}
          {(showRetry || showHome) && (
            <div className="mt-2 flex gap-2">
              {showRetry && onRetry && (
                <Button
                  onClick={onRetry}
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs"
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Retry
                </Button>
              )}
              {showHome && (
                <Button
                  onClick={handleHome}
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs"
                >
                  <Home className="mr-1 h-3 w-3" />
                  Home
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Card variant (default)
  const cardSizeClasses = {
    sm: "max-w-sm",
    default: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <Card className={cn("mx-auto", cardSizeClasses[size], className)}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <Icon className="h-6 w-6 text-destructive" />
        </div>
        <CardTitle className="text-destructive">{errorTitle}</CardTitle>
        <CardDescription>{userMessage}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {userAction && (
          <p className="text-muted-foreground text-center text-sm">
            {userAction}
          </p>
        )}

        {(showRetry || showHome) && (
          <div className="flex flex-col gap-2 sm:flex-row">
            {showRetry && onRetry && (
              <Button onClick={onRetry} className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            )}
            {showHome && (
              <Button
                onClick={handleHome}
                variant={showRetry ? "outline" : "default"}
                className="flex-1"
              >
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Specialized error message for data loading failures
 */
export const DataErrorMessage: React.FC<{
  error: AppError | Error | string;
  onRetry?: () => void;
  retryCount?: number;
  maxRetries?: number;
  className?: string;
}> = ({ error, onRetry, retryCount = 0, maxRetries = 3, className }) => {
  const canRetry = onRetry && retryCount < maxRetries;

  return (
    <ErrorMessage
      error={error}
      title="Failed to load data"
      showRetry={canRetry}
      showHome={!canRetry}
      onRetry={onRetry}
      variant="card"
      size="default"
      className={className}
    />
  );
};

/**
 * Specialized error message for network failures
 */
export const NetworkErrorMessage: React.FC<{
  error: AppError | Error | string;
  onRetry?: () => void;
  className?: string;
}> = ({ error, onRetry, className }) => {
  return (
    <ErrorMessage
      error={error}
      title="Connection Error"
      showRetry={!!onRetry}
      showHome={true}
      onRetry={onRetry}
      variant="alert"
      className={className}
    />
  );
};

/**
 * Specialized error message for validation failures
 */
export const ValidationErrorMessage: React.FC<{
  error: AppError | Error | string;
  className?: string;
}> = ({ error, className }) => {
  return (
    <ErrorMessage
      error={error}
      title="Validation Error"
      showRetry={false}
      showHome={false}
      variant="inline"
      className={className}
    />
  );
};

/**
 * Error message with automatic retry functionality
 */
export const AutoRetryErrorMessage: React.FC<{
  error: AppError | Error | string;
  onRetry: () => void;
  retryCount: number;
  maxRetries: number;
  retryDelay: number;
  className?: string;
}> = ({ error, onRetry, retryCount, maxRetries, retryDelay, className }) => {
  const [countdown, setCountdown] = React.useState(0);
  const [isAutoRetrying, setIsAutoRetrying] = React.useState(false);

  React.useEffect(() => {
    if (retryCount > 0 && retryCount < maxRetries) {
      setIsAutoRetrying(true);
      setCountdown(Math.ceil(retryDelay / 1000));

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsAutoRetrying(false);
            onRetry();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [retryCount, maxRetries, retryDelay, onRetry]);

  const handleManualRetry = () => {
    setIsAutoRetrying(false);
    setCountdown(0);
    onRetry();
  };

  return (
    <ErrorMessage
      error={error}
      title={`Failed to load data (Attempt ${retryCount}/${maxRetries})`}
      showRetry={!isAutoRetrying}
      showHome={retryCount >= maxRetries}
      onRetry={handleManualRetry}
      variant="card"
      className={className}
    >
      {isAutoRetrying && (
        <div className="text-muted-foreground mt-2 text-center text-sm">
          Retrying in {countdown} seconds...
        </div>
      )}
    </ErrorMessage>
  );
};
