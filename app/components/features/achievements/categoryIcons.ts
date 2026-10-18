import type { LucideIcon } from "lucide-react";

import {
  CertificationIcon,
  CompetitionIcon,
  EventsIcon,
  HonorsIcon,
  LeadershipIcon,
} from "@/components/ui/icons";
import type { AchievementCategory } from "@/lib/data/achievements";

export const categoryIcons: Partial<Record<AchievementCategory, LucideIcon>> = {
  school: HonorsIcon,
  college: LeadershipIcon,
  competitions: CompetitionIcon,
  certifications: CertificationIcon,
  professional: EventsIcon,
};
