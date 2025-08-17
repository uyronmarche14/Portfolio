import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter, Check } from "lucide-react";
import { projects } from "@/lib/data/projects";
import {
  PROJECTS_CONTENT,
  ANIMATION_VARIANTS,
} from "@/lib/data/projectsContent";
import { Sparkles } from "lucide-react";

import ProjectCard from "@/components/ui/projectCard";
import { getTechIcon } from "@/lib/utils/techIcons";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

interface FilterDropdownProps {
  filter: string;
  technologies: string[];
  onFilterChange: (tech: string) => void;
  filteredCount: number;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filter,
  technologies,
  onFilterChange,
  filteredCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedTech = filter === "all" ? PROJECTS_CONTENT.filterAll : filter;
  const selectedIcon = getTechIcon(selectedTech);

  return (
    <div className="relative w-full">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl sm:rounded-2xl border border-primary/20 bg-gradient-to-r from-background/90 to-background/70 p-3 sm:p-4 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="rounded-lg bg-primary/10 p-1.5 sm:p-2 flex-shrink-0">
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            {filter !== "all" && selectedIcon && (
              <selectedIcon.icon
                className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0"
                color={selectedIcon.color}
              />
            )}
            <span className="font-medium text-foreground text-sm sm:text-base truncate">{selectedTech}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <span className="text-muted-foreground rounded-full bg-primary/10 px-2 py-1 text-xs sm:text-sm">
            {filteredCount} project{filteredCount !== 1 ? "s" : ""}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="text-muted-foreground h-3 w-3 sm:h-4 sm:w-4" />
          </motion.div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 sm:max-h-80 overflow-y-auto rounded-xl sm:rounded-2xl border border-primary/20 bg-background/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="p-1.5 sm:p-2">
              {/* All Projects Option */}
              <motion.button
                onClick={() => {
                  onFilterChange("all");
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg sm:rounded-xl p-2.5 sm:p-3 transition-all duration-200 ${
                  filter === "all"
                    ? "bg-primary text-white shadow-lg"
                    : "text-foreground hover:bg-primary/10"
                }`}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0">
                    <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <span className="font-medium text-sm sm:text-base truncate">
                    {PROJECTS_CONTENT.filterAll}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <span className="text-xs opacity-70">{projects.length}</span>
                  {filter === "all" && <Check className="h-3 w-3 sm:h-4 sm:w-4" />}
                </div>
              </motion.button>

              {/* Technology Options */}
              {technologies.map((tech) => {
                const techIcon = getTechIcon(tech);
                const count = projects.filter((project) =>
                  project.technologies.some(
                    (projectTech) =>
                      projectTech.toLowerCase() === tech.toLowerCase()
                  )
                ).length;

                return (
                  <motion.button
                    key={tech}
                    onClick={() => {
                      onFilterChange(tech);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg sm:rounded-xl p-2.5 sm:p-3 transition-all duration-200 ${
                      filter === tech
                        ? "bg-primary text-white shadow-lg"
                        : "text-foreground hover:bg-primary/10"
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-muted/50 flex-shrink-0">
                        {techIcon && (
                          <techIcon.icon
                            className="h-3 w-3 sm:h-4 sm:w-4"
                            color={filter === tech ? "white" : techIcon.color}
                          />
                        )}
                      </div>
                      <span className="font-medium text-sm sm:text-base truncate">{tech}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      <span className="text-xs opacity-70">{count}</span>
                      {filter === tech && <Check className="h-3 w-3 sm:h-4 sm:w-4" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectsSection = () => {
  const [filter, setFilter] = useState<string>("all");

  // Technology mapping to group similar techs and filter out hosting/deployment details
  const techMapping: Record<string, string> = {
    React: "React",
    "React Native": "React Native",
    "Next.js": "Next.js",
    TypeScript: "TypeScript",
    JavaScript: "JavaScript",
    "Node.js": "Node.js",
    "Node Js": "Node.js",
    "Express.js": "Express.js",
    "Express Js": "Express.js",
    "C#": "C#",
    Java: "Java",
    HTML: "HTML",
    CSS: "CSS",
    "Tailwind CSS": "Tailwind CSS",
    TailwindCSS: "Tailwind CSS",
    Firebase: "Firebase",
    Supabase: "Supabase",
    MySQL: "MySQL",
    "Android Studio": "Android",
    "QR Code Scanner": "QR Code Scanner",
    ESP32: "ESP32",
    "C++": "C++",
    WinForms: "WinForms",
  };

  // Get normalized tech name or return null if it should be filtered out
  const getNormalizedTech = useCallback(
    (tech: string): string | null => {
      // Filter out hosting/deployment specific details
      if (
        tech.includes("hosting") ||
        tech.includes("deployment") ||
        (tech.includes("(") && tech.length > 15)
      ) {
        return null;
      }

      return techMapping[tech] || tech;
    },
    [techMapping]
  );

  const technologies = React.useMemo(() => {
    const allTechs = projects.flatMap((p) => p.technologies);
    const normalizedTechs = allTechs
      .map(getNormalizedTech)
      .filter((tech): tech is string => tech !== null);

    const uniqueTechs = Array.from(new Set(normalizedTechs));

    // Sort by project count (most used first), then alphabetically
    return uniqueTechs
      .map((tech) => ({
        name: tech,
        count: projects.filter((project) =>
          project.technologies.some(
            (projectTech) => getNormalizedTech(projectTech) === tech
          )
        ).length,
      }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .slice(0, 12) // Limit to top 12 technologies
      .map((tech) => tech.name);
  }, []);

  const filteredProjects = React.useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) =>
            project.technologies.some(
              (tech) => getNormalizedTech(tech) === filter
            )
          ),
    [filter]
  );

  return (
    <section
      id="projects"
      className="relative flex min-h-screen snap-start justify-center overflow-hidden bg-background px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
    >
      <AnimatedBackground />

      <div className="relative w-full max-w-7xl rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-sm">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-6xl px-2 sm:px-4 pb-8 sm:pb-12 md:pb-16 pt-12 sm:pt-16 md:pt-24"
        >
          <div className="relative z-10 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 sm:mb-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 sm:px-4 sm:py-2"
              >
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-primary">
                  Explore Projects
                </span>
              </motion.div>

              <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-foreground leading-tight">
                Featured
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text pb-2 sm:pb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-transparent">
                  Projects
                </span>
              </h1>

              <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-4">
                {PROJECTS_CONTENT.sectionDescription}
              </p>
            </motion.div>

            {/* Glass Effect Wrapper 
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
            */}

            <motion.div
              className="mb-8 sm:mb-10 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="space-y-3 sm:space-y-4">
                <FilterDropdown
                  filter={filter}
                  technologies={technologies}
                  onFilterChange={setFilter}
                  filteredCount={filteredProjects.length}
                />
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                variants={ANIMATION_VARIANTS.container}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-2"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
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
