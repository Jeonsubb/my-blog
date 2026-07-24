import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FilterablePostList from "@/components/FilterablePostList";
import { getSortedPostsData } from "@/lib/posts";
import { absoluteUrl, decodeRouteParam } from "@/lib/site";

type Props = {
  params: Promise<{ tag: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const normalizedTag = decodeRouteParam(tag);
  const title = `#${normalizedTag}`;
  const description = `#${normalizedTag} 태그가 붙은 글 목록입니다.`;
  const pageUrl = absoluteUrl(`/tags/${encodeURIComponent(normalizedTag)}`);

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      title,
      description,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const normalizedTag = decodeRouteParam(tag);
  const posts = await getSortedPostsData();
  const taggedPosts = posts.filter((post) => post.tags.includes(normalizedTag));

  if (taggedPosts.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6">
      <section>
        <p className="text-sm text-[color:var(--muted)]">Tag archive</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
          #{normalizedTag}
        </h1>
        <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
          같은 태그로 묶인 글만 모아 볼 수 있습니다.
        </p>
      </section>

      <FilterablePostList posts={taggedPosts} lockedTag={normalizedTag} />
    </div>
  );
}
