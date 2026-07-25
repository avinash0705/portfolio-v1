# Tech Stack

**Version:** 1.0
**Status:** Active

---

## 1. Purpose

Every document so far has defined what the product must do and what quality bar it must meet, without naming a technology. This document is the first to make binding implementation decisions — it names the runtime, rendering strategy, styling approach, content model, and hosting assumptions that every remaining implementation-facing document (`021-folder-structure.md`, `022-coding-standards.md`, `023-testing.md`, `024-deployment.md`) depends on.

This document is written as an Architecture Decision Record: not just what was chosen, but why, and what was deliberately not chosen. A decision without a rejected alternative is not yet a decision — it's just a default.

---

## 2. Architectural Principles

Every choice below is filtered through the same set of constraints already established elsewhere in this documentation, rather than general technology preference:

- **Static and server-rendered over client-rendered**, per `011-performance.md`'s loading strategy — a visitor receives real content immediately, not a shell waiting on JavaScript.
- **Minimal dependencies, each individually justified**, per `000-philosophy.md`'s "never add libraries without justification" and `011-performance.md`, Section 11's Performance Budget Ownership.
- **Sustainable for a single author**, per `004-product-goals.md`'s single-author constraint — favoring boring, well-supported technology with a long maintenance horizon over novel tooling that trades short-term velocity for long-term risk.
- **Content lives in the repository, not behind a third-party service** — consistent with `001-vision.md`'s treatment of the portfolio as a durable, self-contained, long-term record.

---

## 3. Runtime, Framework, and Language

**Decision: Next.js (App Router), using React Server Components by default.**

Next.js is chosen over the alternatives evaluated in Section 11 because it supports fully static, server-rendered output (satisfying `011-performance.md`) while giving the small number of genuinely interactive elements identified in `027-application-behaviour.md` (theme toggle, copy buttons, image zoom, TOC, mobile navigation) a natural, incrementally-adoptable path to client-side interactivity — without requiring the whole site to be a client-rendered application.

**Decision: TypeScript, with strict type checking, for all application code.** JavaScript is not used directly. Strong static typing supports long-term maintainability for a single-author project (`004-product-goals.md`) and makes the architectural intent recorded throughout this documentation harder to accidentally drift away from during implementation.

**Decision: source formatting and static analysis are enforced automatically, not by manual discipline.** The specific tools and rules belong to `022-coding-standards.md`; the principle established here is that consistency is a build-time guarantee, not something a single author is expected to maintain by memory alone.

---

## 4. Rendering Strategy

**Decision: Static Site Generation (SSG) for every page, rebuilt on publish.**

Every page defined in `014-homepage.md` through `019-contact.md`, plus `026-experience.md`, is pre-rendered to static HTML at build time. This is a direct match for the content's actual update pattern: a single author publishing new Case Studies, Journal entries, and AgentPrep updates, not per-request dynamic or personalized data. Static output is deployed to a CDN/edge network, which is what makes `011-performance.md`'s LCP target realistically achievable rather than aspirational.

No page in this specification requires per-request server rendering — there are no user accounts, no personalization, and no dynamic data source anywhere in `003-information-architecture.md`'s sitemap. If that ever changes, this decision must be revisited explicitly, not silently worked around.

---

## 5. Styling Strategy

**Decision: Tailwind CSS.**

Styling is resolved at build time, not at runtime — directly protecting `011-performance.md`'s JavaScript budget, since a runtime CSS-in-JS approach would add client-side cost this site has no reason to pay. Tailwind's utility-first model is also a reasonable fit for a single-author project (`004-product-goals.md`): styling decisions stay colocated with markup rather than requiring a parallel stylesheet architecture to maintain. The qualitative design system already specified in `006-design-system.md` (colour philosophy, spacing rhythm, typography) becomes Tailwind's configuration — this document does not define those values; `006-design-system.md` still governs what they must express.

---

## 6. Content Strategy

**Decision: Content lives in the repository as MDX, not in a headless CMS.**

Case Studies, AgentPrep updates, and Journal entries are authored as MDX files versioned in the same repository as the code. This is a direct match for `013-content-strategy.md`'s revision policy and lifecycle model (Section 9): a file's git history *is* its revision history, a draft is simply a file not yet merged or published, and "retired" content is a real, auditable removal rather than a status flag inside a third-party system. It also matches `001-vision.md`'s requirement that the portfolio remain a durable, self-contained record — content is never dependent on a third-party service remaining available or affordable.

---

## 7. State Management

**Decision: No global state management library. Local component state and URL state only.**

Nothing in this specification requires shared client-side state — there are no user accounts, no multi-step flows, and no cross-page client data (per `003-information-architecture.md`'s sitemap and `027-application-behaviour.md`'s behaviour list). A theme preference (`027-application-behaviour.md`, Section 4) is the only piece of state that persists across a visit, and it does not require a dedicated state management dependency to do so.

---

## 8. Component Strategy

**Decision: Server Components by default; Client Components only for the specific interactive islands already identified in `027-application-behaviour.md`.**

This directly implements `011-performance.md`, Section 9's rule that interactivity is scoped only to what actually needs it. The interactive surface of this entire site is small and already fully enumerated elsewhere in this documentation: theme toggle, copy-to-clipboard controls, image zoom, Table of Contents behaviour, and mobile navigation (`027-application-behaviour.md`). Everything else — every page's actual content — ships as non-interactive, server-rendered markup with no client-side JavaScript cost.

---

## 9. Build / Deployment Assumptions

**Decision: Deployed on a platform with first-party Next.js support and a global edge network (e.g. Vercel), rebuilt on every publish.**

This assumption is what makes the static rendering strategy in Section 4 operationally sustainable for a single author (`004-product-goals.md`): a publish is a commit, a commit triggers a rebuild, and the result is served from an edge network without any server the author has to operate or patch. Full deployment configuration is the subject of `024-deployment.md`; this section only establishes the assumption the rest of the stack is built on.

---

## 10. Dependencies Policy

Every dependency added to this project must satisfy `011-performance.md`, Section 11's Performance Budget Ownership before anything else: it must be able to live inside the budgets already defined, or it is not added, regardless of how useful it would otherwise be. Beyond that:

- A dependency is added only to solve a real, specified need — never speculatively, per `000-philosophy.md`.
- A framework or platform built-in is preferred over a third-party package wherever one exists and is sufficient.
- Every dependency is understood well enough by the author to be maintained solo, per `004-product-goals.md`'s single-author constraint — a dependency that requires specialized ongoing expertise the author doesn't have is a liability, not a convenience.

---

## 11. Rejected Alternatives

- **Astro.** Seriously considered, and arguably an equally strong technical fit given its zero-JS-by-default output, which would satisfy `011-performance.md`'s JavaScript budget just as well. Rejected in favour of Next.js for two reasons specific to this project: first, React Server Components give this site one unified component model for both static content and interactive islands, rather than Astro's two-model approach (Astro components plus a separate island framework) — a meaningful simplification for the single-author maintenance this site depends on (`004-product-goals.md`). Second, Next.js is widely used in the kinds of production engineering environments this portfolio's case studies and journal entries discuss — choosing it keeps the implementation representative of the ecosystem the intended audience (`002-user-personas.md`) actually works in, while still satisfying every technical constraint this project has already established.
- **Gatsby.** Rejected as effectively legacy for a new project: its GraphQL data layer solves a data-sourcing problem this site doesn't have, adds real complexity for no corresponding benefit, and the ecosystem has broadly moved toward the rendering approaches Next.js and Astro represent. Choosing it today would mean adopting technical debt on day one.
- **A pure client-side React SPA.** Rejected outright — it would directly violate `011-performance.md`'s loading strategy (content assembled client-side after a blank shell, rather than pre-rendered) and would undermine `012-seo.md`'s discoverability requirements, since content would not be present in the initial HTML response. This is precisely the problem Next.js's static rendering already solves.
- **A headless CMS (e.g. Contentful, Sanity).** Rejected because content here is authored by exactly one person who is already comfortable writing MDX directly in the repository (`004-product-goals.md`'s single-author constraint). A CMS adds a third-party dependency, a subscription or vendor-lock-in risk, and an API layer that provides no benefit over git-tracked files — and git history already gives `013-content-strategy.md`'s revision policy a real, auditable record for free.
- **CSS-in-JS (e.g. styled-components, Emotion).** Rejected due to runtime cost that would work directly against `011-performance.md`'s JavaScript budget — styling should cost nothing at runtime on a site this content-heavy and interaction-light.
- **A global state management library (e.g. Redux, Zustand).** Rejected as solving a problem this specification does not have — see Section 7.
- **Self-hosted infrastructure.** Rejected given `004-product-goals.md`'s single-author constraint — operating and patching a server is an ongoing cost this project has no reason to take on when a managed static/edge platform serves the same rendering strategy without it.

---

## Review Checklist

- [ ] Every implementation decision in this document traces to a constraint already established elsewhere in this documentation (performance, single-author sustainability, content durability), not general technology preference.
- [ ] Every rejected alternative states a specific reason tied to this project's actual requirements, not a generic comparison.
- [ ] No page in `003-information-architecture.md`'s sitemap requires a rendering approach other than static generation (Section 4); if one ever does, this document is revisited explicitly.
- [ ] The interactive surface of the site remains limited to what `027-application-behaviour.md` already enumerates (Section 8); anything beyond that is a signal to revisit this document, not to quietly add a client component.
- [ ] Every dependency added since this document was written has been checked against `011-performance.md`, Section 11 before being added.

---

## What This Document Is Not

This document does not specify folder structure (`021-folder-structure.md`), coding conventions (`022-coding-standards.md`), testing setup (`023-testing.md`), specific deployment configuration (`024-deployment.md`), or exact package versions. It makes the architectural decisions those documents build on, and records why the alternatives to each were not chosen.
