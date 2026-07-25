# Testing

**Version:** 1.0
**Status:** Active

---

## 1. Purpose

Testing philosophy is already scattered across this documentation — `010-accessibility.md`, Section 10's persona-journey test, `011-performance.md`, Section 10's budget-as-release-gate standard, `012-seo.md`, Section 10's discoverability monitoring. This document is where those compose into one coherent testing strategy, adapted to what this project actually is: a mostly-static, content-heavy, single-author site with a small, enumerated interactive surface (`027-application-behaviour.md`) — not a large, dynamic application.

---

## 2. Testing Philosophy

> **Tests exist to verify the promises made by the specifications, not to maximise coverage percentages.**

Every test in this project should trace to a specific claim already made somewhere in this documentation: that a persona can complete their journey (`003-information-architecture.md`, Section 5), that a component honors its content-ownership boundary (`008-component-library.md`), that a performance budget holds (`011-performance.md`), that a Case Study's required evidence is actually present (`015-case-studies.md`). A test that verifies none of these, written only to raise a coverage number, adds maintenance cost without adding confidence — the same standard `004-product-goals.md`'s single-author constraint already applies to monitoring and tooling elsewhere in this documentation.

Coverage is a byproduct of testing what the specifications actually promise, never a goal pursued on its own — in the same way `012-seo.md`, Section 2 treats search traffic as a byproduct of good content, never a goal pursued on its own.

---

## 3. Testing Pyramid, Adapted to This Project

A conventional testing pyramid assumes a large, dynamic application. This project is not one — most of its "logic" is actually content structure and qualification criteria, not branching code, and its genuinely interactive surface is small and already fully enumerated (`027-application-behaviour.md`). The pyramid is reshaped accordingly:

- **Content validation** (Section 6) is the base — the largest, cheapest layer, since most of what needs verifying is structural: does a Case Study have all ten required sections, does a Journal entry have a real category.
- **Unit tests** (Section 4) cover genuine logic only — there is less of this than a typical application, because there is less genuine branching logic in a mostly-static site.
- **Component tests** (Section 5) verify the eleven shared components against `008-component-library.md`'s stated responsibilities.
- **Accessibility and performance verification** (Sections 7–8) are release gates, not optional extras.
- **End-to-end tests** (Section 9) are few and deliberately journey-shaped, not one per route.
- **Manual review** (Section 10) sits at the top by design, not as a gap awaiting automation — some of this project's promises (honesty, genuine qualification, voice) are inherently human judgments, and this document does not pretend otherwise.

---

## 4. Unit Testing

Scoped to genuine logic only: `lib/` utilities such as reading-time calculation (`027-application-behaviour.md`), slug generation (`012-seo.md`, Section 3), and content lifecycle state transitions (`013-content-strategy.md`, Section 9, modeled as a discriminated union per `022-coding-standards.md`, Section 3). A component or function with no real branching logic does not receive a unit test written only to satisfy a coverage target — per Section 2, a test must verify something, not merely exist.

---

## 5. Component Testing

Each of the eleven shared components (`008-component-library.md`) is tested against the specific responsibilities already stated for it — a component test should be traceable to a specific line in that document, not written generically:

- Navigation's current-page indication is programmatically available, not colour-only (`008-component-library.md`, Section 1).
- Case Study Preview and Journal Preview each render as a single accessible link target (`008-component-library.md`, Sections 5–6).
- Call to Action never renders two primary-weighted instances on the same page (`008-component-library.md`, Section 10).
- Contact Methods always renders all three methods together, never a subset (`008-component-library.md`, Section 11).

A component test that doesn't map to a stated responsibility in `008-component-library.md` is testing something this project never promised — and per Section 2, is not a meaningful test.

---

## 6. Content Validation

The largest and cheapest layer, because most of this project's real requirements are structural and can be checked automatically:

- A Case Study has all ten required sections (`015-case-studies.md`, Section 3) and at least one Metric / Evidence Block, one rejected alternative, and one stated trade-off (`015-case-studies.md`, Section 4).
- A Journal entry has a category from the five defined ones (`017-journal.md`, Section 4) and a Lesson section.
- **AgentPrep's append-only requirement (`016-agentprep.md`, Section 9) is enforced automatically**, not just by editorial discipline — a check compares a proposed change against the previously published version and fails if historical content (Product Timeline, Experiments) was altered or removed rather than only appended to.
- Facts shared across Resume, Experience, and the PDF (`018-resume.md`, Section 6; `026-experience.md`, Section 6) are checked for equality against their underlying source data at build time — a mismatch is a build failure, not a manual proofreading task.

Content validation checks structural presence, not qualitative honesty — whether a "rejected alternative" is a *genuine* one is a Section 10 concern, not something this layer can determine.

---

## 7. Accessibility Verification

This layer is `010-accessibility.md`, Section 10's testing philosophy, applied as one part of the overall suite rather than restated: a manual keyboard-only pass through each persona journey before release, a screen-reader spot-check of new evidence content, and automated auditing as a floor. A release does not proceed if any persona's journey (`003-information-architecture.md`, Section 5) cannot be completed by keyboard or screen reader alone.

---

## 8. Performance Verification

This layer is `011-performance.md`, Section 10's monitoring philosophy, applied the same way: a Lighthouse (or equivalent) gate runs before every release, checked against the concrete budgets already defined in `011-performance.md` (Core Web Vitals, JavaScript weight, image and font budgets). A budget regression blocks release exactly as a failing test would — performance verification is not a separate, softer category of testing.

---

## 9. End-to-End Testing

End-to-end tests are few, and shaped around the three persona journeys in `003-information-architecture.md`, Section 5 — not one test per route:

1. **Engineering Manager:** Home → Experience → Case Study → Resume → Contact completes without a broken link, a missing CTA, or a dead end.
2. **Technical Recruiter:** Home → Experience → Resume → Contact completes on its own, independent of Case Studies or Journal.
3. **Fellow Engineer:** a Journal Article → a linked Case Study → Home completes, including arriving directly at an internal page without first visiting the homepage.

A page that isn't part of any of these three journeys is still covered by content validation and component tests (Sections 5–6) — end-to-end testing exists to verify that a whole journey holds together, not to duplicate what those other layers already check per page.

---

## 10. Manual Review

Some promises made throughout this documentation are inherently human judgments, and no amount of automation should be pretended to verify them:

- Whether a Case Study or Journal entry's evidence is *genuinely* honest and non-fabricated (`015-case-studies.md`, Section 7; `017-journal.md`, Section 7) — their own review checklists remain the actual gate here; this document does not duplicate them, only recognizes them as part of the overall testing strategy's top layer.
- Whether content actually qualifies per its content type's bar (`015-case-studies.md`, Section 2; `017-journal.md`, Section 3) — structural presence (Section 6) is necessary, not sufficient.
- Confidentiality compliance (`015-case-studies.md`, Section 5) — "would a former employer or colleague object" is a judgment call, not a pattern an automated check can reliably catch.
- Voice and tone consistency (`013-content-strategy.md`, Section 4) across every content type.

This layer is not a gap awaiting future automation. Claiming automated coverage over something automation cannot actually verify would itself violate the "Evidence Over Claims" standard (`000-philosophy.md`) this entire testing strategy is built to uphold.

---

## Review Checklist

- [ ] Every test added traces to a specific promise made somewhere in this documentation, not to a coverage target (Section 2).
- [ ] Unit tests exist only for genuine logic, not for coverage's sake (Section 4).
- [ ] Every component test maps to a stated responsibility in `008-component-library.md` (Section 5).
- [ ] Content validation checks run automatically for every content type's structural requirements (Section 6), including AgentPrep's append-only enforcement.
- [ ] Accessibility and performance gates (Sections 7–8) block release on failure, the same as any other test.
- [ ] All three persona journeys (Section 9) pass end to end before release.
- [ ] Each content type's own review checklist (`015`, `016`, `017`) has been completed manually before publishing (Section 10).

---

## What This Document Is Not

This document does not choose a specific testing framework, test runner, or CI pipeline configuration — those are implementation details left to actual project setup. It defines what must be verified, at what layer, and why — any tooling chosen must satisfy this strategy, not the reverse.
