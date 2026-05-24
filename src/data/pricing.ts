export type PricingTier = {
  id: string;
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  highlight?: boolean;
  cta: string;
  features: string[];
};

export const pricingTiers: PricingTier[] = [
  {
    id: "launch",
    name: "Launch",
    description: "For founders shipping their v1 with confidence.",
    monthly: 4_900,
    yearly: 49_000,
    cta: "Start Launch",
    features: [
      "Brand-lite + landing site",
      "Up to 6 pages, fully responsive",
      "Basic CMS integration",
      "Lighthouse 95+ guaranteed",
      "2 weeks of post-launch support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    description: "For teams scaling brand, product and growth in parallel.",
    monthly: 12_900,
    yearly: 129_000,
    highlight: true,
    cta: "Talk to sales",
    features: [
      "Full brand & design system",
      "Custom Next.js platform",
      "Headless CMS + blog",
      "SEO program + reporting",
      "Quarterly performance audits",
      "Dedicated PM + designer + engineer",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    description: "Embedded creative + engineering squad for product teams.",
    monthly: 24_900,
    yearly: 249_000,
    cta: "Book a call",
    features: [
      "Embedded multi-disciplinary squad",
      "Roadmap, design & engineering",
      "AI / automation workstreams",
      "On-call DevOps & uptime SLAs",
      "Quarterly strategy reviews",
      "Priority response (4h)",
    ],
  },
];
