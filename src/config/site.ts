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
  email: "sakibsafat47@gmail.com",
  contactEmail: "sakibsafat47@gmail.com",
  phone: "+49 30 12345678",
  address: "Berlin, Deutschland",
  founded: 2020,
  social: {
    twitter: "https://twitter.com/mihisagency",
    github: "https://github.com/mihis-agency",
    linkedin: "https://linkedin.com/company/mihis-agency",
    instagram: "https://instagram.com/mihis.agency",
  },
} as const;

export function localizedPath(locale: string, path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}
