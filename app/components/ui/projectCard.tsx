"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiGithub, FiImage, FiFilter } from "react-icons/fi";
import { getTechIcon } from "@/lib/utils/techIcons";
import { PROJECTS_CONTENT } from "@/lib/data";
import { Avatar } from "@/components/ui/shadcn/avatar";
import { Button } from "./shadcn/button";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category?: string;
  screenshots?: string[];
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
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -2 }}
      className="relative overflow-hidden rounded-lg sm:rounded-xl border border-paragraph/10 bg-gradient-to-tl from-primary/10 via-background/50 to-background/50 transition-all duration-300 hover:border-primary/20 hover:from-primary/20 hover:shadow-xl hover:shadow-primary h-full"
    >
      {/* Shining Bottom-Right Border */}

      {/* Image
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105 "
        />
      </div>
       */}

      {/* Content */}
      <div className="space-y-4 md:space-y-6 p-4 md:p-6 h-full flex flex-col">
        {/* Title + Icons */}
        <div className="space-y-2 md:space-y-3">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-3">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-headline leading-tight">
              {project.title}
            </h3>
            <div className="flex items-center -space-x-1 md:-space-x-2 flex-shrink-0">
              {project.technologies.slice(0, 4).map((tech, index) => {
                const techIcon = getTechIcon(tech);
                return (
                  <Avatar
                    key={tech + index}
                    className="flex h-7 w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 items-center justify-center border border-paragraph/10 bg-accent/10 shadow-sm hover:bg-primary/20"
                  >
                    {techIcon && (
                      <techIcon.icon
                        className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
                        color={techIcon.color}
                      />
                    )}
                  </Avatar>
                );
              })}
              {project.technologies.length > 4 && (
                <div className="flex h-7 w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full border border-paragraph/10 bg-accent/10 text-xs md:text-sm font-medium text-paragraph">
                  +{project.technologies.length - 4}
                </div>
              )}
            </div>
          </div>

          <p className="text-sm md:text-base leading-relaxed text-paragraph">
            {project.description}
          </p>
        </div>

        {/* Features List */}
        {project.features && project.features.length > 0 && (
          <div className="space-y-2 md:space-y-3 flex-1">
            <div className="flex items-center gap-2 text-sm md:text-base font-medium text-foreground">
              <FiFilter className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              Key Features
            </div>
            <div className="space-y-1.5 md:space-y-2">
              {project.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-start gap-2 md:gap-3">
                  <div className="mt-2 h-1.5 w-1.5 md:h-2 md:w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span className="text-sm md:text-base leading-relaxed text-paragraph break-words">
                    {feature}
                  </span>
                </div>
              ))}
              {project.features.length > 3 && (
                <div className="pl-4 md:pl-5 text-sm md:text-base text-paragraph/60">
                  +{project.features.length - 3} more features
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons (shadcn Button) */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 pt-2 mt-auto">
          {project.screenshots?.length ? (
            <Link href={`/projects/${project.id}`} passHref className="flex-1">
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center gap-2 rounded-lg text-sm md:text-base hover:bg-primary"
              >
                <FiImage className="h-4 w-4 md:h-5 md:w-5" />
                <span className="truncate">{PROJECTS_CONTENT.viewScreenshots}</span>
              </Button>
            </Link>
          ) : null}

          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full md:flex-1 flex items-center justify-center gap-2 rounded-lg text-sm md:text-base hover:bg-primary"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub className="h-4 w-4 md:h-5 md:w-5" />
                <span className="truncate">{PROJECTS_CONTENT.github}</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
