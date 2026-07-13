import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `Contact Us | ${SITE_NAME}`,
  description: "Get in touch with the team at Clarvio for questions, suggestions, or feedback regarding our tax calculators.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Contact Us
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            We value your feedback and suggestions. Please get in touch.
          </p>
        </div>

        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-center">
          <p>
            For any queries, calculations support, feedback, or potential advertising opportunities, please email us directly:
          </p>
          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 select-all">
            support@clarvio.vercel.app
          </p>
          <p className="text-xs text-gray-400">
            We generally respond within 24 to 48 business hours.
          </p>
        </div>
      </div>
    </div>
  );
}
