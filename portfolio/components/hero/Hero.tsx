import { CallToAction } from "@/components/call-to-action/CallToAction";
import { TechnicalMotif } from "@/components/decorative/TechnicalMotif";
import { SkillsDiagram } from "@/components/hero/SkillsDiagram";

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
};

/**
 * 008-component-library.md, Section 2 — the one component exempted from
 * the two-page guardrail, because Homepage's entire one-job is
 * inseparable from it. No container for the left column's primary
 * content (006-design-system.md, Section 2, as amended): typography and
 * whitespace only. The Skills visualization on the right is its own
 * exception, governed entirely by `SkillsDiagram`'s own spec — Hero just
 * composes it in, the same way it composes `CallToAction`. Its
 * content lives inside `SkillsDiagram`/`skills-data.ts`, not as a Hero
 * prop — the same "fixed, not configurable" reasoning as the CTA copy
 * below, and also a hard requirement here: Lucide icon components can't
 * cross the Server→Client boundary as prop values, so this content has
 * to originate inside the client-boundary module that renders it, not
 * be threaded down from this Server Component.
 *
 * No motion on the left column: name/role/headline/CTA are required to
 * be understood in the first five seconds, not revealed progressively.
 * All animation in this component lives in `SkillsDiagram` — a distinct,
 * deliberate exception granted to that one element specifically
 * (000-philosophy.md, Section 1; 028-interaction-language.md, Sections
 * 13 and 21), not a general loosening of Hero's own restraint.
 *
 * The primary/secondary CTA copy and destinations are fixed by
 * 014-homepage.md, Section 4 — not configurable props, since there is
 * exactly one Hero for exactly one Homepage (008, Section 2's "Variants:
 * None"). Reuses the existing CallToAction component rather than
 * reimplementing button markup.
 *
 * `id="hero"` lives on the name line (`{name}`), the very first line of
 * real content in Hero — not the outer `<section>`, and not the role
 * line below it — since that's what keeps Section Index's marker
 * aligned with the actual first line a visitor reads, matching every
 * other section's own heading-anchored alignment. Hero is always first
 * in the page's fixed section order (014-homepage.md, Section 3).
 *
 * The positioning statement is the one place on the site that uses the
 * display serif licensed by 006-design-system.md, Section 4's third
 * typeface exception — never the role/name lines above it, which stay in
 * the one interface typeface everything else uses.
 */
export function Hero({
  name,
  role,
  positioningStatement,
  supportingSentence,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <TechnicalMotif className="hidden lg:block" />
      <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-16">
        <div>
          <p id="hero" className="text-sm text-muted">
            {name}
            <span aria-hidden="true" className="ml-3">
              —
            </span>
          </p>
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

        <SkillsDiagram className="hidden lg:block" />
      </div>
    </section>
  );
}
