"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/admin/write", label: "Editor Lab" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-3 shadow-[0_18px_40px_rgba(25,33,50,0.08)] backdrop-blur">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--foreground)] font-display text-sm font-bold text-white">
            JL
          </span>
          <div>
            <p className="font-display text-lg font-bold tracking-[-0.04em]">
              전섭의 빌드 로그
            </p>
            <p className="text-xs text-[color:var(--muted)]">
              Editorial blog platform
            </p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-[color:var(--foreground)] text-white shadow-sm"
                    : "text-[color:var(--muted)] hover:bg-white/70 hover:text-[color:var(--foreground)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
