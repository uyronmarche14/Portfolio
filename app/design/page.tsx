import type { Metadata } from "next";

import DesignTokens from "@/components/features/design/DesignTokens";

export const metadata: Metadata = {
  title: "Design - Ron Marche",
  description: "The design process and the live design tokens (color, type, shape) behind this portfolio.",
};

export default function Page() {
  return <DesignTokens />;
}
