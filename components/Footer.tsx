import Link from "next/link";

const PILLAR_LINKS = [
  { href: "/start-here",      label: "Start Here" },
  { href: "/investing",       label: "Investing Basics" },
  { href: "/debt",            label: "Debt Payoff" },
  { href: "/savings",         label: "Savings Goals" },
  { href: "/country-guides",  label: "Country Guides" },
];

const CALC_LINKS = [
  { href: "/in",             label: "India Tax Calculator" },
  { href: "/ae",             label: "UAE Gratuity Calculator" },
  { href: "/hra",            label: "HRA Exemption" },
  { href: "/salary",         label: "Salary Calculator" },
  { href: "/calculators",    label: "All Calculators" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-3 col-span-1 sm:col-span-2">
            <span className="text-lg font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              ThinkFinance
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Fast, accurate personal finance guides and calculators — free, globally accessible, and always run locally in your browser.
            </p>
          </div>

          {/* Pillars List */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Guides</h3>
            <ul className="space-y-2">
              {PILLAR_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Calculators list */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Calculators</h3>
            <ul className="space-y-2">
              {CALC_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Legal</h3>
            <ul className="space-y-2">
              {[
                { href: "/about",      label: "About Us" },
                { href: "/contact",    label: "Contact" },
                { href: "/disclaimer", label: "Disclaimer" },
                { href: "/privacy",    label: "Privacy Policy" },
                { href: "/terms",      label: "Terms of Use" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-2">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed text-center">
            <strong>Disclaimer:</strong> All calculations on ThinkFinance are for illustrative and informational purposes only.
            Tax rules change frequently. Please consult a qualified Chartered Accountant or tax advisor before filing your return.
          </p>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center">
            &copy; {new Date().getFullYear()} ThinkFinance — Not affiliated with the Income Tax Department of India.
          </p>
        </div>
      </div>
    </footer>
  );
}
