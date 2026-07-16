"use client";

import { useState, useMemo } from "react";
import fyData from "@/data/tax-years/fy-2025-26.json";
import TrustBadge from "@/components/TrustBadge";
import {
  TaxYearConfig,
  IncomeDetails,
  Deductions,
  compareRegimes,
  calculateTakeHome,
} from "@/lib/tax";

export default function SalaryCalculator() {
  const config = fyData as unknown as TaxYearConfig;

  const [grossSalary, setGrossSalary] = useState<number>(1200000);
  const [epfMonthly, setEpfMonthly] = useState<number>(6000);
  const [professionalTax, setProfessionalTax] = useState<number>(2400);

  const result = useMemo(() => {
    const income: IncomeDetails = {
      grossSalary,
      otherIncome: 0,
      ageCategory: "general",
    };

    // Standard deductions assumed for comparison
    const deductions: Deductions = {
      basicSection80C: epfMonthly * 12, // EPF is under 80C
      medicalSection80D: 0,
      homeLoanInterest24B: 0,
      nps80CCD1B: 0,
      employerNps80CCD2: 0,
      hraExemption: 0,
      ltaExemption: 0,
      otherDeductions: 0,
      professionalTax,
    };

    const comparison = compareRegimes(income, deductions, config);
    const activeTax = comparison.betterRegime === "old"
      ? comparison.oldRegime.totalTax
      : comparison.newRegime.totalTax;

    const takeHome = calculateTakeHome(income, deductions, activeTax, epfMonthly);

    return {
      takeHome,
      betterRegime: comparison.betterRegime,
      annualTax: activeTax,
    };
  }, [grossSalary, epfMonthly, professionalTax, config]);

  const { takeHome, betterRegime, annualTax } = result;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Inputs Form */}
      <div className="lg:col-span-7 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
          Monthly In-Hand Details
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase dark:text-gray-400 mb-1">
              Gross Annual Salary
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">₹</span>
              <input
                type="number"
                inputMode="numeric"
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
              Monthly EPF Contribution
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">₹</span>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                value={epfMonthly || ""}
                onChange={(e) => setEpfMonthly(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                placeholder="0"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              Usually 12% of Basic salary. This reduces taxable salary in the Old Regime.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase dark:text-gray-400 mb-1">
              Annual Professional Tax (PT)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">₹</span>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                value={professionalTax || ""}
                onChange={(e) => setProfessionalTax(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                placeholder="2400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Card */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
            In-Hand Projection
          </h2>

          <div className="space-y-4 text-sm">
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-xl p-4 text-center">
              <span className="block text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-semibold mb-1">
                Net Monthly Take-Home
              </span>
              <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                {formatCurrency(takeHome.netTakeHome)}
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Gross Monthly Salary:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(takeHome.grossMonthly)}</span>
              </div>
              <div className="flex justify-between text-red-600 dark:text-red-400">
                <span>EPF Deduction (Monthly):</span>
                <span>-{formatCurrency(takeHome.monthlyDeductions.epf)}</span>
              </div>
              <div className="flex justify-between text-red-600 dark:text-red-400">
                <span>Professional Tax (Monthly):</span>
                <span>-{formatCurrency(takeHome.monthlyDeductions.professionalTax)}</span>
              </div>
              <div className="flex justify-between text-red-600 dark:text-red-400">
                <span>Income Tax TDS (Monthly):</span>
                <span>-{formatCurrency(takeHome.monthlyDeductions.incomeTax)}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-3 text-xs text-gray-400 space-y-1">
              <div className="flex justify-between">
                <span>Better Regime Selected:</span>
                <span className="font-semibold uppercase text-emerald-600 dark:text-emerald-400">
                  {betterRegime === "new" ? "New Regime" : "Old Regime"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Annual Tax:</span>
                <span>{formatCurrency(annualTax)}</span>
              </div>
            </div>
          </div>

          {/* Salary-specific disclaimer */}
          <TrustBadge context="Take-home estimates assume a simplified salary structure. Actual in-hand pay may differ based on allowances, perquisites, and employer-specific payroll policies." />
        </div>
      </div>
    </div>
  );
}
