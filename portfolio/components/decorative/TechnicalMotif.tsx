import { cn } from "@/lib/cn";

type TechnicalMotifProps = {
  className?: string;
};

/**
 * 006-design-system.md, Section 10's technical-motif exception: an
 * abstract, non-figurative dotted grid background. No person, product,
 * metaphor, or scene — only the same geometric language already
 * licensed by Section 2 and Section 6.
 *
 * Deliberately dots only, not a compound illustration — the earlier
 * version also included concentric crosshair circles and an arc,
 * confirmed directly against a reference as reading too much like a
 * standalone illustration ("archery target") rather than quiet texture.
 * A distinct, smaller motif exists for behind the Hero's quick-links
 * grid specifically (`QuickLinksMotif.tsx`) — this component no longer
 * tries to cover that case too.
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
        "pointer-events-none absolute inset-0 h-full w-full text-foreground opacity-[0.04]",
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
    </svg>
  );
}
