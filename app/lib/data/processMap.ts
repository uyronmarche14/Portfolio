import { processSteps } from "./process";

/**
 * The process map: seven stages, ~26 nodes, the edges between them (including return loops) and four scenarios that light up a path.
 * Written from the portfolio notes (systems analysis, workflow lifecycle, KPI design, requirements gathering, UAT flow, AI-assisted cycle)
 * and from the 12 existing planning phases in process.ts, which are looked up by `stepId` rather than copied.
 *
 * Guardrails: no employer application names, no client names, SRS is not claimed as a duty, UAT is coordination (not QA testing), and anything
 * proposed or unconfirmed is marked "concept" or "method" instead of "practiced" or "built".
 */

export type StageId = "discover" | "model" | "specify" | "design" | "build" | "validate" | "communicate";
export type NodeKind = "activity" | "artifact" | "gate";
export type Evidence = "practiced" | "built" | "method" | "concept";

export interface MapStage {
  id: StageId;
  title: string;
  blurb: string;
  /** theme tone used for the column and its nodes */
  tone: "violet" | "teal" | "amber" | "rose";
}

export const stages: MapStage[] = [
  { id: "discover", title: "Discover", blurb: "Learn the context, the people and the real current behavior.", tone: "violet" },
  { id: "model", title: "Model", blurb: "Turn what I found into roles, states, rules and data.", tone: "teal" },
  { id: "specify", title: "Specify", blurb: "Write requirements and acceptance conditions, then baseline them.", tone: "amber" },
  { id: "design", title: "Design", blurb: "Choose the architecture and data shape that fit the scale.", tone: "rose" },
  { id: "build", title: "Build", blurb: "Hand off clearly and build with explicit contracts.", tone: "violet" },
  { id: "validate", title: "Validate", blurb: "Check behavior against the acceptance conditions.", tone: "teal" },
  { id: "communicate", title: "Communicate", blurb: "Record what changed and why, and report what is left.", tone: "amber" },
];

export const EVIDENCE: Record<Evidence, { label: string; note: string }> = {
  practiced: { label: "Practiced", note: "Part of my day-to-day analyst work." },
  built: { label: "Built", note: "Used in a system I built." },
  method: { label: "Method", note: "How I plan and document, taken from my own planning documents." },
  concept: { label: "Concept", note: "Explored or proposed. Not claimed as delivered." },
};

export interface SeenIn {
  label: string;
  href: string;
}

export interface MapNode {
  id: string;
  stage: StageId;
  kind: NodeKind;
  /** vertical slot inside the stage column */
  row: number;
  evidence: Evidence;
  /** when set, title, summary, details, inputs and outputs come from the matching phase in process.ts */
  stepId?: string;
  title?: string;
  summary?: string;
  details?: string[];
  inputs?: string[];
  artifacts?: string[];
  /** the questions I ask at this point */
  questions?: string[];
  seenIn?: SeenIn[];
}

export const IOPEX: SeenIn = { label: "iOPEX role", href: "/experience/iopex" };
export const BEYONDGEN: SeenIn = { label: "Beyondgen role", href: "/experience/beyondgen" };
export const SQM: SeenIn = { label: "Supplier Quality Management", href: "/projects/sqm-supplier-quality" };
export const ANALYTICS: SeenIn = { label: "Sample KPI dashboard", href: "/analytics" };

export const nodes: MapNode[] = [
  // ---- Discover
  {
    id: "d-capture",
    stage: "discover",
    kind: "activity",
    row: 0,
    evidence: "practiced",
    title: "Capture the request",
    summary: "Record what was reported, by whom, in which area, and what should have happened instead.",
    details: [
      "Name the triggering event and the people involved",
      "Record the application area and the user role affected",
      "Write expected versus actual behavior in plain words",
      "Note the operational consequence and give the request one ID",
    ],
    artifacts: ["Request record with a single ID"],
    questions: ["Who is affected, and in which role?", "What did they expect, and what happened?", "What does it cost the business while it stays this way?"],
    seenIn: [IOPEX],
  },
  {
    id: "d-interviews",
    stage: "discover",
    kind: "activity",
    row: 1,
    evidence: "method",
    title: "Stakeholder interviews",
    summary: "Talk to the people who own each part of the process, one team at a time, with a prepared set of questions.",
    details: [
      "Interview each owner separately, using the same question set",
      "Capture the as-is process, its pain points, documents, decisions and approvals",
      "Clarify the process logic and exceptions before any solution is discussed",
      "Read back what I heard and ask for corrections",
    ],
    artifacts: ["Interview notes", "Open-questions list"],
    questions: ["What triggers this work?", "What documents or approvals does it depend on?", "What goes wrong most often, and who fixes it?"],
  },
  { id: "d-frame", stage: "discover", kind: "activity", row: 3, evidence: "method", stepId: "1", questions: ["What is this, in one sentence?", "What should it be able to do from end to end?"] },
  { id: "d-problem", stage: "discover", kind: "activity", row: 4, evidence: "method", stepId: "2", questions: ["Whose problem is it, and why do existing tools fall short?", "How will we know it is solved?"] },
  { id: "d-users", stage: "discover", kind: "activity", row: 5, evidence: "method", stepId: "3", questions: ["Who is it for first?", "What should it not be reduced to?"] },

  // ---- Model
  {
    id: "m-asis",
    stage: "model",
    kind: "artifact",
    row: 0,
    evidence: "practiced",
    title: "As-is and to-be process map",
    summary: "Draw how the work really runs today, show manual and system actions separately, then describe the future state in concrete functional terms.",
    details: [
      "Identify the triggering event and the current actors",
      "Record the fields or documents submitted at each stage",
      "Record decisions and approval criteria",
      "Show system actions and manual actions separately",
      "Capture exception paths: rejection and reassignment",
      "Label the responsible owner and the system of record",
      "Define the future-state differences in concrete functional terms",
      "Validate the metrics and reports the change affects",
    ],
    artifacts: ["As-is process map", "To-be process map"],
    questions: ["Which step is done by a person and which by the system?", "Where does the work wait?", "Which report changes if this step changes?"],
    seenIn: [IOPEX, SQM],
  },
  {
    id: "m-workflow",
    stage: "model",
    kind: "activity",
    row: 1,
    evidence: "built",
    stepId: "6",
    summary: "Define the valid states and transitions, and what each one needs.",
    questions: [
      "Which actor is allowed to act?",
      "What data is mandatory at this stage?",
      "Which state can it enter next?",
      "Which records need timestamps, comments and history?",
      "Does the change trigger notifications, reports or downstream work?",
      "Can it be reversed or resubmitted?",
      "What happens on a duplicate request or a retry?",
    ],
    seenIn: [BEYONDGEN, SQM],
  },
  {
    id: "m-roles",
    stage: "model",
    kind: "artifact",
    row: 2,
    evidence: "built",
    stepId: "11",
    summary: "Roles as rows, resources and actions as columns, with explicit conditions, enforced in the service layer.",
    questions: ["Who can view, edit, approve or export this?", "Is it enforced on the server, not only hidden in the screen?"],
    seenIn: [BEYONDGEN, SQM],
  },
  {
    id: "m-data",
    stage: "model",
    kind: "activity",
    row: 3,
    evidence: "built",
    stepId: "8",
    summary: "Decide the entities, the grain of each record, and where each fact lives.",
    questions: ["What is one row, exactly?", "Which identifier stays stable across systems?", "Where is the source of truth?"],
    seenIn: [SQM, ANALYTICS],
  },

  // ---- Specify
  { id: "s-mvp", stage: "specify", kind: "activity", row: 5, evidence: "method", stepId: "4", questions: ["What is the smallest version that proves the idea?", "What waits for later?"] },
  { id: "s-biz", stage: "specify", kind: "activity", row: 4, evidence: "method", stepId: "5", questions: ["Who pays, and for what?", "What does it cost to run?"] },
  {
    id: "s-req",
    stage: "specify",
    kind: "artifact",
    row: 1,
    evidence: "practiced",
    stepId: "7",
    summary: "Business requirements (BRD) and, where it fits, product requirements (PRD), written so they can be tested.",
    questions: ["What is in scope, and what is explicitly out?", "Which business rule does this requirement come from?"],
    seenIn: [IOPEX, SQM],
  },
  {
    id: "s-ac",
    stage: "specify",
    kind: "artifact",
    row: 2,
    evidence: "practiced",
    title: "Acceptance criteria and KPI definitions",
    summary: "Say how we will know it is done, and define each measure fully before anyone charts it.",
    details: [
      "Write acceptance criteria that a business user can check",
      "Name each KPI and the business reason for it",
      "State the numerator, denominator, source, grain and exclusions",
      "Set the cutoff rule, the owner and the refresh frequency",
      "Decide how the number will be validated against the source",
    ],
    artifacts: ["Acceptance criteria", "KPI definition sheet"],
    questions: ["What exactly is counted, and what is left out?", "Which date decides the period?", "Do the card, the chart and the table agree for the same filter?"],
    seenIn: [IOPEX, ANALYTICS],
  },
  {
    id: "s-gate",
    stage: "specify",
    kind: "gate",
    row: 3,
    evidence: "method",
    title: "Baseline sign-off",
    summary: "The requirements are reviewed and agreed. From here, changes go through change control instead of quiet edits.",
    details: [
      "Walk the requirements through with the process owners",
      "Record who approved which version",
      "Freeze the baseline so every change is a visible change",
    ],
    artifacts: ["Approved requirement baseline"],
    questions: ["Which version applies to this feature?", "Who signed it off?"],
  },

  // ---- Design
  { id: "g-feature", stage: "design", kind: "activity", row: 2, evidence: "method", stepId: "9", questions: ["Which feature belongs to which module?", "What depends on what?"] },
  { id: "g-schema", stage: "design", kind: "artifact", row: 3, evidence: "built", stepId: "10", questions: ["Which fields are mandatory?", "How are statuses, history and attachments stored?"], seenIn: [SQM] },

  // ---- Build
  {
    id: "b-handoff",
    stage: "build",
    kind: "activity",
    row: 1,
    evidence: "practiced",
    title: "Technical handoff",
    summary: "Translate the requirements into fields, modules, permissions and scope that developers can build from, and clear up ambiguity before work starts.",
    details: [
      "Walk the developers through the baseline and the open questions",
      "Map requirements to fields, modules and permissions",
      "Agree the order of work and what the first release includes",
      "Keep one ID that links the requirement, the work item and the test",
    ],
    artifacts: ["Handoff pack", "Requirement-to-work-item links"],
    questions: ["What is still ambiguous?", "Which requirement does this work item satisfy?"],
    seenIn: [IOPEX, BEYONDGEN],
  },
  {
    id: "b-ai",
    stage: "build",
    kind: "activity",
    row: 2,
    evidence: "method",
    title: "AI-assisted cycle",
    summary: "Use a language model to explore and draft, never to decide business rules, security or readiness.",
    details: [
      "Give the model a bounded problem, the known code and explicit acceptance criteria",
      "Ask for alternatives and their trade-offs, then a minimal proposal",
      "Inspect the code and the business-rule implications before accepting anything",
      "Run the tests, read the diff and check authorization",
      "Write down the decision and what is still unresolved",
      "Keep confidential information out of the prompts",
    ],
    artifacts: ["Reviewed diff", "Decision note"],
    questions: ["Did I read the change, or only run it?", "Does it still respect the business rule?"],
  },
  {
    id: "b-build",
    stage: "build",
    kind: "activity",
    row: 3,
    evidence: "built",
    title: "Build with explicit contracts",
    summary: "Implement modular features with clear contracts and validation, with the requirement ID in view.",
    details: [
      "Keep forms, services, data access and reporting separate",
      "Validate on the server, not only in the browser",
      "Enforce permissions in the service layer",
      "Keep changes small enough to review",
    ],
    artifacts: ["Working feature", "Updated documentation"],
    questions: ["Is the rule enforced where it cannot be bypassed?"],
    seenIn: [BEYONDGEN, SQM],
  },

  // ---- Validate
  {
    id: "v-uat",
    stage: "validate",
    kind: "activity",
    row: 1,
    evidence: "practiced",
    title: "UAT coordination",
    summary: "Coordinate and track business validation of the required behavior: prepared, QA review, business review.",
    details: [
      "Prepare the test cases from the acceptance criteria",
      "Track results in one place, linked to the requirement ID",
      "Route a result to QA review and then to business review",
      "Send failed items back with a clear description of what differed",
    ],
    artifacts: ["UAT cases and results", "Approval log"],
    questions: ["Which acceptance criterion does this case prove?", "Who reviews it next?"],
    seenIn: [IOPEX],
  },
  {
    id: "v-triage",
    stage: "validate",
    kind: "activity",
    row: 2,
    evidence: "practiced",
    title: "Defect triage",
    summary: "Turn a failure into a finding a developer can act on: reproduction, expected versus actual, impact.",
    details: [
      "Reproduce it and record the steps",
      "Write expected versus actual behavior",
      "Say who is affected and how badly",
      "Link it to the requirement and hand it off cleanly",
    ],
    artifacts: ["Triaged defect with reproduction steps"],
    questions: ["Can someone else reproduce it from my notes?", "Is it a defect, or a gap in the requirement?"],
    seenIn: [IOPEX],
  },
  {
    id: "v-gate",
    stage: "validate",
    kind: "gate",
    row: 3,
    evidence: "practiced",
    title: "Approved?",
    summary: "Does it meet the acceptance criteria? If yes it moves on. If not, it goes back, and the reason is recorded.",
    details: [
      "Approved: record the approval and move to the change log",
      "Rework: return to the build with the failed criteria",
      "Requirement change: raise a change request against the baseline",
    ],
    artifacts: ["Approval decision"],
    questions: ["Is this a build fix or a requirement change?"],
  },

  // ---- Communicate
  {
    id: "c-change",
    stage: "communicate",
    kind: "artifact",
    row: 4,
    evidence: "practiced",
    title: "Change request and addendum",
    summary: "A controlled record of what changed against the approved baseline, why, who approved it, and what it affects.",
    details: [
      "State what changed relative to the baseline",
      "Give the reason and the impact on scope, data and reports",
      "Record who approved it",
      "Link it to the tests and work items it touches",
    ],
    artifacts: ["Change request", "Addendum"],
    questions: ["What exactly changed, and why?", "What else does it affect?"],
    seenIn: [IOPEX],
  },
  {
    id: "c-log",
    stage: "communicate",
    kind: "artifact",
    row: 1,
    evidence: "practiced",
    title: "Change log and traceability",
    summary: "One request ID that links the requirement, the change, the work item, the test and the result, so any number can be traced back.",
    details: [
      "One ticket or request ID from first report to resolution",
      "A controlled requirement baseline and a change log",
      "Linked acceptance criteria, defect and UAT references",
      "A defined responsibility matrix",
    ],
    artifacts: ["Change log", "Traceability links"],
    questions: ["Can I trace this report back to its source?", "Which document version applies?"],
    seenIn: [IOPEX, SQM],
  },
  {
    id: "c-readout",
    stage: "communicate",
    kind: "activity",
    row: 2,
    evidence: "practiced",
    title: "Stakeholder readout",
    summary: "Present findings, business risks and proposed corrective actions to management in plain language.",
    details: [
      "Lead with what the numbers say and what they do not",
      "Show exceptions and trends, with the definitions behind them",
      "Separate what is confirmed from what is proposed",
      "Recommend the next action and who owns it",
    ],
    artifacts: ["Dashboard", "Findings summary"],
    questions: ["What decision does this help someone make?", "What are the known limits of the data?"],
    seenIn: [IOPEX, ANALYTICS],
  },
  { id: "c-roadmap", stage: "communicate", kind: "activity", row: 3, evidence: "method", stepId: "12", questions: ["What must stay protected now?", "What can expand later?"] },
];

export interface MapEdge {
  id: string;
  from: string;
  to: string;
  /** a return path back to an earlier stage */
  loop?: boolean;
  label?: string;
}

const e = (from: string, to: string, extra: Partial<MapEdge> = {}): MapEdge => ({ id: `${from}>${to}`, from, to, ...extra });

export const edges: MapEdge[] = [
  e("d-interviews", "d-frame"),
  e("d-frame", "d-problem"),
  e("d-problem", "d-users"),
  e("d-users", "s-mvp"),
  e("d-capture", "m-asis"),
  e("d-capture", "m-data"),
  e("d-interviews", "m-asis"),
  e("m-asis", "m-workflow"),
  e("m-workflow", "m-roles"),
  e("m-roles", "m-data"),
  e("m-asis", "s-req"),
  e("m-data", "s-req"),
  e("m-data", "s-ac"),
  e("s-mvp", "s-biz"),
  e("s-biz", "s-req"),
  e("s-req", "s-ac"),
  e("s-ac", "s-gate"),
  e("s-ac", "b-build"),
  e("s-gate", "g-feature"),
  e("s-gate", "b-handoff"),
  e("g-feature", "g-schema"),
  e("g-schema", "b-handoff"),
  e("b-handoff", "b-ai"),
  e("b-handoff", "b-build"),
  e("b-ai", "b-build"),
  e("b-build", "v-uat"),
  e("v-uat", "v-triage"),
  e("v-uat", "v-gate"),
  e("v-triage", "v-gate"),
  e("v-gate", "c-log"),
  e("v-gate", "b-build", { loop: true, label: "rework" }),
  e("v-gate", "c-change", { loop: true, label: "change needed" }),
  e("c-change", "s-req", { loop: true, label: "re-baseline" }),
  e("c-change", "c-log"),
  e("c-log", "c-readout"),
  e("c-readout", "c-roadmap"),
];

export interface Scenario {
  id: string;
  label: string;
  description: string;
  /** node ids in order; consecutive ids are joined by an edge */
  path: string[];
}

export const scenarios: Scenario[] = [
  {
    id: "issue",
    label: "Production issue",
    description: "A live system misbehaves. I capture it, map what really happens, write the change, hand it off, validate it and keep the trail.",
    path: ["d-capture", "m-asis", "s-req", "s-ac", "s-gate", "b-handoff", "b-build", "v-uat", "v-triage", "v-gate", "c-log", "c-readout"],
  },
  {
    id: "requirement",
    label: "New requirement",
    description: "A team needs something new. Interviews, a current-state map, states and roles, then a baselined requirement and a design to build from.",
    path: ["d-interviews", "m-asis", "m-workflow", "m-roles", "m-data", "s-req", "s-ac", "s-gate", "g-feature", "g-schema", "b-handoff", "b-build"],
  },
  {
    id: "kpi",
    label: "KPI dashboard",
    description: "Management needs a number it can trust. Define the source and grain, define the KPI, build the logic, validate it, then report it.",
    path: ["d-capture", "m-data", "s-ac", "b-build", "v-uat", "v-gate", "c-log", "c-readout"],
  },
  {
    id: "concept",
    label: "Product concept",
    description: "A product idea starts rough. Frame it, state the problem, choose the first audience, cut the first version and write the requirements.",
    path: ["d-interviews", "d-frame", "d-problem", "d-users", "s-mvp", "s-biz", "s-req", "s-ac", "s-gate", "g-feature", "g-schema"],
  },
  {
    id: "access",
    label: "Role-based module",
    description: "A module with approvals and different permissions. Map the process, define the states and roles, fix the data, then specify, design and build it.",
    path: ["m-asis", "m-workflow", "m-roles", "m-data", "s-ac", "s-gate", "g-feature", "g-schema", "b-handoff", "b-build", "v-uat", "v-gate"],
  },
  {
    id: "ai",
    label: "AI-assisted build",
    description: "A baselined change is built with an AI assistant: a bounded task, a reviewed result, then the usual validation and gate.",
    path: ["s-ac", "s-gate", "b-handoff", "b-ai", "b-build", "v-uat", "v-triage", "v-gate", "c-log"],
  },
  {
    id: "change",
    label: "Change after release",
    description: "Testing finds that a requirement was wrong. The change goes back through the baseline, is built again and is checked again.",
    path: ["v-uat", "v-triage", "v-gate", "c-change", "s-req", "s-ac", "s-gate", "b-handoff", "b-build"],
  },
  {
    id: "release",
    label: "Release and handover",
    description: "A built and accepted release is recorded, traced and explained, and the next versions are planned.",
    path: ["b-build", "v-uat", "v-gate", "c-change", "c-log", "c-readout", "c-roadmap"],
  },
];

export interface ResolvedNode extends MapNode {
  title: string;
  summary: string;
  details: string[];
  inputs: string[];
  artifacts: string[];
  questions: string[];
  seenIn: SeenIn[];
  stageTitle: string;
}

const stepById = new Map(processSteps.map((s) => [s.id, s]));
const stageById = new Map(stages.map((s) => [s.id, s]));

/** Fill in a node's text from its planning phase when it has a `stepId`; own fields win. */
export function resolveNode(node: MapNode): ResolvedNode {
  const step = node.stepId ? stepById.get(node.stepId) : undefined;
  return {
    ...node,
    title: node.title ?? step?.title ?? node.id,
    summary: node.summary ?? step?.shortDesc ?? "",
    details: node.details ?? step?.details ?? [],
    inputs: node.inputs ?? step?.tools ?? [],
    artifacts: node.artifacts ?? step?.outcomes ?? [],
    questions: node.questions ?? [],
    seenIn: node.seenIn ?? [],
    stageTitle: stageById.get(node.stage)?.title ?? "",
  };
}

export const resolvedNodes: ResolvedNode[] = nodes.map(resolveNode);
export const nodeById = new Map(resolvedNodes.map((n) => [n.id, n]));
