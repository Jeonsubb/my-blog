import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FilterablePostList from "@/components/FilterablePostList";
import { getSortedPostsData, getUniqueTags } from "@/lib/posts";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `#${tag} 태그가 붙은 글을 모아봅니다.`,
  };
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return getUniqueTags(posts).map((tag) => ({ tag }));
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = await getSortedPostsData();
  const taggedPosts = posts.filter((post) => post.tags.includes(tag));

  if (taggedPosts.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6">
      <section>
        <p className="text-sm text-[color:var(--muted)]">Tag archive</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">#{tag}</h1>
        <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
          이 태그가 붙은 글만 모아서 봅니다.
        </p>
      </section>

      <FilterablePostList posts={taggedPosts} lockedTag={tag} />
    </div>
  );
}
