export interface PortfolioProjectSummary {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  status: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface PortfolioTimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface PortfolioWorkExperienceEntry {
  id: string;
  role: string;
  company: string;
  dateRange: string;
  summary: string;
  stack: string[];
  highlight: string;
}

export interface PortfolioProcessSummary {
  id: string;
  title: string;
  shortDescription: string;
  duration: string;
  tools: string[];
}

export interface PortfolioContactLink {
  label: string;
  href: string;
  value: string;
}

export interface PortfolioKnowledge {
  name: string;
  fullName: string;
  title: string;
  tagline: string;
  about: string;
  quickFacts: Array<{ label: string; value: string }>;
  skills: string[];
  projects: PortfolioProjectSummary[];
  experience: PortfolioWorkExperienceEntry[];
  timeline: PortfolioTimelineEntry[];
  process: PortfolioProcessSummary[];
  contact: {
    email: string;
    phone: string;
    location: string;
    resumeUrl: string;
    links: PortfolioContactLink[];
  };
}

export interface CliCommandContext {
  knowledge: PortfolioKnowledge;
}

export interface CliCommandResult {
  title: string;
  lines: string[];
  tone?: "default" | "success" | "warning";
  suggestions?: string[];
}

export interface CliCommandDefinition {
  name: string;
  description: string;
  usage: string;
  execute: (args: string[], context: CliCommandContext) => CliCommandResult;
}

export interface ChatbotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface ChatbotResponse {
  title: string;
  message: string;
  suggestions?: string[];
  isFallback?: boolean;
}
