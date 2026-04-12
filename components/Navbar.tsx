"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[color:var(--border)] bg-[color:var(--background)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="text-base font-semibold tracking-[-0.03em]">
          전섭의 블로그
        </Link>

        <div className="flex items-center gap-3">
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
