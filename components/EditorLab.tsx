"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

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

export default function EditorLab() {
  const [title, setTitle] = useState("Supabase로 블로그 엔진을 옮기며 정리한 것들");
  const [category, setCategory] = useState("Architecture");
  const [series, setSeries] = useState("블로그 개선기");
  const [tags, setTags] = useState("nextjs, supabase, seo");
  const [description, setDescription] = useState(
    "파일 기반 블로그를 DB 중심으로 전환하면서 생긴 구조 변화와 UX 포인트를 정리합니다.",
  );
  const [thumbnail, setThumbnail] = useState("/images/test.png");
  const [secret, setSecret] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createdPath, setCreatedPath] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState(`## 왜 Editor Lab을 만들었나

에디터 기능은 아직 제품화되지 않았지만, 글 작성 경험을 어떤 방향으로 가져갈지 미리 보여주고 싶었습니다.

- 제목과 요약을 먼저 정리하고
- 슬러그와 카테고리, 시리즈를 빠르게 확인하고
- 발행 전에 미리보기 감각을 보는 흐름

\`\`\`ts
const post = {
  title,
  slug,
  category,
  series,
  tags,
  description,
}
\`\`\`
`);

  const deferredContent = useDeferredValue(content);
  const slug = slugify(title);
  const readingTime = estimateReadingTime(deferredContent);
  const parsedTags = useMemo(
    () =>
      tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [tags],
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFeedback(null);
    setErrorMessage(null);
    setCreatedPath(null);

    if (!title || !description || !content || !secret) {
      setErrorMessage("제목, 요약, 본문, 관리자 비밀번호를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/posts", {
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
          secret,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "글 작성에 실패했습니다.");
      }

      setFeedback("글이 저장되었습니다.");
      setCreatedPath(result.path || null);
      setSecret("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "글 작성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6">
      <section className="border-b border-[color:var(--border)] pb-8">
        <p className="text-sm text-[color:var(--muted)]">Admin write</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
          글 작성용 관리자 페이지
        </h1>
        <p className="mt-5 text-base leading-8 text-[color:var(--muted)]">
          제목, 요약, 태그, 시리즈, 마크다운 본문을 입력해서 Supabase `posts`
          테이블에 바로 저장합니다.
        </p>
      </section>

      {(feedback || errorMessage) && (
        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--foreground)]">
          {errorMessage || feedback}
          {createdPath && (
            <span className="ml-2">
              <Link href={createdPath} className="underline">
                바로 보기
              </Link>
            </span>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
                제목
              </span>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
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
                className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
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
                className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
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
                placeholder="nextjs, supabase, seo"
                className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
              요약
            </span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="h-28 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
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
              className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
              관리자 비밀번호
            </span>
            <input
              type="password"
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
              Markdown
            </span>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="h-[420px] w-full rounded-xl border border-[color:var(--border)] bg-[#111827] px-5 py-4 font-mono text-sm leading-7 text-[#e5e7eb] outline-none transition focus:border-[color:var(--foreground)]"
            />
          </label>

          <button
            type="submit"
            className="mt-5 rounded-full bg-[color:var(--foreground)] px-5 py-2.5 text-sm font-medium text-[color:var(--background)] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? "저장 중..." : "글 저장"}
          </button>
        </div>

        <div className="space-y-6">
          <div className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
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
                <p className="font-medium text-[color:var(--foreground)]">Summary length</p>
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
          </div>

          <div className="overflow-hidden border border-[color:var(--border)] bg-[color:var(--surface-strong)]">
            <div className="relative h-56 bg-[linear-gradient(135deg,rgba(15,118,110,0.12),rgba(195,93,56,0.16))]">
              {thumbnail ? (
                <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(25,33,50,0.52)] via-transparent to-transparent" />
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
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em]">{title}</h2>
              <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
                {description}
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
          </div>

          <div className="border border-[color:var(--border)] bg-[#111827] p-6 text-[#e5e7eb]">
            <p className="text-sm font-medium text-white/60">Content preview</p>
            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-7">
              {deferredContent}
            </pre>
          </div>
        </div>
      </form>
    </div>
  );
}
