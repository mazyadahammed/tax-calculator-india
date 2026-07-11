import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSidebar from "@/components/AdSidebar";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import Script from "next/script";

// ---------------------------------------------------------------------------
// ADSENSE ACTIVATION CHECKLIST
// ---------------------------------------------------------------------------
// 1. Sign up at https://adsense.google.com and verify your site.
// 2. Uncomment the <Script> tag below, replacing YOUR_PUBLISHER_ID.
// 3. In each <AdSlot> component, swap the placeholder <div> with your <ins>.
// 4. Update public/ads.txt with your real publisher ID.
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `Income Tax Calculator FY 2025-26 | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Compare Old vs New tax regimes under Budget 2025 rules. Calculate take-home salary, HRA exemption, and more. Fast, free, and mobile-friendly.",

  // Canonical — layout-level default; each page overrides with its own path.
  alternates: {
    canonical: "/",
  },

  // Open Graph defaults (shared across all pages unless overridden)
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    // The dynamic /opengraph-image.png is picked up automatically by Next.js.
    // Explicit fallback for platforms that don't follow the spec:
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `Income Tax Calculator FY 2025-26 | ${SITE_NAME}`,
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    site: "@taxtool_in",   // Update to your real Twitter handle
    images: [`${SITE_URL}/opengraph-image.png`],
  },

  // Indexing directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Search Console Verification
  verification: {
    google: "GAI5uKnasm-IGU6V8tMaj8Bx6Reh_5NChc8qKwOZLO4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6101534407339968"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 flex flex-col min-h-screen">
        <Header />

        <div className="flex-grow flex items-start gap-0 xl:gap-4 max-w-[1440px] mx-auto w-full">
          <AdSidebar />
          <main className="flex-1 min-w-0 w-full">
            {children}
          </main>
          <AdSidebar />
        </div>

        <Footer />
      </body>
    </html>
  );
}
