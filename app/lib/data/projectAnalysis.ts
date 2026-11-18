/**
 * Analysis artifacts shown on flagship project pages: the problem, a traceability table (need -> requirement -> rule -> check),
 * a workflow, the decision rules and what is still unconfirmed. Content is a generalized model drawn from the portfolio notes,
 * not a copy of any employer document, and each entry says so in `basis`.
 */

export interface TraceRow {
  need: string;
  requirement: string;
  rule: string;
  check: string;
}

export interface ProjectAnalysis {
  problem: string;
  trace: TraceRow[];
  flow?: { title: string; steps: string[]; note?: string };
  rules: string[];
  open: string[];
  /** Honest statement of what this analysis is based on. */
  basis: string;
}

export type ProjectAccent = "violet" | "teal" | "amber" | "rose";

/** Per-project accent: overrides --primary on the project page only. */
export const projectAccent: Record<string, ProjectAccent> = {
  "sqm-supplier-quality": "teal",
  "cict-organization-website": "violet",
  "lms-learning-management": "amber",
};

export const projectAnalysis: Record<string, ProjectAnalysis> = {
  "sqm-supplier-quality": {
    problem:
      "Supplier quality work spans many connected flows: supplier records, quality actions, submissions, evidence, nonconformities and approvals. Legacy behavior was hard to change safely because the rules lived across screens, endpoints and tables, and nobody could say which role was allowed to do what.",
    trace: [
      {
        need: "A rejected document must stay fixable by the supplier; an approved one must stay protected.",
        requirement: "Each status defines which roles may edit, submit or reopen the record.",
        rule: "Approved records are read-only. Rejected records return to the supplier for revision.",
        check: "As supplier, edit a rejected record (allowed) and an approved record (blocked).",
      },
      {
        need: "Reviewers must not complete both approval steps by accident.",
        requirement: "Checker and approver actions are separate transitions with separate timestamps.",
        rule: "A checker action never sets the approver timestamp.",
        check: "Submit as checker, then confirm only the checker timestamp is set.",
      },
      {
        need: "Exports must match what the user sees.",
        requirement: "An export respects the active filters and the user's permissions.",
        rule: "Summary cards, tables and exports use the same record selection and definitions.",
        check: "Apply a filter, export, and compare the row count with the table total.",
      },
      {
        need: "Missing information must not look like a real zero.",
        requirement: "Empty values stay empty unless the field is a genuine zero measurement.",
        rule: "No placeholder zero for unknown values.",
        check: "Save a record with a blank measurement and confirm it reads blank, not 0.",
      },
      {
        need: "Hidden buttons must not be the only protection.",
        requirement: "Permissions are enforced on the server for every operation.",
        rule: "The UI hides actions for convenience; the API refuses them for security.",
        check: "Call the endpoint directly as an unauthorized role and confirm it is refused.",
      },
    ],
    flow: {
      title: "Approval states (generalized model)",
      steps: ["Draft", "Submitted", "Checker review", "Approver review", "Approved / Rejected / Returned"],
      note: "A generalized model from the multi-step approval behavior, not the exact state machine of every production module.",
    },
    rules: [
      "Approval and rejection are explicit transitions with named allowed predecessor states.",
      "Identifiers stay stable even where legacy modules use sequential IDs and newer ones use UUIDs.",
      "Spreadsheet exports guard against formula injection and bound the dataset size.",
      "Uploaded files use validated paths and access control.",
    ],
    open: [
      "Exact organizational expansions of some module acronyms need confirming before they are published.",
      "Production screenshots and a real permission matrix would need employer sign-off.",
    ],
    basis: "Generalized from my notes on the supplier quality modernization work. No employer documents are reproduced.",
  },
  "cict-organization-website": {
    problem:
      "Event administration ran on disconnected posts, manual registration sheets and hand-counted attendance, so organizers could not easily tell who registered, who arrived, and who was allowed to change records.",
    trace: [
      {
        need: "Organizers need one place to create and publish events.",
        requirement: "Authorized organizers can create, edit and publish events and content.",
        rule: "Only users with an organizer role can publish.",
        check: "As a regular member, try to publish an event and confirm it is refused.",
      },
      {
        need: "Participants must register without paper sheets.",
        requirement: "A participant registers for an event and receives an event-specific QR identity.",
        rule: "One registration ties one participant to one event.",
        check: "Register once and confirm a single QR identity exists for that event.",
      },
      {
        need: "Staff need fast, reliable attendance at the door.",
        requirement: "Authorized staff scan the QR code to record attendance in the mobile app.",
        rule: "Each attendance record names the actor, the event and the participant.",
        check: "Scan a code and confirm the record shows who scanned, for which event, for whom.",
      },
      {
        need: "Web and mobile must agree.",
        requirement: "Both surfaces use the same APIs and the same role rules.",
        rule: "Access control is enforced in the API, not only in either client.",
        check: "Perform a restricted action from each client and confirm both are refused identically.",
      },
    ],
    flow: {
      title: "Event attendance journey",
      steps: ["Organizer creates event", "Participant registers", "QR identity issued", "Staff scans at entry", "Attendance recorded"],
    },
    rules: [
      "Roles limit who can publish, scan and view records.",
      "Every attendance event stays traceable to an authorized actor, an event and a participant.",
    ],
    open: [
      "Duplicate-scan prevention, offline scanning and audit rules are sound recommendations, but are not confirmed as implemented.",
      "Current maintenance status needs confirming.",
    ],
    basis: "Based on the documented components of the platform. Items listed as open are not claimed as delivered.",
  },
  "lms-learning-management": {
    problem:
      "A learning platform has to keep course content, learner access and uploaded files consistent while making sure restricted actions are protected by the server rather than by hiding buttons.",
    trace: [
      {
        need: "Only the right people can reach course material.",
        requirement: "Users authenticate with a token and access depends on their role.",
        rule: "Authorization is checked on every API operation, independently of the screen.",
        check: "Call a course-admin endpoint as a learner and confirm it is refused.",
      },
      {
        need: "Course owners upload files safely.",
        requirement: "Uploads are validated, stored outside the database and linked to the course.",
        rule: "Downloads use scoped, time-limited links; object keys are not guessable.",
        check: "Upload an invalid file type (rejected) and open a link after it expires (refused).",
      },
      {
        need: "Stored files and database records must not drift apart.",
        requirement: "A course record references its stored object, and the pair is created and removed together.",
        rule: "No record points at a missing object and no object is left without a record.",
        check: "Delete a course and confirm both the record and its stored file are gone.",
      },
      {
        need: "Test and cloud behavior must match.",
        requirement: "Local development uses an emulated storage service in containers.",
        rule: "Configuration parity between local testing and cloud services.",
        check: "Run the upload tests locally and confirm they exercise the same code path as the cloud service.",
      },
    ],
    flow: {
      title: "Course file flow",
      steps: ["Owner creates course", "Owner uploads file", "File stored in object storage", "Record links the file", "Learner opens a scoped link"],
    },
    rules: [
      "Learner and course-administrator permissions are separate and enforced server-side.",
      "Authentication failures, invalid uploads and unauthorized access each get a test.",
    ],
    open: ["Deployment state and the exact frontend and backend versions need confirming before they are attributed."],
    basis: "Based on the documented feature areas of this independent project.",
  },
};
