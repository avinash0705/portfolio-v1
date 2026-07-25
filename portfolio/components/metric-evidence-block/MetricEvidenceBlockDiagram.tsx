import Image from "next/image";

type MetricEvidenceBlockDiagramProps = {
  src: string;
  /** Describes what the diagram/screenshot shows and why it qualifies as
   * evidence (010-accessibility.md, Section 7) — never a generic label
   * like "diagram" or "screenshot". */
  alt: string;
  width: number;
  height: number;
  /** What this represents, over what period — the visible, honest context
   * required by 008-component-library.md, Section 8. Distinct from alt:
   * this is read by every visitor, not only when the image can't be seen.
   * Both live in the same <figure> so they can't drift apart from it. */
  context: string;
};

/**
 * 008-component-library.md, Section 8 — diagram/artifact variant. Every
 * image here is evidentiary, never decorative — 006-design-system.md's
 * illustration/photography policy already excludes decorative imagery
 * site-wide, so there is no decorative code path or optional-alt escape
 * hatch to build.
 *
 * Zoom-to-full-size ships here only as its progressive-enhancement
 * baseline: a plain link to the full image file, which works with zero
 * JavaScript. The calmer in-page scale-and-fade zoom overlay
 * (028-interaction-language.md, Section 11) is a deliberately deferred
 * enhancement — its own focus-management and interaction work, not
 * rushed into this pass.
 */
export function MetricEvidenceBlockDiagram({
  src,
  alt,
  width,
  height,
  context,
}: MetricEvidenceBlockDiagramProps) {
  return (
    <figure>
      <a href={src} className="block">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full rounded-sm border border-border"
        />
      </a>
      <figcaption className="mt-1 text-sm leading-relaxed text-muted">
        {context}
      </figcaption>
    </figure>
  );
}
