import Link from "next/link";
import { getPostSourceLabel, getSortedPostsData } from "@/lib/posts";
import { formatLongDate } from "@/lib/site";

export default async function Home() {
  const posts = await getSortedPostsData();
  const featuredPosts = posts.slice(0, 6);
  const sourceLabel = getPostSourceLabel();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-12 sm:px-6">
      <section>
        <p className="text-sm text-[color:var(--muted)]">{sourceLabel}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
          전섭의 빌드 로그
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--muted)]">
          Next.js와 Supabase를 기반으로 블로그 플랫폼을 만들고 다듬는 과정을
          기록합니다.
        </p>
        <div className="mt-6 flex items-center gap-4 text-sm">
          <Link href="/blog" className="font-medium hover:underline">
            글 보러 가기
          </Link>
          <Link
            href="/about"
            className="text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
          >
            소개
          </Link>
          <Link
            href="/admin/write"
            className="text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
          >
            Editor Lab
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between border-b border-[color:var(--border)] pb-3">
          <h2 className="text-lg font-medium">최근 글</h2>
          <Link
            href="/blog"
            className="text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
          >
            전체 보기
          </Link>
        </div>
        {featuredPosts.length > 0 ? (
          <div className="divide-y divide-[color:var(--border)]">
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block py-6"
              >
                <div className="flex items-center gap-3 text-sm text-[color:var(--muted)]">
                  <span>{formatLongDate(post.created_at)}</span>
                  <span>·</span>
                  <span>{post.category || "General"}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] group-hover:underline">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-10">
            <p className="text-xl font-semibold tracking-[-0.03em]">
              아직 노출할 글이 없습니다
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              Supabase 환경 변수와 게시글 데이터가 연결되면 홈 피드가 채워집니다.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
