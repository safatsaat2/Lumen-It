import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";

import type { BrandingReport, ConsultationRecord } from "@/lib/consultation/types";

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1e293b",
    lineHeight: 1.5,
  },
  title: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: "#64748b",
    marginBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 6,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
  },
  fieldLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#334155",
    marginTop: 6,
    marginBottom: 2,
  },
  paragraph: {
    marginBottom: 4,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    width: 12,
  },
  listText: {
    flex: 1,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e2e8f0",
    paddingVertical: 3,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    fontSize: 8,
    color: "#94a3b8",
    textAlign: "center",
  },
});

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <View wrap={false}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.paragraph}>{value}</Text>
    </View>
  );
}

function BulletList({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <View>
      <Text style={styles.fieldLabel}>{label}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function RoadmapPhase({
  title,
  phase,
}: {
  title: string;
  phase: BrandingReport["growthRoadmap"]["first30Days"];
}) {
  return (
    <View>
      <Text style={styles.fieldLabel}>{title}</Text>
      <BulletList label="Objectives" items={phase.objectives} />
      <BulletList label="Actions" items={phase.actions} />
      <BulletList label="KPIs" items={phase.kpis} />
    </View>
  );
}

const SCORE_LABELS: Array<[keyof BrandingReport["scorecard"], string]> = [
  ["brandIdentity", "Brand Identity"],
  ["marketing", "Marketing"],
  ["sales", "Sales"],
  ["website", "Website"],
  ["socialMedia", "Social Media"],
  ["customerTrust", "Customer Trust"],
  ["scalability", "Scalability"],
  ["innovation", "Innovation"],
  ["overallBusinessHealth", "Overall Business Health"],
];

function ReportDocument({
  record,
  report,
}: {
  record: ConsultationRecord;
  report: BrandingReport;
}) {
  const generatedAt = new Date(record.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document
      title="AI Branding Strategy Report"
      author="Mihi's Agency"
      creator="Mihi's Agency AI Consultant"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Branding & Business Strategy Report</Text>
        <Text style={styles.subtitle}>
          {record.journeyTitle} · Generated {generatedAt} · Mihi&apos;s Agency AI
          Consultant
        </Text>

        <Section title="Executive Summary">
          <Text style={styles.paragraph}>{report.executiveSummary}</Text>
        </Section>

        <Section title="Brand Identity">
          <Field label="Brand Purpose" value={report.brandIdentity.brandPurpose} />
          <Field label="Vision" value={report.brandIdentity.vision} />
          <Field label="Mission" value={report.brandIdentity.mission} />
          <BulletList label="Core Values" items={report.brandIdentity.coreValues} />
          <Field
            label="Brand Personality"
            value={report.brandIdentity.brandPersonality}
          />
          <Field label="Tone of Voice" value={report.brandIdentity.toneOfVoice} />
        </Section>

        <Section title="Brand Positioning">
          <Field
            label="Market Position"
            value={report.brandPositioning.marketPosition}
          />
          <Field
            label="Competitive Advantage"
            value={report.brandPositioning.competitiveAdvantage}
          />
          <Field label="Unique Selling Proposition" value={report.brandPositioning.usp} />
          <Field
            label="Customer Perception"
            value={report.brandPositioning.customerPerception}
          />
        </Section>

        <Section title="Target Audience">
          <Field
            label="Primary Audience"
            value={report.targetAudience.primaryAudience}
          />
          <Field
            label="Secondary Audience"
            value={report.targetAudience.secondaryAudience}
          />
          <Field label="Buyer Persona" value={report.targetAudience.buyerPersona} />
          <BulletList
            label="Customer Pain Points"
            items={report.targetAudience.customerPainPoints}
          />
          <BulletList
            label="Customer Goals"
            items={report.targetAudience.customerGoals}
          />
        </Section>

        <Section title="Competitor Analysis">
          <BulletList
            label="Main Competitors"
            items={report.competitorAnalysis.mainCompetitors}
          />
          <BulletList label="Strengths" items={report.competitorAnalysis.strengths} />
          <BulletList label="Weaknesses" items={report.competitorAnalysis.weaknesses} />
          <BulletList label="Market Gaps" items={report.competitorAnalysis.marketGaps} />
          <BulletList
            label="Opportunities"
            items={report.competitorAnalysis.opportunities}
          />
        </Section>

        <Section title="Marketing Strategy">
          <Field
            label="Organic Marketing"
            value={report.marketingStrategy.organicMarketing}
          />
          <Field label="Paid Marketing" value={report.marketingStrategy.paidMarketing} />
          <Field
            label="Social Media Strategy"
            value={report.marketingStrategy.socialMediaStrategy}
          />
          <Field
            label="Content Strategy"
            value={report.marketingStrategy.contentStrategy}
          />
          <Field
            label="SEO Suggestions"
            value={report.marketingStrategy.seoSuggestions}
          />
          <Field
            label="Email Marketing"
            value={report.marketingStrategy.emailMarketing}
          />
          <Field
            label="Community Building"
            value={report.marketingStrategy.communityBuilding}
          />
        </Section>

        <Section title="Sales Strategy">
          <Field label="Customer Journey" value={report.salesStrategy.customerJourney} />
          <Field label="Lead Generation" value={report.salesStrategy.leadGeneration} />
          <Field
            label="Conversion Strategy"
            value={report.salesStrategy.conversionStrategy}
          />
          <Field
            label="Retention Strategy"
            value={report.salesStrategy.retentionStrategy}
          />
        </Section>

        <Section title="Branding Recommendations">
          <Field
            label="Logo Direction"
            value={report.brandingRecommendations.logoDirection}
          />
          <Field
            label="Color Palette"
            value={report.brandingRecommendations.colorPalette}
          />
          <Field label="Typography" value={report.brandingRecommendations.typography} />
          <Field label="Brand Voice" value={report.brandingRecommendations.brandVoice} />
          <Field label="Messaging" value={report.brandingRecommendations.messaging} />
          <Field
            label="Visual Consistency"
            value={report.brandingRecommendations.visualConsistency}
          />
        </Section>

        <Section title="Growth Roadmap">
          <RoadmapPhase title="First 30 Days" phase={report.growthRoadmap.first30Days} />
          <RoadmapPhase title="Next 90 Days" phase={report.growthRoadmap.next90Days} />
          <RoadmapPhase title="6 Month Plan" phase={report.growthRoadmap.sixMonths} />
          <RoadmapPhase title="1 Year Plan" phase={report.growthRoadmap.oneYear} />
        </Section>

        <Section title="Action Checklist">
          {report.actionChecklist.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>
                [{item.priority.toUpperCase()}] {item.task}
              </Text>
            </View>
          ))}
        </Section>

        <Section title="AI Scorecard">
          {SCORE_LABELS.map(([key, label]) => (
            <View key={key} style={styles.scoreRow}>
              <Text>{label}</Text>
              <Text>{report.scorecard[key]} / 10</Text>
            </View>
          ))}
        </Section>

        <Section title="Final Recommendations">
          <Text style={styles.paragraph}>{report.finalRecommendations.summary}</Text>
          <BulletList label="Next Steps" items={report.finalRecommendations.nextSteps} />
        </Section>

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Mihi's Agency — AI Branding Consultant · Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}

/** Render a completed consultation report to a PDF buffer. */
export async function renderReportPdf(
  record: ConsultationRecord,
  report: BrandingReport,
): Promise<Buffer> {
  return renderToBuffer(<ReportDocument record={record} report={report} />);
}
