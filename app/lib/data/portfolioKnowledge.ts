import { contactInfo, socialLinks } from "@/lib/data/contacts";
import { processSteps } from "@/lib/data/process";
import { profileData } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";
import { HOME_CONTENT } from "@/lib/data/homeContent";
import { timelineYears } from "@/lib/data/about";
import { workExperience } from "@/lib/data/workExperience";
import type { PortfolioKnowledge } from "@/lib/types/portfolioKnowledge";

const portfolioSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "React Native",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "AWS",
  "Docker",
  "Supabase",
  "OpenAI API",
  "Figma",
  "Blender",
];

const primaryEmail = contactInfo.emails[0]?.address || "uyronmarcherhyssq@gmail.com";
const primaryPhone = contactInfo.phones[0]?.number || "";
const linkedinUrl =
  socialLinks.find((link) => link.label === "LinkedIn")?.href ||
  "https://www.linkedin.com/in/ron-marche-rhyss-uy-578b80240/";
const githubUrl =
  socialLinks.find((link) => link.label === "GitHub")?.href ||
  "https://github.com/uyronmarche14";
const instagramUrl =
  socialLinks.find((link) => link.label === "Instagram")?.href ||
  "https://www.instagram.com/ronmarcheee/";
const mediumUrl =
  socialLinks.find((link) => link.label === "Medium")?.href ||
  "https://medium.com/@ronmarcheuy";

export const portfolioKnowledge: PortfolioKnowledge = {
  name: HOME_CONTENT.name,
  fullName: profileData.header.highlight,
  title: profileData.header.description,
  tagline: HOME_CONTENT.description,
  about: profileData.bio.description,
  quickFacts: profileData.quickFacts,
  skills: portfolioSkills,
  projects: projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    category: project.category || "Development",
    status: project.status || "completed",
    githubUrl: project.githubUrl || undefined,
    liveUrl: project.liveUrl || project.liveDemoUrl || undefined,
  })),
  experience: workExperience.map((entry) => ({
    id: entry.id,
    role: entry.role,
    company: entry.company,
    dateRange: entry.dateRange,
    summary: entry.summary,
    stack: entry.stack,
    highlight: entry.highlight,
  })),
  timeline: timelineYears.flatMap((yearData) =>
    yearData.features.map((feature) => ({
      year: yearData.year,
      title: feature.title,
      description: feature.description,
    }))
  ),
  process: processSteps.map((step) => ({
    id: step.id,
    title: step.title,
    shortDescription: step.shortDesc,
    duration: step.duration,
    tools: step.tools || [],
  })),
  contact: {
    email: primaryEmail,
    phone: primaryPhone,
    location: contactInfo.location.address,
    resumeUrl: "/resume.pdf",
    links: [
      {
        label: "Email",
        href: `mailto:${primaryEmail}`,
        value: primaryEmail,
      },
      {
        label: "LinkedIn",
        href: linkedinUrl,
        value: "ron-marche-rhyss-uy-578b80240",
      },
      {
        label: "GitHub",
        href: githubUrl,
        value: "uyronmarche14",
      },
      {
        label: "Instagram",
        href: instagramUrl,
        value: "@ronmarcheee",
      },
      {
        label: "Medium",
        href: mediumUrl,
        value: "@ronmarcheuy",
      },
    ],
  },
};
