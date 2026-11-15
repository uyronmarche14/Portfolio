"use client";

import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data/process";
import { cn } from "@/lib/utils";

/**
 * The 12 process steps grouped into four phases. Groupings are by step order and
 * title only; every step's content still comes from process.ts unchanged.
 */
const PHASES = [
  { key: "frame", label: "Frame", blurb: "What is this and who is it for", stepIds: ["1", "2", "3", "4", "5"] },
  { key: "define", label: "Define", blurb: "How it behaves", stepIds: ["6", "7", "8"] },
  { key: "design", label: "Design", blurb: "How it is built", stepIds: ["9", "10"] },
  { key: "govern", label: "Govern", blurb: "Who controls it and what could go wrong", stepIds: ["11", "12"] },
] as const;

/** The original intro card's checklist, kept as it was. */
const FEATURES = ["Strategic Planning", "Document Automation", "Process Optimization", "Timeline Execution"];

const WorkWithMeSection = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [activeId, setActiveId] = useState(processSteps[0].id);

  const phase = PHASES[phaseIndex];
  const phaseSteps = processSteps.filter((step) => (phase.stepIds as readonly string[]).includes(step.id));
  const active = processSteps.find((step) => step.id === activeId) ?? phaseSteps[0];

  const choosePhase = (index: number) => {
    setPhaseIndex(index);
    setActiveId(PHASES[index].stepIds[0]);
  };

  return (
    <section id="work-with-me" className="relative w-full py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="07"
          title="Work with me"
          subtitle="How a project runs, from first document to a synced timeline."
        />

        {/* The original image card, now the cover for the phases below */}
        <Link
          href="/process"
          data-cursor="Open process map"
          className="group relative mb-12 block h-[340px] w-full overflow-hidden rounded-3xl border border-foreground/15 outline-none focus-visible:ring-2 focus-visible:ring-ring md:h-[420px]"
        >
          <Image
            src="https://res.cloudinary.com/ddnxfpziq/image/upload/v1754823296/photo_7_2025-08-10_18-53-55_y00lcx.jpg"
            alt="People working together at laptops in a workshop"
            fill
            loading="lazy"
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="object-cover brightness-[0.62] transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <span className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-10">
            <span className="max-w-2xl">
              <span className="block font-display text-3xl leading-tight text-white md:text-5xl">From concept to reality</span>
              <span className="mt-3 block max-w-lg text-base leading-relaxed text-zinc-200 md:text-lg">
                We start with document automation and end with a synchronized timeline. Pick a phase below, or open the full process map.
              </span>
              <span className="mt-5 grid grid-cols-2 gap-2 sm:max-w-md">
                {FEATURES.map((item) => (
                  <span key={item} className="flex items-center gap-2 text-sm text-white">
                    <Check size={14} aria-hidden="true" className="shrink-0 text-[rgb(var(--accent-2))]" strokeWidth={3} />
                    {item}
                  </span>
                ))}
              </span>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white underline-offset-4 group-hover:underline">
                View process map <ArrowRight size={16} aria-hidden="true" />
              </span>
            </span>
          </span>
        </Link>

        {/* progress rail: four phases, filled up to the current one */}
        <div role="tablist" aria-label="Project phases" className="relative mx-auto mb-10 grid max-w-3xl grid-cols-4 gap-2">
          <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[19px] h-px bg-foreground/20" />
          <span
            aria-hidden="true"
            className="absolute left-[12.5%] top-[19px] h-px bg-primary"
            style={{ width: `${(phaseIndex / (PHASES.length - 1)) * 75}%` }}
          />
          {PHASES.map((item, index) => {
            const selected = index === phaseIndex;
            const reached = index <= phaseIndex;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => choosePhase(index)}
                className="group relative flex min-h-16 flex-col items-center gap-2 rounded-lg px-1 pt-1 text-center outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span
                  className={cn(
                    "relative z-10 flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 font-mono text-xs transition-colors",
                    selected
                      ? "border-primary bg-primary text-[rgb(var(--primary-foreground))]"
                      : reached
                      ? "border-primary bg-background text-primary"
                      : "border-foreground/30 bg-background text-muted group-hover:border-primary"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={cn("font-display text-base leading-none sm:text-lg", selected ? "text-foreground" : "text-foreground/60")}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mb-6 text-center font-mono text-xs uppercase tracking-wider text-muted">{phase.blurb}</p>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-12">
          {/* steps in this phase: a short list instead of all twelve */}
          <ol aria-label={`${phase.label} steps`} className="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap">
            {phaseSteps.map((step) => {
              const selected = step.id === active.id;
              return (
                <li key={step.id} className="lg:w-full">
                  <button
                    type="button"
                    aria-current={selected ? "step" : undefined}
                    aria-controls="process-detail"
                    onClick={() => setActiveId(step.id)}
                    className={cn(
                      "flex min-h-11 w-full items-center gap-3 rounded-full border px-4 py-2 text-left text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring lg:rounded-xl",
                      selected ? "border-primary bg-primary/10 text-foreground" : "border-foreground/20 text-foreground/75 hover:border-primary"
                    )}
                  >
                    <span className={cn("font-mono text-xs", selected ? "text-primary" : "text-muted")}>
                      {String(Number(step.id)).padStart(2, "0")}
                    </span>
                    <span className="font-medium">{step.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div id="process-detail" aria-live="polite" className="space-y-6">
            <div>
              <p className="font-mono text-xs text-primary">
                Step {active.id} of {processSteps.length} · {active.duration}
              </p>
              <h3 className="mt-2 font-display text-3xl text-foreground">{active.title}</h3>
              <p className="mt-2 text-foreground/70">{active.shortDesc}</p>
            </div>
            <p className="max-w-prose leading-relaxed text-foreground/80">{active.description}</p>
            <ul className="max-w-prose space-y-2 border-t border-foreground/15 pt-4 text-sm leading-relaxed text-foreground/70">
              {active.details.map((detail) => (
                <li key={detail} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-primary" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            {active.outcomes && <p className="font-mono text-xs text-muted">Outputs: {active.outcomes.join(" · ")}</p>}
            <Link
              href="/process"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              Open the full process map <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithMeSection;
