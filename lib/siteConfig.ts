// Single source of truth for all SEO and schema references.
// Update SITE_URL before deploying to production.
export const SITE_URL = "https://thinkfinance.vercel.app";
export const SITE_NAME = "Clarvio";
export const LAST_REVIEWED_DATE = "July 2026";
export const TAX_YEAR_VERIFIED = "FY 2025-26";

export const PAGES = {
  home:             { path: "/",                 priority: 1.0, changeFreq: "weekly"  as const },
  startHere:        { path: "/start-here",       priority: 0.9, changeFreq: "monthly" as const },
  investing:        { path: "/investing",        priority: 0.9, changeFreq: "monthly" as const },
  debt:             { path: "/debt",             priority: 0.9, changeFreq: "monthly" as const },
  savings:          { path: "/savings",          priority: 0.9, changeFreq: "monthly" as const },
  calculators:      { path: "/calculators",      priority: 0.8, changeFreq: "monthly" as const },
  countryGuides:    { path: "/country-guides",   priority: 0.8, changeFreq: "monthly" as const },
  indiaCalculator:  { path: "/in",               priority: 0.8, changeFreq: "monthly" as const },
  uaeCalculator:    { path: "/ae",               priority: 0.8, changeFreq: "monthly" as const },
  compare:          { path: "/compare",          priority: 0.8, changeFreq: "monthly" as const },
  hra:              { path: "/hra",              priority: 0.8, changeFreq: "monthly" as const },
  salary:           { path: "/salary",           priority: 0.8, changeFreq: "monthly" as const },
  multipleForm16:   { path: "/multiple-form16",   priority: 0.8, changeFreq: "monthly" as const },
  freelancerTax:    { path: "/freelancer-tax-44ada", priority: 0.8, changeFreq: "monthly" as const },
  salaryHub:        { path: "/salary-hub",       priority: 0.7, changeFreq: "monthly" as const },
  about:            { path: "/about",            priority: 0.6, changeFreq: "monthly" as const },
  contact:          { path: "/contact",          priority: 0.6, changeFreq: "monthly" as const },
  disclaimer:       { path: "/disclaimer",       priority: 0.5, changeFreq: "yearly"  as const },
  privacy:          { path: "/privacy",          priority: 0.5, changeFreq: "yearly"  as const },
  terms:            { path: "/terms",            priority: 0.5, changeFreq: "yearly"  as const },
} satisfies Record<string, { path: string; priority: number; changeFreq: "weekly" | "monthly" | "yearly" }>;
