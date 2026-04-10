"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[color:var(--border)]">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="text-base font-semibold tracking-[-0.03em]">
          전섭의 빌드 로그
        </Link>

        <nav className="flex items-center gap-5 text-sm text-[color:var(--muted)]">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition ${
                  isActive
                    ? "font-medium text-[color:var(--foreground)]"
                    : "hover:text-[color:var(--foreground)]"
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
