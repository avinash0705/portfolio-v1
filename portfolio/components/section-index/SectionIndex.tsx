"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// House easing curve (028-interaction-language.md, Section 18). Governs
// only the marker colour flip below — an instant-feeling state change,
// not a spatial move.
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const COLOR_TRANSITION = `color 150ms ${EASING}, background-color 150ms ${EASING}, border-color 150ms ${EASING}`;

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

// Real, individually-positioned circular dots (h-1 w-1 = 4px, below),
// spaced evenly through the cluster's height — a repeating CSS gradient
// on a 1px-wide strip can only fake tick marks, never an actual circle.
const CLUSTER_DOT_SPACING = 10;

// The marker row's own rendered height (its tallest child is the
// text-xs number, ~16px line-height) — needed to align the row's
// vertical *centre* with its heading's centre, not its top with the
// heading's top. A heading's own line-height is taller than this short
// row, so top-to-top alignment leaves the marker visibly sitting above
// the heading's centre rather than level with it.
const MARKER_ROW_HEIGHT = 16;

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
 * 3. A cluster of real circular dots, the visible "you are here" —
 *    occupies the centre 80% of whichever section is currently active
 *    and jumps to the next section's own 80% zone the instant a visitor
 *    scrolls into it — an intentionally sudden reposition, not an eased
 *    slide (confirmed directly against a reference: this is the one
 *    element in this system that reads better as a discrete cut than a
 *    continuous move).
 *
 * The cluster's position is still discrete per-section, never
 * proportional to how far a visitor has scrolled within one
 * (028-interaction-language.md, Section 5's progress-through-structure,
 * not reading-progress, distinction) — only *how* it changes state
 * (instantly, not eased) differs from Navigation's active-page
 * indicator.
 *
 * Progress is measured against each section's real document position via
 * `getBoundingClientRect()` (plus scroll offset), not `offsetTop` —
 * `offsetTop` is relative to the nearest positioned ancestor, which
 * silently breaks the moment any measured element sits inside its own
 * `position: relative` wrapper (as Hero's does, for the technical
 * motif's absolute background). `getBoundingClientRect()` always
 * reflects true position on the page regardless of what's positioned
 * in between.
 *
 * Each marker row is centred on its heading's vertical centre, not
 * aligned top-to-top with it — a heading's own line-height is taller
 * than the short number/dash/dot row, so top-to-top alignment leaves the
 * marker visibly sitting above the heading rather than level with it.
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
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { top: rect.top + window.scrollY, height: rect.height };
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
  const clusterDotCount = Math.max(
    Math.floor(clusterHeight / CLUSTER_DOT_SPACING) + 1,
    1
  );

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
        const headingCenter =
          bounds[index].top - originTop + bounds[index].height / 2;
        const markerTop = headingCenter - MARKER_ROW_HEIGHT / 2;

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

      {/* 3. The "you are here" dot cluster — real circular dots, evenly
          spaced through the centre 80% of whichever section is
          currently active. Repositions instantly the moment the active
          section changes; deliberately not eased. */}
      {Array.from({ length: clusterDotCount }, (_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
          style={{
            left: RAIL_LEFT,
            top: clusterTop + i * CLUSTER_DOT_SPACING,
          }}
        />
      ))}
    </div>
  );
}
