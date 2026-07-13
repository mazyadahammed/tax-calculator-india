import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import SchemaScript from "@/components/SchemaScript";
import { faqPageSchema, breadcrumbSchema } from "@/lib/schema";

const TITLE = "How to Reduce Debt Fast: Snowball vs Avalanche | ThinkFinance";
const DESCRIPTION =
  "Discover the fastest ways to pay off debt. Compare the psychological advantages of the Debt Snowball with the mathematical savings of the Debt Avalanche.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/debt` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/debt`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const FAQS = [
  {
    question: "Which is better: Debt Snowball or Debt Avalanche?",
    answer:
      "The Debt Avalanche saves more money in total interest paid. The Debt Snowball is better for staying motivated because it delivers quick wins. If you are disciplined, use the Avalanche method. If you need momentum to keep going, use the Snowball method. Both work — the best method is the one you will actually stick with.",
  },
  {
    question: "How long does it take to pay off debt?",
    answer:
      "It depends on your total balance and how much extra you pay each month above the minimum. Even adding just $50 to $100 extra per month to your minimum payment can cut years off a typical credit card or personal loan repayment timeline.",
  },
  {
    question: "Should I pay off debt before saving money?",
    answer:
      "Yes — prioritize paying off high-interest debt (above 7-8% rate) before aggressively saving or investing. Keep only a small starter emergency fund ($1,000 or equivalent) while attacking debt, so you do not have to take on more debt if an unexpected expense arises.",
  },
];

export default function DebtPayoffPage() {
  const schemas = [
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Debt Payoff", path: "/debt" },
    ]),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <SchemaScript schemas={schemas} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900 dark:text-white font-medium">Debt Payoff</li>
        </ol>
      </nav>

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
            List all your debts from smallest balance to largest balance, regardless of the interest rate.
          </p>
          <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg border border-gray-100 dark:border-gray-850">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-xs mb-1">How it works:</h3>
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
            List all your debts from highest interest rate to lowest interest rate, regardless of the balance.
          </p>
          <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg border border-gray-100 dark:border-gray-850">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-xs mb-1">How it works:</h3>
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

      {/* Related Guides — Internal linking */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">After Paying Off Debt, Do This Next</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/start-here"
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:border-emerald-400 transition-colors"
          >
            <div className="text-2xl mb-2">✅</div>
            <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600">Finance Checklist</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">5-step beginner guide</p>
          </Link>
          <Link
            href="/savings"
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:border-amber-400 transition-colors"
          >
            <div className="text-2xl mb-2">🏦</div>
            <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-amber-600">Build Your Savings</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Grow your emergency fund</p>
          </Link>
          <Link
            href="/investing"
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:border-blue-400 transition-colors"
          >
            <div className="text-2xl mb-2">📈</div>
            <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600">Start Investing</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Index funds & ETFs</p>
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQS.map(({ question, answer }) => (
            <div key={question} className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-5 rounded-xl">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{question}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{answer}</p>
            </div>
          ))}
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
