import type { Metadata } from "next";

import { AdminConsultationsDashboard } from "@/components/admin/admin-consultations-dashboard";
import { readSiteContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "AI Consultations · MIHI's Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminConsultationsPage() {
  const content = await readSiteContent();
  return <AdminConsultationsDashboard initialContent={content} />;
}
