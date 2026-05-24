import { siteConfig } from "@/config/site";
import { faqItems } from "@/data/faq";

/** Organization schema for the agency. */
export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.svg`,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  foundingDate: `${siteConfig.founded}-01-01`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "548 Market Street",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94104",
    addressCountry: "US",
  },
  sameAs: Object.values(siteConfig.social),
});

/** Website schema with sitelinks search. */
export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

/** FAQ schema generated from local FAQ data. */
export const faqSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

/** Article schema used on blog posts. */
export const articleSchema = (article: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  image: article.image
    ? [`${siteConfig.url}${article.image}`]
    : [`${siteConfig.url}${siteConfig.ogImage}`],
  datePublished: article.publishedAt,
  dateModified: article.updatedAt ?? article.publishedAt,
  author: { "@type": "Person", name: article.author },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.svg` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteConfig.url}/blog/${article.slug}`,
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
