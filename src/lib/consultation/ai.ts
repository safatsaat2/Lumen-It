import { createGroq } from "@ai-sdk/groq";
import { APICallError, Output, generateText } from "ai";

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

/**
 * Fallback model used for the final report when the configured model does not
 * support Groq structured outputs (`response_format: json_schema`).
 * See https://console.groq.com/docs/structured-outputs#supported-models
 */
const STRUCTURED_OUTPUT_FALLBACK_MODEL = "openai/gpt-oss-120b";

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

/** True when the error is Groq rejecting json_schema for the current model. */
function isJsonSchemaUnsupported(error: unknown): boolean {
  return (
    APICallError.isInstance(error) &&
    error.statusCode === 400 &&
    /does not support response format `?json_schema`?/i.test(error.message)
  );
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
      JSON.stringify(error.responseBody),
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
 * Generate the final structured branding report from all rounds,
 * validated against the report schema.
 */
export async function generateFinalReport(options: {
  settings: ConsultationAiSettings;
  journeyTitle: string;
  locale: "de" | "en";
  completedRounds: ConsultationRoundResult[];
}): Promise<BrandingReport> {
  const { settings, journeyTitle, locale, completedRounds } = options;
  const provider = await getProvider();

  const prompt = [
    `Consultation journey: "${journeyTitle}". The user has completed every round.`,
    "",
    "Full consultation transcript (answers and your cumulative analyses):",
    "",
    formatRounds(completedRounds),
    "",
    "Now produce the complete, professional branding and business strategy report.",
    "Personalize every section to the user's answers, explain why each recommendation is made, and keep advice practical and realistic.",
    `Write every report field entirely in ${locale === "de" ? "German" : "English"}.`,
    "Scores must be integers or halves between 1 and 10 that honestly reflect the information provided.",
  ].join("\n");

  async function generateWith(modelId: string) {
    const result = await generateText({
      model: provider(modelId),
      output: Output.object({
        schema: brandingReportSchema,
      }),
      system: settings.systemPrompt,
      prompt,
      temperature: settings.temperature,
      maxOutputTokens: settings.maxOutputTokens,
    });

    const parsed = brandingReportSchema.safeParse(result.output);
    if (!parsed.success) {
      throw new ConsultationAiError(
        "invalid_output",
        "The AI returned a malformed report. Please try again.",
      );
    }
    return parsed.data;
  }

  try {
    return await generateWith(settings.model);
  } catch (error) {
    // The configured model may not support Groq structured outputs. Retry once
    // with a structured-output-capable model so the report still generates.
    if (
      isJsonSchemaUnsupported(error) &&
      settings.model !== STRUCTURED_OUTPUT_FALLBACK_MODEL
    ) {
      console.warn(
        `[consultation-ai] "${settings.model}" lacks json_schema support; ` +
          `retrying report with "${STRUCTURED_OUTPUT_FALLBACK_MODEL}".`,
      );
      try {
        return await generateWith(STRUCTURED_OUTPUT_FALLBACK_MODEL);
      } catch (fallbackError) {
        throw toCleanError(fallbackError);
      }
    }
    throw toCleanError(error);
  }
}
