import ProjectCard from "@/components/ui/projectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { projects } from "@/lib/data/projects";
import { PROJECTS_CONTENT } from "@/lib/data/projectsContent";

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative min-h-screen w-full snap-start overflow-hidden py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          title={PROJECTS_CONTENT.sectionTitle}
          subtitle={PROJECTS_CONTENT.sectionDescription}
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
