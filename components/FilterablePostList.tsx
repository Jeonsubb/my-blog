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
      <div className="space-y-4 border-b border-[color:var(--border)] pb-6">
        <label className="block">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="검색어를 입력하세요"
            className="w-full rounded-xl border border-[color:var(--border)] px-4 py-3 text-sm outline-none transition focus:border-black"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                selectedCategory === category
                  ? "border-black bg-black text-white"
                  : "border-[color:var(--border)] text-[color:var(--muted)] hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-[color:var(--border)]">
        {filteredPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="group block py-7">
            <article>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]">
                <span>{formatShortDate(post.created_at)}</span>
                <span>·</span>
                <span>{post.category || "General"}</span>
                <span>·</span>
                <span>{post.readingTimeMinutes} min read</span>
              </div>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] group-hover:underline">
                {post.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                {post.description || "이 글의 핵심 내용을 곧 정리해서 채워 넣을 예정입니다."}
              </p>
            </article>
          </Link>
        ))}

        {filteredPosts.length === 0 && (
          <div className="py-10">
            <p className="text-xl font-semibold tracking-[-0.03em]">
              {posts.length === 0
                ? "아직 공개된 글이 없습니다"
                : "조건에 맞는 글을 찾지 못했습니다"}
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              {posts.length === 0
                ? "Supabase 데이터와 첫 게시글이 준비되면 이 공간이 채워집니다."
                : "검색어를 줄이거나 다른 카테고리를 선택해 보세요."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
