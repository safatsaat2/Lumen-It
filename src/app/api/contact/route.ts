import { Resend } from "resend";
import { z } from "zod";
import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z.string().trim().max(40).optional(),
  subject: z
    .string()
    .trim()
    .min(2, "Subject must be at least 2 characters")
    .max(200),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
  templateId: z
    .string()
    .trim()
    .max(40)
    .optional()
    .transform((value) => (value ? value.toUpperCase() : undefined)),
});

function debugInfo(from: string, to: string[]) {
  return {
    from,
    to,
    hasResendApiKey: Boolean(process.env.RESEND_API_KEY?.trim()),
    contactToEmailEnv: process.env.CONTACT_TO_EMAIL ?? "(not set — using default)",
    contactFromEmailEnv:
      process.env.CONTACT_FROM_EMAIL ?? "(not set — using default)",
  };
}

function fail(
  status: number,
  error: string,
  extra?: Record<string, unknown>,
) {
  return NextResponse.json({ ok: false, error, ...extra }, { status });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    return fail(400, "Request body was not valid JSON.", {
      details: error instanceof Error ? error.message : String(error),
    });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fields = parsed.error.issues.map((issue) => ({
      field: issue.path.join(".") || "form",
      message: issue.message,
    }));
    return fail(
      400,
      `Invalid form data: ${fields.map((item) => `${item.field} — ${item.message}`).join("; ")}`,
      { fields },
    );
  }

  const { name, email, phone, subject, message, templateId } = parsed.data;
  const to = parseRecipients(
    process.env.CONTACT_TO_EMAIL,
    siteConfig.contactEmail,
  );
  const from = formatFromAddress(
    process.env.CONTACT_FROM_EMAIL ?? `"MiHi Tech" <info@mihitech.org>`,
  );
  const debug = debugInfo(from, to);

  const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Template ID:</strong> ${escapeHtml(templateId || "—")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `;

  const text = [
    "New contact form submission",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Subject: ${subject}`,
    `Template ID: ${templateId || "—"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    console.info("[contact] RESEND_API_KEY missing — logging submission:", {
      to,
      name,
      email,
      phone,
      subject,
      templateId,
      message,
    });

    if (process.env.NODE_ENV === "production") {
      return fail(
        500,
        "RESEND_API_KEY is missing on the server. Add it in Vercel → Settings → Environment Variables, then redeploy.",
        { debug },
      );
    }

    return NextResponse.json({ ok: true, preview: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[MIHI's Contact]${templateId ? ` [${templateId}]` : ""} ${subject}`,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return fail(502, formatResendError(error), {
        resend: error,
        debug,
      });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return fail(500, error instanceof Error ? error.message : "Unexpected server error.", {
      details: error instanceof Error ? error.stack : String(error),
      debug,
    });
  }
}

function formatFromAddress(value: string) {
  const trimmed = value.trim().replace(/^['"]+|['"]+$/g, "");
  const match = trimmed.match(/^(.*)<([^>]+)>\s*$/);
  if (!match) return trimmed;
  const name = match[1].trim().replace(/^["']|["']$/g, "");
  const email = match[2].trim();
  if (!name) return email;
  return `"${name.replaceAll('"', "")}" <${email}>`;
}

function formatResendError(error: {
  message?: string | null;
  name?: string;
  statusCode?: number | null;
}) {
  const parts = [
    error.name,
    error.statusCode ? `HTTP ${error.statusCode}` : null,
    error.message,
  ].filter(Boolean);

  const raw = parts.join(" — ") || JSON.stringify(error);
  const message = (error.message ?? "").toLowerCase();

  if (
    message.includes("only send testing emails") ||
    message.includes("verify a domain")
  ) {
    return `${raw}. CONTACT_FROM_EMAIL must use @mihitech.org now that the domain is verified (not onboarding@resend.dev).`;
  }

  return raw;
}

function parseRecipients(value: string | undefined, fallback: string) {
  const emails = (value ?? fallback)
    .split(/[,;]+/)
    .map((entry) => entry.trim())
    .filter((entry) => z.string().email().safeParse(entry).success);

  return emails.length > 0 ? emails : [fallback];
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
