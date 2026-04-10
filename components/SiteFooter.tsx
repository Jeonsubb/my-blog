import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="px-4 pb-8 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-6 text-sm text-[color:var(--muted)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl font-bold tracking-[-0.04em] text-[color:var(--foreground)]">
            전섭의 빌드 로그
          </p>
          <p className="mt-1">
            Next.js, Supabase, 콘텐츠 UX를 한 프로젝트 안에서 실험하는 공간입니다.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/blog" className="hover:text-[color:var(--foreground)]">
            Blog
          </Link>
          <Link href="/about" className="hover:text-[color:var(--foreground)]">
            About
          </Link>
          <Link href="/admin/write" className="hover:text-[color:var(--foreground)]">
            Editor Lab
          </Link>
        </div>
      </div>
    </footer>
  );
}
