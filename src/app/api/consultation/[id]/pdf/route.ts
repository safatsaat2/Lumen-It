import { NextResponse } from "next/server";
import { z } from "zod";

import { renderReportPdf } from "@/lib/consultation/report-pdf";
import { ConsultationStorageError, readConsultation } from "@/lib/consultation/store";
import {
  consultationRecordSchema,
  isValidConsultationId,
  type ConsultationRecord,
} from "@/lib/consultation/types";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function rateLimited(request: Request) {
  const ip = getClientIp(request);
  return checkRateLimit(`consultation:pdf:${ip}`, {
    limit: 10,
    windowMs: 60 * 1000,
  });
}

async function pdfResponse(record: ConsultationRecord) {
  if (!record.report) {
    return NextResponse.json(
      { ok: false, error: "This consultation does not have a report yet." },
      { status: 409 },
    );
  }

  const buffer = await renderReportPdf(record, record.report);
  const filename = `branding-report-${record.id}.pdf`;
  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

function pdfError(error: unknown) {
  if (error instanceof ConsultationStorageError) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
  }
  console.error("[api/consultation/:id/pdf] failed:", error);
  return NextResponse.json(
    { ok: false, error: "Failed to generate the PDF. Please try again." },
    { status: 500 },
  );
}

/**
 * PDF export for completed reports. Access control relies on the consultation
 * id being an unguessable random UUID (the same resume token the user holds);
 * admins can use the same URL from the history view.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const limit = rateLimited(request);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many downloads. Please try again shortly." },
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
    return await pdfResponse(record);
  } catch (error) {
    return pdfError(error);
  }
}

const postSchema = z.object({
  consultation: consultationRecordSchema,
});

/** Used when Blob is off and the report only exists in the browser session. */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const limit = rateLimited(request);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many downloads. Please try again shortly." },
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
    const stored = await readConsultation(id);
    let record = stored;
    if (!record) {
      const parsed = postSchema.parse(await request.json());
      if (parsed.consultation.id !== id) {
        return NextResponse.json(
          { ok: false, error: "Consultation not found." },
          { status: 404 },
        );
      }
      record = parsed.consultation;
    }
    return await pdfResponse(record);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "Invalid request payload." },
        { status: 400 },
      );
    }
    return pdfError(error);
  }
}
