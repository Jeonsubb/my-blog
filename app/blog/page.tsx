import type { Metadata } from "next";
import FilterablePostList from "@/components/FilterablePostList";
import { getSortedPostsData } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "구현 기록과 기술 메모를 모아둔 글 목록입니다.",
};

export default async function Blog() {
  const allPostsData = await getSortedPostsData();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-[-0.05em]">Blog</h1>
        <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
          구현 과정에서 남긴 판단과 기록을 모아둔 공간입니다.
        </p>
      </section>

      <FilterablePostList posts={allPostsData} />
    </div>
  );
}
