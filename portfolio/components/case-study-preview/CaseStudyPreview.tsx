import Link from "next/link";

type CaseStudyPreviewProps = {
  title: string;
  /** The one-line problem/outcome summary — never the case study's full
   * narrative, which belongs only on its own page
   * (008-component-library.md, Section 5). */
  summary: string;
  href: string;
  /** Document outline level — the caller decides, since this sits inside
   * whatever section heading already introduces the list it belongs to
   * (same reasoning as Section Heading and Experience Summary's own
   * level props). */
  headingLevel?: 3 | 4;
};

/**
 * 008-component-library.md, Section 5. Deliberately minimal: title, a
 * one-line summary, and a link — nothing else. No Metric / Evidence
 * Block, no Highlight, no CTA composed in here, even though this
 * component sits between several richer ones in the library. Pulling
 * evidence content into a preview would violate "never contains...
 * any content from the fixed structure" and undermine the component's
 * actual job — letting a visitor decide whether to open the full case
 * study, not showing them the evidence before they do.
 *
 * The entire preview is one accessible link target (010-accessibility.md;
 * 008, Section 5's own accessibility expectation) — aria-label is set
 * explicitly to the title so the accessible name is precise, not a
 * concatenation of title and summary text.
 */
export function CaseStudyPreview({
  title,
  summary,
  href,
  headingLevel = 3,
}: CaseStudyPreviewProps) {
  const Heading = headingLevel === 4 ? "h4" : "h3";

  return (
    <Link href={href} aria-label={title} className="group block">
      <Heading className="text-base font-medium text-foreground transition-colors duration-150 group-hover:text-accent">
        {title}
      </Heading>
      <p className="mt-1 text-sm leading-relaxed text-muted">{summary}</p>
    </Link>
  );
}
