import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ExperienceRolePage from "@/components/features/experience-page/ExperienceRolePage";
import { workExperience } from "@/lib/data/workExperience";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return workExperience.map((entry) => ({ id: entry.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const entry = workExperience.find((item) => item.id === id);
  return { title: entry ? `${entry.role}, ${entry.company} - Ron Marche` : "Experience - Ron Marche" };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  if (!workExperience.some((entry) => entry.id === id)) notFound();
  return <ExperienceRolePage id={id} />;
}
