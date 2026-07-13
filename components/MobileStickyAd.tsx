"use client";

import React, { useEffect, useRef, useState } from "react";

export default function MobileStickyAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || !isVisible) return;

    // Clear inner container
    containerRef.current.innerHTML = "";

    try {
      const script = document.createElement("script") as HTMLScriptElement & {
        settings?: Record<string, unknown>;
      };
      script.text = `
        (function(klcm){
          var d = document,
              s = d.createElement('script'),
              l = d.scripts[d.scripts.length - 1];
          s.settings = klcm || {};
          s.src = "\\/\\/pricklyassociation.com\\/bmXqV.sGdyGalI0PYhWZcn\\/Reqm\\/9puiZbU\\/lUkxPtTjcdy\\/M_Togf5JNrzhcdtLNNzUInxyOUDfkh4qMuQQ";
          s.async = true;
          s.referrerPolicy = 'no-referrer-when-downgrade';
          l.parentNode.insertBefore(s, l);
        })({});
      `;

      containerRef.current.appendChild(script);
    } catch (e) {
      console.error("Error loading MobileStickyAd:", e);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex flex-col items-center bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pb-safe">
      {/* Close button row */}
      <div className="w-full flex justify-end px-2 pt-1">
        <button
          onClick={() => setIsVisible(false)}
          className="text-[10px] font-bold text-gray-500 hover:text-gray-800 dark:hover:text-white bg-gray-100 dark:bg-gray-900 rounded-full px-2 py-0.5 border border-gray-250 dark:border-gray-850 transition-colors"
          type="button"
        >
          Close [X]
        </button>
      </div>

      {/* Script target wrapper */}
      <div
        ref={containerRef}
        className="w-[300px] h-[100px] flex justify-center items-center overflow-hidden"
      />
    </div>
  );
}
