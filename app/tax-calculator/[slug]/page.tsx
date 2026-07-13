import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/siteConfig";
import { getSalaryConfigs, SALARY_LPAS } from "@/lib/salaryData";
import fyData from "@/data/tax-years/fy-2025-26.json";
import { TaxYearConfig, compareRegimes } from "@/lib/tax";
import VerificationBadge from "@/components/VerificationBadge";
import AffiliateSavings from "@/components/AffiliateSavings";
import AudienceCapture from "@/components/AudienceCapture";
import SchemaScript from "@/components/SchemaScript";
import { webApplicationSchema, breadcrumbSchema } from "@/lib/schema";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const configs = getSalaryConfigs();
  return configs.map((c) => ({
    slug: `${c.slug}-old-vs-new`,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const configs = getSalaryConfigs();
  const rawSlug = params.slug.replace("-old-vs-new", "");
  const config = configs.find((c) => c.slug === rawSlug);

  if (!config) return {};

  const title = `Old vs New Tax Regime for ${config.lpa} LPA Package | Slab Comparison FY 2025-26`;
  const description = `Find the exact tax liability for an income of ₹${config.lpa} Lakhs (LPA) in India. Detailed side-by-side slabs, surcharges, and deductions comparison for FY 2025-26.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/tax-calculator/${params.slug}` },
  };
}

export default function TaxCalculatorLpaPage({ params }: Props) {
  const configs = getSalaryConfigs();
  const rawSlug = params.slug.replace("-old-vs-new", "");
  const currentConfig = configs.find((c) => c.slug === rawSlug);

  if (!currentConfig) {
    notFound();
  }

  const lpa = currentConfig.lpa;
  const grossSalary = lpa * 100000;
  const taxConfig = fyData as unknown as TaxYearConfig;

  const basicSalary = grossSalary * 0.5;
  const epfMonthly = Math.round((basicSalary * 0.12) / 12);
  
  const income = { grossSalary, otherIncome: 0, ageCategory: "general" as const };
  const deductions = {
    basicSection80C: Math.min(150000, epfMonthly * 12),
    medicalSection80D: 0,
    homeLoanInterest24B: 0,
    nps80CCD1B: 0,
    employerNps80CCD2: 0,
    hraExemption: 0,
    ltaExemption: 0,
    otherDeductions: 0,
    professionalTax: 2400,
  };

  const results = compareRegimes(income, deductions, taxConfig);

  // Neighbor pages
  const currentIndex = SALARY_LPAS.indexOf(lpa);
  const neighborLpas = SALARY_LPAS.filter((_, idx) => Math.abs(idx - currentIndex) <= 2 && idx !== currentIndex);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const schemas = [
    webApplicationSchema({
      name: `Old vs New Tax Regime Comparison for ${lpa} LPA`,
      description: `Detailed slab breakdown and regime comparison for ${lpa} LPA package.`,
      path: `/tax-calculator/${params.slug}`,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Salary Hub", path: "/salary-hub" },
      { name: `${lpa} LPA Comparison`, path: `/tax-calculator/${params.slug}` },
    ]),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <SchemaScript schemas={schemas} />

      {/* Verification & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <VerificationBadge />
        <nav className="text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-emerald-500">Home</Link>
          <span className="mx-1">/</span>
          <Link href="/salary-hub" className="hover:text-emerald-500">Salary Hub</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-900 dark:text-white font-medium">{lpa} LPA Tax</span>
        </nav>
      </div>

      {/* Main Details */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          ₹{lpa} LPA Tax Slab & Regime Comparison
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Detailed side-by-side tax computations under Old vs New Regimes for an income of {lpa} Lakhs.
        </p>
      </div>

      {/* Regime Verdict Banner */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-xl p-6 space-y-2 shadow-sm text-center">
        <h3 className="text-xs font-semibold uppercase tracking-wider opacity-90">Recommendation</h3>
        <p className="text-2xl font-bold">
          {results.betterRegime === "new" ? "New Tax Regime" : "Old Tax Regime"} is Better!
        </p>
        <p className="text-sm opacity-95">
          You save a total of <span className="font-extrabold">{formatCurrency(results.taxSaved)}</span> annually by choosing this regime.
        </p>
      </div>

      {/* Detailed comparison tables */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
          Tax Computation Breakdown
        </h2>

        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-3 font-semibold text-gray-400 text-xs tracking-wider pb-1">
            <span>Particulars</span>
            <span className="text-right">New Regime</span>
            <span className="text-right">Old Regime</span>
          </div>

          <div className="grid grid-cols-3">
            <span className="text-gray-500">Gross annual income</span>
            <span className="text-right">{formatCurrency(results.newRegime.grossIncome)}</span>
            <span className="text-right">{formatCurrency(results.oldRegime.grossIncome)}</span>
          </div>

          <div className="grid grid-cols-3 text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Standard & deductions</span>
            <span className="text-right">-{formatCurrency(results.newRegime.totalDeductions)}</span>
            <span className="text-right">-{formatCurrency(results.oldRegime.totalDeductions)}</span>
          </div>

          <div className="grid grid-cols-3 border-t border-gray-100 dark:border-gray-800 pt-2 font-bold text-gray-900 dark:text-white">
            <span>Taxable Income</span>
            <span className="text-right">{formatCurrency(results.newRegime.netTaxableIncome)}</span>
            <span className="text-right">{formatCurrency(results.oldRegime.netTaxableIncome)}</span>
          </div>

          <div className="grid grid-cols-3">
            <span>Base slab tax</span>
            <span className="text-right">{formatCurrency(results.newRegime.taxOnIncome)}</span>
            <span className="text-right">{formatCurrency(results.oldRegime.taxOnIncome)}</span>
          </div>

          <div className="grid grid-cols-3 text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Section 87A rebate</span>
            <span className="text-right">-{formatCurrency(results.newRegime.rebate87A)}</span>
            <span className="text-right">-{formatCurrency(results.oldRegime.rebate87A)}</span>
          </div>

          <div className="grid grid-cols-3">
            <span>Education Cess (4%)</span>
            <span className="text-right">{formatCurrency(results.newRegime.cess)}</span>
            <span className="text-right">{formatCurrency(results.oldRegime.cess)}</span>
          </div>

          <div className="grid grid-cols-3 border-t border-gray-100 dark:border-gray-800 pt-2 font-extrabold text-base text-emerald-600 dark:text-emerald-400">
            <span>Total tax liability</span>
            <span className="text-right">{formatCurrency(results.newRegime.totalTax)}</span>
            <span className="text-right">{formatCurrency(results.oldRegime.totalTax)}</span>
          </div>
        </div>
      </div>

      {/* Affiliate recommendations */}
      <AffiliateSavings />

      {/* Audience Capture Form */}
      <AudienceCapture />

      {/* Nearby Links */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Related Tax Slabs Comparisons</h3>
        <div className="flex flex-wrap gap-3">
          {neighborLpas.map((nlpa) => (
            <Link
              key={nlpa}
              href={`/tax-calculator/${nlpa}-lpa-old-vs-new`}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              {nlpa} LPA Slabs Comparison →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
