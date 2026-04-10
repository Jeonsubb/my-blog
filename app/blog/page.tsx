import type { Metadata } from "next";
import FilterablePostList from "@/components/FilterablePostList";
import { getPostSourceLabel, getSortedPostsData } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "전섭의 빌드 로그에 쌓인 글을 카테고리와 키워드로 탐색할 수 있습니다.",
};

export default async function Blog() {
  const allPostsData = await getSortedPostsData();
  const categories = new Set(allPostsData.map((post) => post.category || "General"));
  const sourceLabel = getPostSourceLabel();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-[2.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_24px_60px_rgba(25,33,50,0.08)] backdrop-blur sm:p-10">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-[rgba(15,118,110,0.12)] px-4 py-2 font-medium text-[color:var(--accent)]">
            Article archive
          </span>
          <span className="rounded-full bg-white/70 px-4 py-2 text-[color:var(--muted)]">
            {sourceLabel}
          </span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_280px] lg:items-end">
          <div>
            <h1 className="font-display text-5xl font-bold tracking-[-0.06em] text-[color:var(--foreground)]">
              블로그 글 목록
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted)]">
              기술 메모, 구현 기록, 프로젝트 회고를 한곳에 모았습니다. 카테고리
              필터와 검색으로 필요한 글을 빠르게 찾아볼 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-[2rem] border border-[color:var(--border)] bg-white/70 p-5">
            <div>
              <p className="font-display text-3xl font-bold tracking-[-0.05em]">
                {allPostsData.length}
              </p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Posts</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold tracking-[-0.05em]">
                {categories.size}
              </p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Categories</p>
            </div>
          </div>
        </div>
      </section>

      <FilterablePostList posts={allPostsData} />
    </div>
  );
}
