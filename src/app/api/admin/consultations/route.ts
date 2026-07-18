import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/auth";
import {
  ConsultationStorageError,
  listConsultations,
} from "@/lib/consultation/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const consultations = await listConsultations();
    return NextResponse.json({ ok: true, consultations });
  } catch (error) {
    if (error instanceof ConsultationStorageError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
    }
    console.error("[admin/consultations] list failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load consultations." },
      { status: 500 },
    );
  }
}
