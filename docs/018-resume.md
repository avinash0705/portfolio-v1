# Resume Page

**Version:** 1.0
**Status:** Active

---

## Relationship to Prior Documents

`002-user-personas.md` gives the Technical Recruiter persona a 1–3 minute budget and a need for fast, restatable facts; `003-information-architecture.md` makes Resume a first-class navigation item, distinct from the downloadable PDF. `015-case-studies.md` defines where deep evidence actually lives. This document defines the Resume **page** — a verification surface, not a narrative one, and not the same product as the PDF.

---

## 1. Purpose of the Resume Page

The Resume page answers one question: **"Can I verify this engineer's experience quickly?"**

Unlike the Homepage, which optimises for building a first impression through story and evidence, the Resume page optimises for **efficiency**. A visitor should be able to confirm titles, dates, companies, and scope in a couple of minutes, without needing to read anything narrative to get the facts they came for.

---

## 2. Resume Page vs. Downloadable PDF

These are two different products serving two different needs, not one document rendered twice:

- **The Resume page** is a living, hyperlinked surface, integrated into the site's navigation and design system (`006-design-system.md`). Its factual claims are backed by links directly to Case Studies (`015-case-studies.md`) — it can lean on the rest of the site for depth.
- **The PDF** is a portable, self-contained artifact, meant to be downloaded, emailed, uploaded to applicant tracking systems, or read entirely offline. It cannot rely on live links to carry meaning, and it must stand on its own without the rest of the portfolio around it.

The Resume page exists to be browsed in context; the PDF exists to be carried out of context. Visual presentation, layout, and level of interactivity may differ freely between the two — Section 6 defines what must never differ.

---

## 3. Required Sections

The Resume page includes exactly the following, in this order:

1. **Professional Summary** — very concise; a small number of sentences establishing current level and domain, not a narrative.
2. **Experience** — role, company, and dates for each position, with concise highlights (Section 5).
3. **Education** — factual, brief.
4. **Selected Achievements** — a short, curated list of standout outcomes, distinct from the highlights already listed under Experience.
5. **Core Technologies** — presented as context for how the author has worked, not as a rated or scored skill inventory.
6. **Download PDF** — a persistent, clearly available call to action.
7. **Links to relevant Case Studies** — attached to specific claims, not listed separately as their own section (Section 5).

No other sections exist on this page.

---

## 4. Information Hierarchy

- **Experience is the dominant section** — it carries the most space and the most visual weight, since it is what both the Recruiter and Engineering Manager personas come to verify first.
- Within each Experience entry, **title, company, and dates are the most prominent elements** — a visitor scanning quickly must be able to extract these without reading a single sentence of prose.
- Highlights beneath each role are secondary to the title/company/dates line, per `005-design-principles.md`'s hierarchy rules — subordinate in weight, but still scannable, not buried in paragraph form.
- Professional Summary is brief enough that it never competes with Experience for attention — it orients, then gets out of the way.
- Core Technologies and Education are lower in visual priority than Experience and Selected Achievements, since they answer secondary, not primary, verification questions.

---

## 5. Relationship to Case Studies

The Resume page must never duplicate a case study's story — it states the verified fact, and links to the evidence:

> **Lead Frontend Engineer — Company, 2021–Present**
> - Led frontend architecture for the recruiter platform → *Case Study*
> - Improved company page discovery → *Case Study*

The bullet is the claim; the case study is the proof. This is the same "evidence over claims" pattern (`000-philosophy.md`) applied at the sentence level: a bullet with a case study behind it is a verified fact with a path to depth; the Resume page's job is never to also tell that story itself.

Not every highlight requires a link — a link is only added where a real, qualifying case study exists per `015-case-studies.md`'s standard. A highlight is never given a link to a thin or nonexistent case study just to appear more substantiated; an unlinked fact stated plainly is preferable to a link that doesn't hold up.

---

## 6. Synchronisation Policy with the PDF

The Resume page and the PDF may differ in presentation, layout, verbosity, and interactivity. They must never differ on **fact**:

- Role titles
- Employment dates
- Company names
- Education (institutions, degrees, dates)
- Promotions and title changes

These facts are treated as having a single source of truth, regardless of how many places they are rendered. Whenever one of these facts changes (a new role, a correction, a promotion), both the web page and the PDF must be updated together — an update to one without the other is treated as a defect, not a minor inconsistency, because a visitor who cross-references the two (an Engineering Manager verifying details, per their journey in `003-information-architecture.md`) will treat any mismatch as a credibility problem, not a formatting quirk.

Selected Achievements, highlight phrasing, and Core Technologies framing may reasonably differ between the two formats, since these are presentation choices rather than verifiable facts — but they must never contradict one another (e.g. the PDF should never claim a different scope of ownership for the same role than the web page does).

---

## 7. Review Checklist

- [ ] All required sections (Section 3) are present, and no others.
- [ ] Title, company, and dates are the most visually prominent element of every Experience entry.
- [ ] Every case study link attaches to a specific claim, not listed generically (Section 5).
- [ ] No highlight duplicates a case study's narrative instead of linking to it.
- [ ] Every fact listed in Section 6 matches exactly between the web page and the current PDF.
- [ ] Core Technologies reads as context, not as a scored or rated skill list.
- [ ] The Download PDF action is present and easy to find.
- [ ] Professional Summary is genuinely concise — if it takes longer to read than the top of Experience, it's too long.

---

## 8. Reasons to Avoid Unnecessary Content

The following are deliberately excluded, and should not be added without revisiting this document:

- **Progress bars or skill percentages** — implies a false precision about ability that cannot be verified or defended, directly contradicting "Evidence Over Claims" (`000-philosophy.md`).
- **Soft-skill ratings** ("Communication: 9/10" or similar) — unverifiable and not the kind of evidence this portfolio is built on.
- **"Hobbies"** — irrelevant to the page's one job (Section 1); does not help a visitor verify experience.
- **A long personal objective statement** — competes with Professional Summary's conciseness and adds no verifiable information.
- **"References available upon request"** — a legacy convention that provides no actual information and earns no place on the page, per `005-design-principles.md`'s "every UI element must earn its place."

Each of these fails the same test: it does not help a visitor answer "can I verify this engineer's experience quickly?" — and per `005-design-principles.md`, anything that doesn't serve the page's one job does not belong on it.

---

## What This Document Is Not

This document does not specify visual layout, component structure, PDF generation, or how factual synchronisation is technically enforced. It defines what the Resume page must contain, how it relates to the PDF, and what it must never include — implementation must satisfy this specification, not the reverse.
