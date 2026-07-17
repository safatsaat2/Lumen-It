"use client";

import { Input } from "@/components/ui/input";
import { Field } from "@/components/admin/admin-field";
import type { SiteSettings } from "@/lib/content-store";

type Props = {
  settings: SiteSettings;
  onChange: (settings: SiteSettings) => void;
};

export function AdminSettingsEditor({ settings, onChange }: Props) {
  return (
    <div className="grid gap-4 rounded-2xl border border-border bg-card/40 p-5 sm:grid-cols-2">
      <Field label="Site name">
        <Input
          value={settings.name}
          onChange={(e) => onChange({ ...settings, name: e.target.value })}
        />
      </Field>
      <Field label="Tagline">
        <Input
          value={settings.tagline}
          onChange={(e) => onChange({ ...settings, tagline: e.target.value })}
        />
      </Field>
      <Field label="Email">
        <Input
          type="email"
          value={settings.email}
          onChange={(e) => onChange({ ...settings, email: e.target.value })}
        />
      </Field>
      <Field label="Phone">
        <Input
          value={settings.phone}
          onChange={(e) => onChange({ ...settings, phone: e.target.value })}
        />
      </Field>
      <Field label="Address">
        <Input
          value={settings.address}
          onChange={(e) => onChange({ ...settings, address: e.target.value })}
        />
      </Field>
      <Field label="Founded year">
        <Input
          type="number"
          value={settings.founded}
          onChange={(e) =>
            onChange({ ...settings, founded: Number(e.target.value) || 2020 })
          }
        />
      </Field>
    </div>
  );
}
