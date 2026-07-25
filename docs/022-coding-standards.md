# Coding Standards

**Version:** 1.0
**Status:** Active

---

## 1. Purpose

`020-tech-stack.md`, Section 3 already commits to automated formatting and static analysis — mechanical consistency (semicolons, quote style, line length) is a build-time guarantee, not a judgment call. This document does not repeat what a formatter or linter already enforces. It captures what no tool can infer: the engineering judgment a code reviewer applies that a formatter cannot — how code should be structured, named, and evolved so it stays legible long after the requirement that produced it is forgotten.

---

## 2. Coding Philosophy

> **Code is written to minimise future ambiguity, not merely to satisfy today's requirements.**

The primary future reader of this code is the same single author (`004-product-goals.md`'s constraint), returning to a file months or years later with far less working memory of it than they have today. Code that only needs to work today, read by someone who still remembers writing it, is not held to this standard.

This principle is the same "one job" discipline already established at every other level of this documentation — `000-philosophy.md`'s one job per page, `008-component-library.md`'s one responsibility per component — now applied to the function and module level:

- **Prefer explicitness over cleverness.** A shorter, cleverer solution that requires re-deriving its own intent later costs more than it saves.
- **Optimise for readability before brevity.**
- **One exported responsibility per module**, where practical — the same discipline `008-component-library.md` already applies to components, extended to utilities and helpers.
- **A function should have a single, obvious purpose.** If describing what a function does requires "and," it likely has two responsibilities, not one.
- **Favour composition over inheritance.**
- **Avoid premature abstraction.** A "rule of three" applies: shared code is extracted only after a genuine third occurrence, never speculatively — the same discipline `008-component-library.md`'s two-page guardrail already applies to components, extended to any shared code.
- **Treat TypeScript errors as design feedback, not obstacles to suppress.** A type error usually reveals a real ambiguity in the code's contract that is cheaper to resolve now than to silence and rediscover later.

---

## 3. TypeScript Standards

Builds on `020-tech-stack.md`, Section 3's decision to use TypeScript with strict type checking:

- Strict mode is non-negotiable — it is never relaxed locally to make something compile faster.
- `any` is an admission that something wasn't modeled correctly. It is used only with a comment stating why no better type exists, never as a default escape hatch.
- Types describe the actual domain this specification already names — a Case Study, a Journal Entry's category (`017-journal.md`, Section 4), a content lifecycle stage (`013-content-strategy.md`, Section 9) — rather than inventing a parallel, generic vocabulary in code.
- Where a value has a small, fixed set of real states (e.g. Draft / Published / Updated / Retired), a discriminated union is preferred over a boolean flag or a loose string — the type system should make an invalid state (e.g. "published" and "draft" simultaneously) unrepresentable, not merely discouraged by convention.

---

## 4. Component Standards

- A component's implementation must match the responsibility already defined for it in `008-component-library.md` — content ownership boundaries are enforced in code, not only in documentation. A component that starts accepting props for content outside its stated ownership is a signal to revisit the specification, not to quietly expand the component past its one job.
- Props are minimal and explicit — a component's props are its actual contract. A sprawling options object or an `any`-typed props bag is a sign the component is doing more than the one responsibility `005-design-principles.md`, Principle 8 allows it.
- No component is created for a single page's need until `008-component-library.md`'s two-page guardrail is genuinely met. This document does not relax that rule for the sake of implementation convenience — it is enforced at the point of writing code, exactly as it was at the point of writing the specification.

---

## 5. Server vs. Client Component Rules

Builds on `020-tech-stack.md`, Section 8:

- Every component defaults to a Server Component. A `"use client"` directive is added only when a component genuinely needs the interactivity already enumerated in `027-application-behaviour.md`, and the reason should be evident from the component itself — it manages local state, or attaches an event handler — not merely declared without cause.
- Interactivity is pushed as far down the component tree as possible. A page or layout never becomes a Client Component because one small piece of it needs interactivity — that piece is isolated into its own small Client Component, keeping everything around it on the server.
- A Client Component never fetches or holds content data it could instead receive from a Server Component parent. Content flows down from server-rendered data; interactivity is layered on top of it, never the reverse.

---

## 6. File and Module Organisation

- A component's folder (`021-folder-structure.md`) holds everything specific to that component — its implementation, its own small helpers, its own types. Logic moves to `lib/` only once it is genuinely needed by more than one component, per Section 2's rule-of-three discipline.
- A file's location should make its responsibility identifiable without opening it — `021-folder-structure.md`'s naming convention, enforced at the point of adding a new file, not only at the point of planning the folder tree.
- Content and code are never mixed: an MDX file under `content/` never contains component implementation, and a component never contains hardcoded page-specific prose that belongs in `content/` instead.

---

## 7. Naming Conventions

Beyond `021-folder-structure.md`'s mechanical case conventions, naming is a judgment call this document governs directly:

- A name describes what something is responsible for, not how it's implemented — the same responsibility-first naming already used throughout `008-component-library.md` (`MetricEvidenceBlock`, never `ChartBox`).
- Vague, catch-all names (`data`, a `utils` file used as a dumping ground, `Manager`, `Handler`) are avoided — if a name could plausibly apply to almost anything, that's a sign the thing it names doesn't have the single, obvious purpose Section 2 requires.
- A name changes only when the responsibility it names changes, not when the implementation details behind it change.

---

## 8. Error Handling

Per `027-application-behaviour.md`, Section 4, this site has very little error-handling surface by design — minimal loading states, no contact form, no search. This section governs what does exist, not a defensive apparatus built for scenarios the product doesn't have:

- Errors are handled at the boundary where they can actually occur — content loading or parsing, an external link, a copy-to-clipboard failure — not defensively wrapped around code that cannot realistically fail, which only adds noise.
- A caught error is either recovered from visibly (`027-application-behaviour.md`'s 404 page) or surfaced honestly. An error is never silently swallowed in a way that leaves a visitor, or the author, unaware something failed.
- A build-time error (a malformed MDX file, a missing required field on a Case Study) is preferred over a runtime one wherever the tech stack allows catching the problem before deployment — the same standard `011-performance.md` already applies to performance regressions, applied here to correctness: a broken build blocks release rather than shipping a silent failure.

---

## 9. Dependency Usage

This section restates `020-tech-stack.md` and `011-performance.md`'s dependency policies as practice at the point of writing code, rather than re-litigating them:

- Before adding an import, check whether the platform (Next.js), the language's standard library, or an already-installed dependency already solves the problem — per `020-tech-stack.md`, Section 10.
- A new dependency is evaluated against `011-performance.md`, Section 11's Performance Budget Ownership before it is added to the project, not after a change is already built around it.
- A dependency used in exactly one place is a candidate for a small local implementation instead, per Section 2's rule-of-three discipline — depending on a package to avoid writing a small amount of code is not automatically the cheaper choice once its ongoing maintenance and bundle cost are counted.

---

## 10. Documentation Expectations

- Code is self-explanatory through naming and structure first. A comment is added only to capture something the code cannot express on its own — a non-obvious constraint, a workaround for a specific issue, or the reason a simpler approach was rejected.
- A component's relationship to its specification (`008-component-library.md`) is referenced in code only where that connection genuinely isn't obvious from the component's name and folder location alone.
- No block comment narrates what a function does line by line. If a function needs that much narration to be understood, its structure — not the missing comment — is the actual problem to fix.

---

## Review Checklist

- [ ] Every function and module has a single, describable purpose (Section 2).
- [ ] No `any` appears without a comment explaining why no better type exists (Section 3).
- [ ] A fixed set of real states is modeled as a discriminated union, not a boolean flag or loose string (Section 3).
- [ ] Every component's props match its stated content ownership in `008-component-library.md` (Section 4).
- [ ] No component was created for a single page's need without meeting the two-page guardrail (Section 4).
- [ ] `"use client"` appears only where genuine interactivity requires it, and only as low in the component tree as possible (Section 5).
- [ ] No file mixes content and code (Section 6).
- [ ] No name is vague enough to apply to more than one real responsibility (Section 7).
- [ ] Every dependency added was checked against `011-performance.md`, Section 11 before being added (Section 9).
- [ ] Every comment explains something the code itself cannot — no comment narrates what the code already says (Section 10).

---

## What This Document Is Not

This document does not define formatting rules, linter configuration, or specific tool choice — those are the automated, mechanical layer already committed to in `020-tech-stack.md`, Section 3. It defines the judgment layer that sits above that tooling: decisions a formatter cannot make and a linter cannot fully enforce.
