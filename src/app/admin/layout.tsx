import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BrainCircuit, LayoutDashboard, Sparkles } from "lucide-react";

import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard · MIHI's",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session.valid) {
    redirect("/log-in");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2 font-display font-semibold">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 text-white">
                <Sparkles className="size-4" aria-hidden />
              </span>
              <span className="hidden sm:inline">MIHI&apos;s Admin</span>
            </Link>
            <Link href="/admin" className="hidden items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition hover:text-foreground sm:inline-flex">
              <LayoutDashboard className="size-3.5" aria-hidden />
              Content
            </Link>
            <Link href="/admin/consultations" className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition hover:text-foreground">
              <BrainCircuit className="size-3.5" aria-hidden />
              Consultations
            </Link>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-muted-foreground sm:inline">
              {session.username}
            </span>
            <AdminLogoutButton />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
