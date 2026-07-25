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
   * AgentPrep) per 027-application-behaviour.md, Section 2. Omitted
   * elsewhere. */
  id?: string;
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
}: SectionHeadingProps) {
  const Heading = level === 3 ? "h3" : "h2";

  return (
    <div>
      <Heading
        id={id}
        className="text-xl leading-tight font-semibold text-foreground md:text-2xl"
      >
        {title}
      </Heading>
      {description ? (
        <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
