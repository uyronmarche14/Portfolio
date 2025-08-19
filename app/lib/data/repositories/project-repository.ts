/**
 * Project repository implementation
 */

import type {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
} from "@/lib/types";
import { FileBasedRepository } from "./base";

/**
 * Project repository for managing project data
 */
export class ProjectRepository extends FileBasedRepository<
  Project,
  CreateProjectInput,
  UpdateProjectInput
> {
  /**
   * Load projects from data source
   */
  protected async loadData(): Promise<Project[]> {
    try {
      // In a real implementation, this would load from a file or API
      // For now, we'll return an empty array and let the data be populated through create operations
      const { projects } = await import("@/data/projects");

      // Transform the imported data to match our Project interface
      return projects.map((project) => ({
        ...project,
        id: project.id,
        createdAt: new Date(project.timeline?.[0]?.date || Date.now()),
        updatedAt: new Date(),
        category: "web" as const, // Default category
        status: "completed" as const, // Default status
        content: project.paragraph,
        features: project.features.map((feature) => ({
          id: `${project.id}-feature-${feature}`,
          title: feature,
          description: feature,
          implemented: true,
          priority: "medium" as const,
        })),
        images: [
          {
            url: project.image,
            alt: `${project.title} preview`,
            type: "preview" as const,
            featured: true,
          },
          ...project.screenshots.map((screenshot, _index) => ({
            url: screenshot,
            alt: `${project.title} screenshot ${_index + 1}`,
            type: "screenshot" as const,
            order: _index,
          })),
        ],
        technologies: project.technologies.map((tech) => ({
          id: `tech-${tech.toLowerCase().replace(/\s+/g, "-")}`,
          name: tech,
          displayName: tech,
          description: `${tech} technology used in this project`,
          category: "other" as const,
          icon: {
            name: tech.toLowerCase(),
            type: "icon" as const,
          },
          color: "#2563eb",
          proficiency: "advanced" as const,
          learningStatus: "proficient" as const,
          featured: false,
          visible: true,
          tags: [tech.toLowerCase()],
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        links: [
          ...(project.githubUrl
            ? [
                {
                  url: project.githubUrl,
                  label: "GitHub Repository",
                  type: "github" as const,
                  primary: true,
                },
              ]
            : []),
          ...(project.liveUrl
            ? [
                {
                  url: project.liveUrl,
                  label: "Live Demo",
                  type: "demo" as const,
                  primary: false,
                },
              ]
            : []),
          ...(project.liveDemoUrl && project.liveDemoUrl !== project.liveUrl
            ? [
                {
                  url: project.liveDemoUrl,
                  label: "Live Demo",
                  type: "demo" as const,
                  primary: false,
                },
              ]
            : []),
        ],
        timeline: project.timeline?.map((event) => ({
          date: new Date(event.date),
          title: event.title,
          description: event.description,
          milestone: true,
        })),
        featured: true,
        tags: project.technologies.map((tech) => tech.toLowerCase()),
        visible: true,
      }));
    } catch (error) {
      console.error("Failed to load projects:", error);
      return [];
    }
  }

  /**
   * Save projects to data source
   */
  protected async saveData(data: Project[]): Promise<void> {
    // In a real implementation, this would save to a file or API
    // For now, we'll just log the operation
    console.warn(`Saving ${data.length} projects to data source`);
  }

  /**
   * Create a new project entity with timestamps
   */
  protected createEntity(input: CreateProjectInput): Project {
    const now = new Date();
    return {
      ...input,
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Update an existing project entity with new timestamp
   */
  protected updateEntity(
    existing: Project,
    updates: UpdateProjectInput
  ): Project {
    return {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
  }
}
