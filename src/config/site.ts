/**
 * Single source of truth for site-wide metadata and external links.
 */
export const siteConfig = {
  name: "MIHI's",
  tagline: "Brand. Build. Scale.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://mihis.agency",
  ogImage: "/og.png",
  email: "info@mihitech.org",
  contactEmail: "info@mihitech.org",
  phone: "",
  address: "Berlin, Deutschland",
  founded: 2026,
  social: {
    facebook: "https://www.facebook.com/mihistech",
    instagram: "https://www.instagram.com/mihi_tech/",
    twitter: "",
    github: "",
    linkedin: "",
  },
} as const;

export function localizedPath(locale: string, path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}
