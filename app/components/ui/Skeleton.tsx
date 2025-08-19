import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const skeletonVariants = cva(
  'animate-pulse rounded-md bg-muted',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        card: 'bg-card border',
        text: 'bg-muted/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

/**
 * Skeleton component for loading states
 * 
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-[250px]" />
 * <Skeleton className="h-12 w-12 rounded-full" />
 * ```
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

/**
 * Predefined skeleton components for common use cases
 */
const SkeletonText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Skeleton
    ref={ref}
    variant="text"
    className={cn('h-4 w-full', className)}
    {...props}
  />
));

SkeletonText.displayName = 'SkeletonText';

const SkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Skeleton
    ref={ref}
    className={cn('h-12 w-12 rounded-full', className)}
    {...props}
  />
));

SkeletonAvatar.displayName = 'SkeletonAvatar';

const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Skeleton
    ref={ref}
    variant="card"
    className={cn('h-32 w-full', className)}
    {...props}
  />
));

SkeletonCard.displayName = 'SkeletonCard';

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonAvatar, 
  SkeletonCard,
  skeletonVariants 
};