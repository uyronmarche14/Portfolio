// Home section content data
export interface HeroSkillGroup {
  title: string;
  eyebrow: string;
  description: string;
  emphasis: "primary" | "secondary" | "neutral";
  skills: string[];
}

export const HOME_CONTENT = {
  name: "Ron Marche Rhyss Q. Uy",
  title: "BUILDING SOFTWARE AS A",
  description:
    "BS Computer Science graduate from Taguig City University building scalable web, mobile, and AI-assisted software solutions.",
};

export const HERO_SKILL_GROUPS: HeroSkillGroup[] = [
  {
    title: "Languages",
    eyebrow: "Programming Core",
    description:
      "The languages I rely on for application logic, scripting, and problem solving across products and prototypes.",
    emphasis: "primary",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Python", "C#", "SQL"],
  },
  {
    title: "Frontend",
    eyebrow: "Product UI",
    description:
      "Tools I use to design and ship responsive interfaces for web and mobile experiences.",
    emphasis: "secondary",
    skills: [
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "ShadCN UI",
      "React Native",
    ],
  },
  {
    title: "Backend",
    eyebrow: "Systems & APIs",
    description:
      "Backend patterns and API building blocks I use for authentication, business logic, and structured app flows.",
    emphasis: "neutral",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "Role-Based Access Control",
    ],
  },
  {
    title: "Databases",
    eyebrow: "Data & Storage",
    description:
      "Database and platform choices I use to model data, power app state, and support production workflows.",
    emphasis: "primary",
    skills: ["Microsoft SQL Server", "MySQL", "Supabase", "MongoDB"],
  },
  {
    title: "Cloud & DevOps",
    eyebrow: "Delivery Pipeline",
    description:
      "Infrastructure and deployment tooling I use to make builds, uploads, environments, and release workflows dependable.",
    emphasis: "secondary",
    skills: [
      "Docker",
      "AWS",
      "S3 (Pre-signed URLs)",
      "LocalStack",
      "GitHub Actions",
    ],
  },
  {
    title: "AI & Automation",
    eyebrow: "Applied AI",
    description:
      "AI systems and copilots I use for product features, workflow automation, rapid iteration, and LLM-powered experiences.",
    emphasis: "neutral",
    skills: [
      "OpenAI API",
      "Claude AI",
      "GitHub Copilot",
      "Antigravity",
      "Kiro",
      "LLM Integration",
    ],
  },
  {
    title: "Developer Tools",
    eyebrow: "Workflow & Design",
    description:
      "My everyday toolkit for coding, collaboration, UI planning, project coordination, and creative exploration.",
    emphasis: "primary",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Cursor",
      "Figma",
      "Blender",
      "Jira",
      "Trello",
      "GitLab",
      "ClickUp",
    ],
  },
];

// Background animations configuration
export const BACKGROUND_ANIMATIONS = [
  {
    className:
      "absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-[100px]",
    animate: {
      x: [0, 100, -100, 0],
      y: [0, -100, 100, 0],
      scale: [1, 1.2, 0.8, 1],
      opacity: [0.4, 0.7, 0.4],
    },
    transition: {
      duration: 30,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
    style: { top: "20%", left: "15%" },
  },
  {
    className:
      "absolute w-[300px] h-[300px] rounded-full bg-gradient-to-l from-secondary/30 to-primary/30 blur-[80px]",
    animate: {
      x: [0, -50, 50, 0],
      y: [0, 50, -50, 0],
      scale: [1, 0.8, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
    },
    transition: {
      duration: 25,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
    style: { bottom: "20%", right: "15%" },
  },
  {
    className:
      "absolute w-[250px] h-[250px] rounded-full bg-gradient-to-tr from-primary/20 via-secondary/20 to-primary/20 blur-[60px]",
    animate: {
      x: [0, 70, -70, 0],
      y: [0, -70, 70, 0],
      scale: [1, 1.1, 0.9, 1],
      opacity: [0.2, 0.5, 0.2],
    },
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut",
    },
    style: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  },
];

// Letter animation configuration
export const LETTER_ANIMATION = {
  initial: { opacity: 0, y: 50 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
    },
  }),
};
