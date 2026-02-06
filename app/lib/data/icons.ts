import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import {
  SiAndroidstudio,
  SiDotnet,
  SiFirebase,
  SiGooglemaps,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedux,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export const techIconMap: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  TailwindCSS: SiTailwindcss,
  React: SiReact,
  Prisma: SiPrisma,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Firebase: SiFirebase,
  "Node.js": SiNodedotjs,
  JavaScript: SiJavascript,
  "Google Maps API": SiGooglemaps,
  "Stripe API": SiStripe,
  Redux: SiRedux,
  "C#": SiDotnet,
  Java: FaJava,
  "Android Studio": SiAndroidstudio,
  WinForms: SiDotnet, // Using .NET icon as proxy
  "OpenAI API": SiOpenai,
};
