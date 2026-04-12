import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { formatLongDate } from "@/lib/site";

export default async function Home() {
  const posts = await getSortedPostsData();
  const featuredPosts = posts.slice(0, 6);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-14 px-4 py-14 sm:px-6">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
          전섭의 블로그
        </h1>
        <p className="mt-5 text-base leading-8 text-[color:var(--muted)]">
          꾸준히 성장하는 개발자를 지향합니다.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between border-b border-[color:var(--border)] pb-3">
          <h2 className="text-lg font-medium">최신 글</h2>
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
              아직 게시된 글이 없습니다
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              첫 번째 글을 작성하면 이곳에서 바로 확인할 수 있습니다.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
