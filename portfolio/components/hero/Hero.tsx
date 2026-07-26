import { CallToAction } from "@/components/call-to-action/CallToAction";

type HeroProps = {
  name: string;
  /** Current role/level — not a job title alone, per
   * 014-homepage.md, Section 5. */
  role: string;
  /** The single sentence answering "who is this engineer?" directly —
   * never a slogan, never a technology list (014-homepage.md, Section 5). */
  positioningStatement: string;
};

/**
 * 008-component-library.md, Section 2 — the one component exempted from
 * the two-page guardrail, because Homepage's entire one-job is
 * inseparable from it. No container (006-design-system.md, Section 2, as
 * amended): typography and whitespace only, no box, border, or
 * background. No motion: nothing here is long-form, scroll-triggered
 * content, and every item is required to be understood in the first five
 * seconds, not revealed progressively.
 *
 * The primary/secondary CTA copy and destinations are fixed by
 * 014-homepage.md, Section 4 — not configurable props, since there is
 * exactly one Hero for exactly one Homepage (008, Section 2's "Variants:
 * None"). Reuses the existing CallToAction component rather than
 * reimplementing button markup.
 */
export function Hero({ name, role, positioningStatement }: HeroProps) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24">
      <p className="text-sm text-muted">{name}</p>
      <h1 className="mt-1 text-lg font-medium text-foreground">{role}</h1>
      <p className="mt-6 text-3xl leading-tight font-semibold tracking-tight text-foreground md:text-4xl">
        {positioningStatement}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <CallToAction
          label="View Case Studies"
          href="/case-studies"
          weight="primary"
        />
        <CallToAction label="View Resume" href="/resume" weight="secondary" />
      </div>
    </section>
  );
}
