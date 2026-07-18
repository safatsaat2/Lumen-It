"use client";

import { useEffect, useState } from "react";
import { KeyRound, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type {
  ConsultationAiSettings,
  OfferBanner,
} from "@/lib/consultation/types";

type KeyStatus = {
  configured: boolean;
  source: "env" | "admin" | "none";
  masked: string | null;
  encryptionConfigured: boolean;
};

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function dateInput(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function toIso(value: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toISOString() : null;
}

export function AdminConsultationSettings({
  ai,
  offer,
  onAiChange,
  onOfferChange,
}: {
  ai: ConsultationAiSettings;
  offer: OfferBanner;
  onAiChange: (value: ConsultationAiSettings) => void;
  onOfferChange: (value: OfferBanner) => void;
}) {
  const [status, setStatus] = useState<KeyStatus | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [keyBusy, setKeyBusy] = useState(false);

  async function refreshStatus() {
    try {
      const response = await fetch("/api/admin/ai-key", { cache: "no-store" });
      const data = (await response.json()) as {
        ok?: boolean;
        status?: KeyStatus;
        error?: string;
      };
      if (!response.ok || !data.status) throw new Error(data.error || "Status failed");
      setStatus(data.status);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load key status");
    }
  }

  useEffect(() => {
    void refreshStatus();
  }, []);

  async function saveKey() {
    setKeyBusy(true);
    try {
      const response = await fetch("/api/admin/ai-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        status?: KeyStatus;
        error?: string;
      };
      if (!response.ok || !data.status) throw new Error(data.error || "Save failed");
      setStatus(data.status);
      setApiKey("");
      toast.success("AI key saved securely");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save key");
    } finally {
      setKeyBusy(false);
    }
  }

  async function clearKey() {
    setKeyBusy(true);
    try {
      const response = await fetch("/api/admin/ai-key", { method: "DELETE" });
      const data = (await response.json()) as {
        ok?: boolean;
        status?: KeyStatus;
        error?: string;
      };
      if (!response.ok || !data.status) throw new Error(data.error || "Clear failed");
      setStatus(data.status);
      setApiKey("");
      toast.success("Admin AI key removed");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not clear key");
    } finally {
      setKeyBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-5 sm:p-6">
        <h2 className="font-display text-xl font-semibold">AI configuration</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Model">
            <Input value={ai.model} onChange={(event) => onAiChange({ ...ai, model: event.target.value })} />
          </Field>
          <Field label="Temperature (0–2)">
            <Input
              type="number"
              min={0}
              max={2}
              step={0.1}
              value={ai.temperature}
              onChange={(event) => onAiChange({ ...ai, temperature: Number(event.target.value) })}
            />
          </Field>
          <Field label="Maximum output tokens">
            <Input
              type="number"
              min={256}
              max={16384}
              value={ai.maxOutputTokens}
              onChange={(event) => onAiChange({ ...ai, maxOutputTokens: Number(event.target.value) })}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="System prompt" hint="Applied server-side to every consultation. API keys are never included here.">
              <Textarea
                rows={12}
                maxLength={8000}
                value={ai.systemPrompt}
                onChange={(event) => onAiChange({ ...ai, systemPrompt: event.target.value })}
              />
            </Field>
          </div>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold">Groq API key</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {status?.configured
                ? `Configured from ${status.source}${status.masked ? ` (${status.masked})` : ""}`
                : "No key configured"}
            </p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${status?.configured ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>
            {status?.configured ? "Ready" : "Action required"}
          </span>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Input
            type="password"
            autoComplete="new-password"
            value={apiKey}
            placeholder="Paste a new API key"
            aria-label="New Groq API key"
            onChange={(event) => setApiKey(event.target.value)}
          />
          <Button type="button" variant="primary" onClick={() => void saveKey()} disabled={keyBusy || apiKey.length < 20}>
            {keyBusy ? <Loader2 className="animate-spin" aria-hidden /> : <KeyRound aria-hidden />}
            Save key
          </Button>
          <Button type="button" variant="outline" onClick={() => void clearKey()} disabled={keyBusy || status?.source !== "admin"}>
            <Trash2 aria-hidden />
            Clear
          </Button>
        </div>
        {!status?.encryptionConfigured ? (
          <p className="mt-3 text-xs text-amber-600">
            AI_SETTINGS_ENCRYPTION_KEY is required before an admin-entered key can be saved.
          </p>
        ) : null}
      </Card>

      <Card className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold">Site-wide offer banner</h2>
            <p className="mt-1 text-sm text-muted-foreground">Visible on public localized pages while its schedule is active.</p>
          </div>
          <Switch
            checked={offer.enabled}
            onCheckedChange={(enabled) => onOfferChange({ ...offer, enabled })}
            aria-label="Enable offer banner"
          />
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Title">
            <Input value={offer.title} onChange={(event) => onOfferChange({ ...offer, title: event.target.value })} />
          </Field>
          <Field label="Description">
            <Input value={offer.description} onChange={(event) => onOfferChange({ ...offer, description: event.target.value })} />
          </Field>
          <Field label="CTA label">
            <Input value={offer.ctaLabel} onChange={(event) => onOfferChange({ ...offer, ctaLabel: event.target.value })} />
          </Field>
          <Field label="CTA URL" hint="Public banner accepts only relative paths or HTTPS links.">
            <Input value={offer.ctaHref} onChange={(event) => onOfferChange({ ...offer, ctaHref: event.target.value })} />
          </Field>
          <Field label="Background color">
            <div className="flex gap-2">
              <Input type="color" className="w-14 px-1" value={/^#[0-9a-f]{6}$/i.test(offer.backgroundColor) ? offer.backgroundColor : "#0f172a"} onChange={(event) => onOfferChange({ ...offer, backgroundColor: event.target.value })} />
              <Input value={offer.backgroundColor} onChange={(event) => onOfferChange({ ...offer, backgroundColor: event.target.value })} />
            </div>
          </Field>
          <Field label="Text color">
            <div className="flex gap-2">
              <Input type="color" className="w-14 px-1" value={/^#[0-9a-f]{6}$/i.test(offer.textColor) ? offer.textColor : "#f8fafc"} onChange={(event) => onOfferChange({ ...offer, textColor: event.target.value })} />
              <Input value={offer.textColor} onChange={(event) => onOfferChange({ ...offer, textColor: event.target.value })} />
            </div>
          </Field>
          <Field label="Starts at">
            <Input type="datetime-local" value={dateInput(offer.startsAt)} onChange={(event) => onOfferChange({ ...offer, startsAt: toIso(event.target.value) })} />
          </Field>
          <Field label="Ends at">
            <Input type="datetime-local" value={dateInput(offer.endsAt)} onChange={(event) => onOfferChange({ ...offer, endsAt: toIso(event.target.value) })} />
          </Field>
          <Field label="Countdown target" hint="Leave empty to hide the live countdown.">
            <Input type="datetime-local" value={dateInput(offer.countdownTo)} onChange={(event) => onOfferChange({ ...offer, countdownTo: toIso(event.target.value) })} />
          </Field>
        </div>
      </Card>
    </div>
  );
}
