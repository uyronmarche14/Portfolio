import type { Metadata } from "next";

import ProcessExplorer from "@/components/features/process/explorer/ProcessExplorer";

export const metadata: Metadata = {
  title: "Process - Ron Marche",
  description:
    "How a request becomes a trusted change: the process steps, the documents they produce, the tools behind them, and what it takes to run a site in production, each with its scenarios and connections.",
};

export default function Page() {
  return <ProcessExplorer />;
}
