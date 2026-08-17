import type { MetadataRoute } from "next";

import { getPublicSiteUrl } from "@/config/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = await getPublicSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/log-in", "/api/admin", "/api/auth"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
