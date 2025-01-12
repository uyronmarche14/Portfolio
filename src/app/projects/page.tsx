"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../../data/projects";
import ScreenshotModal from "../../components/ScreenshotModal";
import Timeline from "../../components/Timeline";
import { getTechIcon } from "../../utils/techIcons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const projectVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    screenshots: string[];
  } | null>(null);
  const [expandedTimelines, setExpandedTimelines] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const filteredProjects = projects.filter((project) =>
    filter === "all"
      ? true
      : project.technologies.some((tech) =>
          tech.toLowerCase().includes(filter.toLowerCase())
        )
  );

  const technologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  ).sort();

  const handleScreenshotsClick = (project: (typeof projects)[0]) => {
    setSelectedProject({
      title: project.title,
      screenshots: project.screenshots || [],
    });
    setIsModalOpen(true);
  };

  const toggleTimeline = (projectId: number) => {
    setExpandedTimelines((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-primary rounded-full border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-l from-secondary/10 to-tertiary/10 rounded-full blur-[120px]"
        />

        {/* Dot Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:24px_24px]" />

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-32 right-20 w-8 h-8 border-2 border-primary/20 rounded-lg"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-32 left-20 w-6 h-6 border-2 border-secondary/20 rounded-full"
        />
      </div>

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
              My Work
            </motion.span>
            <div className="flex flex-col gap-4 relative">
              <h1 className="text-5xl font-bold text-headline">
                Featured Projects
              </h1>
              <p className="text-paragraph/80 max-w-2xl text-lg">
                Explore a collection of my latest works, showcasing innovative
                solutions and creative development approaches.
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
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-full transition-all ${
                  filter === "all"
                    ? "bg-primary text-white"
                    : "bg-background border border-paragraph/10 hover:border-primary"
                }`}
              >
                All
              </button>
              {technologies.map((tech) => {
                const techIcon = getTechIcon(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => setFilter(tech)}
                    className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                      filter === tech
                        ? "bg-primary text-white"
                        : "bg-background border border-paragraph/10 hover:border-primary"
                    }`}
                  >
                    {techIcon && (
                      <techIcon.icon
                        className="w-4 h-4"
                        style={{
                          color: filter === tech ? "white" : techIcon.color,
                        }}
                      />
                    )}
                    <span>{tech}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={projectVariants}
                  whileHover={{ scale: 1.02 }}
                  className="group backdrop-blur-sm bg-background/50 border border-paragraph/10 rounded-lg overflow-hidden hover:border-primary/20 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-headline mb-2">
                      {project.title}
                    </h3>
                    <p className="text-paragraph mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, index) => {
                        const techIcon = getTechIcon(tech);
                        return (
                          <motion.span
                            key={`${project.id}-${tech}-${index}`}
                            className="px-3 py-1 text-sm bg-primary/10 rounded-full flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                          >
                            {techIcon && (
                              <techIcon.icon
                                className="w-4 h-4"
                                style={{ color: techIcon.color }}
                              />
                            )}
                            <span className="text-primary">{tech}</span>
                          </motion.span>
                        );
                      })}
                    </div>

                    {project.timeline && project.timeline.length > 0 && (
                      <div className="mb-6">
                        <button
                          onClick={() => toggleTimeline(project.id)}
                          className="w-full flex items-center justify-between text-lg font-semibold text-headline p-2 border border-paragraph/10 rounded-lg hover:bg-primary/5 transition-colors"
                        >
                          <span>Development Timeline</span>
                          <svg
                            className={`w-5 h-5 transition-transform duration-200 ${
                              expandedTimelines.includes(project.id)
                                ? "rotate-180"
                                : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <div
                          className={`transition-all duration-300 overflow-hidden ${
                            expandedTimelines.includes(project.id)
                              ? "max-h-96 opacity-100 mt-4"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <Timeline events={project.timeline} />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4">
                      {project.screenshots &&
                        project.screenshots.length > 0 && (
                          <button
                            onClick={() => handleScreenshotsClick(project)}
                            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                          >
                            View Screenshots
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </button>
                        )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-paragraph"
            >
              No projects found matching the selected filter.
            </motion.div>
          )}

          {selectedProject && (
            <ScreenshotModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              projectTitle={selectedProject.title}
              screenshots={selectedProject.screenshots}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;
