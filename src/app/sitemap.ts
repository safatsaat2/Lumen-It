import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const homeEntries = locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}`]),
      ),
    },
  }));

  const serviceEntries = locales.flatMap((locale) =>
    services.map((service) => ({
      url: `${siteConfig.url}/${locale}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            l,
            `${siteConfig.url}/${l}/services/${service.slug}`,
          ]),
        ),
      },
    })),
  );

  const legalPaths = ["privacy", "terms", "cookies"] as const;
  const legalEntries = locales.flatMap((locale) =>
    legalPaths.map((path) => ({
      url: `${siteConfig.url}/${locale}/${path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  );

  return [...homeEntries, ...serviceEntries, ...legalEntries];
}
