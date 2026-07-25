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

**Remaining work is split into two tracks, not one undifferentiated backlog:**

- **Track A — finish the component library.** Metric / Evidence Block's comparative and diagram/artifact variants, then Hero, Case Study Preview, Journal Preview, Experience Summary, Decision / Trade-off Block, and Contact Methods. Goal: **Component Library Complete** — every entry in `008-component-library.md` implemented and verified.
- **Track B — page composition.** Deliberately not started until Track A finishes. Once every shared component exists, building the seven pages (`014`–`019`, `026`) is compositional — assembling already-verified pieces against each page's own spec — rather than creative, which keeps implementation risk low precisely because it comes last.

**Planned, not yet started**: once Track A reaches Component Library Complete, a **Specification Coverage Review** — for every component, which specification sections govern it, which have been verified, which have automated verification versus manual review only. Distinct from code coverage; tracks whether the specifications themselves have been exercised, not whether lines of code executed.

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
| Metric / Evidence Block — comparative | ✅ | ✅ | ✅ | 0 — delta computation (normal, before=0, no-change cases) verified against real SSR output. Diagram/artifact variant remains ⏳. |
| Hero | ⏳ | — | — | — |
| Case Study Preview | ⏳ | — | — | — |
| Journal Preview | ⏳ | — | — | — |
| Experience Summary | ⏳ | — | — | — |
| Decision / Trade-off Block | ⏳ | — | — | — |
| Contact Methods | ⏳ | — | — | — |

Order follows the sequence agreed in conversation, not `008-component-library.md`'s own listing order: Navigation → Section Heading → Highlight → Call to Action → Metric / Evidence Block (given deliberate extra attention, per its centrality to "Evidence Over Claims") → remaining components.
