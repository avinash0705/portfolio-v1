# Experience

**Version:** 1.0
**Status:** Active

---

## Relationship to Prior Documents

`003-information-architecture.md` names Experience as a primary navigation destination, distinct from Resume — a gap surfaced during `008-component-library.md`'s extraction of the Experience Summary component, which found no page specification for it. This document closes that gap. It is informed by `002-user-personas.md` (both Engineering Manager and Recruiter visit this page early in their journey) and `018-resume.md` (which this page must stay factually consistent with, without duplicating it).

---

## 1. Purpose

Resume answers **"can I verify the facts quickly?"** Experience answers a different question:

**"How has this engineer's responsibility and impact evolved over time?"**

Where Resume optimises for speed of verification, Experience optimises for showing a trajectory — that scope, ownership, and impact have grown in a legible, credible way across roles, not just that a list of jobs was held.

---

## 2. Difference From Resume

These are related but distinct products, in the same way `018-resume.md` distinguishes the Resume page from the PDF:

| | Resume (`018-resume.md`) | Experience |
|---|---|---|
| **Question answered** | Can I verify the facts quickly? | How has responsibility evolved over time? |
| **Optimises for** | Efficiency — a couple of minutes | Legibility of trajectory — a longer, considered read |
| **Content shape** | Flat list: title, company, dates, terse highlights | Connected narrative: how scope, ownership, and initiatives built on one another across roles |
| **Reader** | Recruiter primarily, Engineering Manager cross-checking | Engineering Manager primarily, assessing seniority and growth |

A visitor should never feel Experience is "Resume, but longer." Resume states facts; Experience explains what those facts mean in sequence.

---

## 3. Required Content

- **Role progression** — the sequence of roles and how each followed from the last.
- **Scope of ownership** — what the author was actually responsible for in each role, stated concretely.
- **Major initiatives** — the significant efforts undertaken in each role, in enough detail to convey substance without becoming a Case Study.
- **Promotions** — called out explicitly where they occurred, with what changed in scope or responsibility.
- **Cross-links to Case Studies** — the same claim-then-link pattern established in `018-resume.md`, Section 5: a specific initiative links to its full Case Study where one exists.
- **Evolution of responsibilities** — the connective narrative across roles: what grew, what changed, what the author took on next and why.
- **Technologies, as context only** — mentioned to situate a role or initiative, never as a rated or scored skill inventory, consistent with `018-resume.md`, Section 3.

---

## 4. Structure

Content is organised chronologically, most recent role first, as a sequence of connected units rather than an isolated list:

- Each role is presented with enough context to understand its scope and its major initiatives, not just its title and dates.
- Between roles, the connective narrative (Evolution of Responsibilities) makes explicit what changed and why the author moved from one scope of ownership to the next — this connective tissue is what distinguishes this page from Resume, which has no equivalent.
- Promotions are marked distinctly within a role's timeline, not folded silently into a title change.

---

## 5. Relationship to Case Studies

Experience follows the same evidence discipline as Resume (`018-resume.md`, Section 5): a claim about scope or impact is stated plainly, and where a full Case Study exists (`015-case-studies.md`) documenting it, it is linked — never re-narrated in full here. Experience has more room than Resume to explain *why* a role's scope grew, but it still does not replicate a Case Study's Problem/Architecture/Trade-offs structure. That depth belongs only on the Case Study's own page.

---

## 6. Relationship to Resume and Synchronisation

Experience and Resume describe the same underlying career facts from two different angles, and must never contradict each other. The synchronisation standard already established in `018-resume.md`, Section 6 applies directly here: role titles, employment dates, company names, and promotions must match exactly across Resume, Experience, and the PDF. Presentation, depth, and narrative framing may differ — Experience is expected to say more about each role than Resume does — but a fact stated in one must never be contradicted in another.

---

## 7. What This Page Should Not Become

Experience must not become a second résumé. Specifically:

- **No bullet-for-bullet duplication of Resume's highlights** without added narrative value — if a sentence here says nothing Resume didn't already say, it does not belong.
- **No skill ratings, progress bars, or scored competencies** — excluded for the same reason `018-resume.md`, Section 8 excludes them: unverifiable, false precision.
- **No "Hobbies" or personal content** unrelated to professional evolution.
- **No full Case Study narrative reproduced here** — per Section 5, link to it instead.
- **No content that exists only to make the page feel longer** — every initiative and detail included must serve the "how has responsibility evolved" question in Section 1, per `005-design-principles.md`'s "every UI element must earn its place."

---

## 8. Review Checklist

- [ ] Every role shows scope of ownership and major initiatives, not just title and dates.
- [ ] At least one promotion (if any occurred) is called out explicitly, with what changed.
- [ ] The connective narrative between roles explains evolution, not just chronology.
- [ ] Every claim linked to a Case Study points to one that actually exists and qualifies per `015-case-studies.md`.
- [ ] No fact here contradicts Resume or the PDF (`018-resume.md`, Section 6).
- [ ] Nothing on this page merely repeats Resume without adding narrative value (Section 7).
- [ ] Technologies mentioned are contextual, never scored or rated.

---

## What This Document Is Not

This document does not specify visual layout, component structure, or implementation. It defines what the Experience page must accomplish, how it differs from Resume, and what it must not become — implementation must satisfy this specification, not the reverse.
