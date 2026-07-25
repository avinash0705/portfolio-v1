# AgentPrep

**Version:** 1.0
**Status:** Active

---

## Relationship to Prior Documents

`003-information-architecture.md` places AgentPrep as a real, dedicated page reachable from within relevant Case Studies, not from primary navigation. `015-case-studies.md` defines the standard for documenting a single, closed engineering problem. This document defines something structurally different: a **product specification**, not a project page, for the one artifact in the portfolio that shows the author's thinking end-to-end — identifying a market, validating it, building it, measuring it, and iterating on it — which no case study, by design, can show on its own.

---

## 1. Why AgentPrep Deserves Its Own Page

Every other piece of evidence in this portfolio documents a single, bounded engineering problem solved inside someone else's product. AgentPrep is the only artifact where the author owns the entire chain of judgment: deciding what to build, why it matters, whether it works, and what to do next.

That end-to-end ownership is not demonstrable inside the Case Study structure (`015-case-studies.md`), which is deliberately scoped to one closed problem. AgentPrep needs its own page because it is evidence of a different, broader capability — product judgment sustained over time — not a bigger version of the same evidence a case study already provides.

---

## 2. How This Page Differs From a Case Study

This is the most important distinction in this document, and it must remain visible to a visitor, not just to the author.

| | Case Study (`015-case-studies.md`) | AgentPrep |
|---|---|---|
| **Subject** | One closed engineering problem | An ongoing product |
| **Time frame** | Past, bounded — has a start and an end | Present and continuing — has a start, no fixed end |
| **Narrative shape** | Single arc: problem → decision → outcome | Multiple arcs over time: validation, build, pivot, rebuild |
| **Completion state** | Finished; outcome is known and stated once | Indeterminate; "Current State" is a snapshot, not a conclusion |
| **Update policy** | Effectively frozen once published, edited only for correction | Expected to be revised as the product evolves — this is a feature, not a maintenance burden |
| **What it proves** | Judgment under one specific set of constraints | Judgment sustained across many decisions, including ones that didn't work |

A visitor should never come away from AgentPrep feeling like they read "a case study about a startup." They should feel like they are watching a product get built in something close to real time, with the reasoning exposed at every stage.

---

## 3. What a Visitor Should Learn

- That the author can identify a real problem worth solving, not just execute on someone else's specification.
- How the author validated (or failed to validate) that the problem was real before over-investing in a solution.
- How the product's architecture and scope changed as real information came in, and why.
- That the author treats an unfinished, still-evolving product with the same honesty as a completed one — no polishing history in hindsight.
- What is true right now, today, distinct from what was true at earlier stages — the page must make it easy to tell "current" from "historical" at a glance.

---

## 4. Standard Structure

AgentPrep uses its own structure, distinct from the Case Study template, because it is telling a different kind of story:

1. **Vision** — what AgentPrep is trying to become, and why it's worth building at all.
2. **Problem** — the specific problem in the market this product addresses, and for whom.
3. **Market Validation** — what was actually done to test whether the problem was real before committing to build, and what was learned.
4. **Product Timeline** — a chronological account of how the product has evolved, stage by stage.
5. **Architecture Evolution** — how the technical approach has changed over time, and what forced each change.
6. **Major Decisions** — the significant product or technical decisions made along the way, and the reasoning at the time they were made.
7. **Experiments** — things that were tried, including ones that failed or were abandoned, documented on equal footing with what succeeded.
8. **Current State** — what is true about the product today: what exists, what works, what doesn't yet.
9. **Roadmap** — what is planned next, stated as intent, not as a promise or a pitch.
10. **Lessons Learned** — what building AgentPrep has taught the author, updated as the product continues.

Unlike a case study, this structure is **not a fixed template applied once** — Product Timeline, Architecture Evolution, Experiments, Current State, and Roadmap are living sections, expected to be appended to and updated as the product continues to exist.

---

## 5. Evidence Requirements

- **Timeline entries must be dated**, even approximately, so a visitor can distinguish an early decision from a recent one.
- **Market Validation must show what was actually done** — real attempts (interviews, a landing page test, early user usage), not a claim of validation without a described method.
- **Architecture Evolution must show real change over time**, not a single current-state diagram presented as if it always looked this way.
- **Major Decisions must include at least one decision that, in hindsight, was wrong or partially wrong**, alongside ones that held up — a page with only correct-in-hindsight decisions is not credible.
- **Current State must be honestly scoped** — what doesn't work yet or isn't built is stated plainly, not omitted.
- Real screenshots, metrics, and diagrams are preferred throughout, consistent with `006-design-system.md`'s illustration and data visualisation policies — nothing here is illustrated or mocked up for effect.

---

## 6. What Should Not Be Included

- **Pitch-deck framing.** No "massive market opportunity," unverified market-size figures, or language written to persuade an investor rather than inform an engineer. AgentPrep is not being sold to the visitor.
- **Unverified traction claims.** Any user, usage, or growth figure shown must be one the author can defend if questioned, per `004-product-goals.md`'s truthfulness constraint — the same standard as a case study's metrics.
- **A claim of product-market fit that hasn't actually been demonstrated** by the evidence in Market Validation and Current State.
- **Retouched history.** Earlier stages of the Product Timeline or Architecture Evolution are never rewritten to make a past decision look smarter than it was at the time it was made.
- **Testimonials or third-party praise**, consistent with the site-wide exclusion in `003-information-architecture.md`.
- **A hard commitment disguised as a roadmap.** Roadmap items are stated as current intent, not as guaranteed delivery — this is a product still being figured out, not a shipped set of promises.
- **Solicitation.** This page does not ask visitors to invest, join, or buy anything — consistent with `004-product-goals.md`'s "Out of Scope" exclusion of lead-generation and sales funnels. It exists to demonstrate judgment, not to acquire users or capital.

---

## 7. Milestones to Document

At minimum, the Product Timeline should capture:

- The original problem/idea and what prompted it.
- Any validation attempt and its real result (including an inconclusive or negative one).
- The first working version and what it could actually do.
- Any point where real usage (even small) produced information that changed the plan.
- Every pivot — a change in problem, audience, or approach — with the reasoning behind it.
- Significant architecture changes, tied to what made the previous approach insufficient.
- The current state, refreshed whenever it materially changes.

A milestone is worth documenting if it changed what the author believed or did next — not simply because time passed.

---

## 8. Presenting Failures, Pivots, and Experiments

Failures and pivots are first-class content, not a liability to be minimized — this is what makes AgentPrep more credible than a highlight reel, and it is consistent with `015-case-studies.md`'s standard that failures are described as plainly as successes.

- Every entry in Experiments states what was tried, what was expected, what actually happened, and why it was kept or abandoned — an experiment with no stated expectation is not a real experiment.
- A pivot is documented as a specific before/after: what was believed before, what changed, and what is believed now. It is never smoothed over as "we decided to focus on X" without saying what X replaced.
- Nothing in Experiments or Product Timeline is deleted once published. If an approach is abandoned, the record of trying it remains — this is what makes Architecture Evolution and Major Decisions credible as a real history rather than a curated one.

---

## 9. Living Document Policy

AgentPrep is not published once and left static. Product Timeline, Architecture Evolution, Experiments, Current State, and Roadmap are expected to be revisited as the product changes:

- **Append, don't rewrite.** Historical sections grow forward in time; they are not edited retroactively except to correct factual errors.
- **Current State is always the freshest section.** It should be the first thing updated whenever something materially changes, since it is what most visitors will treat as "the truth right now."
- **The page's own evolution is part of the evidence.** A visitor returning months later and seeing the page has genuinely moved forward is itself a demonstration of sustained ownership — the single quality this page exists to prove (Section 1).

---

## What This Document Is Not

This document does not specify visual layout, component structure, or how the timeline is implemented. It defines what AgentPrep's page must contain, how it must be maintained over time, and how it must be understood as fundamentally different from a case study — implementation must satisfy this specification, not the reverse.
