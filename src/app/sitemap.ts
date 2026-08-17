import type { MetadataRoute } from "next";

import { getPublicSiteUrl } from "@/config/site";
import { blogSlugs } from "@/data/posts";
import { seoPageSlugs } from "@/data/seo-pages";
import { locales } from "@/i18n/config";
import { readSiteContent } from "@/lib/content-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = await getPublicSiteUrl();
  const lastModified = new Date();
  const content = await readSiteContent();

  const homeEntries = locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteUrl}/${l}`]),
      ),
    },
  }));

  const serviceEntries = locales.flatMap((locale) =>
    content.services.map((service) => ({
      url: `${siteUrl}/${locale}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            l,
            `${siteUrl}/${l}/services/${service.slug}`,
          ]),
        ),
      },
    })),
  );

  const legalPaths = ["impressum", "privacy", "terms", "cookies"] as const;
  const legalEntries = locales.flatMap((locale) =>
    legalPaths.map((path) => ({
      url: `${siteUrl}/${locale}/${path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  );

  const consultationEntries = locales.map((locale) => ({
    url: `${siteUrl}/${locale}/consultation`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteUrl}/${l}/consultation`]),
      ),
    },
  }));

  const templatesEntries = locales.map((locale) => ({
    url: `${siteUrl}/${locale}/templates`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteUrl}/${l}/templates`]),
      ),
    },
  }));

  const contactEntries = locales.map((locale) => ({
    url: `${siteUrl}/${locale}/contact`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteUrl}/${l}/contact`]),
      ),
    },
  }));

  const servicesIndexEntries = locales.map((locale) => ({
    url: `${siteUrl}/${locale}/services`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteUrl}/${l}/services`]),
      ),
    },
  }));

  const workEntries = locales.map((locale) => ({
    url: `${siteUrl}/${locale}/work`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteUrl}/${l}/work`]),
      ),
    },
  }));

  const blogIndexEntries = locales.map((locale) => ({
    url: `${siteUrl}/${locale}/blog`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteUrl}/${l}/blog`]),
      ),
    },
  }));

  const blogPostEntries = locales.flatMap((locale) =>
    blogSlugs.map((slug) => ({
      url: `${siteUrl}/${locale}/blog/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}/${l}/blog/${slug}`]),
        ),
      },
    })),
  );

  const seoLandingEntries = locales.flatMap((locale) =>
    seoPageSlugs.map((slug) => ({
      url: `${siteUrl}/${locale}/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}/${l}/${slug}`]),
        ),
      },
    })),
  );

  return [
    ...homeEntries,
    ...consultationEntries,
    ...templatesEntries,
    ...contactEntries,
    ...servicesIndexEntries,
    ...workEntries,
    ...blogIndexEntries,
    ...blogPostEntries,
    ...seoLandingEntries,
    ...serviceEntries,
    ...legalEntries,
  ];
}
