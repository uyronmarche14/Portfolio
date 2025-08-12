"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getTechIcon } from "../../utils/techIcons";
import Timeline from "@/components/ui/Timeline";
import { PROJECTS_CONTENT } from "../../data/projectsContent";
import { FiExternalLink, FiGithub, FiImage } from "react-icons/fi";
import { ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/shadcn/avatar";
import { Button } from "./shadcn/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/shadcn/accordion";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    screenshots?: string[];
    timeline?: Array<{
      date: string;
      title: string;
      description: string;
    }>;
    liveUrl?: string;
    githubUrl?: string;
  };
  isExpanded: boolean;
  onToggleTimeline: () => void;
}

interface ActionButtonProps {
  text: string;
  icon: "screenshots" | "external" | "github";
  href?: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  icon,
  href,
  onClick,
}) => {
  const icons = {
    screenshots: <FiImage className="w-4 h-4" />,
    external: <FiExternalLink className="w-4 h-4" />,
    github: <FiGithub className="w-4 h-4" />,
  };

  const buttonContent = (
    <span className="flex items-center gap-2">
      {icons[icon]}
      {text}
    </span>
  );

  const commonProps = {
    className:
      "inline-flex items-center gap-2 px-2 py-1 rounded-md text-primary hover:text-primary/80 transition-colors text-sm",
    children: buttonContent,
  };

  if (href) {
    return (
      <a
        {...commonProps}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      />
    );
  }
  return <button {...commonProps} onClick={onClick} />;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isExpanded,
  onToggleTimeline,
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

        {/* Technology Tags */}

        {/* Timeline (shadcn Accordion) */}
        {project.timeline && project.timeline.length > 0 && (
          <Accordion type="single" collapsible>
            <AccordionItem value={`timeline-${project.id}`}>
              <AccordionTrigger>
                {PROJECTS_CONTENT.timelineTitle}
              </AccordionTrigger>
              <AccordionContent>
                <Timeline events={project.timeline} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
