import { PageLoader } from "@/components/layout/page-loader";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-background">
      <PageLoader label="Loading dashboard…" />
    </div>
  );
}
