/**
 * Architecture diagrams, only for projects whose architecture is documented in projects.ts.
 * Each node/edge below is taken from the project's own description; add others only after checking the repo docs.
 */
export interface ArchitectureNode {
  id: string;
  label: string;
  group: string;
  detail: string;
  x: number;
  y: number;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label: string;
}

export interface ProjectArchitecture {
  summary: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export const architectures: Record<string, ProjectArchitecture> = {
  "solace-hotel": {
    summary:
      "A simplified view of Solace Hotel: a Next.js web client, an Express API, and Supabase for data, authentication and storage.",
    nodes: [
      {
        id: "client",
        label: "Web client",
        group: "Frontend",
        detail:
          "Next.js and React user-facing app, hosted on Netlify. Guests register, browse room categories, check availability and reserve rooms; administrators manage rooms, pricing and inventory.",
        x: 0,
        y: 60,
      },
      {
        id: "api",
        label: "Express API",
        group: "Backend",
        detail: "Express.js API hosted on Render. Handles the secure server-side logic, kept separate from the web client.",
        x: 340,
        y: 60,
      },
      {
        id: "supabase",
        label: "Supabase",
        group: "Data & auth",
        detail: "Provides Postgres, authentication, storage and row-level security.",
        x: 680,
        y: 60,
      },
    ],
    edges: [
      { from: "client", to: "api", label: "requests" },
      { from: "api", to: "supabase", label: "data, auth, storage" },
    ],
  },

  "archon-project-workspace": {
    summary:
      "System map from Archon's own architecture document (docs/architecture-overview.md in the public repository): a Next.js frontend, a NestJS API, Prisma on MySQL/MariaDB, and mail providers that are dormant on the main branch.",
    nodes: [
      {
        id: "users",
        label: "Visitors, members, admins",
        group: "Users",
        detail:
          "Public pages (landing, login, signup, invite review) and a protected workspace shell (dashboard, board, notifications).",
        x: 0,
        y: 60,
      },
      {
        id: "frontend",
        label: "Next.js 16 frontend",
        group: "Frontend",
        detail:
          "App Router client organised by feature (auth, projects, project board, tasks, notifications). Uses React Query for caching and mutations and an axios client. The access token lives in memory only; sessions are recovered through a refresh cookie and /auth/refresh.",
        x: 230,
        y: 60,
      },
      {
        id: "api",
        label: "NestJS 11 API",
        group: "Backend",
        detail:
          "Served under /api/v1 with global validation. Modules: Auth, Health, Mail, Projects, ProjectInvites, Seed, TaskLogs and Tasks. Authorization combines an app-level user role with a per-project member role.",
        x: 460,
        y: 60,
      },
      {
        id: "prisma",
        label: "Prisma 7",
        group: "ORM",
        detail: "Prisma with the MariaDB adapter. Main entities include User, Project, ProjectMember, Task, TaskLog, TaskComment and ProjectInvite.",
        x: 690,
        y: 0,
      },
      {
        id: "db",
        label: "MySQL / MariaDB",
        group: "Database",
        detail: "The relational datasource. Local development runs it through Docker Compose.",
        x: 920,
        y: 0,
      },
      {
        id: "mail",
        label: "Mail providers",
        group: "External",
        detail: "Resend or SMTP. The architecture document marks this path as dormant on the main branch.",
        x: 690,
        y: 130,
      },
    ],
    edges: [
      { from: "users", to: "frontend", label: "browse" },
      { from: "frontend", to: "api", label: "REST" },
      { from: "api", to: "prisma", label: "queries" },
      { from: "prisma", to: "db", label: "SQL" },
      { from: "api", to: "mail", label: "dormant on main" },
    ],
  },
  "sqm-supplier-quality": {
    summary:
      "Structure of the public SQM frontend demo, taken from its project.md. It is a frontend demo with mock data; the document states backend validation is required for production. This is not a diagram of any private or production system.",
    nodes: [
      {
        id: "auth",
        label: "Auth store",
        group: "State",
        detail: "A Zustand store holds the signed-in user and a login hook.",
        x: 0,
        y: 0,
      },
      {
        id: "mock",
        label: "Mock data",
        group: "Data",
        detail: "Role permissions, users and business units are defined as mock data in the frontend.",
        x: 0,
        y: 130,
      },
      {
        id: "permissions",
        label: "Permission layer",
        group: "RBAC",
        detail:
          "Role-based access control with module-level and form/sub-form permissions, exposed through hasPermission, a Can component and ProtectedRoute. Roles: TIP (internal admin), SUPPLIER, SAE and JAPAN.",
        x: 340,
        y: 60,
      },
      {
        id: "pages",
        label: "5M1E module pages",
        group: "UI",
        detail:
          "The 5M1E workflow module with multi-status records (Draft, Submitted, Rejected, FApproved, Approved, ApprovedWC, Release), routed from App.tsx.",
        x: 680,
        y: 60,
      },
    ],
    edges: [
      { from: "auth", to: "permissions", label: "user and role" },
      { from: "mock", to: "permissions", label: "role permissions" },
      { from: "permissions", to: "pages", label: "gates access" },
    ],
  },
};
