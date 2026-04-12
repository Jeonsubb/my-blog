"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";

type Props = {
  isAiEnabled: boolean;
};

type AiPanelState = {
  summary: string;
  seoDescription: string;
  tags: string[];
};

type AiTask = "summary" | "tags" | "seo";

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return slug || "untitled-draft";
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export default function AdminEditor({ isAiEnabled }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [series, setSeries] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createdPath, setCreatedPath] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiPendingTask, setAiPendingTask] = useState<AiTask | null>(null);
  const [aiPanel, setAiPanel] = useState<AiPanelState>({
    summary: "",
    seoDescription: "",
    tags: [],
  });
  const [content, setContent] = useState("## 문제\n\n## 해결 과정\n\n## 정리\n");

  const deferredContent = useDeferredValue(content);
  const slug = slugify(title);
  const readingTime = estimateReadingTime(deferredContent);
  const parsedTags = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const requestAiAssist = async (task: AiTask) => {
    if (!title && !content.trim()) {
      setAiError("제목이나 본문을 먼저 입력해 주세요.");
      return;
    }

    setAiPendingTask(task);
    setAiError(null);

    try {
      const response = await fetch("/api/admin/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
          title,
          description,
          content,
          tags: parsedTags,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "AI 응답을 불러오지 못했습니다.");
      }

      if (task === "summary") {
        setAiPanel((current) => ({
          ...current,
          summary: result.result.summary || "",
        }));
      }

      if (task === "tags") {
        const nextTags = Array.isArray(result.result.tags) ? result.result.tags : [];
        setAiPanel((current) => ({
          ...current,
          tags: nextTags,
        }));

        if (nextTags.length > 0) {
          setTags(nextTags.join(", "));
        }
      }

      if (task === "seo") {
        const nextDescription = result.result.seoDescription || "";
        setAiPanel((current) => ({
          ...current,
          seoDescription: nextDescription,
        }));

        if (nextDescription) {
          setDescription(nextDescription);
        }
      }
    } catch (error) {
      setAiError(error instanceof Error ? error.message : "AI 응답을 불러오지 못했습니다.");
    } finally {
      setAiPendingTask(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFeedback(null);
    setErrorMessage(null);
    setCreatedPath(null);

    if (!title || !description || !content.trim()) {
      setErrorMessage("제목, 설명, 본문을 모두 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          description,
          category,
          series,
          tags,
          thumbnail,
          content,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "글 저장에 실패했습니다.");
      }

      setFeedback("글이 저장되었습니다.");
      setCreatedPath(result.path || null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "글 저장에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6"
      >
        {(feedback || errorMessage) && (
          <div className="mb-5 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--foreground)]">
            {errorMessage || feedback}
            {createdPath && (
              <span className="ml-2">
                <Link href={createdPath} className="underline">
                  글 보기
                </Link>
              </span>
            )}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
              제목
            </span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="예: Next.js 관리자 페이지를 보호한 방식"
              className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
              카테고리
            </span>
            <input
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="Engineering"
              className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
              시리즈
            </span>
            <input
              type="text"
              value={series}
              onChange={(event) => setSeries(event.target.value)}
              placeholder="블로그 운영기"
              className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
              태그
            </span>
            <input
              type="text"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="nextjs, security, ai"
              className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
            />
          </label>
        </div>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
            설명
          </span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="글 목록과 SEO 메타 설명에 들어갈 짧은 문장을 입력합니다."
            className="h-28 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
            썸네일 주소
          </span>
          <input
            type="text"
            value={thumbnail}
            onChange={(event) => setThumbnail(event.target.value)}
            placeholder="/images/example.png"
            className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
            Markdown
          </span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="editor-markdown-field h-[420px] w-full rounded-3xl border border-[color:var(--border)] px-5 py-4 font-mono text-sm leading-7 outline-none transition focus:border-[color:var(--foreground)]"
          />
        </label>

        <button
          type="submit"
          className="filled-control mt-5 rounded-full border px-5 py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? "저장 중..." : "글 저장"}
        </button>
      </form>

      <div className="space-y-6">
        <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
          <p className="text-sm font-medium text-[color:var(--muted)]">AI Assist</p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
            초안 기준으로 요약, 태그, SEO description 초안을 정리합니다.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => requestAiAssist("summary")}
              disabled={!isAiEnabled || aiPendingTask !== null}
              className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--foreground)] transition hover:bg-[color:var(--surface-strong)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {aiPendingTask === "summary" ? "요약 중..." : "AI 요약"}
            </button>
            <button
              type="button"
              onClick={() => requestAiAssist("tags")}
              disabled={!isAiEnabled || aiPendingTask !== null}
              className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--foreground)] transition hover:bg-[color:var(--surface-strong)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {aiPendingTask === "tags" ? "추천 중..." : "태그 추천"}
            </button>
            <button
              type="button"
              onClick={() => requestAiAssist("seo")}
              disabled={!isAiEnabled || aiPendingTask !== null}
              className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--foreground)] transition hover:bg-[color:var(--surface-strong)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {aiPendingTask === "seo" ? "생성 중..." : "SEO 초안"}
            </button>
          </div>

          {!isAiEnabled && (
            <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
              Gemini API 키를 설정하면 AI 보조 기능을 사용할 수 있습니다.
            </p>
          )}

          {aiError && (
            <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--foreground)]">
              {aiError}
            </div>
          )}

          {(aiPanel.summary || aiPanel.seoDescription || aiPanel.tags.length > 0) && (
            <div className="mt-5 space-y-5 border-t border-[color:var(--border)] pt-5">
              {aiPanel.summary && (
                <div>
                  <p className="text-sm font-medium text-[color:var(--foreground)]">요약</p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                    {aiPanel.summary}
                  </p>
                </div>
              )}

              {aiPanel.seoDescription && (
                <div>
                  <p className="text-sm font-medium text-[color:var(--foreground)]">
                    SEO description
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                    {aiPanel.seoDescription}
                  </p>
                </div>
              )}

              {aiPanel.tags.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-[color:var(--foreground)]">
                    추천 태그
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {aiPanel.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[color:var(--border)] px-3 py-1 text-sm text-[color:var(--muted)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
          <p className="text-sm font-medium text-[color:var(--muted)]">Draft metadata</p>
          <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-[color:var(--muted)]">
            <div>
              <p className="font-medium text-[color:var(--foreground)]">Slug</p>
              <p className="mt-1 break-all">/blog/{slug}</p>
            </div>
            <div>
              <p className="font-medium text-[color:var(--foreground)]">Reading time</p>
              <p className="mt-1">{readingTime} min read</p>
            </div>
            <div>
              <p className="font-medium text-[color:var(--foreground)]">Category</p>
              <p className="mt-1">{category || "General"}</p>
            </div>
            <div>
              <p className="font-medium text-[color:var(--foreground)]">Series</p>
              <p className="mt-1">{series || "-"}</p>
            </div>
            <div>
              <p className="font-medium text-[color:var(--foreground)]">
                Description length
              </p>
              <p className="mt-1">{description.length} chars</p>
            </div>
          </div>

          {parsedTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {parsedTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[color:var(--border)] px-3 py-1 text-sm text-[color:var(--muted)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </section>

        <section className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-strong)]">
          <div className="relative h-56 bg-[linear-gradient(135deg,rgba(17,17,17,0.04),rgba(17,17,17,0.12))]">
            {thumbnail ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnail}
                  alt={title || "draft thumbnail"}
                  className="h-full w-full object-cover"
                />
              </>
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,17,0.35)] via-transparent to-transparent" />
          </div>

          <div className="p-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]">
              <span>{category || "General"}</span>
              {series && (
                <>
                  <span>·</span>
                  <span>{series}</span>
                </>
              )}
              <span>·</span>
              <span>{readingTime} min read</span>
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em]">
              {title || "제목을 입력해 주세요."}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
              {description || "설명을 입력하면 여기에서 미리 볼 수 있습니다."}
            </p>
            {parsedTags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {parsedTags.map((tag) => (
                  <span
                    key={`preview-${tag}`}
                    className="rounded-full border border-[color:var(--border)] px-3 py-1 text-sm text-[color:var(--muted)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-[color:var(--border)] bg-[#111827] p-6 text-[#f3f4f6]">
          <p className="text-sm font-medium text-white/60">Content preview</p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-7">
            {deferredContent}
          </pre>
        </section>
      </div>
    </div>
  );
}
