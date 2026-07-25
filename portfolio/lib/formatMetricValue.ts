/**
 * Shared by all Metric / Evidence Block variants (008-component-library.md,
 * Section 8) that render a formatted number — extracted after a genuine
 * third occurrence (022-coding-standards.md, Section 2's rule of three).
 * Rounds internally so it's safe for both whole real values and the
 * mid-interpolation floats AnimatedOverlay produces.
 */
export function formatMetricValue(
  value: number,
  prefix?: string,
  suffix?: string
): string {
  return `${prefix ?? ""}${Math.round(value).toLocaleString()}${suffix ?? ""}`;
}
