"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
// import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

import Footer from "@/components/layout/footer";
// import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ScreenshotCarousel from "@/components/ui/ScreenshotCarousel";
import TechBadge from "@/components/ui/TechBadge";
import Timeline from "@/components/ui/Timeline";

import { projects } from "@/lib/data/projects";
import { PROJECTS_CONTENT } from "@/lib/data/projectsContent";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <>
      {/* <AnimatedBackground /> */}
      <main className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-paragraph hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            {PROJECTS_CONTENT.backToHome}
          </Link>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-headline mb-4">{project.title}</h1>
              <p className="text-paragraph/80 mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies?.map((tech) => (
                  <TechBadge key={tech} technology={tech} />
                ))}
              </div>

              <div className="flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {PROJECTS_CONTENT.liveUrl}
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    {PROJECTS_CONTENT.viewCode}
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {project.screenshots && project.screenshots.length > 0 && (
                <ScreenshotCarousel screenshots={project.screenshots} alt={project.title} />
              )}

              {project.timeline && project.timeline.length > 0 && (
                <Timeline events={project.timeline} />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
