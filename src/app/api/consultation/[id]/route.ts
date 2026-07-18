import { NextResponse } from "next/server";

import { findEnabledJourney, toPublicJourney } from "@/lib/consultation/service";
import { ConsultationStorageError, readConsultation } from "@/lib/consultation/store";
import { isValidConsultationId } from "@/lib/consultation/types";
import { readSiteContent } from "@/lib/content-store";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(`consultation:read:${ip}`, {
    limit: 60,
    windowMs: 60 * 1000,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please slow down." },
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

  try {
    const record = await readConsultation(id);
    if (!record) {
      return NextResponse.json(
        { ok: false, error: "Consultation not found." },
        { status: 404 },
      );
    }

    const content = await readSiteContent();
    const journey = findEnabledJourney(content.consultation, record.journeyId);

    return NextResponse.json({
      ok: true,
      consultation: record,
      journey: journey ? toPublicJourney(journey) : null,
    });
  } catch (error) {
    if (error instanceof ConsultationStorageError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
    }
    console.error("[api/consultation/:id] read failed:", error);
    return NextResponse.json(
      { ok: false, error: "Could not load the consultation. Please try again." },
      { status: 500 },
    );
  }
}
