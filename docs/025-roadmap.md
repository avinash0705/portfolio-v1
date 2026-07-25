# Roadmap

**Version:** 1.0
**Status:** Active

---

## 1. Purpose

Twenty-four documents already define what this portfolio is, why it exists, what it must contain, and what quality bar it must meet before anything ships. This is the last document in that series, and its job is narrow: sequence the implementation of decisions already made, in an order where each phase's output is a valid foundation for the next. It does not evaluate whether those decisions are correct — that evaluation already happened, document by document, with the project owner's approval at each step.

---

## 2. Roadmap Philosophy

> **The roadmap describes the order in which already-approved decisions are implemented; it is not a place where new product decisions are made.**

A backlog invites new ideas. This roadmap does the opposite: if an item in a phase below cannot be traced to a specific, already-approved document, it does not belong here — it belongs as a proposal to revise that upstream document first, per each document's own change-governing rules (e.g. `003-information-architecture.md`'s "What Should Not Exist," `004-product-goals.md`'s Out of Scope). This document is downstream of the specifications; it is never upstream of them.

Phases are sequenced by dependency, not by calendar date. Consistent with `004-product-goals.md`'s single-author constraint, this document does not pretend to schedule availability or velocity — a phase begins when its prerequisites are genuinely done, not when a date arrives.

---

## 3. Phase 1 — Foundation

The walking skeleton: enough real infrastructure to exercise the entire pipeline in `024-deployment.md` end to end, before any page is fully built.

- Project scaffolding per `020-tech-stack.md` and `021-folder-structure.md`.
- TypeScript, formatting, and static analysis configured per `022-coding-standards.md`.
- The design system (`006-design-system.md`) realized as actual Tailwind configuration.
- Root layout, Navigation (`008-component-library.md`, Section 1), theme provider, and the 404 page (`027-application-behaviour.md`) built and deployed.
- The full build pipeline (`024-deployment.md`, Section 3) wired up and passing on this minimal skeleton — every gate exercised for real, even while most content doesn't exist yet.

**Exit criteria:** a real, minimal page is live, deployed through the actual pipeline, with every quality gate genuinely running — not stubbed out to be "filled in later."

---

## 4. Phase 2 — Core Pages

Building each page's structure and components against its specification, independent of whether qualifying real content exists yet to fill them.

- The eleven shared components (`008-component-library.md`), each built against its stated responsibility.
- Homepage (`014-homepage.md`), Experience (`026-experience.md`), Resume (`018-resume.md`), and Contact (`019-contact.md`) — built as real, structurally complete pages.
- Case Studies index and individual page template (`015-case-studies.md`), Journal index and article template (`017-journal.md`), and the AgentPrep page structure (`016-agentprep.md`) — built as templates capable of rendering real content, before that content necessarily exists.
- Responsive behaviour (`007-responsive-strategy.md`) and motion (`009-motion-system.md`) implemented against these real pages.

**Exit criteria:** every page in `003-information-architecture.md`'s sitemap renders correctly, structurally, and responsively — even where it renders placeholder-free but still-thin content.

---

## 5. Phase 3 — Content

Authoring the first real content into the templates Phase 2 built. This phase is governed entirely by documents already written — it does not redefine what qualifies:

- The first Case Study(ies) that genuinely satisfy `015-case-studies.md`, Section 2's qualification criteria — not written to fill the template, written because they qualify.
- The first Journal entries satisfying `017-journal.md`, Section 3's publishing criteria.
- AgentPrep's real Vision, Problem, and Current State (`016-agentprep.md`).
- Real Resume and Experience facts, synchronised per `018-resume.md`, Section 6 and `026-experience.md`, Section 6.

A page template existing (Phase 2) does not obligate content to be published before it genuinely qualifies (`013-content-strategy.md`, Section 3) — an unqualified draft stays a draft, per `013-content-strategy.md`, Section 9.

**Exit criteria:** the site has real, qualifying content behind every page that requires it, with nothing published solely to fill a template.

---

## 6. Phase 4 — Quality Hardening

Verifying the now-complete, content-populated site against every quality attribute this documentation defines — for real, not against a placeholder:

- Full persona-journey verification, by keyboard and screen reader (`010-accessibility.md`, `023-testing.md`, Section 9).
- Performance budgets verified against real content and real images (`011-performance.md`, `023-testing.md`, Section 8).
- SEO metadata, structured data, and sharing metadata verified against real published pages (`012-seo.md`).
- End-to-end persona journeys (`023-testing.md`, Section 9) run against the real site, not a scaffold.

**Exit criteria:** every review checklist in this documentation series — from `010-accessibility.md` through `024-deployment.md` — passes against the real, live site.

---

## 7. Deferred Work

Named explicitly, so this roadmap is never mistaken for an implied backlog of things to add later:

- **Additional Case Studies and Journal entries** beyond the first qualifying batch — this is ongoing editorial work governed by `013-content-strategy.md`, not a roadmap phase with an end date.
- **Search, a contact form, community features, monetisation, or multi-author support** — not deferred in the sense of "later," but rejected, per `003-information-architecture.md`, `004-product-goals.md`, and `019-contact.md`. Their absence from this roadmap is not an oversight.
- **Revisiting the tech stack** (`020-tech-stack.md`) — not planned, and not something this roadmap schedules; it would require reopening that document explicitly, with its own rejected-alternatives reasoning re-evaluated.

---

## 8. Change Policy

A phase's contents may be reordered or adjusted as implementation reveals real constraints — this is normal and does not require re-approval. What does require going back to the relevant document first: adding anything to a phase that is not traceable to an already-approved decision elsewhere in `docs/`. If implementation reveals a genuine need for a new product or design decision, that decision is made in the document it belongs to (Vision, Product Goals, Information Architecture, Design Principles, or whichever is relevant) — and only then reflected here. This roadmap is never the place a new decision is made for the first time.

---

## Review Checklist

- [ ] Every item in every phase traces to a specific, already-approved document — nothing was added here for the first time.
- [ ] Phase 1's exit criteria (a real deployment through the real pipeline) were met before Phase 2 began in earnest.
- [ ] Phase 3 content was published because it qualifies (`015`, `016`, `017`), not because a template was waiting to be filled.
- [ ] Phase 4's verification ran against the real, live site, not a scaffold or placeholder.
- [ ] Nothing in "Deferred Work" has quietly been treated as a future roadmap phase without first revisiting the document that rejected or deferred it.
- [ ] Any change to this roadmap's contents was checked against Section 8 before being made.

---

## What This Document Is Not

This document does not make product, design, or engineering decisions — every decision it sequences was already made and approved in `000` through `024`. It is not a backlog, a schedule with dates, or a place to introduce anything new.
