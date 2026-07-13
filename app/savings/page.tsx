import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import SchemaScript from "@/components/SchemaScript";
import { faqPageSchema, breadcrumbSchema } from "@/lib/schema";

const TITLE = "How to Save Money Faster: Sinking Funds & HYSA | Clarvio";
const DESCRIPTION =
  "Discover practical tactics on how to save money faster. Learn the 50/30/20 budget rule, high-yield savings accounts (HYSAs), and automating your emergency fund.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/savings` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/savings`,
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
    question: "What is the 50/30/20 rule?",
    answer:
      "The 50/30/20 rule is a budgeting framework: allocate 50% of your monthly take-home pay to needs (rent, food, utilities), 30% to wants (entertainment, dining out, hobbies), and 20% to savings and debt repayment. It is a simple starting point that works for most income levels.",
  },
  {
    question: "What is a High-Yield Savings Account (HYSA)?",
    answer:
      "A HYSA is a savings account, typically offered by online-only banks, that pays significantly higher interest — often 4 to 5% annually — compared to traditional brick-and-mortar banks that pay as little as 0.01%. The money is still government-insured and fully accessible at any time.",
  },
  {
    question: "How do I save money when I'm living paycheck to paycheck?",
    answer:
      "Start by automating a small transfer — even $25 to $50 — to a savings account on payday before spending. Review subscriptions and recurring expenses you can pause. Consider a temporary side income for 90 days to build a starter emergency fund. Small consistent habits matter more than large one-time actions.",
  },
];

export default function SavingsGoalsPage() {
  const schemas = [
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Savings Goals", path: "/savings" },
    ]),
  ];

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
      <SchemaScript schemas={schemas} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900 dark:text-white font-medium">Savings Goals</li>
        </ol>
      </nav>

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

      {/* Related Guides — Internal linking */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Build the Full Picture</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/start-here"
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:border-emerald-400 transition-colors"
          >
            <div className="text-2xl mb-2">✅</div>
            <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600">Finance Checklist</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Where savings fits in</p>
          </Link>
          <Link
            href="/debt"
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:border-red-400 transition-colors"
          >
            <div className="text-2xl mb-2">🏔️</div>
            <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-red-600">Pay Off Debt</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Free up money to save</p>
          </Link>
          <Link
            href="/investing"
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:border-blue-400 transition-colors"
          >
            <div className="text-2xl mb-2">📈</div>
            <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600">Then Invest</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Make your savings grow</p>
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
