// Server Component — no client JS needed.
// Placed directly below calculator results to set clear expectations.
// Keeps the disclaimer visible right where users see their tax numbers.

import Link from "next/link";

interface TrustBadgeProps {
  /** Optional extra note specific to the calculator context */
  context?: string;
}

export default function TrustBadge({ context }: TrustBadgeProps) {
  return (
    <div className="flex items-start gap-2.5 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-lg text-xs text-amber-800 dark:text-amber-300">
      {/* Info icon */}
      <svg
        className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500 dark:text-amber-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z"
        />
      </svg>

      <p className="leading-relaxed">
        {context
          ? `${context} `
          : "Results are estimates based on publicly available tax rules for FY 2025-26. "}
        Tax laws change frequently and individual circumstances vary.{" "}
        <strong>Consult a qualified Chartered Accountant before filing your return.</strong>{" "}
        <Link
          href="/disclaimer"
          className="underline underline-offset-2 hover:text-amber-900 dark:hover:text-amber-200 transition-colors"
        >
          Read full disclaimer →
        </Link>
      </p>
    </div>
  );
}
