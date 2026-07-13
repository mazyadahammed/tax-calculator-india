import type { Metadata } from "next";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Multiple Form-16 Tax Calculator | Job Switchers FY 2025-26",
  description:
    "Changed jobs mid-year? Consolidate income from multiple employers using Form-16 details to accurately calculate your total tax liability and find if you owe extra TDS.",
  alternates: {
    canonical: `${SITE_URL}/multiple-form16`,
  },
  openGraph: {
    title: "Multiple Form-16 Tax Calculator | Job Switchers FY 2025-26",
    description:
      "Changed jobs mid-year? Consolidate income from multiple employers to check if you owe extra tax due to double exemption slips.",
    url: `${SITE_URL}/multiple-form16`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Multiple Form-16 Tax Calculator | Job Switchers FY 2025-26",
    description:
      "Consolidate Form-16s from multiple employers. Check your total TDS vs. actual tax liability before filing your ITR.",
  },
};

export default function MultipleForm16Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
