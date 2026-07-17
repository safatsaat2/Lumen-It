"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SERVICE_ICON_NAMES } from "@/data/service-icons";
import type { ServiceContent } from "@/data/services";
import type { Locale } from "@/i18n/config";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

type AdminServicesEditorProps = {
  locale: Locale;
  services: ServiceContent[];
  onChange: (services: ServiceContent[]) => void;
};

export function AdminServicesEditor({
  locale,
  services,
  onChange,
}: AdminServicesEditorProps) {
  const otherLocale: Locale = locale === "de" ? "en" : "de";

  function updateService(index: number, patch: Partial<ServiceContent>) {
    const next = [...services];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  }

  function updateLocalized(
    index: number,
    field: "title" | "short" | "long" | "cta" | "seoTitle" | "metaDescription",
    value: string,
  ) {
    const service = services[index];
    updateService(index, {
      [field]: { ...service[field], [locale]: value },
    });
  }

  function updateBenefits(index: number, value: string) {
    const service = services[index];
    updateService(index, {
      benefits: {
        ...service.benefits,
        [locale]: value
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
      },
    });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card/40 p-4 text-sm text-muted-foreground">
        Editing <strong className="text-foreground">{locale.toUpperCase()}</strong>{" "}
        copy for service cards and detail pages. Slug, icon, and accent are shared.
        Switch language to edit {otherLocale.toUpperCase()} text.
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            onChange([
              ...services,
              {
                slug: `service-${Date.now()}`,
                icon: "Code2",
                accent: "from-violet-500 to-indigo-500",
                title: { de: "Neuer Service", en: "New service" },
                short: { de: "", en: "" },
                long: { de: "", en: "" },
                benefits: { de: [], en: [] },
                cta: { de: "Anfragen", en: "Inquire" },
                seoTitle: { de: "Service | MIHI's", en: "Service | MIHI's" },
                metaDescription: { de: "", en: "" },
              },
            ])
          }
        >
          <Plus className="size-4" aria-hidden />
          Add service
        </Button>
      </div>

      {services.map((service, index) => (
        <article
          key={`${service.slug}-${index}`}
          className="space-y-4 rounded-2xl border border-border bg-card/60 p-4 sm:p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-medium">
              {service.title[locale] || service.slug || `Service ${index + 1}`}
            </h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => onChange(services.filter((_, i) => i !== index))}
            >
              <Trash2 className="size-4" aria-hidden />
              Delete
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Slug (URL)">
              <Input
                value={service.slug}
                onChange={(e) =>
                  updateService(index, {
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, "-"),
                  })
                }
              />
            </Field>
            <Field label="Icon">
              <select
                className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
                value={service.icon}
                onChange={(e) =>
                  updateService(index, {
                    icon: e.target.value as ServiceContent["icon"],
                  })
                }
              >
                {SERVICE_ICON_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Accent gradient classes">
              <Input
                value={service.accent}
                onChange={(e) => updateService(index, { accent: e.target.value })}
                placeholder="from-violet-500 to-indigo-500"
              />
            </Field>
            <Field label={`CTA (${locale.toUpperCase()})`}>
              <Input
                value={service.cta[locale]}
                onChange={(e) => updateLocalized(index, "cta", e.target.value)}
              />
            </Field>
          </div>

          <Field label={`Title (${locale.toUpperCase()})`}>
            <Input
              value={service.title[locale]}
              onChange={(e) => updateLocalized(index, "title", e.target.value)}
            />
          </Field>
          <Field label={`Short summary (${locale.toUpperCase()})`}>
            <Textarea
              value={service.short[locale]}
              onChange={(e) => updateLocalized(index, "short", e.target.value)}
            />
          </Field>
          <Field label={`Full detail page text (${locale.toUpperCase()})`}>
            <Textarea
              className="min-h-32"
              value={service.long[locale]}
              onChange={(e) => updateLocalized(index, "long", e.target.value)}
            />
          </Field>
          <Field label={`Benefits — one per line (${locale.toUpperCase()})`}>
            <Textarea
              value={service.benefits[locale].join("\n")}
              onChange={(e) => updateBenefits(index, e.target.value)}
            />
          </Field>
          <Field label={`SEO title (${locale.toUpperCase()})`}>
            <Input
              value={service.seoTitle[locale]}
              onChange={(e) => updateLocalized(index, "seoTitle", e.target.value)}
            />
          </Field>
          <Field label={`Meta description (${locale.toUpperCase()})`}>
            <Textarea
              value={service.metaDescription[locale]}
              onChange={(e) =>
                updateLocalized(index, "metaDescription", e.target.value)
              }
            />
          </Field>
        </article>
      ))}
    </div>
  );
}
