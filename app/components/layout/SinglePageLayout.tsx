"use client";

import React from "react";
import dynamic from "next/dynamic";

// Use dynamic imports to avoid SSR issues
const HomeSection = dynamic(() => import("@/components/features/portfolio").then(mod => ({ default: mod.HomeSection })), { ssr: false });
const AboutSection = dynamic(() => import("@/components/features/about").then(mod => ({ default: mod.AboutSection })), { ssr: false });
const ProjectsSection = dynamic(() => import("@/components/features/projects").then(mod => ({ default: mod.ProjectsSection })), {
  ssr: false,
});
const ContactSection = dynamic(() => import("@/components/features/contact").then(mod => ({ default: mod.ContactSection })), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/layout").then(mod => ({ default: mod.Footer })), { ssr: false });

export default function SinglePageLayout() {
  return (
    <div className="h-screen overflow-y-scroll">
      <section id="home">
        <HomeSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
