import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { locales } from "@/i18n/config";
import { getAdminSession } from "@/lib/auth";
import {
  readSiteContent,
  writeSiteContent,
  type SiteContent,
} from "@/lib/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function revalidatePublicSite() {
  // Invalidate locale layouts + home pages so UI reflects admin saves.
  revalidatePath("/", "layout");
  for (const locale of locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}`, "layout");
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await readSiteContent();
    return NextResponse.json({ ok: true, content });
  } catch (error) {
    console.error("[admin/content] read failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load content." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { content?: SiteContent };
    if (!body.content?.de || !body.content?.en) {
      return NextResponse.json(
        { ok: false, error: "Invalid content payload." },
        { status: 400 },
      );
    }

    await writeSiteContent(body.content);
    revalidatePublicSite();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/content] write failed:", error);
    const message =
      error instanceof Error ? error.message : "Failed to save content.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
