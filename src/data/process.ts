import {
  Compass,
  PenTool,
  Rocket,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  deliverables: string[];
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We start with a structured discovery sprint — interviews, audits and competitive research that ground every decision in evidence.",
    icon: Compass,
    deliverables: [
      "Stakeholder interviews",
      "Competitive landscape",
      "Brand & product audit",
      "Strategic brief",
    ],
  },
  {
    step: "02",
    title: "Design",
    description:
      "Brand, UX and UI come together in Figma — paired with motion, prototypes and developer-ready specs.",
    icon: PenTool,
    deliverables: [
      "Identity & visual system",
      "Wireframes & prototypes",
      "High-fidelity UI",
      "Design tokens & specs",
    ],
  },
  {
    step: "03",
    title: "Build",
    description:
      "Senior engineers ship in 1-week sprints. You get a working preview link from week one, with weekly reviews and automated QA.",
    icon: Wrench,
    deliverables: [
      "Next.js + TypeScript build",
      "Headless CMS integration",
      "CI / CD pipeline",
      "Accessibility & performance QA",
    ],
  },
  {
    step: "04",
    title: "Launch & grow",
    description:
      "We don't ship and leave. Post-launch we run SEO, analytics and experimentation programs to compound your gains.",
    icon: Rocket,
    deliverables: [
      "Go-live & monitoring",
      "Analytics & dashboards",
      "SEO & content program",
      "Quarterly roadmaps",
    ],
  },
];
