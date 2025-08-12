"use client";

import React from "react";
import dynamic from "next/dynamic";

// Use dynamic imports to avoid SSR issues
const HomeSection = dynamic(() => import("./HomeSection"), { ssr: false });
const AboutSection = dynamic(() => import("./AboutSection"), { ssr: false });
const ProjectsSection = dynamic(() => import("./ProjectsSection"), {
  ssr: false,
});
const ContactSection = dynamic(() => import("./ContactSection"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/ui/footer"), { ssr: false });

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
