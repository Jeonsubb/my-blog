import Link from "next/link";
import CommentSection from "@/components/CommentSection";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import { absoluteUrl, formatLongDate, siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostData(id);

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

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({ id: post.slug }));
}

export default async function BlogPost({ params }: Props) {
  const { id } = await params;
  const post = await getPostData(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-[2.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_24px_60px_rgba(25,33,50,0.08)] backdrop-blur sm:p-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--accent)]"
        >
          <span>&larr;</span>
          <span>글 목록으로 돌아가기</span>
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-[rgba(15,118,110,0.12)] px-4 py-2 font-medium text-[color:var(--accent)]">
            {post.category || "General"}
          </span>
          <span className="rounded-full bg-white/70 px-4 py-2 text-[color:var(--muted)]">
            {formatLongDate(post.created_at)}
          </span>
          <span className="rounded-full bg-white/70 px-4 py-2 text-[color:var(--muted)]">
            {post.readingTimeMinutes} min read
          </span>
        </div>

        <h1 className="mt-8 max-w-4xl font-display text-5xl font-bold leading-[1.04] tracking-[-0.06em] text-[color:var(--foreground)] sm:text-6xl">
          {post.title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          {post.description}
        </p>

        {post.thumbnail && (
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-[color:var(--border)]">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="h-[320px] w-full object-cover sm:h-[420px]"
            />
          </div>
        )}
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="prose prose-lg max-w-none rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-8 shadow-[0_16px_40px_rgba(25,33,50,0.05)] sm:p-10">
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }} />
        </article>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--accent)]">
              Article summary
            </p>
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
              {post.description}
            </p>
          </div>

          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--accent)]">
              Why this matters
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[color:var(--muted)]">
              <li>블로그 플랫폼 설계 과정을 기록하고 설명력을 높입니다.</li>
              <li>데이터 소스와 UI를 느슨하게 연결해 확장 여지를 남깁니다.</li>
              <li>댓글과 SEO까지 포함해 제품 완성도를 보여줍니다.</li>
            </ul>
          </div>
        </aside>
      </section>

      <CommentSection postId={post.slug} />
    </div>
  );
}
