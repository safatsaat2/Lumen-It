"use client";

import { CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getTemplateById, type WebsiteTemplate } from "@/data/templates";
import type { Dictionary } from "@/i18n/dictionaries/types";
import type { SiteSettings } from "@/lib/content-store";

type ContactSectionProps = {
  dictionary: Dictionary;
  settings: SiteSettings;
  templates?: WebsiteTemplate[];
};

function ContactForm({
  dictionary,
  templates = [],
}: {
  dictionary: Dictionary;
  templates?: WebsiteTemplate[];
}) {
  const searchParams = useSearchParams();
  const t = dictionary.contact;
  const initialTemplateId = (searchParams.get("template") ?? "").trim().toUpperCase();
  const matched = getTemplateById(initialTemplateId, templates);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [templateId, setTemplateId] = useState(initialTemplateId);
  const [subject, setSubject] = useState(() =>
    matched
      ? t.templateInquirySubject.replace("{id}", matched.id)
      : "",
  );
  const activeTemplate = getTemplateById(templateId, templates);

  useEffect(() => {
    const fromUrl = (searchParams.get("template") ?? "").trim().toUpperCase();
    if (!fromUrl) return;
    setTemplateId(fromUrl);
    const found = getTemplateById(fromUrl, templates);
    if (found) {
      setSubject(t.templateInquirySubject.replace("{id}", found.id));
    }
  }, [searchParams, t.templateInquirySubject, templates]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const cleanedTemplateId = String(formData.get("templateId") || "")
      .trim()
      .toUpperCase();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone") || undefined,
          subject: formData.get("subject"),
          message: formData.get("message"),
          templateId: cleanedTemplateId || undefined,
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.error || t.error);
      }

      setSuccess(true);
      form.reset();
      setTemplateId("");
      setSubject("");
    } catch {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card/80 p-8 text-center sm:p-10"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="size-12 text-emerald-500" aria-hidden />
        <p className="max-w-md text-base text-foreground">{t.success}</p>
        <Button type="button" variant="outline" onClick={() => setSuccess(false)}>
          {t.submit}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-border bg-card/80 p-6 sm:p-8"
      noValidate
      data-gramm="false"
      data-gramm_editor="false"
      data-enable-grammarly="false"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t.name}</Label>
          <Input
            id="name"
            name="name"
            placeholder={t.namePlaceholder}
            required
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t.email}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t.emailPlaceholder}
            required
            autoComplete="email"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">{t.phone}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder={t.phonePlaceholder}
            autoComplete="tel"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">{t.subject}</Label>
          <Input
            id="subject"
            name="subject"
            placeholder={t.subjectPlaceholder}
            required
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="templateId">{t.templateId}</Label>
        <Input
          id="templateId"
          name="templateId"
          placeholder={t.templateIdPlaceholder}
          value={templateId}
          onChange={(event) => setTemplateId(event.target.value.toUpperCase())}
          autoComplete="off"
        />
        <p className="text-xs text-muted-foreground">{t.templateIdHelper}</p>
        {activeTemplate ? (
          <p className="text-xs font-medium text-primary">
            {activeTemplate.name} · {activeTemplate.categories.join(" · ")}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t.message}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t.messagePlaceholder}
          required
        />
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            {t.sending}
          </>
        ) : (
          t.submit
        )}
      </Button>
    </form>
  );
}

function ContactFormSkeleton() {
  return (
    <div
      className="space-y-5 rounded-3xl border border-border bg-card/80 p-6 sm:p-8"
      aria-hidden
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="h-16 animate-pulse rounded-xl bg-muted" />
        <div className="h-16 animate-pulse rounded-xl bg-muted" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="h-16 animate-pulse rounded-xl bg-muted" />
        <div className="h-16 animate-pulse rounded-xl bg-muted" />
      </div>
      <div className="h-20 animate-pulse rounded-xl bg-muted" />
      <div className="h-32 animate-pulse rounded-xl bg-muted" />
      <div className="h-12 animate-pulse rounded-full bg-muted" />
    </div>
  );
}

export function ContactSection({
  dictionary,
  settings,
  templates = [],
}: ContactSectionProps) {
  const [formReady, setFormReady] = useState(false);

  useEffect(() => {
    setFormReady(true);
  }, []);

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-violet-600/10 via-card to-fuchsia-500/5">
          <div className="grid gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
            <div className="space-y-8">
              <SectionHeading
                badge={dictionary.contact.badge}
                title={dictionary.contact.title}
                description={dictionary.contact.description}
                align="left"
                className="mx-0 max-w-none"
              />
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <a href={`mailto:${settings.email}`} className="hover:text-foreground">
                    {settings.email}
                  </a>
                </li>
                {settings.phone.trim() ? (
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <a
                      href={`tel:${settings.phone.replace(/\s/g, "")}`}
                      className="hover:text-foreground"
                    >
                      {settings.phone}
                    </a>
                  </li>
                ) : null}
                {settings.address.trim() ? (
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{settings.address}</span>
                  </li>
                ) : null}
              </ul>
            </div>

            {formReady ? (
              <Suspense fallback={<ContactFormSkeleton />}>
                <ContactForm dictionary={dictionary} templates={templates} />
              </Suspense>
            ) : (
              <ContactFormSkeleton />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
