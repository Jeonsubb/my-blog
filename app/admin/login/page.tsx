import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminLoginCard from "@/components/AdminLoginCard";
import { hasAdminSessionFromCookies } from "@/lib/admin-guard";
import { sanitizeAdminRedirect } from "@/lib/admin-session";
import { isAdminAuthConfigured } from "@/lib/admin-password";

type Props = {
  searchParams: Promise<{
    redirectTo?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Admin Login",
  description: "관리자 인증 페이지",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const isAuthenticated = await hasAdminSessionFromCookies();

  if (isAuthenticated) {
    redirect("/admin/write");
  }

  const resolvedSearchParams = await searchParams;
  const redirectTo = sanitizeAdminRedirect(resolvedSearchParams.redirectTo);

  return <AdminLoginCard isConfigured={isAdminAuthConfigured} redirectTo={redirectTo} />;
}
