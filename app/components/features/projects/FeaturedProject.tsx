"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ProjectVisual, hasProjectVisual } from "./ProjectVisuals";
import type { LegacyProject } from "@/lib/data/projects";
import { workExperience } from "@/lib/data/workExperience";
import { cn } from "@/lib/utils";
import { durations, editorialReveal } from "@/lib/utils/animations";

interface FeaturedProjectProps {
  project: LegacyProject;
  index: number;
}

const MAX_THUMBS = 5;

/** Editorial row: number, category, summary, role, key features and stack beside a visual. Alternates sides by index. */
export function FeaturedProject({ project, index }: FeaturedProjectProps) {
  const [shotIndex, setShotIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const num = String(index + 1).padStart(2, "0");
  const shots = (project.screenshots ?? []).slice(0, MAX_THUMBS);
  const currentShot = shots[shotIndex];
  const reversed = index % 2 === 1;
  const inDevelopment = project.status === "in-development";
  const experience = project.experienceId ? workExperience.find((entry) => entry.id === project.experienceId) : undefined;
  const keyFeatures = (project.features ?? []).slice(0, 2);

  return (
    <motion.article
      variants={editorialReveal}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="grid items-center gap-8 border-t border-foreground/15 py-10 md:grid-cols-2 md:gap-14 md:py-14"
    >
      <div className={cn("space-y-5", reversed && "md:order-2")}>
        <p className="font-mono text-xs text-muted">
          <span className="text-primary">{num}</span> / {project.category ?? "Project"}
          {inDevelopment && <span className="ml-3 rounded-full border border-primary/40 px-2 py-0.5 text-primary">In development</span>}
        </p>
        <h3 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
          <Link href={`/projects/${project.id}`} className="transition-colors hover:text-primary">
            {project.title}
          </Link>
        </h3>
        <p className="max-w-prose leading-relaxed text-foreground/75">{project.description}</p>

        {(experience || keyFeatures.length > 0) && (
          <dl className="max-w-prose space-y-3 border-y border-foreground/15 py-4 text-sm">
            {experience && (
              <div className="grid gap-1 sm:grid-cols-[6rem_minmax(0,1fr)]">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">My role</dt>
                <dd className="text-foreground/85">
                  {experience.role}, {experience.company}{" "}
                  <span className="font-mono text-xs text-muted">({experience.dateRange})</span>
                </dd>
              </div>
            )}
            {keyFeatures.length > 0 && (
              <div className="grid gap-1 sm:grid-cols-[6rem_minmax(0,1fr)]">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">Key features</dt>
                <dd>
                  <ul className="space-y-1.5 text-foreground/85">
                    {keyFeatures.map((feature) => (
                      <li key={feature} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        )}

        <ul className="flex flex-wrap gap-1.5" aria-label="Technology stack">
          {project.technologies.slice(0, 8).map((tech) => (
            <li key={tech} className="rounded-md border border-foreground/15 px-2 py-1 font-mono text-xs text-foreground/70">
              {tech}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-5 pt-1 text-sm font-medium">
          <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-1.5 text-foreground hover:text-primary">
            Case study <ArrowRight size={14} aria-hidden="true" />
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-foreground/60 hover:text-primary">
              Live <ExternalLink size={13} aria-hidden="true" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-foreground/60 hover:text-primary">
              Code <Github size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <div className={cn(reversed && "md:order-1")}>
        <Link
          href={`/projects/${project.id}`}
          data-cursor="View case study"
          aria-hidden="true"
          tabIndex={-1}
          className="relative block aspect-[16/10] w-full overflow-hidden rounded-lg border border-foreground/15 bg-card"
        >
          {currentShot ? (
            <AnimatePresence initial={false}>
              <motion.div
                key={currentShot}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : durations.fast }}
                className="absolute inset-0"
              >
                <Image
                  src={currentShot}
                  alt={`${project.title} screenshot ${shotIndex + 1}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>
          ) : hasProjectVisual(project.id) ? (
            <ProjectVisual id={project.id} className="h-full w-full p-4" />
          ) : null}
        </Link>

        {shots.length > 1 ? (
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={`${project.title} screenshots`}>
            {shots.map((shot, i) => (
              <button
                key={shot}
                type="button"
                aria-label={`Show screenshot ${i + 1} of ${shots.length}`}
                aria-pressed={i === shotIndex}
                onClick={() => setShotIndex(i)}
                className={cn(
                  "relative h-11 w-16 overflow-hidden rounded-md border outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                  i === shotIndex ? "border-primary" : "border-foreground/15 opacity-70 hover:opacity-100"
                )}
              >
                <Image src={shot} alt="" fill loading="lazy" sizes="64px" className="object-cover object-top" />
              </button>
            ))}
          </div>
        ) : (
          !currentShot && <p className="mt-3 font-mono text-xs text-muted">Illustrative preview, not a screenshot.</p>
        )}
      </div>
    </motion.article>
  );
}
