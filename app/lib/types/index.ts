/**
 * Core TypeScript interfaces and types for the portfolio application
 * This file contains all the main type definitions used throughout the application
 */

// Re-export all types for easy importing
export * from './common';
export * from './repository';
export * from './technology';
export * from './project';
export * from './contact';
export * from './about';

// Handle conflicting exports explicitly
export type { ValidationError as AppValidationError } from './error';
export type { ErrorHandler as AppErrorHandler } from './error';
export type { ErrorCallback as AppErrorCallback } from './utils';

// Export non-conflicting items from error and aliases
export type {
  ErrorSeverity,
  ErrorCategory,
  ErrorContext,
  AppError,
  NetworkError,
  DatabaseError,
  ExternalApiError,
  BusinessLogicError,
  ErrorLogger,
  ErrorReporter,
  ErrorRecoveryStrategy,
  ErrorBoundaryState,
  ErrorNotification,
  ErrorStatistics
} from './error';

// Export non-conflicting items from aliases
export type {
  ID,
  Timestamp,
  OptionalId,
  CreateInput,
  UpdateInput,
  EntityWithTimestamps,
  EntityWithoutTimestamps,
  Nullable,
  Optional,
  Maybe,
  NonNullable,
  DeepPartial,
  DeepRequired,
  Exact,
  UnionToIntersection,
  Flatten,
  Mutable,
  Immutable,
  KeyValue,
  StringLiteral,
  NumberLiteral,
  Primitive,
  Serializable,
  AnyFunction,
  VoidFunction,
  AsyncFunction,
  EventHandler,
  Callback,
  CallbackWithArgs,
  PromiseResolver,
  PromiseRejecter,
  Constructor,
  AbstractConstructor,
  Class
} from './aliases';

// Type guards and utility functions
export * from './utils';