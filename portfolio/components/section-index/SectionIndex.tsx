"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// House easing curve (028-interaction-language.md, Section 18). This
// governs the discrete colour flip when a marker changes state, not the
// scroll-linked advancement itself — Section 5 exempts that from the
// duration table entirely, since it's a continuous function of scroll
// position, not a fixed-start/fixed-end transition.
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const TRANSITION = `color 150ms ${EASING}, background-color 150ms ${EASING}, border-color 150ms ${EASING}`;

type SectionIndexProps = {
  /** Ordered ids of the page's fixed top-level sections
   * (008-component-library.md, Section 12). Each id must match a real
   * element already present on the page. */
  sectionIds: string[];
};

type Bounds = { top: number; height: number };

/**
 * 008-component-library.md, Section 12. Owns position, sequence, and
 * progress through a page's fixed structure — never a section's title or
 * description, which stays Section Heading's responsibility.
 *
 * Entirely decorative: a screen reader already receives the page's real
 * structure through Section Heading's own headings, in document order.
 * Overlaying a second, numeric representation would add noise, not
 * information, so the whole element is aria-hidden.
 *
 * Progress is measured against the page's actual section boundaries
 * (offsetTop/offsetHeight) — the same DOM-measurement technique already
 * used for Navigation's active-page indicator (NavList.tsx) — rather than
 * estimated from scroll percentage. A marker only advances once a visitor
 * crosses into the next section; nothing here is proportional to how far
 * a visitor has scrolled within one (028-interaction-language.md, Section
 * 5's progress-through-structure, not reading-progress, distinction).
 */
export function SectionIndex({ sectionIds }: SectionIndexProps) {
  const [bounds, setBounds] = useState<Bounds[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Lazy initializer, not effect-driven: reducedMotion is only read once
  // `bounds` is populated (client-only), so a server/client mismatch on
  // this value never reaches the rendered output.
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const rafRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    function measure() {
      const next = sectionIds.map((id) => {
        const el = document.getElementById(id);
        return el ? { top: el.offsetTop, height: el.offsetHeight } : null;
      });
      if (next.every((entry): entry is Bounds => entry !== null)) {
        setBounds(next);
      }
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [sectionIds]);

  useEffect(() => {
    if (bounds.length === 0) return;

    function onScroll() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        // A section is "reached" a little before its top hits the very
        // top of the viewport, so the marker advances as the section
        // becomes the visitor's main focus, not only once it's fully
        // scrolled past.
        const y = window.scrollY + window.innerHeight * 0.3;
        let index = 0;
        for (let i = 0; i < bounds.length; i++) {
          if (y >= bounds[i].top) index = i;
        }
        setCurrentIndex(index);
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [bounds]);

  if (bounds.length === 0) return null;

  const originTop = bounds[0].top;
  const totalHeight =
    bounds[bounds.length - 1].top +
    bounds[bounds.length - 1].height -
    originTop;

  return (
    <div
      aria-hidden="true"
      className="relative hidden w-8 shrink-0 lg:block"
      style={{ height: totalHeight }}
    >
      {sectionIds.map((id, index) => {
        const reached = index <= currentIndex;
        const isLast = index === sectionIds.length - 1;
        const markerTop = bounds[index].top - originTop;
        const segmentTop = markerTop + 28;
        const segmentHeight = isLast
          ? 0
          : Math.max(bounds[index + 1].top - bounds[index].top - 28, 0);

        return (
          <div key={id}>
            <div
              className="absolute left-0 flex flex-col items-center"
              style={{ top: markerTop }}
            >
              <span
                className={cn(
                  "text-xs tabular-nums",
                  reached ? "text-foreground" : "text-muted"
                )}
                style={{ transition: reducedMotion ? "none" : TRANSITION }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "mt-2 h-2 w-2 rounded-full border",
                  reached
                    ? "border-accent bg-accent"
                    : "border-border bg-transparent"
                )}
                style={{ transition: reducedMotion ? "none" : TRANSITION }}
              />
            </div>
            {!isLast ? (
              <span
                className={cn(
                  "absolute left-1/2 w-px -translate-x-1/2",
                  index < currentIndex ? "bg-accent" : "bg-border"
                )}
                style={{
                  top: segmentTop,
                  height: segmentHeight,
                  transition: reducedMotion
                    ? "none"
                    : `background-color 150ms ${EASING}`,
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
