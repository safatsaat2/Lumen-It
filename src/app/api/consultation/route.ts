import { NextResponse } from "next/server";
import { z } from "zod";

import { ConsultationStorageError, createConsultation } from "@/lib/consultation/store";
import { findEnabledJourney, toPublicJourney } from "@/lib/consultation/service";
import { readSiteContent } from "@/lib/content-store";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const createSchema = z.object({
  journeyId: z.string().min(1).max(64),
  locale: z.enum(["de", "en"]).default("en"),
  email: z.string().trim().email().max(200).optional(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(`consultation:create:${ip}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many consultations started. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let parsed: z.infer<typeof createSchema>;
  try {
    parsed = createSchema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 },
    );
  }

  try {
    const content = await readSiteContent();
    const journey = findEnabledJourney(content.consultation, parsed.journeyId);
    if (!journey) {
      return NextResponse.json(
        { ok: false, error: "Unknown consultation journey." },
        { status: 404 },
      );
    }

    const record = await createConsultation({
      locale: parsed.locale,
      journeyId: journey.id,
      journeyTitle: journey.title,
      ...(parsed.email ? { email: parsed.email } : {}),
    });

    return NextResponse.json({
      ok: true,
      consultation: record,
      journey: toPublicJourney(journey),
    });
  } catch (error) {
    if (error instanceof ConsultationStorageError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
    }
    console.error("[api/consultation] create failed:", error);
    return NextResponse.json(
      { ok: false, error: "Could not start the consultation. Please try again." },
      { status: 500 },
    );
  }
}
