import {
  BookOpen,
  Bot,
  Cloud,
  Component,
  Cpu,
  Database,
  FileText,
  Figma,
  FlaskConical,
  Gamepad2,
  GitBranch,
  KeyRound,
  MapPin,
  MousePointerClick,
  Network,
  NotebookPen,
  Package,
  Plug,
  Presentation,
  QrCode,
  Rocket,
  Route,
  Send,
  Server,
  Sheet,
  Sparkles,
  Terminal,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType } from "react";

import { getTech, hasTech } from "@/lib/data/techStack";
import type { ToolNode } from "@/lib/data/systemMap";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

/** Icons for tools that have no brand icon in techStack.ts. */
const OWN: Record<string, LucideIcon> = {
  "t-excel": Sheet,
  "t-gdocs": FileText,
  "t-pq": Workflow,
  "t-notes": NotebookPen,
  "t-office": Presentation,
  "t-figma": Figma,
  "t-motion": Sparkles,
  "t-jest": FlaskConical,
  "t-e2e": MousePointerClick,
  "t-postman": Send,
  "t-dbeaver": Database,
  "t-git": GitBranch,
  "t-claude": Bot,
  "t-codex": Cpu,
  "t-gpt": Sparkles,
  "t-mcp": Plug,
  "t-bun": Zap,
  "t-linux": Terminal,
  "t-hosts": Cloud,
  "t-cf": Cloud,
  "t-homelab": Server,
  "t-shadcn": Component,
  "t-router": Route,
  "t-rest": Network,
  "t-oauth": KeyRound,
  "t-kysely": Database,
  "t-rag": BookOpen,
  "t-vercel": Rocket,
  "t-pm": Package,
  "t-imu": Cpu,
  "t-gps": MapPin,
  "t-game": Gamepad2,
  "t-qr": QrCode,
};

/** Brand icon from techStack.ts when there is one, otherwise a neutral icon of our own. */
export function toolIcon(t: ToolNode): IconComponent {
  if (t.tech && hasTech(t.tech)) return getTech(t.tech).icon as IconComponent;
  return (OWN[t.id] ?? Wrench) as IconComponent;
}
