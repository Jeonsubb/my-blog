"use client";

import { useState } from "react";
import type { ContentSignals } from "@/lib/ai";

type Props = {
  isAiEnabled: boolean;
  title: string;
  description: string;
  content: string;
};

type AiTask = "summary" | "guide";

type AiResultState = {
  lines: string[];
  concepts: string[];
  prerequisites: string[];
  focus: string;
  signals: ContentSignals | null;
};

export default function PostAiAssistant({
  isAiEnabled,
  title,
  description,
  content,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<AiTask | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<AiResultState>({
    lines: [],
    concepts: [],
    prerequisites: [],
    focus: "",
    signals: null,
  });

  const runTask = async (task: AiTask) => {
    setActiveTask(task);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/ai/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
          title,
          description,
          content,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "AI 응답을 불러오지 못했습니다.");
      }

      if (task === "summary") {
        setResult((current) => ({
          ...current,
          lines: Array.isArray(payload.result.lines) ? payload.result.lines : [],
        }));
      }

      if (task === "guide") {
        setResult((current) => ({
          ...current,
          concepts: Array.isArray(payload.result.concepts) ? payload.result.concepts : [],
          prerequisites: Array.isArray(payload.result.prerequisites)
            ? payload.result.prerequisites
            : [],
          focus: typeof payload.result.focus === "string" ? payload.result.focus : "",
          signals: payload.result.signals ?? current.signals,
        }));
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "AI 응답을 불러오지 못했습니다.");
    } finally {
      setActiveTask(null);
    }
  };

  return (
    <details
      open={isOpen}
      onToggle={(event) => setIsOpen((event.currentTarget as HTMLDetailsElement).open)}
      className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5"
    >
      <summary className="cursor-pointer list-none text-sm font-medium text-[color:var(--foreground)]">
        AI 노트
      </summary>

      <div className="mt-4">
        <p className="text-sm leading-6 text-[color:var(--muted)]">
          글을 빠르게 훑을 수 있도록 요약과 읽기 가이드를 제공합니다.
        </p>

        {!isAiEnabled ? (
          <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
            Gemini API 키가 없으면 카드만 보이고 기능은 비활성화됩니다.
          </p>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => runTask("summary")}
              disabled={activeTask !== null}
              className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--foreground)] transition hover:bg-[color:var(--surface-strong)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {activeTask === "summary" ? "생성 중..." : "AI 3줄 요약"}
            </button>
            <button
              type="button"
              onClick={() => runTask("guide")}
              disabled={activeTask !== null}
              className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--foreground)] transition hover:bg-[color:var(--surface-strong)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {activeTask === "guide" ? "분석 중..." : "읽기 가이드"}
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--foreground)]">
            {errorMessage}
          </div>
        )}

        {result.lines.length > 0 && (
          <div className="mt-5">
            <p className="text-sm font-medium text-[color:var(--foreground)]">3줄 요약</p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-[color:var(--muted)]">
              {result.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        )}

        {(result.concepts.length > 0 ||
          result.prerequisites.length > 0 ||
          result.focus ||
          result.signals) && (
          <div className="mt-5 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-4">
            <p className="text-sm font-medium text-[color:var(--foreground)]">AI 읽기 가이드</p>

            {result.focus && (
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{result.focus}</p>
            )}

            {result.concepts.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-[color:var(--foreground)]">핵심 개념</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.concepts.map((concept) => (
                    <span
                      key={concept}
                      className="rounded-full border border-[color:var(--border)] px-3 py-1 text-sm text-[color:var(--muted)]"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.prerequisites.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-[color:var(--foreground)]">
                  먼저 보면 좋은 것
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-[color:var(--muted)]">
                  {result.prerequisites.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.signals && (
              <div className="mt-4">
                <p className="text-sm font-medium text-[color:var(--foreground)]">문서 구조</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--muted)]">
                    헤딩 {result.signals.headingCount}
                  </span>
                  <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--muted)]">
                    코드 블록 {result.signals.codeBlockCount}
                  </span>
                  <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--muted)]">
                    목록 {result.signals.listCount}
                  </span>
                  {result.signals.codeLanguages.map((language) => (
                    <span
                      key={language}
                      className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--muted)]"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </details>
  );
}
