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

/**
 * 008-component-library.md, Section 10. A zero-JS Server Component — every
 * state below is plain CSS. Colour/press transitions are not gated behind
 * prefers-reduced-motion: that preference targets spatial movement, and a
 * background-colour fade isn't that (unlike Navigation's sliding indicator
 * or Highlight's underline-draw, both genuinely spatial).
 *
 * The trailing arrow (006-design-system.md, Section 9) is decorative only
 * — the label alone is still the accessible name and the actual action
 * statement; the icon adds a directional affordance, not new content.
 */
export function CallToAction({ label, href, weight }: CallToActionProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-colors duration-[140ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        weight === "primary"
          ? "bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80"
          : "border border-border text-foreground hover:bg-surface active:bg-surface/80"
      )}
    >
      {label}
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  );
}
