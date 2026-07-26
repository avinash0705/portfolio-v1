"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

// House easing curve, "fast" tier (028-interaction-language.md, Section 18) —
// governs the icon morph, one of the system's three named delight moments
// (Section 17, #3).
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const TRANSITION = `opacity 150ms ${EASING}, transform 150ms ${EASING}`;

function readInitialTheme(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

function readReducedMotionPreference(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
 * preference) — the pre-paint script has already made the visible page
 * theme correct before hydration; only this button's own icon/aria-label
 * could differ for the first render, the same unavoidable-mismatch shape
 * as any client-only theme detection. `suppressHydrationWarning` on the
 * button is the accepted escape hatch for exactly this case, moved here
 * (previously on an inner text span) now that the visible difference is
 * an icon pair and an aria-label rather than text content.
 *
 * The sun/moon morph is a cross-fade + rotate between two stacked Lucide
 * icons (006-design-system.md, Section 9) — not a literal path morph.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(readInitialTheme);
  const [reducedMotion] = useState(readReducedMotionPreference);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  }

  const transition = reducedMotion ? "none" : TRANSITION;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      suppressHydrationWarning
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface"
    >
      <Sun
        aria-hidden="true"
        className="absolute h-4 w-4"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark
            ? "rotate(-90deg) scale(0.5)"
            : "rotate(0deg) scale(1)",
          transition,
        }}
      />
      <Moon
        aria-hidden="true"
        className="absolute h-4 w-4"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark
            ? "rotate(0deg) scale(1)"
            : "rotate(90deg) scale(0.5)",
          transition,
        }}
      />
    </button>
  );
}
