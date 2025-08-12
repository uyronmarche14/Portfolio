/**
 * Common utility types and interfaces used throughout the application
 */

/**
 * Generic data result wrapper for handling loading states and errors
 */
export interface DataResult<T> {
  data?: T;
  error?: DataError;
  loading: boolean;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: Date;
}

/**
 * Pagination parameters for data fetching
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Generic filter parameters
 */
export interface FilterParams {
  [key: string]: string | number | boolean | string[] | number[] | undefined;
}

/**
 * Base entity interface with common fields
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Status types for various entities
 */
export type EntityStatus = 'active' | 'inactive' | 'draft' | 'archived';

/**
 * Priority levels
 */
export type Priority = 'low' | 'medium' | 'high' | 'critical';

/**
 * Generic key-value pair
 */
export interface KeyValuePair<T = string> {
  key: string;
  value: T;
}

/**
 * Image metadata interface
 */
export interface ImageMetadata {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  placeholder?: string;
}

/**
 * Link interface for external and internal links
 */
export interface Link {
  url: string;
  label: string;
  external?: boolean;
  icon?: string;
}

/**
 * Date range interface
 */
export interface DateRange {
  start: Date;
  end?: Date;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Individual validation error
 */
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

/**
 * Generic error interface
 */
export interface DataError {
  code: string;
  message: string;
  details?: unknown;
  timestamp?: Date;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

/**
 * SEO metadata interface
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

/**
 * Analytics event interface
 */
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
}