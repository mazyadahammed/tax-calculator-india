import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}. We do not collect personal data. Learn how we handle analytics and advertising cookies.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
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
          <li className="text-gray-900 dark:text-white font-medium">Privacy Policy</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
        Last updated: July 2025
      </p>

      <div className="space-y-8 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            1. Overview
          </h2>
          <p>
            {SITE_NAME} is committed to protecting your privacy. This page explains what information we collect (or do not collect), how the site operates, and how third-party services we use may interact with your browser.
          </p>
          <p className="mt-2">
            <strong>The short version:</strong> We do not ask you to create an account, log in, or provide any personal information. All calculator inputs are processed entirely inside your browser and are never transmitted to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            2. Data We Do Not Collect
          </h2>
          <p>We do not collect, store, or process:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Your name, email address, phone number, or any contact information.</li>
            <li>Your income figures, deduction details, or any values you enter into our calculators.</li>
            <li>Your PAN, Aadhaar, or any government identification number.</li>
            <li>Payment information of any kind.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            3. How the Calculator Works
          </h2>
          <p>
            All tax calculations are performed entirely in your browser using JavaScript. No input data is sent to any server, database, or third party. When you close or refresh the page, your inputs are gone — we have no record of them.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            4. Analytics
          </h2>
          <p>
            We may use a privacy-respecting analytics tool (such as Google Analytics with IP anonymisation enabled, or a cookieless alternative like Plausible or Umami) to understand aggregate traffic patterns — for example, which pages are visited most or where visitors are located by country. This data is:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Aggregated and anonymous — it cannot be used to identify you personally.</li>
            <li>Used only to improve site content and performance.</li>
            <li>Never sold to third parties.</li>
          </ul>
          <p className="mt-2">
            If we enable analytics, we will update this section with the specific tool and its data processing terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            5. Advertising (Google AdSense)
          </h2>
          <p>
            This website displays advertisements served by <strong>Google AdSense</strong>. Google may use cookies and similar tracking technologies to serve personalised advertisements based on your browsing history across websites.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              You can opt out of personalised ads at{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                google.com/settings/ads
              </a>
              .
            </li>
            <li>
              You can also opt out via the{" "}
              <a
                href="https://optout.aboutads.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Digital Advertising Alliance
              </a>
              .
            </li>
            <li>
              Google&apos;s full privacy policy is available at{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                policies.google.com/privacy
              </a>
              .
            </li>
          </ul>
          <p className="mt-2">
            We do not control the cookies placed by Google AdSense and are not responsible for their data collection practices.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            6. Cookies
          </h2>
          <p>
            {SITE_NAME} itself does not set any first-party cookies. Any cookies present in your browser when visiting this site are set exclusively by third-party services (e.g., Google AdSense for advertising). You can manage or delete cookies through your browser settings at any time.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            7. Children&apos;s Privacy
          </h2>
          <p>
            This site is not directed at children under the age of 13. We do not knowingly collect any information from children.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be reflected on this page with a revised &quot;Last updated&quot; date. We encourage you to review this page periodically.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            9. Contact
          </h2>
          <p>
            If you have questions about this Privacy Policy, you may contact us at the email address listed on our website. We aim to respond within 7 business days.
          </p>
        </section>

        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400">
          <p>
            See also:{" "}
            <Link href="/disclaimer" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              Disclaimer
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
