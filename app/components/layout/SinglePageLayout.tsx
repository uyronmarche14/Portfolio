"use client";

import React from "react";
import dynamic from "next/dynamic";
import { CleanGridBackground } from "@/components/ui/bgRipple";

// Dynamic imports for heavy components
const HomeSection = dynamic(() => import("@/components/features/portfolio/HomeSection"), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
  ssr: true,
});

const AboutSection = dynamic(() => import("@/components/features/about/AboutSection"), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
  ssr: true,
});

const ProjectsSection = dynamic(() => import("@/components/features/projects/ProjectsSection"), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
  ssr: true,
});

const ContactSection = dynamic(() => import("@/components/features/contact/ContactSection"), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
  ssr: true,
});

const Footer = dynamic(() => import("@/components/layout/footer"), {
  loading: () => <div className="py-8 flex items-center justify-center">Loading...</div>,
  ssr: true,
});

import { PageLayout } from "./PageLayout";
import { SectionLayout } from "./SectionLayout";

/**
 * SinglePageLayout component using dynamic imports for performance optimization
 *
 * This component has been optimized to:
 * - Use dynamic imports for heavy components to reduce initial bundle size
 * - Maintain SSR support for better SEO and initial load performance
 * - Add loading states for better user experience
 * - Keep the same functionality with improved loading performance
 */
export default function SinglePageLayout() {
  return (
    <PageLayout
      className="h-screen overflow-y-scroll"
      withPadding={false}
      maxWidth="full"
    >
      <CleanGridBackground
        rows={80}
        cols={100}
        cellSize={20}
        opacity={0.6}
        borderOpacity={0.2}
        className="z-0"
        aria-hidden="true"
      />
      <SectionLayout id="home" spacing="xl">
        <HomeSection />
      </SectionLayout>

      <AboutSection />

      <ProjectsSection />

      <ContactSection />

      <SectionLayout id="footer" spacing="sm">
        <Footer />
      </SectionLayout>
    </PageLayout>
  );
}
