import {
  Highlight,
  type HighlightProps,
} from "@/components/highlight/Highlight";

export type ExperienceRole = {
  title: string;
  company: string;
  dates: string;
  /** Reuses Highlight's exact prop shape rather than a redefined,
   * incompatible one. */
  highlights?: HighlightProps[];
  /** Connective narrative describing how scope evolved into this role
   * from the previous one (026-experience.md, Section 4). Its presence
   * or absence per role is the only difference between the full-tabular
   * variant (018-resume.md — omit it) and the narrative variant
   * (026-experience.md — include it), per 008-component-library.md,
   * Section 7: both share the same underlying data. */
  evolutionNote?: string;
};

type ExperienceSummaryListProps = {
  roles: ExperienceRole[];
  /** Document outline level for each role's heading — the caller decides,
   * since the correct level depends on where this list sits on its page
   * (same reasoning as Section Heading's own level prop). */
  headingLevel?: 3 | 4;
};

/**
 * 008-component-library.md, Section 7 — full-tabular and narrative
 * variants, unified into one component (see commit message / review for
 * why). Role, company, and dates are grouped under one heading per role
 * (010-accessibility.md), inside an <ol> since role order is genuinely
 * chronological. No container — typography, spacing, and the <ol>/<li>
 * structure carry the hierarchy (006-design-system.md, Section 2).
 */
export function ExperienceSummaryList({
  roles,
  headingLevel = 3,
}: ExperienceSummaryListProps) {
  const Heading = headingLevel === 4 ? "h4" : "h3";

  return (
    <ol className="space-y-8">
      {roles.map((role, index) => (
        <li key={`${role.company}-${role.title}-${index}`}>
          {role.evolutionNote ? (
            <p className="mb-2 text-sm leading-relaxed text-muted">
              {role.evolutionNote}
            </p>
          ) : null}
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <Heading className="text-base font-medium text-foreground">
              {role.title} <span className="text-muted">— {role.company}</span>
            </Heading>
            <p className="text-sm text-muted">{role.dates}</p>
          </div>
          {role.highlights && role.highlights.length > 0 ? (
            <ul className="mt-2 space-y-1">
              {role.highlights.map((highlight, highlightIndex) => (
                <li key={highlightIndex}>
                  <Highlight {...highlight} />
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
