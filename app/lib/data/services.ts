import {
  type LucideIcon,
  Code,
  Crown,
  BookOpen,
  Paintbrush,
  Globe,
  Figma,
  Square,
  Palette,
  AppWindow,
  LayoutGrid,
} from "lucide-react";

import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiExpo,
  SiAndroid,
} from "react-icons/si"; // Removed unused SiCanva'

import { FaReact, FaAndroid } from "react-icons/fa";
import { MdSmartphone } from "react-icons/md";

import type { IconType } from "react-icons";

export interface ServiceCard {
  title: string;
  description: string;
  skills: string[];
  experience: string;
  highlight: string;
  icon: LucideIcon | IconType;
  additionalIcons?: (LucideIcon | IconType)[]; // New field for additional technology icons
}

export const serviceCards: ServiceCard[] = [
  {
    title: "Freelance Developer",
    description:
      "Building modern web and mobile applications for clients around the world.",
    skills: ["React.js", "React Native", "Node.js"],
    experience: "2 years",
    highlight:
      "I had provided over 8 clients with different project mobile, web and such more",
    icon: Code,
    additionalIcons: [FaReact, MdSmartphone],
  },
  {
    title: "Student Leadership / President",
    description:
      "Leading student organizations and clubs to success through effective planning and execution.",
    skills: ["Leadership", "Event Planning", "Team Management"],
    experience: "4 years in College",
    highlight: "Organizational leadership",
    icon: Crown,
    additionalIcons: [BookOpen],
  },
  {
    title: "Mobile Development",
    description:
      "Building cross-platform mobile applications with modern frameworks and best practices.",
    skills: ["React Native", "Android Studio", "Expo"],
    experience: "3 years",
    highlight: "Specialized in modern mobile applications",
    icon: MdSmartphone,
    additionalIcons: [FaAndroid, AppWindow, SiExpo, SiAndroid, SiReact],
  },
  {
    title: "1:1 Tutoring",
    description:
      "Mentoring aspiring developers through personalized guidance and practical learning experiences.",
    skills: ["Web Development", "Best Practices", "Code Review"],
    experience: "10+ students",
    highlight: "Focus on practical skills",
    icon: BookOpen,
    additionalIcons: [Code, Square],
  },
  {
    title: "Poster Graphic Design",
    description:
      "Creating visually appealing posters for events, promotions, and personal projects.",
    skills: ["Canva", "Design", "Visual Communication"],
    experience: "2 years",
    highlight: "Modern Designs",
    icon: Paintbrush,
    additionalIcons: [Palette, Figma],
  },
  {
    title: "Web Development",
    description:
      "Building responsive and intuitive user interfaces with modern frameworks and best practices.",
    skills: ["React.js", "Next.js", "Tailwind CSS"],
    experience: "1 year",
    highlight: "Specialized in modern web applications",
    icon: Globe,
    additionalIcons: [LayoutGrid, SiReact, SiNextdotjs, SiTailwindcss],
  },
];
