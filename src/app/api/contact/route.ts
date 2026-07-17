import { Resend } from "resend";
import { z } from "zod";
import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().min(2).max(200),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid form data." },
        { status: 400 },
      );
    }

    const { name, email, phone, subject, message } = parsed.data;
    const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contactEmail;
    const from =
      process.env.CONTACT_FROM_EMAIL ?? "MIHI's Website <onboarding@resend.dev>";

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `;

    const text = [
      "New contact form submission",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Development / misconfiguration fallback: log payload so the form still "succeeds" locally
      console.info("[contact] RESEND_API_KEY missing — logging submission:", {
        to,
        name,
        email,
        phone,
        subject,
        message,
      });

      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { ok: false, error: "Email service is not configured." },
          { status: 500 },
        );
      }

      return NextResponse.json({ ok: true, preview: true });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[MIHI's Contact] ${subject}`,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send email." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
