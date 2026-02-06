"use client";

import { getTechIcon } from "@/lib/utils/techIcons";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiArrowRight, FiExternalLink, FiGithub } from "react-icons/fi";

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
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const heroSrc = project.screenshots?.[0] ?? project.image;
  const visibleTechs = project.technologies.slice(0, 5);
  const isInDevelopment = project.status === 'in-development';
  const hasImage = heroSrc && heroSrc.length > 0 && !heroSrc.includes('placeholder');

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="group relative flex h-[360px] sm:h-[400px] md:h-[420px] w-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-border/50 bg-background/40 backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-primary/50"
    >
        {/* Dynamic Shadow Glow (System Orange) */}
        <div className="absolute -inset-1 rounded-3xl bg-primary/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40" />

        {/* 1. Image Section (Top 55%) */}
        <div className="relative h-[55%] w-full overflow-hidden bg-muted/20 border-b border-border/50">
            {hasImage ? (
            <Image
                src={heroSrc}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={false}
            />
            ) : (
            // Development placeholder with animated gradient
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 relative overflow-hidden">
                {/* Animated pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/20 blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-secondary/20 blur-2xl animate-pulse delay-500" />
                </div>
                {/* Center icon */}
                <div className="flex flex-col items-center gap-2 z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 flex items-center justify-center">
                        <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground">Preview Coming Soon</span>
                </div>
            </div>
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

            {/* Floating Actions (Top Right) */}
            <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {project.githubUrl && (
                    <Link href={project.githubUrl} target="_blank" className="flex h-9 w-9 items-center justify-center rounded-full bg-background/60 backdrop-blur-md border border-border/20 text-foreground hover:bg-primary hover:border-primary transition-colors">
                        <FiGithub size={16} />
                    </Link>
                )}
                {project.liveUrl && (
                    <Link href={project.liveUrl} target="_blank" className="flex h-9 w-9 items-center justify-center rounded-full bg-background/60 backdrop-blur-md border border-border/20 text-foreground hover:bg-primary hover:border-primary transition-colors">
                        <FiExternalLink size={16} />
                    </Link>
                )}
            </div>

            {/* Status/Category Tags (Top Left) */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
                {/* Status Badge */}
                {isInDevelopment && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-amber-400 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        In Development
                    </span>
                )}
                {/* Category Tag */}
                <span className="inline-block rounded-full bg-background/60 backdrop-blur-md border border-border/20 px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                    {project.category || "Development"}
                </span>
            </div>
        </div>

        {/* 2. Content Section (Bottom 45%) */}
        <div className="relative z-10 flex flex-1 flex-col justify-between p-4 sm:p-5 md:p-6 bg-transparent">
            <div>
                <h3 className="mb-2 font-rawkner text-lg sm:text-xl md:text-2xl font-bold text-foreground transition-colors group-hover:text-primary leading-none">
                    {project.title}
                </h3>
                <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                </p>
            </div>

            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50 flex items-center justify-between">
                {/* Tech Stack */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                    {visibleTechs.map((tech) => {
                        const meta = getTechIcon(tech);
                        const Icon = meta?.icon;
                        if (!Icon) return null;
                        return (
                            <div key={tech} className="group/icon relative">
                                <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-background/50 border border-border/50 text-muted-foreground transition-colors group-hover/icon:text-primary group-hover/icon:bg-primary/10 group-hover/icon:border-primary/20">
                                    <Icon size={10} className="sm:hidden" />
                                    <Icon size={12} className="hidden sm:block" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <Link href={`/projects/${project.id}`} passHref>
                    <div className="group/btn flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:text-primary">
                        <span>Details</span>
                        <FiArrowRight size={12} className="sm:hidden transition-transform duration-300 group-hover/btn:translate-x-1" />
                        <FiArrowRight size={14} className="hidden sm:block transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </div>
                </Link>
            </div>
        </div>
    </motion.div>
  );
};

export default ProjectCard;