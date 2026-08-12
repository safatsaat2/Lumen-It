import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
]);

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "BLOB_READ_WRITE_TOKEN is not configured. Paste a public/ path or image URL instead.",
      },
      { status: 503 },
    );
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const templateId = String(form.get("templateId") || "template")
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, "")
      .slice(0, 32);

    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "Missing image file." },
        { status: 400 },
      );
    }

    if (!ALLOWED.has(file.type)) {
      return NextResponse.json(
        { ok: false, error: "Only PNG, JPEG, WebP, or GIF images are allowed." },
        { status: 400 },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Image must be 8MB or smaller." },
        { status: 400 },
      );
    }

    const ext =
      file.type === "image/png"
        ? "png"
        : file.type === "image/webp"
          ? "webp"
          : file.type === "image/gif"
            ? "gif"
            : "jpg";

    const pathname = `templates/${templateId || "template"}-${Date.now()}.${ext}`;
    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: file.type,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      storeId: process.env.BLOB_STORE_ID,
    });

    return NextResponse.json({ ok: true, url: blob.url });
  } catch (error) {
    console.error("[admin/templates/upload] failed:", error);
    const message =
      error instanceof Error ? error.message : "Failed to upload image.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
