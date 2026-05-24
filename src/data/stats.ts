export type Stat = {
  value: number;
  suffix?: string;
  label: string;
  description: string;
};

export const stats: Stat[] = [
  {
    value: 184,
    suffix: "+",
    label: "Brands launched",
    description: "From pre-seed to publicly traded.",
  },
  {
    value: 27,
    suffix: "M+",
    label: "Users reached",
    description: "Across products we've shipped this year.",
  },
  {
    value: 99,
    label: "Lighthouse score",
    description: "Average on our shipped marketing sites.",
  },
  {
    value: 7,
    label: "Years building",
    description: "A senior team that's seen the cycles.",
  },
];

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export const timeline: TimelineEntry[] = [
  {
    year: "2019",
    title: "Lumen is founded",
    description:
      "A small studio of designers and engineers shipping brand and product work for early-stage startups.",
  },
  {
    year: "2021",
    title: "Headless commerce practice",
    description:
      "We open a dedicated practice around Shopify Hydrogen and Next.js commerce — over 30 brands shipped.",
  },
  {
    year: "2023",
    title: "AI engineering team",
    description:
      "Lumen launches an applied AI team — building production RAG, copilots and evals for ops teams.",
  },
  {
    year: "2025",
    title: "Studio of 38 people",
    description:
      "Strategy, brand, product, engineering and AI under one roof — with offices in SF and Lisbon.",
  },
];
