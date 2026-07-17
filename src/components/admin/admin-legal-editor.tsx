"use client";

import { Field } from "@/components/admin/admin-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { LegalBundle } from "@/lib/content-store";

const PAGES: (keyof LegalBundle)[] = ["privacy", "terms", "cookies"];

type Props = {
  legal: LegalBundle;
  onChange: (legal: LegalBundle) => void;
};

export function AdminLegalEditor({ legal, onChange }: Props) {
  return (
    <div className="space-y-6">
      {PAGES.map((pageKey) => {
        const page = legal[pageKey];
        return (
          <article
            key={pageKey}
            className="space-y-4 rounded-2xl border border-border bg-card/60 p-5"
          >
            <h3 className="font-medium capitalize">{pageKey}</h3>
            <Field label="Title">
              <Input
                value={page.title}
                onChange={(e) =>
                  onChange({
                    ...legal,
                    [pageKey]: { ...page, title: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Meta description">
              <Textarea
                value={page.description}
                onChange={(e) =>
                  onChange({
                    ...legal,
                    [pageKey]: { ...page, description: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Body paragraphs (one per line)">
              <Textarea
                className="min-h-40"
                value={page.body.join("\n")}
                onChange={(e) =>
                  onChange({
                    ...legal,
                    [pageKey]: {
                      ...page,
                      body: e.target.value
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
            </Field>
          </article>
        );
      })}
    </div>
  );
}
