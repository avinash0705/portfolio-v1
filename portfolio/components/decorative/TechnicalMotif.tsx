import { cn } from "@/lib/cn";

type TechnicalMotifProps = {
  className?: string;
};

/**
 * 006-design-system.md, Section 10's technical-motif exception: an
 * abstract, non-figurative background — a dotted grid, a few scattered
 * crosshair marks, a construction circle outline, and a partial arc. No
 * person, product, metaphor, or scene — only the same geometric
 * language already licensed by Section 2 and Section 6.
 *
 * Scattered, not centred — an earlier version placed concentric circles
 * and a crosshair at one focal point, confirmed directly against a
 * reference as reading too much like a standalone illustration ("archery
 * target") rather than quiet texture. This version spreads the same
 * category of marks (crosshairs, a circle, an arc) loosely across the
 * canvas instead, at a lower opacity (~3%, down from 4%), so nothing
 * reads as a single focal illustration.
 *
 * A separate, smaller motif (`QuickLinksMotif.tsx`) briefly existed for
 * behind Hero's now-removed quick-links grid; this component absorbed
 * its reasoning (crosshairs, lines) back into one composition once that
 * grid was replaced by the Skills visualization (`SkillsDiagram.tsx`).
 *
 * A licensed visual-language decision, not a content component — it owns
 * no responsibility 008-component-library.md would need to track (no
 * content, no variants, nothing a page composes around), so it lives
 * outside that library, the same way colour tokens and spacing don't get
 * their own component-library entry either.
 *
 * `currentColor` + a single opacity utility keeps it correct in both
 * themes automatically, rather than needing separate light/dark motif
 * assets. Kept to a single fixed presentation — reused as-is wherever a
 * page wants it, not configured per call site, matching Section 10's
 * "licenses the visual language, not a specific placement" framing.
 */
export function TechnicalMotif({ className }: TechnicalMotifProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-foreground opacity-[0.03]",
        className
      )}
    >
      <defs>
        <pattern
          id="technical-motif-grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#technical-motif-grid)" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <circle cx="60" cy="330" r="40" />
        <path d="M 300 40 A 90 90 0 0 1 340 120" />
        <path d="M60 60v18M51 69h18" />
        <path d="M340 300v18M331 309h18" />
        <path d="M190 20v18M181 29h18" />
      </g>
    </svg>
  );
}
