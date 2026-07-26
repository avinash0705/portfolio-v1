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

// The active section's dot cluster covers the centre 30% of that
// section's height on the rail (35% inset top and bottom, symmetric so
// it stays centred) — confirmed directly against a reference as a
// smaller, more restrained zone than the original 80%.
const ZONE_INSET_RATIO = 0.35;
const ZONE_HEIGHT_RATIO = 0.3;

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
 * 3. A cluster of real circular dots (hollow, border only), the visible
 *    "you are here" — occupies the centre 30% of whichever section is
 *    currently active and jumps to the next section's own 30% zone the
 *    instant a visitor scrolls into it — an intentionally sudden
 *    reposition, not an eased slide (confirmed directly against a
 *    reference: this is the one element in this system that reads
 *    better as a discrete cut than a continuous move).
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
 *
 * Every measured position is relative to this component's *own*
 * container element (`railTop`, via `containerRef`), not to the first
 * section's own position. Those are not the same reference point: this
 * container renders as a normal flex sibling starting at the top of the
 * row (level with Hero's `<section>`), while Hero's first real content
 * line sits well below that, after Hero's own top padding. Using the
 * first section's position as the zero-reference — as an earlier version
 * of this component did — silently shifted every marker upward by
 * exactly that padding, a bug no amount of per-marker offset tuning
 * could fix, because the container itself was measuring from the wrong
 * origin.
 */
export function SectionIndex({ sectionIds }: SectionIndexProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Bounds are stored as absolute page positions (so the scroll-position
  // comparison below stays in the same coordinate space as
  // `window.scrollY`); `railTop` is subtracted from them only at render
  // time, to place markers within the container's own local coordinates.
  const [bounds, setBounds] = useState<Bounds[]>([]);
  const [railTop, setRailTop] = useState(0);
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
      const container = containerRef.current;
      if (!container) return;
      // The container's own position is the correct zero-reference —
      // see the doc comment above for why the first section's position
      // is not the same thing. Stored separately from `bounds`, which
      // stay absolute.
      setRailTop(container.getBoundingClientRect().top + window.scrollY);

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

  const hasBounds = bounds.length > 0;

  // The container itself must always render — even before `bounds` is
  // populated — so `containerRef` exists for `measure()` to read on the
  // very first pass. Only its children (markers, lines, cluster) wait on
  // real measurements. Every position below subtracts `railTop`, moving
  // from absolute page coordinates (what `bounds` stores, so the scroll
  // comparison above stays correct) into the container's own local
  // coordinates (what CSS `top` here needs).
  const totalHeight = hasBounds
    ? bounds[bounds.length - 1].top + bounds[bounds.length - 1].height - railTop
    : 0;

  // The active section's "zone" runs from its own marker to the start of
  // the next section's (or, for the last section, to its own content's
  // end) — the same span its marker row already anchors to.
  const zoneStart = hasBounds ? bounds[currentIndex].top - railTop : 0;
  const zoneEnd = hasBounds
    ? (currentIndex + 1 < bounds.length
        ? bounds[currentIndex + 1].top
        : bounds[currentIndex].top + bounds[currentIndex].height) - railTop
    : 0;
  const zoneHeight = zoneEnd - zoneStart;
  const clusterTop = zoneStart + zoneHeight * ZONE_INSET_RATIO;
  const clusterHeight = zoneHeight * ZONE_HEIGHT_RATIO;
  const clusterDotCount = Math.max(
    Math.floor(clusterHeight / CLUSTER_DOT_SPACING) + 1,
    1
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative hidden w-16 shrink-0 lg:block"
      style={{ height: totalHeight }}
    >
      {hasBounds ? (
        <>
          {/* 1. Base line — single, continuous, always present. */}
          <span
            className="absolute w-px bg-border"
            style={{ left: RAIL_LEFT, top: 0, height: totalHeight }}
          />

          {/* 2. Per-section marker rows: "01 — •". */}
          {sectionIds.map((id, index) => {
            const reached = index <= currentIndex;
            const headingCenter =
              bounds[index].top - railTop + bounds[index].height / 2;
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
                  style={{
                    transition: reducedMotion ? "none" : COLOR_TRANSITION,
                  }}
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
                  style={{
                    transition: reducedMotion ? "none" : COLOR_TRANSITION,
                  }}
                />
              </div>
            );
          })}

          {/* 3. The "you are here" dot cluster — real circular dots,
              hollow (border only, no fill), evenly spaced through the
              centre 30% of whichever section is currently active.
              Repositions instantly the moment the active section
              changes; deliberately not eased. Neutral `foreground`, not
              `accent` — confirmed directly against a reference: this
              rail is a decorative, aria-hidden position indicator, not a
              primary action, so it shouldn't compete with the one
              accent colour 006-design-system.md, Section 3 reserves for
              actual primary actions (the CTA buttons). */}
          {Array.from({ length: clusterDotCount }, (_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 -translate-x-1/2 rounded-full border border-foreground bg-transparent"
              style={{
                left: RAIL_LEFT,
                top: clusterTop + i * CLUSTER_DOT_SPACING,
              }}
            />
          ))}
        </>
      ) : null}
    </div>
  );
}
