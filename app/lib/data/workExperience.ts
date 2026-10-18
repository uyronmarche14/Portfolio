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
  image: string;
}

export const workExperience: WorkExperienceEntry[] = [
  {
    id: "freelance",
    role: "Freelance Software Developer",
    company: "Independent / Client Work",
    dateRange: "Jan 2024 - Present",
    start: "2024-01",
    end: null,
    summary:
      "Designing and delivering full-stack web and mobile solutions for startup and enterprise clients while combining hands-on engineering with AI-assisted workflows for refactoring, iteration, and delivery speed.",
    highlights: ["full-stack web and mobile", "AI-assisted workflows"],
    stack: ["React", "Next.js", "React Native", "Node.js"],
    highlight: "Client delivery across web, mobile, and AI-assisted product work",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1778596508/photo_1_2026-05-12_22-24-44_ipt1kx.jpg",
  },
  {
    id: "aique",
    role: "Frontend Developer",
    company: "Aique Innovation Solutions Corporation",
    dateRange: "Jan 2025 - Jun 2025",
    start: "2025-01",
    end: "2025-06",
    summary:
      "Built responsive and reusable React interfaces, connected backend APIs across multiple user roles, and worked in an Agile environment with sprint planning, code reviews, and iterative feature delivery.",
    highlights: ["responsive and reusable React interfaces", "Agile environment"],
    stack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    highlight: "Frontend delivery inside a real Agile product team",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1778596431/photo_14_2026-05-12_22-24-44_sgkc3l.jpg",
  },
  {
    id: "beyondgen",
    role: "Software Developer",
    company: "Beyondgen",
    dateRange: "Aug 2025 - May 2026",
    start: "2025-08",
    end: "2026-05",
    summary:
      "Developed a supplier quality management platform with multi-step approval workflows, audit logs, status tracking, and a Microsoft SQL Server backend built without an ORM.",
    highlights: ["multi-step approval workflows", "audit logs", "Microsoft SQL Server"],
    stack: ["TypeScript", "Microsoft SQL Server", "Approval Workflows", "Audit Logs"],
    highlight: "Workflow-heavy enterprise platform work with structured backend logic",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1778596416/photo_18_2026-05-12_22-24-44_ahc51i.jpg",
  },
  {
    id: "keepitsimpleos",
    role: "Software Engineer",
    company: "KeepItSimpleOS",
    dateRange: "Sep 2025 - Nov 2025",
    start: "2025-09",
    end: "2025-11",
    summary:
      "Built a centralized fitness platform for trainers to manage clients, messaging, and performance tracking while integrating third-party APIs and AI-assisted communication flows.",
    highlights: ["centralized fitness platform", "AI-assisted communication flows"],
    stack: ["Platform Engineering", "Messaging", "3rd-Party APIs", "AI Workflows"],
    highlight: "Product engineering for trainer-client operations and communication",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1778596414/photo_2026-05-10_21-04-55_2_lto1yd.jpg",
  },
  {
    id: "buildfast",
    role: "Full-Stack Developer",
    company: "BuildFast",
    dateRange: "2025 - 2026",
    start: "2025-01",
    end: "2026-12",
    approximate: true,
    summary:
      "Worked on AI-powered platforms with modern frontend and backend architecture, contributing to script generation, video workflow tooling, maintainable components, and faster feature delivery under tight timelines.",
    highlights: ["AI-powered platforms", "script generation", "video workflow tooling"],
    stack: ["TypeScript", "AI Platforms", "Script Generation", "Video Tooling"],
    highlight: "AI product delivery with modern full-stack architecture",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1770363154/photo_2026-02-06_15-30-20_iyrqgb.jpg",
  },
];
