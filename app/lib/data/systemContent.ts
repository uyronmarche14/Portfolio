/**
 * Written explanations for the process explorer: why each step matters, a concrete example, and what each step looks like inside each
 * scenario. Drafted from the portfolio notes (methodology, case studies) and generalized: no employer applications, clients or internal data.
 * This copy is AI-drafted and listed in docs/ai-drafts/PROCESS-CONTENT-REVIEW.md for the owner to approve or edit.
 */

export interface StepContent {
  why: string;
  example: string;
}

export const stepContent: Record<string, StepContent> = {
  "d-capture": {
    why: "A request that is vague at the start stays vague to the end. One clear record, with an ID, is what everything else hangs from.",
    example: "\"Approvals look stuck\" becomes: a checker submitted form 41 at 10:05, the status stayed Draft, so the approver never saw it. Expected: Submitted.",
  },
  "d-interviews": {
    why: "The people who run a process know things no document says. Asking each owner the same questions makes the answers comparable.",
    example: "Three team leads each describe 'approval' differently. Side by side, the notes show two teams skip a step the third one requires.",
  },
  "d-frame": {
    why: "A one-sentence description forces a decision about what the product is, before anyone argues about features.",
    example: "\"A booking site where guests check availability and reserve rooms, and staff manage rooms and reservations\".",
  },
  "d-problem": {
    why: "A product solves a problem someone has. Stating it, and how success is measured, stops the build drifting into random features.",
    example: "Problem: staff re-key reservations from messages into a sheet. Success: a reservation is entered once and never retyped.",
  },
  "d-users": {
    why: "Building for everyone at once means building for no one. Choosing a first audience makes the first version sharper.",
    example: "First audience: front-desk staff, not guests. Guests come in the second release.",
  },
  "m-asis": {
    why: "You cannot improve a process you have not drawn. The as-is map shows where work waits, who does what, and where it goes wrong.",
    example: "The map shows a manual copy from an email into a sheet, which is the only place a record can be lost.",
  },
  "m-workflow": {
    why: "Most bugs in business software are illegal state changes. Naming the valid states and transitions makes them testable.",
    example: "Draft, Submitted, Checker review, Approver review, then Approved, Rejected or Returned. A checker cannot approve; an approved record cannot be edited.",
  },
  "m-roles": {
    why: "A permission matrix turns 'who can do what' from opinion into a checkable table, and shows that it must be enforced on the server.",
    example: "Rows: supplier, checker, approver, read-only. Columns: view, edit, approve, export. A supplier can edit only a rejected record.",
  },
  "m-data": {
    why: "A report is only as trustworthy as its data. Fixing the grain and the source of truth early prevents double counting later.",
    example: "One row is one application, not one person: someone who applies twice is two rows. The request ID is the stable key.",
  },
  "s-mvp": {
    why: "The first version should prove the idea, not contain every idea.",
    example: "Version one: create a reservation and see availability. Billing, reports and reminders wait.",
  },
  "s-biz": {
    why: "A product has to pay for itself or be worth its cost. Writing the value case early makes priorities honest.",
    example: "Saving each staff member 30 minutes a day is the value case that justifies building the reservation form first.",
  },
  "s-req": {
    why: "Requirements are the contract between the business and the people building. Written so they can be tested, they end arguments.",
    example: "\"When a supplier resubmits a rejected record, the status returns to Submitted and the checker is notified.\"",
  },
  "s-ac": {
    why: "'Done' needs a definition a business user can check, and every number needs a definition before anyone charts it.",
    example: "KPI: update compliance. Numerator: applications updated within 72 hours. Denominator: applications with a recorded update. Left out: those with no update time.",
  },
  "s-gate": {
    why: "A baseline is a line in the sand. After it, a change is a visible change request, not a quiet edit that nobody agreed.",
    example: "Version 1.2 of the requirement set is signed off on a named date. A new field after that goes through change control.",
  },
  "g-feature": {
    why: "Grouping features into modules, and seeing what depends on what, decides the build order and the architecture.",
    example: "Reservations and rooms are one module; reports depend on both, so reports are built last.",
  },
  "g-schema": {
    why: "Planning fields, statuses and history before building avoids migrations that hurt when real data exists.",
    example: "Status is stored as a value, every approval is its own row with an actor and a time, and attachments store a reference, not the file.",
  },
  "b-handoff": {
    why: "Developers build what they understand. A clear handoff, with open questions answered, saves rework.",
    example: "A pack with the baseline, the permission matrix, the order of work, and one request ID linking each requirement to its work item.",
  },
  "b-ai": {
    why: "An assistant is fast at drafting and poor at knowing your business rules. A bounded task with a review step keeps the speed and removes the risk.",
    example: "Give it the code, the acceptance criteria and a narrow task; ask for options; read the diff; run the tests; note what is still unresolved.",
  },
  "b-build": {
    why: "Building with explicit contracts and server-side checks is what keeps a feature behaving the same way everywhere.",
    example: "The server refuses an approval from the wrong role even if the button is hidden in the screen.",
  },
  "v-uat": {
    why: "A passing build is not the same as business acceptance. Users confirm the behavior they asked for.",
    example: "Case 7 proves criterion 3: a rejected record can be edited by the supplier. Result and reviewer are logged against the requirement ID.",
  },
  "v-triage": {
    why: "A failure only gets fixed quickly if it arrives as a finding a developer can act on.",
    example: "Steps to reproduce, expected versus actual, who is affected and how badly, and a link to the requirement it breaks.",
  },
  "v-gate": {
    why: "Every release needs a clear yes or no, with the reason recorded and the way back defined.",
    example: "Fails criterion 2: rework goes back to build. Criterion 2 itself was wrong: it becomes a change request.",
  },
  "c-change": {
    why: "Change is normal. Controlled change keeps the history of why things are the way they are.",
    example: "Addendum 3: add a 'Returned for revision' status. Why: suppliers need to fix, not restart. Approved by the process owner.",
  },
  "c-log": {
    why: "Traceability means any number or behavior can be followed back to the request that caused it.",
    example: "Request 128, requirement 4.2 v1.3, work item 530, test case 7, result passed, approved on a named date.",
  },
  "c-readout": {
    why: "Findings only matter if the right people understand them and know what to do next.",
    example: "Lead with what the numbers say and what they do not; show the exceptions with their definitions; recommend one next action with an owner.",
  },
  "c-roadmap": {
    why: "Risks named early are cheaper than risks discovered late, and a roadmap shows what waits and why.",
    example: "Version 1: prototype with synthetic data. Version 2: real accounts after consent and privacy rules are agreed.",
  },
};

export const artifactExamples: Record<string, string> = {
  "a-request": "Request 128: checker submitted form 41, status stayed Draft; expected Submitted; approver never notified.",
  "a-notes": "Notes from three team leads, plus an open question: who owns the final approval when two teams disagree?",
  "a-brief": "A one-line description, the problem, the first audience and what it must not become.",
  "a-asis": "A swim-lane diagram with manual steps and system steps in different colors, and the rejection path drawn in.",
  "a-states": "A table of states, who may move a record from each, what data is required, and what notification fires.",
  "a-perm": "Roles as rows, actions as columns, each cell Yes, No or a condition such as 'only when Rejected'.",
  "a-data": "Entities, keys, and a sentence for each saying what one row is.",
  "a-brd": "Problem, scope, business rules and numbered requirements, each one testable.",
  "a-ac": "\"Given a rejected record, when the supplier edits it, then the status stays Rejected until resubmitted.\"",
  "a-kpi": "Name, reason, numerator, denominator, source, grain, exclusions, cutoff, owner, refresh and validation, on one sheet.",
  "a-base": "Requirement set v1.2, approved by named people on a named date.",
  "a-feature": "Modules and features, with arrows for dependencies and a release order.",
  "a-schema": "Tables or collections, mandatory fields, how status and history are stored.",
  "a-handoff": "Baseline, open questions, requirement-to-work-item links, order of work.",
  "a-uat": "A table of cases, each tied to a criterion, with result, reviewer and requirement ID.",
  "a-defect": "A short report: steps, expected, actual, impact, link to the requirement.",
  "a-approval": "A log entry: decision, approver, reason, and whether it was returned.",
  "a-change": "What changed, why, impact, approver, and the tests and work items it touches.",
  "a-log": "One row per request linking requirement, change, work item, test and result.",
  "a-dash": "KPIs with their definitions, exceptions, trends, known data limits and one recommended action.",
  "a-risk": "Risks with a guardrail each, and a release order from prototype to later versions.",
};

export interface ScenarioContent {
  whenToUse: string;
  outcome: string;
  /** what each step looks like in this situation, keyed by node id; one entry for every step on the path */
  notes: Record<string, string>;
}

export const scenarioContent: Record<string, ScenarioContent> = {
  issue: {
    whenToUse: "A live system does something unexpected and someone has reported it.",
    outcome: "A clear, tested fix with a record of what was wrong, what changed and who agreed.",
    notes: {
      "d-capture": "Write down what was reported, who it affects, and expected versus actual, before looking for causes.",
      "m-asis": "Map what really happens today, including the manual steps, to find where it goes wrong.",
      "s-req": "Describe the change in testable terms: what should happen instead, and what is out of scope.",
      "s-ac": "Write the checks that will prove it is fixed, so 'done' is not an opinion.",
      "s-gate": "Agree the change with the process owner so the fix is the one they actually want.",
      "b-handoff": "Give developers the reproduction, the expected behavior and the criteria, with one request ID.",
      "b-build": "The fix is built and checked on the server, not only hidden in the interface.",
      "v-uat": "Business users confirm the original problem is gone and nothing nearby broke.",
      "v-triage": "Anything that still fails is written up so it can be fixed in one pass.",
      "v-gate": "Approved, or back to build, or a change to the requirement itself.",
      "c-log": "The request, the change and the result stay linked, so it can be traced later.",
      "c-readout": "Tell stakeholders what was wrong, what changed and what is still open.",
    },
  },
  requirement: {
    whenToUse: "A team needs something new and no one has written down exactly what.",
    outcome: "A baselined requirement set and a design developers can build from.",
    notes: {
      "d-interviews": "Interview each process owner with the same questions; capture pain points and approvals.",
      "m-asis": "Draw the current process from what they said, then describe the future state.",
      "m-workflow": "Define the states and the allowed transitions, using the seven questions for each.",
      "m-roles": "Build the permission matrix, and decide where it is enforced.",
      "m-data": "Decide the entities, the grain of each record and the source of truth.",
      "s-req": "Write the BRD, and a PRD if it helps, as testable statements.",
      "s-ac": "Add acceptance criteria and, where numbers are involved, KPI definitions.",
      "s-gate": "Walk it through with the owners and baseline it.",
      "g-feature": "Group features into modules and set the build order.",
      "g-schema": "Plan the fields, statuses and history before anything is built.",
      "b-handoff": "Hand the pack to developers and answer their questions early.",
      "b-build": "Build with explicit contracts, with the requirement IDs visible in the work.",
    },
  },
  kpi: {
    whenToUse: "Management needs a number it can trust, and today people argue about what the number means.",
    outcome: "A dashboard where every measure has a definition and any figure can be traced to its source.",
    notes: {
      "d-capture": "Record who asked, which decision the number supports, and what they use today.",
      "m-data": "Fix the source and the grain first: what is one row, and where does it come from?",
      "s-ac": "Define each KPI: numerator, denominator, source, grain, exclusions, cutoff, owner, refresh.",
      "b-build": "Build the logic from the written definition, not from memory, and keep one calculation per measure.",
      "v-uat": "Business users check the numbers against a source they trust.",
      "v-gate": "Do the cards, charts and tables agree for the same filter? If not, it goes back.",
      "c-log": "Record the definitions and their versions so a figure can be traced.",
      "c-readout": "Present findings with the definitions, the exceptions and the known limits of the data.",
    },
  },
  concept: {
    whenToUse: "A product idea starts rough and needs to become something a team can build.",
    outcome: "A framed product, a first audience, a first version and a requirement set to start from.",
    notes: {
      "d-interviews": "Talk to the people the idea is for, before shaping it.",
      "d-frame": "Write the one-line description and what the product should be able to do end to end.",
      "d-problem": "State the problem, the goals and how success will be measured.",
      "d-users": "Choose the first audience and say what the product should not become.",
      "s-mvp": "Cut a first version that proves the idea.",
      "s-biz": "Check the value case and the cost of running it.",
      "s-req": "Turn the plan into testable requirements.",
      "s-ac": "Add acceptance criteria so 'done' is defined.",
      "s-gate": "Review and baseline the requirement set.",
      "g-feature": "Group features into modules and order them.",
      "g-schema": "Plan the data before building.",
    },
  },
};
