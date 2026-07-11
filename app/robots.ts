import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";

// Served automatically at /robots.txt by Next.js App Router.
// This replaces any static public/robots.txt.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block Next.js internal routes from indexing
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
