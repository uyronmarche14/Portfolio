"use client";

import { ArrowRight, Code2, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ProjectVisual, hasProjectVisual } from "@/components/features/projects/ProjectVisuals";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category?: string;
  status?: 'completed' | 'in-development' | 'planned';
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
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const heroSrc = project.screenshots?.[0] ?? project.image;
  const isInDevelopment = project.status === "in-development";
  const hasImage = heroSrc && heroSrc.length > 0 && !heroSrc.includes("placeholder");
  const num = String(index).padStart(2, "0");

  return (
    <article className="group flex w-full flex-col">
      <Link
        href={`/projects/${project.id}`}
        data-cursor="View project"
        className="relative block aspect-[16/10] w-full overflow-hidden rounded-lg border border-foreground/15 bg-foreground/[0.04]"
      >
        {hasProjectVisual(project.id) ? (
          <>
            <ProjectVisual id={project.id} className="h-full w-full p-4" />
            {hasImage && (
              <Image
                src={heroSrc}
                alt={`${project.title} screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
              />
            )}
          </>
        ) : hasImage ? (
          <Image
            src={heroSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-foreground/50">
            <Code2 className="h-7 w-7" />
            <span className="font-mono text-xs">Preview coming soon</span>
          </div>
        )}
      </Link>

      <p className="mt-3 font-mono text-xs text-foreground/50">
        Fig. {num} / {project.title}
      </p>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
          <Link href={`/projects/${project.id}`} className="hover:text-primary transition-colors">
            <span className="mr-3 font-mono text-sm font-medium text-primary">{num}</span>
            {project.title}
          </Link>
        </h3>
        {isInDevelopment && (
          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-xs text-primary">
            In development
          </span>
        )}
      </div>

      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/70 md:text-base">
        {project.description}
      </p>

      <p className="mt-4 font-mono text-xs text-foreground/50">
        {project.category || "Development"} · {project.technologies.slice(0, 5).join(" · ")}
      </p>

      <div className="mt-4 flex items-center gap-5 text-sm font-medium">
        <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors">
          Case study <ArrowRight size={14} />
        </Link>
        {project.liveUrl && (
          <Link href={project.liveUrl} target="_blank" className="inline-flex items-center gap-1.5 text-foreground/60 hover:text-primary transition-colors">
            Live <ExternalLink size={13} />
          </Link>
        )}
        {project.githubUrl && (
          <Link href={project.githubUrl} target="_blank" className="inline-flex items-center gap-1.5 text-foreground/60 hover:text-primary transition-colors">
            Code <Github size={13} />
          </Link>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
