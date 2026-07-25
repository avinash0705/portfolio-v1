# Product Goals

**Version:** 1.0
**Status:** Active

---

## Relationship to Vision

`001-vision.md` defines why the portfolio exists and what long-horizon success looks like, judged once, narratively, at the one-year mark. This document is not a restatement of that — it defines the concrete, ongoing product-level targets that indicate whether the portfolio is on track *before* that one-year judgment arrives.

Vision answers *"did this work, looking back?"* Product Goals answer *"is this working, right now, and how would we know?"* Goals here should be revisited quarterly; Vision should not.

If a goal in this document stops serving the Vision, the goal is wrong and must be changed. Vision is not adjusted to fit convenient goals.

---

## 1. Primary Product Goal

Enable a first-time visitor matching the **Engineering Manager** persona (`002-user-personas.md`) to independently form a specific, defensible opinion of the author's engineering judgment within a single visit — without requiring a conversation, a call, or clarification from the author first.

This is the single goal every other goal in this document supports.

---

## 2. Secondary Goals

1. Enable the **Technical Recruiter** persona to confidently forward the author to a hiring manager within their 1–3 minute budget (`002-user-personas.md`).
2. Give the **Fellow Engineer** persona enough standalone value in a single piece of content (one journal article or case study) that they engage further — via follow, share, or return visit — without ever needing to be evaluated as a candidate.
3. Keep the site's navigation complexity constant as content volume (case studies, journal entries) grows, per the structure defined in `003-information-architecture.md`.
4. Maintain full alignment with `000-philosophy.md` at every stage of growth — no goal in this document may be met in a way that violates Philosophy.

---

## 3. Non-Goals

These are explicitly not goals of this portfolio, even though they may resemble goals of other portfolio or content sites:

- Maximizing total traffic, pageviews, or general public reach.
- Being generally discoverable or ranking broadly for non-technical search terms.
- Producing content on a fixed publishing schedule or cadence.
- Building an audience as an end in itself, independent of the primary goal above.
- Being everything to every visitor — a visitor outside the three defined personas is not a target user, and the product should not be shaped to accommodate them.

---

## 4. Success Metrics

Metrics are ongoing and directional, not one-time — used to check progress toward the Vision, not to replace its one-year judgment.

1. **Case study depth engagement** — visitors from the Engineering Manager persona's traffic sources reach and spend meaningful time (target: 3+ minutes) on at least one full case study, not just the index.
2. **Recruiter-path completion rate** — visitors following the abbreviated journey (Home → Experience → Resume → Contact) reach Contact without needing to visit Case Studies or Journal first.
3. **Content growth without navigation growth** — the number of case studies and journal entries increases over time while the primary navigation item count (`003-information-architecture.md`, Section 3) stays fixed at six.
4. **Unprompted comprehension** — informally verified: a first-time visitor from the primary audience can correctly describe, in their own words, what kind of engineer the author is after a short visit (this is the same test defined in `001-vision.md` and should be checked at the product-goal level, not deferred entirely to the one-year mark).
5. **Outbound action rate** — a non-trivial share of Engineering Manager and Recruiter visits result in a Contact action (message sent, resume downloaded, or equivalent), rather than a silent bounce after Resume or Experience.

---

## 5. Constraints

- **Single-author maintenance.** All content is produced and maintained by one person. Goals must not assume a team, an editorial calendar, or a publishing cadence beyond what one person can sustain indefinitely.
- **Truthfulness.** Every claim of impact, scale, or outcome must be verifiable by the author and must not overstate reality, per Philosophy's "Evidence Over Claims" principle. A goal is never satisfied by content that cannot be honestly defended if questioned.
- **Confidentiality boundaries.** Case study content must respect any employer confidentiality or NDA obligations; a goal (e.g. "show production metrics") is never satisfied by disclosing information the author is not free to share.
- **Structural stability.** Meeting any goal above by adding navigation items, pages, or categories not defined in `003-information-architecture.md` is not an acceptable way to meet that goal — the architecture must be revisited deliberately, not worked around informally.

---

## 6. Future Evolution

The Primary Product Goal is expected to remain stable across the portfolio's lifetime — it is not tied to a single job search and should outlive any individual hiring cycle.

Secondary goals and success metrics, however, are expected to shift emphasis as the portfolio matures:

- Early on, emphasis is weighted toward Secondary Goal 1 and 2 (proving capability to a first audience).
- As the body of case studies and journal entries grows, emphasis may shift toward Secondary Goal 2 and 3 (sustaining relevance and credibility within the engineering community, and ensuring the growing archive continues to serve the architecture rather than straining it).
- Any such shift in emphasis must still trace back to the unchanged Primary Product Goal and must not conflict with `001-vision.md`.

---

## Out of Scope

The following are explicitly out of scope for this portfolio and should not be treated as future goals without a deliberate revision of this document:

- Becoming a monetized product, service offering, or paid newsletter.
- Supporting multiple authors or contributors.
- Functioning as a general-purpose blogging or publishing platform for others.
- Building community features (comments, forums, discussion threads).
- Operating as a lead-generation or sales funnel of any kind.
- Optimizing for search engine traffic as a primary objective rather than a secondary benefit of good writing.

---

## What This Document Is Not

This document does not discuss frameworks, hosting, styling, or any other implementation or technology decision. It defines what the portfolio must accomplish and how that will be measured — later documents must be built to satisfy these goals, not the reverse.
