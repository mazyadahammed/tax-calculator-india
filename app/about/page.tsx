import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `About Us | ${SITE_NAME}`,
  description: "Learn more about the team behind ThinkFinance, our mission, values, and how we build accurate, privacy-first tax calculators.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            About <span className="text-emerald-600 dark:text-emerald-400">{SITE_NAME}</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Providing transparent, secure, and expert financial tools for Indian taxpayers.
          </p>
        </div>

        {/* Mission statement */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Our Mission</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Tax planning in India shouldn&apos;t require paying high professional fees or exposing your sensitive salary details. Our calculators run <strong>100% locally in your browser</strong>. We never store, collect, or transmit your financial data to any server.
          </p>
        </div>

        {/* E-E-A-T Bio Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Our Team & Expertise</h2>
          
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Author Profile Picture Placeholder */}
            <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950 flex-shrink-0 flex items-center justify-center border-2 border-emerald-500">
              <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">TF</span>
            </div>

            <div className="space-y-3 flex-1 text-center md:text-left">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Mazyad Ahamed
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  Founder & Principal Developer
                </p>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Mazyad is a software engineer passionate about personal finance and building client-side web tools. By combining financial math with modern SEO practices, he builds lightweight, high-performance financial engines.
              </p>

              {/* PLACEHOLDERS FOR EXTERNAL VERIFICATION */}
              <div className="text-xs text-gray-400 dark:text-gray-500 italic space-y-1">
                <p>💡 Add your LinkedIn or Twitter link here.</p>
                <p>🎓 Verified using official guidelines issued by the Income Tax Department of India.</p>
              </div>

              <div className="pt-2">
                <a
                  href="https://linkedin.com/in/placeholder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
                >
                  Connect on LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-4 shadow-sm text-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Contact & Feedback</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mx-auto">
            Have suggestions or found a bug? We&apos;d love to hear from you. Get in touch at:
          </p>
          <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            support@thinkfinance.vercel.app
          </p>
        </div>
      </div>
    </div>
  );
}
