import { formatMetricValue } from "@/lib/formatMetricValue";
import { AnimatedOverlay } from "./AnimatedOverlay";

type MetricEvidenceBlockProps = {
  /** The real numeric value. Only a real number is accepted — no
   * pre-formatted arbitrary string — so the decorative animation can
   * always interpolate it meaningfully (028-interaction-language.md,
   * Section 12's "implementation-defined" animation strategy still
   * requires a well-defined numeric interpolation to exist). */
  value: number;
  prefix?: string;
  suffix?: string;
  /** What it measures, over what period, relative or absolute — required
   * content ownership, never optional (008-component-library.md,
   * Section 8). */
  label: string;
};

/**
 * 008-component-library.md, Section 8 — numeric variant. See also
 * MetricEvidenceBlockComparative and MetricEvidenceBlockDiagram in this
 * same folder for the other two variants.
 *
 * The canonical value below is real, always-rendered text: present,
 * correct, and selectable regardless of JavaScript, CSS, or motion
 * preference (028-interaction-language.md, Section 12). It is never
 * hidden, replaced, or modified by AnimatedOverlay — only visually
 * covered, briefly, by a separate decorative element.
 */
export function MetricEvidenceBlock({
  value,
  prefix,
  suffix,
  label,
}: MetricEvidenceBlockProps) {
  return (
    <figure>
      <div className="relative inline-block">
        <p className="text-3xl leading-tight font-semibold tabular-nums text-foreground">
          {formatMetricValue(value, prefix, suffix)}
        </p>
        <AnimatedOverlay value={value} prefix={prefix} suffix={suffix} />
      </div>
      <figcaption className="mt-1 text-sm leading-relaxed text-muted">
        {label}
      </figcaption>
    </figure>
  );
}
