import { projects } from "./projects";
import {
  ANALYTICS,
  BEYONDGEN,
  EVIDENCE,
  IOPEX,
  SQM,
  edges as processEdges,
  resolvedNodes as processNodes,
  scenarios,
  stages,
  type Evidence,
  type MapEdge,
  type ResolvedNode,
  type Scenario,
  type SeenIn,
  type StageId,
} from "./processMap";

/**
 * The whole /process page as one typed graph with four lanes:
 *   process   the 26 steps (from processMap.ts)
 *   artifact  the documents and data those steps produce and consume
 *   tool      the dev and analysis tools used at each step
 *   pipeline  the delivery pipeline, taken from this repo's real CI workflow
 * Every link has a kind and says what it carries and why. Positions are computed by `layout()` from lane, column and row only.
 *
 * Guardrails (data2.md): a tool being listed is not a claim of mastery, so each tool has an evidence level; hosting is shown as a target
 * (no deploy config exists in this repo); no employer application names; proposed homelab items are "concept".
 */

export { EVIDENCE, scenarios, stages };
export type { Evidence, Scenario, SeenIn, StageId };

export type Lane = "process" | "artifact" | "tool" | "pipeline";
export type EdgeKind = "flow" | "loop" | "produces" | "feeds" | "uses" | "pipeline" | "checks";
export type ToolCategory = "docs" | "frontend" | "mobile" | "backend" | "data" | "quality" | "ai" | "infra" | "hardware";

export const LANES: { id: Lane; title: string; blurb: string }[] = [
  { id: "process", title: "Process", blurb: "The steps, the decision gates and the loops back." },
  { id: "artifact", title: "Artifacts and data", blurb: "What each step produces and what the next one needs." },
  { id: "tool", title: "Tools", blurb: "The tools I use, and the steps they support." },
  { id: "pipeline", title: "Delivery pipeline", blurb: "How a change is checked and shipped. Taken from this site's real CI workflow." },
];

export const TOOL_CATEGORIES: { id: ToolCategory; title: string; blurb: string; tone: "violet" | "teal" | "amber" | "rose" }[] = [
  { id: "docs", title: "Requirements and docs", blurb: "Writing, mapping and reporting", tone: "amber" },
  { id: "frontend", title: "Frontend", blurb: "Interfaces and dashboards", tone: "violet" },
  { id: "mobile", title: "Mobile and desktop", blurb: "Apps on phones and PCs", tone: "rose" },
  { id: "backend", title: "Backend and APIs", blurb: "Services, auth and real time", tone: "teal" },
  { id: "data", title: "Data", blurb: "Databases and data access", tone: "amber" },
  { id: "quality", title: "Quality and source control", blurb: "Tests, inspection, history", tone: "rose" },
  { id: "ai", title: "AI", blurb: "Assistants and AI features", tone: "violet" },
  { id: "infra", title: "Runtime and hosting", blurb: "Environments and delivery", tone: "teal" },
  { id: "hardware", title: "Hardware and embedded", blurb: "Devices, sensors, game tools", tone: "amber" },
];

// ---------------------------------------------------------------------------------------------------------------------------------------
// Nodes
// ---------------------------------------------------------------------------------------------------------------------------------------

export interface ProcessSysNode extends ResolvedNode {
  lane: "process";
}

export interface ArtifactNode {
  lane: "artifact";
  id: string;
  title: string;
  summary: string;
  /** the stage column it sits under */
  stage: StageId;
  row: number;
  /** what the document contains, as a template */
  contains: string[];
  /** process steps that produce it and that need it */
  producedBy: string[];
  usedBy: string[];
  evidence: Evidence;
  seenIn: SeenIn[];
}

export interface ToolNode {
  lane: "tool";
  id: string;
  title: string;
  summary: string;
  category: ToolCategory;
  row: number;
  /** key in techStack.ts when it has a brand icon */
  tech?: string;
  /** the names this tool goes by in projects.ts; links to those projects are derived from them, so they cannot drift */
  techNames?: string[];
  /** step or pipeline node ids that use it */
  usedIn: string[];
  evidence: Evidence;
  seenIn: SeenIn[];
}

export interface PipelineNode {
  lane: "pipeline";
  id: string;
  title: string;
  summary: string;
  /** position along the chain, 0-based */
  col: number;
  /** the command or action, when there is one */
  command?: string;
  checks: string[];
  evidence: Evidence;
  seenIn: SeenIn[];
}

export type SysNode = ProcessSysNode | ArtifactNode | ToolNode | PipelineNode;

const LMS: SeenIn = { label: "Learning Management System", href: "/projects/lms-learning-management" };
const CICT: SeenIn = { label: "CICT platform", href: "/projects/cict-organization-website" };
const SITE: SeenIn = { label: "This portfolio", href: "/" };

const art = (
  id: string,
  title: string,
  stage: StageId,
  row: number,
  summary: string,
  contains: string[],
  producedBy: string[],
  usedBy: string[],
  evidence: Evidence = "practiced",
  seenIn: SeenIn[] = []
): ArtifactNode => ({ lane: "artifact", id, title, summary, stage, row, contains, producedBy, usedBy, evidence, seenIn });

export const artifactNodes: ArtifactNode[] = [
  art("a-request", "Request record", "discover", 0, "One record per request, with a single ID that follows it to resolution.", ["Request ID", "Who raised it and in which role", "Application area", "Expected versus actual behavior", "Business consequence"], ["d-capture"], ["m-asis", "m-data"], "practiced", [IOPEX]),
  art("a-notes", "Interview notes and open questions", "discover", 1, "What each process owner said, plus what is still unclear.", ["Trigger and actors", "Documents and approvals", "Pain points", "Open questions and who answers them"], ["d-interviews"], ["m-asis", "d-frame"], "method"),
  art("a-brief", "Product overview and problem statement", "discover", 3, "The first usable description of the product, the problem and the people it is for.", ["One-line description", "Problem and goals", "First audience", "What it must not become"], ["d-frame", "d-problem", "d-users"], ["s-mvp"], "method"),
  art("a-asis", "As-is and to-be process maps", "model", 0, "How the work really runs, and how it should run, with manual and system actions apart.", ["Actors and triggers", "Fields and documents per stage", "Decisions and exception paths", "Owner and system of record", "Future-state differences"], ["m-asis"], ["m-workflow", "s-req"], "practiced", [IOPEX, SQM]),
  art("a-states", "State and transition model", "model", 1, "Valid states, who may move a record between them, and what each move needs.", ["States and allowed transitions", "Actor per transition", "Mandatory data", "History and timestamps", "Side effects"], ["m-workflow"], ["m-roles", "s-req"], "built", [BEYONDGEN, SQM]),
  art("a-perm", "Permission matrix", "model", 2, "Roles as rows, resources and actions as columns, with conditions.", ["Roles", "Resources and actions", "Conditions", "Enforcement point (service layer)"], ["m-roles"], ["s-req", "b-build"], "built", [SQM, LMS]),
  art("a-data", "Data model", "model", 3, "Entities, the grain of each record and where each fact lives.", ["Entities and keys", "Grain of each record", "Source of truth", "Stable identifiers"], ["m-data"], ["s-req", "s-ac", "g-schema"], "built", [SQM, ANALYTICS]),
  art("a-brd", "Requirements document (BRD / PRD)", "specify", 1, "The testable statement of what is needed and what is out of scope.", ["Problem and drivers", "Scope and exclusions", "Business rules", "Functional requirements", "Measurable acceptance expectations"], ["s-req"], ["s-ac", "s-gate"], "practiced", [IOPEX, SQM]),
  art("a-ac", "Acceptance criteria", "specify", 2, "How a business user will check that it is done.", ["Criterion per requirement", "How to check it", "Pass and fail conditions"], ["s-ac"], ["v-uat", "v-gate"], "practiced", [IOPEX]),
  art("a-kpi", "KPI definition sheet", "specify", 3, "Every measure defined before anyone charts it.", ["Name and business reason", "Numerator and denominator", "Source, grain, exclusions", "Cutoff, owner, refresh", "Validation method"], ["s-ac"], ["b-build", "c-readout"], "practiced", [IOPEX, ANALYTICS]),
  art("a-base", "Requirement baseline", "specify", 4, "The approved version everything after is measured against.", ["Approved requirement set", "Version and approver", "Date"], ["s-gate"], ["g-feature", "b-handoff", "c-change"], "method"),
  art("a-feature", "Feature map", "design", 2, "Which feature belongs to which module, and what depends on what.", ["Modules and features", "Dependencies", "Release order"], ["g-feature"], ["g-schema", "b-handoff"], "method"),
  art("a-schema", "Schema plan", "design", 3, "Fields, statuses, history and attachments, planned before building.", ["Tables or collections", "Mandatory fields", "Status and history storage", "Attachment handling"], ["g-schema"], ["b-handoff", "b-build"], "built", [SQM]),
  art("a-handoff", "Handoff pack", "build", 0, "Everything developers need to build without guessing.", ["Baseline and open questions", "Requirement-to-work-item links", "Order of work", "First-release scope"], ["b-handoff"], ["b-build"], "practiced", [IOPEX]),
  art("a-uat", "UAT cases and results", "validate", 0, "The cases that prove each acceptance criterion, and what happened.", ["Case per criterion", "Result and reviewer", "Link to requirement ID"], ["v-uat"], ["v-triage", "v-gate"], "practiced", [IOPEX]),
  art("a-defect", "Triaged defect", "validate", 1, "A failure written up so a developer can act on it.", ["Reproduction steps", "Expected versus actual", "Impact", "Link to requirement"], ["v-triage"], ["v-gate", "b-build"], "practiced", [IOPEX]),
  art("a-approval", "Approval log", "validate", 2, "Who approved or returned what, and why.", ["Decision", "Approver", "Reason", "Return path taken"], ["v-gate", "v-uat"], ["c-log"], "practiced"),
  art("a-change", "Change request and addendum", "communicate", 0, "A controlled record of what changed against the baseline.", ["What changed", "Why", "Impact", "Approver", "Linked tests and work items"], ["c-change"], ["s-req", "c-log"], "practiced", [IOPEX]),
  art("a-log", "Change log and traceability links", "communicate", 1, "One request ID that ties requirement, change, work item, test and result together.", ["Request ID", "Requirement and version", "Work items", "Tests and results"], ["c-log"], ["c-readout"], "practiced", [IOPEX, SQM]),
  art("a-dash", "Dashboard and findings summary", "communicate", 2, "What the numbers say, what they do not, and what to do next.", ["KPIs with definitions", "Exceptions and trends", "Known data limits", "Recommended next action"], ["c-readout"], [], "practiced", [IOPEX, ANALYTICS]),
  art("a-risk", "Risk register and roadmap", "communicate", 3, "Risks and guardrails, and the order releases are planned in.", ["Privacy, consent and security risks", "Guardrails", "Versioned roadmap"], ["c-roadmap"], [], "method"),
];

const projectLinks = (names: string[]): SeenIn[] =>
  projects.filter((p) => p.technologies.some((t) => names.includes(t))).map((p) => ({ label: p.title, href: `/projects/${p.id}` }));

interface ToolDef {
  id: string;
  title: string;
  category: ToolCategory;
  evidence: Evidence;
  summary: string;
  usedIn: string[];
  tech?: string;
  /** names in projects.ts */
  names?: string[];
  seenIn?: SeenIn[];
}

const T = (id: string, title: string, category: ToolCategory, evidence: Evidence, summary: string, usedIn: string[], extra: { tech?: string; names?: string[]; seenIn?: SeenIn[] } = {}): ToolDef => ({ id, title, category, evidence, summary, usedIn, ...extra });

const toolDefs: ToolDef[] = [
  // requirements and docs
  T("t-excel", "Excel", "docs", "practiced", "Reporting workbooks: validation, KPI logic, exception views and trend sheets.", ["s-ac", "v-uat", "c-readout"], { seenIn: [IOPEX] }),
  T("t-gdocs", "Google Docs, Sheets and Apps Script", "docs", "built", "A UAT approval workflow script (prepared, QA review, business review) with an approval log. Deployment is not established.", ["v-uat", "c-log"]),
  T("t-pq", "Power Query and Office Scripts", "docs", "concept", "Considered as refresh and cleanup automation for large reporting workbooks.", ["m-data", "c-readout"]),
  T("t-notes", "Notion and Obsidian style notes", "docs", "method", "Linked requirement notes, decisions and open questions.", ["d-interviews", "s-req", "c-log"]),
  T("t-office", "PowerPoint and office documents", "docs", "method", "Stakeholder walkthroughs and handover material.", ["c-readout", "b-handoff"]),
  T("t-figma", "Figma", "docs", "method", "Screens and flows that make a requirement concrete before it is built.", ["g-feature", "s-req"]),
  // frontend
  T("t-react", "React", "frontend", "built", "Component interfaces, forms, tables and dashboards.", ["b-build", "c-readout"], { tech: "React", names: ["React"] }),
  T("t-next", "Next.js", "frontend", "built", "App Router sites and apps, including this portfolio.", ["b-build", "p-build"], { tech: "Next.js", names: ["Next.js"], seenIn: [SITE] }),
  T("t-ts", "TypeScript", "frontend", "built", "Typed contracts between screens, services and data.", ["b-build", "p-typecheck"], { tech: "TypeScript", names: ["TypeScript"], seenIn: [SITE] }),
  T("t-js", "JavaScript", "frontend", "built", "Plain JavaScript where a project did not need types.", ["b-build"], { tech: "JavaScript", names: ["JavaScript"] }),
  T("t-tw", "Tailwind CSS", "frontend", "built", "Design tokens and responsive layouts.", ["b-build"], { tech: "Tailwind CSS", names: ["TailwindCSS", "Tailwind CSS"], seenIn: [SITE] }),
  T("t-vite", "Vite", "frontend", "built", "Fast builds for single-page React apps.", ["b-build"], { tech: "Vite", names: ["Vite"] }),
  T("t-tanstack", "TanStack Query", "frontend", "built", "Server-state caching for data-heavy screens.", ["b-build", "c-readout"], { tech: "TanStack Query", names: ["TanStack Query"] }),
  T("t-shadcn", "shadcn/ui and Radix", "frontend", "built", "Accessible, composable interface components, used across this portfolio.", ["g-feature", "b-build"], { seenIn: [SITE] }),
  T("t-router", "React Router", "frontend", "built", "Client-side routing for single-page apps.", ["b-build"], { seenIn: [SQM] }),
  T("t-motion", "Framer Motion", "frontend", "built", "Interface motion that respects reduced-motion settings.", ["b-build"], { seenIn: [SITE] }),
  // mobile and desktop
  T("t-rn", "React Native", "mobile", "built", "Cross-platform mobile apps.", ["b-build"], { tech: "React Native", names: ["React Native"] }),
  T("t-expo", "Expo", "mobile", "built", "Build and run tooling for React Native apps.", ["b-build"], { tech: "Expo", names: ["Expo"] }),
  T("t-android", "Android", "mobile", "built", "Android app targets.", ["b-build"], { tech: "Android", names: ["Android"] }),
  T("t-ios", "iOS", "mobile", "built", "iOS app targets.", ["b-build"], { tech: "iOS", names: ["iOS"] }),
  T("t-astudio", "Android Studio", "mobile", "built", "Native Android development and emulation.", ["b-build"], { tech: "Android Studio", names: ["Android Studio"] }),
  T("t-java", "Java", "mobile", "built", "Native Android code.", ["b-build"], { tech: "Java", names: ["Java"] }),
  T("t-csharp", "C#", "mobile", "built", "A desktop reservation application.", ["b-build"], { tech: "C#", names: ["C#"] }),
  T("t-winforms", "WinForms", "mobile", "built", "Desktop forms for a clinic reservation workflow.", ["b-build"], { tech: "WinForms", names: ["WinForms"] }),
  // backend and APIs
  T("t-node", "Node.js", "backend", "built", "Server-side logic and tooling.", ["b-build"], { tech: "Node.js", names: ["Node.js"], seenIn: [] }),
  T("t-express", "Express", "backend", "built", "REST APIs: routes, middleware, validation, controllers and services.", ["b-build", "m-roles"], { tech: "Express", names: ["Express", "Express.js (API)"] }),
  T("t-nest", "NestJS", "backend", "built", "A structured API framework in a project workspace.", ["b-build"], { tech: "NestJS", names: ["NestJS"] }),
  T("t-ws", "WebSockets", "backend", "built", "Real-time updates between a mobile app and a service.", ["b-build"], { tech: "WebSockets", names: ["WebSockets"] }),
  T("t-rest", "REST API design", "backend", "method", "Route contracts, request validation, consistent responses and error handling.", ["b-build", "b-handoff"]),
  T("t-jwt", "JWT and role-based access", "backend", "built", "Authentication tokens and server-side permission checks.", ["m-roles", "b-build"], { tech: "JWT Authentication", names: ["JWT Authentication"] }),
  T("t-oauth", "Google OAuth 2.0", "backend", "method", "Provider sign-in patterns. Not claimed for every project.", ["m-roles"]),
  // data
  T("t-sql", "SQL Server", "data", "built", "Relational records with status, history and attachments in a supplier quality system.", ["m-data", "g-schema", "b-build"], { tech: "Microsoft SQL Server", names: ["Microsoft SQL Server"] }),
  T("t-mysql", "MySQL and MariaDB", "data", "built", "Relational data for desktop and web apps.", ["m-data", "g-schema"], { tech: "MySQL", names: ["MySQL"] }),
  T("t-pg", "PostgreSQL", "data", "method", "Reached through Supabase and discussed for infrastructure designs.", ["g-schema"], { tech: "PostgreSQL" }),
  T("t-mongo", "MongoDB", "data", "built", "Event, registration and attendance data in the CICT platform.", ["g-schema", "b-build"], { tech: "MongoDB", names: ["MongoDB"] }),
  T("t-supabase", "Supabase", "data", "built", "Postgres, authentication, storage and row-level security.", ["g-schema", "b-build"], { tech: "Supabase", names: ["Supabase", "Supabase (Postgres, Auth, RLS)"] }),
  T("t-firebase", "Firebase", "data", "built", "Hosted data and auth for mobile apps.", ["g-schema", "b-build"], { tech: "Firebase", names: ["Firebase"] }),
  T("t-prisma", "Prisma", "data", "built", "Type-safe data access and migrations.", ["g-schema", "b-build"], { tech: "Prisma", names: ["Prisma"] }),
  T("t-kysely", "Kysely", "data", "method", "A typed SQL query builder noted in an earlier project description.", ["g-schema"]),
  // quality and source control
  T("t-vitest", "Vitest", "quality", "built", "Unit tests for authentication failures, invalid uploads and unauthorized access.", ["b-build", "v-gate"], { tech: "Vitest", names: ["Vitest"] }),
  T("t-jest", "Jest", "quality", "built", "Unit tests, including the data checks behind this page.", ["b-build", "p-test"], { seenIn: [SITE] }),
  T("t-e2e", "Browser end-to-end checks", "quality", "method", "Click-through checks of real user journeys in a browser.", ["v-uat", "v-gate"]),
  T("t-postman", "Postman and Insomnia", "quality", "method", "Reproducing and investigating API behavior.", ["v-triage", "b-build"]),
  T("t-dbeaver", "DBeaver and Beekeeper", "quality", "method", "Inspecting data to confirm what a report should show.", ["m-data", "v-triage"]),
  T("t-git", "Git and GitHub", "quality", "practiced", "Branches, review, issue documentation and change history.", ["b-build", "c-log", "c-change", "p-git", "p-github"], { seenIn: [SITE] }),
  // AI
  T("t-claude", "Claude", "ai", "practiced", "Technical analysis, architecture options, coding and critique. Output is read and tested, never trusted blindly.", ["b-ai", "s-req"]),
  T("t-codex", "Codex", "ai", "practiced", "Codebase tasks, troubleshooting and review support.", ["b-ai"]),
  T("t-gpt", "ChatGPT", "ai", "practiced", "Ideation, specification refinement and documentation drafts.", ["d-frame", "s-req", "b-ai"]),
  T("t-mcp", "MCP and agent tools", "ai", "concept", "Explored for connecting coding agents to other tools. Support depends on setup and permissions.", ["b-ai"]),
  T("t-openai", "OpenAI API", "ai", "built", "Model calls inside product features.", ["b-build"], { tech: "OpenAI", names: ["OpenAI"] }),
  T("t-gemini", "Gemini", "ai", "built", "Model-powered generation in a script and video tool.", ["b-build"], { tech: "Gemini", names: ["Gemini"] }),
  T("t-did", "D-ID API", "ai", "built", "Avatar video generation in a content workflow.", ["b-build"], { tech: "D-ID API", names: ["D-ID API"] }),
  T("t-speech", "Speech recognition", "ai", "built", "Spoken answers in an interview-practice app.", ["b-build"], { tech: "Speech Recognition", names: ["Speech Recognition"] }),
  T("t-aiml", "Applied AI/ML features", "ai", "built", "AI features in a mobile app.", ["b-build"], { tech: "AI/ML", names: ["AI/ML"] }),
  T("t-rag", "RAG", "ai", "concept", "Grounded answers from a document set, explored for a medical demo. Reliability unverified.", ["b-ai"]),
  // runtime and hosting
  T("t-bun", "Bun", "infra", "built", "Package manager, script runner and test runner for this site.", ["b-build", "p-local", "p-install", "p-build"], { seenIn: [SITE] }),
  T("t-pm", "npm and pnpm", "infra", "method", "Package managers used depending on the project.", ["p-install"]),
  T("t-docker", "Docker", "infra", "built", "Containerized development and test environments.", ["b-build"], { tech: "Docker", names: ["Docker"] }),
  T("t-localstack", "LocalStack", "infra", "built", "Emulated cloud storage so local tests match the cloud.", ["b-build", "v-uat"], { tech: "LocalStack", names: ["LocalStack"] }),
  T("t-aws", "AWS and S3", "infra", "built", "Object storage for uploaded course files.", ["g-schema", "b-build"], { tech: "AWS", names: ["AWS", "AWS S3"] }),
  T("t-linux", "Linux, WSL and Fedora", "infra", "method", "Day-to-day development environment, SSH and remote work.", ["p-local"]),
  T("t-hosts", "Render and Netlify", "infra", "built", "Hosting for a booking platform: Next.js web client and Express API.", ["p-host"], { names: ["Render (Express API hosting)", "Netlify (Next.js hosting)"] }),
  T("t-vercel", "Vercel and Railway", "infra", "concept", "Investigated or used per project. Attribute each one before publishing.", ["p-host"]),
  T("t-cf", "Cloudflare Workers", "infra", "concept", "The target host for this site. No deploy configuration exists in the repository yet.", ["p-host"]),
  T("t-homelab", "Tailscale, Caddy and Podman", "infra", "concept", "A proposed personal homelab workflow, not a proven deployment.", ["p-local"]),
  // hardware and embedded
  T("t-esp32", "ESP32", "hardware", "built", "The microcontroller behind a QR-controlled access lock.", ["b-build"], { tech: "ESP32", names: ["ESP32"] }),
  T("t-cpp", "C++", "hardware", "built", "Firmware for the access device.", ["b-build"], { tech: "C++", names: ["C++"] }),
  T("t-qr", "QR codes, relay and lock", "hardware", "built", "QR scanning that triggers a relay and a solenoid lock.", ["b-build"], { tech: "QR Codes", seenIn: [{ label: "SwiftPass Guard", href: "/projects/swiftpass-guard" }] }),
  T("t-imu", "ESP32-S3 and BNO085", "hardware", "concept", "A proposed motion controller for an accessible rehabilitation game.", ["b-build"]),
  T("t-gps", "SIM808 and Traccar", "hardware", "concept", "GPS tracking experiments with a self-hosted backend.", ["b-build"]),
  T("t-game", "Godot, Unity and Blender", "hardware", "concept", "Explored for a rehabilitation game and its assets.", ["b-build"]),
];

/** Row inside its category is the order of appearance, so adding a tool never needs a hand-numbered slot. */
export const toolNodes: ToolNode[] = (() => {
  const seen: Partial<Record<ToolCategory, number>> = {};
  return toolDefs.map((d) => {
    const row = seen[d.category] ?? 0;
    seen[d.category] = row + 1;
    const derived = d.names ? projectLinks(d.names) : [];
    const seenIn = [...(d.seenIn ?? []), ...derived].filter((v, i, a) => a.findIndex((x) => x.href === v.href) === i).slice(0, 5);
    return { lane: "tool" as const, id: d.id, title: d.title, summary: d.summary, category: d.category, row, tech: d.tech, techNames: d.names, usedIn: d.usedIn, evidence: d.evidence, seenIn };
  });
})();

const pipe = (id: string, title: string, col: number, summary: string, checks: string[], evidence: Evidence, command?: string): PipelineNode => ({
  lane: "pipeline",
  id,
  title,
  summary,
  col,
  command,
  checks,
  evidence,
  seenIn: [SITE],
});

export const pipelineNodes: PipelineNode[] = [
  pipe("p-local", "Local development", 0, "Write and try the change on my own machine.", ["Runs the site locally", "Quick checks before committing"], "practiced", "bun run dev"),
  pipe("p-git", "Commit", 1, "One small, reviewable change with a clear message.", ["Change is small enough to review", "Message says why"], "practiced", "git commit"),
  pipe("p-github", "Push and pull request", 2, "The change goes to GitHub, which starts the checks.", ["Triggers the quality workflow on push and pull request"], "built", "on: push / pull_request (main, develop)"),
  pipe("p-install", "Install", 3, "Install exactly what the lockfile says.", ["No surprise dependency changes", "Fails if the lockfile is out of date"], "built", "bun install --frozen-lockfile"),
  pipe("p-typecheck", "Type check", 4, "The compiler checks every contract between files.", ["Types match across screens, data and helpers"], "built", "bun run typecheck"),
  pipe("p-lint", "Lint", 5, "Static rules catch risky patterns early.", ["Code follows the shared rules", "Errors block; warnings are reported"], "built", "bun run lint"),
  pipe("p-format", "Format check (advisory)", 6, "Reports unformatted files but does not block, because older files are not formatted yet.", ["Reports only; does not fail the build"], "built", "bun run format:check"),
  pipe("p-test", "Tests", 7, "Unit tests prove the rules the data and logic depend on.", ["KPI logic, data integrity and helpers behave as specified"], "built", "bun run test:ci"),
  pipe("p-build", "Build", 8, "A production build must succeed before anything ships.", ["The site compiles and renders every page"], "built", "bun run build"),
  pipe("p-host", "Host (target)", 9, "Where the built site is served. Shown as a target: no deploy configuration exists in this repository yet.", ["Not claimed as deployed"], "concept"),
];

export const processSysNodes: ProcessSysNode[] = processNodes.map((n) => ({ ...n, lane: "process" as const }));
export const sysNodes: SysNode[] = [...processSysNodes, ...artifactNodes, ...toolNodes, ...pipelineNodes];
export const sysNodeById = new Map<string, SysNode>(sysNodes.map((n) => [n.id, n]));

// ---------------------------------------------------------------------------------------------------------------------------------------
// Edges
// ---------------------------------------------------------------------------------------------------------------------------------------

export interface SysEdge {
  id: string;
  from: string;
  to: string;
  kind: EdgeKind;
  label?: string;
  /** what passes along this link */
  carries: string;
  /** why the link exists */
  why: string;
}

/** What each process link carries, and why. Keyed by `from>to`. */
const CARRIES: Record<string, [string, string]> = {
  "d-interviews>d-frame": ["Interview notes", "The product is framed on what process owners actually said, not on assumptions."],
  "d-frame>d-problem": ["Product overview", "A named product makes the problem it solves easier to state."],
  "d-problem>d-users": ["Problem statement and goals", "The audience is chosen to match the problem."],
  "d-users>s-mvp": ["Audience and positioning", "The first version is cut for the first audience, not for everyone."],
  "d-capture>m-asis": ["Request record", "I map how the work really runs before proposing a change."],
  "d-capture>m-data": ["Request record", "For a report request, the first question is where the data comes from and what one row is."],
  "d-interviews>m-asis": ["Interview notes and open questions", "The as-is map is built from the owners' own descriptions."],
  "m-asis>m-workflow": ["As-is map with exception paths", "States and transitions come from the real process, including its exceptions."],
  "m-workflow>m-roles": ["State and transition model", "Who may do each transition decides the permission matrix."],
  "m-roles>m-data": ["Permission matrix", "Roles and states decide which facts must be stored."],
  "m-asis>s-req": ["As-is and to-be maps", "Requirements describe the difference between the two maps."],
  "m-data>s-req": ["Data model", "Requirements name the data they depend on."],
  "m-data>s-ac": ["Source and grain", "A KPI cannot be defined until the grain of the data is known."],
  "s-mvp>s-biz": ["First-version scope", "Value and cost are judged for the first version."],
  "s-biz>s-req": ["Value and cost assumptions", "Priorities in the requirements follow the value case."],
  "s-req>s-ac": ["Requirement set", "Every requirement needs a way to check it."],
  "s-ac>s-gate": ["Acceptance criteria and KPI definitions", "Sign-off covers the criteria, not only the wording."],
  "s-ac>b-build": ["KPI definitions and logic", "A dashboard is built from the written definition, not from memory."],
  "s-gate>g-feature": ["Approved baseline", "Design starts from the approved version only."],
  "s-gate>b-handoff": ["Approved baseline", "Small changes can skip design and go straight to handoff."],
  "g-feature>g-schema": ["Feature map", "Fields and statuses follow the features."],
  "g-schema>b-handoff": ["Schema plan", "Developers receive the data shape with the requirements."],
  "b-handoff>b-ai": ["Bounded problem and acceptance criteria", "A model gets a narrow task with explicit criteria."],
  "b-handoff>b-build": ["Handoff pack", "Build starts from one agreed pack and one request ID."],
  "b-ai>b-build": ["Reviewed proposal", "Only a proposal I have read and tested enters the code."],
  "b-build>v-uat": ["Working feature", "Business users validate real behavior, not a description."],
  "v-uat>v-triage": ["Failed case", "A failure becomes a finding a developer can act on."],
  "v-uat>v-gate": ["Test results", "The decision rests on recorded results."],
  "v-triage>v-gate": ["Triaged defect", "The gate needs to know whether it is a defect or a gap in the requirement."],
  "v-gate>c-log": ["Approval decision", "Every approval is recorded against the request ID."],
  "v-gate>b-build": ["Failed criteria", "Rework goes back to build with the criteria that failed."],
  "v-gate>c-change": ["Requirement change", "If the requirement itself was wrong, it changes through change control."],
  "c-change>s-req": ["Approved change", "The baseline is updated, never edited quietly."],
  "c-change>c-log": ["Addendum and approval", "The change is traceable to who approved it and why."],
  "c-log>c-readout": ["Traceable results", "Anything reported can be traced back to its source."],
  "c-readout>c-roadmap": ["Findings and risks", "What the report found shapes the risks and the roadmap."],
};

const fromProcess = (e: MapEdge): SysEdge => {
  const [carries, why] = CARRIES[`${e.from}>${e.to}`] ?? ["The output of the step", "Work moves on once the step is done."];
  return { id: e.id, from: e.from, to: e.to, kind: e.loop ? "loop" : "flow", label: e.label, carries, why };
};

const crossEdges: SysEdge[] = [];
artifactNodes.forEach((a) => {
  a.producedBy.forEach((p) =>
    crossEdges.push({ id: `${p}>${a.id}`, from: p, to: a.id, kind: "produces", carries: a.title, why: `${sysNodeById.get(p)?.lane === "process" ? (sysNodeById.get(p) as ProcessSysNode).title : p} produces this document.` })
  );
  a.usedBy.forEach((u) =>
    crossEdges.push({ id: `${a.id}>${u}`, from: a.id, to: u, kind: "feeds", carries: a.title, why: `${(sysNodeById.get(u) as ProcessSysNode).title} needs this document to do its work.` })
  );
});
toolNodes.forEach((t) => {
  t.usedIn.forEach((u) =>
    crossEdges.push({ id: `${u}>${t.id}`, from: u, to: t.id, kind: "uses", carries: "Tool support", why: `${t.title}: ${t.summary}` })
  );
});

const pipelineEdges: SysEdge[] = pipelineNodes.slice(1).map((n, i) => ({
  id: `${pipelineNodes[i].id}>${n.id}`,
  from: pipelineNodes[i].id,
  to: n.id,
  kind: "pipeline" as const,
  carries: i === 0 ? "A committed change" : i < 3 ? "The change under test" : "A change that has passed the earlier checks",
  why: "Each check runs in order, and a failure stops everything after it.",
}));

const checkEdges: SysEdge[] = [
  { id: "p-test>v-gate", from: "p-test", to: "v-gate", kind: "checks", carries: "Automated test results", why: "Passing tests support the approval decision, but they do not replace business acceptance." },
  { id: "p-typecheck>b-build", from: "p-typecheck", to: "b-build", kind: "checks", carries: "Type errors", why: "The compiler keeps contracts honest while features are built." },
  { id: "p-lint>b-build", from: "p-lint", to: "b-build", kind: "checks", carries: "Lint findings", why: "Risky patterns are caught before review." },
  { id: "p-build>c-roadmap", from: "p-build", to: "c-roadmap", kind: "checks", carries: "A buildable release", why: "A release is only planned once it builds." },
];

export const sysEdges: SysEdge[] = [...processEdges.map(fromProcess), ...crossEdges, ...pipelineEdges, ...checkEdges];
export const sysEdgeById = new Map(sysEdges.map((e) => [e.id, e]));

// ---------------------------------------------------------------------------------------------------------------------------------------
// Graph helpers
// ---------------------------------------------------------------------------------------------------------------------------------------

/** Every link that touches a node, in either direction. */
export const incident = (id: string): SysEdge[] => sysEdges.filter((e) => e.from === id || e.to === id);

/** The node ids and link ids one hop from a node, across all lanes. */
export function focusSet(id: string): { nodes: Set<string>; edges: Set<string> } {
  const nodes = new Set<string>([id]);
  const edges = new Set<string>();
  incident(id).forEach((e) => {
    edges.add(e.id);
    nodes.add(e.from);
    nodes.add(e.to);
  });
  return { nodes, edges };
}

/** Tools used at any step of a path (a path is a list of process node ids). */
export const toolsForPath = (path: string[]): ToolNode[] => toolNodes.filter((t) => t.usedIn.some((u) => path.includes(u)));

/** Documents produced or needed at any step of a path. */
export const artifactsForPath = (path: string[]): ArtifactNode[] => artifactNodes.filter((a) => [...a.producedBy, ...a.usedBy].some((u) => path.includes(u)));

// ---------------------------------------------------------------------------------------------------------------------------------------
// Layout: positions come from lane, column and row only
// ---------------------------------------------------------------------------------------------------------------------------------------

export const GEOM = {
  colW: 235,
  nodeW: 195,
  procTop: 80,
  procRowH: 90,
  procNodeH: 66,
  laneGap: 70,
  artRowH: 82,
  artNodeH: 68,
  toolRowH: 64,
  toolNodeH: 54,
  toolNodeW: 215,
  pipeColW: 165,
  pipeNodeW: 145,
  pipeNodeH: 70,
  laneHead: 70,
} as const;

const stageIndex = (s: StageId) => stages.findIndex((x) => x.id === s);
const catIndex = (c: ToolCategory) => TOOL_CATEGORIES.findIndex((x) => x.id === c);

/**
 * Landscape composition, so the overview fills a wide page instead of making a tall narrow column:
 *   left   process on top, documents under it, the delivery pipeline under that
 *   right  the tools, as a 3 x 2 grid of category blocks
 */
const PROC_LANE_H = GEOM.procTop + 6 * GEOM.procRowH + 16;
const ART_Y = PROC_LANE_H + GEOM.laneGap;
const ART_LANE_H = GEOM.laneHead + 5 * GEOM.artRowH + 16;
const PIPE_Y = ART_Y + ART_LANE_H + GEOM.laneGap;
const PIPE_LANE_H = GEOM.laneHead + GEOM.pipeNodeH + 40;

const TOOL_X = 7 * GEOM.colW + 90;
const TOOL_COL_W = 250;
const TOOL_COLS = 5;
const TOOL_HEAD = 50;
const TOOL_GAP = 40;

/** Rows in the biggest category of each grid row, so every block in that row shares one height. */
const toolGridRows = Math.ceil(TOOL_CATEGORIES.length / TOOL_COLS);
const catRows = TOOL_CATEGORIES.map((c) => toolNodes.filter((t) => t.category === c.id).length);
const blockHeights = Array.from({ length: toolGridRows }, (_, r) => TOOL_HEAD + Math.max(...catRows.slice(r * TOOL_COLS, (r + 1) * TOOL_COLS)) * GEOM.toolRowH + 20);
const blockTops = blockHeights.map((_, r) => blockHeights.slice(0, r).reduce((n, h) => n + h + TOOL_GAP, 0));

/** The tinted block for one tool category. */
export function toolBlock(i: number): Box {
  const r = Math.floor(i / TOOL_COLS);
  return { x: TOOL_X + (i % TOOL_COLS) * TOOL_COL_W - 10, y: blockTops[r], w: GEOM.toolNodeW + 20, h: blockHeights[r] };
}

export const LANE_BOUNDS: Record<Lane, { x: number; y: number; w: number; h: number }> = {
  process: { x: -10, y: 0, w: 7 * GEOM.colW, h: PROC_LANE_H },
  artifact: { x: -10, y: ART_Y, w: 7 * GEOM.colW, h: ART_LANE_H },
  tool: { x: TOOL_X - 10, y: 0, w: TOOL_COLS * TOOL_COL_W, h: blockTops[toolGridRows - 1] + blockHeights[toolGridRows - 1] },
  pipeline: { x: -10, y: PIPE_Y, w: 7 * GEOM.colW, h: PIPE_LANE_H },
};

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function layout(n: SysNode): Box {
  switch (n.lane) {
    case "process":
      return { x: stageIndex(n.stage) * GEOM.colW, y: GEOM.procTop + n.row * GEOM.procRowH, w: GEOM.nodeW, h: GEOM.procNodeH };
    case "artifact":
      return { x: stageIndex(n.stage) * GEOM.colW, y: ART_Y + GEOM.laneHead + n.row * GEOM.artRowH, w: GEOM.nodeW, h: GEOM.artNodeH };
    case "tool": {
      const i = catIndex(n.category);
      const blk = toolBlock(i);
      return { x: blk.x + 10, y: blk.y + TOOL_HEAD + n.row * GEOM.toolRowH, w: GEOM.toolNodeW, h: GEOM.toolNodeH };
    }
    case "pipeline":
      return { x: n.col * GEOM.pipeColW, y: PIPE_Y + GEOM.laneHead + 14, w: GEOM.pipeNodeW, h: GEOM.pipeNodeH };
  }
}

export const nodeTitle = (n: SysNode): string => n.title;
export const nodeEvidence = (n: SysNode): Evidence => n.evidence;

// ---------------------------------------------------------------------------------------------------------------------------------------
// Ego layout: when a node is selected it keeps its place and its connections split out around it
// ---------------------------------------------------------------------------------------------------------------------------------------

export type EgoSlot = "left" | "right" | "top" | "bottom";

/** Which side of the selected node each connected node goes on. Earlier things left, later things right, documents above, tools below. */
export function egoSlot(center: SysNode, other: SysNode, outgoing: boolean): EgoSlot {
  switch (center.lane) {
    case "process":
      return other.lane === "process" ? (outgoing ? "right" : "left") : other.lane === "tool" ? "bottom" : "top";
    case "artifact":
      return outgoing ? "right" : "left";
    case "tool":
      return "left";
    case "pipeline":
      return other.lane === "pipeline" ? (outgoing ? "right" : "left") : other.lane === "tool" ? "bottom" : "top";
  }
}

/** The connected nodes of `id`, grouped by side, each listed once. */
export function egoGroups(id: string): Record<EgoSlot, SysNode[]> {
  const center = sysNodeById.get(id)!;
  const groups: Record<EgoSlot, SysNode[]> = { left: [], right: [], top: [], bottom: [] };
  const seen = new Set<string>([id]);
  incident(id).forEach((e) => {
    const outgoing = e.from === id;
    const other = sysNodeById.get(outgoing ? e.to : e.from)!;
    if (seen.has(other.id)) return;
    seen.add(other.id);
    groups[egoSlot(center, other, outgoing)].push(other);
  });
  // tools keep their category order (so a big group reads in sections); everything else goes top to bottom, left to right
  const rank = (n: SysNode) => (n.lane === "tool" ? catIndex(n.category) * 100 + n.row : layout(n).y * 10000 + layout(n).x);
  const order = (a: SysNode, b: SysNode) => rank(a) - rank(b);
  (Object.keys(groups) as EgoSlot[]).forEach((k) => groups[k].sort(order));
  return groups;
}

const EGO = { gapX: 90, gapY: 56, rowGap: 16, perRow: 4, bigGroup: 9, compactW: 168, compactH: 40, compactPerRow: 9 } as const;

/** Groups with many nodes (a tool used in a dozen steps, a step with dozens of tools) are drawn as compact chips so the whole neighbourhood still fits. */
export const isCompact = (n: SysNode, groupSize: number) => groupSize > EGO.bigGroup && n.lane === "tool";

/**
 * Positions for a selected node and everything connected to it. The selected node stays where it is; the rest are arranged around it so the
 * whole neighborhood fits on screen at a readable size. Pure and deterministic, so it can be tested for overlaps.
 */
export function egoLayout(id: string): Map<string, Box> {
  const center = sysNodeById.get(id)!;
  const sb = layout(center);
  const groups = egoGroups(id);
  const out = new Map<string, Box>([[id, sb]]);
  const cx = sb.x + sb.w / 2;
  const cy = sb.y + sb.h / 2;

  let colTop = sb.y;
  let colBottom = sb.y + sb.h;
  const stack = (list: SysNode[], side: "left" | "right") => {
    if (!list.length) return;
    const sizes = list.map(layout);
    const maxW = Math.max(...sizes.map((b) => b.w));
    const totalH = sizes.reduce((s, b) => s + b.h, 0) + EGO.rowGap * (list.length - 1);
    let y = cy - totalH / 2;
    const x = side === "left" ? sb.x - EGO.gapX - maxW : sb.x + sb.w + EGO.gapX;
    list.forEach((n, i) => {
      const b = sizes[i];
      out.set(n.id, { x: side === "left" ? x + (maxW - b.w) : x, y, w: b.w, h: b.h });
      y += b.h + EGO.rowGap;
    });
    colTop = Math.min(colTop, cy - totalH / 2);
    colBottom = Math.max(colBottom, cy - totalH / 2 + totalH);
  };
  stack(groups.left, "left");
  stack(groups.right, "right");

  const rows = (list: SysNode[], dir: -1 | 1) => {
    if (!list.length) return;
    const compact = list.every((n) => isCompact(n, list.length));
    const perRow = compact ? Math.min(EGO.compactPerRow, Math.max(6, Math.ceil(Math.sqrt(list.length * 2.2)))) : EGO.perRow;
    let edge = dir < 0 ? Math.min(sb.y - EGO.gapY, colTop - 40) : Math.max(sb.y + sb.h + EGO.gapY, colBottom + 40);
    for (let i = 0; i < list.length; i += perRow) {
      const line = list.slice(i, i + perRow);
      const sizes = line.map((n) => (compact ? { x: 0, y: 0, w: EGO.compactW, h: EGO.compactH } : layout(n)));
      const lineH = Math.max(...sizes.map((b) => b.h));
      const gap = compact ? 12 : 24;
      const totalW = sizes.reduce((sum, b) => sum + b.w, 0) + gap * (line.length - 1);
      let x = cx - totalW / 2;
      const y = dir < 0 ? edge - lineH : edge;
      line.forEach((n, j) => {
        out.set(n.id, { x, y, w: sizes[j].w, h: sizes[j].h });
        x += sizes[j].w + gap;
      });
      edge = dir < 0 ? y - (compact ? 12 : EGO.rowGap) : y + lineH + (compact ? 12 : EGO.rowGap);
    }
  };
  rows(groups.top, -1);
  rows(groups.bottom, 1);
  return out;
}

export interface EgoCaption {
  id: string;
  text: string;
  x: number;
  y: number;
}

const CAPTIONS: Record<Lane, Partial<Record<EgoSlot, string>>> = {
  process: { left: "Comes before", right: "Leads to", top: "Documents and checks", bottom: "Tools used" },
  artifact: { left: "Produced by", right: "Needed by" },
  tool: { left: "Used in" },
  pipeline: { left: "Comes before", right: "Comes next", top: "Supports", bottom: "Tools" },
};

/** Short labels placed above each group around the selected node, so it is clear what every side means. */
export function egoCaptions(id: string): EgoCaption[] {
  const center = sysNodeById.get(id)!;
  const groups = egoGroups(id);
  const boxes = egoLayout(id);
  const out: EgoCaption[] = [];
  (Object.keys(groups) as EgoSlot[]).forEach((slot) => {
    const list = groups[slot];
    const text = CAPTIONS[center.lane][slot];
    if (!list.length || !text) return;
    const rs = list.map((n) => boxes.get(n.id)!);
    out.push({ id: `cap-${slot}`, text, x: Math.min(...rs.map((r) => r.x)), y: Math.min(...rs.map((r) => r.y)) - 26 });
  });
  return out;
}
