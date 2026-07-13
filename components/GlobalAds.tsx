"use client";

import { useEffect } from "react";

export default function GlobalAds() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load Popunder script
    const popunderId = "hilltop-popunder";
    if (!document.getElementById(popunderId)) {
      try {
        const s = document.createElement("script");
        s.id = popunderId;
        s.src = "https://elementarywhole.com/bK3NVF0CP.3IpevabEm-V/J/ZdDd0u3iM/jBEp4zO/TZgy5VLITecayJMGTcg/5JO_TGMV";
        s.async = true;
        document.head.appendChild(s);
      } catch (e) {
        console.error("Error loading popunder:", e);
      }
    }

    // Load In-page Push script
    const pushId = "hilltop-inpage-push";
    if (!document.getElementById(pushId)) {
      try {
        const s = document.createElement("script") as HTMLScriptElement & {
          settings?: Record<string, unknown>;
        };
        s.id = pushId;
        s.src = "//pricklyassociation.com/byX.V/sdd/GUlG0/YxW/cG/MeGmI9Fu/ZHUglhkxPuTQcDyTMXT_kMwcMoTpMjtJN/zbIwx/OCT/A/xTNqwm";
        s.async = true;
        s.referrerPolicy = "no-referrer-when-downgrade";
        s.settings = {};
        document.head.appendChild(s);
      } catch (e) {
        console.error("Error loading in-page push:", e);
      }
    }
  }, []);

  return null;
}
