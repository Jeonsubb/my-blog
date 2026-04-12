"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async () => {
    setIsSubmitting(true);

    try {
      await fetch("/api/admin/session", {
        method: "DELETE",
      });
    } finally {
      router.replace("/admin/login");
      router.refresh();
      setIsSubmitting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--muted)] transition hover:text-[color:var(--foreground)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSubmitting ? "로그아웃..." : "로그아웃"}
    </button>
  );
}
