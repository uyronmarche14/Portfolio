// Process steps data for the workflow visualization

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  shortDesc: string; // New: one-liner for card preview
  details: string[];
  duration: string;
  tools?: string[];
  outcomes?: string[];
}

export const processSteps: ProcessStep[] = [
  {
    id: "1",
    title: "Discovery",
    shortDesc: "Understand your vision and goals",
    description: "We start by understanding your vision, goals, and target audience. This phase ensures we're aligned on objectives before any design or development begins.",
    details: [
      "Discovery calls to understand your business goals",
      "Market research and competitive analysis",
      "Technical requirements assessment",
      "Project scope and milestone definition",
    ],
    tools: ["Notion", "Miro", "Google Meet"],
    outcomes: ["Project brief", "Requirements doc"],
    duration: "1 week",
  },
  {
    id: "2",
    title: "Planning",
    shortDesc: "Define scope, timeline, and architecture",
    description: "Creating a detailed roadmap with clear milestones, technical architecture decisions, and resource allocation.",
    details: [
      "Technical architecture planning",
      "Sprint planning and backlog creation",
      "Risk assessment and mitigation",
      "Timeline and budget finalization",
    ],
    tools: ["Linear", "Figma", "Notion"],
    outcomes: ["Project roadmap", "Technical spec"],
    duration: "1 week",
  },
  {
    id: "3",
    title: "Design",
    shortDesc: "Create intuitive, beautiful interfaces",
    description: "Creating intuitive, beautiful interfaces that solve real problems. Every design decision is backed by user research and aligned with your brand identity.",
    details: [
      "User persona and journey mapping",
      "Wireframing and information architecture",
      "High-fidelity UI design",
      "Design system creation",
      "Interactive prototypes",
    ],
    tools: ["Figma", "Framer", "Adobe CC"],
    outcomes: ["UI designs", "Design system", "Prototype"],
    duration: "2-3 weeks",
  },
  {
    id: "4",
    title: "Development",
    shortDesc: "Build with clean, scalable code",
    description: "Building your product with clean, maintainable code following industry best practices. Regular communication ensures you're always in the loop.",
    details: [
      "Agile sprints with weekly demos",
      "Component-based architecture",
      "Responsive implementation",
      "Performance optimization",
    ],
    tools: ["React", "Next.js", "TypeScript", "Tailwind"],
    outcomes: ["Working app", "Clean codebase"],
    duration: "4-8 weeks",
  },
  {
    id: "5",
    title: "Testing",
    shortDesc: "Ensure quality across all scenarios",
    description: "Comprehensive testing ensures a polished, bug-free product. We test across devices, browsers, and edge cases.",
    details: [
      "Unit and integration testing",
      "Cross-browser compatibility",
      "Performance benchmarking",
      "Accessibility compliance (WCAG)",
    ],
    tools: ["Playwright", "Jest", "Lighthouse"],
    outcomes: ["QA report", "Test coverage"],
    duration: "1 week",
  },
  {
    id: "6",
    title: "Review",
    shortDesc: "Iterate based on your feedback",
    description: "Your feedback drives the refinement process. We iterate until the product meets your expectations and delights your users.",
    details: [
      "Structured feedback sessions",
      "Rapid iteration cycles",
      "Usability testing",
      "A/B testing for critical flows",
    ],
    tools: ["Loom", "Notion", "Hotjar"],
    outcomes: ["Refined product", "Feedback report"],
    duration: "1 week",
  },
  {
    id: "7",
    title: "Deployment",
    shortDesc: "Launch to production smoothly",
    description: "Smooth deployment to production with zero downtime. We set up CI/CD pipelines and monitoring for long-term reliability.",
    details: [
      "Production deployment",
      "Domain and SSL configuration",
      "CI/CD pipeline setup",
      "Analytics integration",
    ],
    tools: ["Vercel", "AWS", "GitHub Actions"],
    outcomes: ["Live product", "Deployment docs"],
    duration: "2-3 days",
  },
  {
    id: "8",
    title: "Support",
    shortDesc: "Ongoing maintenance and growth",
    description: "We provide thorough handoff documentation and ongoing support to ensure long-term success.",
    details: [
      "Team training and knowledge transfer",
      "Documentation handoff",
      "Bug fixes and maintenance",
      "Feature enhancements (optional)",
    ],
    tools: ["Slack", "Linear", "GitHub"],
    outcomes: ["Documentation", "Support period"],
    duration: "Ongoing",
  },
];
