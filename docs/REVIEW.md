# Architecture & Specification Review

**Reviewer role:** Staff Engineer review of specification completeness — not an implementation review.
**Scope:** Entire repository as it exists today.
**Method:** Full file inventory + content read of every non-empty file.

**Historical note (added when the specification layer was completed):** this review was written when the repository was still empty, against the file numbering that existed at that moment. Several files were later renumbered as documents were actually written (for example, what this review calls `002-product-goals.md`, `003-user-personas.md`, and `004-information-architecture.md` are, in the final numbering, `004-product-goals.md`, `002-user-personas.md`, and `003-information-architecture.md`). This document is preserved as a point-in-time record and is not updated to match the final numbering — see `docs/025-roadmap.md` for the completed structure.

---

## Headline Finding

Of 27 files in the repository, **2 have content** (`CLAUDE.md`, `docs/000-philosophy.md`) and **25 are empty placeholders** (`docs/001-*.md` through `docs/025-*.md`).

This means the "specification" currently consists of a mission statement and a set of operating instructions for Claude, but **zero product, design, or engineering decisions have actually been made**. Any implementation started today would necessarily involve Claude inventing the product — which directly violates the constraint in `CLAUDE.md`: *"You must never invent features, layouts, animations, colours, pages, or components that are not documented."*

The remediation order matters: several empty docs are load-bearing for others (see "Recommended Sequencing" at the end).

---

## 1. Missing Specifications

Every doc below is currently a 0-byte file. Listed with what it needs to define and what currently depends on it.

| Doc | Expected to define | Currently blocking |
|---|---|---|
| `001-vision.md` | Product vision distinct from philosophy (000) — what is being built, for whom, by when | Everything downstream; also unclear how this differs from 000's "Mission" section |
| `002-product-goals.md` | Concrete, measurable goals (not values) | Roadmap (025), success criteria |
| `003-user-personas.md` | Who "visitors" actually are | IA (004), content strategy (013), homepage (014) — all currently guessing at audience |
| `004-information-architecture.md` | Sitemap, navigation model, URL structure | Component library, homepage, all page docs |
| `005-design-principles.md` | Concrete design rules (not philosophy-level values, which already exist in 000) | Design system (006) |
| `006-design-system.md` | Colour tokens, type scale, spacing scale, elevation, grid | Component library (008), all page docs |
| `007-responsive-strategy.md` | Breakpoints, mobile-first vs. desktop-first, layout behaviour | Component library, homepage |
| `008-component-library.md` | Component inventory, API/props conventions, states | Every page doc |
| `009-motion-system.md` | Durations, easing curves, `prefers-reduced-motion` policy | Accessibility (010) — these two docs will conflict if written independently |
| `010-accessibility.md` | Conformance target (e.g. WCAG level), testing method | Component library, testing (023) |
| `011-performance.md` | Concrete budgets (bundle size, LCP/INP/CLS targets, Lighthouse score floor) | Tech stack (020), deployment (024) |
| `012-seo.md` | Metadata strategy, structured data, sitemap/robots, OG image strategy | Content strategy, page docs |
| `013-content-strategy.md` | Voice/tone rules beyond 000's high-level bullets, editorial process | All page docs, journal (017) |
| `014-homepage.md` | Actual page spec | — |
| `015-case-studies.md` | Actual page spec, and whether real company data/NDA boundaries apply | — |
| `016-agentprep.md` | **What "AgentPrep" is at all** — see Ambiguities | — |
| `017-journal.md` | Content model — is this a blog? MDX files? CMS? | Tech stack (020) |
| `018-resume.md` | Format — downloadable PDF, HTML page, both? Data source (single source of truth vs. duplicated content)? | — |
| `019-contact.md` | Contact mechanism — form, mailto, third-party service? Data handling/privacy implications | — |
| `020-tech-stack.md` | Framework, styling approach, hosting target, CMS/content approach | Nearly every other doc; this is a foundational dependency currently undefined |
| `021-folder-structure.md` | The folder structure **that already physically exists** (`portfolio/`, `docs/`, `claude/`, `assets/`, `design/`) has no written rationale | Onboarding, coding standards |
| `022-coding-standards.md` | Linting, formatting, naming conventions, review process | Testing (023) |
| `023-testing.md` | Test framework, coverage expectations, visual regression policy | CI/CD, deployment (024) |
| `024-deployment.md` | Hosting target, CI/CD pipeline, environments | Roadmap (025) |
| `025-roadmap.md` | Milestones, sequencing, launch definition | Nothing else depends on it, but it depends on nearly everything above |

---

## 2. Ambiguous Requirements

1. **"Visitors" is never defined.** `000-philosophy.md` repeatedly assumes a single homogeneous visitor persona, but never states whether the primary audience is hiring managers, technical recruiters, engineering peers, or founders/clients. This materially changes IA, tone, and page depth, and `003-user-personas.md` (which should resolve this) is empty.

2. **"AgentPrep" is used as a proper noun with zero definition.** It appears in the philosophy doc's page table and has a dedicated doc (`016-agentprep.md`), but nothing in the repo explains what it is — a product, an internal tool, a course, a project? This is the single most under-specified concept in the repository.

3. **Page count mismatch.** `000-philosophy.md`'s "Every Page Has One Job" table lists **7 pages** (Home, Experience, Case Studies, AgentPrep, Journal, Resume, Contact). The docs plan (`014`–`019`) only accounts for **6** (Homepage, Case Studies, AgentPrep, Journal, Resume, Contact) — there is no doc for "Experience." Either a doc is missing or "Experience" was folded into Homepage without saying so.

4. **Unfalsifiable acceptance criteria.** Principle 7 states every component must improve "Trust." Trust is not measurable and gives an implementer no way to test whether a component satisfies the requirement. The other five listed properties (Understanding, Navigation, Readability, Accessibility, Usability) are at least partially testable; Trust is not, unless it's operationalized somewhere (it currently isn't).

5. **Case study data boundaries are unstated.** Philosophy demands "production metrics" and "measurable business impact" as evidence, but nothing addresses confidentiality — can real employer metrics be published? Is there an approval/anonymization process? This is a legal/professional risk, not just a content question.

6. **Dependency/library approval has no rubric.** `CLAUDE.md` says "Never add libraries without justification" but defines no approval process, no pre-approved list, and no definition of what counts as sufficient justification.

7. **Escalation path for missing docs is undefined.** `CLAUDE.md` instructs Claude to "ask for clarification instead of making assumptions" when documentation is missing, but the repository gives no mechanism for how that should happen in an asynchronous/non-interactive session (write questions into a doc? Block entirely? Flag and proceed with placeholders?).

---

## 3. Architectural Risks

1. **Physical structure predates its own specification.** The top-level folders (`portfolio/`, `docs/`, `claude/`, `assets/`, `design/`) were created directly via chat instruction before `021-folder-structure.md` — the document meant to justify and define this structure — has any content. Risk: the structure becomes de facto permanent simply because it exists, rather than because it was the right decision.

2. **Unclear ownership between top-level folders.** `portfolio/` is presumably the application root, but its relationship to sibling `assets/` and `design/` folders is undefined — will the app's actual static assets live in `assets/` at repo root, or inside `portfolio/public`? Same ambiguity for `design/` (design files/tokens?) vs. `006-design-system.md` (written spec). Two folders can easily become two conflicting sources of truth.

3. **Duplicate/unclear authority root.** Both `CLAUDE.md` ("You are the implementation engineer... follow all documentation") and `000-philosophy.md` ("this document takes precedence... highest-level document in the repository") independently claim to be authoritative. Their relationship to each other is not stated — if they ever conflict, there's no documented precedence between them (only 000's precedence over other *docs* is stated, not over `CLAUDE.md`).

4. **`claude/` folder vs. `CLAUDE.md` file.** An empty top-level `claude/` directory exists alongside the root `CLAUDE.md` file, with no stated purpose for the folder. This is a naming collision waiting to cause confusion about where Claude-related material belongs.

5. **Tech stack is the most-depended-on missing decision.** `020-tech-stack.md` is empty, yet folder structure, component library, testing, performance budgets, and deployment all implicitly depend on it. Writing any of those docs before the stack is chosen risks rework.

6. **No versioning/change-control process.** `000-philosophy.md` has a `Version: 1.0 / Status: Active` header, implying a versioning scheme, but nothing defines how changes are proposed, reviewed, or how conflicts between docs get resolved procedurally beyond simple precedence-by-level.

---

## 4. Design Inconsistencies

1. **Overlap risk between `000-philosophy.md` and `002-product-goals.md`.** Philosophy already contains a "Mission" and a "Definition of Success" section — territory that arguably belongs in product goals. Without a clear boundary, `002` risks either duplicating `000` or contradicting it once written.

2. **Persona work already happening informally.** `000-philosophy.md` implicitly assumes a specific persona (a technical evaluator judging engineering maturity) without ever formally defining it in `003-user-personas.md`. The persona is being decided by implication rather than by specification — later formal persona work may not match what's already baked into the philosophy doc.

3. **Page table (in 000) vs. page docs (014–019) numbering mismatch**, as noted in Ambiguities item 3 — this is also a structural inconsistency between two artifacts that are supposed to agree.

---

## 5. Missing Engineering Decisions

- **Framework/runtime:** Not chosen (Next.js, Astro, Vite+React, etc.)
- **Styling approach:** Not chosen (Tailwind, CSS Modules, styled-components, vanilla CSS)
- **Component library strategy:** Not chosen (fully custom vs. headless primitives like Radix/shadcn)
- **Content/CMS model:** Not chosen — Journal and Case Studies imply recurring structured content; unclear if this is hardcoded, MDX-based, or backed by a headless CMS
- **Hosting/deployment target:** Not chosen (Vercel, Netlify, self-hosted, etc.)
- **CI/CD pipeline:** Not defined — no lint/test/build gating specified
- **Testing framework:** Not chosen despite `CLAUDE.md` instructing "write tests where appropriate"
- **Accessibility conformance target:** Not chosen (WCAG 2.1 AA is industry default, but not stated)
- **Analytics/monitoring:** Philosophy demands measurable Core Web Vitals in production, but no tool or method is chosen to actually measure them post-launch
- **Internationalization:** Not addressed — unclear if the site is English-only
- **Resume data source:** Not decided whether resume content is a single source of truth shared with other pages (e.g. Experience) or independently maintained, risking drift

---

## Recommended Sequencing

Given the dependency chains identified above, the following order minimizes rework:

1. `020-tech-stack.md` — nearly everything depends on this
2. `001-vision.md`, `002-product-goals.md`, `003-user-personas.md` — resolve overlap with `000` before writing
3. `004-information-architecture.md` — resolve the page-count mismatch here explicitly
4. `005-design-principles.md`, `006-design-system.md`, `007-responsive-strategy.md`
5. `008-component-library.md`, `009-motion-system.md` + `010-accessibility.md` (write together — these two will conflict if done separately)
6. `011-performance.md`, `012-seo.md`
7. `013-content-strategy.md`, then page docs `014`–`019` (with `016-agentprep.md` requiring a definition of what AgentPrep *is* before anything else)
8. `021-folder-structure.md` — write this against the tech stack decision, then reconcile the already-existing physical folders against it
9. `022-coding-standards.md`, `023-testing.md`, `024-deployment.md`
10. `025-roadmap.md` last — it should sequence everything above, not precede it

No code, components, or UI were written or evaluated as part of this review, per instruction.
