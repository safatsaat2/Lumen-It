import { z } from "zod";

/* ------------------------------------------------------------------ */
/* Questions, rounds, journeys                                         */
/* ------------------------------------------------------------------ */

export const consultationQuestionSchema = z.object({
  id: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9][a-z0-9_-]*$/i, "Question id must be alphanumeric with - or _"),
  label: z.string().min(1).max(300),
  placeholder: z.string().max(300).default(""),
  required: z.boolean().default(true),
  enabled: z.boolean().default(true),
});

export const consultationRoundSchema = z.object({
  id: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9][a-z0-9_-]*$/i, "Round id must be alphanumeric with - or _"),
  title: z.string().min(1).max(200),
  questions: z.array(consultationQuestionSchema).min(1).max(10),
});

export const consultationJourneySchema = z.object({
  id: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9][a-z0-9_-]*$/i, "Journey id must be alphanumeric with - or _"),
  title: z.string().min(1).max(200),
  description: z.string().max(600).default(""),
  enabled: z.boolean().default(true),
  rounds: z.array(consultationRoundSchema).min(1).max(10),
});

export type ConsultationQuestion = z.infer<typeof consultationQuestionSchema>;
export type ConsultationRound = z.infer<typeof consultationRoundSchema>;
export type ConsultationJourney = z.infer<typeof consultationJourneySchema>;

/* ------------------------------------------------------------------ */
/* AI settings (no API key here — keys live in the private key store)  */
/* ------------------------------------------------------------------ */

export const consultationAiSettingsSchema = z.object({
  model: z.string().min(1).max(120),
  temperature: z.number().min(0).max(2),
  maxOutputTokens: z.number().int().min(256).max(16384),
  systemPrompt: z.string().min(1).max(8000),
});

export type ConsultationAiSettings = z.infer<typeof consultationAiSettingsSchema>;

/* ------------------------------------------------------------------ */
/* Offer banner                                                        */
/* ------------------------------------------------------------------ */

export const offerBannerSchema = z.object({
  enabled: z.boolean(),
  title: z.string().max(200),
  description: z.string().max(500),
  ctaLabel: z.string().max(80),
  ctaHref: z.string().max(300),
  backgroundColor: z.string().max(32),
  textColor: z.string().max(32),
  /** ISO datetime strings; null disables scheduling/countdown */
  startsAt: z.string().nullable(),
  endsAt: z.string().nullable(),
  countdownTo: z.string().nullable(),
});

export type OfferBanner = z.infer<typeof offerBannerSchema>;

/* ------------------------------------------------------------------ */
/* Consultation config stored inside SiteContent                       */
/* ------------------------------------------------------------------ */

export const consultationConfigSchema = z.object({
  journeys: z.array(consultationJourneySchema).min(1).max(20),
  ai: consultationAiSettingsSchema,
  offerBanner: offerBannerSchema,
});

export type ConsultationConfig = z.infer<typeof consultationConfigSchema>;

/* ------------------------------------------------------------------ */
/* Final structured report                                             */
/* ------------------------------------------------------------------ */

const score = z
  .number()
  .min(1)
  .max(10)
  .describe("Score from 1 (poor) to 10 (excellent)");

const roadmapPhaseSchema = z.object({
  objectives: z.array(z.string()).describe("Key goals for this phase"),
  actions: z.array(z.string()).describe("Concrete tasks to execute"),
  kpis: z.array(z.string()).describe("Measurable KPIs to track"),
});

export const brandingReportSchema = z.object({
  executiveSummary: z
    .string()
    .describe("Business overview based on the user's answers"),
  brandIdentity: z.object({
    brandPurpose: z.string(),
    vision: z.string(),
    mission: z.string(),
    coreValues: z.array(z.string()),
    brandPersonality: z.string(),
    toneOfVoice: z.string(),
  }),
  brandPositioning: z.object({
    marketPosition: z.string(),
    competitiveAdvantage: z.string(),
    usp: z.string().describe("Unique selling proposition"),
    customerPerception: z.string(),
  }),
  targetAudience: z.object({
    primaryAudience: z.string(),
    secondaryAudience: z.string(),
    buyerPersona: z.string(),
    customerPainPoints: z.array(z.string()),
    customerGoals: z.array(z.string()),
  }),
  competitorAnalysis: z.object({
    mainCompetitors: z.array(z.string()),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    marketGaps: z.array(z.string()),
    opportunities: z.array(z.string()),
  }),
  marketingStrategy: z.object({
    organicMarketing: z.string(),
    paidMarketing: z.string(),
    socialMediaStrategy: z.string(),
    contentStrategy: z.string(),
    seoSuggestions: z.string(),
    emailMarketing: z.string(),
    communityBuilding: z.string(),
  }),
  salesStrategy: z.object({
    customerJourney: z.string(),
    leadGeneration: z.string(),
    conversionStrategy: z.string(),
    retentionStrategy: z.string(),
  }),
  brandingRecommendations: z.object({
    logoDirection: z.string(),
    colorPalette: z.string(),
    typography: z.string(),
    brandVoice: z.string(),
    messaging: z.string(),
    visualConsistency: z.string(),
  }),
  growthRoadmap: z.object({
    first30Days: roadmapPhaseSchema,
    next90Days: roadmapPhaseSchema,
    sixMonths: roadmapPhaseSchema,
    oneYear: roadmapPhaseSchema,
  }),
  actionChecklist: z
    .array(
      z.object({
        task: z.string(),
        priority: z.enum(["high", "medium", "low"]),
      }),
    )
    .describe("Actionable checklist ordered by priority"),
  scorecard: z.object({
    brandIdentity: score,
    marketing: score,
    sales: score,
    website: score,
    socialMedia: score,
    customerTrust: score,
    scalability: score,
    innovation: score,
    overallBusinessHealth: score,
  }),
  finalRecommendations: z.object({
    summary: z.string().describe("Biggest opportunities in 2-4 sentences"),
    nextSteps: z.array(z.string()).describe("Immediate next steps"),
  }),
});

export type BrandingReport = z.infer<typeof brandingReportSchema>;

/* ------------------------------------------------------------------ */
/* Consultation records                                                */
/* ------------------------------------------------------------------ */

export const consultationAnswerSchema = z.object({
  questionId: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const consultationRoundResultSchema = z.object({
  roundId: z.string(),
  roundTitle: z.string(),
  answers: z.array(consultationAnswerSchema),
  analysis: z.string(),
  completedAt: z.string(),
});

export const consultationRecordSchema = z.object({
  /** Random UUID; also acts as the resume token. */
  id: z.string().uuid(),
  /** Language used for AI analyses and the final report. */
  locale: z.enum(["de", "en"]).default("en"),
  journeyId: z.string(),
  journeyTitle: z.string(),
  status: z.enum(["in_progress", "completed"]),
  /** Index of the next round the user has to answer. */
  currentRoundIndex: z.number().int().min(0),
  rounds: z.array(consultationRoundResultSchema),
  report: brandingReportSchema.nullable(),
  email: z.string().email().max(200).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ConsultationAnswer = z.infer<typeof consultationAnswerSchema>;
export type ConsultationRoundResult = z.infer<typeof consultationRoundResultSchema>;
export type ConsultationRecord = z.infer<typeof consultationRecordSchema>;

/** Summary shape for admin history lists. */
export type ConsultationSummary = {
  id: string;
  journeyId: string;
  journeyTitle: string;
  status: ConsultationRecord["status"];
  roundsCompleted: number;
  hasReport: boolean;
  email?: string;
  createdAt: string;
  updatedAt: string;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Strict UUID check used to sanitize ids coming from URLs/clients. */
export function isValidConsultationId(id: unknown): id is string {
  return typeof id === "string" && UUID_RE.test(id);
}
