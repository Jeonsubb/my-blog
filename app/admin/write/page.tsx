import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminEditor from "@/components/AdminEditor";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import { hasAdminSessionFromCookies } from "@/lib/admin-guard";
import { isAiConfigured } from "@/lib/ai";

export const metadata: Metadata = {
  title: "Admin",
  description: "관리자 작성 페이지",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminWritePage() {
  const isAuthenticated = await hasAdminSessionFromCookies();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6">
      <section className="flex flex-col gap-4 border-b border-[color:var(--border)] pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm text-[color:var(--muted)]">Admin</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">글 작성</h1>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            새 글 초안을 작성합니다.
          </p>
        </div>

        <AdminLogoutButton />
      </section>

      <AdminEditor isAiEnabled={isAiConfigured} />
    </div>
  );
}
