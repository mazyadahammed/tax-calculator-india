import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/siteConfig";
import SchemaScript from "@/components/SchemaScript";
import { webApplicationSchema } from "@/lib/schema";

const TITLE = "Country Finance Guides & Local Tax Calculators | Clarvio";
const DESCRIPTION =
  "Browse localized financial guides and tax tools tailored to country-specific legal structures, including India income tax and UAE salary gratuity details.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/country-guides` },
};

export default function CountryGuidesPage() {
  const schema = webApplicationSchema({
    name: TITLE,
    description: DESCRIPTION,
    path: "/country-guides",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <SchemaScript schemas={schema} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Country Finance <span className="text-emerald-600 dark:text-emerald-400">Guides</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select your region to access localized calculators, tax comparison templates, and gratuity projection tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-sm">
        {/* India Directory */}
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇮🇳</span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">India</h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Complete tax estimators, regime comparison calculators, presumptive tax tools, and rent allowances under modern Union Budget codes.
            </p>
            <ul className="space-y-2 pt-2 text-xs">
              <li>
                <Link href="/in" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  &bull; Income Tax Calculator (FY 2025-26)
                </Link>
              </li>
              <li>
                <Link href="/hra" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  &bull; HRA Rent Exemption Calculator
                </Link>
              </li>
              <li>
                <Link href="/freelancer-tax-44ada" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  &bull; Freelancer Presumptive Tax (44ADA)
                </Link>
              </li>
              <li>
                <Link href="/multiple-form16" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  &bull; Multiple Form-16 Consolidator
                </Link>
              </li>
            </ul>
          </div>
          <Link
            href="/in"
            className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-center font-semibold rounded-lg text-xs"
          >
            Open India Dashboard
          </Link>
        </div>

        {/* UAE Directory */}
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇦🇪</span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">United Arab Emirates</h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Calculate in-hand payouts (0% personal tax) and end-of-service gratuity entitlements based on latest UAE Labour Laws.
            </p>
            <ul className="space-y-2 pt-2 text-xs">
              <li>
                <Link href="/ae" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  &bull; Gratuity & Salary Calculator
                </Link>
              </li>
            </ul>
          </div>
          <Link
            href="/ae"
            className="mt-4 px-4 py-2 bg-gray-900 hover:bg-black text-white dark:bg-gray-850 dark:hover:bg-gray-800 text-center font-semibold rounded-lg text-xs"
          >
            Open UAE Dashboard
          </Link>
        </div>

        {/* US Directory (Placeholder) */}
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between opacity-75">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇺🇸</span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">United States</h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Federal tax brackets, state income tax structures, 401(k) retirement contributions, and W-2 paychecks.
            </p>
            <div className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 p-2 rounded">
              <strong>Coming Soon:</strong> W-2 Take-Home and Roth IRA/401(k) savings estimators.
            </div>
          </div>
          <button
            disabled
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-400 border border-gray-200 text-center font-semibold rounded-lg text-xs cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-500"
          >
            Under Construction
          </button>
        </div>
      </div>
    </div>
  );
}
