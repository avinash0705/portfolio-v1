import type { LucideIcon } from "lucide-react";
import { CallToAction } from "@/components/call-to-action/CallToAction";
import { TechnicalMotif } from "@/components/decorative/TechnicalMotif";

type Capability = {
  label: string;
  /** Must be independently verifiable elsewhere in the portfolio (a
   * performance budget, an accessibility conformance target, case study
   * evidence) — never a generic claim with no corresponding evidence
   * (008-component-library.md, Section 2, as amended). */
  description: string;
  /** Decorative only — the label and description already carry the
   * meaning (006-design-system.md, Section 9: icons support a label,
   * never replace one). The caller chooses the icon, keeping Hero itself
   * icon-agnostic. */
  icon: LucideIcon;
};

type HeroProps = {
  name: string;
  /** Current role/level — not a job title alone, per
   * 014-homepage.md, Section 5. */
  role: string;
  /** The single sentence answering "who is this engineer?" directly —
   * never a slogan, never a technology list (014-homepage.md, Section 5). */
  positioningStatement: string;
  /** One optional supporting sentence beneath the positioning statement
   * (008-component-library.md, Section 2, as amended) — may only restate
   * or extend the positioning statement's own claim, never introduce a
   * new one, and is capped at one sentence. */
  supportingSentence?: string;
  /** Optional capability-summary panel (008-component-library.md,
   * Section 2, as amended). 3–4 bullets restating the positioning
   * statement's substance in scannable form. */
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
 *
 * The positioning statement is the one place on the site that uses the
 * display serif licensed by 006-design-system.md, Section 4's third
 * typeface exception — never the role/name lines above it, which stay in
 * the one interface typeface everything else uses.
 *
 * Capability icons come from Lucide (006-design-system.md, Section 9, as
 * amended) — the caller supplies the icon component per bullet, since
 * matching a capability's meaning to a specific glyph is a content
 * decision, not something Hero should hardcode.
 */
export function Hero({
  name,
  role,
  positioningStatement,
  supportingSentence,
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
          <p className="mt-6 font-display text-4xl leading-[1.1] font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {positioningStatement}
          </p>
          {supportingSentence ? (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              {supportingSentence}
            </p>
          ) : null}
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
              {capabilities.map((capability) => {
                const Icon = capability.icon;
                return (
                  <li
                    key={capability.label}
                    className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {capability.label}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {capability.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
