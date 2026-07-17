"use client";

import { useMemo, useState } from "react";
import {
  Briefcase,
  Building2,
  CircleHelp,
  Contact,
  FileText,
  Globe2,
  Layers3,
  Loader2,
  Menu,
  MessageSquareQuote,
  Navigation,
  Plus,
  Save,
  Share2,
  Sparkles,
  Trash2,
  Users,
  Wrench,
  Workflow,
} from "lucide-react";
import { toast } from "sonner";

import { AdminClientsEditor } from "@/components/admin/admin-clients-editor";
import { StringFieldsEditor } from "@/components/admin/admin-field";
import { AdminLegalEditor } from "@/components/admin/admin-legal-editor";
import { AdminServicesEditor } from "@/components/admin/admin-services-editor";
import { AdminSettingsEditor } from "@/components/admin/admin-settings-editor";
import { AdminSocialEditor } from "@/components/admin/admin-social-editor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import type { SiteContent } from "@/lib/content-store";
import { cn } from "@/lib/utils";

type SectionId =
  | "settings"
  | "meta"
  | "nav"
  | "language"
  | "hero"
  | "clients"
  | "about"
  | "servicesSection"
  | "services"
  | "work"
  | "process"
  | "pricing"
  | "testimonials"
  | "faq"
  | "contact"
  | "footer"
  | "social"
  | "legal";

const SECTIONS: { id: SectionId; label: string; icon: typeof Sparkles }[] = [
  { id: "settings", label: "Site settings", icon: Building2 },
  { id: "meta", label: "SEO / Meta", icon: Globe2 },
  { id: "nav", label: "Navigation", icon: Navigation },
  { id: "language", label: "Language UI", icon: Menu },
  { id: "hero", label: "Hero", icon: Sparkles },
  { id: "clients", label: "Clients", icon: Users },
  { id: "about", label: "About", icon: Layers3 },
  { id: "servicesSection", label: "Services section", icon: Layers3 },
  { id: "services", label: "Service pages", icon: Wrench },
  { id: "work", label: "Work cards", icon: Briefcase },
  { id: "process", label: "Process", icon: Workflow },
  { id: "pricing", label: "Pricing", icon: Layers3 },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "faq", label: "FAQ", icon: CircleHelp },
  { id: "contact", label: "Contact", icon: Contact },
  { id: "footer", label: "Footer", icon: FileText },
  { id: "social", label: "Social links", icon: Share2 },
  { id: "legal", label: "Legal pages", icon: FileText },
];

type AdminDashboardProps = {
  initialContent: SiteContent;
};

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

function CardShell({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove?: () => void;
  children: React.ReactNode;
}) {
  return (
    <article className="space-y-4 rounded-2xl border border-border bg-card/60 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-medium">{title}</h3>
        {onRemove ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="size-4" aria-hidden />
            Delete
          </Button>
        ) : null}
      </div>
      <div className="grid gap-4">{children}</div>
    </article>
  );
}

export function AdminDashboard({ initialContent }: AdminDashboardProps) {
  const [content, setContent] = useState<SiteContent>(() =>
    initialContent,
  );
  const [locale, setLocale] = useState<Locale>("de");
  const [section, setSection] = useState<SectionId>("hero");
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const localeContent = content[locale];

  function updateLocale(
    updater: (current: Dictionary) => Dictionary,
  ) {
    setContent((prev) => ({
      ...prev,
      [locale]: updater(prev[locale]),
    }));
    setDirty(true);
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Save failed");
      }
      setDirty(false);
      toast.success("Content saved — refresh the public site to see changes");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed", {
        duration: 8000,
      });
    } finally {
      setSaving(false);
    }
  }

  const sectionTitle = useMemo(
    () => SECTIONS.find((s) => s.id === section)?.label ?? section,
    [section],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="space-y-4">
        <div className="rounded-2xl border border-border bg-card/50 p-3">
          <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Edit language
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(["de", "en"] as const).map((l) => (
              <Button
                key={l}
                type="button"
                size="sm"
                variant={locale === l ? "primary" : "outline"}
                onClick={() => setLocale(l)}
              >
                {l.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        <nav className="space-y-1 rounded-2xl border border-border bg-card/50 p-2">
          {SECTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                  section === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {sectionTitle}
              </h1>
              <Badge variant="outline">{locale.toUpperCase()}</Badge>
              {dirty ? <Badge variant="primary">Unsaved</Badge> : null}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Local: saves to <code className="text-xs">content/site-content.json</code>.
              On Vercel: requires <code className="text-xs">BLOB_READ_WRITE_TOKEN</code> or
              GitHub token env vars.
            </p>
          </div>
          <Button
            type="button"
            variant="primary"
            onClick={save}
            disabled={saving || !dirty}
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Save className="size-4" aria-hidden />
            )}
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>

        {section === "hero" ? (
          <div className="grid gap-4 rounded-2xl border border-border bg-card/40 p-5">
            {(
              [
                ["badge", "Badge"],
                ["titleBefore", "Title before highlight"],
                ["titleHighlight", "Title highlight"],
                ["titleAfter", "Title after highlight"],
                ["description", "Description"],
                ["ctaPrimary", "Primary CTA"],
                ["ctaSecondary", "Secondary CTA"],
                ["trust", "Trust line"],
              ] as const
            ).map(([key, label]) => (
              <Field key={key} label={label}>
                {key === "description" ? (
                  <Textarea
                    value={localeContent.hero[key]}
                    onChange={(e) =>
                      updateLocale((c) => ({
                        ...c,
                        hero: { ...c.hero, [key]: e.target.value },
                      }))
                    }
                  />
                ) : (
                  <Input
                    value={localeContent.hero[key]}
                    onChange={(e) =>
                      updateLocale((c) => ({
                        ...c,
                        hero: { ...c.hero, [key]: e.target.value },
                      }))
                    }
                  />
                )}
              </Field>
            ))}
          </div>
        ) : null}

        {section === "about" ? (
          <div className="space-y-6">
            <div className="grid gap-4 rounded-2xl border border-border bg-card/40 p-5">
              {(
                [
                  ["badge", "Badge"],
                  ["title", "Title"],
                  ["description", "Description"],
                  ["storyTitle", "Story title"],
                  ["storyP1", "Story paragraph 1"],
                  ["storyP2", "Story paragraph 2"],
                ] as const
              ).map(([key, label]) => (
                <Field key={key} label={label}>
                  {key.startsWith("storyP") || key === "description" ? (
                    <Textarea
                      value={localeContent.about[key]}
                      onChange={(e) =>
                        updateLocale((c) => ({
                          ...c,
                          about: { ...c.about, [key]: e.target.value },
                        }))
                      }
                    />
                  ) : (
                    <Input
                      value={localeContent.about[key]}
                      onChange={(e) =>
                        updateLocale((c) => ({
                          ...c,
                          about: { ...c.about, [key]: e.target.value },
                        }))
                      }
                    />
                  )}
                </Field>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Stats</h2>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateLocale((c) => ({
                      ...c,
                      about: {
                        ...c.about,
                        stats: [
                          ...c.about.stats,
                          { value: "0", label: "New stat", description: "" },
                        ],
                      },
                    }))
                  }
                >
                  <Plus className="size-4" aria-hidden />
                  Add stat
                </Button>
              </div>
              {localeContent.about.stats.map((stat, index) => (
                <CardShell
                  key={`stat-${index}`}
                  title={`Stat ${index + 1}`}
                  onRemove={() =>
                    updateLocale((c) => ({
                      ...c,
                      about: {
                        ...c.about,
                        stats: c.about.stats.filter((_, i) => i !== index),
                      },
                    }))
                  }
                >
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Value">
                      <Input
                        value={stat.value}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const stats = [...c.about.stats];
                            stats[index] = { ...stats[index], value: e.target.value };
                            return { ...c, about: { ...c.about, stats } };
                          })
                        }
                      />
                    </Field>
                    <Field label="Label">
                      <Input
                        value={stat.label}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const stats = [...c.about.stats];
                            stats[index] = { ...stats[index], label: e.target.value };
                            return { ...c, about: { ...c.about, stats } };
                          })
                        }
                      />
                    </Field>
                    <Field label="Description">
                      <Input
                        value={stat.description}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const stats = [...c.about.stats];
                            stats[index] = {
                              ...stats[index],
                              description: e.target.value,
                            };
                            return { ...c, about: { ...c.about, stats } };
                          })
                        }
                      />
                    </Field>
                  </div>
                </CardShell>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Timeline</h2>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateLocale((c) => ({
                      ...c,
                      about: {
                        ...c.about,
                        timeline: [
                          ...c.about.timeline,
                          { year: "2026", title: "New milestone", description: "" },
                        ],
                      },
                    }))
                  }
                >
                  <Plus className="size-4" aria-hidden />
                  Add milestone
                </Button>
              </div>
              {localeContent.about.timeline.map((entry, index) => (
                <CardShell
                  key={`timeline-${index}`}
                  title={`Milestone ${index + 1}`}
                  onRemove={() =>
                    updateLocale((c) => ({
                      ...c,
                      about: {
                        ...c.about,
                        timeline: c.about.timeline.filter((_, i) => i !== index),
                      },
                    }))
                  }
                >
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Year">
                      <Input
                        value={entry.year}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const timeline = [...c.about.timeline];
                            timeline[index] = {
                              ...timeline[index],
                              year: e.target.value,
                            };
                            return { ...c, about: { ...c.about, timeline } };
                          })
                        }
                      />
                    </Field>
                    <Field label="Title">
                      <Input
                        value={entry.title}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const timeline = [...c.about.timeline];
                            timeline[index] = {
                              ...timeline[index],
                              title: e.target.value,
                            };
                            return { ...c, about: { ...c.about, timeline } };
                          })
                        }
                      />
                    </Field>
                    <Field label="Description">
                      <Input
                        value={entry.description}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const timeline = [...c.about.timeline];
                            timeline[index] = {
                              ...timeline[index],
                              description: e.target.value,
                            };
                            return { ...c, about: { ...c.about, timeline } };
                          })
                        }
                      />
                    </Field>
                  </div>
                </CardShell>
              ))}
            </div>
          </div>
        ) : null}

        {section === "work" ? (
          <div className="space-y-6">
            <div className="grid gap-4 rounded-2xl border border-border bg-card/40 p-5">
              {(
                [
                  ["badge", "Badge"],
                  ["title", "Title"],
                  ["description", "Description"],
                  ["viewCase", "Card CTA"],
                ] as const
              ).map(([key, label]) => (
                <Field key={key} label={label}>
                  {key === "description" ? (
                    <Textarea
                      value={localeContent.work[key]}
                      onChange={(e) =>
                        updateLocale((c) => ({
                          ...c,
                          work: { ...c.work, [key]: e.target.value },
                        }))
                      }
                    />
                  ) : (
                    <Input
                      value={localeContent.work[key]}
                      onChange={(e) =>
                        updateLocale((c) => ({
                          ...c,
                          work: { ...c.work, [key]: e.target.value },
                        }))
                      }
                    />
                  )}
                </Field>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Project cards</h2>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateLocale((c) => ({
                      ...c,
                      projects: [
                        ...c.projects,
                        {
                          slug: `project-${Date.now()}`,
                          title: "New project",
                          summary: "",
                          category: "Web",
                          tags: [],
                          cover:
                            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
                          metrics: [{ label: "Metric", value: "0" }],
                        },
                      ],
                    }))
                  }
                >
                  <Plus className="size-4" aria-hidden />
                  Add project
                </Button>
              </div>

              {localeContent.projects.map((project, index) => (
                <CardShell
                  key={project.slug}
                  title={project.title || `Project ${index + 1}`}
                  onRemove={() =>
                    updateLocale((c) => ({
                      ...c,
                      projects: c.projects.filter((_, i) => i !== index),
                    }))
                  }
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Title">
                      <Input
                        value={project.title}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const projects = [...c.projects];
                            projects[index] = {
                              ...projects[index],
                              title: e.target.value,
                            };
                            return { ...c, projects };
                          })
                        }
                      />
                    </Field>
                    <Field label="Slug">
                      <Input
                        value={project.slug}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const projects = [...c.projects];
                            projects[index] = {
                              ...projects[index],
                              slug: e.target.value,
                            };
                            return { ...c, projects };
                          })
                        }
                      />
                    </Field>
                    <Field label="Category">
                      <Input
                        value={project.category}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const projects = [...c.projects];
                            projects[index] = {
                              ...projects[index],
                              category: e.target.value,
                            };
                            return { ...c, projects };
                          })
                        }
                      />
                    </Field>
                    <Field label="Tags (comma separated)">
                      <Input
                        value={project.tags.join(", ")}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const projects = [...c.projects];
                            projects[index] = {
                              ...projects[index],
                              tags: e.target.value
                                .split(",")
                                .map((t) => t.trim())
                                .filter(Boolean),
                            };
                            return { ...c, projects };
                          })
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Summary">
                    <Textarea
                      value={project.summary}
                      onChange={(e) =>
                        updateLocale((c) => {
                          const projects = [...c.projects];
                          projects[index] = {
                            ...projects[index],
                            summary: e.target.value,
                          };
                          return { ...c, projects };
                        })
                      }
                    />
                  </Field>
                  <Field label="Cover image URL">
                    <Input
                      value={project.cover}
                      onChange={(e) =>
                        updateLocale((c) => {
                          const projects = [...c.projects];
                          projects[index] = {
                            ...projects[index],
                            cover: e.target.value,
                          };
                          return { ...c, projects };
                        })
                      }
                    />
                  </Field>
                  <Field label="Metrics (label:value per line)">
                    <Textarea
                      value={project.metrics
                        .map((m) => `${m.label}:${m.value}`)
                        .join("\n")}
                      onChange={(e) =>
                        updateLocale((c) => {
                          const projects = [...c.projects];
                          projects[index] = {
                            ...projects[index],
                            metrics: e.target.value
                              .split("\n")
                              .map((line) => line.trim())
                              .filter(Boolean)
                              .map((line) => {
                                const [label, ...rest] = line.split(":");
                                return {
                                  label: label.trim(),
                                  value: rest.join(":").trim() || "",
                                };
                              }),
                          };
                          return { ...c, projects };
                        })
                      }
                    />
                  </Field>
                </CardShell>
              ))}
            </div>
          </div>
        ) : null}

        {section === "process" ? (
          <div className="space-y-6">
            <div className="grid gap-4 rounded-2xl border border-border bg-card/40 p-5">
              {(
                [
                  ["badge", "Badge"],
                  ["title", "Title"],
                  ["description", "Description"],
                ] as const
              ).map(([key, label]) => (
                <Field key={key} label={label}>
                  {key === "description" ? (
                    <Textarea
                      value={localeContent.process[key]}
                      onChange={(e) =>
                        updateLocale((c) => ({
                          ...c,
                          process: { ...c.process, [key]: e.target.value },
                        }))
                      }
                    />
                  ) : (
                    <Input
                      value={localeContent.process[key]}
                      onChange={(e) =>
                        updateLocale((c) => ({
                          ...c,
                          process: { ...c.process, [key]: e.target.value },
                        }))
                      }
                    />
                  )}
                </Field>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Process steps</h2>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateLocale((c) => ({
                      ...c,
                      process: {
                        ...c.process,
                        steps: [
                          ...c.process.steps,
                          {
                            step: String(c.process.steps.length + 1).padStart(2, "0"),
                            title: "New step",
                            description: "",
                            deliverables: [],
                          },
                        ],
                      },
                    }))
                  }
                >
                  <Plus className="size-4" aria-hidden />
                  Add step
                </Button>
              </div>

              {localeContent.process.steps.map((step, index) => (
                <CardShell
                  key={`step-${index}`}
                  title={`${step.step} · ${step.title}`}
                  onRemove={() =>
                    updateLocale((c) => ({
                      ...c,
                      process: {
                        ...c.process,
                        steps: c.process.steps.filter((_, i) => i !== index),
                      },
                    }))
                  }
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Step number">
                      <Input
                        value={step.step}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const steps = [...c.process.steps];
                            steps[index] = { ...steps[index], step: e.target.value };
                            return { ...c, process: { ...c.process, steps } };
                          })
                        }
                      />
                    </Field>
                    <Field label="Title">
                      <Input
                        value={step.title}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const steps = [...c.process.steps];
                            steps[index] = { ...steps[index], title: e.target.value };
                            return { ...c, process: { ...c.process, steps } };
                          })
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <Textarea
                      value={step.description}
                      onChange={(e) =>
                        updateLocale((c) => {
                          const steps = [...c.process.steps];
                          steps[index] = {
                            ...steps[index],
                            description: e.target.value,
                          };
                          return { ...c, process: { ...c.process, steps } };
                        })
                      }
                    />
                  </Field>
                  <Field label="Deliverables (one per line)">
                    <Textarea
                      value={step.deliverables.join("\n")}
                      onChange={(e) =>
                        updateLocale((c) => {
                          const steps = [...c.process.steps];
                          steps[index] = {
                            ...steps[index],
                            deliverables: e.target.value
                              .split("\n")
                              .map((line) => line.trim())
                              .filter(Boolean),
                          };
                          return { ...c, process: { ...c.process, steps } };
                        })
                      }
                    />
                  </Field>
                </CardShell>
              ))}
            </div>
          </div>
        ) : null}

        {section === "pricing" ? (
          <div className="space-y-6">
            <div className="grid gap-4 rounded-2xl border border-border bg-card/40 p-5">
              {(
                [
                  ["badge", "Badge"],
                  ["title", "Title"],
                  ["description", "Description"],
                  ["monthly", "Monthly label"],
                  ["yearly", "Yearly label"],
                  ["save", "Save badge"],
                  ["mostPopular", "Most popular label"],
                ] as const
              ).map(([key, label]) => (
                <Field key={key} label={label}>
                  {key === "description" ? (
                    <Textarea
                      value={localeContent.pricing[key]}
                      onChange={(e) =>
                        updateLocale((c) => ({
                          ...c,
                          pricing: { ...c.pricing, [key]: e.target.value },
                        }))
                      }
                    />
                  ) : (
                    <Input
                      value={localeContent.pricing[key]}
                      onChange={(e) =>
                        updateLocale((c) => ({
                          ...c,
                          pricing: { ...c.pricing, [key]: e.target.value },
                        }))
                      }
                    />
                  )}
                </Field>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Pricing tiers</h2>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateLocale((c) => ({
                      ...c,
                      pricing: {
                        ...c.pricing,
                        tiers: [
                          ...c.pricing.tiers,
                          {
                            id: `tier-${Date.now()}`,
                            name: "New tier",
                            description: "",
                            monthly: 1000,
                            yearly: 10000,
                            cta: "Get started",
                            features: [],
                          },
                        ],
                      },
                    }))
                  }
                >
                  <Plus className="size-4" aria-hidden />
                  Add tier
                </Button>
              </div>

              {localeContent.pricing.tiers.map((tier, index) => (
                <CardShell
                  key={tier.id}
                  title={tier.name}
                  onRemove={() =>
                    updateLocale((c) => ({
                      ...c,
                      pricing: {
                        ...c.pricing,
                        tiers: c.pricing.tiers.filter((_, i) => i !== index),
                      },
                    }))
                  }
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name">
                      <Input
                        value={tier.name}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const tiers = [...c.pricing.tiers];
                            tiers[index] = { ...tiers[index], name: e.target.value };
                            return { ...c, pricing: { ...c.pricing, tiers } };
                          })
                        }
                      />
                    </Field>
                    <Field label="CTA">
                      <Input
                        value={tier.cta}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const tiers = [...c.pricing.tiers];
                            tiers[index] = { ...tiers[index], cta: e.target.value };
                            return { ...c, pricing: { ...c.pricing, tiers } };
                          })
                        }
                      />
                    </Field>
                    <Field label="Monthly (€)">
                      <Input
                        type="number"
                        value={tier.monthly}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const tiers = [...c.pricing.tiers];
                            tiers[index] = {
                              ...tiers[index],
                              monthly: Number(e.target.value) || 0,
                            };
                            return { ...c, pricing: { ...c.pricing, tiers } };
                          })
                        }
                      />
                    </Field>
                    <Field label="Yearly (€)">
                      <Input
                        type="number"
                        value={tier.yearly}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const tiers = [...c.pricing.tiers];
                            tiers[index] = {
                              ...tiers[index],
                              yearly: Number(e.target.value) || 0,
                            };
                            return { ...c, pricing: { ...c.pricing, tiers } };
                          })
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <Textarea
                      value={tier.description}
                      onChange={(e) =>
                        updateLocale((c) => {
                          const tiers = [...c.pricing.tiers];
                          tiers[index] = {
                            ...tiers[index],
                            description: e.target.value,
                          };
                          return { ...c, pricing: { ...c.pricing, tiers } };
                        })
                      }
                    />
                  </Field>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={Boolean(tier.highlight)}
                      onChange={(e) =>
                        updateLocale((c) => {
                          const tiers = [...c.pricing.tiers];
                          tiers[index] = {
                            ...tiers[index],
                            highlight: e.target.checked,
                          };
                          return { ...c, pricing: { ...c.pricing, tiers } };
                        })
                      }
                    />
                    Highlight as most popular
                  </label>
                  <Field label="Features (one per line)">
                    <Textarea
                      value={tier.features.join("\n")}
                      onChange={(e) =>
                        updateLocale((c) => {
                          const tiers = [...c.pricing.tiers];
                          tiers[index] = {
                            ...tiers[index],
                            features: e.target.value
                              .split("\n")
                              .map((line) => line.trim())
                              .filter(Boolean),
                          };
                          return { ...c, pricing: { ...c.pricing, tiers } };
                        })
                      }
                    />
                  </Field>
                </CardShell>
              ))}
            </div>
          </div>
        ) : null}

        {section === "testimonials" ? (
          <div className="space-y-6">
            <div className="grid gap-4 rounded-2xl border border-border bg-card/40 p-5">
              {(
                [
                  ["badge", "Badge"],
                  ["title", "Title"],
                  ["description", "Description"],
                ] as const
              ).map(([key, label]) => (
                <Field key={key} label={label}>
                  {key === "description" ? (
                    <Textarea
                      value={localeContent.testimonials[key]}
                      onChange={(e) =>
                        updateLocale((c) => ({
                          ...c,
                          testimonials: {
                            ...c.testimonials,
                            [key]: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    <Input
                      value={localeContent.testimonials[key]}
                      onChange={(e) =>
                        updateLocale((c) => ({
                          ...c,
                          testimonials: {
                            ...c.testimonials,
                            [key]: e.target.value,
                          },
                        }))
                      }
                    />
                  )}
                </Field>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Quotes</h2>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateLocale((c) => ({
                      ...c,
                      testimonials: {
                        ...c.testimonials,
                        items: [
                          ...c.testimonials.items,
                          {
                            id: String(Date.now()),
                            quote: "",
                            name: "Name",
                            role: "Role",
                            company: "Company",
                            rating: 5,
                            avatar:
                              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
                          },
                        ],
                      },
                    }))
                  }
                >
                  <Plus className="size-4" aria-hidden />
                  Add testimonial
                </Button>
              </div>

              {localeContent.testimonials.items.map((item, index) => (
                <CardShell
                  key={item.id}
                  title={item.name}
                  onRemove={() =>
                    updateLocale((c) => ({
                      ...c,
                      testimonials: {
                        ...c.testimonials,
                        items: c.testimonials.items.filter((_, i) => i !== index),
                      },
                    }))
                  }
                >
                  <Field label="Quote">
                    <Textarea
                      value={item.quote}
                      onChange={(e) =>
                        updateLocale((c) => {
                          const items = [...c.testimonials.items];
                          items[index] = { ...items[index], quote: e.target.value };
                          return {
                            ...c,
                            testimonials: { ...c.testimonials, items },
                          };
                        })
                      }
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name">
                      <Input
                        value={item.name}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const items = [...c.testimonials.items];
                            items[index] = { ...items[index], name: e.target.value };
                            return {
                              ...c,
                              testimonials: { ...c.testimonials, items },
                            };
                          })
                        }
                      />
                    </Field>
                    <Field label="Role">
                      <Input
                        value={item.role}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const items = [...c.testimonials.items];
                            items[index] = { ...items[index], role: e.target.value };
                            return {
                              ...c,
                              testimonials: { ...c.testimonials, items },
                            };
                          })
                        }
                      />
                    </Field>
                    <Field label="Company">
                      <Input
                        value={item.company}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const items = [...c.testimonials.items];
                            items[index] = {
                              ...items[index],
                              company: e.target.value,
                            };
                            return {
                              ...c,
                              testimonials: { ...c.testimonials, items },
                            };
                          })
                        }
                      />
                    </Field>
                    <Field label="Rating (1–5)">
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        value={item.rating}
                        onChange={(e) =>
                          updateLocale((c) => {
                            const items = [...c.testimonials.items];
                            items[index] = {
                              ...items[index],
                              rating: Math.min(
                                5,
                                Math.max(1, Number(e.target.value) || 5),
                              ),
                            };
                            return {
                              ...c,
                              testimonials: { ...c.testimonials, items },
                            };
                          })
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Avatar URL">
                    <Input
                      value={item.avatar}
                      onChange={(e) =>
                        updateLocale((c) => {
                          const items = [...c.testimonials.items];
                          items[index] = { ...items[index], avatar: e.target.value };
                          return {
                            ...c,
                            testimonials: { ...c.testimonials, items },
                          };
                        })
                      }
                    />
                  </Field>
                </CardShell>
              ))}
            </div>
          </div>
        ) : null}

        {section === "faq" ? (
          <div className="space-y-6">
            <div className="grid gap-4 rounded-2xl border border-border bg-card/40 p-5">
              {(
                [
                  ["badge", "Badge"],
                  ["title", "Title"],
                  ["description", "Description"],
                ] as const
              ).map(([key, label]) => (
                <Field key={key} label={label}>
                  {key === "description" ? (
                    <Textarea
                      value={localeContent.faq[key]}
                      onChange={(e) =>
                        updateLocale((c) => ({
                          ...c,
                          faq: { ...c.faq, [key]: e.target.value },
                        }))
                      }
                    />
                  ) : (
                    <Input
                      value={localeContent.faq[key]}
                      onChange={(e) =>
                        updateLocale((c) => ({
                          ...c,
                          faq: { ...c.faq, [key]: e.target.value },
                        }))
                      }
                    />
                  )}
                </Field>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Questions</h2>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateLocale((c) => ({
                      ...c,
                      faq: {
                        ...c.faq,
                        items: [
                          ...c.faq.items,
                          { question: "New question?", answer: "" },
                        ],
                      },
                    }))
                  }
                >
                  <Plus className="size-4" aria-hidden />
                  Add FAQ
                </Button>
              </div>

              {localeContent.faq.items.map((item, index) => (
                <CardShell
                  key={`faq-${index}`}
                  title={item.question || `FAQ ${index + 1}`}
                  onRemove={() =>
                    updateLocale((c) => ({
                      ...c,
                      faq: {
                        ...c.faq,
                        items: c.faq.items.filter((_, i) => i !== index),
                      },
                    }))
                  }
                >
                  <Field label="Question">
                    <Input
                      value={item.question}
                      onChange={(e) =>
                        updateLocale((c) => {
                          const items = [...c.faq.items];
                          items[index] = {
                            ...items[index],
                            question: e.target.value,
                          };
                          return { ...c, faq: { ...c.faq, items } };
                        })
                      }
                    />
                  </Field>
                  <Field label="Answer">
                    <Textarea
                      value={item.answer}
                      onChange={(e) =>
                        updateLocale((c) => {
                          const items = [...c.faq.items];
                          items[index] = { ...items[index], answer: e.target.value };
                          return { ...c, faq: { ...c.faq, items } };
                        })
                      }
                    />
                  </Field>
                </CardShell>
              ))}
            </div>
          </div>
        ) : null}

        {section === "contact" ? (
          <div className="grid gap-4 rounded-2xl border border-border bg-card/40 p-5">
            {Object.entries(localeContent.contact).map(([key, value]) => (
              <Field key={key} label={key}>
                {key === "description" ||
                key === "messagePlaceholder" ||
                key === "success" ||
                key === "error" ? (
                  <Textarea
                    value={value}
                    onChange={(e) =>
                      updateLocale((c) => ({
                        ...c,
                        contact: { ...c.contact, [key]: e.target.value },
                      }))
                    }
                  />
                ) : (
                  <Input
                    value={value}
                    onChange={(e) =>
                      updateLocale((c) => ({
                        ...c,
                        contact: { ...c.contact, [key]: e.target.value },
                      }))
                    }
                  />
                )}
              </Field>
            ))}
          </div>
        ) : null}

        {section === "settings" ? (
          <AdminSettingsEditor
            settings={content.settings}
            onChange={(settings) => {
              setContent((prev) => ({ ...prev, settings }));
              setDirty(true);
            }}
          />
        ) : null}

        {section === "meta" ? (
          <div className="space-y-4">
            <StringFieldsEditor
              values={{
                title: localeContent.meta.title,
                description: localeContent.meta.description,
                ogAlt: localeContent.meta.ogAlt,
              }}
              labels={{
                title: "Meta title",
                description: "Meta description",
                ogAlt: "OG image alt",
              }}
              multiline={["description"]}
              onChange={(values) =>
                updateLocale((c) => ({
                  ...c,
                  meta: {
                    ...c.meta,
                    ...values,
                    keywords: c.meta.keywords,
                  },
                }))
              }
            />
            <div className="rounded-2xl border border-border bg-card/40 p-5">
              <Field label="Keywords (comma separated)">
                <Textarea
                  value={localeContent.meta.keywords.join(", ")}
                  onChange={(e) =>
                    updateLocale((c) => ({
                      ...c,
                      meta: {
                        ...c.meta,
                        keywords: e.target.value
                          .split(",")
                          .map((k) => k.trim())
                          .filter(Boolean),
                      },
                    }))
                  }
                />
              </Field>
            </div>
          </div>
        ) : null}

        {section === "nav" ? (
          <StringFieldsEditor
            values={{ ...localeContent.nav }}
            onChange={(values) =>
              updateLocale((c) => ({
                ...c,
                nav: values as Dictionary["nav"],
              }))
            }
          />
        ) : null}

        {section === "language" ? (
          <StringFieldsEditor
            values={{ ...localeContent.language }}
            onChange={(values) =>
              updateLocale((c) => ({
                ...c,
                language: values as Dictionary["language"],
              }))
            }
          />
        ) : null}

        {section === "clients" ? (
          <AdminClientsEditor
            label={localeContent.clients.label}
            clients={content.clients}
            onLabelChange={(label) =>
              updateLocale((c) => ({
                ...c,
                clients: { ...c.clients, label },
              }))
            }
            onClientsChange={(clients) => {
              setContent((prev) => ({ ...prev, clients }));
              setDirty(true);
            }}
          />
        ) : null}

        {section === "servicesSection" ? (
          <StringFieldsEditor
            values={{ ...localeContent.services }}
            multiline={["description", "footerNote"]}
            onChange={(values) =>
              updateLocale((c) => ({
                ...c,
                services: values as Dictionary["services"],
              }))
            }
          />
        ) : null}

        {section === "footer" ? (
          <StringFieldsEditor
            values={{ ...localeContent.footer }}
            onChange={(values) =>
              updateLocale((c) => ({
                ...c,
                footer: values as Dictionary["footer"],
              }))
            }
          />
        ) : null}

        {section === "legal" ? (
          <AdminLegalEditor
            legal={content.legal[locale]}
            onChange={(legal) => {
              setContent((prev) => ({
                ...prev,
                legal: { ...prev.legal, [locale]: legal },
              }));
              setDirty(true);
            }}
          />
        ) : null}

        {section === "services" ? (
          <AdminServicesEditor
            locale={locale}
            services={content.services}
            onChange={(services) => {
              setContent((prev) => ({ ...prev, services }));
              setDirty(true);
            }}
          />
        ) : null}

        {section === "social" ? (
          <AdminSocialEditor
            social={content.social}
            onChange={(social) => {
              setContent((prev) => ({ ...prev, social }));
              setDirty(true);
            }}
          />
        ) : null}
      </section>
    </div>
  );
}
