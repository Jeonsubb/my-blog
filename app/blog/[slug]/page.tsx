import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CommentSection from "@/components/CommentSection";
import PostAiAssistant from "@/components/PostAiAssistant";
import { isAiConfigured } from "@/lib/ai";
import { getPostData } from "@/lib/posts";
import { absoluteUrl, decodeRouteParam, formatLongDate, siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(decodeRouteParam(slug));

  if (!post) {
    return { title: "글을 찾을 수 없음" };
  }

  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const ogImage = post.thumbnail ? absoluteUrl(post.thumbnail) : undefined;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: postUrl,
      siteName: siteConfig.name,
      title: post.title,
      description: post.description,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(decodeRouteParam(slug));

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6">
      <section className="border-b border-[color:var(--border)] pb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
        >
          <span>&larr;</span>
          <span>글 목록으로 돌아가기</span>
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]">
          <span>{formatLongDate(post.created_at)}</span>
          <span>·</span>
          <span>{post.category || "General"}</span>
          {post.series && (
            <>
              <span>·</span>
              <Link
                href={`/series/${encodeURIComponent(post.series)}`}
                className="hover:text-[color:var(--foreground)] hover:underline"
              >
                {post.series}
              </Link>
            </>
          )}
          <span>·</span>
          <span>{post.readingTimeMinutes} min read</span>
        </div>

        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
          {post.title}
        </h1>

        <p className="mt-5 text-base leading-8 text-[color:var(--muted)]">
          {post.description}
        </p>

        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="rounded-full border border-[color:var(--border)] px-3 py-1 text-sm text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {post.thumbnail && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-[color:var(--border)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.thumbnail}
              alt={post.title}
              className="h-[260px] w-full object-cover sm:h-[360px]"
            />
          </div>
        )}
      </section>

      <PostAiAssistant
        isAiEnabled={isAiConfigured}
        title={post.title}
        description={post.description}
        content={post.content || ""}
      />

      <section>
        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }} />
        </article>
      </section>

      <CommentSection postId={post.slug} />
    </div>
  );
}
