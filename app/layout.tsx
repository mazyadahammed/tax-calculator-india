import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalAds from "@/components/GlobalAds";
import MobileStickyAd from "@/components/MobileStickyAd";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  referrer: "no-referrer-when-downgrade",

  title: {
    default: `Personal Finance Guides & Calculators | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free personal finance guides and calculators for budgeting, investing, debt payoff, and savings. Country-specific tools for India, UAE, and more.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `Personal Finance Guides & Calculators | ${SITE_NAME}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@thinkfinance_in",
    images: [`${SITE_URL}/opengraph-image.png`],
  },

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

  verification: {
    google: "GAI5uKnasm-IGU6V8tMaj8Bx6Reh_5NChc8qKwOZLO4",
  },

  other: {
    // HilltopAds site ownership verification
    "3941aaa8590915f93b00be7153271065bcefd6d9":
      "3941aaa8590915f93b00be7153271065bcefd6d9",
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
      </head>
      <body className="antialiased bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 flex flex-col min-h-screen pb-[110px] md:pb-0">
        <GlobalAds />
        <Header />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
        <MobileStickyAd />
      </body>
    </html>
  );
}
