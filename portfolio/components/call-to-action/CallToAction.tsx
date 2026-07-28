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

// A restrained, mostly-straight underline with just a slight hand-drawn
// wobble — reverted from a much more pronounced wave after a live
// comparison against a reference showed a conventional solid button
// with a subtle underline read better than an illustrated background
// with a dramatic curve.
const UNDERLINE_PATH = "M1,5 C25,3 60,6 99,4";

/**
 * 008-component-library.md, Section 10. A zero-JS Server Component.
 *
 * Reverted to a conventional solid rounded-rectangle background for both
 * weights — an earlier version replaced this with an irregular
 * painted-stroke illustration, which a direct comparison against a
 * reference showed read less clearly as a button than a normal solid
 * fill. The one hand-drawn touch that survives (006-design-system.md,
 * Section 2's narrow exception) is the underline beneath primary's
 * label — a plain `aria-hidden` SVG `<path>`, not a replacement for the
 * real text it sits under.
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
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-foreground transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isPrimary
          ? "bg-muted/20 hover:bg-muted/30"
          : "border border-border hover:bg-surface"
      )}
    >
      <span className="relative">
        {label}
        {isPrimary ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 -bottom-1.5 h-1.5 w-full text-foreground"
          >
            <path
              d={UNDERLINE_PATH}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ) : null}
      </span>
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  );
}
