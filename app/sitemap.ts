import { MetadataRoute } from "next";
import { SITE_URL, PAGES } from "@/lib/siteConfig";

// Served automatically at /sitemap.xml by Next.js App Router.
// Submit this URL in Google Search Console after deployment:
//   https://search.google.com/search-console
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return Object.values(PAGES).map(({ path, priority, changeFreq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
  }));
}
