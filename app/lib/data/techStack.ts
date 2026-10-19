import {
  Binary,
  Cloud,
  Cpu,
  Database,
  Lock,
  Mic,
  QrCode,
  Radio,
  Smartphone,
  Sparkles,
  Server,
  Wrench,
} from "lucide-react";
import type { ComponentType } from "react";
import {
  SiAmazonwebservices,
  SiAndroid,
  SiAndroidstudio,
  SiCplusplus,
  SiDocker,
  SiDotnet,
  SiEspressif,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiGooglegemini,
  SiIos,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiOpenjdk,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiReactquery,
  SiRender,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVitest,
} from "react-icons/si";

export type TechCategory = "Frontend" | "Backend" | "Data" | "Infra" | "AI" | "Mobile" | "Hardware" | "Tools";

export interface TechEntry {
  icon: ComponentType<{ size?: number; className?: string }>;
  category: TechCategory;
}

const reactNative: TechEntry = { icon: SiReact, category: "Mobile" };
const tailwind: TechEntry = { icon: SiTailwindcss, category: "Frontend" };
const express: TechEntry = { icon: SiExpress, category: "Backend" };
const supabase: TechEntry = { icon: SiSupabase, category: "Data" };
const sqlServer: TechEntry = { icon: Database, category: "Data" };

/** One source of truth for technology icons and groups. Names must match projects.ts exactly. */
export const techStack: Record<string, TechEntry> = {
  "Next.js": { icon: SiNextdotjs, category: "Frontend" },
  React: { icon: SiReact, category: "Frontend" },
  TypeScript: { icon: SiTypescript, category: "Frontend" },
  JavaScript: { icon: SiJavascript, category: "Frontend" },
  Vite: { icon: SiVite, category: "Frontend" },
  TailwindCSS: tailwind,
  "Tailwind CSS": tailwind,
  "TanStack Query": { icon: SiReactquery, category: "Frontend" },
  "React Native": reactNative,
  Expo: { icon: SiExpo, category: "Mobile" },
  Android: { icon: SiAndroid, category: "Mobile" },
  iOS: { icon: SiIos, category: "Mobile" },
  "Android Studio": { icon: SiAndroidstudio, category: "Mobile" },
  Java: { icon: SiOpenjdk, category: "Mobile" },
  "C#": { icon: SiDotnet, category: "Backend" },
  WinForms: { icon: SiDotnet, category: "Frontend" },
  "C++": { icon: SiCplusplus, category: "Hardware" },
  ESP32: { icon: SiEspressif, category: "Hardware" },
  "Node.js": { icon: SiNodedotjs, category: "Backend" },
  Express: express,
  "Express.js (API)": express,
  NestJS: { icon: SiNestjs, category: "Backend" },
  WebSockets: { icon: SiSocketdotio, category: "Backend" },
  "JWT Authentication": { icon: SiJsonwebtokens, category: "Backend" },
  Prisma: { icon: SiPrisma, category: "Data" },
  MySQL: { icon: SiMysql, category: "Data" },
  PostgreSQL: { icon: SiPostgresql, category: "Data" },
  MongoDB: { icon: SiMongodb, category: "Data" },
  "Microsoft SQL Server": sqlServer,
  "Microsoft SQL": sqlServer,
  Supabase: supabase,
  "Supabase (Postgres, Auth, RLS)": supabase,
  Firebase: { icon: SiFirebase, category: "Data" },
  Docker: { icon: SiDocker, category: "Infra" },
  AWS: { icon: SiAmazonwebservices, category: "Infra" },
  "AWS S3": { icon: Cloud, category: "Infra" },
  LocalStack: { icon: Server, category: "Infra" },
  "Render (Express API hosting)": { icon: SiRender, category: "Infra" },
  "Netlify (Next.js hosting)": { icon: SiNetlify, category: "Infra" },
  Vitest: { icon: SiVitest, category: "Tools" },
  OpenAI: { icon: SiOpenai, category: "AI" },
  "OpenAI API": { icon: SiOpenai, category: "AI" },
  Gemini: { icon: SiGooglegemini, category: "AI" },
  "D-ID API": { icon: Sparkles, category: "AI" },
  "AI/ML": { icon: Cpu, category: "AI" },
  "Speech Recognition": { icon: Mic, category: "AI" },
  "QR Codes": { icon: QrCode, category: "Hardware" },
  Realtime: { icon: Radio, category: "Backend" },
  Security: { icon: Lock, category: "Tools" },
  Binary: { icon: Binary, category: "Tools" },
  Tooling: { icon: Wrench, category: "Tools" },
  Mobile: { icon: Smartphone, category: "Mobile" },
};

const FALLBACK: TechEntry = { icon: Wrench, category: "Tools" };

export const getTech = (name: string): TechEntry => techStack[name] ?? FALLBACK;

export const hasTech = (name: string): boolean => name in techStack;

const CATEGORY_ORDER: TechCategory[] = ["Frontend", "Mobile", "Backend", "Data", "AI", "Infra", "Hardware", "Tools"];

/** Groups technology names by category, in a fixed display order. */
export function groupTech(names: string[]): Array<{ category: TechCategory; items: string[] }> {
  const groups = new Map<TechCategory, string[]>();
  for (const name of names) {
    const { category } = getTech(name);
    groups.set(category, [...(groups.get(category) ?? []), name]);
  }
  return CATEGORY_ORDER.filter((c) => groups.has(c)).map((category) => ({ category, items: groups.get(category)! }));
}
