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
      whileHover={{ x: -3, y: -3 }}
      transition={{ type: "tween", duration: 0.15 }}
      className="group relative flex h-[360px] sm:h-[400px] md:h-[420px] w-full flex-col overflow-hidden border-2 border-foreground bg-background shadow-brutal transition-all duration-150 hover:shadow-brutal-lg"
    >
        {/* 1. Image Section (Top 55%) */}
        <div className="relative h-[55%] w-full overflow-hidden bg-foreground/5 border-b-2 border-foreground">
            {hasImage ? (
            <Image
                src={heroSrc}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={false}
            />
            ) : (
            <div className="flex h-full w-full items-center justify-center bg-foreground/5 relative overflow-hidden">
                <div className="flex flex-col items-center gap-2 z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-foreground bg-background flex items-center justify-center">
                        <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground/60">Preview Coming Soon</span>
                </div>
            </div>
            )}

            {/* Floating Actions (Top Right) */}
            <div className="absolute top-3 right-3 flex gap-2 translate-y-2 opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100">
                {project.githubUrl && (
                    <Link href={project.githubUrl} target="_blank" className="flex h-9 w-9 items-center justify-center border-2 border-foreground bg-background text-foreground hover:bg-primary hover:text-background transition-colors duration-150 shadow-brutal-sm">
                        <FiGithub size={16} />
                    </Link>
                )}
                {project.liveUrl && (
                    <Link href={project.liveUrl} target="_blank" className="flex h-9 w-9 items-center justify-center border-2 border-foreground bg-background text-foreground hover:bg-primary hover:text-background transition-colors duration-150 shadow-brutal-sm">
                        <FiExternalLink size={16} />
                    </Link>
                )}
            </div>

            {/* Status/Category Tags (Top Left) */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
                {isInDevelopment && (
                    <span className="inline-flex items-center gap-1.5 border-2 border-foreground bg-amber-400 px-2.5 py-1 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-black shadow-brutal-sm">
                        <span className="w-1.5 h-1.5 bg-black animate-pulse" />
                        In Dev
                    </span>
                )}
                <span className="inline-block border-2 border-foreground bg-background px-2.5 sm:px-3 py-1 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary shadow-brutal-sm">
                    {project.category || "Development"}
                </span>
            </div>
        </div>

        {/* 2. Content Section (Bottom 45%) */}
        <div className="relative z-10 flex flex-1 flex-col justify-between p-4 sm:p-5 md:p-6 bg-transparent">
            <div>
                <h3 className="mb-2 font-rawkner text-lg sm:text-xl md:text-2xl font-bold text-foreground transition-colors group-hover:text-primary leading-none uppercase">
                    {project.title}
                </h3>
                <p className="line-clamp-2 text-xs sm:text-sm text-foreground/60 leading-relaxed">
                    {project.description}
                </p>
            </div>

            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t-2 border-foreground flex items-center justify-between">
                {/* Tech Stack */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                    {visibleTechs.map((tech) => {
                        const meta = getTechIcon(tech);
                        const Icon = meta?.icon;
                        if (!Icon) return null;
                        return (
                            <div key={tech} className="group/icon relative">
                                <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center border border-foreground/30 bg-background text-foreground/60 transition-colors group-hover/icon:text-primary group-hover/icon:border-primary">
                                    <Icon size={10} className="sm:hidden" />
                                    <Icon size={12} className="hidden sm:block" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <Link href={`/projects/${project.id}`} passHref>
                    <div className="group/btn flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:text-primary">
                        <span>Details</span>
                        <FiArrowRight size={12} className="sm:hidden transition-transform duration-150 group-hover/btn:translate-x-1" />
                        <FiArrowRight size={14} className="hidden sm:block transition-transform duration-150 group-hover/btn:translate-x-1" />
                    </div>
                </Link>
            </div>
        </div>
    </motion.div>
  );
};

export default ProjectCard;