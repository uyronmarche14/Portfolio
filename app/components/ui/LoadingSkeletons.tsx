"use client";

import * as React from "react";
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
} from "./Skeleton";
import { cn } from "@/lib/utils";

/**
 * Loading skeleton for project cards
 */
export const ProjectCardSkeleton: React.FC<{
  className?: string;
}> = ({ className }) => (
  <div className={cn("space-y-4 rounded-lg border p-6", className)}>
    <div className="flex items-start justify-between">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>

    <SkeletonCard className="h-48" />

    <div className="space-y-2">
      <SkeletonText className="h-3" />
      <SkeletonText className="h-3 w-5/6" />
      <SkeletonText className="h-3 w-4/6" />
    </div>

    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-16 rounded-full" />
      ))}
    </div>

    <div className="flex gap-2 pt-2">
      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-9 w-20" />
    </div>
  </div>
);

/**
 * Loading skeleton for project grid
 */
export const ProjectGridSkeleton: React.FC<{
  count?: number;
  className?: string;
}> = ({ count = 6, className }) => (
  <div
    className={cn(
      "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
      className
    )}
  >
    {Array.from({ length: count }).map((_, i) => (
      <ProjectCardSkeleton key={i} />
    ))}
  </div>
);

/**
 * Loading skeleton for about section
 */
export const AboutSectionSkeleton: React.FC<{
  className?: string;
}> = ({ className }) => (
  <div className={cn("space-y-8", className)}>
    {/* Header */}
    <div className="space-y-4 text-center">
      <Skeleton className="mx-auto h-10 w-48" />
      <div className="mx-auto max-w-2xl space-y-2">
        <SkeletonText />
        <SkeletonText className="mx-auto w-5/6" />
        <SkeletonText className="mx-auto w-4/6" />
      </div>
    </div>

    {/* Profile section */}
    <div className="flex flex-col items-center gap-8 md:flex-row">
      <SkeletonAvatar className="h-32 w-32" />
      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <SkeletonText />
          <SkeletonText className="w-5/6" />
          <SkeletonText className="w-4/6" />
          <SkeletonText className="w-3/6" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
      </div>
    </div>

    {/* Timeline */}
    <div className="space-y-6">
      <Skeleton className="h-8 w-32" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <Skeleton className="h-4 w-4 rounded-full" />
            {i < 3 && <Skeleton className="mt-2 h-16 w-0.5" />}
          </div>
          <div className="flex-1 space-y-2 pb-8">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
            <div className="space-y-1">
              <SkeletonText className="h-3" />
              <SkeletonText className="h-3 w-5/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Loading skeleton for contact section
 */
export const ContactSectionSkeleton: React.FC<{
  className?: string;
}> = ({ className }) => (
  <div className={cn("space-y-8", className)}>
    {/* Header */}
    <div className="space-y-4 text-center">
      <Skeleton className="mx-auto h-10 w-40" />
      <div className="mx-auto max-w-lg space-y-2">
        <SkeletonText />
        <SkeletonText className="mx-auto w-4/6" />
      </div>
    </div>

    {/* Contact form */}
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>

    {/* Contact info */}
    <div className="flex justify-center gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * Loading skeleton for navigation
 */
export const NavigationSkeleton: React.FC<{
  className?: string;
}> = ({ className }) => (
  <nav className={cn("flex items-center justify-between p-4", className)}>
    <Skeleton className="h-8 w-32" />
    <div className="hidden gap-6 md:flex">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-16" />
      ))}
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-8 w-8 md:hidden" />
    </div>
  </nav>
);

/**
 * Loading skeleton for hero section
 */
export const HeroSectionSkeleton: React.FC<{
  className?: string;
}> = ({ className }) => (
  <div className={cn("space-y-8 py-20 text-center", className)}>
    <div className="space-y-4">
      <Skeleton className="mx-auto h-12 w-80" />
      <Skeleton className="mx-auto h-8 w-96" />
      <div className="mx-auto max-w-2xl space-y-2">
        <SkeletonText />
        <SkeletonText className="mx-auto w-5/6" />
        <SkeletonText className="mx-auto w-4/6" />
      </div>
    </div>

    <div className="flex justify-center gap-4">
      <Skeleton className="h-12 w-32" />
      <Skeleton className="h-12 w-28" />
    </div>

    <div className="flex justify-center gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-10 rounded-full" />
      ))}
    </div>
  </div>
);

/**
 * Loading skeleton for technology grid
 */
export const TechnologyGridSkeleton: React.FC<{
  count?: number;
  className?: string;
}> = ({ count = 12, className }) => (
  <div
    className={cn(
      "grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6",
      className
    )}
  >
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="flex flex-col items-center gap-2 rounded-lg border p-4"
      >
        <Skeleton className="h-12 w-12" />
        <Skeleton className="h-4 w-16" />
      </div>
    ))}
  </div>
);

/**
 * Loading skeleton for project detail page
 */
export const ProjectDetailSkeleton: React.FC<{
  className?: string;
}> = ({ className }) => (
  <div className={cn("space-y-8", className)}>
    {/* Header */}
    <div className="space-y-4">
      <Skeleton className="h-12 w-3/4" />
      <div className="space-y-2">
        <SkeletonText />
        <SkeletonText className="w-5/6" />
        <SkeletonText className="w-4/6" />
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>
    </div>

    {/* Main image */}
    <SkeletonCard className="h-96" />

    {/* Content sections */}
    <div className="grid gap-8 md:grid-cols-3">
      <div className="space-y-6 md:col-span-2">
        <div className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-2">
            <SkeletonText />
            <SkeletonText className="w-5/6" />
            <SkeletonText className="w-4/6" />
            <SkeletonText className="w-3/6" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-24" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-20" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Full page loading skeleton
 */
export const PageSkeleton: React.FC<{
  includeNav?: boolean;
  className?: string;
}> = ({ includeNav = true, className }) => (
  <div className={cn("min-h-screen", className)}>
    {includeNav && <NavigationSkeleton />}
    <main className="container mx-auto space-y-12 px-4 py-8">
      <HeroSectionSkeleton />
      <ProjectGridSkeleton count={3} />
      <AboutSectionSkeleton />
      <ContactSectionSkeleton />
    </main>
  </div>
);
