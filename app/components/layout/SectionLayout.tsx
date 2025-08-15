import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionLayoutProps {
  /**
   * Section content
   */
  children: React.ReactNode;
  /**
   * Section title
   */
  title?: string;
  /**
   * Section subtitle or description
   */
  subtitle?: string;
  /**
   * Section ID for navigation
   */
  id?: string;
  /**
   * Additional CSS classes for the section container
   */
  className?: string;
  /**
   * Background variant
   */
  variant?: 'default' | 'muted' | 'accent';
  /**
   * Spacing size
   */
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Whether to include a separator line
   */
  withSeparator?: boolean;
  /**
   * Custom header content
   */
  headerContent?: React.ReactNode;
}

const variantClasses = {
  default: 'bg-background',
  muted: 'bg-muted/50',
  accent: 'bg-accent/5',
};

const spacingClasses = {
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-20',
};

/**
 * SectionLayout component for consistent section structure
 * 
 * @example
 * ```tsx
 * <SectionLayout 
 *   id="about"
 *   title="About Me" 
 *   subtitle="Learn more about my background"
 *   spacing="lg"
 *   withSeparator
 * >
 *   <p>Section content...</p>
 * </SectionLayout>
 * ```
 */
const SectionLayout = React.forwardRef<HTMLElement, SectionLayoutProps>(
  ({ 
    children, 
    title, 
    subtitle, 
    id, 
    className, 
    variant = 'default',
    spacing = 'md',
    withSeparator = false,
    headerContent,
    ...props 
  }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          'w-full',
          variantClasses[variant],
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section Header */}
          {(title || subtitle || headerContent) && (
            <div className="mb-8 md:mb-12">
              <div className="text-center">
                {title && (
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    {subtitle}
                  </p>
                )}
              </div>
              {headerContent && (
                <div className="mt-6">
                  {headerContent}
                </div>
              )}
              {withSeparator && (
                <div className="mt-8 flex justify-center">
                  <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
                </div>
              )}
            </div>
          )}

          {/* Section Content */}
          <div>
            {children}
          </div>
        </div>
      </section>
    );
  }
);

SectionLayout.displayName = 'SectionLayout';

export { SectionLayout };