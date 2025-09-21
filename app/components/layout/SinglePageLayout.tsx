"use client";

import React from "react";
import { CleanGridBackground } from "@/components/ui/bgRipple";
import { HomeSection } from "@/components/features/portfolio";
import { AboutSection } from "@/components/features/about";
import { ProjectsSection } from "@/components/features/projects";
import { ContactSection } from "@/components/features/contact";

import { Footer } from "@/components/layout";
import { PageLayout } from "./PageLayout";
import { SectionLayout } from "./SectionLayout";

/**
 * SinglePageLayout component using the new architecture
 *
 * This component has been refactored to:
 * - Use the new PageLayout and SectionLayout components
 * - Remove unnecessary dynamic imports for better SSR support
 * - Follow the new component structure patterns
 * - Maintain the same functionality with improved architecture
 */
export default function SinglePageLayout() {
  return (
    <PageLayout
      className="h-screen overflow-y-scroll"
      withPadding={false}
      maxWidth="full"
    >
      <CleanGridBackground
        rows={40}
        cols={60}
        cellSize={30}
        opacity={0.6}
        borderOpacity={0.3}
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
