"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getTechIcon } from "@/lib/utils/techIcons";
import Timeline from "@/components/ui/Timeline";
import { PROJECTS_CONTENT } from "@/lib/data/projectsContent";
import { FiExternalLink, FiGithub, FiImage, FiFilter, FiX } from "react-icons/fi";
import { Avatar } from "@/components/ui/shadcn/avatar";
import { Button } from "./shadcn/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/shadcn/accordion";

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

interface ProjectsWithFilterProps {
  projects: Project[];
}



const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -2 }}
      className="bg-background/50 border border-paragraph/10 rounded-xl overflow-hidden hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary"
    >
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
      <div className="p-6 space-y-5">
        {/* Title + Icons */}
        <div className="space-y-2">
          <div className="flex items-start justify-between flex-row gap-3">
            <h3 className="text-xl font-semibold text-headline">
              {project.title}
            </h3>
            <div className="flex items-center -space-x-2">
              {project.technologies.map((tech, index) => {
                const techIcon = getTechIcon(tech);
                return (
                  <Avatar
                    key={tech + index}
                    className="bg-accent/10 border border-paragraph/10 shadow-sm w-8 h-8 flex items-center justify-center hover:bg-primary/20"
                  >
                    {techIcon && (
                      <techIcon.icon
                        className="w-5 h-5"
                        color={techIcon.color}
                      />
                    )}
                  </Avatar>
                );
              })}
            </div>
          </div>

          <p className="text-paragraph text-sm leading-relaxed">
            {project.description}
          </p>
        </div>


        {/* Features List */}
        {project.features && project.features.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <FiFilter className="w-4 h-4 text-primary" />
              Key Features
            </div>
            <div className="space-y-1.5">
              {project.features.slice(0, 3).map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-2 text-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-xs leading-relaxed text-paragraph">
                    {feature}
                  </span>
                </div>
              ))}
              {project.features.length > 3 && (
                <div className="text-xs text-paragraph/60 pl-4">
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
                className="rounded-[8px] flex items-center gap-2 hover:bg-primary"
              >
                <FiImage className="w-4 h-4" />
                {PROJECTS_CONTENT.viewScreenshots}
              </Button>
            </Link>
          ) : null}

          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="rounded-[8px] flex items-center gap-2 hover:bg-primary"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub className="w-4 h-4" />
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
