import {
  consultationConfigSchema,
  type ConsultationConfig,
  type ConsultationJourney,
} from "@/lib/consultation/types";

function q(id: string, label: string) {
  return { id, label, placeholder: "", required: true, enabled: true };
}

const journeyBuildBrand: ConsultationJourney = {
  id: "build-brand",
  title: "Build a Brand From Scratch",
  description:
    "For new entrepreneurs, startup founders, freelancers, and small businesses that want to start and launch a brand.",
  enabled: true,
  rounds: [
    {
      id: "round-1",
      title: "Your Idea",
      questions: [
        q("business-idea", "What is your business idea?"),
        q("problem-solved", "What problem does your business solve?"),
        q("ideal-customer", "Who is your ideal customer?"),
      ],
    },
    {
      id: "round-2",
      title: "Differentiation",
      questions: [
        q("business-name", "Do you already have a business name?"),
        q("differentiator", "What makes your business different?"),
        q("competitors", "Who are your biggest competitors?"),
      ],
    },
    {
      id: "round-3",
      title: "Offer & Market",
      questions: [
        q("products-services", "What products or services will you offer?"),
        q("monthly-budget", "What is your expected monthly budget?"),
        q("markets", "Which countries or cities will you serve?"),
      ],
    },
    {
      id: "round-4",
      title: "Growth Plans",
      questions: [
        q("marketing-channels", "Which marketing channels will you use?"),
        q("challenges", "What are your biggest challenges?"),
        q("goals-12-months", "What are your goals for the next 12 months?"),
      ],
    },
  ],
};

const journeyImproveBusiness: ConsultationJourney = {
  id: "improve-business",
  title: "Improve an Existing Business",
  description:
    "For established businesses that want expert recommendations on branding, marketing, sales, operations, and growth.",
  enabled: true,
  rounds: [
    {
      id: "round-1",
      title: "Your Business Today",
      questions: [
        q("business-description", "What does your business do?"),
        q("operating-time", "How long have you been operating?"),
        q("biggest-challenge", "What is your biggest business challenge today?"),
      ],
    },
    {
      id: "round-2",
      title: "Market & Revenue",
      questions: [
        q("current-channels", "What marketing channels are you currently using?"),
        q("main-competitors", "Who are your main competitors?"),
        q("revenue-range", "What is your current monthly revenue range?"),
      ],
    },
    {
      id: "round-3",
      title: "Team & Goals",
      questions: [
        q("team-size", "How large is your team?"),
        q("improvement-areas", "Which areas need improvement?"),
        q("current-goals", "What are your current business goals?"),
      ],
    },
    {
      id: "round-4",
      title: "Brand & Vision",
      questions: [
        q("branding-assets", "What branding assets do you already have?"),
        q("best-campaigns", "Which marketing campaigns worked best?"),
        q("one-year-target", "What do you want to achieve within the next year?"),
      ],
    },
  ],
};

export const DEFAULT_CONSULTATION_SYSTEM_PROMPT = `You are a senior branding consultant, startup advisor, marketing strategist, and business analyst working for Mihi's Agency.

Rules you must always follow:
- Never provide generic answers; personalize every recommendation to the user's specific answers.
- Use all previous answers and analyses as context and build on them.
- Identify hidden opportunities and weaknesses the user may not see.
- Give practical, realistic, and actionable advice.
- Explain why each recommendation is made.
- Be encouraging but honest; do not flatter or invent facts the user did not provide.`;

export function defaultConsultationConfig(): ConsultationConfig {
  return consultationConfigSchema.parse({
    journeys: [
      structuredClone(journeyBuildBrand),
      structuredClone(journeyImproveBusiness),
    ],
    ai: {
      model: "openai/gpt-oss-120b",
      temperature: 0.7,
      maxOutputTokens: 8192,
      systemPrompt: DEFAULT_CONSULTATION_SYSTEM_PROMPT,
    },
    offerBanner: {
      enabled: false,
      title: "",
      description: "",
      ctaLabel: "",
      ctaHref: "",
      backgroundColor: "#0f172a",
      textColor: "#f8fafc",
      startsAt: null,
      endsAt: null,
      countdownTo: null,
    },
  });
}

/**
 * Merge unknown/legacy JSON into a valid ConsultationConfig without throwing.
 * Invalid journeys/settings fall back to the defaults.
 */
export function normalizeConsultationConfig(raw: unknown): ConsultationConfig {
  const defaults = defaultConsultationConfig();
  if (!raw || typeof raw !== "object") return defaults;

  const candidate = raw as Partial<ConsultationConfig>;

  const journeys = consultationConfigSchema.shape.journeys.safeParse(
    candidate.journeys,
  );
  const ai = consultationConfigSchema.shape.ai.safeParse({
    ...defaults.ai,
    ...(candidate.ai && typeof candidate.ai === "object" ? candidate.ai : {}),
  });
  const offerBanner = consultationConfigSchema.shape.offerBanner.safeParse({
    ...defaults.offerBanner,
    ...(candidate.offerBanner && typeof candidate.offerBanner === "object"
      ? candidate.offerBanner
      : {}),
  });

  return {
    journeys: journeys.success ? journeys.data : defaults.journeys,
    ai: ai.success ? ai.data : defaults.ai,
    offerBanner: offerBanner.success ? offerBanner.data : defaults.offerBanner,
  };
}
