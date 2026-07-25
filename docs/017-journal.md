# Journal

**Version:** 1.0
**Status:** Active

---

## Relationship to Prior Documents

`002-user-personas.md` names the Journal as the Fellow Engineer persona's primary entry point, and `003-information-architecture.md` places it as a first-class navigation item with individual articles reachable only by link. `015-case-studies.md` and `016-agentprep.md` define the portfolio's two other content types — a closed engineering problem, and an evolving product. This document defines the third and last content type: short-form, atomic engineering reflection that doesn't need a full project or product behind it to be worth publishing.

---

## 1. Purpose of the Engineering Journal

The Journal exists to answer a question the other two content types can't: **"How does this engineer think when they aren't shipping a feature?"**

A case study proves judgment on one closed problem. AgentPrep proves judgment sustained across a product's life. The Journal proves something else — that the author's thinking is active and ongoing, in the small decisions, observations, and postmortems that happen between the big, structured artifacts. It is evidence of a habit of reflection, not evidence of any single project.

---

## 2. How This Differs From a Blog

A blog optimises for traffic, publishing frequency, and broad appeal. The Journal optimises for **long-term engineering credibility** — per this document's mandate, never for traffic or cadence.

Concretely:

- A blog treats "keeping up a publishing schedule" as a goal in itself. The Journal has no schedule; an entry is published when it exists, not when it's due.
- A blog frequently covers tutorials, tool round-ups, and general-audience explainer content to maximise reach. The Journal never does — see Section 3.
- A blog's success is measured by pageviews or subscribers. The Journal's success is measured by whether a single reader — the Fellow Engineer persona — walks away with something they can actually apply, consistent with `004-product-goals.md`'s rejection of traffic as a goal.
- A blog often exists to build an audience as an end in itself. The Journal exists to demonstrate a way of thinking; any audience it builds is a side effect, not the target, per `004-product-goals.md`'s Non-Goals.

---

## 3. Publishing Criteria

**An entry should not exist just because time has passed since the last one.** An entry may be published only if it contains at least one of the following:

- A lesson learned.
- A technical decision and the reasoning behind it.
- A postmortem.
- A design trade-off.
- An experiment with an unexpected result.
- A reflection written after shipping something.

Before publishing, every entry must be able to answer one question honestly: **"What did I learn that another engineer could apply?"** If the honest answer is "nothing," the entry is not published, regardless of how much effort went into writing it.

---

## 4. Recommended Categories

The Journal uses a small, fixed set of categories — deliberately narrow, so the archive stays legible as it grows:

1. **Engineering Decisions** — a specific technical choice and the reasoning behind it.
2. **Architecture Notes** — observations or evolving thinking about how a system is structured.
3. **Postmortems** — what went wrong, why, and what changed as a result.
4. **Product Development** — reflections on product-level judgment calls, distinct from AgentPrep's ongoing product narrative.
5. **Technical Experiments** — something tried, with an honestly reported result, whether or not it worked.

No category for tutorials, tips, or listicles exists, and none should be added — "JavaScript Tips," "React Tricks," "Top 10 ___" and similar formats are explicitly excluded by Section 3: they are not, by nature, a lesson, a decision, a postmortem, a trade-off, an experiment, or a reflection.

---

## 5. Standard Article Structure

Unlike a case study, a journal entry does not use a large fixed template — it is meant to be short-form and atomic. Every entry follows a minimal, consistent skeleton:

1. **Context** — the situation that prompted this entry, in as few sentences as it takes to understand the stakes.
2. **What Happened** — the decision made, the experiment run, or the failure encountered — the actual substance.
3. **The Lesson** — the single, explicit, generalizable takeaway. This section is mandatory in every entry; it is the direct answer to the question in Section 3.
4. **Open Questions** *(optional)* — anything still unresolved or worth revisiting, if relevant.

An entry is not required to be long enough to need every section elaborated — brevity is expected. What is not optional is Section 3 of this document being satisfied, and the Lesson being stated explicitly rather than left for the reader to infer.

---

## 6. Writing Style

- First person, direct, and specific — the same technical honesty standard as `015-case-studies.md`, applied at a smaller scale.
- Titles state the lesson or question plainly (e.g. "Why we rolled back the cache layer," not "5 Things I Learned About Caching") — never written for clicks.
- Short is preferred over padded. An entry that makes its point in three paragraphs should not be stretched to look more substantial.
- Failures and wrong turns are described as plainly as successes, consistent with the standard already set for Case Studies and AgentPrep.
- No buzzwords, no generic "engineering best practices" framing disconnected from a real, specific situation the author was actually in.

---

## 7. Review Checklist Before Publishing

- [ ] The entry satisfies at least one criterion in Section 3, stated explicitly, not assumed.
- [ ] The Lesson section names something a reader could apply elsewhere — not just what happened to the author.
- [ ] The entry is assigned one of the five categories in Section 4 — if it doesn't fit any of them, that's a signal the entry (or the category list) needs reconsidering, not that a new one should be added casually.
- [ ] Nothing in the entry violates the confidentiality rules already established in `015-case-studies.md`, Section 5 — the same standard applies here whenever an entry touches employer or team context.
- [ ] The title states the lesson or question plainly, with no clickbait framing.
- [ ] The entry contains no tutorial, tips-list, or "Top N" structure.

---

## 8. Reasons Not to Publish an Article

- No qualifying element from Section 3 can be honestly identified.
- The entry exists to fill a publishing gap rather than because there's something worth saying.
- It is a tutorial, tips list, or "Top N" format, regardless of technical accuracy.
- It restates publicly available documentation or a well-known concept without adding a lesson specific to the author's own experience.
- Publishing it would violate the confidentiality standard in `015-case-studies.md`, Section 5, and no honestly anonymized version preserves the lesson.
- It reads as an announcement or update with no technical substance (that kind of update belongs in AgentPrep's Product Timeline, per `016-agentprep.md`, not the Journal).

---

## What This Document Is Not

This document does not specify page layout, component structure, or how entries are authored, stored, or rendered. It defines what qualifies as a journal entry, how it must be structured, and why it exists — implementation must satisfy this standard, not the reverse.
