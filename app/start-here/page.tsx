import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/siteConfig";
import SchemaScript from "@/components/SchemaScript";
import { webApplicationSchema } from "@/lib/schema";

const TITLE = "Personal Finance 101: Start Here | ThinkFinance";
const DESCRIPTION =
  "A simple, step-by-step checklist to organize your money, pay off debt, build an emergency fund, and start investing for your future.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/start-here` },
};

export default function StartHerePage() {
  const schema = webApplicationSchema({
    name: TITLE,
    description: DESCRIPTION,
    path: "/start-here",
  });

  const steps = [
    {
      step: "1",
      title: "Track Your Cashflow (Budgeting)",
      desc: "Before you can grow your wealth, you must know where it goes. Start tracking your income and expenses. A simple rule is the 50/30/20 budget: 50% for Needs (rent, food), 30% for Wants (dining out, entertainment), and 20% for Savings and debt repayment.",
    },
    {
      step: "2",
      title: "Build a Starter Emergency Fund",
      desc: "Save up one month of living expenses (or a flat $1,000 / AED 3,000 / ₹50,000) as fast as possible. This fund acts as a firewall between you and high-interest debt when unexpected expenses (car repairs, medical costs) arise.",
    },
    {
      step: "3",
      title: "Attack High-Interest Debt",
      desc: "Pay off any debt with an interest rate higher than 7-8% (like credit card debt or personal loans). These debts actively drag down your wealth. Use either the Debt Snowball (smallest balance first) or Debt Avalanche (highest interest rate first) method.",
    },
    {
      step: "4",
      title: "Grow Your Emergency Fund",
      desc: "Once high-interest debt is gone, expand your starter emergency fund to cover 3 to 6 months of basic living expenses. Keep this cash in a safe, liquid account like a High-Yield Savings Account (HYSA).",
    },
    {
      step: "5",
      title: "Invest for the Long Term",
      desc: "Now that you have no toxic debt and a fully-funded emergency fund, you are ready to invest. Start by contributing to tax-advantaged accounts in your region, and focus on diversified, low-cost index funds.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <SchemaScript schemas={schema} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Start Here: <span className="text-emerald-600 dark:text-emerald-400">The 5 Steps to Financial Freedom</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Personal finance doesn&apos;t have to be complicated. Follow this step-by-step checklist to master your money.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-8 max-w-2xl mx-auto">
        {steps.map(({ step, title, desc }) => (
          <div
            key={step}
            className="flex gap-4 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-5 rounded-xl shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
              {step}
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/50 p-6 rounded-2xl max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Need local tax & gratuity calculations?</h2>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Browse our localized tools to calculate precise take-home salary, income tax brackets, or gratuity payouts.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/in"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            India Tax Tools
          </Link>
          <Link
            href="/ae"
            className="px-4 py-2 bg-gray-900 hover:bg-black text-white dark:bg-gray-850 dark:hover:bg-gray-800 text-xs font-semibold rounded-lg shadow-sm"
          >
            UAE Gratuity Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
