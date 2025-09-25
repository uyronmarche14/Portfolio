"use client";

import Link from "next/link";
import Image from 'next/image';
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Calendar , Code, Globe, X } from "lucide-react";
import { useState, useEffect } from "react";

import Footer from "@/components/layout/footer";
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

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!project.screenshots) return;
    
    const totalImages = project.screenshots.length;
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentImageIndex === 0 ? totalImages - 1 : currentImageIndex - 1;
    } else {
      newIndex = currentImageIndex === totalImages - 1 ? 0 : currentImageIndex + 1;
    }
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(project.screenshots[newIndex]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedImage) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        navigateImage('prev');
        break;
      case 'ArrowRight':
        navigateImage('next');
        break;
      case 'Escape':
        setSelectedImage(null);
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex]);

  return (
    <>
      <main className="relative min-h-screen bg-background">
        <div className="container mx-auto max-w-6xl px-4 pb-8 pt-28">
          {/* Back Navigation */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 relative z-10"
          >
            <ArrowLeft className="w-5 h-5" />
            {PROJECTS_CONTENT.backToHome}
          </Link>

          {/* Main Content Grid */}
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
            {/* Main Article Content */}
            <article className="mx-auto flex-1">
              {/* Hero Image */}
              {project.image && (
                <div className="relative mb-8 cursor-pointer group" onClick={() => {
                  const firstImage = project.screenshots?.[0] ?? project.image;
                  setSelectedImage(firstImage);
                  setCurrentImageIndex(0);
                }}>
                  <Image
                    width={1000}
                    height={1000}
                    src={project.screenshots?.[0] ?? project.image}
                    alt={project.title}
                    className="aspect-video w-full max-w-3xl rounded-lg border object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Click to view</span>
                  </div>
                </div>
              )}

              {/* Project Header */}
              <div className="prose dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold text-foreground mb-4">{project.title}</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {project.description}
                </p>

                {/* Project Content */}
                {project.paragraph && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Project Overview</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.paragraph}
                    </p>
                  </div>
                )}

                {/* Features Section */}
                {project.features && project.features.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Key Features</h2>
                    <ul className="space-y-3">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Screenshots Gallery */}
                {project.screenshots && project.screenshots.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-foreground mb-6">Screenshots</h2>
                    <ScreenshotCarousel 
                      screenshots={project.screenshots} 
                      alt={project.title} 
                      onImageClick={(imageUrl, index) => {
                        setSelectedImage(imageUrl);
                        setCurrentImageIndex(index || 0);
                      }}
                    />
                  </div>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:max-w-sm w-full ">
              <div className="border-border rounded-xl bg-accent/50 flex flex-col items-start  border py-6 md:py-8 sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {/* Project Logo/Icon */}
                <div className="mb-8 px-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="mb-5 px-6 last:mb-0 w-full">
                  <div className="mb-2 text-xs font-semibold text-foreground uppercase tracking-wide">Technologies</div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 8).map((tech) => (
                      <TechBadge key={tech} technology={tech} />
                    ))}
                    {project.technologies && project.technologies.length > 8 && (
                      <span className="text-xs text-muted-foreground">+{project.technologies.length - 8} more</span>
                    )}
                  </div>
                </div>

                {/* Links */}
                {(project.githubUrl || project.liveUrl || project.liveDemoUrl) && (
                  <div className="mb-5 px-6 last:mb-0 w-full">
                    <div className="mb-3 text-xs font-semibold text-foreground uppercase tracking-wide">Links</div>
                    <div className="space-y-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Timeline */}
                {project.timeline && project.timeline.length > 0 && (
                  <div className="mb-5 px-6 last:mb-0 w-full">
                    <div className="mb-3 text-xs font-semibold text-foreground uppercase tracking-wide">Timeline</div>
                    <div className="space-y-3">
                      {project.timeline.slice(0, 3).map((event, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-foreground">{event.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status */}
                <div className="border-border mb-5 w-full border-t px-6 pt-5 last:mb-0">
                  <div className="mb-2 text-xs font-semibold text-foreground uppercase tracking-wide">Status</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">Completed</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous button */}
            {project.screenshots && project.screenshots.length > 1 && (
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-6 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next button */}
            {project.screenshots && project.screenshots.length > 1 && (
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-6 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image counter */}
            {project.screenshots && project.screenshots.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                {currentImageIndex + 1} / {project.screenshots.length}
              </div>
            )}

            {/* Main image */}
            <div className="max-w-7xl max-h-[90vh] w-auto h-auto">
              <Image
                width={1400}
                height={900}
                src={selectedImage}
                alt={project.title}
                className="rounded-lg object-contain w-auto h-auto max-w-full max-h-full shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
