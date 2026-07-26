"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// House easing curve (028-interaction-language.md, Section 18).
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
// Marker colour flip: an instant-feeling state change, not a spatial move.
const COLOR_TRANSITION = `color 150ms ${EASING}, background-color 150ms ${EASING}, border-color 150ms ${EASING}`;
// The active-zone cluster sliding between sections: a genuine spatial
// move between two known positions, the same kind of transition as
// Navigation's active-page indicator (NavList.tsx) — so it uses that
// same "standard" tier, not the "fast" tier above.
const ZONE_DURATION_MS = 200;
const ZONE_TRANSITION = `top ${ZONE_DURATION_MS}ms ${EASING}, height ${ZONE_DURATION_MS}ms ${EASING}`;

// Fixed column widths for the "01 — •" row (number / dash / dot), so the
// active-zone cluster below can be positioned at a known horizontal
// offset (the dot column's centre) instead of guessed against
// flex/gap-rendered widths.
const NUMBER_COL = 24;
const DASH_COL = 16;
const DOT_COL = 24;
const RAIL_LEFT = NUMBER_COL + DASH_COL + DOT_COL / 2;

// The active section's dot cluster covers the centre 80% of that
// section's height on the rail (10% inset top and bottom) — per the
// reference design, not the section's full height.
const ZONE_INSET_RATIO = 0.1;
const ZONE_HEIGHT_RATIO = 0.8;

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
 * Three layered elements, not one:
 * 1. A single, continuous base line spanning the full rail — always
 *    present, one uniform colour, never changes.
 * 2. Per-section marker rows ("01 — •") — a number, a short dash, and a
 *    dot that fills once its section is reached.
 * 3. A moving dot cluster, the visible "you are here" — occupies the
 *    centre 80% of whichever section is currently active and slides to
 *    the next section's own 80% zone as the visitor scrolls into it.
 *
 * The cluster moves between two known positions (one section's zone to
 * the next's) — a discrete state change with a spatial animation, the
 * same shape as Navigation's active-page indicator, not a continuous
 * scroll-proportional fill. It advances only when a visitor crosses into
 * a new section; nothing here is proportional to how far a visitor has
 * scrolled within one (028-interaction-language.md, Section 5's
 * progress-through-structure, not reading-progress, distinction — the
 * cluster's *position* is discrete per-section even though its motion
 * between positions is animated).
 *
 * Progress is measured against the page's actual section boundaries
 * (offsetTop/offsetHeight) — the same DOM-measurement technique already
 * used for Navigation's active-page indicator.
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

  // The active section's "zone" runs from its own marker to the start of
  // the next section's (or, for the last section, to its own content's
  // end) — the same span its marker row already anchors to.
  const zoneStart = bounds[currentIndex].top - originTop;
  const zoneEnd =
    (currentIndex + 1 < bounds.length
      ? bounds[currentIndex + 1].top
      : bounds[currentIndex].top + bounds[currentIndex].height) - originTop;
  const zoneHeight = zoneEnd - zoneStart;
  const clusterTop = zoneStart + zoneHeight * ZONE_INSET_RATIO;
  const clusterHeight = zoneHeight * ZONE_HEIGHT_RATIO;

  return (
    <div
      aria-hidden="true"
      className="relative hidden w-16 shrink-0 lg:block"
      style={{ height: totalHeight }}
    >
      {/* 1. Base line — single, continuous, always present. */}
      <span
        className="absolute w-px bg-border"
        style={{ left: RAIL_LEFT, top: 0, height: totalHeight }}
      />

      {/* 2. Per-section marker rows: "01 — •". */}
      {sectionIds.map((id, index) => {
        const reached = index <= currentIndex;
        const markerTop = bounds[index].top - originTop;

        return (
          <div
            key={id}
            className="absolute left-0 grid items-center"
            style={{
              top: markerTop,
              gridTemplateColumns: `${NUMBER_COL}px ${DASH_COL}px ${DOT_COL}px`,
            }}
          >
            <span
              className={cn(
                "text-xs tabular-nums",
                reached ? "text-foreground" : "text-muted"
              )}
              style={{ transition: reducedMotion ? "none" : COLOR_TRANSITION }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-2.5 justify-self-center bg-border" />
            <span
              className={cn(
                "h-2 w-2 justify-self-center rounded-full border",
                reached
                  ? "border-accent bg-accent"
                  : "border-border bg-transparent"
              )}
              style={{ transition: reducedMotion ? "none" : COLOR_TRANSITION }}
            />
          </div>
        );
      })}

      {/* 3. The moving "you are here" dot cluster — the centre 80% of
          whichever section is currently active, sliding to the next
          section's own 80% zone as the visitor scrolls into it. A
          repeating gradient renders the "multiple dots" without needing
          to compute how many discrete dot elements fit a given height. */}
      <span
        className="absolute w-px"
        style={{
          left: RAIL_LEFT,
          top: clusterTop,
          height: clusterHeight,
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--color-accent) 0, var(--color-accent) 2px, transparent 2px, transparent 6px)",
          transition: reducedMotion ? "none" : ZONE_TRANSITION,
        }}
      />
    </div>
  );
}
