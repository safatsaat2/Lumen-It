"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Field({
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

type StringFieldsEditorProps = {
  values: Record<string, string>;
  labels?: Record<string, string>;
  multiline?: string[];
  onChange: (values: Record<string, string>) => void;
};

export function StringFieldsEditor({
  values,
  labels,
  multiline = [],
  onChange,
}: StringFieldsEditorProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-border bg-card/40 p-5">
      {Object.entries(values).map(([key, value]) => (
        <Field key={key} label={labels?.[key] ?? key}>
          {multiline.includes(key) || value.length > 80 ? (
            <Textarea
              value={value}
              onChange={(e) => onChange({ ...values, [key]: e.target.value })}
            />
          ) : (
            <Input
              value={value}
              onChange={(e) => onChange({ ...values, [key]: e.target.value })}
            />
          )}
        </Field>
      ))}
    </div>
  );
}
