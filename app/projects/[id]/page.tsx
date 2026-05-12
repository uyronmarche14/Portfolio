"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import Footer from "@/components/layout/footer";
import { CleanGridBackground } from "@/components/ui/bgRipple";
import ScreenshotCarousel from "@/components/ui/ScreenshotCarousel";
import TechBadge from "@/components/ui/TechBadge";

import { projects } from "@/lib/data/projects";
import { PROJECTS_CONTENT } from "@/lib/data/projectsContent";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) notFound();

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      if (!project.screenshots) return;
      const totalImages = project.screenshots.length;
      const newIndex =
        direction === "prev"
          ? currentImageIndex === 0
            ? totalImages - 1
            : currentImageIndex - 1
          : currentImageIndex === totalImages - 1
          ? 0
          : currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(project.screenshots[newIndex]);
    },
    [currentImageIndex, project.screenshots]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "ArrowLeft") navigateImage("prev");
      if (e.key === "ArrowRight") navigateImage("next");
      if (e.key === "Escape") setSelectedImage(null);
    },
    [selectedImage, navigateImage]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <main className="relative min-h-screen bg-background overflow-hidden">
        {/* Background */}
        <CleanGridBackground className="fixed inset-0 z-0" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 md:pt-32">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground/50 hover:text-primary transition-colors duration-150 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-150" />
              <span>{PROJECTS_CONTENT.backToHome}</span>
            </Link>
          </motion.div>

          {/* Hero Image */}
          {project.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12 cursor-pointer group"
              onClick={() => {
                setSelectedImage(project.screenshots?.[0] ?? project.image);
                setCurrentImageIndex(0);
              }}
            >
              <div className="relative overflow-hidden border-2 border-foreground shadow-brutal-lg">
                <Image
                  width={1200}
                  height={675}
                  src={project.screenshots?.[0] ?? project.image}
                  alt={project.title}
                  className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </motion.div>
          )}

          {/* Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-rawkner font-bold text-foreground tracking-tight mb-6 uppercase">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto">
              {project.description}
            </p>
          </motion.div>

          {/* Tech Stack & Links Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-6 mb-16"
          >
            {/* Tech Badges */}
            <div className="flex flex-wrap justify-center gap-2">
              {project.technologies?.slice(0, 8).map((tech, i) => (
                <TechBadge key={tech} technology={tech} index={i} size="sm" />
              ))}
              {project.technologies && project.technologies.length > 8 && (
                <span className="px-3 py-1 font-mono text-xs text-foreground/50 bg-foreground/5 border-2 border-foreground/30 uppercase tracking-wider">
                  +{project.technologies.length - 8} more
                </span>
              )}
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-foreground bg-background font-mono text-xs font-bold uppercase tracking-wider text-foreground shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal transition-all duration-150 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              )}
              {(project.liveUrl || project.liveDemoUrl) && (
                <a
                  href={project.liveUrl || project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-foreground bg-primary font-mono text-xs font-bold uppercase tracking-wider text-background shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal transition-all duration-150 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-16 h-1 bg-primary mx-auto mb-16" />

          {/* Overview Section */}
          {project.paragraph && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-4 text-center">
                Overview
              </h2>
              <p className="text-foreground/60 leading-relaxed text-center max-w-2xl mx-auto">
                {project.paragraph}
              </p>
            </motion.section>
          )}

          {/* Features Section */}
          {project.features && project.features.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-16"
            >
              <h2 className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-8 text-center">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="p-5 bg-foreground/5 border-2 border-foreground/20 hover:border-foreground transition-all duration-150"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-foreground/60 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Screenshots Gallery */}
          {project.screenshots && project.screenshots.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-16"
            >
              <h2 className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-8 text-center">
                Screenshots
              </h2>
              <ScreenshotCarousel
                screenshots={project.screenshots}
                alt={project.title}
                onImageClick={(imageUrl, index) => {
                  setSelectedImage(imageUrl);
                  setCurrentImageIndex(index || 0);
                }}
              />
            </motion.section>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-10 p-3 border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-150 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Nav Buttons */}
              {project.screenshots && project.screenshots.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage("prev")}
                    className="absolute left-4 md:left-8 z-10 p-3 border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-150 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigateImage("next")}
                    className="absolute right-4 md:right-8 z-10 p-3 border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-150 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Dot Indicators */}
              {project.screenshots && project.screenshots.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {project.screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentImageIndex(i);
                        setSelectedImage(project.screenshots![i]);
                      }}
                      className={`transition-all cursor-pointer ${
                        i === currentImageIndex
                          ? "w-6 h-2 bg-primary"
                          : "w-2 h-2 bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Image */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="max-w-6xl max-h-[85vh]"
              >
                <Image
                  width={1400}
                  height={900}
                  src={selectedImage}
                  alt={project.title}
                  className="object-contain max-h-[85vh] border-2 border-white/20"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
