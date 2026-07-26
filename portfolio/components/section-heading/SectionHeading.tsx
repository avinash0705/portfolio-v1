import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** The label — fixed (Case Studies, AgentPrep) or authored (Homepage,
   * Resume, Contact) is a content-source distinction the caller resolves;
   * this component treats both identically. */
  title: string;
  /** One short supporting line. Never the section's actual body content
   * (008-component-library.md, Section 3). */
  description?: string;
  /** Document outline level — the caller decides, since the correct
   * heading level depends on where this section sits on its page. */
  level?: 2 | 3;
  /** Enables deep-linking for fixed-structure content (Case Studies,
   * AgentPrep) per 027-application-behaviour.md, Section 2. Also doubles
   * as Section Index's measurement anchor on any page using it
   * (008-component-library.md, Section 12) — putting the id on the
   * heading itself, not a wrapping element, is what keeps Section
   * Index's marker aligned with this heading's own position rather than
   * whatever padding surrounds it. */
  id?: string;
  /** A single trailing link to a fuller version of this section's content
   * elsewhere on the site (008-component-library.md, Section 3, as
   * amended). Only licensed where that fuller destination genuinely
   * exists in 003-information-architecture.md — the caller is responsible
   * for that check; this component only renders what it's given. Both
   * props are required together, or neither is provided. */
  viewAllHref?: string;
  /** States the actual destination (e.g. "View all case studies"), never
   * a bare "View all" — the same name-precision rule Highlight's linked
   * variant follows. */
  viewAllLabel?: string;
  /** Renders the title bisected by a continuous horizontal rule that
   * starts right after it and fills the remaining width (up to the
   * `viewAllHref` link, if present) — the section's own top divider,
   * replacing a separate full-width line above the heading. Only used on
   * pages that compose their own section dividers this way (the
   * Homepage); never a page-wide default. */
  divider?: boolean;
};

/**
 * 008-component-library.md, Section 3. A Server Component with no motion
 * of its own (028-interaction-language.md, Section 7 scopes scroll-reveal
 * to specific page types this shared atom can't assume) and no client-side
 * JavaScript cost (011-performance.md, Section 9).
 *
 * `divider`'s bisecting line is a flex row with the title, a `flex-1`
 * rule, and (if present) the `viewAllHref` link — `items-center`
 * vertically centres the 1px line on the title's own text, which is
 * what makes it read as bisecting the title rather than sitting below
 * or above it.
 */
export function SectionHeading({
  title,
  description,
  level = 2,
  id,
  viewAllHref,
  viewAllLabel,
  divider,
}: SectionHeadingProps) {
  const Heading = level === 3 ? "h3" : "h2";

  return (
    <div>
      <div
        className={cn(
          "flex gap-4",
          divider ? "items-center" : "items-baseline justify-between"
        )}
      >
        <Heading
          id={id}
          className="shrink-0 text-xl leading-tight font-semibold text-foreground md:text-2xl"
        >
          {title}
        </Heading>
        {divider ? (
          <span aria-hidden="true" className="h-px min-w-8 flex-1 bg-border" />
        ) : null}
        {viewAllHref && viewAllLabel ? (
          <Link
            href={viewAllHref}
            className="inline-flex shrink-0 items-center gap-1 text-sm text-accent hover:underline"
          >
            {viewAllLabel}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
      {description ? (
        <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
