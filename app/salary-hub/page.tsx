import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import { getSalaryConfigs } from "@/lib/salaryData";

export const metadata: Metadata = {
  title: `Salary Calculator & In-Hand LPA Guide | ${SITE_NAME}`,
  description: "Browse detailed salary breakdowns and tax computations for various Lakhs Per Annum (LPA) packages in India for FY 2025-26.",
  alternates: { canonical: `${SITE_URL}/salary-hub` },
};

export default function SalaryHubPage() {
  const configs = getSalaryConfigs();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Salary & Tax LPA Directory <span className="text-emerald-600 dark:text-emerald-400">FY 2025-26</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Quick, pre-calculated estimates for various annual CTC values under Indian tax rules.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-100 dark:border-gray-850">
                In-Hand Monthly Payout Guides
              </h2>
              <ul className="space-y-3">
                {configs.map((config) => (
                  <li key={config.slug}>
                    <Link
                      href={`/in-hand-salary/${config.slug}`}
                      className="text-sm font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 hover:underline"
                    >
                      {config.lpa} LPA Gross Monthly In-Hand Salary Guide
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-100 dark:border-gray-850">
                Old vs New Tax Regime Guides
              </h2>
              <ul className="space-y-3">
                {configs.map((config) => (
                  <li key={config.slug}>
                    <Link
                      href={`/tax-calculator/${config.slug}-old-vs-new`}
                      className="text-sm font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 hover:underline"
                    >
                      {config.lpa} LPA Tax Slabs & Regime Comparison
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
