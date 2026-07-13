import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import UaeCalculator from "./UaeCalculator";

const TITLE = "UAE Salary & Gratuity Calculator 2026 | Dubai Labour Law";
const DESCRIPTION =
  "Calculate your monthly take-home salary and end-of-service gratuity in Dubai & UAE under the latest UAE Labour Law (Decree Law No. 33 of 2021). Easy, precise, and instant.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/ae`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/ae`,
    siteName: SITE_NAME,
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function UaeCalculatorPage() {
  return <UaeCalculator />;
}
