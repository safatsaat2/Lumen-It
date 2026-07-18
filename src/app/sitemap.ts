import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";
import { readSiteContent } from "@/lib/content-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const content = await readSiteContent();

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
    content.services.map((service) => ({
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

  const consultationEntries = locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}/consultation`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}/consultation`]),
      ),
    },
  }));

  return [
    ...homeEntries,
    ...consultationEntries,
    ...serviceEntries,
    ...legalEntries,
  ];
}
