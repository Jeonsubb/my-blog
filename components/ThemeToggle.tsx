"use client";

import { useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem("theme", theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") {
      return "light";
    }

    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  });

  return (
    <button
      type="button"
      onClick={() => {
        const nextTheme = theme === "light" ? "dark" : "light";
        setTheme(nextTheme);
        applyTheme(nextTheme);
      }}
      className="rounded-full border border-[color:var(--border)] px-3 py-1.5 text-sm text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
