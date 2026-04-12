"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  isConfigured: boolean;
  redirectTo: string;
};

export default function AdminLoginCard({ isConfigured, redirectTo }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password) {
      setErrorMessage("비밀번호를 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "인증에 실패했습니다.");
      }

      router.replace(redirectTo);
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "인증에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-3xl items-center px-4 py-12 sm:px-6">
      <section className="w-full rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-7 shadow-[0_16px_60px_rgba(17,17,17,0.06)]">
        <p className="text-sm text-[color:var(--muted)]">Admin</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">관리자 로그인</h1>
        <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
          관리자 작성 화면은 서버 측 인증과 서명된 세션 쿠키로 보호됩니다.
        </p>

        {!isConfigured && (
          <div className="mt-6 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--foreground)]">
            관리자 인증 환경변수가 아직 설정되지 않았습니다.
          </div>
        )}

        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--foreground)]">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
              비밀번호
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              disabled={!isConfigured || isSubmitting}
              className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)] disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>

          <button
            type="submit"
            disabled={!isConfigured || isSubmitting}
            className="filled-control inline-flex min-w-24 items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "확인 중..." : "로그인"}
          </button>
        </form>
      </section>
    </div>
  );
}
