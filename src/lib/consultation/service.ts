import { generateFinalReport, generateRoundAnalysis } from "@/lib/consultation/ai";
import type {
  ConsultationConfig,
  ConsultationJourney,
  ConsultationRecord,
  ConsultationRound,
  ConsultationRoundResult,
} from "@/lib/consultation/types";
import { updateConsultation } from "@/lib/consultation/store";

/** Max characters accepted for a single answer. */
export const MAX_ANSWER_LENGTH = 2000;

export class ConsultationFlowError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export function findEnabledJourney(
  config: ConsultationConfig,
  journeyId: string,
): ConsultationJourney | null {
  const journey = config.journeys.find((j) => j.id === journeyId);
  return journey && journey.enabled ? journey : null;
}

function enabledQuestions(round: ConsultationRound) {
  return round.questions.filter((question) => question.enabled);
}

/** Journey shape safe to expose to the public client (enabled questions only). */
export function toPublicJourney(journey: ConsultationJourney) {
  return {
    id: journey.id,
    title: journey.title,
    description: journey.description,
    rounds: journey.rounds.map((round) => ({
      id: round.id,
      title: round.title,
      questions: enabledQuestions(round).map((question) => ({
        id: question.id,
        label: question.label,
        placeholder: question.placeholder,
        required: question.required,
      })),
    })),
  };
}

/**
 * Validate client answers for one round against the server-side question
 * definitions. Answers are only accepted for enabled questions; every enabled
 * required question must be answered. Question text always comes from the
 * server config so clients cannot inject prompt content beyond their answers.
 */
export function collectRoundAnswers(
  round: ConsultationRound,
  rawAnswers: Record<string, string>,
): ConsultationRoundResult["answers"] {
  const questions = enabledQuestions(round);
  if (questions.length === 0) {
    throw new ConsultationFlowError(
      "This consultation round has no active questions. Please contact support.",
      409,
    );
  }

  const answers: ConsultationRoundResult["answers"] = [];
  for (const question of questions) {
    const value = rawAnswers[question.id];
    const trimmed = typeof value === "string" ? value.trim() : "";
    if (!trimmed) {
      if (question.required) {
        throw new ConsultationFlowError(
          `Please answer: "${question.label}"`,
          422,
        );
      }
      continue;
    }
    if (trimmed.length > MAX_ANSWER_LENGTH) {
      throw new ConsultationFlowError(
        `Answers are limited to ${MAX_ANSWER_LENGTH} characters.`,
        422,
      );
    }
    answers.push({
      questionId: question.id,
      question: question.label,
      answer: trimmed,
    });
  }

  return answers;
}

/**
 * Generate the final report for a record whose rounds are all answered,
 * then persist and return the completed record.
 */
export async function finalizeConsultation(
  record: ConsultationRecord,
  config: ConsultationConfig,
): Promise<ConsultationRecord> {
  const report = await generateFinalReport({
    settings: config.ai,
    journeyTitle: record.journeyTitle,
    locale: record.locale,
    completedRounds: record.rounds,
  });

  return updateConsultation({
    ...record,
    report,
    status: "completed",
  });
}

export { generateRoundAnalysis };
