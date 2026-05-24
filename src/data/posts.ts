import { readingTime } from "@/lib/utils";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  cover: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  content: string;
  readingTimeMin?: number;
};

/**
 * Sample blog posts. In production these would be sourced from a
 * headless CMS (Sanity, Contentlayer, Notion) or an MDX file system —
 * see /lib/blog/source.ts for the swap-in seam.
 */
const rawPosts: BlogPost[] = [
  {
    slug: "the-anatomy-of-a-modern-brand-system",
    title: "The anatomy of a modern brand system",
    description:
      "What distinguishes a logo from a true brand system — and why the difference compounds over time.",
    category: "Branding",
    cover:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=80&auto=format&fit=crop",
    author: {
      name: "Maya Chen",
      role: "Creative Director",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&q=80&auto=format&fit=crop&crop=faces",
    },
    publishedAt: "2026-04-12",
    tags: ["brand", "design systems", "strategy"],
    content: `A modern brand system is more than a logo and a color palette. It's the set of rules, tokens and motion that lets a product feel coherent across every surface — from a billboard to a settings page.

In this piece we break down the six layers we use when we design brand systems for our clients, and why ignoring any one of them eventually costs you growth.

## The six layers

1. **Verbal identity** — name, voice, tone matrix
2. **Visual identity** — logo, type, color, iconography
3. **Motion identity** — easing, timing, choreography
4. **Photographic identity** — direction and treatment
5. **Sonic identity** — UI sound and brand audio
6. **System governance** — tokens, themes, contribution

The brands that compound over time tend to invest in all six. The ones that don't pay for it in inconsistency and rebrand fees three years later.`,
  },
  {
    slug: "shipping-rag-to-production",
    title: "Shipping RAG to production: lessons from 12 deploys",
    description:
      "Evals, observability and cost controls — what we'd do differently if we shipped our first RAG copilot today.",
    category: "AI",
    cover:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80&auto=format&fit=crop",
    author: {
      name: "Daniel Okafor",
      role: "Head of Engineering",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80&auto=format&fit=crop&crop=faces",
    },
    publishedAt: "2026-03-28",
    tags: ["ai", "rag", "engineering"],
    content: `Over the last 18 months we've shipped 12 RAG (retrieval-augmented generation) systems to production. Some serve a handful of users; others handle thousands of queries a day.

A few patterns have emerged that we wish we'd known on day one — chief among them, **evals beat vibes**.

## What we'd do differently

- Start with a golden dataset of 50 evaluated answers before writing any retrieval code.
- Wire observability (LangSmith / Phoenix) before shipping the first prototype.
- Cap token spend with budget guards at the gateway, not at the call site.

Shipping AI features without these guardrails leads to silent regressions — and silent regressions kill trust faster than outages.`,
  },
  {
    slug: "core-web-vitals-2026",
    title: "Core Web Vitals in 2026: what actually moves the needle",
    description:
      "A field-tested playbook for hitting 99 / 100 Lighthouse on Next.js 15 — without the placebo optimizations.",
    category: "Engineering",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format&fit=crop",
    author: {
      name: "Priya Mehta",
      role: "Performance Lead",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&q=80&auto=format&fit=crop&crop=faces",
    },
    publishedAt: "2026-02-19",
    tags: ["performance", "next.js", "seo"],
    content: `Core Web Vitals stopped being optional years ago. In 2026 they're a default expectation — and the bar keeps moving.

Here's the playbook we use on every Lumen build to consistently land 95+ Lighthouse scores in the field, not just in CI.

## The shortlist

1. Ship **server components** by default; pull client islands only where you need them.
2. Cache **above-the-fold images** at the edge with AVIF.
3. Defer everything you can with \`next/dynamic\` and the new \`unstable_after\` API.
4. Measure real users with RUM — not just lab data.

Most of the perf gains we deliver come from removing JavaScript, not adding cleverness.`,
  },
  {
    slug: "design-systems-that-scale",
    title: "Design systems that scale past their first 100 PRs",
    description:
      "The governance, tooling and rituals that keep design systems from quietly dying after launch.",
    category: "Design",
    cover:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1600&q=80&auto=format&fit=crop",
    author: {
      name: "Sofia Rinaldi",
      role: "Design Systems Lead",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80&auto=format&fit=crop&crop=faces",
    },
    publishedAt: "2026-01-08",
    tags: ["design systems", "tokens", "process"],
    content: `Most design systems we audit are stuck at version 0.4 — a few components, no governance and a slowly growing pile of one-offs.

The systems that survive past 100 PRs share three traits: **token discipline, contribution rituals, and a single team that owns the roadmap.**

## Token discipline

Tokens (color, spacing, motion) are non-negotiable. Without them, theming, dark mode and white-label work all become months of refactors.`,
  },
  {
    slug: "from-figma-to-edge-deploy",
    title: "From Figma to edge deploy in 7 days",
    description:
      "A behind-the-scenes look at our rapid build process for marketing sites and product MVPs.",
    category: "Process",
    cover:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1600&q=80&auto=format&fit=crop",
    author: {
      name: "Jonas Wahlberg",
      role: "Engineering Manager",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&q=80&auto=format&fit=crop&crop=faces",
    },
    publishedAt: "2025-11-22",
    tags: ["process", "delivery", "next.js"],
    content: `We have a one-week sprint format we call a *Lumen Sprint*. It takes a project from Figma export to a live, edge-deployed Next.js build with CMS wired in.

It works because we constrain scope, not quality. Here's exactly how we run it.

## Day-by-day

- **Day 1** — kick-off, scope freeze, design tokens to code.
- **Day 2** — build the layout primitives.
- **Day 3** — section-by-section assembly.
- **Day 4** — CMS wiring + content load.
- **Day 5** — performance, SEO, accessibility pass.
- **Day 6** — staging review with the client.
- **Day 7** — production deploy + handover.`,
  },
];

/** Posts with computed reading time (used in cards, schema and meta). */
export const posts: BlogPost[] = rawPosts.map((p) => ({
  ...p,
  readingTimeMin: readingTime(p.content),
}));

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 2) {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return posts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aShared = a.tags.filter((t) => current.tags.includes(t)).length;
      const bShared = b.tags.filter((t) => current.tags.includes(t)).length;
      return bShared - aShared;
    })
    .slice(0, count);
}
