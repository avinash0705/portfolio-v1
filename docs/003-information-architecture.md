# Information Architecture

**Version:** 1.0
**Status:** Active

---

## Purpose

`001-vision.md` defines why the portfolio exists and for whom. `002-user-personas.md` defines what each persona needs and how much time they have. This document translates both into a concrete structure: what pages exist, how they connect, and what a visitor from each persona is expected to do, in order.

This document defines structure only. It does not discuss visual design, layout, or implementation.

---

## 1. Complete Sitemap

```
Home
├── Experience
├── Case Studies (index)
│   ├── Case Study (individual, one per project)
│   │   └── AgentPrep            (linked from within relevant case studies)
├── Journal (index)
│   └── Journal Article (individual, one per post)
├── Resume
└── Contact
```

Every page exists to serve at least one persona's journey defined in Section 5. No page exists that does not appear in at least one journey.

---

## 2. Navigation Hierarchy

The architecture has two tiers:

- **Primary navigation** — first-class, always visible, present in top-level navigation on every page.
- **Secondary / link-discovered** — real pages that exist and are indexable, but are only reached by clicking through from a primary page. They do not appear in the navigation itself.

This keeps the navigation surface small regardless of how much content (case studies, journal posts) accumulates over time, consistent with the Vision's expectation that the portfolio grows by addition, not restructuring.

---

## 3. Primary Navigation

The top-level navigation contains exactly six items, in this order:

1. **Home**
2. **Experience**
3. **Case Studies**
4. **Journal**
5. **Resume**
6. **Contact**

Rationale per item:

- **Home** — orientation page; answers "who is this engineer?" for a visitor with no prior context.
- **Experience** — the Engineering Manager and Recruiter personas both need this early, and both journeys visit it second.
- **Case Studies** — the primary evidence artifact for the Engineering Manager persona; must be reachable in one click from anywhere.
- **Journal** — the primary entry point for the Fellow Engineer persona, and the only page in the top navigation that persona is likely to use.
- **Resume** — needed by both Engineering Manager and Recruiter personas as a fast, structured summary; kept as a first-class item rather than buried, since the Recruiter persona has only 1–3 minutes and cannot afford to hunt for it.
- **Contact** — the terminal step in every persona's journey; must always be one click away.

---

## 4. Secondary / Link-Discovered Pages

These pages are real, individually addressable pages — not navigation items:

- **Individual Case Study pages** — reachable only from the Case Studies index. Each is a card/link, not a nav entry, because the number of case studies will grow over time and the navigation must not grow with it.
- **Individual Journal Articles** — reachable only from the Journal index (or external shares, per the Fellow Engineer journey). Same reasoning: the archive grows, the nav does not.
- **AgentPrep** — reachable only via a link from within the relevant Case Study content that discusses it. It is not a top-level concern for a first-time visitor and does not need to compete with Experience, Case Studies, or Resume for navigation space. A visitor who is interested enough to reach it will find it in context.

Keeping these out of primary navigation is a direct application of Philosophy's "every page has one job" principle: the Case Studies nav item's job is to list case studies, not to also list AgentPrep alongside them.

---

## 5. User Journeys

### Engineering Manager (Primary)

```
Home → Experience → Case Study → Resume → Contact
```

Matches their available time (5–10 minutes, extending to 15–25 if engaged) and their priority content (case studies with real decisions and trade-offs, per `002-user-personas.md`). They confirm scope and seniority via Experience, get their evidence from a Case Study, cross-check specifics in Resume, then act.

### Technical Recruiter (Secondary)

```
Home → Experience → Resume → Contact
```

Deliberately skips Case Studies and Journal. Matches their 1–3 minute budget and their need for fast, restatable facts rather than depth. The journey is a strict subset of the Engineering Manager's, not a different path — this is intentional: the Recruiter is doing an abbreviated version of the same evaluation.

### Fellow Engineer (Community)

```
Google / LinkedIn → Journal Article → Case Study → Home
```

Does not start at Home. Enters the site through a specific piece of shared content, and only backtracks to Home if the Journal Article or a linked Case Study earns enough interest to make them curious who wrote it. This is why Home must be able to stand on its own as a landing destination reached from either direction, not only as a starting point.

---

## 6. What Should Not Exist

The following are intentionally excluded, and should not be added without revisiting this document:

- **A separate "About" page.** Home already answers "who is this engineer?" (per Philosophy's one-job table). A separate About page would split that single job across two pages.
- **A separate "Projects" or "Portfolio" page distinct from Case Studies.** This would create two competing homes for the same kind of evidence and confuse the Engineering Manager journey.
- **A "Blog" page distinct from Journal.** One persona-facing content archive, not two named differently.
- **Tag/category browsing pages, multi-level dropdown navigation, or search.** No persona's journey in Section 5 requires them; adding them would contradict Philosophy's "every component must justify its existence."
- **A "Testimonials" or "Recommendations" page.** Conflicts directly with Vision and Philosophy's "evidence over claims" principle — third-party praise is a claim, not evidence, and belongs (if anywhere) as supporting detail inside a Case Study, not as its own page.
- **A "Services" or "Hire Me" page.** No persona in `002-user-personas.md` is looking to purchase a service; this would misalign the portfolio toward an audience it does not currently serve.
- **AgentPrep in primary navigation.** Covered in Section 4 — it remains discoverable, not promoted.

---

## What This Document Is Not

This document does not specify visual layout, page-level content, component design, or URL/routing implementation. It defines which pages exist, how they connect, and why — later documents (page specs, design system, tech stack) must be built to satisfy this structure, not the reverse.
