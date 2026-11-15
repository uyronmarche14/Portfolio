"use client";

import { CleanGridBackground } from "@/components/ui/bgRipple";
import dynamic from "next/dynamic";

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

const TechStackSection = dynamic(() => import("@/components/features/stack/TechStackSection"), {
  loading: () => <div className="py-20 flex items-center justify-center text-zinc-500">Loading tech stack...</div>,
  ssr: true,
});

const HobbyCarousel = dynamic(() => import("@/components/features/about/HobbyCarousel"), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading Hobbies...</div>,
  ssr: true,
});

const AchievementExplorer = dynamic(() => import("@/components/features/achievements/AchievementExplorer"), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading Achievements...</div>,
  ssr: true,
});

const ContactSection = dynamic(() => import("@/components/features/contact/ContactSection"), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
  ssr: true,
});

const WorkWithMeSection = dynamic(() => import("@/components/features/work/WorkWithMeSection"), {
  loading: () => <div className="py-20 flex items-center justify-center text-zinc-500">Loading Work Section...</div>,
  ssr: true,
});

const Footer = dynamic(() => import("@/components/layout/footer"), {
  loading: () => <div className="py-8 flex items-center justify-center">Loading...</div>,
  ssr: true,
});

import { PageLayout } from "./PageLayout";
import { SectionTracker } from "./SectionTracker";
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
      className="relative h-screen overflow-y-scroll"
      withPadding={false}
      maxWidth="full"
    >
      <SectionTracker />
      <CleanGridBackground
        cellSize={20}
        className="grid-bg z-0 dark:hidden"
        aria-hidden="true"
      />     
       <SectionLayout id="home" spacing="xl">
        <HomeSection />
      </SectionLayout>

      <AboutSection />

      <HobbyCarousel />

      <AchievementExplorer />

      <TechStackSection />

      <ProjectsSection />

      <WorkWithMeSection />

      <ContactSection />

      <div id="footer" className="w-full">
        <Footer />
      </div>
    </PageLayout>
  );
}

