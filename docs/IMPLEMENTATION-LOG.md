# Implementation Log

This is not a specification document — it's a working record kept during Phase 2 (`025-roadmap.md`) so specification maintenance stays intentional instead of happening after every single component.

**Triage rule in effect:**
- **Implementation bug** → fixed immediately, not logged here.
- **Ambiguity resolved by a defensible implementation-level judgment call, with no actual spec defect** → noted in the component's own commit message, not logged here either.
- **A genuine gap, inconsistency, or missing cross-reference in the specifications themselves** → logged below.
- **Once two or more logged gaps share a root cause**, or a single logged gap is confirmed still relevant after several more components, batch them into one small, deliberate specification maintenance commit — not one doc edit per component.

`v1.0-spec` (commit `0c6d809`) remains the frozen baseline throughout. Nothing here retroactively changes what that tag represents.

---

## Specification Clarifications Discovered During Implementation

| # | Found during | Gap | Status |
|---|---|---|---|
| 1 | Section Heading | `027-application-behaviour.md`, Section 2 requires per-section anchor-links for Case Studies/AgentPrep, but `008-component-library.md`, Section 3 (Section Heading's own spec) never cross-references that requirement — despite Section Heading being the component that has to expose it. Resolved in code (optional `id` prop); not yet reflected in the docs. | Open — 1 of 1, below the 2-gap threshold |

---

## Implementation Matrix

| Component | Implemented | Verified vs `008` | Verified vs `028` | Spec gaps logged |
|---|:---:|:---:|:---:|:---:|
| Navigation | ✅ | ✅ | ✅ | 0 (3 ambiguities resolved as implementation choices — see commit `6438e93`; none rose to a logged spec gap) |
| Section Heading | ✅ | ✅ | ✅ | 1 (#1 above) |
| Highlight | ⏳ | — | — | — |
| Call to Action | ⏳ | — | — | — |
| Metric / Evidence Block | ⏳ | — | — | — |
| Hero | ⏳ | — | — | — |
| Case Study Preview | ⏳ | — | — | — |
| Journal Preview | ⏳ | — | — | — |
| Experience Summary | ⏳ | — | — | — |
| Decision / Trade-off Block | ⏳ | — | — | — |
| Contact Methods | ⏳ | — | — | — |

Order follows the sequence agreed in conversation, not `008-component-library.md`'s own listing order: Navigation → Section Heading → Highlight → Call to Action → Metric / Evidence Block (given deliberate extra attention, per its centrality to "Evidence Over Claims") → remaining components.
