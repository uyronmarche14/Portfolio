'use client';

import * as React from 'react';
import type { AppError, ErrorConfig, ErrorNotification } from '@/lib/types/error';
import { createAppError, logError, getUserErrorMessage } from '@/lib/utils/errorHandling';

interface ErrorContextValue {
  // Error state
  errors: ErrorNotification[];
  hasErrors: boolean;
  
  // Error actions
  reportError: (error: AppError | Error | string, context?: Record<string, unknown>) => void;
  clearError: (id: string) => void;
  clearAllErrors: () => void;
  
  // Configuration
  config: ErrorConfig;
  updateConfig: (updates: Partial<ErrorConfig>) => void;
  
  // Statistics
  getErrorStats: () => {
    total: number;
    bySeverity: Record<string, number>;
    recent: number;
  };
}

const ErrorContext = React.createContext<ErrorContextValue | null>(null);

interface ErrorProviderProps {
  children: React.ReactNode;
  config?: Partial<ErrorConfig>;
  onError?: (error: AppError, context?: Record<string, unknown>) => void;
  maxErrors?: number;
}

const defaultConfig: ErrorConfig = {
  enableLogging: true,
  logLevel: 'medium',
  logToConsole: true,
  logToFile: false,
  logToExternal: false,
  enableReporting: false,
  showUserNotifications: true,
  autoHideNotifications: true,
  notificationDuration: 5000,
  enableAutoRecovery: true,
  maxRetries: 3,
  retryDelay: 1000,
  showStackTrace: process.env.NODE_ENV === 'development',
  showErrorDetails: process.env.NODE_ENV === 'development',
  enableErrorBoundary: true,
};

/**
 * Error provider for centralized error handling across the application
 */
export const ErrorProvider: React.FC<ErrorProviderProps> = ({
  children,
  config: initialConfig = {},
  onError,
  maxErrors = 50,
}) => {
  const [errors, setErrors] = React.useState<ErrorNotification[]>([]);
  const [config, setConfig] = React.useState<ErrorConfig>({
    ...defaultConfig,
    ...initialConfig,
  });

  const errorIdCounter = React.useRef(0);

  /**
   * Generate unique error ID
   */
  const generateErrorId = React.useCallback(() => {
    return `error-${Date.now()}-${++errorIdCounter.current}`;
  }, []);

  /**
   * Convert any error type to AppError
   */
  const normalizeError = React.useCallback((error: AppError | Error | string): AppError => {
    if (typeof error === 'string') {
      return createAppError('USER_ERROR', error, 'user-input', 'low');
    }
    
    if ('code' in error && 'category' in error) {
      return error as AppError;
    }
    
    return createAppError(
      'UNKNOWN_ERROR',
      error.message || 'An unknown error occurred',
      'system',
      'medium',
      { cause: error }
    );
  }, []);

  /**
   * Report an error to the error system
   */
  const reportError = React.useCallback((
    error: AppError | Error | string,
    context?: Record<string, unknown>
  ) => {
    const appError = normalizeError(error);
    const errorId = generateErrorId();

    // Create error notification
    const notification: ErrorNotification = {
      id: errorId,
      error: appError,
      shown: false,
      dismissed: false,
      timestamp: new Date(),
      autoHide: config.autoHideNotifications,
      duration: config.notificationDuration,
    };

    // Add to errors list (with max limit)
    setErrors(prev => {
      const newErrors = [notification, ...prev];
      return newErrors.slice(0, maxErrors);
    });

    // Log the error if enabled
    if (config.enableLogging) {
      logError(appError, {
        ...context,
        errorId,
        component: 'ErrorProvider',
      });
    }

    // Call external error handler
    onError?.(appError, context);

    // Auto-hide notification if enabled
    if (config.autoHideNotifications && config.showUserNotifications) {
      setTimeout(() => {
        setErrors(prev => 
          prev.map(err => 
            err.id === errorId 
              ? { ...err, dismissed: true }
              : err
          )
        );
      }, config.notificationDuration);
    }

    // Report to external service if enabled
    if (config.enableReporting) {
      // This would integrate with an external error reporting service
      console.warn('Reporting error to external service:', {
        error: appError,
        context,
        timestamp: new Date().toISOString(),
      });
    }
  }, [
    normalizeError,
    generateErrorId,
    config,
    maxErrors,
    onError,
  ]);

  /**
   * Clear a specific error
   */
  const clearError = React.useCallback((id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  }, []);

  /**
   * Clear all errors
   */
  const clearAllErrors = React.useCallback(() => {
    setErrors([]);
  }, []);

  /**
   * Update configuration
   */
  const updateConfig = React.useCallback((updates: Partial<ErrorConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  /**
   * Get error statistics
   */
  const getErrorStats = React.useCallback(() => {
    const total = errors.length;
    const bySeverity = errors.reduce((acc, { error }) => {
      const severity = error.severity || 'medium';
      acc[severity] = (acc[severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recent = errors.filter(({ timestamp }) => timestamp > oneHourAgo).length;

    return { total, bySeverity, recent };
  }, [errors]);

  /**
   * Global error handler for unhandled errors
   */
  React.useEffect(() => {
    const handleUnhandledError = (event: ErrorEvent) => {
      reportError(event.error || event.message, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        type: 'unhandled-error',
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      reportError(event.reason, {
        type: 'unhandled-promise-rejection',
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('error', handleUnhandledError);
      window.addEventListener('unhandledrejection', handleUnhandledRejection);

      return () => {
        window.removeEventListener('error', handleUnhandledError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      };
    }
  }, [reportError]);

  const contextValue: ErrorContextValue = {
    errors,
    hasErrors: errors.length > 0,
    reportError,
    clearError,
    clearAllErrors,
    config,
    updateConfig,
    getErrorStats,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};

/**
 * Hook to use the error context
 */
export const useError = () => {
  const context = React.useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

/**
 * Hook for reporting errors with automatic context
 */
export const useErrorReporter = () => {
  const { reportError } = useError();
  
  return React.useCallback((
    error: AppError | Error | string,
    additionalContext?: Record<string, unknown>
  ) => {
    const context = {
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      timestamp: new Date().toISOString(),
      ...additionalContext,
    };
    
    reportError(error, context);
  }, [reportError]);
};

/**
 * Hook for handling async operations with error reporting
 */
export const useAsyncError = () => {
  const reportError = useErrorReporter();

  return React.useCallback(
    (operation: () => Promise<unknown>, context?: Record<string, unknown>): Promise<unknown | null> => {
      return operation().catch((error: unknown) => {
        reportError(error instanceof Error ? error : new Error(String(error)), context);
        return null;
      });
    },
    [reportError]
  );
};

/**
 * Error notification component for displaying errors to users
 */
export const ErrorNotifications: React.FC<{
  className?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}> = ({ className, position = 'top-right' }) => {
  const { errors, clearError, config } = useError();
  
  if (!config.showUserNotifications) {
    return null;
  }

  const visibleErrors = errors.filter(error => !error.dismissed);
  
  if (visibleErrors.length === 0) {
    return null;
  }

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 space-y-2 ${className}`}>
      {visibleErrors.slice(0, 5).map(({ id, error }) => (
        <div
          key={id}
          className="bg-destructive text-destructive-foreground p-4 rounded-md shadow-lg max-w-sm"
          role="alert"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="font-medium">Error</p>
              <p className="text-sm mt-1">{getUserErrorMessage(error)}</p>
            </div>
            <button
              onClick={() => clearError(id)}
              className="ml-2 text-destructive-foreground/70 hover:text-destructive-foreground"
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};