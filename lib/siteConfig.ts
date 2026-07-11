// Single source of truth for all SEO and schema references.
// Update SITE_URL before deploying to production.
export const SITE_URL = "https://taxtool.in";
export const SITE_NAME = "TaxTool.in";

export const PAGES = {
  home:       { path: "/",           priority: 1.0, changeFreq: "weekly"  as const },
  compare:    { path: "/compare",    priority: 0.9, changeFreq: "monthly" as const },
  hra:        { path: "/hra",        priority: 0.8, changeFreq: "monthly" as const },
  salary:     { path: "/salary",     priority: 0.8, changeFreq: "monthly" as const },
  disclaimer: { path: "/disclaimer", priority: 0.5, changeFreq: "yearly"  as const },
  privacy:    { path: "/privacy",    priority: 0.5, changeFreq: "yearly"  as const },
  terms:      { path: "/terms",      priority: 0.5, changeFreq: "yearly"  as const },
} satisfies Record<string, { path: string; priority: number; changeFreq: "weekly" | "monthly" | "yearly" }>;
