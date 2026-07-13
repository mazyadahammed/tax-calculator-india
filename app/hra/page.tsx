import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import { webApplicationSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import SchemaScript from "@/components/SchemaScript";
import AdSlot from "@/components/AdSlot";
import FaqSection from "@/components/FaqSection";
import HraCalculator from "./HraCalculator";

const TITLE = "HRA Tax Exemption Calculator FY 2025-26";
const DESCRIPTION =
  "Calculate your eligible House Rent Allowance (HRA) tax exemption under Section 10(13A) for FY 2025-26. Metro vs non-metro rules, worked examples, and instant results.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/hra` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/hra`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQS = [
  {
    question: "Can I claim HRA exemption under the New Tax Regime?",
    answer:
      "No, HRA tax exemption is not available under the New Tax Regime. To claim HRA exemption under Section 10(13A), you must opt for the Old Tax Regime when filing your ITR.",
  },
  {
    question: "Which cities qualify as Metro for HRA exemption?",
    answer:
      "Only Mumbai, Delhi, Kolkata, and Chennai qualify as metro cities for the 50% of basic salary calculation. All other cities — including Bengaluru, Hyderabad, and Pune — are treated as non-metro (40% limit).",
  },
  {
    question: "Is it mandatory to submit my landlord's PAN to claim HRA?",
    answer:
      "Yes, if your annual rent payment exceeds ₹1,00,000, you must furnish your landlord's PAN to your employer. If the landlord does not have a PAN, a declaration in Form 60 must be submitted.",
  },
  {
    question: "Can I claim HRA if I live in my own house?",
    answer:
      "No. HRA exemption is only available if you are living in rented accommodation and paying actual rent. If you reside in your own house, HRA received from your employer is fully taxable.",
  },
];

export default function HraPage() {
  const schemas = [
    webApplicationSchema({ name: TITLE, description: DESCRIPTION, path: "/hra" }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "HRA Calculator", path: "/hra" },
    ]),
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <SchemaScript schemas={schemas} />
      <AdSlot id="hra-top-leaderboard" format="horizontal" adSlotId="3856192945" className="mb-6" />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <li><Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900 dark:text-white font-medium">HRA Calculator</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:leading-tight">
          HRA Exemption Calculator{" "}
          <span className="text-emerald-600 dark:text-emerald-400">FY 2025-26</span>
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Determine the exact House Rent Allowance amount exempt from income tax under Section 10(13A).
        </p>
      </div>

      <HraCalculator />

      {/* Educational content */}
      <div className="mt-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm max-w-4xl mx-auto space-y-4">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">
          How is HRA Tax Exemption Calculated? (Section 10(13A))
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          The eligible HRA exemption is the <strong>minimum</strong> of these three amounts:
        </p>
        <ol className="text-sm text-gray-600 dark:text-gray-400 list-decimal pl-5 space-y-1">
          <li>Actual HRA received from your employer.</li>
          <li>Rent paid minus 10% of your Basic Salary + DA.</li>
          <li>50% of Basic + DA (metro cities) or 40% (non-metro cities).</li>
        </ol>
        <p className="text-xs text-gray-400">
          HRA is only claimable under the{" "}
          <Link href="/compare" className="text-emerald-600 hover:underline dark:text-emerald-400 font-medium">
            Old Tax Regime
          </Link>
          . Use our{" "}
          <Link href="/" className="text-emerald-600 hover:underline dark:text-emerald-400 font-medium">
            Income Tax Calculator
          </Link>{" "}
          to enter your HRA exemption and compare total tax liability.
        </p>
      </div>

      <FaqSection faqs={FAQS} title="HRA Exemption FAQs" />
      <AdSlot id="hra-bottom-leaderboard" format="horizontal" adSlotId="3856192945" className="mt-8" />
    </div>
  );
}
