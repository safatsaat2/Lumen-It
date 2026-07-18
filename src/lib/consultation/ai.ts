import { createGroq } from "@ai-sdk/groq";
import { APICallError, generateText } from "ai";

import { resolveGroqApiKey } from "@/lib/consultation/key-store";
import {
  brandingReportSchema,
  type BrandingReport,
  type ConsultationAiSettings,
  type ConsultationRoundResult,
} from "@/lib/consultation/types";

export type ConsultationAiErrorCode =
  | "missing_key"
  | "provider_error"
  | "invalid_output";

export class ConsultationAiError extends Error {
  readonly code: ConsultationAiErrorCode;

  constructor(code: ConsultationAiErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

/** Hard ceiling for the analysis rounds so they stay short and cheap. */
const ROUND_MAX_OUTPUT_TOKENS = 1024;

/** Final reports are large; keep enough headroom without overshooting Groq limits. */
const REPORT_MAX_OUTPUT_TOKENS = 8192;

async function getProvider() {
  const resolved = await resolveGroqApiKey();
  if (!resolved) {
    throw new ConsultationAiError(
      "missing_key",
      "No Groq API key is configured. Set GROQ_API_KEY or save a key in the admin panel.",
    );
  }
  return createGroq({ apiKey: resolved.apiKey });
}

function formatRounds(rounds: ConsultationRoundResult[]): string {
  return rounds
    .map((round, index) => {
      const answers = round.answers
        .map((a) => `Q: ${a.question}\nA: ${a.answer}`)
        .join("\n\n");
      const analysis = round.analysis
        ? `\n\nYour previous analysis after this round:\n${round.analysis}`
        : "";
      return `--- Round ${index + 1}: ${round.roundTitle} ---\n${answers}${analysis}`;
    })
    .join("\n\n");
}

function toCleanError(error: unknown): ConsultationAiError {
  if (error instanceof ConsultationAiError) return error;
  if (APICallError.isInstance(error)) {
    console.error(
      "[consultation-ai] provider call failed:",
      error.statusCode,
      error.message,
      typeof error.responseBody === "string"
        ? error.responseBody.slice(0, 2000)
        : JSON.stringify(error.responseBody)?.slice(0, 2000),
    );
    if (error.statusCode === 401 || error.statusCode === 403) {
      return new ConsultationAiError(
        "missing_key",
        "The configured Groq API key was rejected. Check the key in the admin panel or GROQ_API_KEY.",
      );
    }
    return new ConsultationAiError(
      "provider_error",
      "The AI provider could not process the request. Please try again shortly.",
    );
  }
  console.error("[consultation-ai] generation failed:", error);
  return new ConsultationAiError(
    "provider_error",
    "AI generation failed unexpectedly. Please try again shortly.",
  );
}

/**
 * Extract the first JSON object from a model response.
 * Handles raw JSON and fenced ```json blocks.
 */
function extractJsonObject(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = (fenced?.[1] ?? trimmed).trim();

  try {
    return JSON.parse(candidate);
  } catch {
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(candidate.slice(start, end + 1));
    }
    throw new ConsultationAiError(
      "invalid_output",
      "The AI returned a malformed report. Please try again.",
    );
  }
}

const REPORT_JSON_SHAPE = `{
  "executiveSummary": "string",
  "brandIdentity": {
    "brandPurpose": "string",
    "vision": "string",
    "mission": "string",
    "coreValues": ["string"],
    "brandPersonality": "string",
    "toneOfVoice": "string"
  },
  "brandPositioning": {
    "marketPosition": "string",
    "competitiveAdvantage": "string",
    "usp": "string",
    "customerPerception": "string"
  },
  "targetAudience": {
    "primaryAudience": "string",
    "secondaryAudience": "string",
    "buyerPersona": "string",
    "customerPainPoints": ["string"],
    "customerGoals": ["string"]
  },
  "competitorAnalysis": {
    "mainCompetitors": ["string"],
    "strengths": ["string"],
    "weaknesses": ["string"],
    "marketGaps": ["string"],
    "opportunities": ["string"]
  },
  "marketingStrategy": {
    "organicMarketing": "string",
    "paidMarketing": "string",
    "socialMediaStrategy": "string",
    "contentStrategy": "string",
    "seoSuggestions": "string",
    "emailMarketing": "string",
    "communityBuilding": "string"
  },
  "salesStrategy": {
    "customerJourney": "string",
    "leadGeneration": "string",
    "conversionStrategy": "string",
    "retentionStrategy": "string"
  },
  "brandingRecommendations": {
    "logoDirection": "string",
    "colorPalette": "string",
    "typography": "string",
    "brandVoice": "string",
    "messaging": "string",
    "visualConsistency": "string"
  },
  "growthRoadmap": {
    "first30Days": { "objectives": ["string"], "actions": ["string"], "kpis": ["string"] },
    "next90Days": { "objectives": ["string"], "actions": ["string"], "kpis": ["string"] },
    "sixMonths": { "objectives": ["string"], "actions": ["string"], "kpis": ["string"] },
    "oneYear": { "objectives": ["string"], "actions": ["string"], "kpis": ["string"] }
  },
  "actionChecklist": [{ "task": "string", "priority": "high|medium|low" }],
  "scorecard": {
    "brandIdentity": 1-10,
    "marketing": 1-10,
    "sales": 1-10,
    "website": 1-10,
    "socialMedia": 1-10,
    "customerTrust": 1-10,
    "scalability": 1-10,
    "innovation": 1-10,
    "overallBusinessHealth": 1-10
  },
  "finalRecommendations": {
    "summary": "string",
    "nextSteps": ["string"]
  }
}`;

/**
 * Generate a short cumulative analysis after a round.
 * Receives all completed rounds (including the one just answered) so the
 * model always has the full context.
 */
export async function generateRoundAnalysis(options: {
  settings: ConsultationAiSettings;
  journeyTitle: string;
  locale: "de" | "en";
  completedRounds: ConsultationRoundResult[];
  totalRounds: number;
}): Promise<string> {
  const { settings, journeyTitle, locale, completedRounds, totalRounds } = options;
  const provider = await getProvider();
  const model = provider(settings.model);
  const roundNumber = completedRounds.length;

  const prompt = [
    `Consultation journey: "${journeyTitle}".`,
    `The user has completed round ${roundNumber} of ${totalRounds}.`,
    "",
    "All answers so far (with your earlier analyses):",
    "",
    formatRounds(completedRounds),
    "",
    `Write a short, personalized cumulative analysis (3-6 sentences) of the user's business situation after round ${roundNumber}.`,
    "Reference their specific answers, connect insights across rounds, point out one hidden opportunity or risk, and make them curious to continue.",
    `Write entirely in ${locale === "de" ? "German" : "English"}.`,
    "Do not use markdown headings. Do not repeat the questions verbatim.",
  ].join("\n");

  try {
    const result = await generateText({
      model,
      system: settings.systemPrompt,
      prompt,
      temperature: settings.temperature,
      maxOutputTokens: Math.min(settings.maxOutputTokens, ROUND_MAX_OUTPUT_TOKENS),
    });
    const text = result.text.trim();
    if (!text) {
      throw new ConsultationAiError(
        "invalid_output",
        "The AI returned an empty analysis. Please try again.",
      );
    }
    return text;
  } catch (error) {
    throw toCleanError(error);
  }
}

/**
 * Generate the final branding report.
 *
 * Uses plain-text JSON generation (not Groq `json_schema` structured outputs)
 * so any chat model works — including llama-3.3-70b-versatile, which does not
 * support response_format=json_schema.
 */
export async function generateFinalReport(options: {
  settings: ConsultationAiSettings;
  journeyTitle: string;
  locale: "de" | "en";
  completedRounds: ConsultationRoundResult[];
}): Promise<BrandingReport> {
  const { settings, journeyTitle, locale, completedRounds } = options;
  const provider = await getProvider();
  const language = locale === "de" ? "German" : "English";

  const prompt = [
    `Consultation journey: "${journeyTitle}". The user has completed every round.`,
    "",
    "Full consultation transcript (answers and your cumulative analyses):",
    "",
    formatRounds(completedRounds),
    "",
    "Produce the complete professional branding and business strategy report as a single JSON object.",
    `Write every string field entirely in ${language}.`,
    "Personalize every section to the user's answers, explain why each recommendation is made, and keep advice practical and realistic.",
    "Scores must be numbers between 1 and 10 that honestly reflect the information provided.",
    "priority values must be exactly one of: high, medium, low.",
    "",
    "Return ONLY valid JSON matching this exact shape (no markdown, no commentary):",
    REPORT_JSON_SHAPE,
  ].join("\n");

  async function attempt(): Promise<BrandingReport> {
    const result = await generateText({
      model: provider(settings.model),
      system: `${settings.systemPrompt}

When asked for a report, respond with a single valid JSON object only. Do not wrap it in markdown fences unless required. Do not add prose before or after the JSON.`,
      prompt,
      temperature: Math.min(settings.temperature, 0.6),
      maxOutputTokens: Math.min(
        Math.max(settings.maxOutputTokens, 4096),
        REPORT_MAX_OUTPUT_TOKENS,
      ),
    });

    const text = result.text.trim();
    if (!text) {
      throw new ConsultationAiError(
        "invalid_output",
        "The AI returned an empty report. Please try again.",
      );
    }

    let raw: unknown;
    try {
      raw = extractJsonObject(text);
    } catch (error) {
      console.error(
        "[consultation-ai] failed to parse report JSON. Preview:",
        text.slice(0, 800),
      );
      throw error;
    }

    const parsed = brandingReportSchema.safeParse(raw);
    if (!parsed.success) {
      console.error(
        "[consultation-ai] report schema validation failed:",
        parsed.error.issues.slice(0, 8),
      );
      throw new ConsultationAiError(
        "invalid_output",
        "The AI returned a malformed report. Please try again.",
      );
    }
    return parsed.data;
  }

  try {
    return await attempt();
  } catch (error) {
    // One retry helps when the model returns slightly malformed JSON.
    if (
      error instanceof ConsultationAiError &&
      error.code === "invalid_output"
    ) {
      try {
        return await attempt();
      } catch (retryError) {
        throw toCleanError(retryError);
      }
    }
    throw toCleanError(error);
  }
}
