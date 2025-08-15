import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter, Check } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { PROJECTS_CONTENT, ANIMATION_VARIANTS } from "@/lib/data/projectsContent";
import { 

  Sparkles
} from "lucide-react";

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
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-background/90 to-background/70 backdrop-blur-xl border border-primary/20 rounded-2xl hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Filter className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            {filter !== "all" && selectedIcon && (
              <selectedIcon.icon
                className="w-4 h-4"
                color={selectedIcon.color}
              />
            )}
            <span className="font-medium text-foreground">
              {selectedTech}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
            {filteredCount} project{filteredCount !== 1 ? 's' : ''}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
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
            className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto"
          >
            <div className="p-2">
              {/* All Projects Option */}
              <motion.button
                onClick={() => {
                  onFilterChange("all");
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  filter === "all"
                    ? "bg-primary text-white shadow-lg"
                    : "hover:bg-primary/10 text-foreground"
                }`}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Filter className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{PROJECTS_CONTENT.filterAll}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-70">{projects.length}</span>
                  {filter === "all" && <Check className="w-4 h-4" />}
                </div>
              </motion.button>

              {/* Technology Options */}
              {technologies.map((tech) => {
                const techIcon = getTechIcon(tech);
                const count = projects.filter((project) =>
                  project.technologies.some(
                    (projectTech) => projectTech.toLowerCase() === tech.toLowerCase()
                  )
                ).length;

                return (
                  <motion.button
                    key={tech}
                    onClick={() => {
                      onFilterChange(tech);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                      filter === tech
                        ? "bg-primary text-white shadow-lg"
                        : "hover:bg-primary/10 text-foreground"
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                        {techIcon && (
                          <techIcon.icon
                            className="w-4 h-4"
                            color={filter === tech ? "white" : techIcon.color}
                          />
                        )}
                      </div>
                      <span className="font-medium">{tech}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs opacity-70">{count}</span>
                      {filter === tech && <Check className="w-4 h-4" />}
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
    "React": "React",
    "React Native": "React Native", 
    "Next.js": "Next.js",
    "TypeScript": "TypeScript",
    "JavaScript": "JavaScript",
    "Node.js": "Node.js",
    "Node Js": "Node.js",
    "Express.js": "Express.js",
    "Express Js": "Express.js",
    "C#": "C#",
    "Java": "Java",
    "HTML": "HTML",
    "CSS": "CSS",
    "Tailwind CSS": "Tailwind CSS",
    "TailwindCSS": "Tailwind CSS",
    "Firebase": "Firebase",
    "Supabase": "Supabase",
    "MySQL": "MySQL",
    "Android Studio": "Android",
    "QR Code Scanner": "QR Code Scanner",
    "ESP32": "ESP32",
    "C++": "C++",
    "WinForms": "WinForms"
  };

  // Get normalized tech name or return null if it should be filtered out
  const getNormalizedTech = (tech: string): string | null => {
    // Filter out hosting/deployment specific details
    if (tech.includes("hosting") || tech.includes("deployment") || 
        tech.includes("(") && tech.length > 15) {
      return null;
    }
    
    return techMapping[tech] || tech;
  };

  const technologies = React.useMemo(() => {
    const allTechs = projects.flatMap((p) => p.technologies);
    const normalizedTechs = allTechs
      .map(getNormalizedTech)
      .filter((tech): tech is string => tech !== null);
    
    const uniqueTechs = Array.from(new Set(normalizedTechs));
    
    // Sort by project count (most used first), then alphabetically
    return uniqueTechs
      .map(tech => ({
        name: tech,
        count: projects.filter(project => 
          project.technologies.some(projectTech => 
            getNormalizedTech(projectTech) === tech
          )
        ).length
      }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .slice(0, 12) // Limit to top 12 technologies
      .map(tech => tech.name);
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
         
          <div className="relative z-10 backdrop-blur-sm">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Explore Projects</span>
              </motion.div>
              
              <h1 className="text-6xl md:text-7xl font-light text-foreground mb-6 tracking-tight">
                Featured
                <span className="block text-5xl md:text-6xl font-normal bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-4">
                  Projects
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="space-y-4">
                {/*
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-headline mb-2">Filter Projects</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore projects by technology stack
                  </p>
                </div>
                */}
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
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