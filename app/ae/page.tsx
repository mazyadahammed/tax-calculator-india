"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import FaqSection from "@/components/FaqSection";
import VerificationBadge from "@/components/VerificationBadge";
import SchemaScript from "@/components/SchemaScript";
import HilltopAdBanner from "@/components/HilltopAdBanner";
import { webApplicationSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";

const TITLE = "UAE Salary & Gratuity Calculator 2026 | Dubai Labour Law";
const DESCRIPTION =
  "Calculate your monthly take-home salary and end-of-service gratuity in Dubai & UAE under the latest UAE Labour Law (Decree Law No. 33 of 2021). Easy, precise, and instant.";

const FAQS = [
  {
    question: "How is UAE end-of-service gratuity calculated?",
    answer:
      "Gratuity is calculated based on your basic salary. For the first 5 years of service, you receive 21 days of basic salary per year. For any service period beyond 5 years, you receive 30 days of basic salary per year. The total amount is capped at 2 years' worth of basic salary.",
  },
  {
    question: "Do I get gratuity if I resign in the UAE?",
    answer:
      "Yes, under the latest UAE Labour Law (Decree Law No. 33 of 2021), there is no distinction between resignation and termination when calculating gratuity. As long as you have completed 1 year of continuous service, you are entitled to your full gratuity based on the standard formula.",
  },
  {
    question: "What is the minimum service time to qualify for gratuity?",
    answer:
      "To be eligible for end-of-service gratuity in the UAE, you must complete at least 1 year (365 days) of continuous service with your employer.",
  },
  {
    question: "Is there income tax on salary in the UAE?",
    answer:
      "No, the UAE does not levy personal income tax on salaries. Your gross monthly salary (basic salary + allowances) is paid in full as your net monthly take-home salary, unless you are a UAE/GCC national subject to pension contributions.",
  },
];

export default function UaeCalculatorPage() {
  // Inputs
  const [basicSalary, setBasicSalary] = useState<number>(10000);
  const [allowances, setAllowances] = useState<number>(5000);
  const [years, setYears] = useState<number>(3);
  const [months, setMonths] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [nationality, setNationality] = useState<"expat" | "national">("expat");

  // Calculations
  const calculations = useMemo(() => {
    const monthlyGross = basicSalary + allowances;

    // Pension deduction for UAE nationals (GPSSA)
    // Roughly 5% of pensionable salary (Basic + Housing allowances, capped usually)
    const pensionDeduction = nationality === "national" ? Math.round(monthlyGross * 0.05) : 0;
    const monthlyTakeHome = Math.max(0, monthlyGross - pensionDeduction);

    // Total service period in years
    const totalYears = years + (months / 12) + (days / 365.25);
    const hasOneYearService = totalYears >= 1.0;

    let gratuity = 0;
    let daysBasisText = "";

    if (hasOneYearService && basicSalary > 0) {
      const dailyBasic = basicSalary / 30; // standard calendar month basis

      if (totalYears <= 5) {
        // 21 days of basic salary per year
        gratuity = dailyBasic * 21 * totalYears;
        daysBasisText = "21 days of basic salary per year of service";
      } else {
        // 21 days for first 5 years, 30 days for each year after
        const first5YearsGratuity = dailyBasic * 21 * 5;
        const remainingYears = totalYears - 5;
        const remainingGratuity = dailyBasic * 30 * remainingYears;
        gratuity = first5YearsGratuity + remainingGratuity;
        daysBasisText = "21 days/year for first 5 years, 30 days/year thereafter";
      }

      // Cap at 2 years of basic salary
      const gratuityCap = basicSalary * 24;
      if (gratuity > gratuityCap) {
        gratuity = gratuityCap;
        daysBasisText += " (Capped at 24 months of basic salary)";
      }
    }

    return {
      monthlyGross,
      pensionDeduction,
      monthlyTakeHome,
      totalYears: parseFloat(totalYears.toFixed(3)),
      gratuity: Math.round(gratuity),
      hasOneYearService,
      daysBasisText,
    };
  }, [basicSalary, allowances, years, months, days, nationality]);

  const schemas = [
    webApplicationSchema({ name: TITLE, description: DESCRIPTION, path: "/ae" }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "UAE Salary & Gratuity Calculator", path: "/ae" },
    ]),
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <SchemaScript schemas={schemas} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900 dark:text-white font-medium">UAE Calculator</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
        <VerificationBadge />
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:leading-tight">
          UAE Salary & Gratuity Calculator <span className="text-emerald-600 dark:text-emerald-400">2026</span>
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Calculate your monthly net in-hand payout and end-of-service gratuity entitlement according to latest UAE Labour Law (Decree Law No. 33 of 2021).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">Calculation Parameters</h2>

          {/* Monthly Basic Salary */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase dark:text-gray-400 mb-1">
              Monthly Basic Salary (AED)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">AED</span>
              <input
                type="number"
                min="0"
                value={basicSalary || ""}
                onChange={(e) => setBasicSalary(Math.max(0, Number(e.target.value)))}
                className="w-full pl-12 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                placeholder="0"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              End-of-service gratuity calculations are based strictly on this basic rate.
            </p>
          </div>

          {/* Monthly Allowances */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase dark:text-gray-400 mb-1">
              Monthly Allowances (AED)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">AED</span>
              <input
                type="number"
                min="0"
                value={allowances || ""}
                onChange={(e) => setAllowances(Math.max(0, Number(e.target.value)))}
                className="w-full pl-12 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                placeholder="0"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              Includes Housing, transport, education allowances, etc.
            </p>
          </div>

          {/* Nationality */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase dark:text-gray-400 mb-1">
              Nationality / Status
            </label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                type="button"
                onClick={() => setNationality("expat")}
                className={`py-1.5 px-3 text-xs font-medium rounded-lg border transition-all ${
                  nationality === "expat"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-500 dark:text-emerald-400"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              >
                Expatriate (Expat)
              </button>
              <button
                type="button"
                onClick={() => setNationality("national")}
                className={`py-1.5 px-3 text-xs font-medium rounded-lg border transition-all ${
                  nationality === "national"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-500 dark:text-emerald-400"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              >
                UAE / GCC National
              </button>
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Service Period */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
              Service Period (Duration)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-gray-400 mb-1">Years</label>
                <input
                  type="number"
                  min="0"
                  value={years}
                  onChange={(e) => setYears(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 mb-1">Months</label>
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={months}
                  onChange={(e) => setMonths(Math.max(0, Math.min(11, Number(e.target.value))))}
                  className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 mb-1">Days</label>
                <input
                  type="number"
                  min="0"
                  max="364"
                  value={days}
                  onChange={(e) => setDays(Math.max(0, Math.min(364, Number(e.target.value))))}
                  className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
          
          {/* Left Column Ad */}
          <HilltopAdBanner />
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Calculation Summary Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-6">Calculated Take-Home & Gratuity</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Monthly Breakdown */}
              <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-850">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Monthly Take-Home</h3>

                <div className="flex justify-between items-baseline py-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Gross Monthly Salary</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    AED {calculations.monthlyGross.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-baseline py-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Income Tax Rate</span>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">0% (Tax Free)</span>
                </div>

                {nationality === "national" && (
                  <div className="flex justify-between items-baseline py-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">GPSSA Pension Contribution (5%)</span>
                    <span className="text-sm font-semibold text-red-500">
                      - AED {calculations.pensionDeduction.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-250 dark:border-gray-800 pt-2 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Net In-Hand Monthly</span>
                  <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    AED {calculations.monthlyTakeHome.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* End of Service Payout Breakdown */}
              <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-850">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Gratuity Entitlement</h3>

                <div className="flex justify-between items-baseline py-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Service Period</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {calculations.totalYears} Years
                  </span>
                </div>

                <div className="flex justify-between items-baseline py-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Eligibility Status</span>
                  {calculations.hasOneYearService ? (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      Eligible (&gt; 1 Year)
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                      Ineligible (&lt; 1 Year)
                    </span>
                  )}
                </div>

                {calculations.hasOneYearService && (
                  <div className="text-[10px] text-gray-400 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-2 rounded">
                    <strong>Rule:</strong> {calculations.daysBasisText}
                  </div>
                )}

                <div className="border-t border-gray-250 dark:border-gray-800 pt-2 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Estimated Gratuity Payout</span>
                  <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                    AED {calculations.gratuity.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Disclaimer notice under the calculation box */}
            <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-lg text-xs text-blue-800 dark:text-blue-400 leading-relaxed">
              <strong>💡 Legal Disclaimer:</strong> This calculator provides estimations based on standard formulas outlined in the UAE Labour Law (Decree Law No. 33 of 2021). The final calculation depends on your specific employment contract clauses, company policies, and official confirmation from your Human Resources department.
            </div>
          </div>

          {/* Right Column Ad */}
          <HilltopAdBanner />

          {/* Explanatory Labor Law Content */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Understanding UAE End-of-Service Gratuity Rules
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              In the United Arab Emirates, employees who complete a minimum of 1 year of continuous service are entitled to an End of Service (EoS) gratuity payout. Under the modern 2022-2026 regulations:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li>
                <strong>Basic Salary Only:</strong> Gratuity is calculated based *strictly* on your final Basic Salary rate. Deduct allowances (e.g. housing, fuel, phone) when estimating your gratuity.
              </li>
              <li>
                <strong>21-Day Rule:</strong> For the first five years of continuous service, an employee gets 21 days&apos; basic salary per year.
              </li>
              <li>
                <strong>30-Day Rule:</strong> Beyond the first five years, you receive 30 days&apos; basic salary for each additional year.
              </li>
              <li>
                <strong>Unified Separation:</strong> Resignations no longer trigger a reduction or cancellation of gratuity. If you have been with your firm for at least 365 consecutive days, you receive your entitlement under the same standard calculation formula whether you leave by choice or are dismissed.
              </li>
              <li>
                <strong>Gratuity Cap:</strong> The maximum total gratuity payout cannot exceed two years&apos; (24 months) basic salary.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <FaqSection faqs={FAQS} title="UAE Salary & Gratuity Calculator FAQs" />
    </div>
  );
}
