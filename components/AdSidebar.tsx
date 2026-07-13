// ---------------------------------------------------------------------------
// AdSidebar — sticky desktop sidebar ad column.
//
// Renders a 160×600 Skyscraper ad that stays visible as users scroll
// through calculator results. Only shown on large screens (lg+) to avoid
// crowding mobile viewports.
//
// HOW TO ACTIVATE:
//   Replace the <AdSlot> inside with a real AdSense Skyscraper unit.
//   Keep the sticky + hidden lg:block wrapper intact.
// ---------------------------------------------------------------------------

import AdSlot from "./AdSlot";

export default function AdSidebar() {
  return (
    // Hidden on mobile — only appears on lg+ (1024px+) screens.
    // This avoids harming mobile CLS or viewport crowding.
    <aside className="hidden xl:block w-[180px] flex-shrink-0">
      {/* sticky so the ad stays in view as users scroll */}
      <div className="sticky top-24">
        {/*
          TO REPLACE:
          Swap <AdSlot> below with:
            <ins
              className="adsbygoogle"
              style={{ display: "block", width: "160px", height: "600px" }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot="XXXXXXXXXX"
            />
        */}
        <AdSlot id="sidebar-skyscraper" format="vertical" adSlotId="8014929809" />
      </div>
    </aside>
  );
}
