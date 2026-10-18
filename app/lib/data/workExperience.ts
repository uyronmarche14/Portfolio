export interface WorkExperienceEntry {
  id: string;
  role: string;
  company: string;
  dateRange: string;
  /** ISO year-month, used for the tenure strip */
  start: string;
  /** ISO year-month, null while the role is ongoing */
  end: string | null;
  /** true when only the year is known, so the strip draws the bar as approximate */
  approximate?: boolean;
  summary: string;
  /** exact phrases from `summary` that get the marker highlight */
  highlights?: string[];
  stack: string[];
  highlight: string;
  /** optional extra bullets for the full Experience page; add real ones, never invented */
  details?: string[];
  /** role photo; roles without one hide the photo views */
  image?: string;
}

export const workExperience: WorkExperienceEntry[] = [
  {
    id: "iopex",
    role: "Technical Business Analyst",
    company: "iOPEX Technologies",
    dateRange: "Aug 2026 - Present",
    start: "2026-08",
    end: null,
    summary:
      "Reviewing current workflows, user access, dependencies, and expected system behavior; consolidating recurring and new production issues into clear, reproducible findings; and building management and recruitment dashboards from high-volume, multi-source data, then presenting KPI, SLA, trend, and exception findings to stakeholders.",
    highlights: ["clear, reproducible findings", "management and recruitment dashboards", "KPI, SLA, trend, and exception findings"],
    stack: ["Requirements", "Issue triage", "Dashboards", "KPI & SLA"],
    highlight: "Turning operational data and production issues into decisions stakeholders can act on",
    details: [
      "Analyze how live enterprise applications behave today: user roles, access, dependencies, and expected system behavior.",
      "Turn business conversations and operational complaints into business requirements, functional requirements, and clear change descriptions.",
      "Triage production issues with expected versus actual behavior, reproduction steps, impact, and a clean handoff to developers.",
      "Build management and recruitment dashboards with KPI, SLA, trend, and exception views, and present the findings to stakeholders.",
      "Propose clearer document versioning, shared trackers, and change traceability."
    ],
  },
  {
    id: "beyondgen",
    role: "Full-Stack Software Developer / Project Manager",
    company: "Beyondgen (via Stockly)",
    dateRange: "Aug 2025 - Jul 2026",
    start: "2025-08",
    end: "2026-07",
    summary:
      "Worked on enterprise supplier quality management (SQM) modernization: a React and TypeScript frontend, an Express backend, and SQL Server data structures, with legacy VB.NET and ASP.NET analyzed to model approval workflows, roles, permissions, and statuses. The work also covered requirements and technical documentation, code review, regression checks, and CI validation.",
    highlights: ["supplier quality management", "approval workflows, roles, permissions, and statuses", "code review, regression checks, and CI validation"],
    stack: ["React", "TypeScript", "Express", "SQL Server"],
    highlight: "Legacy process analysis turned into a modern approval workflow platform",
    details: [
      "Investigated legacy behavior, data models, endpoints, and role permissions before changing existing business logic.",
      "Worked on multi-step approval and role models: requesters, checkers, approvers, and statuses with audit history.",
      "Wrote architecture documentation, migration mappings, gap analyses, and handover notes.",
      "Supported API regression checks, CI validation, smoke tests, and release readiness, and coordinated cross-module priorities as part of project management."
    ],
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1778596416/photo_18_2026-05-12_22-24-44_ahc51i.jpg",
  },
  {
    id: "buildfast",
    role: "Full-Stack Developer (contract)",
    company: "BuildFast",
    dateRange: "Dec 2025 - Feb 2026",
    start: "2025-12",
    end: "2026-02",
    summary:
      "Built backend services, APIs, reusable interfaces, and AI-assisted features aligned with contract milestones, including script-generation and video-workflow tooling.",
    highlights: ["backend services, APIs, reusable interfaces", "script-generation and video-workflow tooling"],
    stack: ["TypeScript", "APIs", "AI-assisted features", "Reusable UI"],
    highlight: "AI product delivery with modern full-stack architecture",
    details: [
      "Delivered application features to requirements and milestones.",
      "Refined implementations for maintainability and troubleshot integration issues."
    ],
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1770363154/photo_2026-02-06_15-30-20_iyrqgb.jpg",
  },
  {
    id: "keepitsimpleos",
    role: "Software Engineer (contract)",
    company: "KeepItSimpleOS",
    dateRange: "Sep 2025 - Nov 2025",
    start: "2025-09",
    end: "2025-11",
    summary:
      "Worked on application functionality, troubleshooting, and data-flow refinement for a trainer-client fitness platform with messaging and performance tracking.",
    highlights: ["troubleshooting", "data-flow refinement"],
    stack: ["Troubleshooting", "Messaging", "Performance tracking", "Data flow"],
    highlight: "Operational workflows and user-facing product behavior",
    details: [
      "Improved trainer-client management, communication, and performance-tracking workflows.",
      "Worked on defects and data-flow issues between interface behavior, business logic, and services."
    ],
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1778596414/photo_2026-05-10_21-04-55_2_lto1yd.jpg",
  },
  {
    id: "aique",
    role: "Frontend Developer (internship)",
    company: "Aique Innovation Solutions Corporation",
    dateRange: "Jan 2025 - Jun 2025",
    start: "2025-01",
    end: "2025-06",
    summary:
      "Built responsive React interfaces, connected them to backend APIs, debugged and refined features, and took part in an Agile team with code reviews.",
    highlights: ["responsive React interfaces", "Agile team"],
    stack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    highlight: "Frontend delivery inside a real Agile product team",
    details: [
      "Implemented frontend functionality against backend APIs, debugged behavior, and supported iterative improvements.",
      "Took part in Agile planning and code review."
    ],
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1778596431/photo_14_2026-05-12_22-24-44_sgkc3l.jpg",
  },
  {
    id: "freelance",
    role: "Independent / Freelance Software Developer",
    company: "Independent / Client Work",
    dateRange: "Jan 2024 - Present",
    start: "2024-01",
    end: null,
    summary:
      "A self-described umbrella of project scoping and application delivery across web and mobile, frontend and backend integration, and AI-assisted research, prototyping, and documentation.",
    highlights: ["project scoping and application delivery", "AI-assisted research, prototyping, and documentation"],
    stack: ["React", "Next.js", "React Native", "Node.js"],
    highlight: "Client delivery across web, mobile, and AI-assisted product work",
    details: [
      "Built or explored web and mobile projects from requirements and database design through APIs, authentication, dashboards, and deployment planning."
    ],
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1778596508/photo_1_2026-05-12_22-24-44_ipt1kx.jpg",
  },
];
