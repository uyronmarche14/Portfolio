import type { AchievementCategory } from "@/lib/data/achievements";

type Category = Exclude<AchievementCategory, "all">;

/** Badge variant and icon color for each achievement category. */
export const categoryTone: Record<Category, { badge: "violet" | "rose" | "amber" | "teal" | "accent"; icon: string }> = {
  school: { badge: "violet", icon: "text-tone-violet" },
  college: { badge: "rose", icon: "text-tone-rose" },
  competitions: { badge: "amber", icon: "text-tone-amber" },
  certifications: { badge: "teal", icon: "text-tone-teal" },
  professional: { badge: "accent", icon: "text-primary" },
};
