import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[color:var(--border)]">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-8 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} 전섭</p>

        <div className="flex flex-wrap gap-4">
          <Link href="/" className="hover:text-[color:var(--foreground)]">
            Home
          </Link>
          <Link href="/blog" className="hover:text-[color:var(--foreground)]">
            Blog
          </Link>
        </div>
      </div>
    </footer>
  );
}
