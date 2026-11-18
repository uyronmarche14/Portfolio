/** Portfolio capability copy. These are analysis opportunities, not claimed employer outcomes. */
export const BUSINESS_ANALYSIS_CONTENT = {
  eyebrow: "Business analysis & decision support",
  title: "Turn everyday records into business insight",
  introduction:
    "I work with the data a business already has and define what it needs to start capturing. Spreadsheets, system exports, forms, activity logs, timestamps, statuses, and operational notes can reveal more than the obvious KPIs when they are structured around the right questions.",
  signals: [
    {
      title: "Growth & decline",
      description: "Follow demand, sales, conversion, retention, and changes over time to see where performance improves or slips.",
    },
    {
      title: "Friction & loss",
      description: "Look for waiting time, abandoned steps, repeated work, missed handoffs, and process failures that headline totals can hide.",
    },
    {
      title: "Gaps & early warnings",
      description: "Examine missing updates, recurring issues, unusual patterns, and differences between teams, sources, or periods.",
    },
  ],
  method:
    "I connect the business question to the source records, clean and validate the data, define the metrics, and present patterns with their limits. When a useful signal is missing, I define what to record so the next decision has better evidence.",
  sources: [
    {
      title: "Sales, demand & customer activity",
      examples: "Enquiries, orders, cancellations, renewals, channel reports, and spreadsheets.",
      question: "Is demand growing, where does it fall away, and which customers or channels return?",
      capture: "Record identifiers, dates, channel, value, outcome, and cancellation or loss reasons where available.",
    },
    {
      title: "Workflow events & handoffs",
      examples: "Application records, forms, status histories, approvals, activity logs, and waiting times.",
      question: "Where does work wait, repeat, fail, or get lost between steps?",
      capture: "Capture entry and exit times, meaningful updates, status changes, owner, and handoff outcome.",
    },
    {
      title: "Feedback, issues & operational notes",
      examples: "Support requests, complaints, returned work, production issues, and free-text notes.",
      question: "Which problems recur, who is affected, and what might the headline totals miss?",
      capture: "Keep the original note and define consistent categories, impact, recurrence, and resolution evidence.",
    },
    {
      title: "Missing or inconsistent evidence",
      examples: "Blank timestamps, unmatched records, inconsistent labels, stale updates, and unrecorded events.",
      question: "What can we conclude today, and what must be captured before a metric is reliable?",
      capture: "Document gaps, agree field definitions, preserve missing values, and add validation and event capture.",
    },
  ],
} as const;
