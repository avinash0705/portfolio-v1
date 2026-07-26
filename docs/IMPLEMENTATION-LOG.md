# Implementation Log

This is not a specification document — it's a working record kept during Phase 2 (`025-roadmap.md`) so specification maintenance stays intentional instead of happening after every single component.

**Triage rule in effect:**
- **Implementation bug** → fixed immediately, not logged here.
- **Ambiguity resolved by a defensible implementation-level judgment call, with no actual spec defect** → noted in the component's own commit message, not logged here either.
- **A genuine gap, inconsistency, or missing cross-reference in the specifications themselves** → logged below.
- **Once two or more logged gaps share a root cause**, or a single logged gap is confirmed still relevant after several more components, batch them into one small, deliberate specification maintenance commit — not one doc edit per component.

`v1.0-spec` (commit `0c6d809`) remains the frozen baseline throughout. Nothing here retroactively changes what that tag represents.

---

## Milestones

| Milestone | Reached at | Notes |
|---|---|---|
| **Phase 2A Complete** — core reusable UI foundation | commit `37d2500`, tag `phase-2a-complete` | Navigation, Section Heading, Highlight, Call to Action, and Metric / Evidence Block (numeric) implemented, each verified against `008` and `028`, each tracked through this log. The one genuine specification conflict encountered (item #2) was found and resolved *before* code existed, not discovered after. |
| **Component Library Complete** — all 11 entries in `008-component-library.md` | tag `component-library-complete` (see commit history) | Track A finished. The strongest signal from the final three components (Decision/Trade-off Block, Case Study Preview, Journal Preview) wasn't how much they reused — it's that the library could correctly say *no* to reuse where responsibilities didn't genuinely match (Case Study Preview declining Section Heading; both previews declining to share code with each other despite near-identical shape), while still reusing where they did (Highlight embedded in Experience Summary). Zero new npm dependencies across all 11 components. |

**Track A is finished. Track B (page composition) is unblocked**: building the seven pages (`014`–`019`, `026`) is now compositional — assembling already-verified pieces against each page's own spec — rather than creative, which keeps implementation risk low precisely because it comes last, as planned from the start.

**Next**: the planned **Specification Coverage Review** — for every component, which specification sections govern it, which have been verified, which have automated verification versus manual review only. Distinct from code coverage; tracks whether the specifications themselves have been exercised, not whether lines of code executed.

---

## Component Library Health Check (after Metric / Evidence Block completed all three variants)

A deliberate pause before Hero, per the same discipline as the design-review pauses — not another spec review, an implementation-quality one. Answered against the real, accumulated source, not from memory:

- **Single responsibility maintained across all six implemented pieces?** Yes, no drift found.
- **Any API grown more complex than intended?** No — the discriminated-union / required-not-defaulted pattern has kept APIs narrower than a naive implementation would, not wider.
- **Repeated pattern needing extraction?** Yes, found and fixed: a number-with-prefix/suffix formatter was duplicated near-identically in three files (`MetricEvidenceBlock.tsx`, `MetricEvidenceBlockComparative.tsx`, `AnimatedOverlay.tsx`) — a genuine third occurrence per `022-coding-standards.md`, Section 2's rule of three. Extracted to `lib/formatMetricValue.ts`; all three call sites updated; re-verified against real SSR output (both the numeric `40%` and the comparative `−52%` cases) that behavior is unchanged.
- **A second candidate, deliberately left alone**: the house easing curve string appears in `NavList.tsx` (JS constant) and as inline Tailwind arbitrary values in `Highlight.tsx`/`CallToAction.tsx` — two occurrences in one mechanism, one in a different mechanism. Below the extraction threshold; watched, not fixed, on purpose.
- **A disclosed, un-fixed inconsistency**: `AnimatedOverlay.tsx`'s JS-side interpolation uses a generic cubic ease-out as an approximation of the house `cubic-bezier(0.16, 1, 0.3, 1)` curve, not the exact curve (not cheaply expressible as a closed-form JS function). Visually negligible; not worth a real Bezier solver.
- **Any ownership boundary forced to change?** No.
- **Has the spec gap count changed?** No — still 1 open, 1 resolved, stable across both new variants.
- **Becoming more compositional?** Yes, in idiom: the "invalid states unrepresentable" pattern now appears consistently across four different components, converged rather than reinvented each time.

---

## Specification Clarifications Discovered During Implementation

| # | Found during | Gap | Status |
|---|---|---|---|
| 1 | Section Heading | `027-application-behaviour.md`, Section 2 requires per-section anchor-links for Case Studies/AgentPrep, but `008-component-library.md`, Section 3 (Section Heading's own spec) never cross-references that requirement — despite Section Heading being the component that has to expose it. Resolved in code (optional `id` prop); not yet reflected in the docs. | Open — 1 of 1, below the 2-gap threshold |
| 2 | Metric / Evidence Block design review (pre-implementation) | `028-interaction-language.md`, Sections 12 and 22 conflicted with each other: Section 12 licensed counting a metric up from zero; Section 22 required evidence never be partially visible mid-animation — a literal count-up is partially-visible-by-definition. Not a missing cross-reference like #1; an actual internal contradiction. | **Resolved** — `028` amended directly (v1.0 → v1.1) rather than logged-and-batched, since it changes component behaviour, not just editorial completeness. Canonical value is now always present/correct/selectable; any animation is a decorative overlay that never touches it. Animation technique de-mandated from "count from zero" to implementation-defined; added a large-value carve-out (no forced full sweep from zero for millions/billions-scale metrics). See commit amending `028-interaction-language.md`. |

---

## Implementation Matrix

| Component | Implemented | Verified vs `008` | Verified vs `028` | Spec gaps logged |
|---|:---:|:---:|:---:|:---:|
| Navigation | ✅ | ✅ | ✅ | 0 (3 ambiguities resolved as implementation choices — see commit `6438e93`; none rose to a logged spec gap) |
| Section Heading | ✅ | ✅ | ✅ | 1 (#1 above) |
| Highlight | ✅ | ✅ | ✅ | 0 (type-level enforcement of link accessibility verified directly — see commit) |
| Call to Action | ✅ | ✅ | ✅ | 0 ("one primary per page" enforcement boundary noted — component design supports it, cannot mechanically enforce it; consistent with existing 008/013 split, not a gap) |
| Metric / Evidence Block — numeric | ✅ | ✅ | ✅ | 0 net (item #2 above surfaced and resolved during design review, before code) — canonical-value claim verified directly against real SSR output, not just code inspection. |
| Metric / Evidence Block — comparative | ✅ | ✅ | ✅ | 0 — delta computation (normal, before=0, no-change cases) verified against real SSR output. |
| Metric / Evidence Block — diagram/artifact | ✅ | ✅ | ✅ | 0 — zoom ships as progressive-enhancement baseline only (disclosed scope decision, in-page overlay deferred); verified against a real generated test image, including fetching the linked full-size URL directly (200, image/png). **Metric / Evidence Block is now complete — all three variants implemented.** |
| Hero | ✅ | ✅ | ✅ | 0 — `<h1>` placement (role, not name or positioning statement) was a genuine open choice resolved as engineering judgment, not a spec defect. Heading structure, content, and both CTAs verified against real SSR output; caught and corrected a wrong attribute-order assumption in my own verification pattern before accepting the result. |
| Case Study Preview | ✅ | ✅ | ✅ | 0 — **the composition finding that mattered most**: the prediction going in was that this component would compose richly from Highlight/Metric/CTA. Re-reading 008's actual content ownership (title, one-line summary, link — nothing else), that would have been a spec violation, not an achievement. Reused almost nothing, deliberately: considered reusing Section Heading (shape matches — short label + optional description) and declined, since its stated responsibility (introduce a page section) genuinely differs from this one (identify a link within a list). Single-link-target structure and aria-label precision verified against real SSR output. |
| Journal Preview | ✅ | ✅ | ✅ | 0 — confirms the same pattern Case Study Preview established: near-identical shape to Case Study Preview, deliberately not shared as code (2 occurrences, below rule-of-three, same threshold applied to the underline-draw CSS). Category modeled as a closed literal union (`JournalCategory`, exported for reuse by future Journal pages) rather than a plain string — an invalid or missing category is a compile error, verified via @ts-expect-error. No colour-coding per category, confirmed against real SSR output. **Component Library Complete — all 11 entries in 008-component-library.md implemented and verified.** |
| Experience Summary | ✅ | ✅ | ✅ | 0 — two components, not three: condensed (genuinely different shape, teaser only) stays separate, but full-tabular and narrative unified into one (`ExperienceSummaryList`) since an optional per-role `evolutionNote` field is the only difference between them, per 008's own "same underlying data" framing. Reuses `Highlight` for role bullets (exported `HighlightProps` from Highlight.tsx first — additive, no behaviour change). Reused-union enforcement, heading structure, and the embedded Highlight's real markup all verified against SSR output. |
| Decision / Trade-off Block | ✅ | ✅ | ✅ | 0 — one component with a discriminated union (not two separate files, unlike Metric/Evidence Block's genuinely different variants), since decision and trade-off share identical rendering shape per 008's own "share the same content-ownership rule." Mandatory counter-statement and mixed-kind rejection both verified via @ts-expect-error; no-container compliance verified against real SSR output. |
| Contact Methods | ✅ | ✅ | ✅ | 0 — no icon (no library chosen for this project; not mandated by 006, only constrained if used). Email vs. LinkedIn/GitHub tab/external-marker asymmetry verified against real SSR output. Reuses the exact underline-draw CSS from `Highlight` — now 2 occurrences, still below the rule-of-three extraction threshold, watched not fixed, same discipline as the easing-curve constant. |

Order follows the sequence agreed in conversation, not `008-component-library.md`'s own listing order: Navigation → Section Heading → Highlight → Call to Action → Metric / Evidence Block (given deliberate extra attention, per its centrality to "Evidence Over Claims") → Hero → **Decision / Trade-off Block → Experience Summary → Contact Methods → Case Study Preview → Journal Preview** (re-sequenced to keep delaying page-shaped components until last).

---

## Engineering Metrics

Tracked from Navigation onward, backfilled accurately against the real commit history (not estimated) rather than only applied going forward, so the trend is visible across the whole matrix. "Abstractions reused" counts our own previously-built modules only — a platform built-in (e.g. `next/image`) is reflected in "new dependencies," not counted as a reused abstraction.

| Component | Spec changes required | New abstractions introduced | Existing abstractions reused | New dependencies |
|---|:---:|:---:|:---:|:---:|
| Navigation | 0 | 5 (`NavLink`, `ThemeToggle`, `MobileNav`, `NavList`, `cn()`) | 0 | 0 |
| Section Heading | 0 | 1 | 0 | 0 |
| Highlight | 0 | 1 | 0 | 0 |
| Call to Action | 0 | 1 | 1 (`cn()`) | 0 |
| Metric / Evidence Block — numeric | 1 (028 Section 12/22 amendment) | 2 (`MetricEvidenceBlock`, `AnimatedOverlay`) | 0 | 0 |
| Metric / Evidence Block — comparative | 0 | 1 | 0 (had its own local, later-duplicated formatter at ship time) | 0 |
| Metric / Evidence Block — diagram/artifact | 0 | 1 | 0 | 0 |
| *(health check)* Formatter extraction | 0 | 1 (`formatMetricValue`) | — (this is the reuse-creation event itself) | 0 |
| **006 containers amendment** | 1 (proactive addition, not a discovered gap — see note below) | 0 | — | 0 |
| Hero | 0 | 1 | 1 (`CallToAction`) — first genuine cross-*component* reuse beyond the `cn()` utility | 0 |
| Decision / Trade-off Block | 0 | 1 (one component, two variants via discriminated union) | 0 | 0 |
| Experience Summary | 0 | 2 (`ExperienceSummaryCondensed`, `ExperienceSummaryList`) | 1 (`Highlight`, embedded for role bullets — required exporting `HighlightProps` first) | 0 |
| Contact Methods | 0 | 1 | 0 (reused the underline-draw *CSS pattern* from `Highlight`, copied not extracted — below rule-of-three) | 0 |
| Case Study Preview | 0 | 1 | 0 (deliberately — considered reusing Section Heading, declined; the underline-draw pattern was also deliberately *not* applied here, staying at 2 occurrences rather than reflexively becoming 3) | 0 |
| Journal Preview | 0 | 1 | 0 (near-identical shape to Case Study Preview, deliberately not shared as code — 2 occurrences, below rule-of-three) | 0 |

**Final running totals, Component Library Complete**: 2 specification changes across 13 components + 1 refactor + 1 proactive amendment; **0 new npm dependencies introduced across the entire component library**; reuse held steady rather than climbing every round — exactly what you'd expect if reuse tracks genuine shared responsibility rather than a quota. Two CSS patterns (underline-draw, easing constant) sat at 2 occurrences through to the end without ever forcing a third — the rule-of-three discipline was never violated in either direction (no premature extraction, no reflexive avoidance either).

**A note on the 006 amendment's category**: unlike items #1 and #2 below, this wasn't a gap *discovered* during implementation — it was a design direction proposed directly by the project owner (containers-are-the-exception, editorial layout over card-based dashboard layout) and resolved into `006-design-system.md` before Hero, following the same "resolve real behavior-changing decisions immediately, don't batch them" rule already established for item #2. Recorded here for the metric's sake, not folded into the gaps table below, since it isn't a specification defect.

---

## Architecture Metrics (current snapshot, not per-component)

A single always-current rollup, distinct from the growing per-component table above. Recounted against `008-component-library.md`'s actual Overview table (11 named shared components — `Product Timeline` is explicitly page-scoped and excluded from this count) rather than estimated.

| Metric | Value |
|---|---:|
| Components implemented | 11 / 11 — **Component Library Complete** (Navigation, Hero, Section Heading, Highlight, Call to Action, Metric / Evidence Block, Decision / Trade-off Block, Experience Summary, Contact Methods, Case Study Preview, Journal Preview) |
| Components reused by another component | 2 (`CallToAction` by Hero; `Highlight` by Experience Summary) |
| Shared utilities | 2 (`cn()`, `formatMetricValue`) |
| New dependencies introduced | 0 |
| Specification defects found | 1 resolved (#2), 1 open (#1) |
| Specification revisions required after implementation began | 0 — both changes made (#2, and the 006 containers amendment) were resolved *before* the code that depended on them was written, not discovered as defects in already-shipped work |

The last row is the one worth watching over time: so far, every specification change has preceded the implementation it governs, not followed a discovery of something already built being wrong. That's the strongest available signal that the specification phase actually did its job.

---
