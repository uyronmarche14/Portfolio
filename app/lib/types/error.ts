/**
 * Error handling types and interfaces
 */

/**
 * Error severity levels
 */
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Error categories for better organization
 */
export type ErrorCategory = 
  | 'validation'
  | 'authentication'
  | 'authorization'
  | 'network'
  | 'database'
  | 'file-system'
  | 'external-api'
  | 'business-logic'
  | 'system'
  | 'user-input'
  | 'configuration'
  | 'unknown';

/**
 * Error context information
 */
export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  url?: string;
  userAgent?: string;
  timestamp: Date;
  stackTrace?: string;
  additionalData?: Record<string, unknown>;
}

/**
 * Base application error interface
 */
export interface AppError {
  // Basic Error Information
  code: string;
  message: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  
  // Context and Debugging
  context?: ErrorContext;
  cause?: Error | AppError;
  
  // User-Facing Information
  userMessage?: string;
  userAction?: string;
  
  // Technical Details
  details?: unknown;
  field?: string; // For validation errors
  
  // Metadata
  timestamp: Date;
  retryable: boolean;
  logged: boolean;
}

/**
 * Validation error specific interface
 */
export interface ValidationError extends AppError {
  category: 'validation';
  field: string;
  value?: unknown;
  constraint?: string;
  validationRule?: string;
}

/**
 * Network error specific interface
 */
export interface NetworkError extends AppError {
  category: 'network';
  statusCode?: number;
  endpoint?: string;
  method?: string;
  timeout?: boolean;
}

/**
 * Database error specific interface
 */
export interface DatabaseError extends AppError {
  category: 'database';
  query?: string;
  table?: string;
  constraint?: string;
  duplicateKey?: string;
}

/**
 * External API error specific interface
 */
export interface ExternalApiError extends AppError {
  category: 'external-api';
  service: string;
  endpoint: string;
  statusCode?: number;
  responseBody?: unknown;
}

/**
 * Business logic error specific interface
 */
export interface BusinessLogicError extends AppError {
  category: 'business-logic';
  businessRule: string;
  expectedValue?: unknown;
  actualValue?: unknown;
}

/**
 * Error handler interface
 */
export interface ErrorHandler {
  handle(error: AppError): void;
  canHandle(error: AppError): boolean;
  priority: number;
}

/**
 * Error logger interface
 */
export interface ErrorLogger {
  log(error: AppError): Promise<void>;
  logBatch(errors: AppError[]): Promise<void>;
}

/**
 * Error reporter interface for external services
 */
export interface ErrorReporter {
  report(error: AppError): Promise<void>;
  reportBatch(errors: AppError[]): Promise<void>;
}

/**
 * Error recovery strategy interface
 */
export interface ErrorRecoveryStrategy {
  canRecover(error: AppError): boolean;
  recover(error: AppError): Promise<unknown>;
  maxRetries: number;
  retryDelay: number;
}

/**
 * Error boundary state interface for React error boundaries
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: AppError;
  errorInfo?: {
    componentStack: string;
  };
  retryCount: number;
  lastErrorTime?: Date;
}

/**
 * Error notification interface
 */
export interface ErrorNotification {
  id: string;
  error: AppError;
  shown: boolean;
  dismissed: boolean;
  timestamp: Date;
  autoHide?: boolean;
  duration?: number;
}

/**
 * Error statistics interface
 */
export interface ErrorStatistics {
  total: number;
  byCategory: Record<ErrorCategory, number>;
  bySeverity: Record<ErrorSeverity, number>;
  byTimeRange: {
    period: string;
    count: number;
  }[];
  mostCommon: {
    code: string;
    count: number;
    message: string;
  }[];
  trends: {
    increasing: boolean;
    percentage: number;
  };
}

/**
 * Error configuration interface
 */
export interface ErrorConfig {
  // Logging Configuration
  enableLogging: boolean;
  logLevel: ErrorSeverity;
  logToConsole: boolean;
  logToFile: boolean;
  logToExternal: boolean;
  
  // Reporting Configuration
  enableReporting: boolean;
  reportingService?: string;
  reportingApiKey?: string;
  
  // User Notification Configuration
  showUserNotifications: boolean;
  autoHideNotifications: boolean;
  notificationDuration: number;
  
  // Recovery Configuration
  enableAutoRecovery: boolean;
  maxRetries: number;
  retryDelay: number;
  
  // Development Configuration
  showStackTrace: boolean;
  showErrorDetails: boolean;
  enableErrorBoundary: boolean;
}

/**
 * Error factory for creating standardized errors
 */
export interface ErrorFactory {
  createValidationError(field: string, message: string, value?: unknown): ValidationError;
  createNetworkError(message: string, statusCode?: number, endpoint?: string): NetworkError;
  createDatabaseError(message: string, query?: string, table?: string): DatabaseError;
  createExternalApiError(service: string, endpoint: string, message: string, statusCode?: number): ExternalApiError;
  createBusinessLogicError(rule: string, message: string, expected?: unknown, actual?: unknown): BusinessLogicError;
  createGenericError(code: string, message: string, category?: ErrorCategory, severity?: ErrorSeverity): AppError;
}

/**
 * Error manager interface for centralized error handling
 */
export interface ErrorManager {
  // Error Handling
  handle(error: Error | AppError): void;
  handleAsync(error: Error | AppError): Promise<void>;
  
  // Error Registration
  registerHandler(handler: ErrorHandler): void;
  unregisterHandler(handler: ErrorHandler): void;
  
  // Error Logging and Reporting
  setLogger(logger: ErrorLogger): void;
  setReporter(reporter: ErrorReporter): void;
  
  // Error Recovery
  registerRecoveryStrategy(strategy: ErrorRecoveryStrategy): void;
  
  // Configuration
  configure(config: Partial<ErrorConfig>): void;
  getConfig(): ErrorConfig;
  
  // Statistics
  getStatistics(): ErrorStatistics;
  clearStatistics(): void;
}

/**
 * Common error codes as constants
 */
export const ERROR_CODES = {
  // Validation Errors
  VALIDATION_REQUIRED: 'VALIDATION_REQUIRED',
  VALIDATION_FORMAT: 'VALIDATION_FORMAT',
  VALIDATION_LENGTH: 'VALIDATION_LENGTH',
  VALIDATION_RANGE: 'VALIDATION_RANGE',
  
  // Authentication Errors
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  AUTH_INVALID: 'AUTH_INVALID',
  AUTH_EXPIRED: 'AUTH_EXPIRED',
  
  // Authorization Errors
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  RESOURCE_FORBIDDEN: 'RESOURCE_FORBIDDEN',
  
  // Network Errors
  NETWORK_TIMEOUT: 'NETWORK_TIMEOUT',
  NETWORK_UNAVAILABLE: 'NETWORK_UNAVAILABLE',
  NETWORK_ERROR: 'NETWORK_ERROR',
  
  // Database Errors
  DB_CONNECTION_FAILED: 'DB_CONNECTION_FAILED',
  DB_QUERY_FAILED: 'DB_QUERY_FAILED',
  DB_CONSTRAINT_VIOLATION: 'DB_CONSTRAINT_VIOLATION',
  DB_DUPLICATE_KEY: 'DB_DUPLICATE_KEY',
  
  // Resource Errors
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  RESOURCE_LOCKED: 'RESOURCE_LOCKED',
  
  // System Errors
  SYSTEM_ERROR: 'SYSTEM_ERROR',
  CONFIGURATION_ERROR: 'CONFIGURATION_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

/**
 * Type for error codes
 */
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];