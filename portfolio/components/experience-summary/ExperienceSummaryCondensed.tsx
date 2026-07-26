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
 */
export function ExperienceSummaryCondensed({
  title,
  company,
  dates,
}: ExperienceSummaryCondensedProps) {
  return (
    <p className="text-sm text-foreground">
      <span className="font-medium">{title}</span> — {company} ({dates})
    </p>
  );
}
