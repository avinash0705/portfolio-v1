"use client";

import { useState } from "react";

function readInitialTheme(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

/**
 * Manual theme override on top of the system-preference default
 * (027-application-behaviour.md, Section 4). The pre-paint script in the
 * root layout already applies the correct class before hydration; this
 * component only needs to reflect and toggle that state.
 *
 * The initial value is read lazily during the first client render rather
 * than synced via an effect, per React's guidance against calling setState
 * synchronously inside an effect body. Server and client can disagree on
 * this one read (the server has no access to localStorage or system
 * preference), so the label is deliberately exempted from hydration
 * mismatch warnings — the pre-paint script has already made the visible
 * theme correct; only this text label could briefly differ.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(readInitialTheme);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      className="rounded-sm border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-surface"
    >
      <span suppressHydrationWarning>
        {isDark ? "Light mode" : "Dark mode"}
      </span>
    </button>
  );
}
