import type { Evidence } from "@/lib/data/processMap";
import { cn } from "@/lib/utils";

/** One color per evidence level, used for the dot on every node and chip. Concept is a hollow ring: proposed, not delivered. */
export const EVIDENCE_COLOR: Record<Evidence, string> = {
  practiced: "rgb(var(--primary))",
  built: "rgb(var(--tone-teal))",
  method: "rgb(var(--tone-violet))",
  concept: "rgb(var(--tone-amber))",
};

export function EvidenceDot({ evidence, className }: { evidence: Evidence; className?: string }) {
  const hollow = evidence === "concept";
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block h-2 w-2 shrink-0 rounded-full", className)}
      style={hollow ? { border: `1.5px solid ${EVIDENCE_COLOR[evidence]}` } : { background: EVIDENCE_COLOR[evidence] }}
    />
  );
}
