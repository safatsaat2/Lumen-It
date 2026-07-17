import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { readSiteContent } from "@/lib/content-store";

export default async function AdminPage() {
  const content = await readSiteContent();
  return <AdminDashboard initialContent={content} />;
}
