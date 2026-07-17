import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { locales } from "@/i18n/config";
import { getAdminSession } from "@/lib/auth";
import {
  normalizeSiteContent,
  writeSiteContent,
  readSiteContent,
  type SiteContent,
} from "@/lib/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function revalidatePublicSite(content: SiteContent) {
  revalidatePath("/", "layout");
  for (const locale of locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}`, "layout");
    revalidatePath(`/${locale}/privacy`);
    revalidatePath(`/${locale}/terms`);
    revalidatePath(`/${locale}/cookies`);
    for (const service of content.services) {
      revalidatePath(`/${locale}/services/${service.slug}`);
    }
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

    const normalized = await normalizeSiteContent(body.content);
    await writeSiteContent(normalized);
    revalidatePublicSite(normalized);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/content] write failed:", error);
    const message =
      error instanceof Error ? error.message : "Failed to save content.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
