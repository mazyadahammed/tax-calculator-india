import { MetadataRoute } from "next";
import { SITE_URL, PAGES } from "@/lib/siteConfig";
import { getSalaryConfigs } from "@/lib/salaryData";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core pages
  const coreSitemaps = Object.values(PAGES).map(({ path, priority, changeFreq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
  }));

  // Dynamic salary pages
  const salaryConfigs = getSalaryConfigs();
  const salarySitemaps: MetadataRoute.Sitemap = [];

  for (const config of salaryConfigs) {
    salarySitemaps.push({
      url: `${SITE_URL}/in-hand-salary/${config.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    });
    salarySitemaps.push({
      url: `${SITE_URL}/tax-calculator/${config.slug}-old-vs-new`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    });
  }

  return [...coreSitemaps, ...salarySitemaps];
}
