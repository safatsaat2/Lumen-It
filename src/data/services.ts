import {
  Brush,
  Code2,
  LineChart,
  Megaphone,
  Palette,
  Search,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  accent: string;
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    short: "Performant sites & apps that scale.",
    description:
      "From marketing sites to product platforms — we ship fast, accessible, type-safe applications built on Next.js, edge runtimes, and serverless databases.",
    icon: Code2,
    features: [
      "Next.js 15 + React Server Components",
      "Edge / serverless deployment",
      "Headless CMS integrations",
      "Core Web Vitals tuned",
    ],
    accent: "from-violet-500 to-indigo-500",
  },
  {
    slug: "brand-identity",
    title: "Brand Identity",
    short: "Distinct visual systems that resonate.",
    description:
      "Logo, type, motion and voice — calibrated into a cohesive identity that scales across every surface, from product UI to packaging.",
    icon: Palette,
    features: [
      "Naming & verbal identity",
      "Logo & wordmark systems",
      "Color, type, iconography",
      "Brand guidelines & assets",
    ],
    accent: "from-pink-500 to-rose-500",
  },
  {
    slug: "ui-ux-design",
    title: "UI / UX Design",
    short: "Interfaces people actually love.",
    description:
      "We design product experiences grounded in research — wireframes, prototypes and pixel-perfect UI shipped in Figma with developer-ready specs.",
    icon: Brush,
    features: [
      "User research & flows",
      "Design systems in Figma",
      "Prototyping & motion specs",
      "Accessibility audits (WCAG)",
    ],
    accent: "from-amber-400 to-orange-500",
  },
  {
    slug: "seo",
    title: "SEO Services",
    short: "Get found by the right people.",
    description:
      "Technical SEO, content strategy and schema markup engineered to rank — supported by ongoing reporting and Core Web Vitals optimization.",
    icon: Search,
    features: [
      "Technical SEO audits",
      "Keyword & content strategy",
      "Schema & structured data",
      "Reporting & analytics",
    ],
    accent: "from-emerald-400 to-teal-500",
  },
  {
    slug: "marketing",
    title: "Marketing",
    short: "Campaigns that convert.",
    description:
      "Full-funnel growth: positioning, lifecycle, paid acquisition and brand campaigns engineered around your highest-leverage metrics.",
    icon: Megaphone,
    features: [
      "Go-to-market strategy",
      "Performance & paid media",
      "Lifecycle & email",
      "Landing page experimentation",
    ],
    accent: "from-sky-500 to-cyan-500",
  },
  {
    slug: "automation",
    title: "Automation",
    short: "Workflows that work while you sleep.",
    description:
      "Stitch your stack together. We design and ship resilient automation across Zapier, n8n, Make and bespoke serverless workflows.",
    icon: Workflow,
    features: [
      "Workflow architecture",
      "API & webhook orchestration",
      "n8n / Make / Zapier",
      "Bespoke serverless flows",
    ],
    accent: "from-fuchsia-500 to-purple-500",
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    short: "Embed intelligence into your product.",
    description:
      "From RAG copilots to internal AI tooling — we ship production AI features with evals, guardrails and observability built in.",
    icon: Sparkles,
    features: [
      "RAG & semantic search",
      "Custom AI copilots",
      "Evals & observability",
      "LLM cost optimization",
    ],
    accent: "from-indigo-500 to-blue-500",
  },
  {
    slug: "creative-strategy",
    title: "Creative Strategy",
    short: "Big ideas tied to business outcomes.",
    description:
      "We pair strategists with creatives to align brand, product and growth around one cohesive narrative — measured against the metrics that matter.",
    icon: LineChart,
    features: [
      "Positioning & narrative",
      "Audience & competitive research",
      "Creative direction",
      "Quarterly roadmaps",
    ],
    accent: "from-red-500 to-pink-500",
  },
];
