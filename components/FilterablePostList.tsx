"use client";

import { useDeferredValue, useState } from "react";
import Link from "next/link";
import { PostData } from "@/lib/posts";
import { formatShortDate } from "@/lib/site";

type Props = {
  posts: PostData[];
  lockedTag?: string;
  lockedSeries?: string;
};

function getChipProps(isSelected: boolean) {
  if (isSelected) {
    return {
      className: "filled-control rounded-full border px-3 py-1.5 text-sm transition",
      style: undefined,
    };
  }

  return {
    className:
      "rounded-full border border-[color:var(--border)] px-3 py-1.5 text-sm text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]",
    style: undefined,
  };
}

export default function FilterablePostList({
  posts,
  lockedTag,
  lockedSeries,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState(lockedTag ?? "All");
  const [selectedSeries, setSelectedSeries] = useState(lockedSeries ?? "All");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const categories = [
    "All",
    ...new Set(posts.map((post) => post.category || "Uncategorized")),
  ];
  const tags = ["All", ...new Set(posts.flatMap((post) => post.tags))];
  const seriesList = [
    "All",
    ...new Set(posts.map((post) => post.series).filter(Boolean) as string[]),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesTag = lockedTag
      ? post.tags.includes(lockedTag)
      : selectedTag === "All" || post.tags.includes(selectedTag);
    const matchesSeries =
      lockedSeries
        ? post.series === lockedSeries
        : selectedSeries === "All"
          ? true
          : post.series === selectedSeries;
    const searchableText = [
      post.title,
      post.description,
      post.category || "",
      post.series || "",
      post.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    const matchesQuery = deferredQuery.length === 0 || searchableText.includes(deferredQuery);

    return matchesCategory && matchesTag && matchesSeries && matchesQuery;
  });

  return (
    <section className="space-y-8">
      <div className="space-y-4 border-b border-[color:var(--border)] pb-6">
        <label className="block">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="검색어를 입력해 주세요"
            className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 text-sm outline-none transition focus:border-[color:var(--foreground)]"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const chipProps = getChipProps(selectedCategory === category);

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={chipProps.className}
                style={chipProps.style}
              >
                {category}
              </button>
            );
          })}
        </div>

        {!lockedTag && tags.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const chipProps = getChipProps(selectedTag === tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={chipProps.className}
                  style={chipProps.style}
                >
                  {tag === "All" ? "All Tags" : `#${tag}`}
                </button>
              );
            })}
          </div>
        )}

        {!lockedSeries && seriesList.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {seriesList.map((series) => {
              const chipProps = getChipProps(selectedSeries === series);

              return (
                <button
                  key={series}
                  type="button"
                  onClick={() => setSelectedSeries(series)}
                  className={chipProps.className}
                  style={chipProps.style}
                >
                  {series === "All" ? "All Series" : series}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="divide-y divide-[color:var(--border)]">
        {filteredPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="group block py-7">
            <article>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]">
                <span>{formatShortDate(post.created_at)}</span>
                <span>·</span>
                <span>{post.category || "General"}</span>
                {post.series && (
                  <>
                    <span>·</span>
                    <span>{post.series}</span>
                  </>
                )}
                <span>·</span>
                <span>{post.readingTimeMinutes} min read</span>
              </div>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] group-hover:underline">
                {post.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                {post.description || "설명이 아직 작성되지 않았습니다."}
              </p>

              {(post.tags.length > 0 || post.series) && (
                <div className="mt-3 flex flex-wrap gap-2 text-sm text-[color:var(--muted)]">
                  {post.series && (
                    <span className="rounded-full border border-[color:var(--border)] px-3 py-1">
                      {post.series}
                    </span>
                  )}
                  {post.tags.map((tag) => (
                    <span
                      key={`${post.slug}-${tag}`}
                      className="rounded-full border border-[color:var(--border)] px-3 py-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
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
                ? "새 글을 작성하면 목록이 이곳에 표시됩니다."
                : "검색어나 필터를 조금 더 넓게 잡아 보세요."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
