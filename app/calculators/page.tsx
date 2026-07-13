import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/siteConfig";
import SchemaScript from "@/components/SchemaScript";
import { webApplicationSchema } from "@/lib/schema";

const TITLE = "Financial Calculators Directory | Clarvio";
const DESCRIPTION =
  "Access our suite of free, client-side personal finance calculators including HRA exemptions, take-home salary, India tax comparisons, and UAE gratuity payouts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/calculators` },
};

const GLOBAL_CALCS = [
  {
    title: "🏠 HRA Exemption Calculator",
    desc: "Calculate your annual tax-exempt House Rent Allowance (HRA) amount based on salary structure and actual rent paid.",
    href: "/hra",
  },
  {
    title: "💼 Net Take-Home Salary Calculator",
    desc: "Calculate your monthly in-hand take-home salary after standard deductions, EPF, and tax TDS deductions.",
    href: "/salary",
  },
];

const LOCAL_CALCS = [
  {
    title: "🇮🇳 India Income Tax Calculator (FY 2025-26)",
    desc: "Compare old vs new tax regimes for FY 2025-26 under Union Budget 2025 rules to maximize your tax savings.",
    href: "/in",
  },
  {
    title: "🇦🇪 UAE Salary & Gratuity Calculator",
    desc: "Calculate your Dubai & UAE monthly in-hand take-home salary and end-of-service gratuity payout under Decree Law No. 33 of 2021.",
    href: "/ae",
  },
  {
    title: "🇮🇳 Multiple Form-16 Consolidator",
    desc: "Consolidate tax structures from multiple employers in the same financial year to prevent unexpected TDS shortfalls.",
    href: "/multiple-form16",
  },
  {
    title: "🇮🇳 Freelancer Presumptive Tax Calculator (Sec 44ADA)",
    desc: "Compute taxable income under Section 44ADA for Indian professionals and freelancers declaring 50% presumptive profits.",
    href: "/freelancer-tax-44ada",
  },
];

export default function CalculatorsPage() {
  const schema = webApplicationSchema({
    name: TITLE,
    description: DESCRIPTION,
    path: "/calculators",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <SchemaScript schemas={schema} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Personal Finance <span className="text-emerald-600 dark:text-emerald-400">Calculators</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          All calculations are processed locally inside your web browser. No financial data is ever transmitted to a server.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-sm">
        {/* Universal Calculators */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-150 dark:border-gray-800 pb-2">
            Universal Tools
          </h2>
          <div className="space-y-3">
            {GLOBAL_CALCS.map(({ title, desc, href }) => (
              <Link
                key={href}
                href={href}
                className="block bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-4 rounded-xl shadow-sm hover:border-emerald-500 transition-colors"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Localized/Country Tools */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-150 dark:border-gray-800 pb-2">
            Country-Specific Tools
          </h2>
          <div className="space-y-3">
            {LOCAL_CALCS.map(({ title, desc, href }) => (
              <Link
                key={href}
                href={href}
                className="block bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-4 rounded-xl shadow-sm hover:border-emerald-500 transition-colors"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
