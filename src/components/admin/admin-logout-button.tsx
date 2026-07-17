"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AdminLogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/log-in");
    router.refresh();
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={logout}>
      <LogOut className="size-4" aria-hidden />
      Logout
    </Button>
  );
}
