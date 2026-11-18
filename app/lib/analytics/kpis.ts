import { CURRENT_WEEK, DATASET, SOURCES, STAGES, WEEKS, type Application, type Appointment, type Source, type Stage } from "./dataset";

export const UPDATE_TARGET_HOURS = 72;
export const PERIODS = [
  { key: 8, label: "Last 8 weeks" },
  { key: 13, label: "Last 13 weeks" },
  { key: 26, label: "All 26 weeks" },
] as const;

export interface Filter {
  weeks: number;
  source: Source | "all";
}

export interface WeekPoint {
  week: number;
  label: string;
  applications: number;
  /** null = no past appointment this week, so no rate (never a zero). */
  showUp: number | null;
  running: boolean;
}

export interface Kpis {
  applications: Application[];
  appointments: Appointment[];
  received: number;
  /** Applications with a recorded update time. */
  withEvidence: number;
  withoutEvidence: number;
  compliant: number;
  compliance: number | null;
  arrived: number;
  noEvidence: number;
  upcoming: number;
  showUp: number | null;
  medianWait: number | null;
  waitBands: { key: string; label: string; value: number }[];
  unreadableWait: number;
  funnel: { stage: Stage; reached: number }[];
  bySource: { source: Source; received: number; hired: number; showUp: number | null; compliance: number | null }[];
  byRecruiter: { recruiter: string; open: number; breaching: number }[];
  weekly: WeekPoint[];
}

const rate = (num: number, den: number) => (den > 0 ? (num / den) * 100 : null);
const stageIndex = (s: Stage) => STAGES.indexOf(s);

function median(values: number[]): number | null {
  if (!values.length) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/** Every number on the page comes from this one function, so cards, charts and tables always agree for the same filter. */
export function computeKpis(filter: Filter): Kpis {
  const from = Math.max(0, WEEKS - filter.weeks);
  const inScope = <T extends { week: number; source: Source }>(r: T) =>
    r.week >= from && (filter.source === "all" || r.source === filter.source);
  const applications = DATASET.applications.filter(inScope);
  const appointments = DATASET.appointments.filter(inScope);

  const withEv = applications.filter((a) => a.hoursSinceUpdate !== null);
  const compliant = withEv.filter((a) => (a.hoursSinceUpdate as number) <= UPDATE_TARGET_HOURS).length;

  const arrivedRows = appointments.filter((a) => a.arrival === "arrived");
  const noEvidence = appointments.filter((a) => a.arrival === "no-evidence").length;
  const upcoming = appointments.filter((a) => a.arrival === "upcoming").length;
  const waits = arrivedRows.flatMap((a) => (a.waitMinutes === null ? [] : [a.waitMinutes]));
  const band = (lo: number, hi: number) => waits.filter((w) => w >= lo && w < hi).length;

  const funnel = STAGES.map((stage) => ({ stage, reached: applications.filter((a) => stageIndex(a.stage) >= stageIndex(stage)).length }));

  const bySource = SOURCES.filter((s) => filter.source === "all" || s === filter.source).map((source) => {
    const apps = applications.filter((a) => a.source === source);
    const apts = appointments.filter((a) => a.source === source);
    const ev = apps.filter((a) => a.hoursSinceUpdate !== null);
    const arr = apts.filter((a) => a.arrival === "arrived").length;
    const miss = apts.filter((a) => a.arrival === "no-evidence").length;
    return {
      source,
      received: apps.length,
      hired: apps.filter((a) => a.stage === "Hired").length,
      showUp: rate(arr, arr + miss),
      compliance: rate(ev.filter((a) => (a.hoursSinceUpdate as number) <= UPDATE_TARGET_HOURS).length, ev.length),
    };
  });

  const recruiters = Array.from(new Set(applications.map((a) => a.recruiter))).sort();
  const byRecruiter = recruiters.map((recruiter) => {
    const open = applications.filter((a) => a.recruiter === recruiter && a.stage !== "Hired");
    return { recruiter, open: open.length, breaching: open.filter((a) => (a.hoursSinceUpdate ?? Infinity) > UPDATE_TARGET_HOURS).length };
  });

  const weekly: WeekPoint[] = [];
  for (let week = from; week < WEEKS; week++) {
    const apts = appointments.filter((a) => a.week === week);
    const arr = apts.filter((a) => a.arrival === "arrived").length;
    const miss = apts.filter((a) => a.arrival === "no-evidence").length;
    weekly.push({
      week,
      label: `W${week + 1}`,
      applications: applications.filter((a) => a.week === week).length,
      showUp: rate(arr, arr + miss),
      running: week === CURRENT_WEEK,
    });
  }

  const arrived = arrivedRows.length;
  return {
    applications,
    appointments,
    received: applications.length,
    withEvidence: withEv.length,
    withoutEvidence: applications.length - withEv.length,
    compliant,
    compliance: rate(compliant, withEv.length),
    arrived,
    noEvidence,
    upcoming,
    showUp: rate(arrived, arrived + noEvidence),
    medianWait: median(waits),
    waitBands: [
      { key: "b1", label: "Under 30 min", value: band(0, 30) },
      { key: "b2", label: "30-60 min", value: band(30, 60) },
      { key: "b3", label: "60-90 min", value: band(60, 90) },
      { key: "b4", label: "90 min or more", value: band(90, Infinity) },
    ],
    unreadableWait: arrived - waits.length,
    funnel,
    bySource,
    byRecruiter,
    weekly,
  };
}

export interface KpiDefinition {
  id: string;
  name: string;
  question: string;
  formula: string;
  grain: string;
  dateBasis: string;
  exclusions: string;
}

/** The "how I defined this KPI" panel. One entry per KPI: name the business question, formula, grain, date basis and what is left out. */
export const KPI_DEFINITIONS: KpiDefinition[] = [
  {
    id: "received",
    name: "Applications received",
    question: "How much demand is entering the pipeline?",
    formula: "Count of application rows in the selected period and source.",
    grain: "One row per application, not per person. A candidate who applies twice counts twice.",
    dateBasis: "Application week (Monday to Sunday, Asia/Manila).",
    exclusions: "None. Never collapse by candidate ID alone.",
  },
  {
    id: "compliance",
    name: "Update compliance",
    question: "Are applications being progressed on time?",
    formula: `Applications updated within ${UPDATE_TARGET_HOURS} hours / applications with a recorded update time.`,
    grain: "One row per application.",
    dateBasis: "Hours elapsed since the last meaningful update.",
    exclusions: "Applications with no recorded update time are shown separately as 'no evidence'. They are not counted as compliant and not hidden.",
  },
  {
    id: "showup",
    name: "Interview show-up rate",
    question: "How many scheduled candidates actually arrive?",
    formula: "Arrivals / (arrivals + past appointments with no arrival evidence).",
    grain: "One row per appointment.",
    dateBasis: "Appointment week.",
    exclusions: "Upcoming appointments are excluded until they pass. 'No arrival evidence' is not called a confirmed no-show because the kiosk may simply have missed the visit.",
  },
  {
    id: "wait",
    name: "Median waiting time",
    question: "How long do arrived candidates wait?",
    formula: "Median of recorded waiting minutes across arrivals; bands show the distribution.",
    grain: "One row per arrival.",
    dateBasis: "Appointment week.",
    exclusions: "Arrivals with an unreadable duration stay in the arrival count but are left out of the median and the bands. The count of unreadable rows is shown.",
  },
  {
    id: "funnel",
    name: "Pipeline funnel",
    question: "Where do applications drop out?",
    formula: "Applications that reached each stage or beyond.",
    grain: "One row per application, using the furthest stage reached.",
    dateBasis: "Application week.",
    exclusions: "This is a snapshot of furthest stage, not true stage-to-stage conversion, because stage history is not recorded. It is labelled that way on the page.",
  },
];
