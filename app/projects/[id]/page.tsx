"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  ArrowLeft,
  Check,
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

import { ProjectVisual, hasProjectVisual } from "@/components/features/projects/ProjectVisuals";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { BackLink } from "@/components/layout/BackLink";
import { DocsLayout, DocsRail, docsLinkClass } from "@/components/layout/DocsLayout";
import Footer from "@/components/layout/footer";
import ScreenshotCarousel from "@/components/ui/ScreenshotCarousel";
import TechBadge from "@/components/ui/TechBadge";

import { groupTech } from "@/lib/data/techStack";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { projects } from "@/lib/data/projects";
import { PROJECTS_CONTENT } from "@/lib/data/projectsContent";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [media, setMedia] = useState<"visual" | "screenshot">("visual");

  if (!project) notFound();

  const tocItems = [
    project.paragraph ? { id: "overview", label: "Overview" } : null,
    project.features?.length ? { id: "features", label: "Key features" } : null,
    project.technologies?.length ? { id: "stack", label: "Stack" } : null,
    project.screenshots?.length ? { id: "screenshots", label: "Screenshots" } : null,
  ].filter((item): item is { id: string; label: string } => item !== null);
  const activeSection = useScrollSpy(tocItems.map((item) => item.id));

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
      <DocsLayout
        sidebar={
          <>
            <BackLink href="/">{PROJECTS_CONTENT.backToHome}</BackLink>
            <p className="mt-8 text-sm font-semibold text-foreground">Projects</p>
            <ul className="mt-3 space-y-0.5">
              {projects.map((item) => (
                <li key={item.id}>
                  <Link href={`/projects/${item.id}`} className={docsLinkClass(item.id === project.id)}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        }
        rail={<DocsRail items={tocItems} active={activeSection} />}
      >
        <article>
          <BackLink href="/" className="mb-8 lg:hidden">{PROJECTS_CONTENT.backToHome}</BackLink>

          <header>
            <p className="font-mono text-xs text-primary">{project.category || "Project"}</p>
            <h1 className="mt-3 font-sans text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-foreground/70">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies?.slice(0, 8).map((tech, i) => (
                <TechBadge key={tech} technology={tech} index={i} size="sm" />
              ))}
              {project.technologies && project.technologies.length > 8 && (
                <Badge variant="default">+{project.technologies.length - 8} more</Badge>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <Button asChild variant="outline">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
              {(project.liveUrl || project.liveDemoUrl) && (
                <Button asChild variant="accent">
                  <a href={project.liveUrl || project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </header>

          {(project.image || hasProjectVisual(project.id)) && (
            <div className="mt-10">
              {project.image && hasProjectVisual(project.id) && (
                <FilterTabs
                  label="Project media"
                  className="mb-3"
                  value={media}
                  onChange={setMedia}
                  items={[
                    { key: "visual", label: "Visual" },
                    { key: "screenshot", label: "Screenshot" },
                  ]}
                />
              )}
              {project.image && (media === "screenshot" || !hasProjectVisual(project.id)) ? (
                <figure
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedImage(project.screenshots?.[0] ?? project.image);
                    setCurrentImageIndex(0);
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl border border-foreground/15">
                    <Image
                      width={1200}
                      height={675}
                      src={project.screenshots?.[0] ?? project.image}
                      alt={project.title}
                      className="aspect-video w-full object-cover"
                      priority
                    />
                  </div>
                </figure>
              ) : (
                <div>
                  <ProjectVisual id={project.id} className="aspect-[4/3] w-full p-4 sm:aspect-video" />
                </div>
              )}
            </div>
          )}

          {project.paragraph && (
            <section id="overview" className="scroll-mt-28 pt-14">
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground">Overview</h2>
              <p className="mt-4 max-w-[66ch] text-[17px] leading-[1.75] text-foreground/80">{project.paragraph}</p>
            </section>
          )}

          {project.features && project.features.length > 0 && (
            <section id="features" className="scroll-mt-28 pt-14">
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground">Key features</h2>
              <ul className="mt-5 divide-y divide-foreground/10 border-y border-foreground/10">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 py-3.5">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span className="max-w-[66ch] text-[16px] leading-relaxed text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <section id="stack" className="scroll-mt-28 pt-14">
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground">Stack</h2>
              <dl className="mt-5 divide-y divide-foreground/10 border-y border-foreground/10">
                {groupTech(project.technologies).map((group) => (
                  <div key={group.category} className="grid gap-3 py-4 sm:grid-cols-[8rem_minmax(0,1fr)]">
                    <dt className="font-mono text-xs text-foreground/60">{group.category}</dt>
                    <dd className="flex flex-wrap gap-2">
                      {group.items.map((tech, i) => (
                        <TechBadge key={tech} technology={tech} index={i} size="sm" />
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {project.screenshots && project.screenshots.length > 0 && (
            <section id="screenshots" className="scroll-mt-28 pt-14">
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground">Screenshots</h2>
              <div className="mt-5">
                <ScreenshotCarousel
                  screenshots={project.screenshots}
                  alt={project.title}
                  onImageClick={(imageUrl, index) => {
                    setSelectedImage(imageUrl);
                    setCurrentImageIndex(index || 0);
                  }}
                />
              </div>
            </section>
          )}
        </article>
      </DocsLayout>

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
              <Button
                onClick={() => setSelectedImage(null)}
                variant="outline"
                size="icon"
                aria-label="Close"
                className="absolute top-6 right-6 z-10 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Nav Buttons */}
              {project.screenshots && project.screenshots.length > 1 && (
                <>
                  <Button
                    onClick={() => navigateImage("prev")}
                    variant="outline"
                    size="icon"
                    aria-label="Prev image"
                    className="absolute left-4 md:left-8 z-10 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={() => navigateImage("next")}
                    variant="outline"
                    size="icon"
                    aria-label="Next image"
                    className="absolute right-4 md:right-8 z-10 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
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
                  className="object-contain max-h-[85vh] border border-white/20"
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
