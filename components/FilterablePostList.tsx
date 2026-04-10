"use client";

import { useDeferredValue, useState } from "react";
import Link from "next/link";
import { PostData } from "@/lib/posts";
import { formatShortDate } from "@/lib/site";

type Props = {
  posts: PostData[];
};

export default function FilterablePostList({ posts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const categories = [
    "All",
    ...new Set(posts.map((post) => post.category || "Uncategorized")),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const searchableText = [
      post.title,
      post.description,
      post.category || "",
    ]
      .join(" ")
      .toLowerCase();
    const matchesQuery = deferredQuery.length === 0 || searchableText.includes(deferredQuery);

    return matchesCategory && matchesQuery;
  });

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_18px_40px_rgba(25,33,50,0.06)] backdrop-blur">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[color:var(--accent)]">
              Explore posts
            </p>
            <h2 className="font-display text-2xl font-bold tracking-[-0.04em]">
              카테고리와 키워드로 빠르게 탐색하기
            </h2>
          </div>

          <label className="block w-full max-w-md">
            <span className="mb-2 block text-sm font-medium text-[color:var(--muted)]">
              Search
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Next.js, Supabase, SEO..."
              className="w-full rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-[color:var(--accent)] focus:bg-white"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-[color:var(--foreground)] text-white"
                  : "bg-white/80 text-[color:var(--muted)] hover:bg-white hover:text-[color:var(--foreground)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredPosts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.id}
            className="group block h-full"
          >
            <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] shadow-[0_16px_40px_rgba(25,33,50,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(25,33,50,0.12)]">
              {post.thumbnail ? (
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(25,33,50,0.46)] via-transparent to-transparent" />
                </div>
              ) : (
                <div className="flex h-56 items-center justify-center bg-[linear-gradient(135deg,rgba(15,118,110,0.12),rgba(195,93,56,0.16))]">
                  <span className="font-display text-lg font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                    {post.category || "Article"}
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  <span>{post.category || "General"}</span>
                  <span>{post.readingTimeMinutes} min read</span>
                </div>

                <h3 className="font-display text-2xl font-bold tracking-[-0.04em] text-[color:var(--foreground)] transition group-hover:text-[color:var(--accent)]">
                  {post.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-[color:var(--muted)]">
                  {post.description || "이 글의 핵심 내용을 곧 정리해서 채워 넣을 예정입니다."}
                </p>

                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-[color:var(--muted)]">
                    {formatShortDate(post.created_at)}
                  </span>
                  <span className="font-medium text-[color:var(--accent)]">
                    Read article
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}

        {filteredPosts.length === 0 && (
          <div className="rounded-[2rem] border border-dashed border-[color:var(--border)] bg-white/60 p-10 text-center md:col-span-2 xl:col-span-3">
            <p className="font-display text-2xl font-bold tracking-[-0.04em]">
              {posts.length === 0
                ? "아직 공개된 글이 없습니다"
                : "조건에 맞는 글을 찾지 못했습니다"}
            </p>
            <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
              {posts.length === 0
                ? "Supabase 데이터를 연결하거나 첫 글을 발행하면 이 공간이 채워집니다."
                : "검색어를 줄이거나 다른 카테고리를 선택해 보세요."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
