import type { Metadata } from "next";

import ExperienceIndex from "@/components/features/experience-page/ExperienceIndex";

export const metadata: Metadata = {
  title: "Experience - Ron Marche",
  description: "Work experience in detail: one page per role with the stack, highlights and photos.",
};

export default function Page() {
  return <ExperienceIndex />;
}
