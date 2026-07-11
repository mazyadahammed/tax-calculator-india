// Dynamic OG image generated at build time via Next.js Edge Runtime.
// Output: /opengraph-image.png (auto-linked by Next.js metadata system)
//
// Shared by all pages via layout metadata. Each page can override with
// its own opengraph-image.tsx if needed.

import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/siteConfig";

export const runtime = "edge";
export const alt = `Income Tax Calculator FY 2025-26 | ${SITE_NAME}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "64px",
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top badge */}
        <div
          style={{
            position: "absolute",
            top: "48px",
            left: "64px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "99px",
              padding: "6px 16px",
              color: "#d1fae5",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Free · Instant · No Signup
          </div>
        </div>

        {/* Main heading */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            India Income Tax
            <br />
            Calculator
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "#a7f3d0",
              lineHeight: 1.4,
            }}
          >
            Old vs New Regime · FY 2025-26 · Budget 2025
          </div>
        </div>

        {/* Pill badges */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "48px" }}>
          {["₹12L Zero Tax (New Regime)", "HRA Calculator", "Take-Home Salary"].map(
            (label) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  color: "#ecfdf5",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            )
          )}
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#6ee7b7",
            letterSpacing: "0.02em",
          }}
        >
          {SITE_NAME}
        </div>
      </div>
    ),
    { ...size }
  );
}
