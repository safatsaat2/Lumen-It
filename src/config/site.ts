/** Production domain used in sitemap, robots, schema, and canonical URLs. */
export const CANONICAL_SITE_URL = "https://www.mihitech.org";

const STALE_SITE_URLS = new Set([
  "https://lumen-it.vercel.app",
  "http://lumen-it.vercel.app",
]);

/** Normalize mihitech.org env values to the www host Google already crawls. */
export function normalizePublicSiteUrl(raw: string): string {
  const trimmed = raw.replace(/\/$/, "");
  try {
    const url = new URL(
      trimmed.startsWith("http") ? trimmed : `https://${trimmed}`,
    );
    if (url.hostname === "mihitech.org") {
      url.hostname = "www.mihitech.org";
    }
    url.protocol = "https:";
    return url.origin;
  } catch {
    return CANONICAL_SITE_URL;
  }
}

/**
 * Resolve the public site URL from env, ignoring stale Vercel project URLs
 * (e.g. lumen-it.vercel.app) so sitemap and metadata stay on mihitech.org.
 */
export function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!fromEnv) return CANONICAL_SITE_URL;
  if (STALE_SITE_URLS.has(fromEnv) || fromEnv.endsWith(".vercel.app")) {
    return CANONICAL_SITE_URL;
  }
  return normalizePublicSiteUrl(fromEnv);
}

/**
 * Single source of truth for site-wide metadata and external links.
 */
export const siteConfig = {
  name: "MIHI's",
  tagline: "Brand. Build. Scale.",
  url: resolveSiteUrl(),
  ogImage: "/og.png",
  email: "info@mihitech.org",
  contactEmail: "info@mihitech.org",
  phone: "+49 176 61965122",
  address: "Dortmund, Deutschland",
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
