"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import { PROJECTS_CONTENT, ANIMATION_VARIANTS } from "../data/projectsContent";

import ProjectCard from "./ui/projectCard";
import { getTechIcon } from "../utils/techIcons";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

interface FilterButtonProps {
  tech: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  tech,
  isActive,
  onClick,
}) => {
  const techIcon = getTechIcon(tech);
  const isAll = tech === PROJECTS_CONTENT.filterAll;

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
        isActive
          ? "bg-primary text-white"
          : "bg-background border border-paragraph/10 hover:border-primary"
      }`}
    >
      {!isAll && techIcon && (
        <techIcon.icon
          className="w-4 h-4"
          color={isActive ? "white" : techIcon.color}
        />
      )}
      <span>{tech}</span>
    </button>
  );
};

const ProjectsSection = () => {
  const [expandedTimelines, setExpandedTimelines] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const technologies = React.useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.technologies))).sort(),
    []
  );

  const filteredProjects = React.useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) =>
            project.technologies.some(
              (tech) => tech.toLowerCase() === filter.toLowerCase()
            )
          ),
    [filter]
  );

  const toggleTimeline = (projectId: number) => {
    setExpandedTimelines((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  return (
    <section
      id="projects"
      className="bg-background min-h-screen py-16 px-4 flex justify-center relative overflow-hidden snap-start"
    >
      <AnimatedBackground />

      <div className="relative max-w-7xl w-full rounded-2xl p-8 md:p-12 backdrop-blur-sm">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-6xl mx-auto px-4 pt-24 pb-16"
        >
          {/* Glass Effect Wrapper */}
          <div className="relative z-10 backdrop-blur-sm">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-16 relative"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-primary/60 uppercase tracking-wider text-sm mb-2 block"
              >
                {PROJECTS_CONTENT.sectionSubtitle}
              </motion.span>
              <div className="flex flex-col gap-4 relative">
                <h1 className="text-5xl font-bold text-headline">
                  {PROJECTS_CONTENT.sectionTitle}
                </h1>
                <p className="text-paragraph/80 max-w-2xl text-lg">
                  {PROJECTS_CONTENT.sectionDescription}
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute -bottom-6 left-0 h-[1px] bg-gradient-to-r from-primary/50 to-transparent"
                />
              </div>
            </motion.div>

            <motion.div className="mb-8">
              <div className="flex flex-wrap gap-3 backdrop-blur-md bg-background/30 p-4 rounded-2xl border border-primary/10">
                <FilterButton
                  tech={PROJECTS_CONTENT.filterAll}
                  isActive={filter === "all"}
                  onClick={() => setFilter("all")}
                />
                {technologies.map((tech) => (
                  <FilterButton
                    key={tech}
                    tech={tech}
                    isActive={filter === tech}
                    onClick={() => setFilter(tech)}
                  />
                ))}
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                variants={ANIMATION_VARIANTS.container}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isExpanded={expandedTimelines.includes(project.id)}
                    onToggleTimeline={() => toggleTimeline(project.id)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
