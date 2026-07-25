# Design Principles

**Version:** 1.0
**Status:** Active

---

## Relationship to Philosophy and Prior Documents

`000-philosophy.md` already states design *values* — the interface should feel calm, whitespace should create clarity, design should disappear behind content. Those are aspirational qualities, not decisions an implementer can check their work against.

This document translates those values into **actionable rules**: things a specific screen, component, or interaction can pass or fail. It does not restate the values from Philosophy, and it does not yet define colours, type scale, spacing units, breakpoints, or components — those belong to `006-design-system.md` and later documents. This document defines the *rules those tokens must obey*, not the tokens themselves.

Every rule below must be actionable: if a rule cannot be used to say "this specific design decision violates it," it does not belong in this document.

---

## 1. Core Design Principles

1. **Clarity over novelty.** If a novel visual solution and a familiar one communicate equally well, the familiar one wins. Novelty is only justified when it measurably improves comprehension or speed of understanding.
2. **Content leads, visuals support.** No visual treatment may be added to a page before the content it supports has been written. If a design element has nothing specific to support, it is removed.
3. **Consistency over creativity.** The same kind of element (a heading, a card, a link, a label) must look and behave the same way everywhere it appears. A one-off treatment requires a documented reason, not just aesthetic preference.
4. **Whitespace is intentional.** Every gap in a layout must be attributable to a specific purpose — separating unrelated content, grouping related content, or giving a dense section room to breathe. Whitespace that exists only because "it looked empty otherwise" is not intentional.
5. **Progressive disclosure.** A page shows only what the persona at that point in their journey (`003-information-architecture.md`) needs to decide their next action. Detail beyond that is one click away, not on the surface.
6. **Accessibility by default, not as a pass.** A design is not considered complete until it works for keyboard-only and screen-reader use. Accessibility is not a review step performed after a design is otherwise finished.
7. **Motion should communicate, not decorate.** Motion is only justified if removing it would make the interface harder to understand — e.g. showing where something came from or went to. Motion added purely for polish is not justified.
8. **Every UI element must earn its place.** Before any element is added, it must be possible to name which persona's journey (`002-user-personas.md`) it serves and what would break for them if it were removed. If no answer exists, the element is not added.

---

## 2. Visual Hierarchy

- Hierarchy must be establishable through **size, weight, and position**, in that order of reliance — not through colour alone, since colour-only hierarchy fails for visitors with colour vision deficiencies and fails in any context where colour doesn't render (e.g. printed resume export).
- Each screen must have exactly **one primary focal point** — the single thing the visitor should notice first, matching the "one job" that page has been assigned (`000-philosophy.md`). If two elements compete for first attention, the hierarchy is wrong, not the visitor's attention.
- Hierarchy must remain legible with all colour removed (a greyscale test is a valid way to check this) — if a distinction disappears in greyscale, it was never a hierarchy distinction, only a colour distinction.
- Secondary and tertiary content must be visually subordinate at a glance, without needing to be read, so a persona scanning under time pressure (the Recruiter, per `002-user-personas.md`) can identify what matters without reading everything.

---

## 3. Typography Rules

- Every page must have no more than **three levels** of text hierarchy visible at once (e.g. heading, subheading, body) — additional distinctions must be achieved through grouping and whitespace, not by inventing a fourth visual weight.
- Body text must be optimised for sustained reading, not for filling space — a visitor engaging with a case study (per the Engineering Manager's journey) must be able to read continuously without the text working against them.
- Emphasis (bold, italic, or otherwise) must be used to mark meaning, not to add visual variety — if two pieces of emphasized text don't share a reason for being emphasized, one of them is wrong.
- Headings must describe the content that follows accurately enough that a visitor could decide whether to keep reading from the heading alone — this directly serves the Recruiter and Fellow Engineer personas' time constraints.

---

## 4. Whitespace Rules

- Related elements must be visually closer to each other than to unrelated elements — proximity communicates grouping before any label or divider does.
- Whitespace must increase, not decrease, as content density increases — a dense section (e.g. a technical case study) needs more breathing room around it, not less, to remain readable.
- No two unrelated sections may be separated by the same amount of space used to separate related elements within a section — the amount of space itself must communicate whether things belong together.
- Whitespace must never be used to disguise a missing content decision (e.g. padding added because a section "isn't finished yet") — an incomplete section is a content problem, not a spacing problem.

---

## 5. Interaction Rules

- Every interactive element must have a visibly distinct state for default, hover/focus, and active — a visitor must always be able to tell, without guessing, what is interactive and what state it is in.
- Keyboard focus must be visible and must follow a logical, predictable order matching the reading order of the page.
- No interaction may be the only way to access content required by a persona's journey (`003-information-architecture.md`) — e.g. content must not be hidden behind an interaction (hover-only, JS-only) that a keyboard or screen-reader user cannot trigger.
- Feedback for an action must be immediate and unambiguous — a visitor must never be left wondering whether their click, tap, or submission was registered.
- No interaction may lead to a dead end — every page reachable through interaction must offer a clear next action (per the journeys in `003-information-architecture.md`), never a stop with no path forward.

---

## 6. Motion Rules

- Motion must have a single communicative purpose per instance: indicating a change of state, a spatial relationship, or a direction of navigation. Motion without one of these purposes is decoration and is not permitted.
- Motion must never be the only signal of an important change — if motion were disabled entirely, the visitor must still be able to tell what happened.
- Motion must respect a visitor's reduced-motion preference without exception — this is an accessibility rule (Section 1, Principle 6), not a nice-to-have.
- Motion must never delay a visitor's ability to act — it may accompany a transition, but it must never gate access to content or controls behind a fixed animation duration.
- Specific durations, easing curves, and implementation details belong to `009-motion-system.md`, not here — this document only governs when motion is justified at all.

---

## 7. What This Design Should Deliberately Avoid

- **Novelty for its own sake** — any layout, interaction, or visual pattern whose primary justification is "it looks different" rather than "it communicates better."
- **Decorative animation** — motion added because it is visually pleasing rather than because Section 6 justifies it.
- **Dense, competing visual hierarchies** — screens where more than one element visually claims to be the most important thing.
- **Content-free visual flourishes** — patterns, illustrations, or graphics that do not represent or support real content, per Principle 2.
- **Trend-chasing** — adopting a visual or interaction trend because it is currently popular in design communities, rather than because it serves a persona's need.
- **Dark patterns of any kind** — no interaction may create false urgency, disguise an exit, or manipulate a visitor's action; this would directly contradict "Evidence Over Claims" and the trust this portfolio depends on (`000-philosophy.md`).
- **Accessibility as an afterthought** — retrofitting accessibility onto a design after visual decisions have already been locked in, rather than designing within accessible constraints from the start.

---

## What This Document Is Not

This document does not define colours, typographic scale values, spacing units, breakpoints, or specific components — those are the subject of `006-design-system.md` and later documents. It defines the rules those future decisions must satisfy, not the decisions themselves.
