"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NavLink } from "./NavLink";
import { navItems } from "@/lib/nav-items";

// "Standard" tier and house easing curve (028-interaction-language.md, Section 18).
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const DURATION_MS = 200;

type IndicatorState = { left: number; width: number; animate: boolean };

/**
 * Spatial continuity for the active-page indicator
 * (028-interaction-language.md, Section 5): the indicator moves between
 * destinations rather than disappearing and reappearing. NavLink is
 * untouched and remains the real, accessible signal (aria-current, font
 * weight) — this indicator is purely decorative reinforcement, hidden from
 * assistive technology.
 *
 * The indicator is positioned by measuring the active NavLink's rendered
 * position directly, rather than threading refs through NavLink's own
 * props, so NavLink's existing behaviour is unmodified.
 */
export function NavList() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLElement>(null);
  const previousPathnameRef = useRef<string | null>(null);
  const [indicator, setIndicator] = useState<IndicatorState | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const active = container.querySelector<HTMLElement>(
      '[aria-current="page"]'
    );
    if (!active) {
      setIndicator(null);
      return;
    }

    // First measurement has nothing to move from, so it appears instantly
    // rather than sliding in from an arbitrary starting point. Reduced-motion
    // preference (009-motion-system.md, Section 7) is checked directly here,
    // since an inline style always overrides a stylesheet media query.
    const isFirstPosition = previousPathnameRef.current === null;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setIndicator({
      left: active.offsetLeft,
      width: active.offsetWidth,
      animate: !isFirstPosition && !prefersReducedMotion,
    });
    previousPathnameRef.current = pathname;
  }, [pathname]);

  return (
    <nav
      ref={containerRef}
      aria-label="Primary"
      className="relative hidden md:flex md:items-center md:gap-1"
    >
      {navItems.map((item) => (
        <NavLink key={item.href} href={item.href} label={item.label} />
      ))}
      {indicator ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-accent"
          style={{
            width: indicator.width,
            transform: `translateX(${indicator.left}px)`,
            transition: indicator.animate
              ? `transform ${DURATION_MS}ms ${EASING}, width ${DURATION_MS}ms ${EASING}`
              : "none",
          }}
        />
      ) : null}
    </nav>
  );
}
