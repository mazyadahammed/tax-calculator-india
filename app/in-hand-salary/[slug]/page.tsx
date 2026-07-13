import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/siteConfig";
import { getSalaryConfigs, SALARY_LPAS } from "@/lib/salaryData";
import fyData from "@/data/tax-years/fy-2025-26.json";
import { TaxYearConfig, compareRegimes, calculateTakeHome } from "@/lib/tax";
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
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const configs = getSalaryConfigs();
  const config = configs.find((c) => c.slug === params.slug);

  if (!config) return {};

  const title = `In-Hand Salary for ${config.lpa} LPA Package | Monthly Deductions FY 2025-26`;
  const description = `Calculate the monthly net take-home salary, EPF, and Professional Tax deductions for a gross annual CTC of ₹${config.lpa} Lakhs (LPA) in India under latest tax rules.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/in-hand-salary/${params.slug}` },
  };
}

export default function InHandSalaryPage({ params }: Props) {
  const configs = getSalaryConfigs();
  const currentConfig = configs.find((c) => c.slug === params.slug);

  if (!currentConfig) {
    notFound();
  }

  const lpa = currentConfig.lpa;
  const grossSalary = lpa * 100000;
  const taxConfig = fyData as unknown as TaxYearConfig;

  // Let's assume standard employee deductions for monthly projection:
  // Standard Professional tax = 2400/yr, 12% of basic (assuming basic is 50% of gross)
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
  const activeTax = results.betterRegime === "old" ? results.oldRegime.totalTax : results.newRegime.totalTax;
  const takeHome = calculateTakeHome(income, deductions, activeTax, epfMonthly);

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
      name: `In-Hand Salary for ${lpa} LPA`,
      description: `Detailed tax deductions and monthly in-hand projection for ${lpa} LPA.`,
      path: `/in-hand-salary/${params.slug}`,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Salary Hub", path: "/salary-hub" },
      { name: `${lpa} LPA In-Hand`, path: `/in-hand-salary/${params.slug}` },
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
          <span className="text-gray-900 dark:text-white font-medium">{lpa} LPA</span>
        </nav>
      </div>

      {/* Main Details */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          ₹{lpa} LPA In-Hand Salary Breakdown
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Calculated monthly in-hand/net payout for a gross package of {lpa} Lakhs Per Annum.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Salary Breakdown Table */}
        <div className="md:col-span-7 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
            Monthly Payout Estimates
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Gross Monthly Salary</span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(takeHome.grossMonthly)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Provident Fund (EPF)</span>
              <span>-{formatCurrency(takeHome.monthlyDeductions.epf)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Professional Tax</span>
              <span>-{formatCurrency(takeHome.monthlyDeductions.professionalTax)}</span>
            </div>
            <div className="flex justify-between text-red-500 border-b border-gray-100 dark:border-gray-800 pb-3">
              <span>Income Tax TDS (Best Regime)</span>
              <span>-{formatCurrency(takeHome.monthlyDeductions.incomeTax)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-emerald-600 dark:text-emerald-400 pt-2">
              <span>Net Take-Home Salary</span>
              <span>{formatCurrency(takeHome.netTakeHome)} / month</span>
            </div>
          </div>

          <div className="pt-2 text-xs text-gray-400">
            * Assumptions: Basic salary is 50% of annual CTC. PF deduction is 12% of basic. Regime chosen automatically based on maximum savings.
          </div>
        </div>

        {/* Right: Quick Regime Verdict */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-xl p-6 space-y-3 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-90">Best Regime Verdict</h3>
          <p className="text-xl font-bold">
            {results.betterRegime === "new" ? "New Tax Regime" : "Old Tax Regime"} is Better
          </p>
          <p className="text-xs opacity-95">
            By opting for the recommended regime, you save {formatCurrency(results.taxSaved)} in annual taxes compared to the other regime.
          </p>
          <div className="pt-2">
            <Link
              href={`/tax-calculator/${params.slug}-old-vs-new`}
              className="inline-block px-3 py-1.5 bg-white text-emerald-700 text-xs font-bold rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              Compare Slabs & Surcharges →
            </Link>
          </div>
        </div>
      </div>

      {/* Affiliate options */}
      <AffiliateSavings />

      {/* Audience Capture Form */}
      <AudienceCapture />

      {/* Nearby Links */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Related LPA Breakdowns</h3>
        <div className="flex flex-wrap gap-3">
          {neighborLpas.map((nlpa) => (
            <Link
              key={nlpa}
              href={`/in-hand-salary/${nlpa}-lpa`}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              {nlpa} LPA In-Hand Salary →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
