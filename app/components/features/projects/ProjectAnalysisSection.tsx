"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import type { ProjectAnalysis } from "@/lib/data/projectAnalysis";

import { ProjectBanner } from "./ProjectBanner";

/** The analyst's view of a project: problem, traceability, workflow, rules and what is still unconfirmed. */
export function ProjectAnalysisSection({ analysis, projectId }: { analysis: ProjectAnalysis; projectId: string }) {
  return (
    <section id="analysis" className="scroll-mt-28 pt-14">
      <h2 className="border-b border-foreground/10 pb-2 font-display text-2xl tracking-tight text-foreground">Analysis</h2>
      <p className="mt-1 text-sm text-foreground/60">The requirements thinking behind the build.</p>

      <ProjectBanner id={projectId} className="mt-6 w-full rounded-2xl border border-foreground/15" />

      <h3 className="mt-8 font-mono text-xs text-primary">Problem</h3>
      <p className="mt-2 max-w-[66ch] text-[17px] leading-[1.75] text-foreground/80">{analysis.problem}</p>

      <h3 className="mt-10 font-mono text-xs text-primary">Traceability: need, requirement, rule, check</h3>
      <div className="mt-3 overflow-x-auto rounded-xl border border-foreground/15 bg-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-foreground/15 font-mono text-xs text-foreground/60">
              {["Need", "Requirement", "Business rule", "How to check"].map((h) => (
                <th key={h} scope="col" className="px-4 py-2.5 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {analysis.trace.map((row, i) => (
              <tr key={i} className="border-b border-foreground/10 align-top last:border-0">
                <td className="px-4 py-3 text-foreground">{row.need}</td>
                <td className="px-4 py-3 text-foreground/80">{row.requirement}</td>
                <td className="px-4 py-3 text-foreground/80">{row.rule}</td>
                <td className="px-4 py-3 text-foreground/70">{row.check}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {analysis.flow && (
        <>
          <h3 className="mt-10 font-mono text-xs text-primary">{analysis.flow.title}</h3>
          <ol className="mt-3 flex flex-wrap items-center gap-2">
            {analysis.flow.steps.map((step, i) => (
              <motion.li
                key={step}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <span className="rounded-lg border border-foreground/15 bg-card px-3 py-1.5 text-sm text-foreground">
                  <span className="mr-2 font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </span>
                {i < analysis.flow!.steps.length - 1 && <ArrowRight aria-hidden="true" className="h-4 w-4 text-foreground/40" />}
              </motion.li>
            ))}
          </ol>
          {analysis.flow.note && <p className="mt-2 text-xs text-foreground/55">{analysis.flow.note}</p>}
        </>
      )}

      <h3 className="mt-10 font-mono text-xs text-primary">Decision rules</h3>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-foreground/80">
        {analysis.rules.map((rule) => <li key={rule}>{rule}</li>)}
      </ul>

      <h3 className="mt-10 font-mono text-xs text-primary">Still unconfirmed</h3>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-foreground/70">
        {analysis.open.map((item) => <li key={item}>{item}</li>)}
      </ul>

      <p className="mt-6 rounded-md border border-foreground/15 bg-foreground/[0.04] px-3 py-2 text-xs text-foreground/65">{analysis.basis}</p>
    </section>
  );
}
