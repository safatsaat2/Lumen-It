import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/auth";
import {
  ConsultationStorageError,
  readConsultation,
} from "@/lib/consultation/store";
import { isValidConsultationId } from "@/lib/consultation/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!isValidConsultationId(id)) {
    return NextResponse.json(
      { ok: false, error: "Consultation not found." },
      { status: 404 },
    );
  }

  try {
    const consultation = await readConsultation(id);
    if (!consultation) {
      return NextResponse.json(
        { ok: false, error: "Consultation not found." },
        { status: 404 },
      );
    }
    return NextResponse.json({ ok: true, consultation });
  } catch (error) {
    if (error instanceof ConsultationStorageError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
    }
    console.error("[admin/consultations/:id] read failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load the consultation." },
      { status: 500 },
    );
  }
}
