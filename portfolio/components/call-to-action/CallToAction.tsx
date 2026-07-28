import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type CallToActionProps = {
  /** States the actual action — never "Click here" (010-accessibility.md). */
  label: string;
  href: string;
  /**
   * Primary and secondary are distinguished by visual weight, never colour
   * alone (008-component-library.md, Section 10). Required, not defaulted —
   * every call site makes a deliberate choice. At most one primary-weighted
   * instance may exist per page; this component makes primary maximally
   * distinct so a second one would be an obvious composition mistake, but
   * it cannot mechanically prevent one — that's a page-composition and
   * review concern (013-content-strategy.md), not something a single,
   * independent instance can know about its siblings.
   */
  weight: "primary" | "secondary";
};

// Both viewBoxes use `preserveAspectRatio="none"` so the paths stretch to
// fill whatever size the button actually renders at (label length varies
// per call site) — a deliberate trade-off: the brush texture stretches
// with the button rather than staying a fixed illustration, which can't
// be confirmed without a browser to render different label lengths against.
const BRUSH_STROKE_PATH =
  "M 2 5 C 0 16 -1 28 3 37 C 32 42 68 41 98 36 C 101 24 101 11 97 3 C 66 -2 26 0 2 5 Z";
// A pronounced, obviously wavy curve — earlier used a much flatter curve
// (a small fraction of the viewBox height), which non-uniform stretching
// to the label's actual width/height then flattened further, to the
// point of barely reading as curved at all. Swinging across nearly the
// full viewBox height, rather than a small fraction of it, is what keeps
// the curve visible after that stretch.
const UNDERLINE_PATH = "M0,10 Q25,0 50,9 T100,7";

/**
 * 008-component-library.md, Section 10. A zero-JS Server Component — every
 * state below is plain CSS (opacity/colour), no JS needed even for the
 * hover-grows-opacity behaviour.
 *
 * The painted-stroke background and, on primary, the marker-style
 * underline are 006-design-system.md, Section 2's one named hand-drawn
 * exception — confirmed directly against a reference. Both are `aria-hidden`
 * decorative SVG, layered behind/under the real label text via `relative`
 * stacking, never a replacement for it. No border on either weight —
 * the stroke's opacity (stronger for primary, fainter for secondary,
 * both growing on hover) and the underline's presence/absence are what
 * distinguish weight now, not colour or a bounding box.
 *
 * The trailing arrow (006-design-system.md, Section 9) is decorative only
 * — the label alone is still the accessible name and the actual action
 * statement; the icon adds a directional affordance, not new content.
 */
export function CallToAction({ label, href, weight }: CallToActionProps) {
  const isPrimary = weight === "primary";

  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-foreground"
    >
      {/* Bleeds beyond the button's own box (-inset-3, not inset-0) so the
          brush stroke reads as visibly wider/bigger than the label, not a
          tight-fitting shape traced around the text. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className={cn(
          "pointer-events-none absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] text-muted transition-opacity duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isPrimary
            ? "opacity-75 group-hover:opacity-100"
            : "opacity-30 group-hover:opacity-50"
        )}
      >
        <path d={BRUSH_STROKE_PATH} fill="currentColor" />
      </svg>
      <span className="relative">
        {label}
        {isPrimary ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 100 12"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 -bottom-2 h-3 w-full text-accent"
          >
            <path
              d={UNDERLINE_PATH}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ) : null}
      </span>
      <ArrowRight aria-hidden="true" className="relative h-4 w-4" />
    </Link>
  );
}
