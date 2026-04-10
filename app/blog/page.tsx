import type { Metadata } from "next";
import FilterablePostList from "@/components/FilterablePostList";
import { getPostSourceLabel, getSortedPostsData } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "전섭의 빌드 로그에 쌓인 글을 카테고리와 키워드로 탐색할 수 있습니다.",
};

export default async function Blog() {
  const allPostsData = await getSortedPostsData();
  const sourceLabel = getPostSourceLabel();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6">
      <section>
        <p className="text-sm text-[color:var(--muted)]">{sourceLabel}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Blog</h1>
        <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
          구현 기록, 기술 메모, 프로젝트 회고를 모아둔 공간입니다.
        </p>
      </section>

      <FilterablePostList posts={allPostsData} />
    </div>
  );
}
