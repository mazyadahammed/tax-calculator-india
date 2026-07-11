// Server Component — exports Metadata and JSON-LD schema.
// The interactive calculator is in HomeCalculator.tsx (Client Component).

import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import { webApplicationSchema } from "@/lib/schema";
import SchemaScript from "@/components/SchemaScript";
import HomeCalculator from "./HomeCalculator";

const TITLE = "Income Tax Calculator FY 2025-26 — Old vs New Regime";
const DESCRIPTION =
  "Calculate and compare your income tax under Old and New regimes for FY 2025-26 (AY 2026-27). See take-home salary, deduction impact, and which regime saves you more money.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,

  alternates: {
    canonical: `${SITE_URL}/`,
  },

  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function HomePage() {
  const schema = webApplicationSchema({
    name: "India Income Tax Calculator FY 2025-26",
    description: DESCRIPTION,
    path: "/",
  });

  return (
    <>
      <SchemaScript schemas={schema} />
      <HomeCalculator />
    </>
  );
}
