import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";

/** Organization schema for the agency. */
export const organizationSchema = (description: string) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.svg`,
  description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  foundingDate: `${siteConfig.founded}-01-01`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  sameAs: Object.values(siteConfig.social),
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
