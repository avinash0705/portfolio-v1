# Content Strategy

**Version:** 1.0
**Status:** Active

---

## 1. Purpose

`015-case-studies.md`, `016-agentprep.md`, and `017-journal.md` each already define their own structure, qualification criteria, and writing style. This document does not repeat any of that. It is the editorial governance layer that sits above all three content types — the rules that apply regardless of which one a piece of content is, covering how content is revised, cross-linked, attributed, and retired over its lifetime. If `012-seo.md` governs how search engines discover truthful content, this document governs how that truthful content evolves once it exists.

---

## 2. Content Philosophy

> **Every published page should become more accurate over time, never merely longer.**

Revision exists to increase truthfulness, clarity, and precision — never to inflate word count, retroactively exaggerate significance, or chase a length signal for search visibility (`012-seo.md`, Section 2's rejection of padding applies here as the same standard, stated from the content side rather than the discoverability side). A short, accurate page is always preferred to a long, padded one, consistent with `017-journal.md`'s "short is preferred over padded."

This principle governs every decision in this document. When in doubt about whether a change to published content is justified, the test is: does this make the page more accurate, or only bigger?

---

## 3. Publishing Criteria

Each content type already has its own qualification bar — `015-case-studies.md`, Section 2's four-part test; `017-journal.md`, Section 3's six qualifying reasons; `016-agentprep.md`'s milestone standard in Section 7. This document does not restate them. It states the one rule common to all three: **nothing is published to fill a schedule, to appear active, or because it has been a while since the last update.** If a specific piece of content cannot honestly satisfy its own content type's qualification bar today, it is not published today — regardless of how long it has been since anything new appeared on the site.

---

## 4. Voice and Tone

Voice is consistent across every content type and every page — a Journal entry, a Case Study, and the Contact page should read as the same person, not different registers adopted per format. This means:

- First-person, direct, and specific, per `000-philosophy.md`'s Communication Style and already established for Case Studies and Journal entries (`015-case-studies.md`, Section 6; `017-journal.md`, Section 6).
- Structural formality may vary — a Case Study's fixed ten-section template (`015-case-studies.md`) reads more formally than a short Journal entry — but formality of structure is never an excuse to shift into marketing language, generic inspiration, or academic detachment in either direction.
- The same restraint that governs visual design (`006-design-system.md`'s brand personality — precise, restrained, quietly confident) governs written voice: calm and substantive, never performative.

---

## 5. Evidence Standards

The evidentiary bar does not loosen for a less formal content type. `015-case-studies.md`, Sections 4–5 and `016-agentprep.md`, Section 5 already define what counts as required and forbidden evidence, and the confidentiality and anonymization rules that apply to it. Those standards apply identically to Journal entries: a "lesson learned" post is held to the same honesty standard as a Case Study's Outcome section — a vague generalization dressed as a lesson does not pass `017-journal.md`, Section 3's bar any more than an unverifiable claim would pass in a Case Study.

---

## 6. Revision Policy

- Published content may be revised at any time for accuracy, clarity, or to reflect new information — revision is encouraged, not treated as an admission of an original mistake.
- **Living content stays append-only where already specified.** `016-agentprep.md`, Section 9's rule that historical sections (Product Timeline, Experiments) are never rewritten, only appended to, is unchanged by this document.
- **Static content (a published Case Study or Journal entry) may be edited for clarity or corrected for accuracy**, but never to retroactively inflate an outcome, claim credit not originally claimed, or pad length — per Section 2's governing test.
- A revision that corrects a factual claim (a metric, an outcome, a date) is always preferred over leaving a known inaccuracy in place — consistent with the truthfulness constraint already established in `004-product-goals.md`.
- Any revision to a fact that also appears elsewhere (a role, a date, a company) must propagate to every place that fact appears, per the synchronisation rules already established in `018-resume.md`, Section 6 and `026-experience.md`, Section 6 — a revision that creates a new inconsistency across pages is not complete.
- Shortening a page is as legitimate a revision as expanding one, provided accuracy improves — length moves in whichever direction accuracy requires, never as a goal in itself.

---

## 7. Cross-Linking Policy

Cross-linking already exists throughout this documentation — the claim-then-link pattern in `018-resume.md`, Section 5 and `026-experience.md`, Section 5, and the preview components in `008-component-library.md`, Sections 5–6. This document states the rule that governs all of them: a link is added only because it points a reader to genuinely deeper or related real content, never to manufacture a sense of site depth or internal link density (`012-seo.md`, Section 6 already excludes links added for search benefit alone; this is the same rule from the content side). A link's destination must itself independently satisfy its own content type's qualification bar — a Case Study is never linked to simply because a link would look substantive; it is linked to because it is real, qualifying evidence.

---

## 8. Source Attribution

Where content references an external source — a library, another engineer's published writing, a dataset, a public specification — that source is cited or linked plainly, rather than presented as though the idea originated with the author. This is a basic extension of `000-philosophy.md`'s honesty standard: presenting someone else's insight as one's own is a claim that cannot be defended if questioned.

External sources are referenced because they are genuinely relevant, never to imply authority by association with a well-known name or project. Where content discusses a former employer's system or decision, the same confidentiality and attribution rules already established in `015-case-studies.md`, Section 5 apply — a decision is never attributed to a named colleague without their consent, in a Journal entry or AgentPrep update just as much as in a Case Study.

---

## 9. Content Lifecycle

Every piece of content moves through the same stages, regardless of type:

1. **Draft** — not yet published; not indexed (`012-seo.md`, Section 8); not linked from any published page. A draft that never becomes genuinely worth publishing per Section 3 is simply never published — it does not sit visibly as a "coming soon" placeholder, consistent with `027-application-behaviour.md`'s honest empty-state rule.
2. **Published** — live, indexed, and subject to the revision policy in Section 6.
3. **Updated** — either a living update (AgentPrep, per `016-agentprep.md`) or a correction applied to otherwise-static content (Section 6).
4. **Retired** — removed because it no longer meets its content type's standard or has been superseded. A retired page's URL redirects rather than breaks (`027-application-behaviour.md`), and it is deindexed rather than left crawlable in a stale state (`012-seo.md`, Section 8).

---

## Review Checklist

- [ ] Any newly published content satisfies its own content type's qualification bar (`015`, `016`, or `017`), not merely "it's been a while."
- [ ] Voice is consistent with the rest of the site — no marketing language, no shift in register, regardless of content type.
- [ ] Evidence in a Journal entry meets the same bar as evidence in a Case Study — no vague claim dressed as a lesson.
- [ ] Any revision to published content makes it more accurate, not merely longer (Section 2).
- [ ] A factual revision has been propagated everywhere that fact appears (Resume, Experience, and elsewhere).
- [ ] Every cross-link points to content that independently qualifies on its own merits, not content linked to for appearance's sake.
- [ ] Any referenced external source is attributed plainly; no colleague is named without consent.
- [ ] No draft sits publicly visible as a placeholder; retired content redirects and is deindexed.

---

## What This Document Is Not

This document does not redefine the structure, qualification criteria, or writing style already specified for Case Studies (`015-case-studies.md`), AgentPrep (`016-agentprep.md`), or Journal entries (`017-journal.md`) — it governs the editorial rules that sit above all three, and defers to each document's own standard for anything specific to that content type.
