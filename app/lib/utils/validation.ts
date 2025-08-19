/**
 * Validation utilities
 * Functions for validating data, forms, and user input
 */

import type { ValidationResult, ValidationError } from '@/lib/types';

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * URL validation regex
 */
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

/**
 * Phone number validation regex (basic international format)
 */
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

/**
 * Validate email address
 */
export function validateEmail(email: string): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!email) {
    errors.push({
      field: 'email',
      message: 'Email is required',
      code: 'REQUIRED',
    });
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push({
      field: 'email',
      message: 'Please enter a valid email address',
      code: 'INVALID_FORMAT',
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate URL
 */
export function validateUrl(url: string, required = false): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!url) {
    if (required) {
      errors.push({
        field: 'url',
        message: 'URL is required',
        code: 'REQUIRED',
      });
    }
  } else if (!URL_REGEX.test(url)) {
    errors.push({
      field: 'url',
      message: 'Please enter a valid URL',
      code: 'INVALID_FORMAT',
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string, required = false): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!phone) {
    if (required) {
      errors.push({
        field: 'phone',
        message: 'Phone number is required',
        code: 'REQUIRED',
      });
    }
  } else if (!PHONE_REGEX.test(phone.replace(/[\s\-\(\)]/g, ''))) {
    errors.push({
      field: 'phone',
      message: 'Please enter a valid phone number',
      code: 'INVALID_FORMAT',
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate string length
 */
export function validateLength(
  value: string,
  field: string,
  options: {
    min?: number;
    max?: number;
    required?: boolean;
  } = {}
): ValidationResult {
  const { min, max, required = false } = options;
  const errors: ValidationError[] = [];
  
  if (!value || value.trim().length === 0) {
    if (required) {
      errors.push({
        field,
        message: `${field} is required`,
        code: 'REQUIRED',
      });
    }
    return { isValid: errors.length === 0, errors };
  }
  
  const length = value.trim().length;
  
  if (min !== undefined && length < min) {
    errors.push({
      field,
      message: `${field} must be at least ${min} characters long`,
      code: 'MIN_LENGTH',
    });
  }
  
  if (max !== undefined && length > max) {
    errors.push({
      field,
      message: `${field} must be no more than ${max} characters long`,
      code: 'MAX_LENGTH',
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate number range
 */
export function validateNumber(
  value: number | string,
  field: string,
  options: {
    min?: number;
    max?: number;
    required?: boolean;
    integer?: boolean;
  } = {}
): ValidationResult {
  const { min, max, required = false, integer = false } = options;
  const errors: ValidationError[] = [];
  
  if (value === undefined || value === null || value === '') {
    if (required) {
      errors.push({
        field,
        message: `${field} is required`,
        code: 'REQUIRED',
      });
    }
    return { isValid: errors.length === 0, errors };
  }
  
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) {
    errors.push({
      field,
      message: `${field} must be a valid number`,
      code: 'INVALID_TYPE',
    });
    return { isValid: false, errors };
  }
  
  if (integer && !Number.isInteger(num)) {
    errors.push({
      field,
      message: `${field} must be a whole number`,
      code: 'INVALID_TYPE',
    });
  }
  
  if (min !== undefined && num < min) {
    errors.push({
      field,
      message: `${field} must be at least ${min}`,
      code: 'MIN_VALUE',
    });
  }
  
  if (max !== undefined && num > max) {
    errors.push({
      field,
      message: `${field} must be no more than ${max}`,
      code: 'MAX_VALUE',
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate date
 */
export function validateDate(
  value: Date | string,
  field: string,
  options: {
    required?: boolean;
    minDate?: Date;
    maxDate?: Date;
    futureOnly?: boolean;
    pastOnly?: boolean;
  } = {}
): ValidationResult {
  const { required = false, minDate, maxDate, futureOnly = false, pastOnly = false } = options;
  const errors: ValidationError[] = [];
  
  if (!value) {
    if (required) {
      errors.push({
        field,
        message: `${field} is required`,
        code: 'REQUIRED',
      });
    }
    return { isValid: errors.length === 0, errors };
  }
  
  const date = typeof value === 'string' ? new Date(value) : value;
  
  if (isNaN(date.getTime())) {
    errors.push({
      field,
      message: `${field} must be a valid date`,
      code: 'INVALID_FORMAT',
    });
    return { isValid: false, errors };
  }
  
  const now = new Date();
  
  if (futureOnly && date <= now) {
    errors.push({
      field,
      message: `${field} must be in the future`,
      code: 'INVALID_DATE',
    });
  }
  
  if (pastOnly && date >= now) {
    errors.push({
      field,
      message: `${field} must be in the past`,
      code: 'INVALID_DATE',
    });
  }
  
  if (minDate && date < minDate) {
    errors.push({
      field,
      message: `${field} must be after ${minDate.toLocaleDateString()}`,
      code: 'MIN_DATE',
    });
  }
  
  if (maxDate && date > maxDate) {
    errors.push({
      field,
      message: `${field} must be before ${maxDate.toLocaleDateString()}`,
      code: 'MAX_DATE',
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate array
 */
export function validateArray<T>(
  value: T[],
  field: string,
  options: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    itemValidator?: (item: T, index: number) => ValidationResult;
  } = {}
): ValidationResult {
  const { required = false, minLength, maxLength, itemValidator } = options;
  const errors: ValidationError[] = [];
  
  if (!value || !Array.isArray(value)) {
    if (required) {
      errors.push({
        field,
        message: `${field} is required`,
        code: 'REQUIRED',
      });
    }
    return { isValid: errors.length === 0, errors };
  }
  
  if (minLength !== undefined && value.length < minLength) {
    errors.push({
      field,
      message: `${field} must have at least ${minLength} item${minLength === 1 ? '' : 's'}`,
      code: 'MIN_LENGTH',
    });
  }
  
  if (maxLength !== undefined && value.length > maxLength) {
    errors.push({
      field,
      message: `${field} must have no more than ${maxLength} item${maxLength === 1 ? '' : 's'}`,
      code: 'MAX_LENGTH',
    });
  }
  
  // Validate individual items if validator provided
  if (itemValidator) {
    value.forEach((item, index) => {
      const itemResult = itemValidator(item, index);
      if (!itemResult.isValid) {
        errors.push(...itemResult.errors.map(error => ({
          ...error,
          field: `${field}[${index}].${error.field}`,
        })));
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate object against schema
 */
export function validateObject<T extends Record<string, unknown>>(
  value: T,
  schema: Record<keyof T, (value: unknown, field: string) => ValidationResult>
): ValidationResult {
  const errors: ValidationError[] = [];
  
  Object.entries(schema).forEach(([field, validator]) => {
    const fieldValue = value[field as keyof T];
    const result = validator(fieldValue, field);
    
    if (!result.isValid) {
      errors.push(...result.errors);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate contact form data
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): ValidationResult {
  const errors: ValidationError[] = [];
  
  // Validate name
  const nameResult = validateLength(data.name, 'name', { required: true, min: 2, max: 100 });
  errors.push(...nameResult.errors);
  
  // Validate email
  const emailResult = validateEmail(data.email);
  errors.push(...emailResult.errors);
  
  // Validate subject (optional)
  if (data.subject) {
    const subjectResult = validateLength(data.subject, 'subject', { max: 200 });
    errors.push(...subjectResult.errors);
  }
  
  // Validate message
  const messageResult = validateLength(data.message, 'message', { required: true, min: 10, max: 2000 });
  errors.push(...messageResult.errors);
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate project data
 */
export function validateProjectData(data: {
  title: string;
  description: string;
  category: string;
  status: string;
  technologies: string[];
  links: Array<{ url: string; label: string }>;
}): ValidationResult {
  const errors: ValidationError[] = [];
  
  // Validate title
  const titleResult = validateLength(data.title, 'title', { required: true, min: 3, max: 100 });
  errors.push(...titleResult.errors);
  
  // Validate description
  const descriptionResult = validateLength(data.description, 'description', { required: true, min: 10, max: 1000 });
  errors.push(...descriptionResult.errors);
  
  // Validate category
  const validCategories = ['web', 'mobile', 'desktop', 'api', 'library', 'other'];
  if (!validCategories.includes(data.category)) {
    errors.push({
      field: 'category',
      message: 'Please select a valid category',
      code: 'INVALID_VALUE',
    });
  }
  
  // Validate status
  const validStatuses = ['planning', 'active', 'completed', 'on-hold', 'archived'];
  if (!validStatuses.includes(data.status)) {
    errors.push({
      field: 'status',
      message: 'Please select a valid status',
      code: 'INVALID_VALUE',
    });
  }
  
  // Validate technologies
  const technologiesResult = validateArray(data.technologies, 'technologies', {
    required: true,
    minLength: 1,
    maxLength: 20,
  });
  errors.push(...technologiesResult.errors);
  
  // Validate links
  if (data.links && data.links.length > 0) {
    data.links.forEach((link, index) => {
      const urlResult = validateUrl(link.url, true);
      if (!urlResult.isValid) {
        errors.push(...urlResult.errors.map(error => ({
          ...error,
          field: `links[${index}].url`,
        })));
      }
      
      const labelResult = validateLength(link.label, 'label', { required: true, max: 50 });
      if (!labelResult.isValid) {
        errors.push(...labelResult.errors.map(error => ({
          ...error,
          field: `links[${index}].label`,
        })));
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize HTML string (basic)
 */
export function sanitizeHtml(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Validate and sanitize user input
 */
export function sanitizeInput(input: string, options: {
  maxLength?: number;
  allowHtml?: boolean;
  trim?: boolean;
} = {}): string {
  const { maxLength, allowHtml = false, trim = true } = options;
  
  let sanitized = input;
  
  if (trim) {
    sanitized = sanitized.trim();
  }
  
  if (!allowHtml) {
    sanitized = sanitizeHtml(sanitized);
  }
  
  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
}

/**
 * Check if value is safe for database storage
 */
export function isSafeForStorage(value: unknown): boolean {
  if (typeof value === 'string') {
    // Check for potential SQL injection patterns
    const dangerousPatterns = [
      /('|\'|;|%|<|>|{|}|\[|\]|\(|\)|\*|\||--|\/\*|\*\/)/i,
      /(script|javascript|vbscript|onload|onerror|onclick|eval|expression)/i,
    ];
    
    return !dangerousPatterns.some(pattern => pattern.test(value));
  }
  
  return true;
}