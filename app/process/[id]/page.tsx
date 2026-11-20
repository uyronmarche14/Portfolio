import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ItemPage from "@/components/features/process/explorer/ItemPage";
import { explorerNodeById } from "@/lib/data/explorerMap";

// Rendered on demand: the Cloudflare runtime this site is deployed on does not serve pages that Next pre-generates for dynamic routes
// (they returned 404), so unknown ids are handled by notFound() below instead of dynamicParams = false.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const node = explorerNodeById.get(id);
  return node ? { title: `${node.title} - Process - Ron Marche`, description: node.summary } : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!explorerNodeById.has(id)) notFound();
  return <ItemPage id={id} />;
}
