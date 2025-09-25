import React from "react";


import ProjectCard from "@/components/ui/projectCard";

import HeaderTitle from "@/components/ui/header"

import { projects } from "@/lib/data/projects";
import {
  PROJECTS_CONTENT,
  // ANIMATION_VARIANTS,
} from "@/lib/data/projectsContent";

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative flex min-h-screen snap-start justify-center overflow-hidden bg-background px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
    >
      {/* <AnimatedBackground /> */}

      <div className="relative w-full max-w-7xl rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-sm">
        {/* Main Content */}
        <div className="relative mx-auto max-w-6xl px-2 sm:px-4 pb-8 sm:pb-12 md:pb-16 pt-12 sm:pt-16 md:pt-24">
          <div className="relative z-10 backdrop-blur-sm">
            <div className="mb-8 sm:mb-10 text-center">
             <HeaderTitle 
               introText={PROJECTS_CONTENT.sectionTitle}
               highlightText={PROJECTS_CONTENT.sectionSubtitle}
               description={PROJECTS_CONTENT.sectionDescription}
             />
            </div>

            <div className="mb-8 sm:mb-10 md:mb-12">
              <div className="space-y-3 sm:space-y-4">
                {/* FilterDropdown component removed */}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-2">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
