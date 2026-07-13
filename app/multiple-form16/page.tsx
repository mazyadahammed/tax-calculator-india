"use client";

import React, { useState } from "react";
import { compareRegimes } from "@/lib/tax";
import fyData from "@/data/tax-years/fy-2025-26.json";
import { TaxYearConfig } from "@/lib/tax";
import VerificationBadge from "@/components/VerificationBadge";
import AffiliateSavings from "@/components/AffiliateSavings";

interface EmployerSalary {
  id: string;
  name: string;
  grossSalary: number;
  tdsDeducted: number;
  providentTax: number;
}

export default function MultipleForm16Page() {
  const [employers, setEmployers] = useState<EmployerSalary[]>([
    { id: "1", name: "Previous Employer", grossSalary: 400000, tdsDeducted: 0, providentTax: 1200 },
    { id: "2", name: "Current Employer", grossSalary: 800000, tdsDeducted: 30000, providentTax: 1200 },
  ]);

  const addEmployer = () => {
    const newId = (employers.length + 1).toString();
    setEmployers([
      ...employers,
      { id: newId, name: `Employer ${newId}`, grossSalary: 0, tdsDeducted: 0, providentTax: 0 },
    ]);
  };

  const removeEmployer = (id: string) => {
    if (employers.length <= 1) return;
    setEmployers(employers.filter((emp) => emp.id !== id));
  };

  const updateEmployer = (id: string, field: keyof EmployerSalary, value: string | number) => {
    setEmployers(
      employers.map((emp) => {
        if (emp.id === id) {
          return { ...emp, [field]: value };
        }
        return emp;
      })
    );
  };

  // Perform Consolidated Calculation
  const taxConfig = fyData as unknown as TaxYearConfig;
  const totalGross = employers.reduce((acc, emp) => acc + (Number(emp.grossSalary) || 0), 0);
  const totalTdsPaid = employers.reduce((acc, emp) => acc + (Number(emp.tdsDeducted) || 0), 0);
  const totalPt = employers.reduce((acc, emp) => acc + (Number(emp.providentTax) || 0), 0);

  // Consolidated Regime Comparison
  const income = { grossSalary: totalGross, otherIncome: 0, ageCategory: "general" as const };
  
  // Assuming basic 80C deductions for EPF
  const basic80C = Math.min(150000, totalGross * 0.06); 
  const deductions = {
    basicSection80C: basic80C,
    medicalSection80D: 0,
    homeLoanInterest24B: 0,
    nps80CCD1B: 0,
    employerNps80CCD2: 0,
    hraExemption: 0,
    ltaExemption: 0,
    otherDeductions: 0,
    professionalTax: totalPt,
  };

  const results = compareRegimes(income, deductions, taxConfig);
  const selectedTax = results.betterRegime === "old" ? results.oldRegime.totalTax : results.newRegime.totalTax;
  
  const potentialTaxOwed = Math.max(0, selectedTax - totalTdsPaid);

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
          Form-16 Consolidator (Job Switchers)
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Switched jobs mid-year? Consolidate incomes from multiple employers to check if you owe extra tax due to double exemption slips.
        </p>
      </div>

      {/* Consolidator Form & Result Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Incomes Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
              Enter Details from Each Form-16 / Salary Slip
            </h2>

            <div className="space-y-6">
              {employers.map((emp, index) => (
                <div key={emp.id} className="p-4 border border-gray-100 dark:border-gray-800 rounded-lg bg-gray-50/50 dark:bg-gray-950/20 space-y-3 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">
                      Employer #{index + 1}
                    </span>
                    {employers.length > 1 && (
                      <button
                        onClick={() => removeEmployer(emp.id)}
                        className="text-xs text-red-500 hover:text-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Employer Name
                      </label>
                      <input
                        type="text"
                        value={emp.name}
                        onChange={(e) => updateEmployer(emp.id, "name", e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Gross Salary (Annual)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={emp.grossSalary || ""}
                        onChange={(e) => updateEmployer(emp.id, "grossSalary", Math.max(0, Number(e.target.value)))}
                        className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        TDS Deducted (Form 26AS)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={emp.tdsDeducted || ""}
                        onChange={(e) => updateEmployer(emp.id, "tdsDeducted", Math.max(0, Number(e.target.value)))}
                        className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addEmployer}
              className="w-full py-2 border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 text-xs font-bold text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all"
            >
              + Add Another Employer
            </button>
          </div>
        </div>

        {/* Results / Explanation Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Consolidated Verdict */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider opacity-90">Consolidated Tax</h3>
            <p className="text-3xl font-extrabold">{formatCurrency(selectedTax)}</p>
            <div className="text-xs opacity-90 space-y-1">
              <div className="flex justify-between">
                <span>Total Gross Income:</span>
                <span className="font-bold">{formatCurrency(totalGross)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total TDS Paid:</span>
                <span className="font-bold">{formatCurrency(totalTdsPaid)}</span>
              </div>
            </div>
            {potentialTaxOwed > 0 ? (
              <div className="mt-3 p-3 bg-red-500/25 border border-red-400/35 rounded-lg">
                <p className="text-xs font-bold">⚠️ Warning: Extra Tax Owed</p>
                <p className="text-[10px] mt-0.5 opacity-95">
                  You may owe approximately <span className="font-extrabold">{formatCurrency(potentialTaxOwed)}</span> when you file your ITR.
                </p>
              </div>
            ) : (
              <div className="mt-3 p-3 bg-emerald-500/20 rounded-lg">
                <p className="text-xs font-bold">✅ Tax Liability Covered</p>
                <p className="text-[10px] mt-0.5 opacity-95">
                  Your total paid TDS is sufficient to cover your calculated tax liability.
                </p>
              </div>
            )}
          </div>

          {/* Explanation Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
              Why is there a discrepancy?
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              When you change jobs, both employers assume they are your only employer. Consequently, **both** apply the standard deduction (₹75k under New Regime) and calculate TDS starting from the lowest tax brackets (up to ₹4L tax-free). 
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
              When these incomes are consolidated at the end of the year, your combined income pushes you into higher tax brackets, causing a tax shortfall. Consolidating early helps you avoid tax notices and interest penalties.
            </p>
          </div>
        </div>
      </div>

      {/* Affiliate actions */}
      <AffiliateSavings />
    </div>
  );
}
