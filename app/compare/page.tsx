import Link from "next/link";
import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import { webApplicationSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import SchemaScript from "@/components/SchemaScript";

import FaqSection from "@/components/FaqSection";

const TITLE = "Old vs New Tax Regime Comparison FY 2025-26";
const DESCRIPTION =
  "Detailed comparison between Old and New income tax regimes for FY 2025-26 (AY 2026-27). Compare tax slabs, standard deductions, and savings under Union Budget 2025.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/compare` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/compare`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQS = [
  {
    question: "Which tax regime is better for general taxpayers in FY 2025-26?",
    answer:
      "The New Tax Regime is generally better for individuals who do not have substantial tax-saving investments (under ₹3.5 Lakh to ₹4 Lakh). With lower tax rates and the ₹12 Lakh zero-tax rebate limit, it offers greater simplicity and higher take-home pay. However, if you have high deductions like HRA, Home Loan interest, and Section 80C, the Old Tax Regime may save you more.",
  },
  {
    question: "What deductions are not allowed in the New Tax Regime?",
    answer:
      "In the New Tax Regime, you cannot claim deductions under Section 80C (PPF, EPF, ELSS, Life Insurance), Section 80D (Health Insurance), Section 24b (Home Loan Interest for self-occupied property), HRA (House Rent Allowance), and LTA (Leave Travel Allowance).",
  },
  {
    question: "Can business owners switch between tax regimes every year?",
    answer:
      "No. While salaried individuals can switch between the Old and New tax regimes every year when filing their returns, individuals with business or professional income are allowed to switch back to the Old regime only once in their lifetime.",
  },
];

export default function ComparePage() {
  const schemas = [
    webApplicationSchema({ name: TITLE, description: DESCRIPTION, path: "/compare" }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Old vs New Regime", path: "/compare" },
    ]),
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <SchemaScript schemas={schemas} />


      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <li><Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900 dark:text-white font-medium">Old vs New Regime</li>
        </ol>
      </nav>

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:leading-tight">
          Old vs New Tax Regime{" "}
          <span className="text-emerald-600 dark:text-emerald-400">FY 2025-26</span>
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Understand the slab differences, standard deductions, and find which taxation regime suits your income bracket.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Slabs table */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Tax Slab Comparison (FY 2025-26)
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm">
              <thead className="bg-gray-50 dark:bg-gray-950">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Tax Rate</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">New Regime Slabs</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Old Regime (Under 60)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {[
                  ["Nil (0%)",  "Up to ₹4,00,000",              "Up to ₹2,50,000"],
                  ["5%",        "₹4,00,001 – ₹8,00,000",         "₹2,50,001 – ₹5,00,000"],
                  ["10%",       "₹8,00,001 – ₹12,00,000",        "N/A (jumps to 20%)"],
                  ["15%",       "₹12,00,001 – ₹16,00,000",       "N/A"],
                  ["20%",       "₹16,00,001 – ₹20,00,000",       "₹5,00,001 – ₹10,00,000"],
                  ["25%",       "₹20,00,001 – ₹24,00,000",       "N/A"],
                  ["30%",       "Above ₹24,00,000",              "Above ₹10,00,000"],
                ].map(([rate, newR, oldR]) => (
                  <tr key={rate}>
                    <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">{rate}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{newR}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{oldR}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">What changed in Budget 2025?</h3>
            <p>
              The Section 87A rebate limit under the New Regime has been raised to ₹12 Lakh, making taxable income up to ₹12 Lakh completely tax-free. Salaried individuals also receive a ₹75,000 standard deduction, meaning employees earning up to ₹12.75 Lakh gross pay zero tax.
            </p>

            <h3 className="text-base font-bold text-gray-900 dark:text-white mt-4">Standard Deduction Comparison</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-lg p-3">
                <div className="font-bold text-emerald-800 dark:text-emerald-400 mb-1">New Tax Regime</div>
                <div className="text-emerald-700 dark:text-emerald-300">Standard Deduction: ₹75,000</div>
                <div className="text-emerald-700 dark:text-emerald-300">Section 87A Rebate up to ₹12 Lakh</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                <div className="font-bold text-gray-800 dark:text-gray-200 mb-1">Old Tax Regime</div>
                <div className="text-gray-600 dark:text-gray-400">Standard Deduction: ₹50,000</div>
                <div className="text-gray-600 dark:text-gray-400">Section 87A Rebate up to ₹5 Lakh</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-xl p-5">
            <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-400 mb-3">
              Decision Matrix
            </h3>
            <ul className="text-xs text-emerald-800 dark:text-emerald-300 space-y-2 list-disc pl-4">
              <li>Choose <strong>New Regime</strong> if your total deductions are less than ₹3.75 Lakh.</li>
              <li>Choose <strong>Old Regime</strong> if deductions exceed ₹4 Lakh/year.</li>
              <li>Both regimes use the same surcharge and 4% cess.</li>
            </ul>
            <Link
              href="/"
              className="mt-4 inline-flex items-center text-xs font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
            >
              Calculate your exact saving →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3">Related Calculators</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/hra" className="text-emerald-600 hover:underline dark:text-emerald-400">
                  HRA Exemption Calculator (Section 10(13A))
                </Link>
              </li>
              <li>
                <Link href="/salary" className="text-emerald-600 hover:underline dark:text-emerald-400">
                  Monthly Take-Home Salary Calculator
                </Link>
              </li>
              <li>
                <Link href="/" className="text-emerald-600 hover:underline dark:text-emerald-400">
                  Full Income Tax Calculator FY 2025-26
                </Link>
              </li>
            </ul>
          </div>


        </div>
      </div>

      <FaqSection faqs={FAQS} title="Old vs New Tax Regime FAQs" />

    </div>
  );
}
