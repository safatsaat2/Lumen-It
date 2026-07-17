import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

export function buildPageMetadata({
  locale,
  dictionary,
  title,
  description,
  path = "",
}: {
  locale: Locale;
  dictionary: Dictionary;
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const pageTitle = title ?? dictionary.meta.title;
  const pageDescription = description ?? dictionary.meta.description;
  const canonicalPath = path ? `/${locale}${path}` : `/${locale}`;
  const url = `${siteConfig.url}${canonicalPath}`;

  const languages = Object.fromEntries(
    locales.map((l) => [l, `${siteConfig.url}/${l}${path}`]),
  );

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [...dictionary.meta.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: canonicalPath,
      languages: {
        ...languages,
        "x-default": `${siteConfig.url}/de${path}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      url,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: dictionary.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [siteConfig.ogImage],
      creator: "@mihisagency",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
