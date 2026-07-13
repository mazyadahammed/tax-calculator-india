import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import { webApplicationSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import SchemaScript from "@/components/SchemaScript";

import FaqSection from "@/components/FaqSection";
import SalaryCalculator from "./SalaryCalculator";

const TITLE = "Take-Home Salary Calculator FY 2025-26 — In-Hand Monthly";
const DESCRIPTION =
  "Calculate your monthly in-hand/take-home salary in India after EPF, Professional Tax, and Income Tax TDS for FY 2025-26. See the net payout under the best tax regime automatically.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/salary` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/salary`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQS = [
  {
    question: "How is take-home salary calculated in India?",
    answer:
      "Monthly take-home salary is calculated by deducting Employee Provident Fund (EPF), Professional Tax (PT), and monthly income tax TDS from your gross monthly salary. Gross CTC also includes the employer's PF contribution and other benefits that do not form part of your in-hand pay.",
  },
  {
    question: "How does the tax regime choice impact my in-hand salary?",
    answer:
      "The regime you choose determines your TDS amount each month. If the New Tax Regime gives a lower total annual tax, your monthly TDS cut is smaller, resulting in a higher in-hand payout. Our calculator automatically picks the better regime for you.",
  },
  {
    question: "Is EPF deduction mandatory for all employees?",
    answer:
      "EPF is mandatory for employees in establishments with 20 or more workers where the employee's basic salary is up to ₹15,000/month. For basic salaries above that, employees may opt out — though most salaried workers continue contributing as a retirement benefit.",
  },
  {
    question: "What is Professional Tax and how is it deducted?",
    answer:
      "Professional Tax (PT) is a state-level tax levied on salaried employees. The maximum is ₹2,500 per year. It is typically deducted monthly (₹200–₹208/month) by employers before crediting salary. PT is also deductible from gross salary for Old Regime tax computation.",
  },
];

export default function SalaryPage() {
  const schemas = [
    webApplicationSchema({ name: TITLE, description: DESCRIPTION, path: "/salary" }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Salary Calculator", path: "/salary" },
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
          <li className="text-gray-900 dark:text-white font-medium">Salary Calculator</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:leading-tight">
          Take-Home Salary Calculator{" "}
          <span className="text-emerald-600 dark:text-emerald-400">FY 2025-26</span>
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Estimate your monthly in-hand payout after standard deductions, EPF, Professional Tax, and income tax TDS.
        </p>
      </div>

      <SalaryCalculator />

      {/* Educational content */}
      <div className="mt-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm max-w-4xl mx-auto space-y-4">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">
          Understanding Salary Deductions in India
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Your net take-home differs from your CTC (Cost to Company) due to several deductions:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {[
            { label: "EPF (Employee PF)", detail: "12% of Basic Salary + DA. Locked until retirement or resignation." },
            { label: "Professional Tax", detail: "State-level. Max ₹2,500/year. Deducted monthly by employer." },
            { label: "Income Tax TDS", detail: "Monthly withholding based on your projected annual tax liability." },
          ].map(({ label, detail }) => (
            <div key={label} className="bg-gray-50 dark:bg-gray-950/50 rounded-lg p-3 border border-gray-100 dark:border-gray-800">
              <div className="font-bold text-gray-800 dark:text-gray-200 mb-1">{label}</div>
              <div className="text-gray-500 dark:text-gray-400">{detail}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400">
          To optimise your TDS and choose the right regime, use the full{" "}
          <Link href="/" className="text-emerald-600 hover:underline dark:text-emerald-400 font-medium">
            Income Tax Calculator
          </Link>
          {" "}or compare regimes on our{" "}
          <Link href="/compare" className="text-emerald-600 hover:underline dark:text-emerald-400 font-medium">
            Old vs New Regime guide
          </Link>
          .
        </p>
      </div>

      <FaqSection faqs={FAQS} title="Salary Calculator FAQs" />

    </div>
  );
}
