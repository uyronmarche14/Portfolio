import type { Metadata } from "next";

import ExperiencePage from "@/components/features/experience-page/ExperiencePage";

export const metadata: Metadata = {
  title: "Experience - Ron Marche",
  description: "Work experience in detail: roles, stack, highlights and photos.",
};

export default function Page() {
  return <ExperiencePage />;
}
