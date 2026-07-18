"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type {
  ConsultationJourney,
  ConsultationQuestion,
  ConsultationRound,
} from "@/lib/consultation/types";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function allIds(journeys: ConsultationJourney[]) {
  const ids = new Set<string>();
  for (const journey of journeys) {
    ids.add(journey.id);
    for (const round of journey.rounds) {
      ids.add(round.id);
      for (const question of round.questions) ids.add(question.id);
    }
  }
  return ids;
}

function uniqueId(prefix: string, journeys: ConsultationJourney[]) {
  const ids = allIds(journeys);
  let candidate = "";
  do {
    const token =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 8)
        : Date.now().toString(36);
    candidate = `${prefix}-${token}`.toLowerCase();
  } while (ids.has(candidate));
  return candidate;
}

function move<T>(items: T[], from: number, to: number) {
  if (to < 0 || to >= items.length || from === to) return items;
  const copy = [...items];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

export function AdminJourneysEditor({
  journeys,
  onChange,
}: {
  journeys: ConsultationJourney[];
  onChange: (journeys: ConsultationJourney[]) => void;
}) {
  const [dragged, setDragged] = useState<{
    journeyIndex: number;
    roundIndex: number;
    questionIndex: number;
  } | null>(null);

  function updateJourney(index: number, updater: (journey: ConsultationJourney) => ConsultationJourney) {
    onChange(journeys.map((journey, current) => (current === index ? updater(journey) : journey)));
  }

  function updateRound(
    journeyIndex: number,
    roundIndex: number,
    updater: (round: ConsultationRound) => ConsultationRound,
  ) {
    updateJourney(journeyIndex, (journey) => ({
      ...journey,
      rounds: journey.rounds.map((round, current) => (current === roundIndex ? updater(round) : round)),
    }));
  }

  function updateQuestion(
    journeyIndex: number,
    roundIndex: number,
    questionIndex: number,
    updater: (question: ConsultationQuestion) => ConsultationQuestion,
  ) {
    updateRound(journeyIndex, roundIndex, (round) => ({
      ...round,
      questions: round.questions.map((question, current) =>
        current === questionIndex ? updater(question) : question,
      ),
    }));
  }

  function addJourney() {
    const journeyId = uniqueId("journey", journeys);
    const roundId = uniqueId("round", journeys);
    const questionId = uniqueId("question", journeys);
    onChange([
      ...journeys,
      {
        id: journeyId,
        title: "New journey",
        description: "",
        enabled: false,
        rounds: [
          {
            id: roundId,
            title: "Round 1",
            questions: [
              {
                id: questionId,
                label: "New question",
                placeholder: "",
                required: true,
                enabled: true,
              },
            ],
          },
        ],
      },
    ]);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold">Consultation journeys</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            IDs are generated client-side and must remain unique.
          </p>
        </div>
        <Button type="button" variant="primary" onClick={addJourney}>
          <Plus aria-hidden />
          Add journey
        </Button>
      </div>

      {journeys.map((journey, journeyIndex) => (
        <Card key={journey.id} className="overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-border bg-muted/25 p-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <Field label="Journey title">
                <Input value={journey.title} onChange={(event) => updateJourney(journeyIndex, (current) => ({ ...current, title: event.target.value }))} />
              </Field>
              <Field label="Journey ID">
                <Input
                  value={journey.id}
                  pattern="[A-Za-z0-9][A-Za-z0-9_-]*"
                  onChange={(event) => updateJourney(journeyIndex, (current) => ({ ...current, id: event.target.value }))}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Description">
                  <Textarea value={journey.description} onChange={(event) => updateJourney(journeyIndex, (current) => ({ ...current, description: event.target.value }))} />
                </Field>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor={`journey-${journey.id}`}>Enabled</Label>
              <Switch
                id={`journey-${journey.id}`}
                checked={journey.enabled}
                onCheckedChange={(enabled) => updateJourney(journeyIndex, (current) => ({ ...current, enabled }))}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Delete ${journey.title}`}
                disabled={journeys.length <= 1}
                onClick={() => onChange(journeys.filter((_, index) => index !== journeyIndex))}
              >
                <Trash2 className="text-destructive" aria-hidden />
              </Button>
            </div>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            {journey.rounds.map((round, roundIndex) => (
              <section key={round.id} className="rounded-2xl border border-border bg-background/50 p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="grid flex-1 gap-4 sm:grid-cols-2">
                    <Field label={`Round ${roundIndex + 1} title`}>
                      <Input value={round.title} onChange={(event) => updateRound(journeyIndex, roundIndex, (current) => ({ ...current, title: event.target.value }))} />
                    </Field>
                    <Field label="Round ID">
                      <Input
                        value={round.id}
                        pattern="[A-Za-z0-9][A-Za-z0-9_-]*"
                        onChange={(event) => updateRound(journeyIndex, roundIndex, (current) => ({ ...current, id: event.target.value }))}
                      />
                    </Field>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={journey.rounds.length <= 1}
                    onClick={() => updateJourney(journeyIndex, (current) => ({ ...current, rounds: current.rounds.filter((_, index) => index !== roundIndex) }))}
                  >
                    <Trash2 className="text-destructive" aria-hidden />
                    Delete round
                  </Button>
                </div>

                <div className="mt-5 space-y-3">
                  {round.questions.map((question, questionIndex) => (
                    <article
                      key={question.id}
                      draggable
                      onDragStart={() => setDragged({ journeyIndex, roundIndex, questionIndex })}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => {
                        if (
                          dragged?.journeyIndex === journeyIndex &&
                          dragged.roundIndex === roundIndex
                        ) {
                          updateRound(journeyIndex, roundIndex, (current) => ({
                            ...current,
                            questions: move(current.questions, dragged.questionIndex, questionIndex),
                          }));
                        }
                        setDragged(null);
                      }}
                      className="rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="size-4 cursor-grab text-muted-foreground" aria-hidden />
                        <span className="text-xs font-medium text-muted-foreground">
                          Question {questionIndex + 1}
                        </span>
                        <div className="ml-auto flex gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="Move question up"
                            disabled={questionIndex === 0}
                            onClick={() => updateRound(journeyIndex, roundIndex, (current) => ({ ...current, questions: move(current.questions, questionIndex, questionIndex - 1) }))}
                          >
                            <ArrowUp aria-hidden />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="Move question down"
                            disabled={questionIndex === round.questions.length - 1}
                            onClick={() => updateRound(journeyIndex, roundIndex, (current) => ({ ...current, questions: move(current.questions, questionIndex, questionIndex + 1) }))}
                          >
                            <ArrowDown aria-hidden />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="Delete question"
                            disabled={round.questions.length <= 1}
                            onClick={() => updateRound(journeyIndex, roundIndex, (current) => ({ ...current, questions: current.questions.filter((_, index) => index !== questionIndex) }))}
                          >
                            <Trash2 className="text-destructive" aria-hidden />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 grid gap-4 sm:grid-cols-2">
                        <Field label="Question">
                          <Input value={question.label} onChange={(event) => updateQuestion(journeyIndex, roundIndex, questionIndex, (current) => ({ ...current, label: event.target.value }))} />
                        </Field>
                        <Field label="Question ID">
                          <Input
                            value={question.id}
                            pattern="[A-Za-z0-9][A-Za-z0-9_-]*"
                            onChange={(event) => updateQuestion(journeyIndex, roundIndex, questionIndex, (current) => ({ ...current, id: event.target.value }))}
                          />
                        </Field>
                        <Field label="Placeholder">
                          <Input value={question.placeholder} onChange={(event) => updateQuestion(journeyIndex, roundIndex, questionIndex, (current) => ({ ...current, placeholder: event.target.value }))} />
                        </Field>
                        <div className="flex flex-wrap items-end gap-5 pb-2">
                          <label className="flex items-center gap-2 text-sm">
                            <Switch checked={question.enabled} onCheckedChange={(enabled) => updateQuestion(journeyIndex, roundIndex, questionIndex, (current) => ({ ...current, enabled }))} />
                            Enabled
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <Switch checked={question.required} onCheckedChange={(required) => updateQuestion(journeyIndex, roundIndex, questionIndex, (current) => ({ ...current, required }))} />
                            Required
                          </label>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  disabled={round.questions.length >= 10}
                  onClick={() => {
                    const id = uniqueId("question", journeys);
                    updateRound(journeyIndex, roundIndex, (current) => ({
                      ...current,
                      questions: [
                        ...current.questions,
                        {
                          id,
                          label: "New question",
                          placeholder: "",
                          required: true,
                          enabled: true,
                        },
                      ],
                    }));
                  }}
                >
                  <Plus aria-hidden />
                  Add question
                </Button>
              </section>
            ))}

            <Button
              type="button"
              variant="outline"
              disabled={journey.rounds.length >= 10}
              onClick={() => {
                const roundId = uniqueId("round", journeys);
                const questionId = uniqueId("question", journeys);
                updateJourney(journeyIndex, (current) => ({
                  ...current,
                  rounds: [
                    ...current.rounds,
                    {
                      id: roundId,
                      title: `Round ${current.rounds.length + 1}`,
                      questions: [
                        {
                          id: questionId,
                          label: "New question",
                          placeholder: "",
                          required: true,
                          enabled: true,
                        },
                      ],
                    },
                  ],
                }));
              }}
            >
              <Plus aria-hidden />
              Add round
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
