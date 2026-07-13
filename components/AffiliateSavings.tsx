"use client";

import React, { useState } from "react";
import { affiliateLinks, AFFILIATE_DISCLOSURE } from "@/lib/affiliateLinks";

export default function AffiliateSavings() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm space-y-4 relative">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm focus:outline-none"
        aria-label="Dismiss panel"
      >
        ✕
      </button>

      <div className="space-y-1">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
          Ways to Reduce Your Taxes Next Year 💡
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Optimize your salary structure and investments under the Old Tax Regime to maximize exemptions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a
          href={affiliateLinks.elss}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col p-3 border border-gray-100 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-lg bg-gray-50/50 dark:bg-gray-950/20 transition-all text-left"
        >
          <span className="text-xs font-bold text-gray-900 dark:text-white">Section 80C (ELSS)</span>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
            Invest up to ₹1.5L in high-performing equity mutual funds with 3-year lock-in.
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-auto pt-2 hover:underline">
            Invest in ELSS →
          </span>
        </a>

        <a
          href={affiliateLinks.nps}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col p-3 border border-gray-100 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-lg bg-gray-50/50 dark:bg-gray-950/20 transition-all text-left"
        >
          <span className="text-xs font-bold text-gray-900 dark:text-white">Section 80CCD (NPS)</span>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
            Get an extra tax-deductible limit of ₹50,000 via voluntary National Pension Scheme.
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-auto pt-2 hover:underline">
            Open NPS Account →
          </span>
        </a>

        <a
          href={affiliateLinks.taxFiling}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col p-3 border border-gray-100 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-lg bg-gray-50/50 dark:bg-gray-950/20 transition-all text-left"
        >
          <span className="text-xs font-bold text-gray-900 dark:text-white">Assisted Filing Help</span>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
            Let an expert Chartered Accountant file your return to avoid notices and penalties.
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-auto pt-2 hover:underline">
            Talk to an Expert →
          </span>
        </a>
      </div>

      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
        <p className="text-[9px] text-gray-400 leading-relaxed italic">
          {AFFILIATE_DISCLOSURE}
        </p>
      </div>
    </div>
  );
}
