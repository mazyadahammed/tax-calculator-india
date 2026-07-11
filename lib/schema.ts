// ---------------------------------------------------------------------------
// JSON-LD Schema generators — pure functions, no DOM access, safe in RSC.
//
// Spec references:
//   WebApplication → https://schema.org/WebApplication
//   FAQPage        → https://schema.org/FAQPage
//   BreadcrumbList → https://schema.org/BreadcrumbList
// ---------------------------------------------------------------------------

import { SITE_URL, SITE_NAME } from "./siteConfig";

export interface FaqItem {
  question: string;
  answer: string;
}

/** WebApplication schema — used on every calculator page. */
export function webApplicationSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${SITE_URL}${path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: "en-IN",
  };
}

/** FAQPage schema — for accordion FAQ blocks. Helps trigger rich snippets. */
export function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** BreadcrumbList schema — for non-homepage pages. */
export function breadcrumbSchema(
  crumbs: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
