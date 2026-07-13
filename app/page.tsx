import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import { webApplicationSchema, faqPageSchema } from "@/lib/schema";
import SchemaScript from "@/components/SchemaScript";
import VerificationBadge from "@/components/VerificationBadge";
import TrustBadge from "@/components/TrustBadge";
import FaqSection from "@/components/FaqSection";

const TITLE = "Clarvio — Global Personal Finance Hub & Calculators";
const DESCRIPTION =
  "Take control of your money. Learn budgeting, low-cost investing, debt payoff methods, and savings strategies with our free global guides and interactive calculators.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/`,
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

const PILLARS = [
  {
    title: "Start Here",
    desc: "The 5-step checklist to organize your personal finances from scratch.",
    href: "/start-here",
    iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.168.477-4.5 1.253",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Investing Basics",
    desc: "How to start investing with little money using low-cost index funds and ETFs.",
    href: "/investing",
    iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Debt Payoff",
    desc: "Compare Snowball vs. Avalanche strategies to reduce debt and save on interest.",
    href: "/debt",
    iconPath: "M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3",
    color: "from-red-500 to-rose-500",
  },
  {
    title: "Savings Goals",
    desc: "Automate your emergency fund and reach your financial goals faster.",
    href: "/savings",
    iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "from-amber-500 to-orange-500",
  },
];

const GENERAL_FAQS = [
  {
    question: "What is the best way to start organizing my personal finances?",
    answer: "The best way is to follow a simple checklist: 1. Create a monthly budget to track where your money goes. 2. Build a starter emergency fund (typically $1,000 or 1 month of expenses). 3. Pay off high-interest debt (such as credit cards). 4. Save 3 to 6 months of living expenses. 5. Start investing for retirement.",
  },
  {
    question: "How do I choose between the Debt Snowball and Debt Avalanche methods?",
    answer: "The Debt Snowball focuses on human psychology—you pay off the smallest balances first to gain quick wins and momentum. The Debt Avalanche focuses on math—you pay off the highest interest rate debts first, saving you the most money in interest charges over time.",
  },
  {
    question: "What are country-specific guides, and why do they exist?",
    answer: "Tax laws, pension schemes, and retirement rules are highly specific to where you live. Our country-specific directories (such as India Tax and UAE Gratuity calculators) provide localized calculations tailored to regional legal codes, while our core guides remain universal.",
  },
];

export default function HomePage() {
  const schemas = [
    webApplicationSchema({
      name: TITLE,
      description: DESCRIPTION,
      path: "/",
    }),
    faqPageSchema(GENERAL_FAQS),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      <SchemaScript schemas={schemas} />

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <VerificationBadge />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Financial Freedom, <span className="text-emerald-600 dark:text-emerald-400">Made Simple</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Free, open-source personal finance resources, task-based strategies, and localized calculators to help you grow your wealth globally.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/start-here"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
            Start Here
          </Link>
          <Link
            href="/calculators"
            className="px-5 py-2.5 bg-white hover:bg-gray-550 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
          >
            All Calculators
          </Link>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-xl mx-auto border-t border-b border-gray-150 dark:border-gray-800/80 py-4 flex justify-center">
        <TrustBadge />
      </div>

      {/* 4 Pillars Section */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Core Financial Pillars</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Build your wealth systematically by mastering the basics of cashflow, savings, and investments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map(({ title, desc, href, iconPath, color }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-base">
                  {title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {desc}
                </p>
              </div>
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Guide 
                <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Unified Tools & Directory section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Country Calculators */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-850 p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Region-Specific Tools</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Find localized tax systems, take-home salary configurations, and pension scheme tools for your country.
            </p>
            <div className="space-y-2 pt-2">
              <Link
                href="/in"
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-150 dark:border-gray-800 hover:border-emerald-500 transition-colors"
              >
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <span>🇮🇳</span> India Tax Calculator (FY 2025-26)
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Compare Regimes &rarr;</span>
              </Link>
              <Link
                href="/ae"
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-150 dark:border-gray-800 hover:border-emerald-500 transition-colors"
              >
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <span>🇦🇪</span> UAE Salary & Gratuity Calculator
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Calculate Payout &rarr;</span>
              </Link>
            </div>
          </div>
          <Link
            href="/country-guides"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2 block"
          >
            Browse all country tools &rarr;
          </Link>
        </div>

        {/* Global/Task Calculators */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-850 p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Generic Finance Calculators</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Plan universal personal finance parameters like house rent exemptions, compound interest, and monthly budgets.
            </p>
            <div className="space-y-2 pt-2">
              <Link
                href="/hra"
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-150 dark:border-gray-800 hover:border-emerald-500 transition-colors"
              >
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  🏠 HRA Exemption Calculator
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Calculate &rarr;</span>
              </Link>
              <Link
                href="/salary"
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-150 dark:border-gray-800 hover:border-emerald-500 transition-colors"
              >
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  💼 Net Take-Home Salary Calculator
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Calculate &rarr;</span>
              </Link>
            </div>
          </div>
          <Link
            href="/calculators"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2 block"
          >
            View all tools &rarr;
          </Link>
        </div>
      </div>

      {/* FAQ block */}
      <FaqSection faqs={GENERAL_FAQS} title="Personal Finance FAQs" />
    </div>
  );
}
