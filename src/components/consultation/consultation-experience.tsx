"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Clipboard,
  Link2,
  Loader2,
  RefreshCw,
  RotateCcw,
  Save,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { ConsultationReport } from "@/components/consultation/consultation-report";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type {
  BrandingReport,
  ConsultationRecord,
  ConsultationRoundResult,
} from "@/lib/consultation/types";

type PublicQuestion = {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
};
type PublicJourney = {
  id: string;
  title: string;
  description: string;
  rounds: { id: string; title: string; questions: PublicQuestion[] }[];
};

type ConsultationResponse = {
  ok?: boolean;
  error?: string;
  consultation?: ConsultationRecord;
  journey?: PublicJourney | null;
};

const STORAGE_KEY = "mihis-consultation-id";

const deQuestionLabels: Record<string, string> = {
  "business-idea": "Was ist Ihre Geschäftsidee?",
  "problem-solved": "Welches Problem löst Ihr Unternehmen?",
  "ideal-customer": "Wer ist Ihr idealer Kunde?",
  "business-name": "Haben Sie bereits einen Unternehmensnamen?",
  differentiator: "Was unterscheidet Ihr Unternehmen vom Wettbewerb?",
  competitors: "Wer sind Ihre größten Wettbewerber?",
  "products-services": "Welche Produkte oder Dienstleistungen bieten Sie an?",
  "monthly-budget": "Wie hoch ist Ihr erwartetes monatliches Budget?",
  markets: "Welche Länder oder Städte bedienen Sie?",
  "marketing-channels": "Welche Marketingkanäle möchten Sie nutzen?",
  challenges: "Was sind Ihre größten Herausforderungen?",
  "goals-12-months": "Welche Ziele haben Sie für die nächsten 12 Monate?",
  "business-description": "Was macht Ihr Unternehmen?",
  "operating-time": "Wie lange ist Ihr Unternehmen bereits aktiv?",
  "biggest-challenge": "Was ist heute Ihre größte geschäftliche Herausforderung?",
  "current-channels": "Welche Marketingkanäle nutzen Sie derzeit?",
  "main-competitors": "Wer sind Ihre Hauptwettbewerber?",
  "revenue-range": "In welchem Bereich liegt Ihr aktueller Monatsumsatz?",
  "team-size": "Wie groß ist Ihr Team?",
  "improvement-areas": "Welche Bereiche müssen verbessert werden?",
  "current-goals": "Was sind Ihre aktuellen Geschäftsziele?",
  "branding-assets": "Welche Branding-Assets haben Sie bereits?",
  "best-campaigns": "Welche Marketingkampagnen haben am besten funktioniert?",
  "one-year-target": "Was möchten Sie innerhalb eines Jahres erreichen?",
};

function journeyCopy(journey: PublicJourney, locale: "de" | "en") {
  if (locale === "en") return { title: journey.title, description: journey.description };
  if (journey.id === "build-brand") {
    return {
      title: "Eine Marke von Grund auf aufbauen",
      description:
        "Für Gründende, Startups und kleine Unternehmen, die eine neue Marke entwickeln und launchen möchten.",
    };
  }
  if (journey.id === "improve-business") {
    return {
      title: "Ein bestehendes Unternehmen verbessern",
      description:
        "Für etablierte Unternehmen, die konkrete Empfehlungen zu Marke, Marketing, Vertrieb und Wachstum suchen.",
    };
  }
  return { title: journey.title, description: journey.description };
}

export function ConsultationExperience({
  locale,
  journeys,
  requestedId,
}: {
  locale: "de" | "en";
  journeys: PublicJourney[];
  requestedId?: string;
}) {
  const de = locale === "de";
  const [record, setRecord] = useState<ConsultationRecord | null>(null);
  const [journey, setJourney] = useState<PublicJourney | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(Boolean(requestedId));
  const [submitting, setSubmitting] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [error, setError] = useState("");

  async function load(id: string) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/consultation/${encodeURIComponent(id)}`, {
        cache: "no-store",
      });
      const data = (await response.json()) as ConsultationResponse;
      if (!response.ok || !data.consultation) {
        throw new Error(data.error || (de ? "Beratung nicht gefunden." : "Consultation not found."));
      }
      setRecord(data.consultation);
      setJourney(data.journey ?? null);
      window.localStorage.setItem(STORAGE_KEY, data.consultation.id);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load consultation.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const id = requestedId || stored;
    if (id) void load(id);
    else setLoading(false);
    // The requested resume token is intentionally loaded once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedId]);

  async function start(journeyId: string) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ journeyId, locale }),
      });
      const data = (await response.json()) as ConsultationResponse;
      if (!response.ok || !data.consultation || !data.journey) {
        throw new Error(data.error || (de ? "Beratung konnte nicht gestartet werden." : "Could not start consultation."));
      }
      setRecord(data.consultation);
      setJourney(data.journey);
      setReviewing(false);
      window.localStorage.setItem(STORAGE_KEY, data.consultation.id);
      window.history.replaceState(null, "", `?id=${data.consultation.id}`);
    } catch (startError) {
      setError(startError instanceof Error ? startError.message : "Could not start.");
    } finally {
      setLoading(false);
    }
  }

  async function submitRound(retryFinal = false) {
    if (!record) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(`/api/consultation/${record.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: retryFinal ? {} : answers }),
      });
      const data = (await response.json()) as ConsultationResponse;
      if (!response.ok || !data.consultation) {
        throw new Error(data.error || (de ? "Antworten konnten nicht verarbeitet werden." : "Could not process your answers."));
      }
      setRecord(data.consultation);
      setAnswers({});
      setReviewing(data.consultation.status !== "completed");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Submission failed.");
      // The final-round answers are persisted before report generation. Refresh
      // so the UI can offer the API's answer-free finalization retry path.
      try {
        const refresh = await fetch(`/api/consultation/${record.id}`, {
          cache: "no-store",
        });
        const refreshed = (await refresh.json()) as ConsultationResponse;
        if (refresh.ok && refreshed.consultation) {
          setRecord(refreshed.consultation);
          if (refreshed.journey) setJourney(refreshed.journey);
        }
      } catch {
        // Keep the original actionable error and locally cached answers.
      }
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    window.localStorage.removeItem(STORAGE_KEY);
    window.history.replaceState(null, "", window.location.pathname);
    setRecord(null);
    setJourney(null);
    setAnswers({});
    setReviewing(false);
    setError("");
  }

  async function copyResumeLink() {
    if (!record) return;
    const link = `${window.location.origin}${window.location.pathname}?id=${record.id}`;
    try {
      await navigator.clipboard.writeText(link);
      toast.success(de ? "Fortsetzungslink kopiert" : "Resume link copied");
    } catch {
      toast.error(de ? "Link konnte nicht kopiert werden" : "Could not copy link");
    }
  }

  const currentRound = journey?.rounds[record?.currentRoundIndex ?? 0];
  const allAnswered = Boolean(
    record && journey && record.currentRoundIndex >= journey.rounds.length,
  );
  const progress = journey && record
    ? Math.min(100, (record.currentRoundIndex / journey.rounds.length) * 100)
    : 0;
  const analysisRounds = useMemo(
    () => record?.rounds.filter((round) => round.analysis.trim()) ?? [],
    [record],
  );

  if (loading) {
    return (
      <Card className="mx-auto flex min-h-[24rem] max-w-3xl flex-col items-center justify-center p-8 text-center" aria-live="polite">
        <Loader2 className="size-9 animate-spin text-primary" aria-hidden />
        <h2 className="mt-5 font-display text-xl font-semibold">
          {de ? "Ihre Beratung wird geladen…" : "Loading your consultation…"}
        </h2>
      </Card>
    );
  }

  if (!record) {
    return (
      <div className="mx-auto max-w-5xl">
        {error ? (
          <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive" role="alert">
            {error}
          </div>
        ) : null}
        <div className="grid gap-5 md:grid-cols-2">
          {journeys.map((item, index) => {
            const copy = journeyCopy(item, locale);
            return (
              <Card key={item.id} className="group relative overflow-hidden p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated sm:p-8">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {index === 0 ? <Sparkles aria-hidden /> : <BrainCircuit aria-hidden />}
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold">{copy.title}</h2>
                <p className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground">
                  {copy.description}
                </p>
                <Button variant="primary" className="mt-7 w-full" onClick={() => void start(item.id)}>
                  {de ? "Diese Beratung starten" : "Start this consultation"}
                  <ArrowRight aria-hidden />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  if (record.report) {
    return (
      <div>
        <div className="mb-6 flex flex-wrap justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => void copyResumeLink()}>
            <Link2 aria-hidden />
            {de ? "Berichtslink kopieren" : "Copy report link"}
          </Button>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw aria-hidden />
            {de ? "Neue Beratung" : "New consultation"}
          </Button>
        </div>
        <ConsultationReport
          report={record.report as BrandingReport}
          consultationId={record.id}
          locale={locale}
        />
      </div>
    );
  }

  if (!journey) {
    return (
      <Card className="mx-auto max-w-2xl p-8 text-center">
        <BrainCircuit className="mx-auto size-10 text-muted-foreground" aria-hidden />
        <h2 className="mt-5 font-display text-2xl font-semibold">
          {de ? "Diese Beratung ist nicht mehr verfügbar" : "This consultation is no longer available"}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          {de
            ? "Die zugehörige Journey wurde deaktiviert. Sie können eine neue Beratung starten."
            : "Its journey has been disabled. You can start a new consultation instead."}
        </p>
        <Button variant="primary" className="mt-6" onClick={reset}>
          {de ? "Neue Beratung starten" : "Start a new consultation"}
        </Button>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge variant="primary">
              <Save aria-hidden className="size-3.5" />
              {de ? "Automatisch gespeichert" : "Auto-saved"}
            </Badge>
            <h2 className="mt-3 font-display text-xl font-semibold">
              {journeyCopy(journey, locale).title}
            </h2>
          </div>
          <Button variant="outline" size="sm" onClick={() => void copyResumeLink()}>
            <Clipboard aria-hidden />
            {de ? "Fortsetzungslink kopieren" : "Copy resume link"}
          </Button>
        </div>
        <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {de ? "Runde" : "Round"} {Math.min(record.currentRoundIndex + 1, journey?.rounds.length ?? 1)} / {journey?.rounds.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </Card>

      {error ? (
        <div className="flex flex-col gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive sm:flex-row sm:items-center sm:justify-between" role="alert">
          <span>{error}</span>
          {allAnswered ? (
            <Button variant="outline" size="sm" onClick={() => void submitRound(true)} disabled={submitting}>
              <RefreshCw aria-hidden />
              {de ? "Bericht erneut erstellen" : "Retry final report"}
            </Button>
          ) : null}
        </div>
      ) : null}

      {reviewing ? (
        <Card className="p-6 sm:p-8">
          <Badge variant="glow">
            <BrainCircuit aria-hidden className="size-3.5 text-primary" />
            {de ? "KI-Analyse" : "AI analysis"}
          </Badge>
          <h2 className="mt-5 font-display text-2xl font-semibold">
            {de ? "Ihre Erkenntnisse bisher" : "Your insights so far"}
          </h2>
          <div className="mt-6 space-y-5">
            {analysisRounds.map((round: ConsultationRoundResult, index) => (
              <article key={round.roundId} className="rounded-2xl border border-border bg-background/50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {de ? "Analyse" : "Analysis"} {index + 1} · {round.roundTitle}
                </p>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {round.analysis}
                </p>
              </article>
            ))}
          </div>
          <Button variant="primary" size="lg" className="mt-7 w-full sm:w-auto" onClick={() => setReviewing(false)}>
            {de ? "Beratung fortsetzen" : "Continue consultation"}
            <ArrowRight aria-hidden />
          </Button>
        </Card>
      ) : allAnswered ? (
        <Card className="p-8 text-center">
          <BrainCircuit className="mx-auto size-10 text-primary" aria-hidden />
          <h2 className="mt-5 font-display text-2xl font-semibold">
            {de ? "Ihre Antworten sind gespeichert" : "Your answers are saved"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {de ? "Die Berichtserstellung konnte nicht abgeschlossen werden. Versuchen Sie es erneut." : "Report generation did not finish. You can retry without entering your answers again."}
          </p>
          <Button variant="primary" className="mt-6" onClick={() => void submitRound(true)} disabled={submitting}>
            {submitting ? <Loader2 className="animate-spin" aria-hidden /> : <RefreshCw aria-hidden />}
            {de ? "Bericht erstellen" : "Generate report"}
          </Button>
        </Card>
      ) : currentRound ? (
        <Card className="p-6 sm:p-8">
          <Badge variant="outline">{currentRound.title}</Badge>
          <h2 className="mt-4 font-display text-2xl font-semibold">
            {de ? "Erzählen Sie uns mehr" : "Tell us a little more"}
          </h2>
          <form
            className="mt-7 space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              void submitRound();
            }}
          >
            {currentRound.questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <Label htmlFor={question.id}>
                  {de ? deQuestionLabels[question.id] ?? question.label : question.label}
                  {question.required ? <span className="ml-1 text-destructive" aria-hidden>*</span> : null}
                </Label>
                <Textarea
                  id={question.id}
                  required={question.required}
                  maxLength={2000}
                  rows={4}
                  value={answers[question.id] ?? ""}
                  placeholder={question.placeholder}
                  onChange={(event) =>
                    setAnswers((current) => ({ ...current, [question.id]: event.target.value }))
                  }
                />
                <p className="text-right text-xs text-muted-foreground">
                  {(answers[question.id] ?? "").length}/2000
                </p>
              </div>
            ))}
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden />
                  {de ? "KI analysiert Ihre Antworten…" : "AI is analyzing your answers…"}
                </>
              ) : (
                <>
                  <Check aria-hidden />
                  {de ? "Antworten senden" : "Submit answers"}
                </>
              )}
            </Button>
          </form>
        </Card>
      ) : null}
    </div>
  );
}
