import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ItemPage from "@/components/features/process/explorer/ItemPage";
import { explorerNodeById, explorerNodes } from "@/lib/data/explorerMap";

export const dynamicParams = false;

export function generateStaticParams() {
  return explorerNodes.map((n) => ({ id: n.id }));
}

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
