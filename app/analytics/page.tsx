import type { Metadata } from "next";

import AnalyticsShowcase from "@/components/analytics/AnalyticsShowcase";

export const metadata: Metadata = {
  title: "Analytics - Ron Marche",
  description: "Business analysis from everyday records: explore a synthetic recruitment dashboard, its source data, KPI definitions, and the signals behind growth, friction, and missing evidence.",
};

export default function Page() {
  return <AnalyticsShowcase />;
}
