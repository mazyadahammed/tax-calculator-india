import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/siteConfig";
import SchemaScript from "@/components/SchemaScript";
import { webApplicationSchema } from "@/lib/schema";

const TITLE = "How to Save Money Faster: Sinking Funds & HYSA | ThinkFinance";
const DESCRIPTION =
  "Discover practical tactics on how to save money faster. Learn the 50/30/20 budget rule, high-yield savings accounts (HYSAs), and automating your emergency fund.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/savings` },
};

export default function SavingsGoalsPage() {
  const schema = webApplicationSchema({
    name: TITLE,
    description: DESCRIPTION,
    path: "/savings",
  });

  const strategies = [
    {
      title: "1. Automate Your Savings First",
      desc: "Do not save what is left after spending; spend what is left after saving. Set up an automatic transfer on payday to send 10-20% of your paycheck directly into your savings account before you see it.",
    },
    {
      title: "2. Open a High-Yield Savings Account (HYSA)",
      desc: "Traditional brick-and-mortar banks pay close to 0.01% interest on standard savings. HYSAs (usually offered by online-only banks) pay 4-5% annual interest. That means if you hold a $10,000 emergency fund, you earn $400-500/year in interest completely free.",
    },
    {
      title: "3. Implement the 50/30/20 Rule",
      desc: "Divide your monthly take-home salary into three simple budget categories: 50% for Needs (housing, grocery, utilities), 30% for Wants (hobbies, dining out, streaming), and 20% for Savings and investing.",
    },
    {
      title: "4. Use Sinking Funds",
      desc: "A sinking fund is a savings category set up for a specific, expected future cost—like a car insurance premium, holiday gifts, or a vacation. Instead of taking a hit all at once, save a small, predictable amount monthly in dedicated sub-accounts.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <SchemaScript schemas={schema} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          How to Save Money <span className="text-emerald-600 dark:text-emerald-400">Faster</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Save smarter, not just harder. Learn key tactics to grow your net worth without sacrificing everything you enjoy.
        </p>
      </div>

      {/* Strategies List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-sm">
        {strategies.map(({ title, desc }) => (
          <div
            key={title}
            className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-5 rounded-2xl space-y-2 shadow-sm"
          >
            <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/50 p-6 rounded-2xl max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Calculate your exact savings potential</h2>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Compare tax structures and calculate how much money you can unlock for your savings goals this year.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/in"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            India Tax Estimator
          </Link>
          <Link
            href="/ae"
            className="px-4 py-2 bg-gray-950 hover:bg-black text-white dark:bg-gray-850 dark:hover:bg-gray-800 text-xs font-semibold rounded-lg shadow-sm"
          >
            UAE Salary Estimator
          </Link>
        </div>
      </div>
    </div>
  );
}
