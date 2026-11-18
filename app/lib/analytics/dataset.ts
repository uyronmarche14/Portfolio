/**
 * Synthetic recruitment-operations dataset for the analytics showcase.
 *
 * Every record is fictional and generated deterministically from a fixed seed (nothing here comes from an employer or a real person).
 * The shape mirrors a typical recruitment workbook: applications (one row per application, not per person) and interview appointments
 * with arrival evidence. Some evidence is deliberately missing so the dashboard shows a capability state instead of a healthy zero.
 */

export const SOURCES = ["Job board", "Referral", "Walk-in", "Social media", "Agency"] as const;
export const RECRUITERS = ["Recruiter A", "Recruiter B", "Recruiter C", "Recruiter D"] as const;
export const STAGES = ["Applied", "Screened", "Interviewed", "Offered", "Hired"] as const;
export type Source = (typeof SOURCES)[number];
export type Stage = (typeof STAGES)[number];

export const WEEKS = 26;
/** Fictional "as of" week index: weeks run 0..25, the last one is the current (running) week. */
export const CURRENT_WEEK = WEEKS - 1;

export interface Application {
  id: string;
  week: number;
  source: Source;
  recruiter: (typeof RECRUITERS)[number];
  /** Furthest stage reached. */
  stage: Stage;
  /** Hours since the last meaningful update; null = no evidence recorded (never treated as compliant). */
  hoursSinceUpdate: number | null;
}

export type Arrival = "arrived" | "no-evidence" | "upcoming";
export interface Appointment {
  id: string;
  week: number;
  source: Source;
  arrival: Arrival;
  /** Minutes waited on arrival; null = unreadable or not recorded. */
  waitMinutes: number | null;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, items: readonly T[], weights: number[]): T {
  const total = weights.reduce((s, w) => s + w, 0);
  let r = rand() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

const SOURCE_WEIGHTS = [34, 18, 16, 20, 12];
// per-source quality: later stages are likelier for referrals, rarer for social media
const STAGE_WEIGHTS: Record<Source, number[]> = {
  "Job board": [38, 28, 20, 8, 6],
  Referral: [22, 24, 26, 14, 14],
  "Walk-in": [34, 30, 22, 8, 6],
  "Social media": [52, 26, 14, 5, 3],
  Agency: [30, 26, 24, 11, 9],
};
const SHOW_RATE: Record<Source, number> = { "Job board": 0.8, Referral: 0.92, "Walk-in": 0.86, "Social media": 0.7, Agency: 0.84 };

function build() {
  const rand = mulberry32(20261114);
  const applications: Application[] = [];
  const appointments: Appointment[] = [];
  for (let week = 0; week < WEEKS; week++) {
    // gentle growth with seasonality
    const volume = Math.round(20 + week * 0.5 + Math.sin(week / 3) * 4);
    for (let i = 0; i < volume; i++) {
      const source = pick(rand, SOURCES, SOURCE_WEIGHTS);
      const recruiter = pick(rand, RECRUITERS, [30, 28, 24, 18]);
      const stage = pick(rand, STAGES, STAGE_WEIGHTS[source]);
      // recruiter D is slower to update: a visible, explainable exception
      const slow = recruiter === "Recruiter D" ? 1.7 : 1;
      const missing = rand() < 0.05;
      const hoursSinceUpdate = missing ? null : Math.round((6 + rand() * rand() * 140) * slow);
      applications.push({ id: `DEMO-APP-${String(applications.length + 1).padStart(4, "0")}`, week, source, recruiter, stage, hoursSinceUpdate });
    }
    const slots = Math.round(volume * 0.55);
    for (let i = 0; i < slots; i++) {
      const source = pick(rand, SOURCES, SOURCE_WEIGHTS);
      const upcoming = week === CURRENT_WEEK && rand() < 0.4;
      const arrived = !upcoming && rand() < SHOW_RATE[source];
      const arrival: Arrival = upcoming ? "upcoming" : arrived ? "arrived" : "no-evidence";
      const unreadable = arrived && rand() < 0.04;
      const waitMinutes = arrived && !unreadable ? Math.round(8 + rand() * rand() * 150) : null;
      appointments.push({ id: `DEMO-APT-${String(appointments.length + 1).padStart(4, "0")}`, week, source, arrival, waitMinutes });
    }
  }
  return { applications, appointments };
}

export const DATASET = build();
