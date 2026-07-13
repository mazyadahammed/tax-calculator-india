"use client";

import React, { useState } from "react";
import { compareRegimes } from "@/lib/tax";
import fyData from "@/data/tax-years/fy-2025-26.json";
import { TaxYearConfig } from "@/lib/tax";
import VerificationBadge from "@/components/VerificationBadge";
import AffiliateSavings from "@/components/AffiliateSavings";
import AudienceCapture from "@/components/AudienceCapture";

export default function FreelancerTax44adaPage() {
  const [grossReceipts, setGrossReceipts] = useState<number>(1500000);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [cashPercent, setCashPercent] = useState<number>(0);

  // Section 44ADA Rules (FY 2025-26):
  // 1. Presumptive Net Profit = 50% of Gross Receipts.
  // 2. Gross Receipts Limit = ₹50 Lakhs (or ₹75 Lakhs if cash receipts do not exceed 5% of total).
  // ───────────────────────────────────────────────────────────────────────────
  // NEEDS VERIFICATION: Confirm with a CA or direct Income Tax rules before going live
  // ───────────────────────────────────────────────────────────────────────────
  const LIMIT_STANDARD = 5000000;
  const LIMIT_DIGITAL = 7500000;
  const isDigitalCompliant = cashPercent <= 5;
  const applicableLimit = isDigitalCompliant ? LIMIT_DIGITAL : LIMIT_STANDARD;
  const eligibleFor44ADA = grossReceipts <= applicableLimit;

  const presumptiveIncome = Math.round(grossReceipts * 0.5);
  const totalTaxableIncome = presumptiveIncome + otherIncome;

  // Compute tax using existing engine on the presumptive net taxable income
  const taxConfig = fyData as unknown as TaxYearConfig;
  const income = { grossSalary: 0, otherIncome: totalTaxableIncome, ageCategory: "general" as const };
  const deductions = {
    basicSection80C: 0,
    medicalSection80D: 0,
    homeLoanInterest24B: 0,
    nps80CCD1B: 0,
    employerNps80CCD2: 0,
    hraExemption: 0,
    ltaExemption: 0,
    otherDeductions: 0,
    professionalTax: 0,
  };

  const results = compareRegimes(income, deductions, taxConfig);
  const selectedTax = results.betterRegime === "old" ? results.oldRegime.totalTax : results.newRegime.totalTax;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Verification Badge */}
      <div className="flex justify-center sm:justify-start">
        <VerificationBadge />
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Freelancer Presumptive Tax Calculator (Sec 44ADA)
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Calculate your taxable income and compare regimes using presumptive tax rules for Indian professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
              1. Gross Receipts & Cash Limit
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Gross Receipts from Professional Services
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">₹</span>
                  <input
                    type="number"
                    value={grossReceipts || ""}
                    onChange={(e) => setGrossReceipts(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Cash Receipts Percentage (%)
                </label>
                <input
                  type="number"
                  max="100"
                  min="0"
                  value={cashPercent}
                  onChange={(e) => setCashPercent(Math.min(100, Math.max(0, Number(e.target.value))))}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  If cash receipts ≤ 5%, the gross limit increases to ₹75 Lakhs. Otherwise, the limit is ₹50 Lakhs.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Other Income (Interest, Rent, Capital Gains)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">₹</span>
                  <input
                    type="number"
                    value={otherIncome || ""}
                    onChange={(e) => setOtherIncome(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tax Result */}
        <div className="lg:col-span-5 space-y-6">
          {eligibleFor44ADA ? (
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-xl p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider opacity-90">Eligible for Sec 44ADA</h3>
              <p className="text-2xl font-bold">Presumptive Profit: {formatCurrency(presumptiveIncome)}</p>
              
              <div className="text-xs opacity-90 space-y-1.5 pt-2 border-t border-white/20">
                <div className="flex justify-between">
                  <span>Presumptive Income (50%):</span>
                  <span>{formatCurrency(presumptiveIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Income:</span>
                  <span>{formatCurrency(otherIncome)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Taxable Income:</span>
                  <span>{formatCurrency(totalTaxableIncome)}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-white/10 pt-1.5 text-sm">
                  <span>Calculated Tax:</span>
                  <span>{formatCurrency(selectedTax)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-500/10 border border-red-500/25 rounded-xl p-5 space-y-2 text-red-700 dark:text-red-400">
              <h3 className="text-sm font-bold">❌ Exceeds Presumptive Limits</h3>
              <p className="text-xs leading-relaxed">
                Your gross receipts exceed the Section 44ADA threshold of {formatCurrency(applicableLimit)}. You must maintain standard books of accounts and get audited under Section 44AB.
              </p>
            </div>
          )}

          {/* Quick Guide Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm space-y-2">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white pb-1 border-b border-gray-100 dark:border-gray-850">
              What is Presumptive Taxation?
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Under Section 44ADA, specified professionals (such as developers, consultants, writers, designers) can claim that 50% of their gross revenue was spent on expenses, leaving the other 50% as taxable profit. 
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              No bills, receipts, or record books are required for this 50% deduction. Taxes are paid on the remaining 50% based on regular income tax slabs.
            </p>
          </div>
        </div>
      </div>

      {/* Affiliate recommendations */}
      <AffiliateSavings />

      {/* Audience Capture Form */}
      <AudienceCapture />
    </div>
  );
}
