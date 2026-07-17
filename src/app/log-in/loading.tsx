import { PageLoader } from "@/components/layout/page-loader";

export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-background">
      <PageLoader label="Loading…" variant="panel" />
    </div>
  );
}
