import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[color:var(--border)]">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-8 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-medium text-[color:var(--foreground)]">전섭의 빌드 로그</p>
          <p className="mt-1">Next.js와 Supabase로 만드는 블로그 플랫폼 실험.</p>
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
