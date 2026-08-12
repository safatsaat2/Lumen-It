"use client";

import { useMemo, useState } from "react";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Field } from "@/components/admin/admin-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TEMPLATE_CATEGORIES,
  imageFromUrl,
  nextTemplateId,
  slugifyTemplateName,
  type WebsiteTemplate,
} from "@/data/templates";
import { cn } from "@/lib/utils";

type AdminTemplatesEditorProps = {
  templates: WebsiteTemplate[];
  onChange: (templates: WebsiteTemplate[]) => void;
};

export function AdminTemplatesEditor({
  templates,
  onChange,
}: AdminTemplatesEditorProps) {
  const [query, setQuery] = useState("");
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const featuredCount = templates.filter((t) => t.featured).length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return templates.map((template, index) => ({ template, index }));
    return templates
      .map((template, index) => ({ template, index }))
      .filter(({ template }) => {
        const haystack = [
          template.id,
          template.name,
          template.slug,
          template.websiteUrl,
          ...template.categories,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
  }, [query, templates]);

  function updateAt(index: number, patch: Partial<WebsiteTemplate>) {
    const next = [...templates];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  }

  function addTemplate() {
    const id = nextTemplateId(templates);
    onChange([
      {
        id,
        name: "New Template",
        slug: `template-${id.toLowerCase()}`,
        categories: ["Business"],
        image: "",
        websiteUrl: "https://",
        featured: false,
      },
      ...templates,
    ]);
    setQuery("");
    toast.message(`Added ${id} — fill in details, then Save changes`);
  }

  async function uploadImage(index: number, file: File) {
    const template = templates[index];
    setUploadingId(template.id);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("templateId", template.id);
      const response = await fetch("/api/admin/templates/upload", {
        method: "POST",
        body,
      });
      const data = (await response.json()) as {
        ok?: boolean;
        url?: string;
        error?: string;
      };
      if (!response.ok || !data.ok || !data.url) {
        throw new Error(data.error || "Upload failed");
      }
      updateAt(index, { image: data.url });
      toast.success("Screenshot uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploadingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card/40 p-4 text-sm text-muted-foreground">
        Manage Ready-to-Go templates shown on the homepage and Templates page.
        Mark up to ~12 as <strong className="text-foreground">Featured</strong> for
        the homepage showcase. Save changes to publish.
        <p className="mt-2">
          Currently <strong className="text-foreground">{templates.length}</strong>{" "}
          templates · <strong className="text-foreground">{featuredCount}</strong>{" "}
          featured
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, ID, category…"
          className="sm:max-w-sm"
        />
        <Button type="button" size="sm" variant="outline" onClick={addTemplate}>
          <Plus className="size-4" aria-hidden />
          Add template
        </Button>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
          No templates match this search.
        </p>
      ) : null}

      {filtered.map(({ template, index }) => (
        <article
          key={`${template.id}-${index}`}
          className="space-y-4 rounded-2xl border border-border bg-card/60 p-4 sm:p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-medium">
                {template.name || "Untitled"}{" "}
                <span className="font-mono text-xs text-muted-foreground">
                  {template.id}
                </span>
              </h3>
              <p className="text-xs text-muted-foreground">
                {template.categories.join(" · ") || "No categories"}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => onChange(templates.filter((_, i) => i !== index))}
            >
              <Trash2 className="size-4" aria-hidden />
              Delete
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Template ID">
              <Input
                value={template.id}
                onChange={(event) =>
                  updateAt(index, {
                    id: event.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""),
                  })
                }
              />
            </Field>
            <Field label="Name">
              <Input
                value={template.name}
                onChange={(event) => {
                  const name = event.target.value;
                  const patch: Partial<WebsiteTemplate> = { name };
                  if (!template.slug || template.slug.startsWith("template-")) {
                    patch.slug = slugifyTemplateName(name);
                  }
                  updateAt(index, patch);
                }}
              />
            </Field>
            <Field label="Slug">
              <Input
                value={template.slug}
                onChange={(event) =>
                  updateAt(index, {
                    slug: slugifyTemplateName(event.target.value) || event.target.value,
                  })
                }
              />
            </Field>
            <Field label="Live website URL">
              <Input
                value={template.websiteUrl}
                onChange={(event) => {
                  const websiteUrl = event.target.value;
                  const patch: Partial<WebsiteTemplate> = { websiteUrl };
                  if (!template.image || template.image.startsWith("/https")) {
                    const suggested = imageFromUrl(websiteUrl);
                    if (suggested) patch.image = suggested;
                  }
                  updateAt(index, patch);
                }}
              />
            </Field>
          </div>

          <Field label="Screenshot image path or URL">
              <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={template.image}
                onChange={(event) => updateAt(index, { image: event.target.value })}
                placeholder="/httpsmihi-example.vercel.app.png or https://…"
                className="flex-1"
              />
              <label className="inline-flex cursor-pointer">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="sr-only"
                  disabled={uploadingId === template.id}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void uploadImage(index, file);
                    event.target.value = "";
                  }}
                />
                <span
                  className={cn(
                    "inline-flex h-9 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium transition hover:bg-foreground/5",
                    uploadingId === template.id && "pointer-events-none opacity-60",
                  )}
                >
                  <ImagePlus className="size-4" aria-hidden />
                  {uploadingId === template.id ? "Uploading…" : "Upload"}
                </span>
              </label>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Local files live under <code>public/</code>. Upload stores a public Blob URL
              on Vercel.
            </p>
          </Field>

          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="flex flex-wrap gap-2">
              {TEMPLATE_CATEGORIES.map((category) => {
                const active = template.categories.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      const categories = active
                        ? template.categories.filter((c) => c !== category)
                        : [...template.categories, category];
                      updateAt(index, { categories });
                    }}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background/60 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
            <Input
              value={template.categories.join(", ")}
              onChange={(event) =>
                updateAt(index, {
                  categories: event.target.value
                    .split(",")
                    .map((c) => c.trim())
                    .filter(Boolean),
                })
              }
              placeholder="Or type custom categories, comma-separated"
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={template.featured}
              onChange={(event) =>
                updateAt(index, { featured: event.target.checked })
              }
              className="size-4 rounded border-border"
            />
            Featured on homepage
          </label>
        </article>
      ))}
    </div>
  );
}
