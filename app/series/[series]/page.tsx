import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FilterablePostList from "@/components/FilterablePostList";
import { getSortedPostsData, getUniqueSeries } from "@/lib/posts";

type Props = {
  params: Promise<{ series: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { series } = await params;
  return {
    title: series,
    description: `${series} 시리즈 글 목록입니다.`,
  };
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return getUniqueSeries(posts).map((series) => ({ series }));
}

export default async function SeriesPage({ params }: Props) {
  const { series } = await params;
  const posts = await getSortedPostsData();
  const seriesPosts = posts.filter((post) => post.series === series);

  if (seriesPosts.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6">
      <section>
        <p className="text-sm text-[color:var(--muted)]">Series archive</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{series}</h1>
        <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
          같은 흐름으로 이어지는 글만 모아 볼 수 있습니다.
        </p>
      </section>

      <FilterablePostList posts={seriesPosts} lockedSeries={series} />
    </div>
  );
}
