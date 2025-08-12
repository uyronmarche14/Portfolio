/**
 * Validation utility functions and error handling
 */

import { z } from 'zod';
import { ValidationError, ValidationResult } from '@/types';

/**
 * Generic validation function that returns a standardized result
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return {
      isValid: true,
      errors: [],
    };
  }
  
  const errors: ValidationError[] = result.error.errors.map((error) => ({
    field: error.path.join('.'),
    message: error.message,
    code: error.code,
  }));
  
  return {
    isValid: false,
    errors,
  };
}

/**
 * Async validation function for complex validations
 */
export async function validateDataAsync<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<ValidationResult> {
  try {
    const result = await schema.safeParseAsync(data);
    
    if (result.success) {
      return {
        isValid: true,
        errors: [],
      };
    }
    
    const errors: ValidationError[] = result.error.errors.map((error) => ({
      field: error.path.join('.'),
      message: error.message,
      code: error.code,
    }));
    
    return {
      isValid: false,
      errors,
    };
  } catch (error) {
    return {
      isValid: false,
      errors: [{
        field: 'unknown',
        message: error instanceof Error ? error.message : 'Unknown validation error',
        code: 'VALIDATION_ERROR',
      }],
    };
  }
}

/**
 * Validate and parse data, throwing an error if validation fails
 */
export function parseAndValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  errorMessage?: string
): T {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.errors.map(error => 
      `${error.path.join('.')}: ${error.message}`
    ).join(', ');
    
    throw new Error(errorMessage || `Validation failed: ${errors}`);
  }
  
  return result.data;
}

/**
 * Validate multiple data objects with different schemas
 */
export function validateMultiple(
  validations: Array<{
    schema: z.ZodSchema<any>;
    data: unknown;
    name: string;
  }>
): ValidationResult {
  const allErrors: ValidationError[] = [];
  
  for (const validation of validations) {
    const result = validateData(validation.schema, validation.data);
    
    if (!result.isValid) {
      // Prefix field names with the validation name
      const prefixedErrors = result.errors.map(error => ({
        ...error,
        field: `${validation.name}.${error.field}`,
      }));
      
      allErrors.push(...prefixedErrors);
    }
  }
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
}

/**
 * Create a validation error with consistent formatting
 */
export function createValidationError(
  field: string,
  message: string,
  code?: string
): ValidationError {
  return {
    field,
    message,
    code: code || 'VALIDATION_ERROR',
  };
}

/**
 * Format validation errors for display
 */
export function formatValidationErrors(errors: ValidationError[]): string {
  if (errors.length === 0) return '';
  
  if (errors.length === 1) {
    return errors[0].message;
  }
  
  return errors.map(error => `• ${error.message}`).join('\n');
}

/**
 * Get validation errors for a specific field
 */
export function getFieldErrors(
  errors: ValidationError[],
  fieldName: string
): ValidationError[] {
  return errors.filter(error => 
    error.field === fieldName || error.field.startsWith(`${fieldName}.`)
  );
}

/**
 * Check if a specific field has validation errors
 */
export function hasFieldError(
  errors: ValidationError[],
  fieldName: string
): boolean {
  return getFieldErrors(errors, fieldName).length > 0;
}

/**
 * Get the first error message for a specific field
 */
export function getFirstFieldError(
  errors: ValidationError[],
  fieldName: string
): string | undefined {
  const fieldErrors = getFieldErrors(errors, fieldName);
  return fieldErrors.length > 0 ? fieldErrors[0].message : undefined;
}

/**
 * Group validation errors by field
 */
export function groupErrorsByField(
  errors: ValidationError[]
): Record<string, ValidationError[]> {
  const grouped: Record<string, ValidationError[]> = {};
  
  for (const error of errors) {
    if (!grouped[error.field]) {
      grouped[error.field] = [];
    }
    grouped[error.field].push(error);
  }
  
  return grouped;
}

/**
 * Sanitize and validate user input
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[<>]/g, ''); // Remove potential HTML tags
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate phone number format
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Custom Zod refinement for unique array values
 */
export function uniqueArray<T>(
  message = 'Array must contain unique values'
) {
  return (arr: T[]) => {
    const seen = new Set();
    for (const item of arr) {
      const key = typeof item === 'object' ? JSON.stringify(item) : item;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
    }
    return true;
  };
}

/**
 * Custom Zod refinement for date ranges
 */
export function validDateRange(
  startField: string,
  endField: string,
  message = 'End date must be after start date'
) {
  return (obj: Record<string, any>) => {
    const start = obj[startField];
    const end = obj[endField];
    
    if (!start || !end) return true; // Skip validation if either date is missing
    
    return new Date(start) <= new Date(end);
  };
}

/**
 * Custom Zod refinement for conditional required fields
 */
export function conditionalRequired(
  conditionField: string,
  conditionValue: any,
  requiredField: string,
  message = 'This field is required'
) {
  return (obj: Record<string, any>) => {
    if (obj[conditionField] === conditionValue) {
      return obj[requiredField] !== undefined && obj[requiredField] !== null && obj[requiredField] !== '';
    }
    return true;
  };
}

/**
 * Debounced validation function for real-time validation
 */
export function createDebouncedValidator<T>(
  schema: z.ZodSchema<T>,
  delay = 300
) {
  let timeoutId: NodeJS.Timeout;
  
  return (data: unknown, callback: (result: ValidationResult) => void) => {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      const result = validateData(schema, data);
      callback(result);
    }, delay);
  };
}

/**
 * Validation middleware for API routes
 */
export function createValidationMiddleware<T>(schema: z.ZodSchema<T>) {
  return (data: unknown) => {
    const result = schema.safeParse(data);
    
    if (!result.success) {
      const errors = result.error.errors.map(error => ({
        field: error.path.join('.'),
        message: error.message,
        code: error.code,
      }));
      
      throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
    }
    
    return result.data;
  };
}