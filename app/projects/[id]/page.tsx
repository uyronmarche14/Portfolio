"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/data/projects";
import ScreenshotCarousel from "@/components/ui/ScreenshotCarousel";
import TechBadge from "@/components/ui/TechBadge";
import Timeline from "@/components/ui/Timeline";

import { useParams } from "next/navigation";

const ProjectPage = () => {
  const params = useParams();
  const id = params.id as string;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <main className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-secondary/10 text-primary hover:bg-secondary/20 rounded-lg transition-colors border border-border/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Project Header */}
          <motion.section variants={itemVariants} className="text-center py-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-headline mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-paragraph max-w-4xl mx-auto leading-relaxed">
              {project.description}
            </p>
          </motion.section>


          {/* Action Buttons */}
          <motion.section variants={itemVariants} className="flex flex-row gap-4 items-center justify-center">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Live Demo
              </a>
            )}
          </motion.section>

          {/* Technologies */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-headline mb-6">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <TechBadge key={tech} technology={tech} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Project Description */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-headline mb-6">
              About This Project
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-paragraph leading-relaxed">
                {project.paragraph}
              </p>
            </div>
          </motion.section>

          {/* Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl md:text-3xl font-bold text-headline mb-6">
                Project Screenshots
              </h2>
              <ScreenshotCarousel screenshots={project.screenshots} alt={`${project.title} screenshots`} />
            </motion.section>
          )}

          {/* Timeline */}
          {project.timeline && project.timeline.length > 0 && (
            <motion.section variants={itemVariants}>
              <Timeline events={project.timeline} />
            </motion.section>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default ProjectPage;
