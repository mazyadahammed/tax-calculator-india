import type { Metadata } from "next";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Freelancer Tax Calculator Section 44ADA | Presumptive Tax FY 2025-26",
  description:
    "Freelancer or consultant in India? Use Section 44ADA presumptive taxation: 50% of gross receipts is your taxable profit. No books of accounts needed. Compare Old vs New Regime.",
  alternates: {
    canonical: `${SITE_URL}/freelancer-tax-44ada`,
  },
  openGraph: {
    title:
      "Freelancer Presumptive Tax Calculator (Sec 44ADA) | FY 2025-26",
    description:
      "Calculate your tax as a freelancer or consultant under Section 44ADA. Only 50% of your gross receipts is taxable. Check eligibility and compare regimes instantly.",
    url: `${SITE_URL}/freelancer-tax-44ada`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Freelancer Presumptive Tax Calculator (Sec 44ADA) | FY 2025-26",
    description:
      "Presumptive tax for Indian freelancers: 50% profit rule, ₹50L / ₹75L threshold. Old vs New Regime comparison.",
  },
};

export default function FreelancerTax44adaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
