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

// The active-position dot cluster's height is fixed — the same size
// regardless of which section is active — since it now tracks raw
// scroll position continuously rather than a given section's own zone
// (008-component-library.md, Section 12's narrow scroll-position
// exception). A reasoned estimate, not measured against a real render.
const CLUSTER_HEIGHT = 120;

// Real, individually-positioned circular dots (h-1 w-1 = 4px, below),
// spaced evenly through the cluster's height — a repeating CSS gradient
// on a 1px-wide strip can only fake tick marks, never an actual circle.
const CLUSTER_DOT_SPACING = 10;
const CLUSTER_DOT_COUNT = Math.floor(CLUSTER_HEIGHT / CLUSTER_DOT_SPACING) + 1;

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
 * 3. A cluster of real circular dots (hollow, border only, fixed
 *    height), the visible "you are here" — moves continuously with raw
 *    scroll position, the same way a scrollbar thumb does, rather than
 *    being tied to which section is current.
 *
 * The numbered markers (2) stay strictly discrete — a marker advances
 * only when a visitor crosses into a new section, never proportional to
 * scroll distance. The dot cluster (3) is a deliberate, narrow exception
 * to that rule (008-component-library.md, Section 12): it may track
 * literal scroll position continuously, because it's a purely
 * decorative, non-textual visual element, not a claim about reading
 * progress. The two coexist without contradiction — one communicates
 * structure, the other communicates literal position, and neither is
 * confused with the other since the cluster carries no text or numbers
 * of its own.
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
  // 0–1, how far scrolled through the measured content overall — drives
  // only the decorative dot cluster's continuous position, never the
  // numbered markers, which stay governed by `currentIndex` above.
  const [scrollFraction, setScrollFraction] = useState(0);
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

        // The same `y` also drives the dot cluster's continuous
        // position — how far it sits between the first section's start
        // and the last section's end, clamped to [0, 1].
        const contentTop = bounds[0].top;
        const contentHeight =
          bounds[bounds.length - 1].top +
          bounds[bounds.length - 1].height -
          contentTop;
        const fraction =
          contentHeight > 0
            ? Math.min(Math.max((y - contentTop) / contentHeight, 0), 1)
            : 0;
        setScrollFraction(fraction);
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

  // The cluster's centre tracks `scrollFraction` continuously across the
  // rail's full height, clamped so a fixed-height cluster never renders
  // past either end of the rail.
  const clusterCenter = scrollFraction * totalHeight;
  const clusterTop = Math.min(
    Math.max(clusterCenter - CLUSTER_HEIGHT / 2, 0),
    Math.max(totalHeight - CLUSTER_HEIGHT, 0)
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
              hollow (border only, no fill), fixed height, moving
              continuously with scroll position (008-component-library.md,
              Section 12's narrow exception — see the function doc
              comment above). Neutral `foreground`, not `accent` —
              confirmed directly against a reference: this rail is a
              decorative, aria-hidden position indicator, not a primary
              action, so it shouldn't compete with the one accent colour
              006-design-system.md, Section 3 reserves for actual
              primary actions (the CTA buttons). */}
          {Array.from({ length: CLUSTER_DOT_COUNT }, (_, i) => (
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
