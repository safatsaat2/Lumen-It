"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  Eye,
  Loader2,
  RefreshCw,
} from "lucide-react";

import { ConsultationReport } from "@/components/consultation/consultation-report";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type {
  ConsultationRecord,
  ConsultationSummary,
} from "@/lib/consultation/types";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isFinite(date.getTime())
    ? new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date)
    : value;
}

export function AdminConsultationHistory() {
  const [items, setItems] = useState<ConsultationSummary[]>([]);
  const [selected, setSelected] = useState<ConsultationRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadList() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/consultations", { cache: "no-store" });
      const data = (await response.json()) as {
        ok?: boolean;
        consultations?: ConsultationSummary[];
        error?: string;
      };
      if (!response.ok || !data.consultations) {
        throw new Error(data.error || "Could not load consultations");
      }
      setItems(data.consultations);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load consultations");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadList();
  }, []);

  async function loadDetail(id: string) {
    setDetailLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/consultations/${id}`, {
        cache: "no-store",
      });
      const data = (await response.json()) as {
        ok?: boolean;
        consultation?: ConsultationRecord;
        error?: string;
      };
      if (!response.ok || !data.consultation) {
        throw new Error(data.error || "Could not load consultation");
      }
      setSelected(data.consultation);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load consultation");
    } finally {
      setDetailLoading(false);
    }
  }

  if (selected) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="outline" onClick={() => setSelected(null)}>
            <ArrowLeft aria-hidden />
            Back to history
          </Button>
          {selected.report ? (
            <Button variant="primary" asChild>
              <a href={`/api/consultation/${selected.id}/pdf`} download>
                <ArrowDownToLine aria-hidden />
                Download PDF
              </a>
            </Button>
          ) : null}
        </div>

        <Card className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge variant={selected.status === "completed" ? "primary" : "outline"}>
                {selected.status.replace("_", " ")}
              </Badge>
              <h2 className="mt-3 font-display text-2xl font-semibold">
                {selected.journeyTitle}
              </h2>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{selected.id}</p>
            </div>
            <dl className="text-right text-xs text-muted-foreground">
              <dt>Created</dt>
              <dd className="text-foreground">{formatDate(selected.createdAt)}</dd>
              <dt className="mt-2">Updated</dt>
              <dd className="text-foreground">{formatDate(selected.updatedAt)}</dd>
              {selected.email ? (
                <>
                  <dt className="mt-2">Email</dt>
                  <dd className="text-foreground">{selected.email}</dd>
                </>
              ) : null}
            </dl>
          </div>
        </Card>

        <div className="space-y-5">
          {selected.rounds.map((round, index) => (
            <Card key={`${round.roundId}-${index}`} className="p-5 sm:p-6">
              <Badge variant="outline">Round {index + 1}</Badge>
              <h3 className="mt-3 font-display text-xl font-semibold">{round.roundTitle}</h3>
              <dl className="mt-5 space-y-4">
                {round.answers.map((answer) => (
                  <div key={answer.questionId} className="rounded-xl border border-border p-4">
                    <dt className="text-sm font-medium">{answer.question}</dt>
                    <dd className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                      {answer.answer}
                    </dd>
                  </div>
                ))}
              </dl>
              {round.analysis ? (
                <div className="mt-5 rounded-xl bg-primary/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    AI analysis
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {round.analysis}
                  </p>
                </div>
              ) : null}
            </Card>
          ))}
        </div>

        {selected.report ? (
          <ConsultationReport
            report={selected.report}
            consultationId={selected.id}
            locale="en"
          />
        ) : (
          <Card className="p-8 text-center text-muted-foreground">
            No final report has been generated yet.
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold">Consultation history</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Answers, analyses, and generated reports.
          </p>
        </div>
        <Button variant="outline" onClick={() => void loadList()} disabled={loading}>
          <RefreshCw className={loading ? "animate-spin" : ""} aria-hidden />
          Refresh
        </Button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive" role="alert">
          {error}
        </div>
      ) : null}

      {loading ? (
        <Card className="flex min-h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" aria-label="Loading consultations" />
        </Card>
      ) : items.length === 0 ? (
        <Card className="p-10 text-center">
          <h3 className="font-display text-xl font-semibold">No consultations yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            New public consultations will appear here.
          </p>
        </Card>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Journey</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Rounds</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((item) => (
                  <tr key={item.id} className="bg-card/40">
                    <td className="px-4 py-4">
                      <p className="font-medium">{item.journeyTitle}</p>
                      <p className="mt-1 font-mono text-[11px] text-muted-foreground">{item.id}</p>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={item.status === "completed" ? "primary" : "outline"}>
                        {item.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">{item.roundsCompleted}</td>
                    <td className="px-4 py-4 text-muted-foreground">{formatDate(item.updatedAt)}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        {item.hasReport ? (
                          <Button variant="ghost" size="icon" asChild>
                            <a href={`/api/consultation/${item.id}/pdf`} aria-label="Download PDF">
                              <ArrowDownToLine aria-hidden />
                            </a>
                          </Button>
                        ) : null}
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={detailLoading}
                          onClick={() => void loadDetail(item.id)}
                        >
                          {detailLoading ? <Loader2 className="animate-spin" aria-hidden /> : <Eye aria-hidden />}
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
