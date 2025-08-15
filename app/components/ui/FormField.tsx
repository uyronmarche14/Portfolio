import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from './shadcn/label';

export interface FormFieldProps {
  /**
   * The form field label
   */
  label?: string;
  /**
   * The form field description/help text
   */
  description?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * The form input element
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * HTML id for the input element (used for label association)
   */
  htmlFor?: string;
}

/**
 * FormField component for consistent form field layout
 * 
 * @example
 * ```tsx
 * <FormField 
 *   label="Email Address" 
 *   description="We'll never share your email"
 *   error={errors.email}
 *   required
 *   htmlFor="email"
 * >
 *   <Input id="email" type="email" />
 * </FormField>
 * ```
 */
const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ 
    label, 
    description, 
    error, 
    required, 
    children, 
    className, 
    htmlFor,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('space-y-2', className)}
        {...props}
      >
        {label && (
          <Label 
            htmlFor={htmlFor}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              error && 'text-destructive'
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-destructive" aria-label="required">
                *
              </span>
            )}
          </Label>
        )}
        
        {description && !error && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        
        <div className="relative">
          {children}
        </div>
        
        {error && (
          <p 
            className="text-sm text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export { FormField };