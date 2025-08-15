"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getTechIcon } from "@/lib/utils/techIcons";
import { FiGithub, FiImage, FiFilter } from "react-icons/fi";
import { Avatar } from "@/components/ui/shadcn/avatar";
import { Button } from "./shadcn/button";
import { PROJECTS_CONTENT } from "@/lib/data";

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
      className="relative overflow-hidden rounded-xl border border-paragraph/10 bg-gradient-to-tl from-primary/10 via-background/50 to-background/50 transition-all duration-300 hover:border-primary/20 hover:from-primary/20 hover:shadow-xl hover:shadow-primary"
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
      <div className="space-y-5 p-6">
        {/* Title + Icons */}
        <div className="space-y-2">
          <div className="flex flex-row items-start justify-between gap-3">
            <h3 className="text-xl font-semibold text-headline">
              {project.title}
            </h3>
            <div className="flex items-center -space-x-2">
              {project.technologies.map((tech, index) => {
                const techIcon = getTechIcon(tech);
                return (
                  <Avatar
                    key={tech + index}
                    className="flex h-8 w-8 items-center justify-center border border-paragraph/10 bg-accent/10 shadow-sm hover:bg-primary/20"
                  >
                    {techIcon && (
                      <techIcon.icon
                        className="h-5 w-5"
                        color={techIcon.color}
                      />
                    )}
                  </Avatar>
                );
              })}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-paragraph">
            {project.description}
          </p>
        </div>

        {/* Features List */}
        {project.features && project.features.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <FiFilter className="h-4 w-4 text-primary" />
              Key Features
            </div>
            <div className="space-y-1.5">
              {project.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span className="text-xs leading-relaxed text-paragraph">
                    {feature}
                  </span>
                </div>
              ))}
              {project.features.length > 3 && (
                <div className="pl-4 text-xs text-paragraph/60">
                  +{project.features.length - 3} more features
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons (shadcn Button) */}
        <div className="flex flex-wrap gap-4 pt-2">
          {project.screenshots?.length ? (
            <Link href={`/projects/${project.id}`} passHref>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 rounded-[8px] hover:bg-primary"
              >
                <FiImage className="h-4 w-4" />
                {PROJECTS_CONTENT.viewScreenshots}
              </Button>
            </Link>
          ) : null}

          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex items-center gap-2 rounded-[8px] hover:bg-primary"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub className="h-4 w-4" />
                {PROJECTS_CONTENT.github}
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
