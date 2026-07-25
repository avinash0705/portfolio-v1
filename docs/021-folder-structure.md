# Folder Structure

**Version:** 1.0
**Status:** Active

---

## 1. Purpose

`020-tech-stack.md` made every architectural decision this document needs. This document does not introduce anything new — it is the mechanical expression of that architecture as an actual directory layout: Next.js App Router, MDX content, Tailwind, and the component library already specified by responsibility in `008-component-library.md`.

---

## 2. Repository-Level Layout

```
portfolio-v1/
├── CLAUDE.md          — read first, per Step 4 of this project's setup
├── docs/              — this specification (unchanged by this document)
└── portfolio/         — the Next.js application; everything in Sections 3–7 lives here
```

**A note reconciling this with what already exists.** Before `020-tech-stack.md` fixed the architecture, this repository's root was given four sibling folders — `portfolio/`, `claude/`, `assets/`, `design/` — created directly, without a specification behind them (the exact risk `docs/REVIEW.md` flagged under Architectural Risks: "physical structure predates its own specification"). Now that the architecture is decided, and confirmed with the project owner:

- **`portfolio/`** is confirmed as the application root — Section 3 below.
- **`assets/`** was retired. Servable static assets (images, the downloadable resume PDF, favicon) live inside `portfolio/public/` to be servable by Next.js at all — a sibling `assets/` folder outside the application root would never have been reachable by it.
- **`claude/`** was retired. It sat alongside the real `CLAUDE.md` file at the root with no stated purpose (`docs/REVIEW.md` flagged this exact naming collision as an architectural risk), and nothing in this architecture needed it.
- **`design/`** is kept, with an explicit stated purpose: non-deployed design source material — diagrams, sketches, exports, and logo/source artwork — that is never part of the deployed application and therefore never belongs in `portfolio/public/`. Its purpose is documented directly in `design/README.md`.

---

## 3. Application Root Structure (`portfolio/`)

```
portfolio/
├── app/                     — routes, per 003-information-architecture.md's sitemap
│   ├── layout.tsx           — root layout: Navigation, theme provider
│   ├── page.tsx             — Homepage (014-homepage.md)
│   ├── not-found.tsx        — 404 page (027-application-behaviour.md)
│   ├── experience/
│   │   └── page.tsx         — 026-experience.md
│   ├── case-studies/
│   │   ├── page.tsx         — Case Studies index (015-case-studies.md)
│   │   └── [slug]/
│   │       └── page.tsx     — individual Case Study
│   ├── agentprep/
│   │   └── page.tsx         — 016-agentprep.md (a single evolving page, not a collection)
│   ├── journal/
│   │   ├── page.tsx         — Journal index (017-journal.md)
│   │   └── [slug]/
│   │       └── page.tsx     — individual Journal Article
│   ├── resume/
│   │   └── page.tsx         — 018-resume.md
│   └── contact/
│       └── page.tsx         — 019-contact.md
├── content/                 — MDX, per 020-tech-stack.md, Section 6
│   ├── case-studies/
│   │   └── *.mdx
│   ├── journal/
│   │   └── *.mdx
│   └── agentprep/
│       └── *.mdx            — living document; historical sections are append-only per 016-agentprep.md, Section 9
├── components/              — one folder per responsibility, per 008-component-library.md
│   ├── navigation/
│   ├── hero/
│   ├── section-heading/
│   ├── highlight/
│   ├── case-study-preview/
│   ├── journal-preview/
│   ├── experience-summary/
│   ├── metric-evidence-block/
│   ├── decision-trade-off-block/
│   ├── call-to-action/
│   └── contact-methods/
├── lib/                     — MDX parsing, reading-time calculation, and similar small utilities
├── public/                  — servable static assets (images, resume PDF, favicon)
└── styles/                  — global stylesheet and Tailwind configuration
```

`agentprep/` is a single standalone route, not URL-nested under any individual case study — `003-information-architecture.md` places it as link-discovered *from* relevant case studies, which governs where it's linked from, not where its URL lives.

---

## 4. Content Organisation

Each content type from `013-content-strategy.md` maps to one folder under `content/`, matching the URL structure it produces: a file in `content/case-studies/` produces one route under `app/case-studies/[slug]`, and likewise for `content/journal/`. This mapping is what makes `013-content-strategy.md`'s lifecycle (Draft → Published → Retired) concrete: a draft is a file not yet present on the `main` branch; a retired piece of content is a file removed, with a redirect added per `027-application-behaviour.md`'s URL stability policy.

---

## 5. Component Organisation

Each folder under `components/` corresponds exactly to one entry in `008-component-library.md` — named after its responsibility (`case-study-preview`, `metric-evidence-block`), never a generic primitive name like `card` or `box`. If, during implementation, a component like Case Study Preview happens to render using a shared visual container internally, that container is an implementation detail inside that component's own folder — it does not become a new top-level `ui/` primitives folder, per `008-component-library.md`'s own note that generic-primitive naming is exactly what this library was built to avoid.

Server and Client Components are colocated within the same responsibility folder, not segregated into separate top-level "server" and "client" directories — a component's status as a Client Component (per `020-tech-stack.md`, Section 8's short, enumerated list) is a detail of that one component, not an organizing principle for the whole codebase.

---

## 6. Naming Conventions

- Folders and file names: kebab-case (`metric-evidence-block/`), matching the naming already used throughout `008-component-library.md`.
- Component exports: PascalCase, matching the component's name in `008-component-library.md` (e.g. `MetricEvidenceBlock`).
- MDX content files: kebab-case matching the URL slug they produce, per `012-seo.md`, Section 3's URL strategy.

---

## Review Checklist

- [ ] Every route under `app/` corresponds to a page already specified in `014`–`019` or `026`, with no additional routes invented.
- [ ] Every folder under `components/` corresponds to exactly one entry in `008-component-library.md` — no generic primitive folder (`ui/`, `common/`) has been introduced.
- [ ] Every MDX content file lives under the correct content-type folder, matching the URL it should produce.
- [ ] No shipped, servable asset lives outside `portfolio/public/`.
- [ ] The repository-root folders (`assets/`, `claude/`, `design/`) remain resolved as decided in Section 2 — `design/` still has its stated purpose documented in `design/README.md`, and neither `assets/` nor `claude/` has quietly reappeared.

---

## What This Document Is Not

This document does not define the contents of any file, component implementation, or exact package choices beyond what `020-tech-stack.md` already decided. It defines where things go, not what they contain.
