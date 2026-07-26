# Component Library

**Version:** 1.1
**Status:** Active

---

## Relationship to Prior Documents

This document does not invent a component inventory. It extracts reusable **responsibilities** by cross-referencing the six page specifications already written (`014-homepage.md`, `015-case-studies.md`, `016-agentprep.md`, `017-journal.md`, `018-resume.md`, `019-contact.md`) for patterns that repeat, governed by the actionable rules in `005-design-principles.md` and the point of view in `006-design-system.md`.

The pages dictate the system. If a responsibility below stops matching what a page spec actually requires, the page spec is correct and this document must be updated — not the reverse.

---

## Guardrail Principle

**A component may exist in this library only if at least two pages need the same responsibility.**

This is the single strongest defence against design-system sprawl available to a one-person-maintained portfolio (`004-product-goals.md`'s single-author constraint). A pattern used by exactly one page is a page-level concern, documented in that page's own spec — not a shared component.

**Narrow exception:** a single-page pattern may still be documented here if it is the *unique structural anchor that fulls a page's entire one-job* (`000-philosophy.md`), rather than a mid-page widget. Two components in this document currently qualify under this exception — Hero (Section 2) and Contact Methods (Section 9) — because Homepage's and Contact's entire respective jobs are structurally inseparable from these patterns. This exception is not a loophole: it defaults to "no," and every use of it must be justified in the component's own entry.

**Worked counter-example:** AgentPrep's Product Timeline is a real, well-defined pattern, but it is a mid-page structural device, not the page's defining anchor — AgentPrep's one job is proving sustained product judgment, and Timeline is one section among ten that serves it. It does not qualify for the exception, and no second page currently needs the same chronological, dated-entry responsibility. It remains a **page-scoped pattern**, specified fully in `016-agentprep.md` and not part of this library. If a future page genuinely needs the same responsibility, it is promoted here at that point — not before.

---

## Overview

| Component | Pages | Status |
|---|---|---|
| Navigation | All pages | Shared |
| Hero | Homepage | Shared (exception) |
| Section Heading | All pages | Shared |
| Highlight | Homepage, Resume, Case Studies | Shared |
| Case Study Preview | Homepage, Case Studies (index) | Shared |
| Journal Preview | Homepage, Journal (index) | Shared |
| Experience Summary | Homepage, Resume, Experience | Shared |
| Metric / Evidence Block | Case Studies, AgentPrep | Shared |
| Decision / Trade-off Block | Case Studies, AgentPrep, Journal | Shared |
| Call to Action | Homepage, Resume, Contact | Shared |
| Contact Methods | Contact | Shared (exception) |
| Section Index | Homepage, Case Studies, AgentPrep | Shared |
| Product Timeline | AgentPrep only | Page-scoped, not promoted |

---

## 1. Navigation

**Purpose.** Give a visitor persistent, predictable access to the six primary destinations defined in `003-information-architecture.md`, and communicate where they currently are.

**Where it's used.** Every page, without exception — it is the one pattern every persona journey in `003-information-architecture.md` depends on regardless of entry point.

**Content ownership.** Only the six primary navigation items and the current-page indicator. It never contains secondary or link-discovered pages (individual case studies, journal articles, AgentPrep) — per `003-information-architecture.md`, Section 4, those stay link-discovered on purpose.

**Variants.** None. A single, fixed presentation everywhere — variation here would directly contradict `005-design-principles.md`'s "consistency over creativity."

**Accessibility expectations.** Keyboard-reachable in a logical order; the current page is programmatically indicated, not communicated by colour alone (`005-design-principles.md`, Section 2); fully usable without a pointing device.

**Reasons not to create a new variant.** A "simplified" or "expanded" navigation for a specific page is never justified — the six-item structure is fixed by `003-information-architecture.md` and must never flex per page.

---

## 2. Hero *(exception)*

**Purpose.** Answer "who is this engineer?" within the first few seconds of a first visit — the specific responsibility named in `014-homepage.md`, Section 1.

**Where it's used.** Homepage only. Granted the narrow exception (see Guardrail Principle) because Homepage's entire one-job is inseparable from this pattern — every other homepage section exists to build on what Hero establishes.

**Content ownership.** Name, current role/level, a single positioning sentence, the primary/secondary CTA (`014-homepage.md`, Sections 4–5), and optionally a small, fixed capability-summary panel — 3–4 short value-proposition bullets restating the positioning statement's substance in scannable form. Every capability statement must be independently verifiable elsewhere in the portfolio (a performance budget, an accessibility conformance target, case study evidence) — never a claim with no corresponding evidence, per `000-philosophy.md`'s "Evidence Over Claims." It never contains a biography, a list of technologies, or narrative prose — that content is explicitly excluded from the homepage entirely.

**Variants.** None. There is exactly one Hero, because there is exactly one Homepage.

**Accessibility expectations.** The positioning statement must be conveyed as real text, not as an image or embedded graphic, so it is available to assistive technology and remains legible if custom fonts fail to load.

**Reasons not to create a new variant.** There is no second page whose one-job matches Homepage's — a "mini-Hero" elsewhere (e.g. atop Resume) is actually Section Heading (Section 3) or Experience Summary (Section 7) wearing a different name, not a Hero variant.

---

## 3. Section Heading

**Purpose.** Introduce a section and make its single question legible at a glance — the direct expression of `005-design-principles.md`'s "every section answers one question" rule and `015-case-studies.md`/`016-agentprep.md`'s fixed section structures.

**Where it's used.** Every page: Homepage's six sections, each of Case Studies' ten fixed sections, each of AgentPrep's ten fixed sections, Journal's three-part entry skeleton, Resume's required sections, and Contact's sections.

**Content ownership.** A short label (fixed, for Case Studies/AgentPrep's mandated section titles; freely written, for Homepage/Resume/Contact) plus, optionally, one short supporting line. It never contains the section's actual body content — that would blur heading and content into one element and break the scannability this component exists to provide.

**Variants.** Fixed-title (used where `015-case-studies.md` or `016-agentprep.md` mandates an exact section name) versus authored-title (used where a page's copy determines the heading, e.g. Homepage). This is a content-source distinction, not a visual one.

**Accessibility expectations.** Expressed as a real heading in the document's logical reading order, not a styled paragraph — screen-reader users rely on heading structure to navigate a long page (particularly Case Studies and AgentPrep) without reading linearly.

**Reasons not to create a new variant.** A page wanting a "more decorative" heading treatment is a Design System (`006-design-system.md`) concern, not a reason for a new component-level variant — the responsibility (introduce one section, one question) never changes.

---

## 4. Highlight

**Purpose.** Present one short, scannable, standalone proof point — the pattern behind Homepage's Highlights section, Resume's Selected Achievements, and callout-style proof points inside a Case Study.

**Where it's used.** Homepage, Resume, Case Studies.

**Content ownership.** One claim, stated in a single line, optionally paired with a link to deeper evidence (a Case Study). It never contains multi-sentence narrative — a Highlight that needs a paragraph to make its point should be a Decision/Trade-off Block (Section 9) or left to the surrounding prose instead.

**Variants.** Linked (points to a Case Study, per `018-resume.md`, Section 5's no-duplication rule) versus unlinked (a plain, standalone claim, used only when no qualifying case study exists — never linked to a thin one, per `018-resume.md`, Section 5).

**Accessibility expectations.** When linked, the link's accessible name describes its destination specifically (e.g. "Read the case study on recruiter platform architecture"), never a bare "read more."

**Reasons not to create a new variant.** A "metric Highlight" is not a new variant — it is a Metric / Evidence Block (Section 8), which carries a stricter evidentiary standard than a Highlight is required to meet. Keeping these separate prevents a lightweight proof point from silently taking on (or diluting) the mandatory evidence rules in `015-case-studies.md`.

---

## 5. Case Study Preview

**Purpose.** Let a visitor decide whether to open a specific case study without reading its full content — the responsibility behind Homepage's Featured Case Studies section and the Case Studies index page (`003-information-architecture.md`).

**Where it's used.** Homepage, Case Studies (index).

**Content ownership.** Title, a one-line problem/outcome summary, and a link to the full case study. It never contains Key Technical Decisions, Trade-offs, or any content from the fixed structure in `015-case-studies.md` — the full narrative belongs only on the case study's own page.

**Variants.** None currently identified. If Homepage and the index eventually need different amounts of detail, that is a candidate for a variant — but not before it is a real, observed need.

**Accessibility expectations.** The entire preview is a single accessible link target (no nested interactive elements competing for the same click), with an accessible name matching the case study's real title.

**Reasons not to create a new variant.** A "featured" visual treatment on Homepage versus a "list" treatment on the index page is a Design System layout concern (`006-design-system.md`), not a reason to fork the component's content ownership.

---

## 6. Journal Preview

**Purpose.** Let a visitor decide whether to open a specific journal entry — the same responsibility as Case Study Preview, applied to `017-journal.md`'s content type.

**Where it's used.** Homepage (From the Journal), Journal (index).

**Content ownership.** Title (stating the lesson or question, per `017-journal.md`, Section 6), category (from the five in `017-journal.md`, Section 4), and a link to the full entry. It never contains the entry's Lesson section itself — that is the reason to click through, not something to preview away.

**Variants.** None currently identified, for the same reason as Case Study Preview.

**Accessibility expectations.** Same as Case Study Preview — a single accessible link target with a real, descriptive name.

**Reasons not to create a new variant.** Category-specific visual treatments (e.g. a different look for Postmortems versus Engineering Decisions) are not justified — `017-journal.md`'s categories exist for organisation, not for visual differentiation.

---

## 7. Experience Summary

**Purpose.** Present role, company, dates, and highlights — the responsibility behind Resume's Experience section, Homepage's Track Record section (`014-homepage.md`, Section 3, which describes Track Record explicitly as "a condensed teaser of Experience — not a duplicate of it"), and the standalone Experience page's role-by-role presentation (`026-experience.md`).

**Where it's used.** Homepage (condensed), Resume (full-tabular), Experience (narrative).

**Content ownership.** Title, company, dates, and (in the full-tabular and narrative variants) highlight bullets reusing the Highlight component (Section 4). It never contains a Case Study's full narrative — that belongs only on the Case Study's own page, per `018-resume.md`, Section 5, and `026-experience.md`, Section 5. The narrative variant may include short connective text describing how scope evolved between roles (`026-experience.md`, Section 4); the condensed and full-tabular variants never do.

**Variants.** Condensed (Homepage's Track Record — enough to convey seniority, not a full history), full-tabular (Resume's complete, terse Experience section), and narrative (the standalone Experience page — the same underlying role data, with added connective context explaining evolution of responsibility across roles, per `026-experience.md`). All three variants share the same underlying data and the same content-ownership boundary against reproducing Case Study narrative; they differ only in how much connective context is shown.

**Accessibility expectations.** Role, company, and dates must be structured so assistive technology can identify them as a coherent unit (e.g. grouped under one heading per role), not read as an ambiguous flat list.

**Reasons not to create a new variant.** A dedicated "print" variant for the PDF is not a component concern — per `018-resume.md`, Section 2, the PDF is a separate product with its own presentation, not a rendering mode of this web component.

---

## 8. Metric / Evidence Block

**Purpose.** Present one verifiable, defensible piece of evidence — a metric, a before/after comparison, or a diagram — meeting the mandatory Required Evidence standards in `015-case-studies.md`, Section 4, and `016-agentprep.md`, Section 5.

**Where it's used.** Case Studies (Outcome, and any section requiring a diagram), AgentPrep (Market Validation, Architecture Evolution, Current State).

**Content ownership.** The evidence itself plus the minimal context needed to make it honestly interpretable (what it measures, over what period, relative or absolute). It never contains the surrounding narrative reasoning — that belongs in prose, or in a Decision/Trade-off Block (Section 9) alongside it.

**Variants.** Numeric metric, comparative (before/after), and diagram/artifact — distinguished by evidence type, not by which page hosts them; the same three variants are available on both Case Studies and AgentPrep.

**Accessibility expectations.** Any chart or diagram variant has a text equivalent conveying the same information, per `006-design-system.md`'s data-visualisation philosophy — a visitor must never be able to access less information than a sighted user scanning the chart.

**Reasons not to create a new variant.** A page-specific "AgentPrep metric" style is not justified — the evidentiary rigor (defensible, honest, never fabricated) is identical in both `015-case-studies.md` and `016-agentprep.md`, and the component must not develop divergent standards per page.

---

## 9. Decision / Trade-off Block

**Purpose.** Present a specific decision, the alternative(s) considered, and the reasoning — the structural unit behind `015-case-studies.md`'s Key Technical Decisions and Trade-offs, `016-agentprep.md`'s Major Decisions and Experiments, and `017-journal.md`'s Engineering Decisions entries.

**Where it's used.** Case Studies, AgentPrep, Journal.

**Content ownership.** The decision or trade-off stated plainly, the alternative that was rejected (or the cost accepted), and the reasoning. It is never used to present a decision with no real alternative considered — per `015-case-studies.md`'s Qualification Criteria, a "decision" with nothing rejected is not a qualifying decision at all.

**Variants.** Decision-with-alternative (what was chosen and what was rejected, and why) versus trade-off (what was gained versus what was given up). Both variants share the same content-ownership rule: a stated cost or a stated alternative is mandatory, never optional framing.

**Accessibility expectations.** Structured so the decision, the alternative, and the reasoning are each identifiable as distinct parts (e.g. via heading or list structure), not run together as an undifferentiated paragraph a screen-reader user would have to parse unaided.

**Reasons not to create a new variant.** A "positive-only" variant that omits the rejected alternative or the cost is never justified — doing so would violate the evidentiary standard in `015-case-studies.md` this component exists to uphold, not merely offer a stylistic option.

---

## 10. Call to Action

**Purpose.** Direct a visitor toward exactly one next action — the pattern behind Homepage's primary/secondary CTAs, Resume's Download PDF action, and Contact's action-oriented framing.

**Where it's used.** Homepage, Resume, Contact.

**Content ownership.** An action label and its destination only. It never contains explanatory prose beyond the label itself — the reasoning for the action belongs in the surrounding section, per `005-design-principles.md`'s whitespace and hierarchy rules.

**Variants.** Primary and secondary, distinguished only by visual weight (`005-design-principles.md`, Section 2). Per `014-homepage.md`, Section 6, no page may present two primary-weighted CTAs at once — this rule belongs to the component, not just to the Homepage spec, and applies everywhere this component is used.

**Accessibility expectations.** The accessible name states the actual action ("Download resume as PDF," not "Click here"); primary and secondary weighting must remain distinguishable without relying on colour alone.

**Reasons not to create a new variant.** A third "tertiary" weight is not justified anywhere in current page specs — introducing one would only be justified if a page genuinely needed three simultaneously competing actions, which would itself violate the one-primary-action rule this component enforces.

---

## 11. Contact Methods *(exception)*

**Purpose.** Present the three sanctioned contact channels — the pattern named explicitly in `019-contact.md`, Section 4.

**Where it's used.** Contact only. Granted the narrow exception (see Guardrail Principle) because Contact's entire one-job — "what's the next step?" — is structurally inseparable from this pattern, in the same way Hero is inseparable from Homepage's.

**Content ownership.** Exactly the three methods defined in `019-contact.md`, Section 4 (Email, LinkedIn, GitHub) and nothing else. Adding a fourth method here is a `019-contact.md` decision to be made first — this component must never grow a channel on its own.

**Variants.** None. Three methods, always presented together, always in the same order.

**Accessibility expectations.** Each method is a distinct, clearly labeled link (not icons alone, per `006-design-system.md`'s iconography policy — icons support a label, they do not replace one).

**Reasons not to create a new variant.** A "compact" variant for use elsewhere on the site is not justified — per the Guardrail Principle, this pattern exists here specifically because no other page currently needs it; if one did, that would be the signal to reconsider the exception itself, not to add a variant.

---

## 12. Section Index

**Purpose.** Give a visitor a persistent sense of structural position within a long, fixed-sequence page — how many top-level sections exist, which one is current, and how many remain — expressed spatially rather than restated in prose. This is a distinct responsibility from Section Heading (Section 3): Section Index owns position, sequence, and progress through the page's structure; Section Heading owns a section's identity, title, and description. Neither overlaps the other.

**Where it's used.** Any page whose top-level sections are fixed and enumerable in its own specification: Homepage's six sections (`014-homepage.md`, Section 3), Case Studies' ten fixed sections (`015-case-studies.md`), and AgentPrep's ten fixed sections (`016-agentprep.md`) — this satisfies the Guardrail Principle's two-page threshold on its own, with no exception needed. Not used on pages without a fixed top-level sequence (a Journal entry's internal structure, Contact's single section) — an index of one, or of a variable-length structure, communicates nothing.

**Content ownership.** A sequence number, a position marker (current / passed / upcoming), and the connecting line between markers — nothing else. It never contains a section's title or description; duplicating that content here would blur this component's responsibility into Section Heading's.

The index communicates progress through the page's **structure**, not reading progress through the **document**. It advances only when a visitor crosses into a new top-level section — never in proportion to scroll distance, time on page, or content length. Collapsing a section, changing font size, or zooming the browser must never change what the index reports; it always represents "Hero → Highlights → Experience → Case Studies," never "42% read." This distinction is deliberate: the moment this component starts estimating reading progress, it has taken on a second, different responsibility and stopped being a structural index.

**Variants.** None. A single, fixed presentation wherever it's used, for the same consistency reasoning as Navigation (Section 1).

**Accessibility expectations.** Entirely `aria-hidden`. A screen reader already receives the page's real structure through Section Heading's actual heading elements in document order; overlaying a second, numeric representation of the same structure adds no information and would only add noise to non-visual navigation.

**Reasons not to create a new variant.** A "compact" or numberless variant for shorter pages isn't justified — if a page's section count doesn't warrant this treatment, the page simply doesn't use the component at all (as Contact and individual Journal entries already don't), rather than using a stripped-down version of it.

---

## What This Document Is Not

This document does not define visual styling, spacing, colour, or markup implementation for any component — those are governed by `006-design-system.md` and later implementation-stage decisions. It defines what each component is responsible for, where it is required, and where the line is that must not be crossed — implementation must satisfy these responsibilities, not the reverse.
