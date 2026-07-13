"use client";

import { useEffect } from "react";

export default function HilltopAds() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if script is already injected to prevent duplication
    const scriptId = "hilltopads-script";
    if (document.getElementById(scriptId)) return;

    try {
      const s = document.createElement("script") as HTMLScriptElement & {
        settings?: Record<string, unknown>;
      };
      s.id = scriptId;
      s.src = "//pricklyassociation.com/bRXYVrsfd.GDlK0KYcWUcj/AeQmi9cuwZ/U_lWkeP/T/cxyuMWTJgy5mMJTVMTt/NTzUIAxKOqD/kjx/N/wO";
      s.async = true;
      s.referrerPolicy = "no-referrer-when-downgrade";
      s.settings = {};

      document.head.appendChild(s);
    } catch (e) {
      console.error("Error loading HilltopAds:", e);
    }
  }, []);

  return null;
}
