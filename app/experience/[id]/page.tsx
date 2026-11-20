import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ExperienceRolePage from "@/components/features/experience-page/ExperienceRolePage";
import { workExperience } from "@/lib/data/workExperience";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Rendered on demand: the Cloudflare runtime this site is deployed on does not serve pages that Next pre-generates for dynamic routes
// (they returned 404), so unknown ids are handled by notFound() below instead of dynamicParams = false.
export const dynamic = "force-dynamic";

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
