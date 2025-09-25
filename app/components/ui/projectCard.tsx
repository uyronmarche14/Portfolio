"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { getTechIcon } from "@/lib/utils/techIcons";
import { Button } from "./shadcn/button";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category?: string;
  screenshots: string[];
  features: string[];
  timeline?: Array<{
    date: string;
    title: string;
    description: string;
  }>;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const accent = useMemo(() => {
    const primaryTech = project.technologies?.[0];
    const techMeta = primaryTech ? getTechIcon(primaryTech) : null;
    return techMeta?.color || "hsl(var(--primary))";
  }, [project.technologies]);

  // Use first Cloudinary screenshot as hero image
  const heroSrc = project.screenshots?.[0] ?? project.image;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border/10 bg-gradient-to-br from-primary/20 via-background/60 to-background/80 shadow-lg hover:shadow-xl hover:shadow-primary/10 focus-within:ring-2 focus-within:ring-primary/40 hover:border-primary"
      style={{
        backgroundImage: `radial-gradient(60% 60% at 80% 0%, ${typeof accent === "string" ? accent : "hsl(var(--primary))"}1a, transparent 60%)`,
      } as React.CSSProperties}
    >


      {/* Hero image */}
      {heroSrc ? (
        <div className="relative aspect-video w-full shrink-0">
          <Image
            src={heroSrc}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
        </div>
      ) : (
        <div className="flex aspect-video w-full shrink-0 items-center justify-center bg-muted">
          <span className="text-sm text-muted-foreground">No image</span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3">
          <h3 className="font-rawkner text-2xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-white to-primary transition-all duration-500 hover:bg-gradient-to-r  tracking-tight text-headline sm:text-lg md:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 line-clamp-3 text-sm text-paragraph">
            {project.description}
          </p>
        </div>

        {/* Tech chips */}
        {project.technologies?.length ? (
          <div className="mb-3 flex flex-wrap gap-1 text-[11px] text-foreground/80 sm:gap-1.5 sm:text-xs">
            {project.technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-border/60 bg-background/40 px-2 py-0.5 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="rounded-full border border-border/60 bg-background/40 px-2 py-0.5 backdrop-blur-sm">+{project.technologies.length - 3}</span>
            )}
          </div>
        ) : null}

        <div className="mt-auto">
          <div className="h-px w-full bg-border/60" />
          <div className="mt-3 flex items-center justify-between">
            <Link href={`/projects/${project.id}`} passHref>
              <Button size="sm" className="gap-2 rounded-xl hover:bg-accent bg-primary text-primary-foreground">
                View Project
                <FiArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;