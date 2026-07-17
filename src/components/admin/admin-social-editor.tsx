"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SocialLinks } from "@/lib/content-store";

const SOCIAL_FIELDS: { key: keyof SocialLinks; label: string }[] = [
  { key: "twitter", label: "Twitter / X URL" },
  { key: "linkedin", label: "LinkedIn URL" },
  { key: "instagram", label: "Instagram URL" },
  { key: "github", label: "GitHub URL" },
];

type AdminSocialEditorProps = {
  social: SocialLinks;
  onChange: (social: SocialLinks) => void;
};

export function AdminSocialEditor({ social, onChange }: AdminSocialEditorProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-border bg-card/40 p-5">
      <p className="text-sm text-muted-foreground">
        These links appear in the website footer. Leave blank to hide a network.
      </p>
      {SOCIAL_FIELDS.map(({ key, label }) => (
        <div key={key} className="space-y-2">
          <Label htmlFor={`social-${key}`}>{label}</Label>
          <Input
            id={`social-${key}`}
            type="url"
            value={social[key]}
            placeholder={`https://...`}
            onChange={(e) => onChange({ ...social, [key]: e.target.value })}
          />
        </div>
      ))}
    </div>
  );
}
