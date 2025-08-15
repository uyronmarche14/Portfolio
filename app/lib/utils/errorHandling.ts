/**
 * Error handling utilities
 * Functions for creating, managing, and handling errors consistently
 */

import { AppError, ErrorCategory, ErrorSeverity, ErrorContext, DataError } from '@/lib/types';

/**
 * Create a standardized application error
 */
export function createAppError(
  code: string,
  message: string,
  category: ErrorCategory = 'unknown',
  severity: ErrorSeverity = 'medium',
  options: {
    cause?: Error | AppError;
    context?: Partial<ErrorContext>;
    userMessage?: string;
    userAction?: string;
    details?: unknown;
    field?: string;
    retryable?: boolean;
  } = {}
): AppError {
  const {
    cause,
    context,
    userMessage,
    userAction,
    details,
    field,
    retryable = false,
  } = options;

  return {
    code,
    message,
    category,
    severity,
    context: context ? {
      timestamp: new Date(),
      ...context,
    } : undefined,
    cause,
    userMessage,
    userAction,
    details,
    field,
    timestamp: new Date(),
    retryable,
    logged: false,
  };
}

/**
 * Create a validation error
 */
export function createValidationError(
  field: string,
  message: string,
  value?: unknown,
  constraint?: string
): AppError {
  return createAppError(
    'VALIDATION_ERROR',
    message,
    'validation',
    'low',
    {
      field,
      details: { value, constraint },
      userMessage: message,
      userAction: 'Please correct the highlighted field and try again.',
    }
  );
}

/**
 * Create a network error
 */
export function createNetworkError(
  message: string,
  statusCode?: number,
  endpoint?: string,
  method?: string
): AppError {
  return createAppError(
    'NETWORK_ERROR',
    message,
    'network',
    'high',
    {
      details: { statusCode, endpoint, method },
      userMessage: 'Unable to connect to the server. Please check your internet connection.',
      userAction: 'Please try again in a moment.',
      retryable: true,
    }
  );
}

/**
 * Create a data error
 */
export function createDataError(
  message: string,
  code: string = 'DATA_ERROR',
  details?: unknown
): DataError {
  return {
    code,
    message,
    details,
    timestamp: new Date(),
  };
}

/**
 * Create a business logic error
 */
export function createBusinessLogicError(
  rule: string,
  message: string,
  expected?: unknown,
  actual?: unknown
): AppError {
  return createAppError(
    'BUSINESS_LOGIC_ERROR',
    message,
    'business-logic',
    'medium',
    {
      details: { rule, expected, actual },
      userMessage: message,
      userAction: 'Please review your input and try again.',
    }
  );
}

/**
 * Create a not found error
 */
export function createNotFoundError(
  resource: string,
  id?: string
): AppError {
  const message = id 
    ? `${resource} with ID '${id}' was not found`
    : `${resource} was not found`;

  return createAppError(
    'NOT_FOUND',
    message,
    'business-logic',
    'low',
    {
      details: { resource, id },
      userMessage: `The requested ${resource.toLowerCase()} could not be found.`,
      userAction: 'Please check the URL or try searching for what you need.',
    }
  );
}

/**
 * Create an unauthorized error
 */
export function createUnauthorizedError(
  action?: string
): AppError {
  const message = action 
    ? `You are not authorized to ${action}`
    : 'You are not authorized to perform this action';

  return createAppError(
    'UNAUTHORIZED',
    message,
    'authorization',
    'high',
    {
      details: { action },
      userMessage: 'You do not have permission to perform this action.',
      userAction: 'Please log in or contact an administrator.',
    }
  );
}

/**
 * Create a timeout error
 */
export function createTimeoutError(
  operation: string,
  timeout: number
): AppError {
  return createAppError(
    'TIMEOUT_ERROR',
    `Operation '${operation}' timed out after ${timeout}ms`,
    'network',
    'medium',
    {
      details: { operation, timeout },
      userMessage: 'The operation is taking longer than expected.',
      userAction: 'Please try again in a moment.',
      retryable: true,
    }
  );
}

/**
 * Wrap a native error into an AppError
 */
export function wrapError(
  error: Error,
  code: string = 'UNKNOWN_ERROR',
  category: ErrorCategory = 'system',
  severity: ErrorSeverity = 'medium'
): AppError {
  return createAppError(
    code,
    error.message,
    category,
    severity,
    {
      cause: error,
      context: {
        stackTrace: error.stack,
      },
      userMessage: 'An unexpected error occurred.',
      userAction: 'Please try again or contact support if the problem persists.',
    }
  );
}

/**
 * Check if an error is retryable
 */
export function isRetryableError(error: AppError | Error): boolean {
  if ('retryable' in error) {
    return error.retryable;
  }

  // Default retry logic for common error types
  if ('code' in error) {
    const retryableCodes = [
      'NETWORK_ERROR',
      'TIMEOUT_ERROR',
      'SERVICE_UNAVAILABLE',
      'RATE_LIMITED',
    ];
    return retryableCodes.includes(error.stack);
  }

  return false;
}

/**
 * Get user-friendly error message
 */
export function getUserErrorMessage(error: AppError | Error | string): string {
  if (typeof error === 'string') {
    return error;
  }

  if ('userMessage' in error && error.userMessage) {
    return error.userMessage;
  }

  if ('message' in error) {
    return error.message;
  }

  return 'An unexpected error occurred.';
}

/**
 * Get user action suggestion
 */
export function getUserErrorAction(error: AppError | Error): string {
  if ('userAction' in error && error.userAction) {
    return error.userAction;
  }

  // Default actions based on error category
  if ('category' in error) {
    switch (error.category) {
      case 'network':
        return 'Please check your internet connection and try again.';
      case 'validation':
        return 'Please correct the highlighted fields and try again.';
      case 'authentication':
        return 'Please log in and try again.';
      case 'authorization':
        return 'Please contact an administrator for access.';
      default:
        return 'Please try again or contact support if the problem persists.';
    }
  }

  return 'Please try again or contact support if the problem persists.';
}

/**
 * Log error with appropriate level
 */
export function logError(error: AppError | Error, context?: Record<string, unknown>): void {
  const severity = 'severity' in error ? error.severity : 'medium';
  const logData = {
    error: {
      code: 'code' in error ? error.code : 'UNKNOWN_ERROR',
      message: error.message,
      stack: error,
      category: 'category' in error ? error.category : 'unknown',
      severity,
    },
    context,
    timestamp: new Date().toISOString(),
  };

  switch (severity) {
    case 'critical':
      console.error('CRITICAL ERROR:', logData);
      break;
    case 'high':
      console.error('HIGH SEVERITY ERROR:', logData);
      break;
    case 'medium':
      console.warn('MEDIUM SEVERITY ERROR:', logData);
      break;
    case 'low':
      console.info('LOW SEVERITY ERROR:', logData);
      break;
    default:
      console.log('ERROR:', logData);
  }

  // Mark as logged if it's an AppError
  if ('logged' in error) {
    error.logged = true;
  }
}

/**
 * Create error boundary error
 */
export function createErrorBoundaryError(
  error: Error,
  errorInfo: { componentStack: string }
): AppError {
  return createAppError(
    'REACT_ERROR_BOUNDARY',
    `React component error: ${error.message}`,
    'system',
    'high',
    {
      cause: error,
      context: {
        stackTrace: error.stack,
        additionalData: errorInfo,
      },
      userMessage: 'Something went wrong with this part of the page.',
      userAction: 'Please refresh the page or try again later.',
    }
  );
}

/**
 * Handle async errors with proper logging
 */
export async function handleAsyncError<T>(
  operation: () => Promise<T>,
  errorHandler?: (error: AppError) => void
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    const appError = error instanceof Error 
      ? wrapError(error)
      : createAppError('UNKNOWN_ERROR', 'An unknown error occurred');

    logError(appError);
    
    if (errorHandler) {
      errorHandler(appError);
    }

    return null;
  }
}

/**
 * Retry operation with exponential backoff
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  options: {
    maxRetries?: number;
    baseDelay?: number;
    maxDelay?: number;
    backoffFactor?: number;
    shouldRetry?: (error: Error) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
    shouldRetry = isRetryableError,
  } = options;

  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxRetries || !shouldRetry(lastError)) {
        throw lastError;
      }

      const delay = Math.min(baseDelay * Math.pow(backoffFactor, attempt), maxDelay);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

/**
 * Create error summary for reporting
 */
export function createErrorSummary(errors: AppError[]): {
  total: number;
  byCategory: Record<ErrorCategory, number>;
  bySeverity: Record<ErrorSeverity, number>;
  mostCommon: Array<{ code: string; count: number; message: string }>;
} {
  const byCategory = {} as Record<ErrorCategory, number>;
  const bySeverity = {} as Record<ErrorSeverity, number>;
  const codeCount = new Map<string, { count: number; message: string }>();

  errors.forEach(error => {
    // Count by category
    byCategory[error.category] = (byCategory[error.category] || 0) + 1;
    
    // Count by severity
    bySeverity[error.severity] = (bySeverity[error.severity] || 0) + 1;
    
    // Count by code
    const existing = codeCount.get(error.code);
    if (existing) {
      existing.count++;
    } else {
      codeCount.set(error.code, { count: 1, message: error.message });
    }
  });

  const mostCommon = Array.from(codeCount.entries())
    .map(([code, data]) => ({ code, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    total: errors.length,
    byCategory,
    bySeverity,
    mostCommon,
  };
}