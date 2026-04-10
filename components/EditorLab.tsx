"use client";

import { useDeferredValue, useState } from "react";

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
  const [description, setDescription] = useState(
    "파일 기반 블로그를 DB 중심으로 전환하면서 생긴 구조 변화와 UX 포인트를 정리합니다.",
  );
  const [thumbnail, setThumbnail] = useState("/images/test.png");
  const [content, setContent] = useState(`## 왜 Editor Lab을 만들었나

에디터 기능은 아직 제품화되지 않았지만, 글 작성 경험을 어떤 방향으로 가져갈지 미리 보여주고 싶었습니다.

- 제목과 요약을 먼저 정리하고
- 슬러그와 카테고리를 빠르게 확인하고
- 발행 전에 미리보기 감각을 보는 흐름

\`\`\`ts
const post = {
  title,
  slug,
  category,
  description,
}
\`\`\`
`);

  const deferredContent = useDeferredValue(content);
  const slug = slugify(title);
  const readingTime = estimateReadingTime(deferredContent);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-[2.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_24px_60px_rgba(25,33,50,0.08)] backdrop-blur sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[color:var(--accent)]">
          Editor Lab
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold tracking-[-0.06em] text-[color:var(--foreground)]">
          작성 경험까지 포함된 블로그 플랫폼으로 확장하기 위한
          에디터 프로토타입
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          실제 발행 기능을 열기 전, 어떤 입력 경험과 미리보기가 필요한지
          검증하기 위한 공간입니다. 현재는 UI 프로토타입 단계이며, 추후 관리자
          인증과 Supabase 쓰기 정책이 붙으면 CMS로 확장할 수 있습니다.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-6 shadow-[0_16px_40px_rgba(25,33,50,0.05)]">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
                제목
              </span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--accent)]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
                카테고리
              </span>
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--accent)]"
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
              className="h-28 w-full rounded-[1.5rem] border border-[color:var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--accent)]"
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
              썸네일 주소
            </span>
            <input
              value={thumbnail}
              onChange={(event) => setThumbnail(event.target.value)}
              className="w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--accent)]"
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
              Markdown
            </span>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="h-[420px] w-full rounded-[1.75rem] border border-[color:var(--border)] bg-[#182232] px-5 py-4 font-mono text-sm leading-7 text-[#d9e3ea] outline-none transition focus:border-[color:var(--accent)]"
            />
          </label>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--accent)]">
              Draft metadata
            </p>
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
                <p className="font-medium text-[color:var(--foreground)]">Summary length</p>
                <p className="mt-1">{description.length} chars</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] shadow-[0_16px_40px_rgba(25,33,50,0.05)]">
            <div className="relative h-56 bg-[linear-gradient(135deg,rgba(15,118,110,0.12),rgba(195,93,56,0.16))]">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(25,33,50,0.52)] via-transparent to-transparent" />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--muted)]">
                <span>{category || "General"}</span>
                <span>{readingTime} min read</span>
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-[-0.05em]">
                {title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
                {description}
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[#182232] p-6 text-[#d9e3ea]">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/60">
              Content preview
            </p>
            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-7">
              {deferredContent}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
