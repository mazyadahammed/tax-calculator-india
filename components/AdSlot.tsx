"use client";

import { useEffect } from "react";

interface AdSlotProps {
  id: string;
  /** Standard IAB ad sizes:
   *  horizontal  → 728×90  Leaderboard (shrinks to 320×50 on mobile)
   *  rectangle   → 336×280 Large Rectangle (best CTR for sidebar)
   *  vertical    → 160×600 Wide Skyscraper (desktop sidebar only)
   */
  format?: "horizontal" | "rectangle" | "vertical";
  className?: string;
  adSlotId?: string; // Optional real Google AdSense ad slot ID
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
  adSlotId,
}: AdSlotProps) {
  const s = SIZE[format];

  // Initialize the ad slot when the component mounts
  useEffect(() => {
    if (adSlotId) {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
      } catch (err) {
        console.error("AdSense error inside AdSlot:", err);
      }
    }
  }, [adSlotId]);

  return (
    <div
      id={id}
      className={`${s.wrapper} ${className} overflow-hidden`}
      aria-label="Advertisement"
      data-ad-format={format}
    >
      {adSlotId ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client="ca-pub-6101534407339968"
          data-ad-slot={adSlotId}
          data-ad-format={format === "vertical" ? "vertical" : "auto"}
          data-full-width-responsive={format !== "vertical" ? "true" : "false"}
        />
      ) : (
        /* ── PLACEHOLDER – renders when no real adSlotId is provided ── */
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
      )}
    </div>
  );
}
