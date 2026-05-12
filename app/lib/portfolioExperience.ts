import { portfolioKnowledge } from "@/lib/data/portfolioKnowledge";
import type {
  ChatbotResponse,
  CliCommandDefinition,
  CliCommandResult,
} from "@/lib/types/portfolioKnowledge";

const formatProjectLine = (projectTitle: string, details: string): string =>
  `${projectTitle}: ${details}`;

const getProjectByIdOrName = (value: string) => {
  const query = value.toLowerCase();
  return portfolioKnowledge.projects.find(
    (project) =>
      project.id.toLowerCase() === query ||
      project.title.toLowerCase() === query ||
      project.title.toLowerCase().includes(query)
  );
};

const createDefaultSuggestions = (): string[] => [
  "projects",
  "project solace-hotel",
  "experience",
  "contact",
];

export const cliCommands: CliCommandDefinition[] = [
  {
    name: "help",
    description: "List available commands",
    usage: "help",
    execute: () => ({
      title: "Available Commands",
      lines: [
        "help - Show every supported command",
        "about - Quick introduction",
        "projects - List featured and in-progress work",
        "project <slug> - Show details for one project",
        "experience - Career snapshot and timeline highlights",
        "timeline - Year-by-year journey",
        "process - How I work with clients",
        "skills - Core technologies and tools",
        "contact - Email, phone, socials, and location",
        "resume - Resume access details",
        "socials - External profiles",
        "clear - Clear terminal history",
      ],
      suggestions: createDefaultSuggestions(),
    }),
  },
  {
    name: "about",
    description: "See a concise profile summary",
    usage: "about",
    execute: () => ({
      title: "About Ron",
      lines: [
        portfolioKnowledge.about,
        `Current focus: ${portfolioKnowledge.title}`,
        `Tagline: ${portfolioKnowledge.tagline}`,
      ],
      suggestions: ["skills", "projects", "experience"],
    }),
  },
  {
    name: "projects",
    description: "Browse project summaries",
    usage: "projects",
    execute: () => ({
      title: "Projects",
      lines: portfolioKnowledge.projects.map((project) =>
        formatProjectLine(
          project.id,
          `${project.title} (${project.status}) - ${project.description}`
        )
      ),
      suggestions: ["project solace-hotel", "project codex-express", "contact"],
    }),
  },
  {
    name: "project",
    description: "Inspect one project by slug",
    usage: "project <slug>",
    execute: (args) => {
      if (!args.length) {
        return {
          title: "Project Command",
          lines: ["Usage: project <slug>", "Example: project solace-hotel"],
          tone: "warning",
          suggestions: ["projects"],
        };
      }

      const project = getProjectByIdOrName(args.join(" "));

      if (!project) {
        return {
          title: "Project Not Found",
          lines: [
            `I couldn't find a project matching "${args.join(" ")}".`,
            "Try `projects` first to see the available slugs.",
          ],
          tone: "warning",
          suggestions: ["projects"],
        };
      }

      return {
        title: project.title,
        lines: [
          project.description,
          `Slug: ${project.id}`,
          `Category: ${project.category}`,
          `Status: ${project.status}`,
          `Stack: ${project.technologies.join(", ")}`,
          `Details page: /projects/${project.id}`,
          ...(project.liveUrl ? [`Live: ${project.liveUrl}`] : []),
          ...(project.githubUrl ? [`GitHub: ${project.githubUrl}`] : []),
        ],
        suggestions: ["projects", "skills", "contact"],
      };
    },
  },
  {
    name: "experience",
    description: "See work and growth highlights",
    usage: "experience",
    execute: () => ({
      title: "Experience Highlights",
      lines: portfolioKnowledge.experience.map((entry) =>
        formatProjectLine(
          entry.dateRange,
          `${entry.role} @ ${entry.company} - ${entry.summary}`
        )
      ),
      suggestions: ["timeline", "skills", "process"],
    }),
  },
  {
    name: "timeline",
    description: "Browse the full learning journey",
    usage: "timeline",
    execute: () => ({
      title: "Journey Timeline",
      lines: portfolioKnowledge.timeline.map((entry) =>
        formatProjectLine(entry.year, `${entry.title} - ${entry.description}`)
      ),
      suggestions: ["experience", "projects"],
    }),
  },
  {
    name: "process",
    description: "Review the client workflow",
    usage: "process",
    execute: () => ({
      title: "Process",
      lines: portfolioKnowledge.process.map((step) =>
        formatProjectLine(
          `Step ${step.id}`,
          `${step.title} (${step.duration}) - ${step.shortDescription}`
        )
      ),
      suggestions: ["contact", "projects"],
    }),
  },
  {
    name: "skills",
    description: "List core technologies",
    usage: "skills",
    execute: () => ({
      title: "Core Skills",
      lines: [
        `Primary stack: ${portfolioKnowledge.skills.join(", ")}`,
        ...portfolioKnowledge.quickFacts.map(
          (fact) => `${fact.label}: ${fact.value}`
        ),
      ],
      suggestions: ["projects", "experience"],
    }),
  },
  {
    name: "contact",
    description: "Get contact information",
    usage: "contact",
    execute: () => ({
      title: "Contact",
      lines: [
        `Email: ${portfolioKnowledge.contact.email}`,
        `Phone: ${portfolioKnowledge.contact.phone}`,
        `Location: ${portfolioKnowledge.contact.location}`,
        `Resume: ${portfolioKnowledge.contact.resumeUrl}`,
      ],
      suggestions: ["socials", "resume"],
    }),
  },
  {
    name: "resume",
    description: "Open resume details",
    usage: "resume",
    execute: () => ({
      title: "Resume",
      lines: [
        "Resume is available as a PDF from the portfolio.",
        `Direct path: ${portfolioKnowledge.contact.resumeUrl}`,
        "Use the navbar resume button or open /resume.pdf in a new tab.",
      ],
      suggestions: ["contact", "socials"],
    }),
  },
  {
    name: "socials",
    description: "See external profile links",
    usage: "socials",
    execute: () => ({
      title: "Social Links",
      lines: portfolioKnowledge.contact.links.map(
        (link) => `${link.label}: ${link.href}`
      ),
      suggestions: ["contact", "resume"],
    }),
  },
  {
    name: "clear",
    description: "Clear terminal output",
    usage: "clear",
    execute: () => ({
      title: "Clear",
      lines: [],
    }),
  },
];

export const getCliCommand = (commandName: string) =>
  cliCommands.find((command) => command.name === commandName);

export const getCliInitialOutput = (): CliCommandResult[] => [
  {
    title: "Portfolio Terminal",
    lines: [
      `Welcome to ${portfolioKnowledge.fullName}'s portfolio terminal.`,
      "Run `help` to explore projects, skills, experience, resume, and contact details.",
    ],
    suggestions: createDefaultSuggestions(),
  },
];

export const chatbotStarterPrompts = [
  "Tell me about your best project",
  "What stack do you use?",
  "How can I contact you?",
  "What experience do you have?",
];

export function getChatbotResponse(input: string): ChatbotResponse {
  const question = input.trim().toLowerCase();

  if (!question) {
    return {
      title: "Portfolio Bot",
      message: "Ask me about Ron's projects, skills, experience, process, resume, or contact details.",
      suggestions: chatbotStarterPrompts,
    };
  }

  if (
    question.includes("contact") ||
    question.includes("email") ||
    question.includes("phone") ||
    question.includes("reach")
  ) {
    return {
      title: "Contact",
      message: `You can reach Ron at ${portfolioKnowledge.contact.email}, call ${portfolioKnowledge.contact.phone}, or review his socials and resume from this portfolio.`,
      suggestions: ["What stack do you use?", "Tell me about your best project"],
    };
  }

  if (question.includes("resume") || question.includes("cv")) {
    return {
      title: "Resume",
      message: `Ron’s resume is available at ${portfolioKnowledge.contact.resumeUrl}. You can also open it from the navbar resume action.`,
      suggestions: ["How can I contact you?", "What experience do you have?"],
    };
  }

  if (
    question.includes("stack") ||
    question.includes("skills") ||
    question.includes("tech")
  ) {
    return {
      title: "Skills",
      message: `Ron primarily works with ${portfolioKnowledge.skills.join(", ")}. His portfolio also highlights ${portfolioKnowledge.quickFacts
        .map((fact) => `${fact.label.toLowerCase()}: ${fact.value}`)
        .join("; ")}.`,
      suggestions: ["Tell me about your best project", "What experience do you have?"],
    };
  }

  if (
    question.includes("experience") ||
    question.includes("background") ||
    question.includes("journey")
  ) {
    const recentEntries = portfolioKnowledge.experience
      .map((entry) => `${entry.role} at ${entry.company} (${entry.dateRange})`)
      .join("; ");

    return {
      title: "Experience",
      message: `Ron’s work history is resume-backed and spans freelance, startup, and product engineering. Recent roles include ${recentEntries}.`,
      suggestions: ["What stack do you use?", "How do you work with clients?"],
    };
  }

  if (
    question.includes("process") ||
    question.includes("work with") ||
    question.includes("client")
  ) {
    return {
      title: "Process",
      message: `Ron’s workflow covers ${portfolioKnowledge.process
        .map((step) => step.title)
        .join(", ")}. The process page expands each step with timing and tools.`,
      suggestions: ["What experience do you have?", "How can I contact you?"],
    };
  }

  if (question.includes("project") || question.includes("work")) {
    const matchedProject = portfolioKnowledge.projects.find(
      (project) =>
        question.includes(project.id.toLowerCase()) ||
        question.includes(project.title.toLowerCase())
    );

    if (matchedProject) {
      return {
        title: matchedProject.title,
        message: `${matchedProject.title} is a ${matchedProject.category.toLowerCase()} project built with ${matchedProject.technologies.join(
          ", "
        )}. ${matchedProject.description}`,
        suggestions: ["What stack do you use?", "How can I contact you?"],
      };
    }

    const featured = portfolioKnowledge.projects.slice(0, 3);
    return {
      title: "Projects",
      message: `Some standout work includes ${featured
        .map((project) => project.title)
        .join(", ")}. Ask about a specific project slug for more detail.`,
      suggestions: featured.map((project) => `Tell me about ${project.title}`),
    };
  }

  return {
    title: "Portfolio-only Bot",
    message:
      "I only answer questions about Ron, his portfolio, projects, skills, process, resume, and contact details.",
    suggestions: chatbotStarterPrompts,
    isFallback: true,
  };
}
