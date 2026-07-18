import { NextResponse } from "next/server";
import { z } from "zod";

import { ConsultationAiError } from "@/lib/consultation/ai";
import {
  ConsultationFlowError,
  MAX_ANSWER_LENGTH,
  collectRoundAnswers,
  finalizeConsultation,
  findEnabledJourney,
  generateRoundAnalysis,
} from "@/lib/consultation/service";
import {
  ConsultationStorageError,
  readConsultation,
  updateConsultation,
} from "@/lib/consultation/store";
import {
  isValidConsultationId,
  type ConsultationRecord,
} from "@/lib/consultation/types";
import { readSiteContent } from "@/lib/content-store";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const submitSchema = z.object({
  answers: z
    .record(z.string().max(64), z.string().max(MAX_ANSWER_LENGTH * 2))
    .refine((value) => Object.keys(value).length <= 20, {
      message: "Too many answers.",
    })
    .default({}),
});

function aiErrorResponse(error: ConsultationAiError) {
  const status = error.code === "missing_key" ? 503 : 502;
  return NextResponse.json({ ok: false, error: error.message }, { status });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(`consultation:submit:${ip}`, {
    limit: 15,
    windowMs: 10 * 60 * 1000,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const { id } = await params;
  if (!isValidConsultationId(id)) {
    return NextResponse.json(
      { ok: false, error: "Consultation not found." },
      { status: 404 },
    );
  }

  let parsed: z.infer<typeof submitSchema>;
  try {
    parsed = submitSchema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 },
    );
  }

  try {
    const record = await readConsultation(id);
    if (!record) {
      return NextResponse.json(
        { ok: false, error: "Consultation not found." },
        { status: 404 },
      );
    }

    if (record.status === "completed") {
      return NextResponse.json(
        { ok: false, error: "This consultation is already completed." },
        { status: 409 },
      );
    }

    const content = await readSiteContent();
    const config = content.consultation;
    const journey = findEnabledJourney(config, record.journeyId);
    if (!journey) {
      return NextResponse.json(
        { ok: false, error: "This consultation journey is no longer available." },
        { status: 409 },
      );
    }

    const totalRounds = journey.rounds.length;

    // All rounds already answered but the report is missing (e.g. an earlier
    // report generation failed): retry finalization without new answers.
    if (record.currentRoundIndex >= totalRounds) {
      const completed = await finalizeConsultation(record, config);
      return NextResponse.json({ ok: true, consultation: completed });
    }

    const round = journey.rounds[record.currentRoundIndex];
    const answers = collectRoundAnswers(round, parsed.answers);
    const isFinalRound = record.currentRoundIndex === totalRounds - 1;

    const roundResult = {
      roundId: round.id,
      roundTitle: round.title,
      answers,
      analysis: "",
      completedAt: new Date().toISOString(),
    };

    if (!isFinalRound) {
      roundResult.analysis = await generateRoundAnalysis({
        settings: config.ai,
        journeyTitle: record.journeyTitle,
        locale: record.locale,
        completedRounds: [...record.rounds, roundResult],
        totalRounds,
      });
    }

    const progressed: ConsultationRecord = {
      ...record,
      rounds: [...record.rounds, roundResult],
      currentRoundIndex: record.currentRoundIndex + 1,
    };

    // Persist the answers before the (slow, fallible) final report call so a
    // failed report generation can be retried without re-entering answers.
    const saved = await updateConsultation(progressed);

    if (!isFinalRound) {
      return NextResponse.json({ ok: true, consultation: saved });
    }

    const completed = await finalizeConsultation(saved, config);
    return NextResponse.json({ ok: true, consultation: completed });
  } catch (error) {
    if (error instanceof ConsultationFlowError) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: error.status },
      );
    }
    if (error instanceof ConsultationAiError) {
      return aiErrorResponse(error);
    }
    if (error instanceof ConsultationStorageError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
    }
    console.error("[api/consultation/:id/submit] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Could not process this round. Please try again." },
      { status: 500 },
    );
  }
}
