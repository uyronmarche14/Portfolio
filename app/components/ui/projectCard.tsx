"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getTechIcon } from "../../utils/techIcons";
import Timeline from "@/components/ui/Timeline";
import { PROJECTS_CONTENT } from "../../data/projectsContent";
import { FiExternalLink, FiGithub, FiImage } from "react-icons/fi";
import { ChevronDown } from "lucide-react";

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
  onScreenshotsClick: () => void;
}

interface ActionButtonProps {
  text: string;
  icon: 'screenshots' | 'external' | 'github';
  href?: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, icon, href, onClick }) => {
  const icons = {
    screenshots: <FiImage className="w-4 h-4" />,
    external: <FiExternalLink className="w-4 h-4" />,
    github: <FiGithub className="w-4 h-4" />,
  };

  const buttonContent = (
    <>
      {icons[icon]}
      {text}
    </>
  );

  const commonProps = {
    className: "inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm",
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
  onScreenshotsClick,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -2 }}
      className="bg-background/50 border border-paragraph/10 rounded-xl overflow-hidden hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/80"
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 space-y-5">
        {/* Title and Description */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-headline">
            {project.title}
          </h3>
          <p className="text-paragraph text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => {
            const techIcon = getTechIcon(tech);
            return (
              <span
                key={`${project.id}-${tech}-${index}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
              >
                {techIcon && (
                  <techIcon.icon
                    className="w-3 h-3"
                    color={techIcon.color}
                  />
                )}
                {tech}
              </span>
            );
          })}
        </div>

        {/* Timeline Section */}
        {project.timeline && project.timeline.length > 0 && (
          <div className="space-y-3">
            <button
              onClick={onToggleTimeline}
              className="w-full flex items-center justify-between text-sm font-medium text-headline hover:text-primary p-3 border border-paragraph/10 rounded-lg hover:border-primary/20 transition-colors"
              aria-expanded={isExpanded}
              aria-controls={`timeline-${project.id}`}
            >
              <span>{PROJECTS_CONTENT.timelineTitle}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
            
            <motion.div
              id={`timeline-${project.id}`}
              initial={false}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {isExpanded && <Timeline events={project.timeline} />}
            </motion.div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-6 pt-2">
          {project.screenshots && project.screenshots.length > 0 && (
            <ActionButton
              onClick={onScreenshotsClick}
              text={PROJECTS_CONTENT.viewScreenshots}
              icon="screenshots"
            />
          )}
          {project.liveUrl && (
            <ActionButton
              href={project.liveUrl}
              text={PROJECTS_CONTENT.liveDemo}
              icon="external"
            />
          )}
          {project.githubUrl && (
            <ActionButton
              href={project.githubUrl}
              text={PROJECTS_CONTENT.github}
              icon="github"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;