/**
 * "How it works" content for flagship projects: who uses the system and why, a layered system diagram, a request lifecycle and a
 * conceptual data model. Everything here is a GENERALIZED model written for the portfolio: layer names and the technologies come from the
 * project's own structure, but table names, columns and business thresholds are deliberately not copied from any employer system.
 */

export interface DeepDiveUser {
  role: string;
  needs: string;
}

export interface DeepDiveTierItem {
  name: string;
  detail: string;
}

export interface DeepDiveTier {
  title: string;
  subtitle: string;
  items: DeepDiveTierItem[];
}

export interface DeepDiveStep {
  title: string;
  text: string;
}

export type FieldKey = "pk" | "fk";
export interface ModelEntity {
  id: string;
  name: string;
  x: number;
  y: number;
  fields: { name: string; key?: FieldKey }[];
}

export type Side = "top" | "bottom" | "left" | "right";
export interface ModelRelation {
  from: string;
  fromSide: Side;
  to: string;
  toSide: Side;
  /** Label near the "one" end and the "many" end. */
  one: string;
  many: string;
}

export interface ProjectDeepDive {
  intro: string;
  users: DeepDiveUser[];
  tiers: DeepDiveTier[];
  /** Short label for the arrow between consecutive tiers. */
  links: string[];
  flowTitle: string;
  flow: DeepDiveStep[];
  model: {
    note: string;
    width: number;
    height: number;
    entities: ModelEntity[];
    relations: ModelRelation[];
    principles: string[];
  };
  basis: string;
}

export const projectDeepDive: Record<string, ProjectDeepDive> = {
  "sqm-supplier-quality": {
    intro:
      "SQM is an enterprise web platform where a manufacturer and its suppliers run quality processes together: a supplier proposes a change, internal staff check it, an approver signs it off, and every step leaves a record. Different people may do different things at different stages, so the system's real job is to enforce who can do what, in which order, and to keep the evidence.",
    users: [
      { role: "Supplier", needs: "Submit change requests and documents, see their status, and fix a rejected one without touching approved work." },
      { role: "Checker", needs: "Review submissions against the rules and pass them on, or send them back with a reason." },
      { role: "SQE staff", needs: "Follow supplier quality across modules, manage master data and keep lists and reports consistent." },
      { role: "Approver", needs: "Make the final decision on a request that has already been checked, with the full trail in front of them." },
    ],
    tiers: [
      {
        title: "Browser app",
        subtitle: "React + Vite, TypeScript",
        items: [
          { name: "Routing and permission gates", detail: "React Router pages; actions and screens are shown or hidden by the user's role for convenience." },
          { name: "Forms and validation", detail: "react-hook-form with zod schemas catch mistakes before anything is sent." },
          { name: "Server state and tables", detail: "TanStack Query caches API data; TanStack Table drives sortable, filterable lists." },
          { name: "Session and dashboards", detail: "A small Zustand store holds the session; Recharts draws the dashboard charts." },
        ],
      },
      {
        title: "API server",
        subtitle: "Node.js + Express, TypeScript",
        items: [
          { name: "Routes and middleware", detail: "Each request passes authentication (JWT) and a permission check before reaching any logic." },
          { name: "Validators", detail: "Input is validated again on the server, because the browser can never be trusted." },
          { name: "Controllers and services", detail: "Controllers stay thin; services hold the workflow rules, such as which status change is allowed for which role." },
          { name: "Data access", detail: "A separate layer owns the SQL, so rules and queries do not mix." },
        ],
      },
      {
        title: "Data and files",
        subtitle: "SQL Server and file storage",
        items: [
          { name: "SQL Server", detail: "Relational records for requests, review steps, suppliers, users and master data, reached through the mssql driver." },
          { name: "Attachment storage", detail: "Uploaded evidence is kept as files, grouped by module, with a database row pointing at each one." },
          { name: "Employee master data", detail: "People data lives in a separate connection so it is read, not copied." },
          { name: "Excel export", detail: "Reports are generated server-side from the same filtered selection the user sees." },
        ],
      },
    ],
    links: ["HTTPS and a signed token", "SQL and file reads/writes"],
    flowTitle: "What happens when someone submits a request",
    flow: [
      { title: "Fill in the form", text: "The browser validates required fields and formats before enabling submit." },
      { title: "Send with a token", text: "The request goes to the API with the user's signed session token." },
      { title: "Authenticate and authorize", text: "Middleware checks the token, then checks the user's permission for this module and action." },
      { title: "Validate the input", text: "The server rejects malformed or missing data, whatever the browser did." },
      { title: "Apply the workflow rule", text: "A service checks that this role may move the record from its current status to the requested one." },
      { title: "Write the record and the step", text: "The data layer saves the change and a review-step entry that names the actor and the time." },
      { title: "Store files, notify", text: "Attachments are saved and the next responsible person is notified." },
      { title: "Refresh the screen", text: "The browser refetches, so the list and the detail view show the same new status." },
    ],
    model: {
      note: "Conceptual data model. Entity and field names are simplified for explanation and are not the production schema.",
      width: 900,
      height: 560,
      entities: [
        { id: "role", name: "Role", x: 20, y: 20, fields: [{ name: "id", key: "pk" }, { name: "name" }, { name: "scope" }] },
        { id: "user", name: "User", x: 350, y: 20, fields: [{ name: "id", key: "pk" }, { name: "role_id", key: "fk" }, { name: "supplier_id", key: "fk" }, { name: "name" }] },
        { id: "supplier", name: "Supplier", x: 680, y: 20, fields: [{ name: "id", key: "pk" }, { name: "name" }, { name: "status" }] },
        { id: "permission", name: "Permission", x: 20, y: 190, fields: [{ name: "role_id", key: "fk" }, { name: "module" }, { name: "action" }] },
        {
          id: "request",
          name: "Request",
          x: 350,
          y: 190,
          fields: [{ name: "id", key: "pk" }, { name: "module" }, { name: "supplier_id", key: "fk" }, { name: "created_by", key: "fk" }, { name: "status" }, { name: "created_at" }],
        },
        { id: "step", name: "Review step", x: 20, y: 400, fields: [{ name: "id", key: "pk" }, { name: "request_id", key: "fk" }, { name: "actor_id", key: "fk" }, { name: "decision" }, { name: "decided_at" }] },
        { id: "attachment", name: "Attachment", x: 350, y: 400, fields: [{ name: "id", key: "pk" }, { name: "request_id", key: "fk" }, { name: "file_key" }, { name: "uploaded_by", key: "fk" }] },
        { id: "notification", name: "Notification", x: 680, y: 400, fields: [{ name: "id", key: "pk" }, { name: "request_id", key: "fk" }, { name: "recipient_id", key: "fk" }, { name: "sent_at" }] },
      ],
      relations: [
        { from: "role", fromSide: "right", to: "user", toSide: "left", one: "1", many: "*" },
        { from: "role", fromSide: "bottom", to: "permission", toSide: "top", one: "1", many: "*" },
        { from: "supplier", fromSide: "left", to: "user", toSide: "right", one: "1", many: "*" },
        { from: "supplier", fromSide: "bottom", to: "request", toSide: "right", one: "1", many: "*" },
        { from: "user", fromSide: "bottom", to: "request", toSide: "top", one: "1", many: "*" },
        { from: "request", fromSide: "bottom", to: "step", toSide: "top", one: "1", many: "*" },
        { from: "request", fromSide: "bottom", to: "attachment", toSide: "top", one: "1", many: "*" },
        { from: "request", fromSide: "bottom", to: "notification", toSide: "top", one: "1", many: "*" },
      ],
      principles: [
        "Status is an explicit value, and only the service layer may change it, using named allowed transitions.",
        "Every approval step is its own row with an actor and a timestamp, so a checker action can never fill in the approver's decision.",
        "Files live in storage and the database keeps only a reference, so a record and its evidence can be checked against each other.",
        "Unknown values stay empty. A missing measurement is never stored as a zero.",
        "Identifiers are stable across old and new modules, even where legacy ones are sequential numbers and newer ones are UUIDs.",
        "Lists, dashboard counts and exports use the same query, so the three can never disagree for one filter.",
      ],
    },
    basis:
      "Layer structure and technologies follow the project's own repository layout. The diagrams, field names and rules are a generalized teaching model; no production table names, thresholds or employer data are reproduced.",
  },

  "cict-organization-website": {
    intro:
      "The CICT platform gives an organization one place to publish content and run events. Organizers manage everything on the web; participants register and carry a QR identity on mobile; staff scan it at the door. The goal is that registration and attendance stop living in separate posts and paper sheets.",
    users: [
      { role: "Organizer", needs: "Create and publish events and content, and see who registered and who attended." },
      { role: "Participant", needs: "Find an event, register once and show a QR code at entry." },
      { role: "Event staff", needs: "Scan codes quickly and have each scan recorded against the right event and person." },
    ],
    tiers: [
      {
        title: "Clients",
        subtitle: "Next.js web and React Native (Expo) mobile",
        items: [
          { name: "Web admin and public site", detail: "Next.js pages for content, events and registration management." },
          { name: "Mobile app", detail: "React Native with Expo for sign-in, event discovery, registration and the QR code." },
          { name: "Scanner flow", detail: "Staff scan participant QR codes in the mobile app." },
        ],
      },
      {
        title: "API",
        subtitle: "Node.js + Express",
        items: [
          { name: "Auth and roles", detail: "Role-aware access: organizer, participant and staff actions are separated on the server." },
          { name: "Event and registration logic", detail: "Creates events, ties a registration to one participant and one event, issues the QR identity." },
          { name: "Attendance logic", detail: "Accepts a scan from authorized staff and records it against the event and participant." },
        ],
      },
      {
        title: "Database",
        subtitle: "MongoDB",
        items: [
          { name: "Users and roles", detail: "Accounts and the role each one holds." },
          { name: "Events and content", detail: "Published events and posts." },
          { name: "Registrations and attendance", detail: "Who registered for what, and who was scanned in, by whom and when." },
        ],
      },
    ],
    links: ["REST over HTTPS", "Queries"],
    flowTitle: "What happens from registration to attendance",
    flow: [
      { title: "Organizer publishes an event", text: "Only an organizer role can create and publish." },
      { title: "Participant registers", text: "The API ties one participant to one event." },
      { title: "QR identity is issued", text: "The registration produces a code the participant can show on mobile." },
      { title: "Staff scan at entry", text: "An authorized staff member scans the code in the app." },
      { title: "API records attendance", text: "The record names the event, the participant and the staff member who scanned." },
      { title: "Organizer reviews", text: "Registered versus attended is visible in the admin view." },
    ],
    model: {
      note: "Conceptual data model. Collections are simplified for explanation; duplicate-scan prevention is a recommended rule, not a confirmed feature.",
      width: 900,
      height: 330,
      entities: [
        { id: "user", name: "User", x: 20, y: 20, fields: [{ name: "id", key: "pk" }, { name: "name" }, { name: "role" }] },
        { id: "event", name: "Event", x: 350, y: 20, fields: [{ name: "id", key: "pk" }, { name: "title" }, { name: "starts_at" }, { name: "published_by", key: "fk" }] },
        { id: "content", name: "Content post", x: 680, y: 20, fields: [{ name: "id", key: "pk" }, { name: "title" }, { name: "author" }] },
        { id: "registration", name: "Registration", x: 185, y: 190, fields: [{ name: "id", key: "pk" }, { name: "user_id", key: "fk" }, { name: "event_id", key: "fk" }, { name: "qr_code" }] },
        { id: "attendance", name: "Attendance", x: 515, y: 190, fields: [{ name: "id", key: "pk" }, { name: "registration_id", key: "fk" }, { name: "scanned_by", key: "fk" }, { name: "scanned_at" }] },
      ],
      relations: [
        { from: "user", fromSide: "bottom", to: "registration", toSide: "left", one: "1", many: "*" },
        { from: "event", fromSide: "bottom", to: "registration", toSide: "top", one: "1", many: "*" },
        { from: "registration", fromSide: "right", to: "attendance", toSide: "left", one: "1", many: "*" },
        { from: "user", fromSide: "right", to: "event", toSide: "left", one: "1", many: "*" },
      ],
      principles: [
        "A registration ties exactly one participant to one event.",
        "Each attendance record names who scanned, for which registration and when.",
        "Roles decide who may publish, scan and view records, and the API enforces it.",
      ],
    },
    basis: "Based on the documented components of the platform. Items marked as recommendations are not claimed as delivered.",
  },

  "lms-learning-management": {
    intro:
      "The LMS lets course owners publish learning material and lets learners reach only what they are entitled to. The interesting part is not the screens but the boundaries: who can reach which course, how uploaded files are stored and shared safely, and keeping the stored file and its database record in step.",
    users: [
      { role: "Learner", needs: "Open the courses and materials they are enrolled in, and track their progress." },
      { role: "Course owner", needs: "Create courses, upload files and manage who can see them." },
      { role: "Administrator", needs: "Manage users and restricted actions that learners and owners cannot reach." },
    ],
    tiers: [
      {
        title: "Web app",
        subtitle: "React + TypeScript, Tailwind",
        items: [
          { name: "Course and learning screens", detail: "Course management, progress tracking and interactive learning flows." },
          { name: "Upload and playback", detail: "Files go to storage through a short-lived signed link, not through the page." },
        ],
      },
      {
        title: "API",
        subtitle: "Authenticated, role-based",
        items: [
          { name: "JWT authentication", detail: "Sign-in with email verification issues a token the API checks on every call." },
          { name: "Role-based access", detail: "Learner, owner and administrator permissions are enforced on the server, not by hiding buttons." },
          { name: "Signed-link service", detail: "Issues pre-signed URLs so uploads and downloads are scoped and expire." },
        ],
      },
      {
        title: "Data and storage",
        subtitle: "Database and AWS S3",
        items: [
          { name: "Application database", detail: "Courses, users, enrollments and a reference to each stored file." },
          { name: "Object storage (S3)", detail: "Course files live here, separate from the database." },
          { name: "LocalStack in development", detail: "An emulated S3 in Docker keeps local and cloud behavior the same." },
        ],
      },
    ],
    links: ["HTTPS and a signed token", "Queries and signed links"],
    flowTitle: "What happens when an owner uploads a course file",
    flow: [
      { title: "Owner signs in", text: "The API issues a token and knows the owner's role." },
      { title: "Owner picks a file", text: "The browser checks the file type and size first." },
      { title: "API authorizes and signs", text: "The server confirms the owner may edit this course, then returns a short-lived upload link." },
      { title: "File goes to storage", text: "The browser uploads straight to object storage with that link." },
      { title: "Record links the file", text: "A database row stores the object key against the course." },
      { title: "Learner opens it", text: "An enrolled learner gets a scoped, expiring link to view the file." },
    ],
    model: {
      note: "Conceptual data model, simplified for explanation.",
      width: 900,
      height: 330,
      entities: [
        { id: "user", name: "User", x: 20, y: 20, fields: [{ name: "id", key: "pk" }, { name: "email" }, { name: "role" }, { name: "verified" }] },
        { id: "course", name: "Course", x: 350, y: 20, fields: [{ name: "id", key: "pk" }, { name: "title" }, { name: "owner_id", key: "fk" }] },
        { id: "file", name: "Course file", x: 680, y: 20, fields: [{ name: "id", key: "pk" }, { name: "course_id", key: "fk" }, { name: "object_key" }, { name: "type" }] },
        { id: "enrollment", name: "Enrollment", x: 185, y: 190, fields: [{ name: "user_id", key: "fk" }, { name: "course_id", key: "fk" }, { name: "progress" }] },
      ],
      relations: [
        { from: "user", fromSide: "right", to: "course", toSide: "left", one: "1", many: "*" },
        { from: "course", fromSide: "right", to: "file", toSide: "left", one: "1", many: "*" },
        { from: "user", fromSide: "bottom", to: "enrollment", toSide: "top", one: "1", many: "*" },
        { from: "course", fromSide: "bottom", to: "enrollment", toSide: "right", one: "1", many: "*" },
      ],
      principles: [
        "No file record points at a missing object, and no object is left without a record.",
        "Authorization is checked on every API call, independently of what the screen shows.",
        "Downloads use scoped, expiring links and object keys are not guessable.",
      ],
    },
    basis: "Based on the documented feature areas of this independent project. Deployment state is not claimed.",
  },
};
