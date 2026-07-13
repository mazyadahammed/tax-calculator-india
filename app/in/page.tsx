import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import { webApplicationSchema } from "@/lib/schema";
import SchemaScript from "@/components/SchemaScript";
import HomeCalculator from "../HomeCalculator";

const TITLE = "Income Tax Calculator FY 2025-26 — Old vs New Regime | India";
const DESCRIPTION =
  "Compare Old vs New tax regimes under Budget 2025 rules for FY 2025-26 (AY 2026-27). Calculate take-home salary, deduction impact, and find which regime saves you more.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/in`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/in`,
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

export default function IndiaCalculatorPage() {
  const schema = webApplicationSchema({
    name: "India Income Tax Calculator FY 2025-26",
    description: DESCRIPTION,
    path: "/in",
  });

  return (
    <>
      <SchemaScript schemas={schema} />
      <HomeCalculator />
    </>
  );
}
