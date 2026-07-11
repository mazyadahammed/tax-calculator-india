"use client";

// ---------------------------------------------------------------------------
// AdSlot component — CLS-safe ad placeholder.
//
// HOW TO ACTIVATE ADS:
//   1. Sign up for Google AdSense (https://adsense.google.com).
//   2. Add your AdSense <script> tag to app/layout.tsx <head>.
//   3. Replace the <div> below with your <ins class="adsbygoogle"> code.
//   4. Remove the placeholder label and border styles once live.
//
// IMPORTANT: Never remove the outer wrapper div or change its inline
// dimensions. Fixed width/height prevents Cumulative Layout Shift (CLS)
// and keeps Core Web Vitals green. AdSense requires the container to
// have a stable size before the ad loads.
// ---------------------------------------------------------------------------

interface AdSlotProps {
  id: string;
  /** Standard IAB ad sizes:
   *  horizontal  → 728×90  Leaderboard (shrinks to 320×50 on mobile)
   *  rectangle   → 336×280 Large Rectangle (best CTR for sidebar)
   *  vertical    → 160×600 Wide Skyscraper (desktop sidebar only)
   */
  format?: "horizontal" | "rectangle" | "vertical";
  className?: string;
}

/** Explicit pixel-locked sizes prevent layout shift (CLS = 0).
 *  These match real AdSense responsive unit defaults. */
const SIZE: Record<string, { wrapper: string; inner: string; label: string }> = {
  horizontal: {
    // 728×90 desktop → collapses to 320×50 on small screens
    wrapper: "w-full max-w-[728px] mx-auto h-[90px]",
    inner:   "h-[90px]",
    label:   "Leaderboard · 728×90",
  },
  rectangle: {
    // 336×280 – highest-earning sidebar unit
    wrapper: "w-full max-w-[336px] mx-auto h-[280px]",
    inner:   "h-[280px]",
    label:   "Large Rectangle · 336×280",
  },
  vertical: {
    // 160×600 desktop skyscraper
    wrapper: "w-[160px] mx-auto h-[600px]",
    inner:   "h-[600px]",
    label:   "Skyscraper · 160×600",
  },
};

export default function AdSlot({
  id,
  format = "horizontal",
  className = "",
}: AdSlotProps) {
  const s = SIZE[format];

  return (
    /**
     * TO REPLACE WITH REAL ADS:
     * Remove the inner <div> placeholder and insert your AdSense <ins> tag here.
     * Keep this outer <div> wrapper with its fixed dimensions intact.
     *
     * Example:
     *   <ins
     *     className="adsbygoogle"
     *     style={{ display: "block" }}
     *     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     *     data-ad-slot="XXXXXXXXXX"
     *     data-ad-format="auto"
     *     data-full-width-responsive="true"
     *   />
     */
    <div
      id={id}
      className={`${s.wrapper} ${className} overflow-hidden`}
      aria-label="Advertisement"
      data-ad-format={format}
    >
      {/* ── PLACEHOLDER – delete this inner div when going live ── */}
      <div
        className={`${s.inner} w-full flex flex-col items-center justify-center gap-1
          bg-gray-50 dark:bg-gray-900/30
          border border-dashed border-gray-200 dark:border-gray-800
          rounded-lg select-none`}
      >
        <span className="text-[9px] uppercase tracking-widest font-semibold text-gray-300 dark:text-gray-700">
          Ad
        </span>
        <span className="text-[9px] text-gray-300 dark:text-gray-700 font-mono">
          {s.label}
        </span>
      </div>
      {/* ── END PLACEHOLDER ── */}
    </div>
  );
}
