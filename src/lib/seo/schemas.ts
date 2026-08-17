import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";

/** Organization schema for the agency. */
export const organizationSchema = (description: string) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/favicon-192.png`,
  description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  foundingDate: `${siteConfig.founded}-01-01`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dortmund",
    addressCountry: "DE",
  },
  sameAs: Object.values(siteConfig.social).filter(Boolean),
});

/** Website schema. */
export const websiteSchema = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: `${siteConfig.url}/${locale}`,
  inLanguage: locale === "de" ? "de-DE" : "en-US",
});

/** FAQ schema generated from localized FAQ data. */
export const faqSchema = (items: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

/** Service schema for detail pages. */
export const serviceSchema = (service: {
  name: string;
  description: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  url: service.url,
  areaServed: {
    "@type": "Country",
    name: "Germany",
  },
});

/** Article schema for blog posts. */
export const articleSchema = (article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  locale: Locale;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  url: article.url,
  datePublished: article.datePublished,
  dateModified: article.dateModified ?? article.datePublished,
  inLanguage: article.locale === "de" ? "de-DE" : "en-US",
  author: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/favicon-192.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": article.url,
  },
});

/** BreadcrumbList schema generator. */
export const breadcrumbSchema = (
  items: { name: string; href: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${siteConfig.url}${item.href}`,
  })),
});
