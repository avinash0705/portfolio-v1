type ExperienceSummaryCondensedProps = {
  title: string;
  company: string;
  dates: string;
};

/**
 * 008-component-library.md, Section 7 — condensed variant (Homepage's
 * Track Record). Enough to convey seniority, deliberately not a full
 * history: the caller supplies a single role (typically the most recent),
 * not the full role list — selecting which role to show is a page-
 * composition concern, not something this component decides for itself.
 *
 * Title/company on one line, dates right-aligned on the far end of the
 * same row — a layout change only, confirmed directly against a
 * reference. Still exactly the same three fields as before; no
 * description or connective text added (008's own content ownership
 * reserves that for the narrative variant only, never condensed).
 */
export function ExperienceSummaryCondensed({
  title,
  company,
  dates,
}: ExperienceSummaryCondensedProps) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <p className="text-sm text-foreground">
        <span className="font-medium">{title}</span>{" "}
        <span className="text-muted">·</span> {company}
      </p>
      <p className="shrink-0 text-sm text-muted">{dates}</p>
    </div>
  );
}
