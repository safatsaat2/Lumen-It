export type FAQItem = {
  question: string;
  answer: string;
};

export const faqItems: FAQItem[] = [
  {
    question: "What does a typical engagement look like?",
    answer:
      "Most engagements start with a 1–2 week discovery sprint, followed by a fixed-scope build phase of 6–12 weeks. We can also operate as an embedded squad on retainer for ongoing product work.",
  },
  {
    question: "How are projects priced?",
    answer:
      "We price by scope and outcome rather than hours. After discovery you'll receive a fixed-fee proposal with clear deliverables, milestones and acceptance criteria. Retainers are billed monthly.",
  },
  {
    question: "Do you work with startups or only enterprise clients?",
    answer:
      "Both. We've shipped for pre-seed founders, Series B scale-ups and Fortune 500 product teams. We're transparent about which engagement model fits your stage.",
  },
  {
    question: "What is your tech stack?",
    answer:
      "We're stack-agnostic but specialize in Next.js, TypeScript, Tailwind, Postgres / Supabase, edge functions, and modern AI tooling (OpenAI, Anthropic, vector DBs). We can also work within existing stacks.",
  },
  {
    question: "Do you handle hosting, DevOps and maintenance?",
    answer:
      "Yes. We deploy on Vercel, Cloudflare, Fly or your existing infra, with monitoring, CI/CD and SLAs available on retainer. We also do quarterly performance and SEO audits.",
  },
  {
    question: "How fast can we start?",
    answer:
      "Most projects kick off within 2–3 weeks. We always have one ‘fast-start’ slot per month for time-critical launches — reach out via the contact form to check availability.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Absolutely. We're happy to sign mutual NDAs before any sensitive material is shared and we maintain strict information barriers between competing clients.",
  },
];
