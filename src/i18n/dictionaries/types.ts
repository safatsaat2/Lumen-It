export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogAlt: string;
    keywords: string[];
  };
  nav: {
    services: string;
    consultation: string;
    work: string;
    process: string;
    pricing: string;
    faq: string;
    contact: string;
    cta: string;
    menu: string;
    openMenu: string;
  };
  language: {
    label: string;
    switchTo: string;
    de: string;
    en: string;
  };
  hero: {
    badge: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string;
  };
  clients: {
    label: string;
  };
  consultationPromo: {
    badge: string;
    title: string;
    description: string;
    start: string;
    learnMore: string;
    trust: string[];
    insightTitle: string;
    insightBody: string;
  };
  about: {
    badge: string;
    title: string;
    description: string;
    storyTitle: string;
    storyP1: string;
    storyP2: string;
    stats: { value: string; label: string; description: string }[];
    timeline: { year: string; title: string; description: string }[];
  };
  services: {
    badge: string;
    title: string;
    description: string;
    learnMore: string;
    footerNote: string;
    benefitsLabel: string;
    backToServices: string;
    relatedCta: string;
  };
  work: {
    badge: string;
    title: string;
    description: string;
    viewCase: string;
  };
  process: {
    badge: string;
    title: string;
    description: string;
    steps: {
      step: string;
      title: string;
      description: string;
      deliverables: string[];
    }[];
  };
  pricing: {
    badge: string;
    title: string;
    description: string;
    monthly: string;
    yearly: string;
    save: string;
    perMonth: string;
    perYear: string;
    mostPopular: string;
    tiers: {
      id: string;
      name: string;
      description: string;
      monthly: number;
      yearly: number;
      highlight?: boolean;
      cta: string;
      features: string[];
    }[];
  };
  testimonials: {
    badge: string;
    title: string;
    description: string;
    items: {
      id: string;
      quote: string;
      name: string;
      role: string;
      company: string;
      rating: number;
      avatar: string;
    }[];
  };
  faq: {
    badge: string;
    title: string;
    description: string;
    items: { question: string; answer: string }[];
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: {
    agency: string;
    resources: string;
    legal: string;
    rights: string;
    about: string;
    services: string;
    process: string;
    faq: string;
    pricing: string;
    contact: string;
    privacy: string;
    terms: string;
    cookies: string;
  };
  projects: {
    slug: string;
    title: string;
    summary: string;
    category: string;
    tags: string[];
    cover: string;
    metrics: { label: string; value: string }[];
  }[];
};
