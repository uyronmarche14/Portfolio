

import ProjectCard from "@/components/ui/projectCard";

import HeaderTitle from "@/components/ui/header";

import { projects } from "@/lib/data/projects";
import {
  PROJECTS_CONTENT,
} from "@/lib/data/projectsContent";

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative w-full min-h-screen snap-start overflow-hidden py-16 md:py-24"
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <HeaderTitle 
            introText={PROJECTS_CONTENT.sectionTitle}
            highlightText={PROJECTS_CONTENT.sectionSubtitle}
            description={PROJECTS_CONTENT.sectionDescription}
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
