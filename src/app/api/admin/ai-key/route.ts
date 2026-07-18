import { NextResponse } from "next/server";
import { z } from "zod";

import { getAdminSession } from "@/lib/auth";
import {
  KeyStoreConfigError,
  clearAdminGroqKey,
  getGroqKeyStatus,
  saveAdminGroqKey,
} from "@/lib/consultation/key-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const saveSchema = z.object({
  apiKey: z.string().min(20).max(256),
});

export async function GET() {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const status = await getGroqKeyStatus();
    return NextResponse.json({ ok: true, status });
  } catch (error) {
    console.error("[admin/ai-key] status failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load API key status." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let parsed: z.infer<typeof saveSchema>;
  try {
    parsed = saveSchema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { ok: false, error: "Provide a valid API key." },
      { status: 400 },
    );
  }

  try {
    await saveAdminGroqKey(parsed.apiKey);
    const status = await getGroqKeyStatus();
    return NextResponse.json({ ok: true, status });
  } catch (error) {
    if (error instanceof KeyStoreConfigError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
    }
    console.error("[admin/ai-key] save failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save the API key." },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await clearAdminGroqKey();
    const status = await getGroqKeyStatus();
    return NextResponse.json({ ok: true, status });
  } catch (error) {
    if (error instanceof KeyStoreConfigError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
    }
    console.error("[admin/ai-key] clear failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to remove the API key." },
      { status: 500 },
    );
  }
}
