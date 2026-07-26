import Link from "next/link";

/** The five categories are a closed set (017-journal.md, Section 4) — no
 * sixth category, no free-form string, so an invalid value is a compile
 * error rather than a runtime possibility. */
export const JOURNAL_CATEGORIES = [
  "Engineering Decisions",
  "Architecture Notes",
  "Postmortems",
  "Product Development",
  "Technical Experiments",
] as const;

export type JournalCategory = (typeof JOURNAL_CATEGORIES)[number];

type JournalPreviewProps = {
  /** Should state the lesson or question, per 017-journal.md, Section 6
   * — never a generic title. */
  title: string;
  category: JournalCategory;
  href: string;
  /** Document outline level — same reasoning as every other component's
   * level prop in this library. */
  headingLevel?: 3 | 4;
};

/**
 * 008-component-library.md, Section 6 — the same responsibility as
 * CaseStudyPreview, applied to a different content type. Deliberately not
 * sharing implementation with CaseStudyPreview despite the near-identical
 * shape: 008 treats these as two distinct named components, and
 * extracting a shared base now would create exactly two occurrences of
 * the pattern — the same rule-of-three threshold already applied to the
 * underline-draw CSS and the easing constant. What is shared is the
 * *decision*, not the code: the same title-colour hover treatment as
 * CaseStudyPreview, for the same reason (a block-level preview link, not
 * inline prose).
 *
 * No category-specific visual treatment — 008 explicitly rules this out;
 * categories are organisational text, never colour-coded badges.
 */
export function JournalPreview({
  title,
  category,
  href,
  headingLevel = 3,
}: JournalPreviewProps) {
  const Heading = headingLevel === 4 ? "h4" : "h3";

  return (
    <Link href={href} aria-label={title} className="group block">
      <Heading className="text-base font-medium text-foreground transition-colors duration-150 group-hover:text-accent">
        {title}
      </Heading>
      <p className="mt-1 text-sm text-muted">{category}</p>
    </Link>
  );
}
