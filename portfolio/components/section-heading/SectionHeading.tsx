import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  /** Renders a short, `aria-hidden` decorative dash after the title,
   * mirroring the dash in Section Index's own marker row (`01 —`) on
   * pages that use it. Purely visual pairing — never enabled on a page
   * without Section Index, where an orphaned dash would have nothing to
   * visually pair with. */
  indexMark?: boolean;
};

/**
 * 008-component-library.md, Section 3. A Server Component with no motion
 * of its own (028-interaction-language.md, Section 7 scopes scroll-reveal
 * to specific page types this shared atom can't assume) and no client-side
 * JavaScript cost (011-performance.md, Section 9).
 */
export function SectionHeading({
  title,
  description,
  level = 2,
  id,
  viewAllHref,
  viewAllLabel,
  indexMark,
}: SectionHeadingProps) {
  const Heading = level === 3 ? "h3" : "h2";

  return (
    <div className="flex items-baseline justify-between gap-4">
      <div>
        <Heading
          id={id}
          className="text-xl leading-tight font-semibold text-foreground md:text-2xl"
        >
          {title}
          {indexMark ? (
            <span aria-hidden="true" className="ml-3 text-muted">
              —
            </span>
          ) : null}
        </Heading>
        {description ? (
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </div>
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
  );
}
