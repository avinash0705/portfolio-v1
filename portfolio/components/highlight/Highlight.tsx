import Link from "next/link";

type HighlightProps =
  | { claim: string; href?: undefined; linkLabel?: undefined }
  | { claim: string; href: string; linkLabel: string };

/**
 * 008-component-library.md, Section 4. One claim, optionally linked to a
 * qualifying Case Study. Never used for a numeric metric — that's Metric /
 * Evidence Block, not a Highlight variant.
 *
 * The href/linkLabel pairing is a discriminated union rather than two
 * optional props: providing a link without a specific accessible name is a
 * compile error, not something that can be forgotten at runtime
 * (022-coding-standards.md, Section 3 — invalid states unrepresentable).
 */
export function Highlight({ claim, href, linkLabel }: HighlightProps) {
  return (
    <p className="text-sm leading-relaxed text-foreground">
      {claim}
      {href ? (
        <>
          {" "}
          <Link
            href={href}
            aria-label={linkLabel}
            className="relative text-accent after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-150 after:ease-[cubic-bezier(0.16,1,0.3,1)] after:content-[''] hover:after:scale-x-100 motion-reduce:after:transition-none"
          >
            Case study
          </Link>
        </>
      ) : null}
    </p>
  );
}
