/**
 * Common validation schemas using Zod
 */

import { z } from 'zod';

/**
 * Base entity schema with common fields
 */
export const BaseEntitySchema = z.object({
  id: z.string().min(1, 'ID is required'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Entity status schema
 */
export const EntityStatusSchema = z.enum(['active', 'inactive', 'draft', 'archived']);

/**
 * Priority schema
 */
export const PrioritySchema = z.enum(['low', 'medium', 'high', 'critical']);

/**
 * Image metadata schema
 */
export const ImageMetadataSchema = z.object({
  url: z.string().url('Invalid image URL'),
  alt: z.string().min(1, 'Alt text is required'),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  caption: z.string().optional(),
  placeholder: z.string().optional(),
});

/**
 * Link schema
 */
export const LinkSchema = z.object({
  url: z.string().url('Invalid URL'),
  label: z.string().min(1, 'Label is required'),
  external: z.boolean().optional(),
  icon: z.string().optional(),
});

/**
 * Date range schema
 */
export const DateRangeSchema = z.object({
  start: z.date(),
  end: z.date().optional(),
}).refine(
  (data) => !data.end || data.start <= data.end,
  {
    message: 'Start date must be before or equal to end date',
    path: ['end'],
  }
);

/**
 * Validation error schema
 */
export const ValidationErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
  code: z.string().optional(),
});

/**
 * Validation result schema
 */
export const ValidationResultSchema = z.object({
  isValid: z.boolean(),
  errors: z.array(ValidationErrorSchema),
});

/**
 * Data error schema
 */
export const DataErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
  timestamp: z.date().optional(),
});

/**
 * Data result schema
 */
export const DataResultSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema.optional(),
    error: DataErrorSchema.optional(),
    loading: z.boolean(),
  });

/**
 * API response schema
 */
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    success: z.boolean(),
    message: z.string().optional(),
    timestamp: z.date(),
  });

/**
 * Pagination parameters schema
 */
export const PaginationParamsSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive().max(100),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

/**
 * Paginated response schema
 */
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    pagination: z.object({
      page: z.number().int().positive(),
      limit: z.number().int().positive(),
      total: z.number().int().nonnegative(),
      totalPages: z.number().int().nonnegative(),
      hasNext: z.boolean(),
      hasPrev: z.boolean(),
    }),
  });

/**
 * Key-value pair schema
 */
export const KeyValuePairSchema = <T extends z.ZodTypeAny>(valueSchema: T) =>
  z.object({
    key: z.string(),
    value: valueSchema,
  });

/**
 * Theme configuration schema
 */
export const ThemeConfigSchema = z.object({
  mode: z.enum(['light', 'dark', 'system']),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
});

/**
 * SEO metadata schema
 */
export const SEOMetadataSchema = z.object({
  title: z.string().min(1, 'Title is required').max(60, 'Title should be under 60 characters'),
  description: z.string().min(1, 'Description is required').max(160, 'Description should be under 160 characters'),
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().url().optional(),
  canonicalUrl: z.string().url().optional(),
});

/**
 * Analytics event schema
 */
export const AnalyticsEventSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  properties: z.record(z.unknown()).optional(),
  timestamp: z.date(),
  userId: z.string().optional(),
  sessionId: z.string().optional(),
});

/**
 * Common validation patterns
 */
export const ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  url: /^https?:\/\/.+/,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
};

/**
 * Email validation schema
 */
export const EmailSchema = z.string().regex(ValidationPatterns.email, 'Invalid email format');

/**
 * Phone validation schema
 */
export const PhoneSchema = z.string().regex(ValidationPatterns.phone, 'Invalid phone number format');

/**
 * URL validation schema
 */
export const UrlSchema = z.string().regex(ValidationPatterns.url, 'Invalid URL format');

/**
 * UUID validation schema
 */
export const UUIDSchema = z.string().regex(ValidationPatterns.uuid, 'Invalid UUID format');

/**
 * Slug validation schema
 */
export const SlugSchema = z.string().regex(ValidationPatterns.slug, 'Invalid slug format');

/**
 * Hex color validation schema
 */
export const HexColorSchema = z.string().regex(ValidationPatterns.hexColor, 'Invalid hex color format');

/**
 * Non-empty string schema
 */
export const NonEmptyStringSchema = z.string().min(1, 'This field cannot be empty');

/**
 * Optional non-empty string schema
 */
export const OptionalNonEmptyStringSchema = z.string().min(1).optional().or(z.literal(''));

/**
 * Positive number schema
 */
export const PositiveNumberSchema = z.number().positive('Must be a positive number');

/**
 * Non-negative number schema
 */
export const NonNegativeNumberSchema = z.number().nonnegative('Must be a non-negative number');