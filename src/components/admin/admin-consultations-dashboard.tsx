"use client";

import { useState } from "react";
import { BrainCircuit, History, Loader2, Save, Settings2 } from "lucide-react";
import { toast } from "sonner";

import { AdminConsultationHistory } from "@/components/admin/admin-consultation-history";
import { AdminConsultationSettings } from "@/components/admin/admin-consultation-settings";
import { AdminJourneysEditor } from "@/components/admin/admin-journeys-editor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { consultationConfigSchema } from "@/lib/consultation/types";
import type { SiteContent } from "@/lib/content-store";

function findDuplicateId(content: SiteContent["consultation"]) {
  const journeyIds = new Set<string>();
  for (const journey of content.journeys) {
    if (journeyIds.has(journey.id)) return journey.id;
    journeyIds.add(journey.id);
    const roundIds = new Set<string>();
    for (const round of journey.rounds) {
      if (roundIds.has(round.id)) return round.id;
      roundIds.add(round.id);
      const questionIds = new Set<string>();
      for (const question of round.questions) {
        if (questionIds.has(question.id)) return question.id;
        questionIds.add(question.id);
      }
    }
  }
  return null;
}

export function AdminConsultationsDashboard({
  initialContent,
}: {
  initialContent: SiteContent;
}) {
  const [content, setContent] = useState(initialContent);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  function updateConsultation(
    updater: (value: SiteContent["consultation"]) => SiteContent["consultation"],
  ) {
    setContent((current) => ({
      ...current,
      consultation: updater(current.consultation),
    }));
    setDirty(true);
  }

  async function save() {
    const duplicateId = findDuplicateId(content.consultation);
    if (duplicateId) {
      toast.error(`ID "${duplicateId}" is used more than once. IDs must be unique.`);
      return;
    }
    const parsed = consultationConfigSchema.safeParse(content.consultation);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Consultation settings are invalid", {
        duration: 8000,
      });
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) throw new Error(data.error || "Save failed");
      setDirty(false);
      toast.success("Consultation configuration saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save configuration", {
        duration: 8000,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              AI consultations
            </h1>
            {dirty ? <Badge variant="primary">Unsaved</Badge> : null}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Configure the public experience and review consultation history.
          </p>
        </div>
        <Button variant="primary" onClick={() => void save()} disabled={!dirty || saving}>
          {saving ? <Loader2 className="animate-spin" aria-hidden /> : <Save aria-hidden />}
          {saving ? "Saving…" : "Save configuration"}
        </Button>
      </div>

      <Tabs defaultValue="journeys">
        <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-2xl p-1.5 sm:w-auto">
          <TabsTrigger value="journeys">
            <BrainCircuit aria-hidden className="mr-2 size-4" />
            Journeys
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings2 aria-hidden className="mr-2 size-4" />
            Settings & offer
          </TabsTrigger>
          <TabsTrigger value="history">
            <History aria-hidden className="mr-2 size-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="journeys">
          <AdminJourneysEditor
            journeys={content.consultation.journeys}
            onChange={(journeys) =>
              updateConsultation((current) => ({ ...current, journeys }))
            }
          />
        </TabsContent>
        <TabsContent value="settings">
          <AdminConsultationSettings
            ai={content.consultation.ai}
            offer={content.consultation.offerBanner}
            onAiChange={(ai) =>
              updateConsultation((current) => ({ ...current, ai }))
            }
            onOfferChange={(offerBanner) =>
              updateConsultation((current) => ({ ...current, offerBanner }))
            }
          />
        </TabsContent>
        <TabsContent value="history">
          <AdminConsultationHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
