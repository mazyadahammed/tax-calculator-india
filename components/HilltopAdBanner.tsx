"use client";

import React, { useEffect, useRef } from "react";

interface HilltopAdBannerProps {
  className?: string;
}

export default function HilltopAdBanner({ className = "" }: HilltopAdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // Clear previous script or ad inside this container if any to prevent duplicates during re-renders
    containerRef.current.innerHTML = "";

    try {
      const script = document.createElement("script");
      script.text = `
        (function(xpxum){
          var d = document,
              s = d.createElement('script'),
              l = d.scripts[d.scripts.length - 1];
          s.settings = xpxum || {};
          s.src = "\\/\\/pricklyassociation.com\\/bRXYVrsfd.GDlK0KYcWUcj\\/AeQmi9cuwZ\\/U_lWkeP\\/T\\/cxyuMWTJgy5mMJTVMTt\\/NTzUIAxKOqD\\/kjx\\/N\\/wO";
          s.async = true;
          s.referrerPolicy = 'no-referrer-when-downgrade';
          l.parentNode.insertBefore(s, l);
        })({});
      `;

      containerRef.current.appendChild(script);
    } catch (e) {
      console.error("Error loading HilltopAdBanner:", e);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`ad-container flex justify-center items-center my-6 min-h-[250px] bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-lg overflow-hidden ${className}`}
    />
  );
}
