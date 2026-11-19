import { computeKpis } from "@/lib/analytics/kpis";

// one pass over the synthetic dataset, at module load: the strip is the same on every page and costs nothing per render
const K = computeKpis({ weeks: 26, source: "all" });
const SERIES = K.weekly.map((w) => w.applications);
const MAX = Math.max(...SERIES);
const MIN = Math.min(...SERIES);
const W = 1000;
const H = 80;
const PAD = 10;
const pts = SERIES.map((v, i) => [(i / (SERIES.length - 1)) * W, PAD + (1 - (v - MIN) / Math.max(1, MAX - MIN)) * (H - PAD * 2)] as const);
const LINE = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
const AREA = `${LINE} L${W},${H} L0,${H} Z`;

/** A decorative line from the synthetic sample data. It sits behind the top of the footer, edge to edge, and adds no height. */
export function FooterPulse() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-24 h-24"
      style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" focusable="false">
        <defs>
          <linearGradient id="fp-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="rgb(var(--accent-2))" />
            <stop offset="1" stopColor="rgb(var(--primary))" />
          </linearGradient>
          <linearGradient id="fp-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="rgb(var(--primary))" stopOpacity="0.16" />
            <stop offset="1" stopColor="rgb(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={AREA} fill="url(#fp-fill)" className="fp-area" />
        <path d={LINE} fill="none" stroke="rgb(255 255 255 / 0.9)" strokeWidth={1.6} strokeLinecap="round" pathLength={1} className="fp-glint" />
        <path d={LINE} fill="none" stroke="url(#fp-line)" strokeWidth={1.1} strokeLinejoin="round" strokeLinecap="round" pathLength={1} className="fp-line" />
      </svg>
    </div>
  );
}
