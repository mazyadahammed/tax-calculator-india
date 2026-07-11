import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${SITE_NAME}. By using this site you agree to use results as estimates only and accept our limitation of liability.`,
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
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
          <li className="text-gray-900 dark:text-white font-medium">Terms of Use</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
        Terms of Use
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
        Last updated: July 2025
      </p>

      <div className="space-y-8 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using {SITE_NAME} (&quot;the Site&quot;), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            2. Nature of the Service
          </h2>
          <p>
            {SITE_NAME} provides free, browser-based income tax estimation tools for Indian taxpayers. The Site is intended to help users understand and compare their approximate tax liability under the Old and New Tax Regimes for FY 2025-26 and FY 2026-27.
          </p>
          <p className="mt-2">
            The Site does not:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>File income tax returns on your behalf.</li>
            <li>Store or transmit your financial data.</li>
            <li>Provide certified or professional tax advice.</li>
            <li>Guarantee the accuracy or completeness of any calculation result.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            3. Use at Your Own Risk
          </h2>
          <p>
            You use this Site and rely on its outputs entirely at your own risk. Results are estimates based on simplified assumptions and publicly available tax rules. They may not account for your specific financial circumstances, recent regulatory changes, or special tax treatments applicable to your income.
          </p>
          <p className="mt-2">
            Always verify your tax liability with a qualified Chartered Accountant (CA) or a registered tax professional before filing your Income Tax Return.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            4. No Warranty
          </h2>
          <p>
            This Site is provided on an <strong>&quot;as is&quot; and &quot;as available&quot;</strong> basis without any warranties of any kind, either express or implied. We do not warrant that:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>The Site will be uninterrupted, error-free, or free of viruses.</li>
            <li>The results produced are accurate, complete, or current.</li>
            <li>The Site will meet your specific requirements.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            5. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, {SITE_NAME} and its operators shall not be responsible or liable for any loss, damage, penalty, interest, or expense of any nature arising out of:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Your use of or reliance on any calculator result from this Site.</li>
            <li>Errors or omissions in the tax rules implemented by the Site.</li>
            <li>Any decisions made on the basis of information obtained from this Site.</li>
            <li>Temporary unavailability of the Site for any reason.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            6. Intellectual Property
          </h2>
          <p>
            All content on this Site — including text, calculator logic, design, and code — is the property of {SITE_NAME} unless otherwise stated. You may use the Site for personal, non-commercial purposes. You may not reproduce, redistribute, or commercially exploit any part of this Site without our express written permission.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            7. Third-Party Services
          </h2>
          <p>
            This Site may display advertisements through Google AdSense and may use analytics tools to understand aggregate usage. These third-party services have their own terms and privacy policies, which govern their data practices. We are not responsible for the content or practices of these services.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            8. Modifications
          </h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. Updated terms will be posted on this page with a revised &quot;Last updated&quot; date. Continued use of the Site after changes constitutes your acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            9. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes arising from the use of this Site shall be subject to the exclusive jurisdiction of the courts of India.
          </p>
        </section>

        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400">
          <p>
            See also:{" "}
            <Link href="/disclaimer" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              Disclaimer
            </Link>{" "}
            ·{" "}
            <Link href="/privacy" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
