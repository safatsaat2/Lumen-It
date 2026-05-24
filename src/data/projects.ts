export type ProjectCategory =
  | "Web"
  | "Branding"
  | "Product"
  | "AI"
  | "Marketing";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: number;
  summary: string;
  cover: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "northwind-rebrand",
    title: "Repositioning a fintech challenger",
    client: "Northwind Pay",
    category: "Branding",
    year: 2025,
    summary:
      "Identity, voice and product visuals for a Y Combinator-backed payments platform launching in EMEA.",
    cover:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80&auto=format&fit=crop",
    tags: ["Brand", "Identity", "Strategy"],
    metrics: [
      { label: "Lift in qualified leads", value: "+212%" },
      { label: "Brand recall (post-launch)", value: "73%" },
      { label: "Launch", value: "EMEA · 2025" },
    ],
  },
  {
    slug: "lumen-cloud",
    title: "Edge analytics for a developer platform",
    client: "Lumen Cloud",
    category: "Web",
    year: 2025,
    summary:
      "A radically faster marketing site and docs experience for a serverless platform shipping to 14 regions.",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
    tags: ["Next.js", "Edge", "MDX"],
    metrics: [
      { label: "Lighthouse perf", value: "99 / 100" },
      { label: "LCP improvement", value: "−68%" },
      { label: "Signups", value: "+3.4×" },
    ],
  },
  {
    slug: "harvest-ai",
    title: "AI copilot for ops teams",
    client: "Harvest AI",
    category: "AI",
    year: 2025,
    summary:
      "End-to-end design + engineering of an internal RAG copilot serving 400+ enterprise ops users.",
    cover:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&auto=format&fit=crop",
    tags: ["RAG", "LLM", "Product"],
    metrics: [
      { label: "Tickets deflected", value: "41%" },
      { label: "Time-to-answer", value: "−72%" },
      { label: "CSAT", value: "4.8 / 5" },
    ],
  },
  {
    slug: "atlas-mobility",
    title: "Mobility super-app",
    client: "Atlas Mobility",
    category: "Product",
    year: 2024,
    summary:
      "Design system, native app and growth engine for a transit super-app serving 1.1M monthly riders.",
    cover:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80&auto=format&fit=crop",
    tags: ["Product", "Design System", "Mobile"],
    metrics: [
      { label: "Active riders", value: "1.1M / mo" },
      { label: "Retention (D30)", value: "+27%" },
      { label: "NPS", value: "62" },
    ],
  },
  {
    slug: "moonlit-commerce",
    title: "Headless commerce relaunch",
    client: "Moonlit",
    category: "Web",
    year: 2024,
    summary:
      "Replatformed a luxury fashion brand to a headless Shopify + Next.js stack with editorial CMS.",
    cover:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80&auto=format&fit=crop",
    tags: ["Shopify", "Headless", "CMS"],
    metrics: [
      { label: "AOV", value: "+38%" },
      { label: "Time-on-site", value: "+59%" },
      { label: "Conversion rate", value: "+22%" },
    ],
  },
  {
    slug: "kindred-foundation",
    title: "Nonprofit launch campaign",
    client: "Kindred Foundation",
    category: "Marketing",
    year: 2024,
    summary:
      "Brand, site and integrated launch campaign that raised $4.2M in first-quarter giving.",
    cover:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80&auto=format&fit=crop",
    tags: ["Campaign", "Brand", "Web"],
    metrics: [
      { label: "Q1 giving", value: "$4.2M" },
      { label: "Press mentions", value: "120+" },
      { label: "Email signups", value: "38K" },
    ],
  },
];

export const projectCategories: (ProjectCategory | "All")[] = [
  "All",
  "Web",
  "Branding",
  "Product",
  "AI",
  "Marketing",
];
