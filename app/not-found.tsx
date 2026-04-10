import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="rounded-[2.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-10 shadow-[0_24px_60px_rgba(25,33,50,0.08)] backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[color:var(--accent)]">
          404 Not Found
        </p>
        <h1 className="mt-6 font-display text-5xl font-bold tracking-[-0.06em] text-[color:var(--foreground)]">
          요청한 글을 찾을 수 없습니다
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-[color:var(--muted)]">
          글이 삭제되었거나 아직 공개되지 않았을 수 있습니다. 목록으로 돌아가서
          다른 글을 둘러보세요.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-flex rounded-full bg-[color:var(--foreground)] px-6 py-3 text-sm font-medium text-white"
        >
          블로그 목록 보기
        </Link>
      </div>
    </div>
  );
}
