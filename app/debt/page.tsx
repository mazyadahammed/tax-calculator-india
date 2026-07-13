import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/siteConfig";
import SchemaScript from "@/components/SchemaScript";
import { webApplicationSchema } from "@/lib/schema";

const TITLE = "How to Reduce Debt Fast: Snowball vs Avalanche | ThinkFinance";
const DESCRIPTION =
  "Discover the fastest ways to pay off debt. Compare the psychological advantages of the Debt Snowball with the mathematical savings of the Debt Avalanche.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/debt` },
};

export default function DebtPayoffPage() {
  const schema = webApplicationSchema({
    name: TITLE,
    description: DESCRIPTION,
    path: "/debt",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <SchemaScript schemas={schema} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          How to Reduce Debt Fast: <span className="text-emerald-600 dark:text-emerald-400">Snowball vs. Avalanche</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Being in debt is stressful, but having a clear strategy makes payoff achievable. Choose the method that fits your style.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-sm">
        {/* Debt Snowball */}
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-2xl space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-250 dark:border-emerald-800">
              Psychology-First
            </span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">The Debt Snowball</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            List all your debts from **smallest balance to largest balance**, regardless of the interest rate.
          </p>
          <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg border border-gray-100 dark:border-gray-850">
            <h4 className="font-bold text-gray-800 dark:text-gray-200 text-xs mb-1">How it works:</h4>
            <ol className="list-decimal pl-4 space-y-1 text-xs text-gray-500">
              <li>Pay minimums on all debts except the smallest.</li>
              <li>Throw all extra cash at the smallest balance until it is gone.</li>
              <li>Roll that entire payment into the next smallest balance.</li>
            </ol>
          </div>
          <p className="text-xs text-gray-500">
            <strong>Pros:</strong> Gives quick mental victories that help you build habits and stay motivated.
          </p>
        </div>

        {/* Debt Avalanche */}
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-2xl space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-250 dark:border-blue-800">
              Math-First
            </span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">The Debt Avalanche</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            List all your debts from **highest interest rate to lowest interest rate**, regardless of the balance.
          </p>
          <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg border border-gray-100 dark:border-gray-850">
            <h4 className="font-bold text-gray-800 dark:text-gray-200 text-xs mb-1">How it works:</h4>
            <ol className="list-decimal pl-4 space-y-1 text-xs text-gray-500">
              <li>Pay minimums on all debts except the highest interest rate debt.</li>
              <li>Throw all extra cash at that highest interest debt.</li>
              <li>Roll that payment into the next highest interest debt once paid off.</li>
            </ol>
          </div>
          <p className="text-xs text-gray-500">
            <strong>Pros:</strong> Saves you the absolute maximum amount of money in interest charges, paying off debt faster mathematically.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/50 p-6 rounded-2xl max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Want to organize your cashflow?</h2>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Compare different tax slabs or configure HRA rental claims to free up extra cash to attack your debt.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/compare"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            Compare Tax Regimes
          </Link>
          <Link
            href="/hra"
            className="px-4 py-2 bg-gray-950 hover:bg-black text-white dark:bg-gray-850 dark:hover:bg-gray-800 text-xs font-semibold rounded-lg shadow-sm"
          >
            Calculate HRA Tax Discount
          </Link>
        </div>
      </div>
    </div>
  );
}
