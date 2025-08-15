import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps {
  /**
   * Container content
   */
  children: React.ReactNode;
  /**
   * Maximum width constraint
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full';
  /**
   * Whether to center the container
   */
  centered?: boolean;
  /**
   * Padding configuration
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * HTML element type
   */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

const paddingClasses = {
  none: '',
  sm: 'px-4 py-2',
  md: 'px-4 py-4 md:px-6 md:py-6',
  lg: 'px-4 py-6 md:px-8 md:py-8',
  xl: 'px-6 py-8 md:px-12 md:py-12',
};

/**
 * Container component for consistent content width and spacing
 * 
 * @example
 * ```tsx
 * <Container maxWidth="7xl" padding="lg" centered>
 *   <h1>Content Title</h1>
 *   <p>Content goes here...</p>
 * </Container>
 * ```
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    children, 
    maxWidth = '7xl',
    centered = true,
    padding = 'md',
    className,
    as: Component = 'div',
    ...props 
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'w-full',
          maxWidthClasses[maxWidth],
          centered && 'mx-auto',
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export { Container };