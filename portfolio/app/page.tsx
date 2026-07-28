import { Hero } from "@/components/hero/Hero";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { Highlight } from "@/components/highlight/Highlight";
import { ExperienceSummaryCondensed } from "@/components/experience-summary/ExperienceSummaryCondensed";
import { CallToAction } from "@/components/call-to-action/CallToAction";
import { SectionIndex } from "@/components/section-index/SectionIndex";

/**
 * Track B, first composition — 014-homepage.md, Section 3's exact section
 * order. This is assembly of already-verified components, not new
 * component design.
 *
 * Case Studies and Journal are deliberately not rendered here for now —
 * deferred until those pages themselves exist, rather than shipping
 * teaser sections that link to nothing real yet. `CaseStudyPreview` and
 * `JournalPreview` remain fully built and verified in the component
 * library; only this page's composition omits them. Re-add both
 * sections (and their two ids, in 014's original order) once those
 * pages are ready — this is a sequencing decision, not a removal of
 * scope from `014-homepage.md`, which still specifies both sections.
 *
 * SECTION_IDS is Section Index's entire content-ownership surface
 * (008-component-library.md, Section 12) — it must list the same
 * sections, in the same order, as the actual `id` attributes below. Each
 * id lives on the section's own heading (or Hero's role line), not the
 * outer `<section>` wrapper, so Section Index's markers align with each
 * section's visible content, not its top padding.
 *
 * Placeholder content: no real content exists yet (Phase 3). The example
 * data below is the same representative content used throughout this
 * project's component verification (recruiter-platform case study),
 * kept for traceability — this page validates composition, it is not
 * published as real claims.
 */
const SECTION_IDS = ["hero", "highlights", "experience", "contact"];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-4 sm:px-6 lg:px-8">
      <SectionIndex sectionIds={SECTION_IDS} />

      <div className="min-w-0 flex-1">
        <Hero
          name="Avinash"
          role="Lead Frontend Engineer"
          positioningStatement="Building products where performance, accessibility, and measurable outcomes matter."
          supportingSentence="I craft fast, accessible, evidence-backed web experiences — never a claim this site can't back up."
        />

        <section className="pb-20 lg:pb-28">
          {/* No viewAllHref here, deliberately: 003-information-architecture.md
              has no dedicated Highlights index page for this to point to —
              008's amended Section 3 licenses the link only where a real
              destination already exists. */}
          <SectionHeading id="highlights" title="Highlights" divider />
          <ul className="mt-8 grid gap-8 sm:grid-cols-3 sm:divide-x sm:divide-border">
            <li className="flex gap-3 sm:pl-0 sm:[&:not(:first-child)]:pl-8">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted"
              />
              <Highlight
                claim="Led frontend architecture for a recruiter platform migration"
                href="/case-studies/recruiter-platform"
                linkLabel="Read the case study on the recruiter platform migration"
              />
            </li>
            <li className="flex gap-3 sm:pl-0 sm:[&:not(:first-child)]:pl-8">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted"
              />
              <Highlight
                claim="Reduced P95 API latency by 52% through a service topology migration"
                href="/case-studies/recruiter-platform"
                linkLabel="Read the case study on the latency reduction"
              />
            </li>
            <li className="flex gap-3 sm:pl-0 sm:[&:not(:first-child)]:pl-8">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted"
              />
              <Highlight claim="Mentored three engineers into senior roles" />
            </li>
          </ul>
        </section>

        <section className="pb-20 lg:pb-28">
          <SectionHeading
            id="experience"
            title="Experience"
            viewAllHref="/experience"
            viewAllLabel="View full experience"
            divider
          />
          <div className="mt-8">
            <ExperienceSummaryCondensed
              title="Lead Frontend Engineer"
              company="Example Co"
              dates="2021—Present"
            />
          </div>
        </section>

        <section className="pb-20 lg:pb-28">
          <SectionHeading id="contact" title="Contact" divider />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            If something here resonates with your work, I&apos;d be glad to hear
            from you.
          </p>
          <div className="mt-6">
            <CallToAction
              label="Get in Touch"
              href="/contact"
              weight="secondary"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
