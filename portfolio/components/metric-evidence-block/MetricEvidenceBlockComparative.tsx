import { formatMetricValue } from "@/lib/formatMetricValue";

type MetricPoint = {
  value: number;
  /** What state or period this value represents (e.g. "Before migration"),
   * required — a bare "before"/"after" is not honestly interpretable on
   * its own (008-component-library.md, Section 8's content ownership). */
  label: string;
};

type MetricEvidenceBlockComparativeProps = {
  before: MetricPoint;
  after: MetricPoint;
  prefix?: string;
  suffix?: string;
  /** Overall context: what this comparison measures. */
  context: string;
};

/**
 * A computed delta, never an authored one — it can't be independently
 * inflated or rounded up, since it's derived from the same two real values
 * rendered above it. No colour, no icon: a signed number only, so no
 * direction is implied to be "good" (006-design-system.md, Section 3;
 * status colour is for state, not value judgments this component can't make).
 */
function formatDelta(
  before: number,
  after: number,
  prefix?: string,
  suffix?: string
): string {
  const diff = after - before;
  if (diff === 0) return "No change";

  const sign = diff > 0 ? "+" : "−";
  if (before !== 0) {
    const relative = (Math.abs(diff) / Math.abs(before)) * 100;
    return `${sign}${relative.toLocaleString(undefined, { maximumFractionDigits: 1 })}%`;
  }
  return `${sign}${formatMetricValue(Math.abs(diff), prefix, suffix)}`;
}

/**
 * 008-component-library.md, Section 8 — comparative variant. A static
 * Server Component: no motion (028-interaction-language.md, Section 12
 * licenses animation only for a single numeric metric, not a comparison).
 * Before and after share identical visual weight — neither is presented
 * as the "better" one.
 */
export function MetricEvidenceBlockComparative({
  before,
  after,
  prefix,
  suffix,
  context,
}: MetricEvidenceBlockComparativeProps) {
  return (
    <figure>
      <dl className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
        <div>
          <dt className="text-sm text-muted">{before.label}</dt>
          <dd className="text-2xl leading-tight font-semibold tabular-nums text-foreground">
            {formatMetricValue(before.value, prefix, suffix)}
          </dd>
        </div>
        <span aria-hidden="true" className="text-muted">
          &rarr;
        </span>
        <div>
          <dt className="text-sm text-muted">{after.label}</dt>
          <dd className="text-2xl leading-tight font-semibold tabular-nums text-foreground">
            {formatMetricValue(after.value, prefix, suffix)}
          </dd>
        </div>
      </dl>
      <figcaption className="mt-1 text-sm leading-relaxed text-muted">
        {context} (
        <span className="tabular-nums">
          {formatDelta(before.value, after.value, prefix, suffix)}
        </span>
        )
      </figcaption>
    </figure>
  );
}
