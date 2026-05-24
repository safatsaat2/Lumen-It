/**
 * Single source of truth for site-wide metadata,
 * navigation and external links.
 */
export type NavItem = { label: string; href: string };

export const siteConfig = {
  name: "Lumen",
  tagline: "Brand. Build. Scale.",
  description:
    "Lumen is a premium digital agency crafting brand identities, websites, and AI-powered products for ambitious founders and teams.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://lumen.agency",
  ogImage: "/og.png",
  email: "hello@lumen.agency",
  phone: "+1 (415) 555-0117",
  address: "548 Market Street, San Francisco, CA 94104",
  founded: 2019,
  social: {
    twitter: "https://twitter.com/lumenagency",
    github: "https://github.com/lumen-agency",
    linkedin: "https://linkedin.com/company/lumen-agency",
    instagram: "https://instagram.com/lumen.agency",
    dribbble: "https://dribbble.com/lumen",
  },
  keywords: [
    "digital agency",
    "brand identity",
    "web development",
    "UI UX design",
    "SEO services",
    "AI solutions",
    "creative studio",
    "Next.js agency",
  ],
} as const;

export const mainNav: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export const footerNav = {
  agency: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Careers", href: "/careers" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Case studies", href: "#work" },
    { label: "FAQ", href: "#faq" },
    { label: "Pricing", href: "#pricing" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ],
} as const;
