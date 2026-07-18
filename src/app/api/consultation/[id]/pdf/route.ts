import { NextResponse } from "next/server";

import { renderReportPdf } from "@/lib/consultation/report-pdf";
import { ConsultationStorageError, readConsultation } from "@/lib/consultation/store";
import { isValidConsultationId } from "@/lib/consultation/types";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * PDF export for completed reports. Access control relies on the consultation
 * id being an unguessable random UUID (the same resume token the user holds);
 * admins can use the same URL from the history view.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(`consultation:pdf:${ip}`, {
    limit: 10,
    windowMs: 60 * 1000,
  });
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
    if (!record.report) {
      return NextResponse.json(
        { ok: false, error: "This consultation does not have a report yet." },
        { status: 409 },
      );
    }

    const buffer = await renderReportPdf(record, record.report);

    // id is a validated UUID, so the filename contains only safe characters.
    const filename = `branding-report-${record.id}.pdf`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    if (error instanceof ConsultationStorageError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
    }
    console.error("[api/consultation/:id/pdf] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to generate the PDF. Please try again." },
      { status: 500 },
    );
  }
}
