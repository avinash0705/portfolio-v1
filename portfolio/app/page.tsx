import { Hero } from "@/components/hero/Hero";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { Highlight } from "@/components/highlight/Highlight";
import { ExperienceSummaryCondensed } from "@/components/experience-summary/ExperienceSummaryCondensed";
import { CaseStudyPreview } from "@/components/case-study-preview/CaseStudyPreview";
import { JournalPreview } from "@/components/journal-preview/JournalPreview";
import { CallToAction } from "@/components/call-to-action/CallToAction";
import { SectionIndex } from "@/components/section-index/SectionIndex";

/**
 * Track B, first composition — 014-homepage.md, Section 3's exact section
 * order. This is assembly of already-verified components, not new
 * component design.
 *
 * SECTION_IDS is Section Index's entire content-ownership surface
 * (008-component-library.md, Section 12) — it must list the same six
 * sections, in the same order, as the actual `id` attributes below.
 *
 * Placeholder content: no real content exists yet (Phase 3). The example
 * data below is the same representative content used throughout this
 * project's component verification (recruiter-platform case study,
 * cache-rollback postmortem), kept for traceability — this page validates
 * composition, it is not published as real claims.
 */
const SECTION_IDS = [
  "hero",
  "highlights",
  "experience",
  "case-studies",
  "journal",
  "contact",
];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-4 sm:px-6 lg:px-8">
      <SectionIndex sectionIds={SECTION_IDS} />

      <div className="min-w-0 flex-1">
        <Hero
          name="Avinash"
          role="Lead Frontend Engineer"
          positioningStatement="Building products where performance, accessibility, and measurable outcomes matter."
          capabilities={[
            {
              label: "Performance",
              description:
                "Core Web Vitals held within budget — 011-performance.md.",
            },
            {
              label: "Accessibility",
              description:
                "WCAG 2.2 AA conformance target — 010-accessibility.md.",
            },
            {
              label: "Impact",
              description:
                "Every claim backed by a case study or a defensible metric.",
            },
          ]}
        />

        <section
          id="highlights"
          className="border-t border-border py-20 lg:py-28"
        >
          <SectionHeading title="Highlights" />
          <ul className="mt-8 grid gap-8 sm:grid-cols-3">
            <li>
              <Highlight
                claim="Led frontend architecture for a recruiter platform migration"
                href="/case-studies/recruiter-platform"
                linkLabel="Read the case study on the recruiter platform migration"
              />
            </li>
            <li>
              <Highlight
                claim="Reduced P95 API latency by 52% through a service topology migration"
                href="/case-studies/recruiter-platform"
                linkLabel="Read the case study on the latency reduction"
              />
            </li>
            <li>
              <Highlight claim="Mentored three engineers into senior roles" />
            </li>
          </ul>
        </section>

        <section
          id="experience"
          className="border-t border-border py-20 lg:py-28"
        >
          <SectionHeading title="Experience" />
          <div className="mt-8">
            <ExperienceSummaryCondensed
              title="Lead Frontend Engineer"
              company="Example Co"
              dates="2021—Present"
            />
          </div>
        </section>

        <section
          id="case-studies"
          className="border-t border-border py-20 lg:py-28"
        >
          <SectionHeading title="Case Studies" />
          <ul className="mt-8 grid gap-8 sm:grid-cols-2">
            <li>
              <CaseStudyPreview
                title="Recruiter Platform Architecture"
                summary="Reduced P95 latency by 52% through a service topology migration."
                href="/case-studies/recruiter-platform"
              />
            </li>
            <li>
              <CaseStudyPreview
                title="SEO Migration"
                summary="Restructured URL architecture without losing organic search visibility."
                href="/case-studies/seo-migration"
              />
            </li>
          </ul>
          <div className="mt-8">
            <CallToAction
              label="View Case Studies"
              href="/case-studies"
              weight="primary"
            />
          </div>
        </section>

        <section id="journal" className="border-t border-border py-20 lg:py-28">
          <SectionHeading title="Journal" />
          <ul className="mt-8 grid gap-8 sm:grid-cols-2">
            <li>
              <JournalPreview
                title="Why we rolled back the cache layer"
                category="Postmortems"
                href="/journal/cache-rollback"
              />
            </li>
            <li>
              <JournalPreview
                title="Choosing Server Components over a client-rendered app shell"
                category="Engineering Decisions"
                href="/journal/server-components-decision"
              />
            </li>
          </ul>
        </section>

        <section id="contact" className="border-t border-border py-20 lg:py-28">
          <SectionHeading title="Contact" />
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
