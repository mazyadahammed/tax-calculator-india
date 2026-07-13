"use client";

import { useState, useMemo } from "react";
import TrustBadge from "@/components/TrustBadge";

export default function HraCalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(500000);
  const [hraReceived, setHraReceived] = useState<number>(240000);
  const [rentPaid, setRentPaid] = useState<number>(180000);
  const [isMetro, setIsMetro] = useState<boolean>(false);

  const result = useMemo(() => {
    // 1. Actual HRA received
    const actualHra = hraReceived;

    // 2. Rent paid minus 10% of basic salary
    const rentMinusBasic = Math.max(0, rentPaid - basicSalary * 0.1);

    // 3. 50% of basic (for metro) or 40% of basic (for non-metro)
    const basicThreshold = basicSalary * (isMetro ? 0.5 : 0.4);

    // Exempt amount is the minimum of the three
    const exemptHra = Math.min(actualHra, rentMinusBasic, basicThreshold);
    const taxableHra = Math.max(0, actualHra - exemptHra);

    return {
      exemptHra,
      taxableHra,
      actualHra,
      rentMinusBasic,
      basicThreshold,
    };
  }, [basicSalary, hraReceived, rentPaid, isMetro]);

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
          Calculate HRA Exemption
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase dark:text-gray-400 mb-1">
              Basic Salary + DA (Dearness Allowance)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">₹</span>
              <input
                type="number"
                min="0"
                value={basicSalary || ""}
                onChange={(e) => setBasicSalary(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                placeholder="0"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              Annual basic pay and DA are used as the base for calculations.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase dark:text-gray-400 mb-1">
              Actual HRA Received (Annual)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">₹</span>
              <input
                type="number"
                min="0"
                value={hraReceived || ""}
                onChange={(e) => setHraReceived(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase dark:text-gray-400 mb-1">
              Actual Rent Paid (Annual)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">₹</span>
              <input
                type="number"
                min="0"
                value={rentPaid || ""}
                onChange={(e) => setRentPaid(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase dark:text-gray-400 mb-2">
              City Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setIsMetro(true)}
                className={`py-2 px-4 text-xs font-semibold border rounded-lg transition-colors ${
                  isMetro
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                    : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950"
                }`}
              >
                Metro City
                <span className="block text-[9px] font-normal opacity-70">Mumbai, Delhi, Kolkata, Chennai</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMetro(false)}
                className={`py-2 px-4 text-xs font-semibold border rounded-lg transition-colors ${
                  !isMetro
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                    : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950"
                }`}
              >
                Non-Metro City
                <span className="block text-[9px] font-normal opacity-70">Bengaluru, Pune, Hyderabad, etc.</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Calculation Output Card */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
            Calculation Results
          </h2>

          <div className="space-y-4 text-sm">
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-xl p-4 text-center">
              <span className="block text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-semibold mb-1">
                Exempt HRA (Tax-Free)
              </span>
              <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                {formatCurrency(result.exemptHra)}
              </span>
            </div>

            <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 rounded-xl p-4 text-center">
              <span className="block text-xs uppercase tracking-wider text-red-800 dark:text-red-400 font-semibold mb-1">
                Taxable HRA (Add to Salary)
              </span>
              <span className="text-2xl font-bold text-red-700 dark:text-red-400">
                {formatCurrency(result.taxableHra)}
              </span>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex justify-between">
                <span>1. Actual HRA received:</span>
                <span>{formatCurrency(result.actualHra)}</span>
              </div>
              <div className="flex justify-between">
                <span>2. Rent Paid - 10% of Basic:</span>
                <span>{formatCurrency(result.rentMinusBasic)}</span>
              </div>
              <div className="flex justify-between">
                <span>3. {isMetro ? "50%" : "40%"} of Basic Salary:</span>
                <span>{formatCurrency(result.basicThreshold)}</span>
              </div>
            </div>
          </div>

          {/* HRA-specific disclaimer */}
          <TrustBadge context="HRA exemption is calculated using the three-condition minimum rule under Section 10(13A) and is available under the Old Tax Regime only." />
        </div>
      </div>
    </div>
  );
}
