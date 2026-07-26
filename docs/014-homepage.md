# Homepage

**Version:** 1.1
**Status:** Active

---

## Relationship to Prior Documents

This is a product specification, not a wireframe or visual design. It defines what the homepage must accomplish, in what order, and why — informed by `002-user-personas.md` (who arrives), `003-information-architecture.md` (where they can go next), `004-product-goals.md` (what "working" means), and governed by `005-design-principles.md` and `006-design-system.md` for how it may look once designed. No layout, colour, spacing, or component decisions are made here.

---

## 1. Homepage Objective

Give a first-time visitor, in under a minute, enough evidence and orientation to decide their next click — without requiring scrolling through unrelated content or reading a biography to get there.

Per `000-philosophy.md`'s one-job rule, the Homepage's single job is to answer: **"Who is this engineer?"** Every section exists in service of that one question, approached from a different angle.

---

## 2. Success Criteria

The homepage is working if:

1. A visitor from the Engineering Manager persona can state, after viewing only the homepage, what kind of problems this engineer works on and where to find proof (`001-vision.md`'s one-year test, checked here at the page level).
2. A visitor from the Recruiter persona can locate Experience and Resume without needing to think about where they might be (`002-user-personas.md`'s 1–3 minute budget).
3. At least one Featured Case Study receives a click-through from homepage traffic (feeds `004-product-goals.md`'s case-study depth engagement metric).
4. No persona bounces from the homepage without encountering at least one piece of concrete evidence (a real outcome, metric, or named project) — a bounce after only marketing language is a failure of this page, not just of the visitor's interest.

---

## 3. Section Order and Purpose

Each section answers exactly one question. No section may attempt to answer more than one, per `005-design-principles.md`, Principle 8.

| Order | Section | Question It Answers | Notes |
|---|---|---|---|
| 1 | Hero | Who is this engineer? | Above the fold in full — see Section 5. |
| 2 | Highlights | Why should I keep reading? | Scannable proof points, not narrative. |
| 3 | Track Record | What level are they operating at? | A condensed teaser of Experience — not a duplicate of it. |
| 4 | Featured Case Studies | Can they back up their claims? | 2–3 selected case studies only, not the full index. |
| 5 | From the Journal | How do they think? | 2–3 recent entries only, not the full archive. |
| 6 | Contact | What's the next step? | The page's closing action, always reachable. |

No section may be reordered without revisiting this document, since the order itself reflects the sequence a visitor needs to build confidence — orientation, then reasons to trust, then proof, then depth, then action.

---

## 4. Primary and Secondary CTA

- **Primary CTA: "View Case Studies."** The homepage's main call to action leads to the strongest evidence artifact on the site, directly serving the Primary Product Goal (`004-product-goals.md`) of enabling an independent, evidence-based opinion. This CTA appears in the Hero and is repeated at Featured Case Studies.
- **Secondary CTA: "View Resume."** Serves the Recruiter persona's abbreviated journey and gives any visitor a lower-commitment, faster path to structured facts if they are not ready to read a full case study.

Contact is **not** the homepage's primary CTA. Per "Evidence Over Claims" (`000-philosophy.md`), a visitor should be directed toward proof before being asked to reach out — Contact is always one click away via navigation (`003-information-architecture.md`), and is the dedicated closing section (Section 6), but it does not compete with Case Studies for the visitor's first action.

---

## 5. Above the Fold

Visible without scrolling, on first load:

- The author's name and current role/level (not a job title alone — enough to convey seniority and domain).
- A single-sentence positioning statement answering "who is this engineer?" directly — not a slogan, not a list of technologies.
- The Primary CTA ("View Case Studies").
- The Secondary CTA ("View Resume"), visually subordinate to the primary, per `005-design-principles.md`'s hierarchy rules.

Nothing else is required above the fold. If a visitor never scrolls, these four items alone must be enough for them to form an initial impression and choose a next action.

---

## 6. What Must Never Appear on the Homepage

- **Testimonials or third-party praise** — already excluded site-wide in `003-information-architecture.md`; the homepage is not an exception.
- **A full biography or "About" narrative** — the Homepage answers "who is this engineer?" through evidence and orientation, not through prose autobiography; a deeper narrative belongs in Experience or a case study, not here.
- **Unverified or unattributable metrics** — any number shown must be one the author can defend if questioned, per `004-product-goals.md`'s truthfulness constraint.
- **Generic marketing language** ("passionate," "results-driven," "ninja," "rockstar," or similar) — directly contradicts "Engineering Over Marketing" (`000-philosophy.md`).
- **Decorative illustration or stock photography** — excluded by `006-design-system.md`'s illustration and photography policies. The narrow abstract technical-motif exception `006-design-system.md`, Section 10 permits (crosshairs, dotted grids, measurement marks) is allowed on the Homepage; figurative illustration, stock art, and decorative scenes remain fully excluded.
- **The full Case Studies index or full Journal archive** — the homepage teases (Sections 4 and 5); the full lists live on their own pages, per `003-information-architecture.md`.
- **A second competing primary action** — only one primary CTA may exist per Section 4; a homepage with two equally weighted calls to action has failed its own hierarchy.

---

## 7. Exit Paths by Persona

Where each persona is expected to go immediately after the homepage, consistent with `003-information-architecture.md`:

- **Engineering Manager** → Featured Case Studies section (or Experience via nav) → a full Case Study → Resume → Contact.
- **Technical Recruiter** → Experience (via nav) → Resume → Contact, bypassing Featured Case Studies and the Journal teaser entirely.
- **Fellow Engineer** → typically does not land on the homepage first (per their journey in `003-information-architecture.md`); if they do arrive here (e.g. backtracking from a journal article), their exit path is the From the Journal section → another article, or a Featured Case Study out of curiosity, not Contact.

If a persona's actual behaviour diverges from these paths once the site is live, that is a signal to revisit this document, not a signal to add new homepage sections to compensate.

---

## What This Document Is Not

This document does not specify layout, visual composition, imagery, copywriting, or component structure. It defines what the homepage must accomplish, in what order, and what it must exclude — design and implementation must satisfy this specification, not the reverse.
