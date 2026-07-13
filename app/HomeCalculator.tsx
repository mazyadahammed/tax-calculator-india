"use client";

import { useState, useMemo } from "react";
import fyData from "@/data/tax-years/fy-2025-26.json";
import {
  TaxYearConfig,
  IncomeDetails,
  Deductions,
  compareRegimes,
  calculateTakeHome,
} from "@/lib/tax";

import TrustBadge from "@/components/TrustBadge";
import VerificationBadge from "@/components/VerificationBadge";
import AffiliateSavings from "@/components/AffiliateSavings";

export default function HomeCalculator() {
  const config = fyData as unknown as TaxYearConfig;

  // Income States
  const [grossSalary, setGrossSalary] = useState<number>(1200000);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [ageCategory, setAgeCategory] = useState<"general" | "senior" | "superSenior">("general");

  // Deduction States
  const [basic80C, setBasic80C] = useState<number>(150000);
  const [medical80D, setMedical80D] = useState<number>(25000);
  const [homeLoan24B, setHomeLoan24B] = useState<number>(0);
  const [nps80CCD1B, setNps80CCD1B] = useState<number>(0);
  const [employerNps80CCD2, setEmployerNps80CCD2] = useState<number>(0);
  const [hraExemption, setHraExemption] = useState<number>(0);
  const [ltaExemption] = useState<number>(0);
  const [otherDeductions, setOtherDeductions] = useState<number>(0);
  const [professionalTax, setProfessionalTax] = useState<number>(2400);

  // Take Home parameters
  const [epfMonthly, setEpfMonthly] = useState<number>(0);

  // Calculate results dynamically
  const results = useMemo(() => {
    const income: IncomeDetails = {
      grossSalary,
      otherIncome,
      ageCategory,
    };

    const deductions: Deductions = {
      basicSection80C: basic80C,
      medicalSection80D: medical80D,
      homeLoanInterest24B: homeLoan24B,
      nps80CCD1B: nps80CCD1B,
      employerNps80CCD2,
      hraExemption,
      ltaExemption,
      otherDeductions,
      professionalTax,
    };

    const comparison = compareRegimes(income, deductions, config);
    
    // Choose selected regime's tax for take-home calculation
    const activeTax = comparison.betterRegime === "old" 
      ? comparison.oldRegime.totalTax 
      : comparison.newRegime.totalTax;

    const takeHome = calculateTakeHome(income, deductions, activeTax, epfMonthly);

    return {
      comparison,
      takeHome,
    };
  }, [
    grossSalary,
    otherIncome,
    ageCategory,
    basic80C,
    medical80D,
    homeLoan24B,
    nps80CCD1B,
    employerNps80CCD2,
    hraExemption,
    ltaExemption,
    otherDeductions,
    professionalTax,
    epfMonthly,
    config,
  ]);

  const { comparison, takeHome } = results;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

      {/* Page title — rendered first so it does NOT block LCP */}
      <div className="mb-5 text-center sm:text-left space-y-3">
        <VerificationBadge />
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          India Tax Calculator <span className="text-emerald-600 dark:text-emerald-400">FY 2025-26</span>
        </h1>
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
          Compare old and new tax regimes under the latest Union Budget 2025 rules instantly.
        </p>
      </div>



      {/* Two-column responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Income Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
              1. Salary & Income
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase dark:text-gray-400 mb-1">
                  Gross Annual Salary
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={grossSalary || ""}
                    onChange={(e) => setGrossSalary(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase dark:text-gray-400 mb-1">
                  Other Income (Interest, etc)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={otherIncome || ""}
                    onChange={(e) => setOtherIncome(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase dark:text-gray-400 mb-2">
                Age Bracket (Determines Old Regime Slabs)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["general", "senior", "superSenior"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setAgeCategory(cat)}
                    className={`py-1.5 px-2 text-xs font-semibold border rounded-lg transition-colors ${
                      ageCategory === cat
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                        : "border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-950 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {cat === "general" && "Under 60"}
                    {cat === "senior" && "60 - 79"}
                    {cat === "superSenior" && "80+"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Deductions Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-2">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                2. Old Regime Deductions
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                These investments only save tax if you choose the Old Tax Regime.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Section 80C (Max ₹1.5L)
                </label>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 block mb-1">
                  PPF, EPF, LIC, ELSS Mutual Funds, School fees
                </span>
                <input
                  type="number"
                  min="0"
                  value={basic80C || ""}
                  onChange={(e) => setBasic80C(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                  placeholder="e.g. 150000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Section 80D (Health Insurance)
                </label>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 block mb-1">
                  Medical insurance premium for you, family & parents
                </span>
                <input
                  type="number"
                  min="0"
                  value={medical80D || ""}
                  onChange={(e) => setMedical80D(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                  placeholder="e.g. 25000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Section 24b (Home Loan Interest)
                </label>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 block mb-1">
                  Interest paid on home loan for self-occupied house
                </span>
                <input
                  type="number"
                  min="0"
                  value={homeLoan24B || ""}
                  onChange={(e) => setHomeLoan24B(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                  placeholder="e.g. 0"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">
                  HRA Exemption (House Rent)
                </label>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 block mb-1">
                  Tax-free part of rent paid. Use the HRA Calculator to estimate.
                </span>
                <input
                  type="number"
                  min="0"
                  value={hraExemption || ""}
                  onChange={(e) => setHraExemption(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">
                  80CCD(1B) Voluntary NPS (Max ₹50k)
                </label>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 block mb-1">
                  Additional self contribution to National Pension System
                </span>
                <input
                  type="number"
                  min="0"
                  value={nps80CCD1B || ""}
                  onChange={(e) => setNps80CCD1B(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">
                  80CCD(2) NPS Employer portion
                </label>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 block mb-1">
                  Company&apos;s contribution to your NPS (Allowed in both regimes)
                </span>
                <input
                  type="number"
                  min="0"
                  value={employerNps80CCD2 || ""}
                  onChange={(e) => setEmployerNps80CCD2(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Professional Tax (Annual)
                </label>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 block mb-1">
                  State-level tax deducted from your monthly salary slip
                </span>
                <input
                  type="number"
                  min="0"
                  value={professionalTax || ""}
                  onChange={(e) => setProfessionalTax(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                  placeholder="2400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Other Exemptions (LTA, 80G, etc.)
                </label>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 block mb-1">
                  Leave Travel, donations, or other miscellaneous deductions
                </span>
                <input
                  type="number"
                  min="0"
                  value={otherDeductions + ltaExemption || ""}
                  onChange={(e) => setOtherDeductions(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Take Home Salary Settings Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
              3. Monthly Take-Home Parameters
            </h2>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                Your Monthly EPF contribution (Optional)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">₹</span>
                <input
                  type="number"
                  min="0"
                  value={epfMonthly || ""}
                  onChange={(e) => setEpfMonthly(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                  placeholder="e.g. 15000"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                Usually calculated as 12% of Basic Salary + DA. Used to estimate in-hand monthly salary.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Live results & Comparison */}
        <div className="lg:col-span-6 space-y-6">
          {/* Recommendation Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-90">
              Tax Verdict
            </h3>
            {comparison.betterRegime === "equal" ? (
              <p className="text-lg font-bold">
                Both regimes yield the exact same tax liability.
              </p>
            ) : (
              <div className="space-y-1">
                <p className="text-2xl font-bold">
                  {comparison.betterRegime === "new" ? "New Regime" : "Old Regime"} is better!
                </p>
                <p className="text-sm opacity-90">
                  You save <span className="font-extrabold">{formatCurrency(comparison.taxSaved)}</span> annually by choosing this regime.
                </p>
              </div>
            )}
          </div>

          {/* Accuracy disclaimer — shown immediately after the verdict */}
          <TrustBadge />

          {/* Core comparison table */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
              Detailed Comparison
            </h2>

            <div className="space-y-4">
              {/* Slabs breakdown */}
              <div className="grid grid-cols-3 text-xs font-semibold text-gray-400 uppercase tracking-wider pb-1">
                <span>Particulars</span>
                <span className="text-right">New Regime</span>
                <span className="text-right">Old Regime</span>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="grid grid-cols-3">
                  <span className="text-gray-500 dark:text-gray-400">Gross Income</span>
                  <span className="text-right font-medium">{formatCurrency(comparison.newRegime.grossIncome)}</span>
                  <span className="text-right font-medium">{formatCurrency(comparison.oldRegime.grossIncome)}</span>
                </div>

                <div className="grid grid-cols-3">
                  <span className="text-gray-500 dark:text-gray-400">Total Deductions</span>
                  <span className="text-right text-emerald-600 dark:text-emerald-400 font-medium">-{formatCurrency(comparison.newRegime.totalDeductions)}</span>
                  <span className="text-right text-emerald-600 dark:text-emerald-400 font-medium">-{formatCurrency(comparison.oldRegime.totalDeductions)}</span>
                </div>

                <div className="grid grid-cols-3 border-t border-gray-100 dark:border-gray-800 pt-2 font-semibold">
                  <span className="text-gray-900 dark:text-white">Taxable Income</span>
                  <span className="text-right text-gray-950 dark:text-gray-50">{formatCurrency(comparison.newRegime.netTaxableIncome)}</span>
                  <span className="text-right text-gray-950 dark:text-gray-50">{formatCurrency(comparison.oldRegime.netTaxableIncome)}</span>
                </div>

                <div className="grid grid-cols-3">
                  <span className="text-gray-500 dark:text-gray-400">Slab Tax (Before Rebate)</span>
                  <span className="text-right">{formatCurrency(comparison.newRegime.taxOnIncome)}</span>
                  <span className="text-right">{formatCurrency(comparison.oldRegime.taxOnIncome)}</span>
                </div>

                <div className="grid grid-cols-3">
                  <span className="text-gray-500 dark:text-gray-400">87A Rebate</span>
                  <span className="text-right text-emerald-600 dark:text-emerald-400 font-medium">-{formatCurrency(comparison.newRegime.rebate87A)}</span>
                  <span className="text-right text-emerald-600 dark:text-emerald-400 font-medium">-{formatCurrency(comparison.oldRegime.rebate87A)}</span>
                </div>

                <div className="grid grid-cols-3">
                  <span className="text-gray-500 dark:text-gray-400">Surcharge</span>
                  <span className="text-right">{formatCurrency(comparison.newRegime.surcharge)}</span>
                  <span className="text-right">{formatCurrency(comparison.oldRegime.surcharge)}</span>
                </div>

                {comparison.newRegime.marginalRelief + comparison.oldRegime.marginalRelief > 0 && (
                  <div className="grid grid-cols-3 text-amber-600 dark:text-amber-400">
                    <span>Marginal Relief</span>
                    <span className="text-right">-{formatCurrency(comparison.newRegime.marginalRelief)}</span>
                    <span className="text-right">-{formatCurrency(comparison.oldRegime.marginalRelief)}</span>
                  </div>
                )}

                <div className="grid grid-cols-3">
                  <span className="text-gray-500 dark:text-gray-400">Education Cess (4%)</span>
                  <span className="text-right">{formatCurrency(comparison.newRegime.cess)}</span>
                  <span className="text-right">{formatCurrency(comparison.oldRegime.cess)}</span>
                </div>

                <div className="grid grid-cols-3 border-t border-gray-100 dark:border-gray-800 pt-2 font-bold text-base">
                  <span className="text-gray-900 dark:text-white">Total Annual Tax</span>
                  <span className="text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(comparison.newRegime.totalTax)}</span>
                  <span className="text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(comparison.oldRegime.totalTax)}</span>
                </div>
              </div>
            </div>
          </div>



          {/* Take Home Salary breakdown */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
              Monthly In-Hand Projection
            </h2>

            <div className="space-y-2.5 text-sm">
              <div className="grid grid-cols-2">
                <span className="text-gray-500 dark:text-gray-400">Gross Monthly Salary</span>
                <span className="text-right font-medium">{formatCurrency(takeHome.grossMonthly)}</span>
              </div>

              <div className="grid grid-cols-2 text-red-600 dark:text-red-400">
                <span>Monthly EPF Deductions</span>
                <span className="text-right font-medium">-{formatCurrency(takeHome.monthlyDeductions.epf)}</span>
              </div>

              <div className="grid grid-cols-2 text-red-600 dark:text-red-400">
                <span>Monthly Professional Tax</span>
                <span className="text-right font-medium">-{formatCurrency(takeHome.monthlyDeductions.professionalTax)}</span>
              </div>

              <div className="grid grid-cols-2 text-red-600 dark:text-red-400">
                <span>Estimated Monthly Income Tax</span>
                <span className="text-right font-medium">-{formatCurrency(takeHome.monthlyDeductions.incomeTax)}</span>
              </div>

              <div className="grid grid-cols-2 border-t border-gray-100 dark:border-gray-800 pt-2 font-bold text-base">
                <span className="text-gray-900 dark:text-white">Take-Home (Net In-Hand)</span>
                <span className="text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(takeHome.netTakeHome)}</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 italic">
              * Note: Take-home calculation assumes the recommended better regime to maximize your savings.
            </p>
          </div>

          {/* Affiliate Integration */}
          <AffiliateSavings />

          {/* Fresher's Guide Card */}
          <div className="bg-emerald-50/50 dark:bg-emerald-950/10 rounded-xl p-5 border border-emerald-100 dark:border-emerald-900/50 space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                Fresher&apos;s Quick Tax Guide
              </h3>
            </div>
            
            <div className="space-y-3.5 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              <div>
                <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-0.5">
                  1. What is a &quot;Tax Regime&quot;?
                </span>
                Think of regimes as two different pathways. The **Old Regime** lets you save tax if you invest in PPF, LIC, or pay home rent, but has higher tax rates. The **New Regime** gives you much lower tax rates, but you can&apos;t claim investment discounts.
              </div>
              
              <div>
                <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-0.5">
                  2. Why is the New Regime usually best for first job earners?
                </span>
                As a fresher, you might not want to lock up ₹1.5 Lakh of your salary in savings schemes. The New Regime makes income up to **₹12 Lakh completely tax-free** (FY 2025-26 rules), giving you maximum in-hand cash to spend or invest freely.
              </div>

              <div>
                <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-0.5">
                  3. What is the Standard Deduction?
                </span>
                It&apos;s a flat tax-free discount of **₹75,000** (New Regime) or **₹50,000** (Old Regime) given automatically to all salaried employees. You don&apos;t need to buy anything or submit any bills to your company to get this discount.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
