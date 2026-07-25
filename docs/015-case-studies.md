# Case Studies

**Version:** 1.0
**Status:** Active

---

## Relationship to Prior Documents

Case studies are the portfolio's primary evidence artifact. `004-product-goals.md` names case-study depth engagement as the leading success metric; `014-homepage.md` gives them the primary CTA; `003-information-architecture.md` makes them a first-class navigation item. This document defines what a case study is, when a project has earned the right to become one, and the exact structure and rules every case study must follow. It does not discuss layout, components, or implementation — only the content and editorial standard.

---

## 1. Purpose of a Case Study

A case study exists to let a visitor verify engineering judgment directly, without a conversation — per `001-vision.md`'s core premise that trust is earned through evidence, not claimed through words.

A case study is not a project description. A project description answers "what did you build?" A case study answers **"how did you think?"** — what the problem actually was, what made it hard, what was decided and why, what it cost, and what was learned. The technology used is incidental; the reasoning is the content.

---

## 2. Qualification Criteria

**A project is not automatically a case study.** A project earns a case study only if it can honestly satisfy all four of the following:

1. **A non-obvious problem existed.** The right approach was not immediately obvious to a competent engineer; there was real ambiguity to resolve.
2. **Real constraints shaped the outcome.** Technical, organizational, time, or resource constraints meaningfully narrowed the solution space — the outcome would plausibly differ under different constraints.
3. **A genuine decision was made among alternatives.** At least one specific alternative was seriously considered and rejected, for a reason that can be explained.
4. **There is a lesson that generalizes.** The takeaway is useful to someone who was never involved in the project — it is not only meaningful in hindsight to the author.

If any one of these four cannot be honestly answered, the project is not a case study candidate, regardless of how much effort it took to build.

**Examples that qualify:** an SEO migration with measurable before/after outcomes and real technical trade-offs; a recruiter platform modernization with legacy constraints and a genuine architectural decision; AgentPrep, if it involves a real, non-obvious engineering problem worth explaining.

**Examples that do not qualify:** a CRUD dashboard with no notable constraint or decision; a tutorial clone; a weather app or other project built primarily to practice a technology, where the "problem" was chosen to be easy rather than encountered.

---

## 3. Standard Structure

Every case study, without exception, follows the same ten sections, in the same order:

1. **Problem** — what needed to be solved, and for whom.
2. **Context** — the situation the problem existed within (team, system, business state) — only as much as needed to understand the stakes.
3. **Constraints** — the real limits that shaped what was possible (technical debt, timeline, headcount, compliance, legacy systems).
4. **Role & Ownership** — precisely what the author owned versus what was owned by others; never implied sole credit for team work.
5. **Solution** — what was actually built or changed, described plainly.
6. **Architecture** — how the solution was structured, and why that structure, at a level a technical reader can evaluate.
7. **Key Technical Decisions** — the specific decision points, the alternatives considered, and why the chosen path won.
8. **Trade-offs** — what was given up to get the outcome; no solution is presented as costless.
9. **Outcome** — what actually happened, in measurable or clearly observable terms.
10. **Lessons Learned** — what would be done differently, and what generalizes beyond this specific project.

This fixed structure is a deliberate application of `005-design-principles.md`'s "consistency over creativity" — a returning visitor should be able to navigate any case study by structure alone, without re-learning how to read it. No case study may reorder, rename, merge, or omit a section. If a section genuinely does not apply (e.g. no meaningful trade-off existed), that section states this explicitly rather than being removed — its absence must be visible, not silent.

**Length:** a case study should be readable in the 10–15 minute window the Engineering Manager persona allocates to it (`002-user-personas.md`) — long enough to demonstrate real depth in Architecture and Key Technical Decisions, short enough that Context and Background do not overstay their purpose. As a guide, Problem through Role & Ownership together should be brief relative to Solution through Lessons Learned, which carry the actual evidence.

---

## 4. Required Evidence

Every case study must include, at minimum:

- At least one concrete, real metric or observable outcome in the Outcome section — not a vague claim of success.
- At least one specific alternative that was considered and rejected in Key Technical Decisions, with the reason for rejection.
- At least one honestly stated trade-off or cost in the Trade-offs section — a case study with no cost is not credible.
- A clear statement of individual role versus team contribution in Role & Ownership.
- At least one architecture diagram, decision diagram, or equivalent visual artifact that represents the real system, per `006-design-system.md`'s illustration policy (diagrams are content, not decoration).

## Forbidden Evidence

- Fabricated, estimated, or rounded-up-to-impress metrics presented as fact.
- Third-party praise, quotes, or testimonials of any kind (consistent with the site-wide exclusion in `003-information-architecture.md`).
- Screenshots, diagrams, or descriptions that expose proprietary source code, unreleased product details, or internal system names beyond what is public or authorized.
- Stock imagery or decorative illustration in place of real diagrams or screenshots.
- Marketing language in place of technical explanation — per `000-philosophy.md`'s "Engineering Over Marketing."

---

## 5. Confidentiality Rules

- No proprietary source code, credentials, infrastructure details, or security-sensitive configuration is ever published.
- No information under active NDA or an employer's explicit confidentiality request is published, regardless of how strong the resulting evidence would be.
- Company names may be used only where doing so is already public knowledge (e.g. a listed employer on a public resume) and does not itself disclose confidential information about that company's internal systems or performance.
- Colleagues and teammates are never named or identifiable without their consent; team contributions are described by role, not by naming individuals.

**What can be anonymized rather than omitted:** absolute figures that would reveal confidential business scale (revenue, exact user counts, exact traffic volumes) may be expressed as relative or normalized values instead — a percentage change, a multiplier, or a bucketed range — so the technical outcome remains demonstrable without disclosing the underlying confidential number. Anonymizing a metric's scale is always preferred over omitting the outcome entirely, provided the anonymized version remains honest and not misleading (per `004-product-goals.md`'s truthfulness constraint).

When in doubt, the standing rule is: **generalize the specific number, never fabricate one, and never publish what confidentiality forbids.**

---

## 6. Writing Style

- Written in first person, as the engineer who made the decisions — not in a detached, third-person "case study" voice.
- Technical, concise, and honest, per `000-philosophy.md`'s Communication Style — explaining why a problem existed, why a solution was chosen, and what trade-offs were accepted.
- Failures, near-misses, and things that didn't work are described as plainly as successes — a case study that only recounts wins is incomplete, not impressive.
- No buzzwords, no empty superlatives, no generic inspirational framing. Every sentence should be defensible if the author were asked to explain it in a technical interview.

---

## 7. Review Checklist Before Publishing

A case study is not ready to publish until every item below is true:

- [ ] It passes all four Qualification Criteria (Section 2), stated explicitly, not assumed.
- [ ] All ten sections are present, in order, with no section silently omitted (Section 3).
- [ ] Every metric in Outcome is one the author can personally defend if questioned.
- [ ] At least one rejected alternative appears in Key Technical Decisions.
- [ ] At least one real trade-off appears in Trade-offs.
- [ ] Nothing in the draft would violate Section 5's confidentiality rules if read by a former employer or teammate.
- [ ] No forbidden evidence (Section 4) is present anywhere in the draft.
- [ ] The writing style matches Section 6 — no marketing language remains.
- [ ] At least one real diagram or artifact is included, per Section 4.
- [ ] The case study could be read start to finish within the length guidance in Section 3.

---

## 8. Reasons to Reject a Proposed Case Study

A proposed case study should be rejected, not published in weakened form, if any of the following are true:

- It fails the Qualification Criteria in Section 2 — there is no real problem, constraint, decision, or generalizable lesson.
- Its most compelling evidence cannot be published without violating confidentiality, and no honest anonymized version preserves the demonstration (Section 5).
- The author's actual role in the outcome was too small or too ambiguous to honestly fill out Role & Ownership.
- The outcome is unknown, unmeasurable, or not yet observable — a case study should not be published on a predicted or hoped-for result.
- Publishing it would require inventing or rounding evidence to make the project appear more significant than it was.

A rejected case study is not a permanent rejection — it may qualify later if the situation changes (e.g. the outcome becomes measurable, or a confidentiality restriction lifts).

---

## What This Document Is Not

This document does not specify page layout, visual design, component structure, or how case studies are authored, stored, or rendered. It defines what every case study must contain and why — implementation must satisfy this template, not the reverse.
