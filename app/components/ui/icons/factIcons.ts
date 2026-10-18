import { BookOpen, Code2, Gamepad2, GraduationCap, MapPin, type LucideIcon } from "lucide-react";

/** Icon for each profile quick-fact label; unknown labels get no icon. */
export const factIcons: Record<string, LucideIcon> = {
  "Based in": MapPin,
  Education: GraduationCap,
  "Favorite Tech": Code2,
  Learning: BookOpen,
  Hobbies: Gamepad2,
};
