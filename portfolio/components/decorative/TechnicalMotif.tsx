import { cn } from "@/lib/cn";

type TechnicalMotifProps = {
  className?: string;
};

/**
 * 006-design-system.md, Section 10's technical-motif exception: an
 * abstract, non-figurative background — a dotted grid, a pair of
 * concentric crosshair circles, an arc, and a small measurement mark.
 * No person, product, metaphor, or scene — only the same geometric
 * language already licensed by Section 2 and Section 6.
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
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <circle cx="320" cy="90" r="70" />
        <circle cx="320" cy="90" r="45" />
        <line x1="320" y1="8" x2="320" y2="172" />
        <line x1="238" y1="90" x2="400" y2="90" />
        <path d="M 40 300 A 120 120 0 0 1 160 240" />
        <line x1="40" y1="285" x2="40" y2="315" />
        <line x1="25" y1="300" x2="55" y2="300" />
      </g>
    </svg>
  );
}
