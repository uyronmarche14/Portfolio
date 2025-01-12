import {
  FaReact,
  FaCode,
  FaCrown,
  FaMobileAlt,
  FaChalkboardTeacher,
  FaPaintBrush,
  FaGlobe,
  FaAndroid,
  FaFigma,
} from "react-icons/fa";
import { BiLogoJavascript } from "react-icons/bi";
import { SiCanva, SiExpo, SiTailwindcss } from "react-icons/si";
import { IconType } from "react-icons";

export interface ServiceCard {
  title: string;
  description: string;
  skills: string[];
  experience: string;
  highlight: string;
  icon: IconType;
  additionalIcons?: IconType[]; // New field for additional technology icons
}

export const serviceCards: ServiceCard[] = [
  {
    title: "Freelance Developer",
    description:
      "Building modern web and mobile applications for clients around the world.",
    skills: ["React.js", "React Native", "Node.js"],
    experience: "1 years",
    highlight: "Client-focused approach",
    icon: FaCode,
    additionalIcons: [FaReact, FaMobileAlt],
  },
  {
    title: "Student Leadership / President",
    description:
      "Leading student organizations and clubs to success through effective planning and execution.",
    skills: ["Leadership", "Event Planning", "Team Management"],
    experience: "4 years",
    highlight: "Organizational leadership",
    icon: FaCrown,
    additionalIcons: [FaChalkboardTeacher],
  },
  {
    title: "Mobile Development",
    description:
      "Building cross-platform mobile applications with modern frameworks and best practices.",
    skills: ["React Native", "Android Studio", "Expo"],
    experience: "2 years",
    highlight: "Specialized in modern mobile applications",
    icon: FaMobileAlt,
    additionalIcons: [FaAndroid, SiExpo],
  },
  {
    title: "1:1 Tutoring",
    description:
      "Mentoring aspiring developers through personalized guidance and practical learning experiences.",
    skills: ["Web Development", "Best Practices", "Code Review"],
    experience: "10+ students",
    highlight: "Focus on practical skills",
    icon: FaChalkboardTeacher,
    additionalIcons: [FaCode, BiLogoJavascript],
  },
  {
    title: "Poster Graphic Design",
    description:
      "Creating visually appealing posters for events, promotions, and personal projects.",
    skills: ["Canva", "Design", "Visual Communication"],
    experience: "2 years",
    highlight: "Modern Designs",
    icon: FaPaintBrush,
    additionalIcons: [SiCanva, FaFigma],
  },
  {
    title: "Web Development",
    description:
      "Building responsive and intuitive user interfaces with modern frameworks and best practices.",
    skills: ["React.js", "Next.js", "Tailwind CSS"],
    experience: "6 months",
    highlight: "Specialized in modern web applications",
    icon: FaGlobe,
    additionalIcons: [FaReact, SiTailwindcss],
  },
];
