import { CallToAction } from "@/components/call-to-action/CallToAction";
import { TechnicalMotif } from "@/components/decorative/TechnicalMotif";

type Capability = {
  label: string;
  /** Must be independently verifiable elsewhere in the portfolio (a
   * performance budget, an accessibility conformance target, case study
   * evidence) — never a generic claim with no corresponding evidence
   * (008-component-library.md, Section 2, as amended). */
  description: string;
};

type HeroProps = {
  name: string;
  /** Current role/level — not a job title alone, per
   * 014-homepage.md, Section 5. */
  role: string;
  /** The single sentence answering "who is this engineer?" directly —
   * never a slogan, never a technology list (014-homepage.md, Section 5). */
  positioningStatement: string;
  /** Optional capability-summary panel (008-component-library.md,
   * Section 2, as amended). 3–4 bullets restating the positioning
   * statement's substance in scannable form. Text-only, deliberately: no
   * icon library has been chosen for this project (006-design-system.md,
   * Section 9; the same reasoning already applied in Contact Methods). */
  capabilities?: Capability[];
};

/**
 * 008-component-library.md, Section 2 — the one component exempted from
 * the two-page guardrail, because Homepage's entire one-job is
 * inseparable from it. No container for the primary content
 * (006-design-system.md, Section 2, as amended): typography and
 * whitespace only. The capability panel is the one named exception to
 * that rule — it needs a visible boundary to read as one discrete unit
 * beside the positioning statement, the same functional reasoning a
 * diagram gets. No motion: nothing here is long-form, scroll-triggered
 * content, and every item is required to be understood in the first five
 * seconds, not revealed progressively.
 *
 * The primary/secondary CTA copy and destinations are fixed by
 * 014-homepage.md, Section 4 — not configurable props, since there is
 * exactly one Hero for exactly one Homepage (008, Section 2's "Variants:
 * None"). Reuses the existing CallToAction component rather than
 * reimplementing button markup.
 *
 * `id="hero"` is Section Index's anchor for this section
 * (008-component-library.md, Section 12) — Hero is always first in the
 * page's fixed section order (014-homepage.md, Section 3).
 */
export function Hero({
  name,
  role,
  positioningStatement,
  capabilities,
}: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden py-24 lg:py-32">
      <TechnicalMotif className="hidden lg:block" />
      <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-16">
        <div>
          <p className="text-sm text-muted">{name}</p>
          <h1 className="mt-1 text-sm font-medium tracking-wide text-accent uppercase">
            {role}
          </h1>
          <p className="mt-6 text-4xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {positioningStatement}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CallToAction
              label="View Case Studies"
              href="/case-studies"
              weight="primary"
            />
            <CallToAction
              label="View Resume"
              href="/resume"
              weight="secondary"
            />
          </div>
        </div>

        {capabilities && capabilities.length > 0 ? (
          <div className="rounded-lg border border-border bg-surface p-6">
            <ul className="flex flex-col divide-y divide-border">
              {capabilities.map((capability) => (
                <li
                  key={capability.label}
                  className="py-3 first:pt-0 last:pb-0"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {capability.label}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {capability.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
