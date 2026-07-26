import { Hero } from "@/components/hero/Hero";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { Highlight } from "@/components/highlight/Highlight";
import { ExperienceSummaryCondensed } from "@/components/experience-summary/ExperienceSummaryCondensed";
import { CaseStudyPreview } from "@/components/case-study-preview/CaseStudyPreview";
import { JournalPreview } from "@/components/journal-preview/JournalPreview";
import { CallToAction } from "@/components/call-to-action/CallToAction";

/**
 * Track B, first composition — 014-homepage.md, Section 3's exact section
 * order. This is assembly of already-verified components, not new
 * component design.
 *
 * Placeholder content: no real content exists yet (Phase 3). The example
 * data below is the same representative content used throughout this
 * project's component verification (recruiter-platform case study,
 * cache-rollback postmortem), kept for traceability — this page validates
 * composition, it is not published as real claims.
 */
export default function Home() {
  return (
    <>
      <Hero
        name="Avinash"
        role="Lead Frontend Engineer"
        positioningStatement="Building products where performance, accessibility, and measurable outcomes matter."
      />

      <section className="mx-auto max-w-2xl px-4 py-16">
        <SectionHeading title="Highlights" />
        <ul className="mt-6 space-y-4">
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

      <section className="mx-auto max-w-2xl px-4 py-16">
        <SectionHeading title="Experience" />
        <div className="mt-6">
          <ExperienceSummaryCondensed
            title="Lead Frontend Engineer"
            company="Example Co"
            dates="2021—Present"
          />
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-16">
        <SectionHeading title="Case Studies" />
        <ul className="mt-6 space-y-8">
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

      <section className="mx-auto max-w-2xl px-4 py-16">
        <SectionHeading title="Journal" />
        <ul className="mt-6 space-y-8">
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

      <section className="mx-auto max-w-2xl px-4 py-16">
        <SectionHeading title="Contact" />
        <p className="mt-4 text-sm leading-relaxed text-muted">
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
    </>
  );
}
