import React from "react";
import { LAST_REVIEWED_DATE, TAX_YEAR_VERIFIED } from "@/lib/siteConfig";

export default function VerificationBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full border border-emerald-100 dark:border-emerald-900/50">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      Calculations updated for {TAX_YEAR_VERIFIED} | Last reviewed: {LAST_REVIEWED_DATE} (Verified by Tax Experts)
    </div>
  );
}
