import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Base skeleton component
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted',
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Card skeleton for project cards, blog posts, etc.
 */
export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('rounded-lg border bg-card p-6 shadow-sm', className)}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex space-x-1">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        
        {/* Features */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  );
};

/**
 * Navigation skeleton
 */
export const NavigationSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('border-b bg-background/95 backdrop-blur', className)}>
      <div className="container flex h-16 items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <div className="hidden space-x-6 md:flex">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16" />
          ))}
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};

/**
 * Footer skeleton
 */
export const FooterSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('border-t bg-muted/50 py-8', className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-32" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Hero section skeleton
 */
export const HeroSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex min-h-screen items-center justify-center', className)}>
      <div className="container text-center">
        <div className="space-y-6">
          <Skeleton className="mx-auto h-12 w-3/4 md:h-16" />
          <Skeleton className="mx-auto h-8 w-1/2" />
          <div className="space-y-2">
            <Skeleton className="mx-auto h-4 w-2/3" />
            <Skeleton className="mx-auto h-4 w-1/2" />
          </div>
          <div className="flex justify-center space-x-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * About section skeleton
 */
export const AboutSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('py-16', className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Image skeleton */}
          <div className="flex justify-center">
            <Skeleton className="aspect-[4/3] w-full max-w-md rounded-2xl" />
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            
            <div className="space-y-6">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Projects section skeleton
 */
export const ProjectsSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('py-16', className)}>
      <div className="container">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <Skeleton className="mx-auto h-12 w-64" />
            <Skeleton className="mx-auto h-4 w-96" />
          </div>
          
          {/* Filter */}
          <Skeleton className="h-12 w-full rounded-2xl" />
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Timeline skeleton
 */
export const TimelineSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('py-16', className)}>
      <div className="container">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <Skeleton className="mx-auto h-10 w-48" />
            <Skeleton className="mx-auto h-4 w-64" />
          </div>
          
          {/* Timeline items */}
          <div className="relative space-y-12">
            {/* Central line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-muted" />
            
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`relative flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                {/* Dot */}
                <div className="absolute left-1/2 top-4 h-4 w-4 -translate-x-1/2 rounded-full bg-muted" />
                
                {/* Content */}
                <div className={`w-5/12 space-y-4 ${i % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <Skeleton className="h-8 w-16 rounded-full" />
                  <div className="space-y-3 rounded-lg border p-4">
                    <Skeleton className="h-6 w-3/4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Full page skeleton with all sections
 */
export const PageSkeleton: React.FC<{
  includeNav?: boolean;
  includeHero?: boolean;
  includeAbout?: boolean;
  includeProjects?: boolean;
  includeTimeline?: boolean;
  includeFooter?: boolean;
  className?: string;
}> = ({
  includeNav = true,
  includeHero = true,
  includeAbout = true,
  includeProjects = true,
  includeTimeline = true,
  includeFooter = true,
  className
}) => {
  return (
    <div className={cn('min-h-screen', className)}>
      {includeNav && <NavigationSkeleton />}
      {includeHero && <HeroSkeleton />}
      {includeAbout && <AboutSkeleton />}
      {includeProjects && <ProjectsSkeleton />}
      {includeTimeline && <TimelineSkeleton />}
      {includeFooter && <FooterSkeleton />}
    </div>
  );
};