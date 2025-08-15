import { Technology } from "@/lib/types";

// Legacy interfaces for backward compatibility
export interface LegacyTechnology {
  name: string;
  iconName: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export const technologies: LegacyTechnology[] = [
  { name: "Python", iconName: "python" },
  { name: "JavaScript", iconName: "javascript" },
  { name: "C#", iconName: "csharp" },
  { name: "React", iconName: "react" },
  { name: "Tailwind CSS", iconName: "tailwind" },
  { name: "React Native", iconName: "react" },
  { name: "Android Studio", iconName: "android" },
  { name: "Expo Router", iconName: "app-window" },
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: "2020",
    title: "Started Learning Programming",
    description:
      "Began my journey with Python fundamentals and algorithmic thinking, building a strong foundation in computer science concepts.",
    icon: "laptop",
  },
  {
    year: "2021",
    title: "Web Development Bootcamp",
    description:
      "Completed intensive web development training covering HTML, CSS, JavaScript, and React fundamentals.",
    icon: "code",
  },
  {
    year: "2022",
    title: "First Professional Project",
    description:
      "Delivered first production-ready web application using React, Node.js, and PostgreSQL for a local business.",
    icon: "briefcase",
  },
  {
    year: "2023",
    title: "Mobile Development Specialization",
    description:
      "Mastered React Native and Expo, building cross-platform mobile applications with native performance.",
    icon: "smartphone",
  },
  {
    year: "2024",
    title: "Full-Stack Mastery",
    description:
      "Advanced to senior-level full-stack development, specializing in performance optimization, scalable architectures, and modern DevOps practices.",
    icon: "rocket",
  },
];
