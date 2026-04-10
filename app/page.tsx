import Link from "next/link";
import { getPostSourceLabel, getSortedPostsData } from "@/lib/posts";
import { formatLongDate } from "@/lib/site";

export default async function Home() {
  const posts = await getSortedPostsData();
  const featuredPosts = posts.slice(0, 3);
  const categories = new Set(posts.map((post) => post.category || "General")).size;
  const sourceLabel = getPostSourceLabel();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[2.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_24px_60px_rgba(25,33,50,0.08)] backdrop-blur sm:p-10">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-[rgba(15,118,110,0.12)] px-4 py-2 font-medium text-[color:var(--accent)]">
              Portfolio-ready blog platform
            </span>
            <span className="rounded-full bg-white/70 px-4 py-2 text-[color:var(--muted)]">
              {sourceLabel}
            </span>
          </div>

          <h1 className="mt-8 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-[-0.06em] text-[color:var(--foreground)] sm:text-6xl">
            기록이 쌓일수록 더 좋아지는
            <br />
            에디토리얼 블로그 플랫폼
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            단순한 글 목록이 아니라, Supabase 기반 데이터 엔진과 댓글 API,
            SEO, 에디터 확장성을 함께 염두에 두고 다듬은 개인 블로그
            프로젝트입니다.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="rounded-full bg-[color:var(--foreground)] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
            >
              글 보러 가기
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-[color:var(--border)] bg-white/70 px-6 py-3 text-sm font-medium text-[color:var(--foreground)] transition hover:bg-white"
            >
              프로젝트 소개
            </Link>
            <Link
              href="/admin/write"
              className="rounded-full border border-transparent bg-[rgba(195,93,56,0.12)] px-6 py-3 text-sm font-medium text-[color:var(--accent-strong)] transition hover:bg-[rgba(195,93,56,0.16)]"
            >
              Editor Lab 보기
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(15,118,110,0.92),rgba(7,89,83,0.92))] p-7 text-white shadow-[0_24px_60px_rgba(15,118,110,0.24)]">
            <p className="text-sm uppercase tracking-[0.22em] text-white/70">
              Platform snapshot
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <p className="font-display text-4xl font-bold tracking-[-0.05em]">
                  {posts.length}
                </p>
                <p className="mt-2 text-sm text-white/80">Published posts</p>
              </div>
              <div>
                <p className="font-display text-4xl font-bold tracking-[-0.05em]">
                  {categories}
                </p>
                <p className="mt-2 text-sm text-white/80">Categories</p>
              </div>
            </div>
          </div>

          {[
            {
              title: "Supabase-first architecture",
              body: "파일 기반 구조에서 DB 중심 구조로 넘어가며, 글 목록·상세·사이트맵이 같은 데이터 원천을 보도록 정리했습니다.",
            },
            {
              title: "Comment CRUD API",
              body: "조회, 작성, 수정, 삭제 흐름을 라우트 핸들러로 분리해 블로그 플랫폼다운 상호작용을 붙였습니다.",
            },
            {
              title: "SEO and storytelling",
              body: "메타데이터, 사이트맵, 소개 페이지, 에디터 랩까지 연결해 포트폴리오 설명력도 함께 끌어올렸습니다.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6"
            >
              <p className="font-display text-2xl font-bold tracking-[-0.04em]">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[color:var(--accent)]">
              Latest stories
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-[-0.05em]">
              최근에 정리한 글들
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-medium text-[color:var(--accent)]">
            전체 글 보기
          </Link>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-6 shadow-[0_16px_40px_rgba(25,33,50,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(25,33,50,0.12)]"
              >
                <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  <span>{post.category || "General"}</span>
                  <span>{post.readingTimeMinutes} min read</span>
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold tracking-[-0.05em] transition group-hover:text-[color:var(--accent)]">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
                  {post.description}
                </p>
                <div className="mt-8 flex items-center justify-between text-sm">
                  <span>{formatLongDate(post.created_at)}</span>
                  <span className="font-medium text-[color:var(--accent)]">
                    Read now
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[color:var(--border)] bg-white/60 p-10 text-center">
            <p className="font-display text-2xl font-bold tracking-[-0.04em]">
              아직 노출할 글이 없습니다
            </p>
            <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
              Supabase를 연결하거나 로컬 샘플 글을 추가하면 홈 피드가 채워집니다.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
