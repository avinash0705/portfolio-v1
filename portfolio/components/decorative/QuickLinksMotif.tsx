import { cn } from "@/lib/cn";

type QuickLinksMotifProps = {
  className?: string;
};

/**
 * 006-design-system.md, Section 10's technical-motif exception — the
 * same licensed visual language as `TechnicalMotif.tsx` (abstract,
 * non-figurative, no person/product/metaphor/scene), a distinct, smaller
 * composition: scattered "+" crosshair marks, thin connecting lines
 * between them, and two small rectangle brackets — construction/guide
 * marks, not a dotted grid. Sized to sit specifically behind Hero's
 * quick-links grid, confirmed directly against a reference, rather than
 * spanning the whole Hero the way `TechnicalMotif` does.
 *
 * Deliberately a second, separate component rather than a variant prop
 * on `TechnicalMotif` — the two are visually and structurally distinct
 * enough (dot pattern vs. a scattered line network) that forcing one
 * component to render both would need its own internal branching for no
 * real reuse benefit; each stays a single, simple, fixed presentation.
 */
export function QuickLinksMotif({ className }: QuickLinksMotifProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 300"
      preserveAspectRatio="xMidYMid slice"
      className={cn(
        "pointer-events-none absolute text-foreground opacity-[0.05]",
        className
      )}
    >
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <path d="M 30 20 L 230 20 L 230 130" />
        <path d="M 60 210 L 190 260" />
        <rect x="10" y="4" width="20" height="20" />
        <rect x="250" y="110" width="18" height="18" />
      </g>
      <g stroke="currentColor" strokeWidth="1">
        <path d="M30 12v16M22 20h16" />
        <path d="M230 12v16M222 20h16" />
        <path d="M230 122v16M222 130h16" />
        <path d="M60 202v16M52 210h16" />
        <path d="M190 252v16M182 260h16" />
      </g>
    </svg>
  );
}
