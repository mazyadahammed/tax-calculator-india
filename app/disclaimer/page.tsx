import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Read the disclaimer for ${SITE_NAME}. Calculations are illustrative estimates only and do not constitute professional tax or financial advice.`,
  alternates: { canonical: `${SITE_URL}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900 dark:text-white font-medium">Disclaimer</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
        Disclaimer
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
        Last updated: July 2025
      </p>

      <div className="space-y-8 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            1. For Information Only
          </h2>
          <p>
            {SITE_NAME} is a free online tool that helps users estimate their income tax liability under the Old and New Tax Regimes for Financial Year 2025-26 (Assessment Year 2026-27). All calculations, comparisons, and results displayed on this website are provided strictly for <strong>informational and illustrative purposes</strong>.
          </p>
          <p className="mt-2">
            Nothing on this website constitutes professional tax advice, legal advice, financial planning advice, or any other regulated advisory service.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            2. Accuracy of Calculations
          </h2>
          <p>
            We make every effort to keep our tax logic accurate and up to date with the latest Union Budget announcements and Income Tax Act provisions. However:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Tax rules are subject to frequent amendments by the Government of India.</li>
            <li>Interpretation of tax provisions can vary across practitioners and tax authorities.</li>
            <li>The calculators make simplifying assumptions (e.g., standard salary structures, uniform deduction categories) that may not reflect your exact situation.</li>
            <li>Surcharge, marginal relief, and special tax treatments (e.g., for capital gains, perquisites, or foreign income) may not be fully captured.</li>
          </ul>
          <p className="mt-2">
            <strong>We do not guarantee that results produced by this site are complete, accurate, or current.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            3. Not a Substitute for Professional Advice
          </h2>
          <p>
            Before making any tax-related decisions — including choosing between tax regimes, claiming deductions, filing your Income Tax Return (ITR), or planning investments — please consult a qualified and registered:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Chartered Accountant (CA)</li>
            <li>Tax Consultant or Tax Advisor</li>
            <li>Company Secretary or Legal Counsel (for business-related matters)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            4. No Affiliation with Government Bodies
          </h2>
          <p>
            {SITE_NAME} is an independent website. It is <strong>not affiliated with, endorsed by, or connected to</strong> the Income Tax Department of India, the Central Board of Direct Taxes (CBDT), the Ministry of Finance, or any other government body. Official tax information should always be verified at{" "}
            <a
              href="https://www.incometax.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              incometax.gov.in
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            5. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, {SITE_NAME} and its operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of, or reliance on, the information or calculations provided on this website. This includes, but is not limited to, tax penalties, interest, or losses arising from incorrect tax filings.
          </p>
          <p className="mt-2">
            Use of this website is entirely at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            6. External Links
          </h2>
          <p>
            This website may contain links to external websites for reference. We do not endorse and are not responsible for the accuracy or content of any third-party websites.
          </p>
        </section>

        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400">
          <p>
            See also:{" "}
            <Link href="/privacy" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              Terms of Use
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
