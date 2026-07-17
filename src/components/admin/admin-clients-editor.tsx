"use client";

import { Plus, Trash2 } from "lucide-react";

import { Field } from "@/components/admin/admin-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Client } from "@/data/clients";

type Props = {
  label: string;
  clients: Client[];
  onLabelChange: (label: string) => void;
  onClientsChange: (clients: Client[]) => void;
};

export function AdminClientsEditor({
  label,
  clients,
  onLabelChange,
  onClientsChange,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card/40 p-5">
        <Field label="Marquee label">
          <Input value={label} onChange={(e) => onLabelChange(e.target.value)} />
        </Field>
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            onClientsChange([
              ...clients,
              { name: "New client", logo: "orbit" },
            ])
          }
        >
          <Plus className="size-4" aria-hidden />
          Add client
        </Button>
      </div>

      {clients.map((client, index) => (
        <article
          key={`${client.name}-${index}`}
          className="grid gap-4 rounded-2xl border border-border bg-card/60 p-4 sm:grid-cols-[1fr_1fr_auto]"
        >
          <Field label="Name">
            <Input
              value={client.name}
              onChange={(e) => {
                const next = [...clients];
                next[index] = { ...next[index], name: e.target.value };
                onClientsChange(next);
              }}
            />
          </Field>
          <Field label="Logo id">
            <Input
              value={client.logo}
              onChange={(e) => {
                const next = [...clients];
                next[index] = { ...next[index], logo: e.target.value };
                onClientsChange(next);
              }}
            />
          </Field>
          <div className="flex items-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={() =>
                onClientsChange(clients.filter((_, i) => i !== index))
              }
            >
              <Trash2 className="size-4" aria-hidden />
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
