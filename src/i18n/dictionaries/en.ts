import type { Dictionary } from "./types";

const en: Dictionary = {
  meta: {
    title: "MIHI's — Digital Agency for Web, E-Commerce & Automation",
    description:
      "MIHI's is a digital agency for German and DACH businesses: custom web development, Shopify, SEO, UI/UX, and AI automation — GDPR-aware and outcome-focused.",
    ogAlt: "MIHI's — Digital agency for businesses in Germany",
    keywords: [
      "web development Germany",
      "Shopify agency",
      "WordPress development",
      "SEO optimization",
      "UI UX design",
      "AI automation",
      "website maintenance",
      "e-commerce agency",
    ],
  },
  nav: {
    services: "Services",
    consultation: "AI Consultant",
    work: "Work",
    process: "Process",
    pricing: "Pricing",
    faq: "FAQ",
    contact: "Contact",
    cta: "Start a project",
    menu: "Menu",
    openMenu: "Open menu",
  },
  language: {
    label: "Language",
    switchTo: "Switch language",
    de: "Deutsch",
    en: "English",
  },
  hero: {
    badge: "Now booking Q3 2026 engagements",
    titleBefore: "We build",
    titleHighlight: "digital products",
    titleAfter: " that scale",
    description:
      "MIHI's is your agency for web development, e-commerce, and automation — with GDPR-aware defaults, measurable performance, and a handover your team can own.",
    ctaPrimary: "Request a quote",
    ctaSecondary: "Explore services",
    trust: "Brand. Build. Scale. · Trusted by teams across the DACH region",
  },
  clients: {
    label: "Trusted by teams at",
  },
  consultationPromo: {
    badge: "Free AI strategy session",
    title: "Turn your business context into a clear brand roadmap",
    description:
      "Answer a focused set of questions and receive a personalized, structured strategy for positioning, marketing, sales, and growth.",
    start: "Start free consultation",
    learnMore: "See how it works",
    trust: ["No credit card", "Save and resume", "Downloadable report"],
    insightTitle: "Built around your answers",
    insightBody:
      "Each round builds on your previous context, then turns it into priorities your team can act on.",
  },
  about: {
    badge: "About",
    title: "MIHI's — built for momentum and craft",
    description:
      "Strategy, design, and engineering under one roof — so you ship faster without sacrificing quality.",
    storyTitle: "Our story",
    storyP1:
      "MIHI's grew from a simple belief: German businesses deserve better digital partners — native-language communication, GDPR from day one, and code your next team can actually read.",
    storyP2:
      "We measure success in business outcomes: qualified leads, conversion, Core Web Vitals, and systems your team can run after handover.",
    stats: [
      {
        value: "120+",
        label: "Projects delivered",
        description: "From landing pages to complex platforms.",
      },
      {
        value: "15",
        label: "Service areas",
        description: "Web, e-commerce, SEO, design, and automation.",
      },
      {
        value: "90+",
        label: "Lighthouse target",
        description: "Measurable performance, not vague promises.",
      },
      {
        value: "24h",
        label: "Response time",
        description: "We reply within one business day.",
      },
    ],
    timeline: [
      {
        year: "2020",
        title: "MIHI's founded",
        description:
          "Started as a lean team focused on web development and WordPress for German mid-market companies.",
      },
      {
        year: "2022",
        title: "E-commerce practice",
        description:
          "Opened a dedicated practice for Shopify, WooCommerce, and legally sound DACH storefronts.",
      },
      {
        year: "2024",
        title: "Automation & AI",
        description:
          "Expanded into business automation, API integration, and AI copilots with proper governance.",
      },
      {
        year: "2026",
        title: "Full-service digital",
        description:
          "From custom web development to SEO and maintenance — one partner for the full digital stack.",
      },
    ],
  },
  services: {
    badge: "Services",
    title: "Everything you need to launch and grow",
    description:
      "Fifteen clearly scoped practices. One senior team. Pick a focus or engage us end-to-end.",
    learnMore: "Learn more",
    footerNote: "Need something bespoke? We scope custom engagements.",
    benefitsLabel: "What you get",
    backToServices: "All services",
    relatedCta: "Discuss your project",
  },
  work: {
    badge: "Work",
    title: "Outcomes, not just deliverables",
    description:
      "A sample of recent launches across web, e-commerce, design, and automation.",
    viewCase: "View details",
  },
  process: {
    badge: "Process",
    title: "From discovery to compound growth",
    description:
      "A proven four-phase playbook — with weekly previews from week one.",
    steps: [
      {
        step: "01",
        title: "Discover",
        description:
          "A structured discovery sprint — interviews, audits, and competitive research that ground every decision in evidence.",
        deliverables: [
          "Stakeholder interviews",
          "Competitive landscape",
          "Technical & content audit",
          "Strategic brief",
        ],
      },
      {
        step: "02",
        title: "Design",
        description:
          "UX, UI, and a design system in Figma — with prototypes and developer-ready specs.",
        deliverables: [
          "Wireframes & prototypes",
          "Visual design system",
          "High-fidelity UI",
          "Design tokens & specs",
        ],
      },
      {
        step: "03",
        title: "Build",
        description:
          "Senior engineering in one-week sprints. You get a working preview from week one, with reviews and automated QA.",
        deliverables: [
          "Next.js / WordPress / Shopify",
          "CMS & API integration",
          "CI/CD pipeline",
          "Accessibility & performance QA",
        ],
      },
      {
        step: "04",
        title: "Launch & grow",
        description:
          "We don't ship and leave. Post-launch we run monitoring, SEO, analytics, and targeted optimization.",
        deliverables: [
          "Go-live & monitoring",
          "Analytics dashboards",
          "SEO & content program",
          "Quarterly roadmaps",
        ],
      },
    ],
  },
  pricing: {
    badge: "Pricing",
    title: "Transparent plans, clear outcomes",
    description:
      "Monthly retainers or annual commitments — scoped after a short discovery call.",
    monthly: "Monthly",
    yearly: "Yearly",
    save: "Save ~15%",
    perMonth: "/mo",
    perYear: "/yr",
    mostPopular: "Most popular",
    tiers: [
      {
        id: "launch",
        name: "Launch",
        description: "For focused website or landing-page projects with a fixed scope.",
        monthly: 2490,
        yearly: 24900,
        cta: "Start Launch",
        features: [
          "Landing page or site up to 6 pages",
          "Responsive, semantic markup",
          "Basic CMS or simple editing",
          "Lighthouse target 90+",
          "2 weeks of post-launch support",
        ],
      },
      {
        id: "growth",
        name: "Growth",
        description: "For teams scaling brand, product, and visibility in parallel.",
        monthly: 5990,
        yearly: 59900,
        highlight: true,
        cta: "Talk to us",
        features: [
          "Custom web or commerce platform",
          "UI/UX + design system",
          "SEO program with reporting",
          "Quarterly performance audits",
          "Dedicated point of contact",
          "Monthly development allowance",
        ],
      },
      {
        id: "scale",
        name: "Scale",
        description: "An embedded squad for ongoing product and automation work.",
        monthly: 11990,
        yearly: 119900,
        cta: "Book a call",
        features: [
          "Multi-disciplinary squad",
          "Roadmap, design & engineering",
          "AI & automation workstreams",
          "Maintenance with SLAs",
          "Quarterly strategy reviews",
          "Priority response times",
        ],
      },
    ],
  },
  testimonials: {
    badge: "Testimonials",
    title: "Partners, not vendors",
    description:
      "What founders and marketing and product leaders say after shipping with us.",
    items: [
      {
        id: "1",
        quote:
          "MIHI's delivered our Next.js relaunch in eight weeks — with measurably better Core Web Vitals and a handover our internal team could use immediately.",
        name: "Laura Hoffmann",
        role: "Head of Marketing",
        company: "Nordwerk GmbH",
        rating: 5,
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
      },
      {
        id: "2",
        quote:
          "Finally a Shopify partner that takes SEPA, Klarna, and German legal texts seriously. The store feels native for our customers in Germany.",
        name: "Jonas Berger",
        role: "Founder",
        company: "Atelier Berg",
        rating: 5,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80",
      },
      {
        id: "3",
        quote:
          "The automation between CRM and shop saves us hours every week. Documentation and monitoring were built in from day one.",
        name: "Elena Krüger",
        role: "COO",
        company: "Helixa Systems",
        rating: 5,
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&q=80",
      },
    ],
  },
  faq: {
    badge: "FAQ",
    title: "Questions we hear often",
    description: "Still curious? Reach out — we reply within one business day.",
    items: [
      {
        question: "What does a typical engagement look like?",
        answer:
          "Most projects start with a 1–2 week discovery, followed by a fixed-scope build of 6–12 weeks. We also offer retainers for ongoing product work.",
      },
      {
        question: "How are projects priced?",
        answer:
          "We price by scope and outcome, not hours. After discovery you receive a fixed-fee proposal with deliverables, milestones, and acceptance criteria. Retainers are billed monthly.",
      },
      {
        question: "Do you work with startups and mid-market companies?",
        answer:
          "Both. We support founding teams and established Mittelstand companies — and we're transparent about which model fits your stage.",
      },
      {
        question: "What is your tech stack?",
        answer:
          "We specialize in Next.js, React, TypeScript, WordPress, Shopify, modern CMS platforms, and automation with n8n, Make, or custom APIs. We can also work within existing stacks.",
      },
      {
        question: "Do you handle hosting, maintenance, and support?",
        answer:
          "Yes. We deploy on Vercel or your infrastructure and offer maintenance plans with updates, backups, monitoring, and response-time SLAs.",
      },
      {
        question: "How fast can we start?",
        answer:
          "Most projects kick off within 2–3 weeks. We keep one fast-start slot each month for time-critical launches — reach out via the contact form.",
      },
      {
        question: "Do you sign NDAs?",
        answer:
          "Absolutely. We're happy to sign mutual NDAs before any sensitive material is shared.",
      },
    ],
  },
  contact: {
    badge: "Contact",
    title: "Let's build something that matters",
    description:
      "Tell us about your timeline, budget band, and goals. We'll respond with concrete next steps.",
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    subject: "Subject",
    message: "Message",
    namePlaceholder: "Alex Rivera",
    emailPlaceholder: "you@company.com",
    phonePlaceholder: "+49 170 0000000",
    subjectPlaceholder: "Web development inquiry",
    messagePlaceholder: "What are you building? Timeline? Approximate budget?",
    submit: "Send message",
    sending: "Sending…",
    success:
      "Thank you! Your message was sent. We'll usually reply within 24 hours.",
    error:
      "We couldn't send your message. Please try again or email us directly.",
  },
  footer: {
    agency: "Agency",
    resources: "Resources",
    legal: "Legal",
    rights: "All rights reserved.",
    about: "About",
    services: "Services",
    process: "Process",
    faq: "FAQ",
    pricing: "Pricing",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    cookies: "Cookies",
  },
  projects: [
    {
      slug: "nordwerk-relaunch",
      title: "Nordwerk — Corporate relaunch",
      summary:
        "Custom Next.js platform with CMS, multilingual content, and Core Web Vitals scores above 90.",
      category: "Web development",
      tags: ["Next.js", "CMS", "SEO"],
      cover:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
      metrics: [
        { label: "Lighthouse", value: "96" },
        { label: "Load time", value: "−48%" },
      ],
    },
    {
      slug: "atelier-berg-shop",
      title: "Atelier Berg — Shopify DACH",
      summary:
        "Shopify store with Klarna, SEPA, Trusted Shops, and German-language legal texts.",
      category: "E-commerce",
      tags: ["Shopify", "Checkout", "DACH"],
      cover:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
      metrics: [
        { label: "Conversion", value: "+31%" },
        { label: "Checkout", value: "−22% abandon" },
      ],
    },
    {
      slug: "helixa-automation",
      title: "Helixa — CRM–shop sync",
      summary:
        "API integration and workflow automation between shop, CRM, and reporting.",
      category: "Automation",
      tags: ["API", "n8n", "CRM"],
      cover:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      metrics: [
        { label: "Manual work", value: "−12 h/wk" },
        { label: "Error rate", value: "−90%" },
      ],
    },
    {
      slug: "pulse-landing",
      title: "Pulse — Campaign landing pages",
      summary:
        "High-converting landing pages with tracking, A/B setup, and delivery in under a week.",
      category: "Landing pages",
      tags: ["Conversion", "Ads", "Speed"],
      cover:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=80",
      metrics: [
        { label: "CPL", value: "−27%" },
        { label: "Delivery", value: "5 days" },
      ],
    },
  ],
};

export default en;
