import {
  ArrowDownToLine,
  CheckCircle2,
  Flag,
  Gauge,
  Lightbulb,
  Target,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { BrandingReport } from "@/lib/consultation/types";

function TextSection({
  title,
  fields,
}: {
  title: string;
  fields: [string, string][];
}) {
  return (
    <Card className="p-6 sm:p-8">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <dl className="mt-6 grid gap-6 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase tracking-wider text-primary">
              {label}
            </dt>
            <dd className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className="flex gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ConsultationReport({
  report,
  consultationId,
  locale,
}: {
  report: BrandingReport;
  consultationId: string;
  locale: "de" | "en";
}) {
  const de = locale === "de";
  const roadmap = [
    [de ? "Erste 30 Tage" : "First 30 days", report.growthRoadmap.first30Days],
    [de ? "Nächste 90 Tage" : "Next 90 days", report.growthRoadmap.next90Days],
    [de ? "Sechs Monate" : "Six months", report.growthRoadmap.sixMonths],
    [de ? "Ein Jahr" : "One year", report.growthRoadmap.oneYear],
  ] as const;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-violet-500/10 via-card to-amber-400/10 p-6 sm:p-10">
        <Badge variant="primary">
          <Lightbulb aria-hidden className="size-3.5" />
          {de ? "Ihre Markenstrategie" : "Your brand strategy"}
        </Badge>
        <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
          {de ? "Ihr individueller Business-Bericht" : "Your personalized business report"}
        </h1>
        <p className="mt-5 max-w-4xl whitespace-pre-line text-base leading-relaxed text-muted-foreground">
          {report.executiveSummary}
        </p>
        <Button variant="primary" className="mt-7" asChild>
          <a href={`/api/consultation/${consultationId}/pdf`} download>
            <ArrowDownToLine aria-hidden />
            {de ? "PDF herunterladen" : "Download PDF"}
          </a>
        </Button>
      </Card>

      <Card className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <Gauge className="text-primary" aria-hidden />
          <h2 className="font-display text-2xl font-semibold">
            {de ? "Business-Scorecard" : "Business scorecard"}
          </h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(report.scorecard).map(([key, score]) => (
            <div key={key} className="rounded-2xl border border-border bg-background/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <strong className="font-mono text-primary">{score}/10</strong>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400"
                  style={{ width: `${score * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <TextSection
        title={de ? "Markenidentität" : "Brand identity"}
        fields={[
          [de ? "Markenzweck" : "Brand purpose", report.brandIdentity.brandPurpose],
          [de ? "Vision" : "Vision", report.brandIdentity.vision],
          [de ? "Mission" : "Mission", report.brandIdentity.mission],
          [de ? "Persönlichkeit" : "Personality", report.brandIdentity.brandPersonality],
          [de ? "Tonalität" : "Tone of voice", report.brandIdentity.toneOfVoice],
          [de ? "Kernwerte" : "Core values", report.brandIdentity.coreValues.join(" · ")],
        ]}
      />
      <TextSection
        title={de ? "Positionierung" : "Brand positioning"}
        fields={[
          [de ? "Marktposition" : "Market position", report.brandPositioning.marketPosition],
          [de ? "Wettbewerbsvorteil" : "Competitive advantage", report.brandPositioning.competitiveAdvantage],
          ["USP", report.brandPositioning.usp],
          [de ? "Kundenwahrnehmung" : "Customer perception", report.brandPositioning.customerPerception],
        ]}
      />
      <TextSection
        title={de ? "Zielgruppe" : "Target audience"}
        fields={[
          [de ? "Primär" : "Primary", report.targetAudience.primaryAudience],
          [de ? "Sekundär" : "Secondary", report.targetAudience.secondaryAudience],
          [de ? "Buyer Persona" : "Buyer persona", report.targetAudience.buyerPersona],
          [de ? "Probleme" : "Pain points", report.targetAudience.customerPainPoints.join("\n• ")],
          [de ? "Ziele" : "Goals", report.targetAudience.customerGoals.join("\n• ")],
        ]}
      />

      <Card className="p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold">
          {de ? "Wettbewerbsanalyse" : "Competitor analysis"}
        </h2>
        <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <ListBlock title={de ? "Wettbewerber" : "Competitors"} items={report.competitorAnalysis.mainCompetitors} />
          <ListBlock title={de ? "Stärken" : "Strengths"} items={report.competitorAnalysis.strengths} />
          <ListBlock title={de ? "Schwächen" : "Weaknesses"} items={report.competitorAnalysis.weaknesses} />
          <ListBlock title={de ? "Marktlücken" : "Market gaps"} items={report.competitorAnalysis.marketGaps} />
          <ListBlock title={de ? "Chancen" : "Opportunities"} items={report.competitorAnalysis.opportunities} />
        </div>
      </Card>

      <TextSection
        title={de ? "Marketingstrategie" : "Marketing strategy"}
        fields={[
          ["Organic", report.marketingStrategy.organicMarketing],
          ["Paid", report.marketingStrategy.paidMarketing],
          ["Social Media", report.marketingStrategy.socialMediaStrategy],
          ["Content", report.marketingStrategy.contentStrategy],
          ["SEO", report.marketingStrategy.seoSuggestions],
          ["E-Mail", report.marketingStrategy.emailMarketing],
          ["Community", report.marketingStrategy.communityBuilding],
        ]}
      />
      <TextSection
        title={de ? "Vertriebsstrategie" : "Sales strategy"}
        fields={[
          [de ? "Customer Journey" : "Customer journey", report.salesStrategy.customerJourney],
          [de ? "Leadgenerierung" : "Lead generation", report.salesStrategy.leadGeneration],
          [de ? "Conversion" : "Conversion", report.salesStrategy.conversionStrategy],
          [de ? "Bindung" : "Retention", report.salesStrategy.retentionStrategy],
        ]}
      />
      <TextSection
        title={de ? "Branding-Empfehlungen" : "Branding recommendations"}
        fields={[
          ["Logo", report.brandingRecommendations.logoDirection],
          [de ? "Farben" : "Color palette", report.brandingRecommendations.colorPalette],
          [de ? "Typografie" : "Typography", report.brandingRecommendations.typography],
          [de ? "Markenstimme" : "Brand voice", report.brandingRecommendations.brandVoice],
          ["Messaging", report.brandingRecommendations.messaging],
          [de ? "Visuelle Konsistenz" : "Visual consistency", report.brandingRecommendations.visualConsistency],
        ]}
      />

      <Card className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <Flag className="text-primary" aria-hidden />
          <h2 className="font-display text-2xl font-semibold">
            {de ? "Wachstums-Roadmap" : "Growth roadmap"}
          </h2>
        </div>
        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          {roadmap.map(([title, phase], index) => (
            <article key={title} className="rounded-2xl border border-border p-5">
              <Badge variant="outline">{index + 1}</Badge>
              <h3 className="mt-3 font-display text-xl font-semibold">{title}</h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <ListBlock title={de ? "Ziele" : "Objectives"} items={phase.objectives} />
                <ListBlock title={de ? "Maßnahmen" : "Actions"} items={phase.actions} />
                <ListBlock title="KPIs" items={phase.kpis} />
              </div>
            </article>
          ))}
        </div>
      </Card>

      <Card className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <Target className="text-primary" aria-hidden />
          <h2 className="font-display text-2xl font-semibold">
            {de ? "Priorisierte Checkliste" : "Prioritized checklist"}
          </h2>
        </div>
        <ol className="mt-6 space-y-3">
          {report.actionChecklist.map((item, index) => (
            <li key={`${item.task}-${index}`} className="flex items-start gap-3 rounded-2xl border border-border p-4">
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-sm">{item.task}</span>
              <Badge variant={item.priority === "high" ? "primary" : "outline"}>
                {item.priority}
              </Badge>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="border-primary/20 bg-primary/5 p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold">
          {de ? "Abschließende Empfehlungen" : "Final recommendations"}
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {report.finalRecommendations.summary}
        </p>
        <div className="mt-6">
          <ListBlock title={de ? "Nächste Schritte" : "Next steps"} items={report.finalRecommendations.nextSteps} />
        </div>
      </Card>
    </div>
  );
}
