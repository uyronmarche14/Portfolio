// Process steps data for the workflow visualization

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  expandedDescription?: string[];
  shortDesc: string;
  details: string[];
  duration: string;
  tools?: string[];
  outcomes?: string[];
}

export const processSteps: ProcessStep[] = [
  {
    id: "1",
    title: "Product Framing",
    shortDesc: "Turn the raw idea into a clear product direction",
    description:
      "I start by converting a rough concept into a usable product direction. This phase gives the work a clear purpose, shared language, and stable starting point before I scope features or systems.",
    expandedDescription: [
      "This is where I define what kind of product it is, what it should help people do, and what the larger vision is supposed to become over time. Instead of jumping straight into screens or features, I build the first stable explanation of the product so every later document follows the same direction.",
      "I usually frame the product around its core promise, main value, and end-to-end flow. That means writing the one-line description, the broader product statement, the initial mission, and the high-level journey from input to output so the rest of the process is anchored in something clear.",
      "I also make sure the product is described as more than a single tool. If the system is supposed to move from input to organization, insights, reports, workflows, or action, that journey gets written here first so the rest of the planning is built around the full process instead of only the entry feature.",
    ],
    details: [
      "Define the product type, core promise, and overall direction",
      "Write the first usable description of what the product should become",
      "Clarify the mission, long-term vision, and high-level product intent",
      "Outline the main product flow from creation to action or outcome",
      "Create a stable framing that later requirements can build on",
    ],
    tools: ["README", "PRD", "Final Product Summary"],
    outcomes: ["Product overview", "Vision statement", "Core framing notes"],
    duration: "1-2 days",
  },
  {
    id: "2",
    title: "Problem & Goals",
    shortDesc: "Document the problem, outcomes, and success targets",
    description:
      "After framing the product, I define the actual problem being solved and the outcomes that matter. This keeps the build grounded in purpose instead of drifting into random features.",
    expandedDescription: [
      "In this phase I document the friction behind the idea, who experiences it, and why existing tools are not enough. The goal is to make the problem explicit, not assumed, so the product is solving a real workflow gap instead of collecting features that sound useful.",
      "I also define what success should mean for both users and the product itself. That includes practical goals, early product metrics, engagement signals, and the specific jobs the system should make easier, faster, or more organized.",
      "This is also where I write down the manual steps users are currently forced to do after data collection, like cleaning messy records, organizing submissions, filtering people, summarizing results, building charts, or writing reports by hand. Those pain points become the reason later features exist.",
    ],
    details: [
      "Describe the real friction the product is meant to remove",
      "List the primary goals for users and the product itself",
      "Define what success should look like in practical terms",
      "Document where current tools stop and manual work begins",
      "Set a measurable baseline before any deeper scoping starts",
    ],
    tools: ["PRD"],
    outcomes: ["Problem statement", "Primary goals", "Success metric baseline"],
    duration: "1-2 days",
  },
  {
    id: "3",
    title: "Users & Positioning",
    shortDesc: "Define the audience and how the product should be understood",
    description:
      "Before feature planning gets too deep, I decide who the product is for first and how it should be positioned. This phase keeps the build aligned with a real audience and a sharper value proposition.",
    expandedDescription: [
      "Here I map the first user groups, their strongest use cases, and the language the product should use when presenting itself. I use this phase to avoid building for everyone at once, because a product becomes much clearer when the first market and user intention are defined early.",
      "I also shape how the product should be understood in the market. That includes deciding what it is not, what makes it more useful than basic tools, and what kind of value statement or tagline best represents the system.",
      "I usually connect each audience to a concrete workflow. That means identifying whether the product is serving research, schools, HR, events, internal requests, or professional intake first, then making sure the positioning reflects the actual outcomes those users need rather than generic platform language.",
    ],
    details: [
      "Identify the main user groups and their strongest use cases",
      "Choose the best entry market or first audience segment",
      "Write a clearer positioning statement and differentiation story",
      "Define what the product should not be reduced to",
      "Make sure the product is framed as a system, not just a simple tool",
    ],
    tools: ["PRD", "Business Model", "Final Product Summary"],
    outcomes: ["Audience map", "Positioning statement", "Differentiation notes"],
    duration: "1-2 days",
  },
  {
    id: "4",
    title: "MVP Definition",
    shortDesc: "Lock the first release before the scope grows too much",
    description:
      "I reduce the larger vision into a disciplined first release. This phase protects focus by deciding what absolutely belongs in version one, what can wait, and what stays out of scope.",
    expandedDescription: [
      "This phase turns the full vision into a strict first release that people can actually use. I define the MVP goal, the core promise of that release, and the minimum set of features needed so users can complete the main workflow without relying on several other tools.",
      "I separate must-have modules from later versions, define the first supported question types and response management features, and document what is intentionally postponed. That way the build stays realistic while still feeling complete.",
      "I usually get specific here about what the first version supports: account access, dashboard, form builder, public submission, response table, search, filters, tags, statuses, analytics, templates, consent, export, and the first AI-assisted outputs. If something belongs to future organization workflows, advanced reports, billing, or marketplace behavior, it stays out.",
    ],
    details: [
      "Separate must-have features from nice-to-haves and later versions",
      "Define the first build promise in practical product terms",
      "Choose the smallest useful release that can stand on its own",
      "Lock the first supported workflows, modules, and question types",
      "Document exclusions so the scope remains realistic and shippable",
    ],
    tools: ["MVP Scope", "README", "PRD"],
    outcomes: ["MVP scope", "Release boundaries", "Exclusion list"],
    duration: "1-2 days",
  },
  {
    id: "5",
    title: "Business & Monetization",
    shortDesc: "Map the long-term business path without bloating the MVP",
    description:
      "Once the first version is defined, I think about how the product can sustain itself later. This phase keeps the business model visible without letting monetization distort the early build.",
    expandedDescription: [
      "After the MVP is clear, I document how the product could grow into a business. This includes the first likely customer groups, how the product may be packaged for different markets, and what kinds of premium value make sense later.",
      "I use this phase to think through freemium logic, AI/report monetization, team plans, white-label expansion, and future marketplace opportunities. The important part is that business direction stays visible without forcing the MVP to carry every paid feature too early.",
      "I also define the likely growth order of those business layers. A product might start free, then charge for higher-value reports or AI usage, then add organization plans, and only later introduce bigger commercial systems. That sequencing helps the build stay aligned with adoption instead of trying to monetize everything at launch.",
    ],
    details: [
      "Define who the strongest paying users could be later",
      "Package the product into understandable offers or market lanes",
      "Map the monetization direction and future premium value",
      "Sequence revenue ideas from simple paid value to larger platform models",
      "Keep long-term business thinking visible while protecting focus",
    ],
    tools: ["Business Model", "Final Product Summary"],
    outcomes: ["Monetization direction", "Market packaging", "Growth path notes"],
    duration: "1-2 days",
  },
  {
    id: "6",
    title: "Workflow Logic",
    shortDesc: "Map the system flow, statuses, rules, and action points",
    description:
      "Before implementation, I document how the system should behave from start to finish. This phase makes the operational logic explicit instead of leaving important behavior to assumption.",
    expandedDescription: [
      "This is where I write the operational logic of the product in sequence. I define the main system flow, then break down how form creation, publishing, submission, response handling, consent, AI generation, reporting, filtering, and later action workflows should behave.",
      "I also document statuses, transitions, validations, and rules so the product is not just feature-rich but behaviorally consistent. By the end of this phase, the product has a usable logic model rather than a loose collection of ideas.",
      "This is usually the phase where I write the actual step-by-step flow, like draft to published to closed, how responses move from new to reviewed or qualified, when consent must be checked, when AI can assist, and where human review is required. That makes downstream implementation and review much more stable.",
    ],
    details: [
      "Map the core user flow from creation through final action",
      "Define statuses, transitions, validations, and lifecycle rules",
      "Write logic for submission, consent, review, and AI-assisted steps",
      "Describe how data moves from response collection into reports and action",
      "Make major workflows predictable before development begins",
    ],
    tools: ["Business Logic"],
    outcomes: ["Workflow map", "State logic", "Decision rules"],
    duration: "2-3 days",
  },
  {
    id: "7",
    title: "Requirements Blueprint",
    shortDesc: "Translate the product into functional and system requirements",
    description:
      "After the workflow is clear, I formalize what the system must actually support. This becomes the bridge between product thinking and implementation decisions.",
    expandedDescription: [
      "Once the logic is stable, I turn it into concrete requirements. I document what the system must allow users to do across authentication, dashboards, form building, submission, response management, analytics, AI assistance, reporting, and consent handling.",
      "This phase also captures the non-functional side of the build, including performance, security, privacy, usability, scalability, reliability, accessibility, and technical constraints. It becomes the operating reference for implementation choices.",
      "I usually write this in a feature-by-feature way so every major area has clear capability statements. That includes what the user must be able to configure, what the system must validate, what the interface must support, and what technical limits or early constraints the product should respect in the first versions.",
    ],
    details: [
      "List functional requirements by feature area and capability",
      "Capture performance, privacy, security, and usability expectations",
      "Define validation rules and product behavior in concrete terms",
      "Document technical direction, system limits, and MVP constraints",
      "Create a requirements baseline that implementation can reliably follow",
    ],
    tools: ["System Requirements", "MVP Scope"],
    outcomes: ["Functional spec", "System constraints", "Acceptance baseline"],
    duration: "2-3 days",
  },
  {
    id: "8",
    title: "Data Management",
    shortDesc: "Design how collected information becomes usable product data",
    description:
      "I define how collected responses should be organized, reviewed, filtered, and used. This phase shapes the internal data experience, not just storage.",
    expandedDescription: [
      "Here I treat data as a working system, not a passive record. I define how every form should become a smart database with searchable responses, filters, statuses, notes, tags, exports, analytics, and future workflow actions built on top of the same records.",
      "I also think through different operational modes such as research, hiring, events, or internal requests. That helps shape how statuses, labels, saved views, and filtering logic should support real use instead of generic storage.",
      "This is where I usually define what a good internal data experience looks like. For example, I decide whether users need a table-first workflow, which status sets make sense for different use cases, what tags are internal only, and how the same response data should support charts, reports, filtering, approvals, or invitations later.",
    ],
    details: [
      "Define the smart database concept behind every project workflow",
      "Design tags, statuses, notes, filtering, and response handling",
      "Clarify how data becomes useful for reporting and action-taking",
      "Map different status models for research, HR, events, and review flows",
      "Make the internal data model practical before schema planning",
    ],
    tools: ["Data Management", "Business Logic"],
    outcomes: ["Data workflow model", "Status strategy", "Review model"],
    duration: "2-3 days",
  },
  {
    id: "9",
    title: "Feature Architecture",
    shortDesc: "Break the product into modules, feature groups, and build slices",
    description:
      "After the foundation is clear, I split the product into modules and implementation clusters. This helps me decide what gets built together and how the system scales later.",
    expandedDescription: [
      "In this phase I decompose the product into functional modules with clear purpose. I group together capabilities like authentication, dashboarding, form building, templates, public submission, smart response management, analytics, AI assistance, reporting, consent, filtering, workflows, and team collaboration.",
      "The point is not just to list features, but to decide what each module owns, what belongs in MVP, what belongs later, and how the feature set expands without turning the product into a tangled build.",
      "I also use this phase to split broad features into real implementation slices. Question types, templates, analytics, report sections, event tools, filters, and workflow approvals all become clearer when they are assigned to modules with a defined purpose rather than remaining as one long feature list.",
    ],
    details: [
      "Define the main modules and what each one owns",
      "Map question types, templates, AI features, reports, and dashboards",
      "Connect features back to users, flow, and release priorities",
      "Separate MVP modules from later workflow, billing, and marketplace layers",
      "Turn the product into practical implementation slices",
    ],
    tools: ["Modules and Features", "MVP Scope", "System Requirements"],
    outcomes: ["Module map", "Feature clusters", "Implementation slices"],
    duration: "2-4 days",
  },
  {
    id: "10",
    title: "Schema Planning",
    shortDesc: "Model the database structure before deeper implementation",
    description:
      "I translate the workflow and features into a storage model that can support flexible records, relationships, permissions, and future expansion without becoming fragile.",
    expandedDescription: [
      "After the product modules are clear, I model the underlying entities and relationships. I usually define users, workspaces, memberships, forms, questions, responses, answers, tags, notes, reports, consent logs, workflows, and audit structures based on the needs of the system.",
      "This phase is where dynamic answers, response history, privacy boundaries, performance concerns, and future scaling are considered at the data layer. It keeps the implementation from becoming unstable later when more product depth is added.",
      "I usually think ahead here about what tables or records will be needed once the product grows. That can include report records, saved views, event attendance, opportunities, invitations, workflow runs, audit logs, and plan-related data later. Even if some of those are future-facing, the early schema needs to leave room for them.",
    ],
    details: [
      "Define the core entities and their relationships",
      "Model forms, questions, responses, answers, tags, and notes",
      "Design workspace and membership structures for collaboration later",
      "Account for audit, consent, reporting, and future workflow records",
      "Make sure the schema supports both MVP use and future growth",
    ],
    tools: ["Database Schema", "Data Management", "Business Logic"],
    outcomes: ["Schema structure", "Entity relationships", "Storage strategy"],
    duration: "2-3 days",
  },
  {
    id: "11",
    title: "Roles & Governance",
    shortDesc: "Define who can access, edit, review, and control the system",
    description:
      "I decide who can do what, how access should be limited, and how workspace collaboration should work. This keeps permissions and ownership clear before scaling the product.",
    expandedDescription: [
      "This phase defines both user identity and operational access. I document account types for onboarding and segmentation, then define workspace roles like owner, admin, editor, reviewer, viewer, and external respondent so access logic is explicit before team features grow.",
      "I also decide what each role can create, edit, review, export, approve, or only observe. That includes data access rules for personal workspaces, shared workspaces, public form respondents, and future advanced permission layers.",
      "I use this phase to prevent permission ambiguity later. If a reviewer can change status but not edit form structure, or a viewer can read reports but not export personal data, those decisions are written here. It also sets the foundation for approval flows, audit history, and controlled collaboration once organizations are added.",
    ],
    details: [
      "Define account types and workspace role structure",
      "Map permissions for forms, responses, reports, exports, and AI use",
      "Set ownership rules for personal and shared workspaces",
      "Document who can approve, review, observe, or submit externally",
      "Prepare the product for controlled collaboration and governance",
    ],
    tools: ["User Roles and Permissions", "System Requirements", "Database Schema"],
    outcomes: ["Permission matrix", "Role model", "Access control direction"],
    duration: "1-2 days",
  },
  {
    id: "12",
    title: "Risk, Compliance & Roadmap",
    shortDesc: "Set guardrails, rollout order, and long-term expansion",
    description:
      "I close the process by documenting what could go wrong, how the product stays trustworthy, and how the roadmap should expand version by version without losing focus.",
    expandedDescription: [
      "I end the planning process by documenting trust, risk, and sequence. This includes privacy risk, consent risk, AI reliability, security, bias, scope control, and the rules that keep future monetization or data usage from violating the product's integrity.",
      "I also define the release order from prototype to public MVP, then toward AI, workflow, organization, monetization, and larger platform expansion. That creates a roadmap that is strategic, staged, and easier to build responsibly.",
      "This phase is also where I decide what must never happen automatically. Examples include publishing AI output without review, using personal data without the right consent, letting the system make final decisions in sensitive flows, or expanding feature scope so aggressively that the core product becomes unstable. Those guardrails matter as much as the roadmap itself.",
    ],
    details: [
      "Identify privacy, consent, AI, scope, and security risks early",
      "Define principles like privacy-by-design and human review",
      "Sequence releases from prototype through later platform versions",
      "Set rules for what can expand later and what must stay protected now",
      "Finish with a roadmap that balances ambition, trust, and execution reality",
    ],
    tools: ["Risks and Compliance", "Roadmap", "Final Product Summary"],
    outcomes: ["Risk register", "Compliance guardrails", "Versioned roadmap"],
    duration: "1-2 days",
  },
];
