# Responsive Strategy

**Version:** 1.0
**Status:** Active

---

## Relationship to Prior Documents

`006-design-system.md`'s Grid Philosophy already establishes that "the same underlying grid reflows across breakpoints rather than being replaced by a structurally different layout." This document is that principle made complete: it answers one question only —

> **How does the same product adapt across different devices without becoming a different product?**

It governs how the pages (`014`–`019`, `026`), the components (`008-component-library.md`), and the behaviours (`027-application-behaviour.md`) already specified hold up at any viewport size. It does not introduce new content, new pages, or new components — everything here is the same product, differently arranged.

---

## 1. Core Principle

**Responsive design is not permission to remove information.**

A mobile visitor must receive the same evidence, the same decisions, and the same content as a desktop visitor — the Engineering Manager persona's journey (`002-user-personas.md`) does not become a lesser journey because they opened the site on a phone. What is allowed to change is arrangement, density, and interaction pattern; what is never allowed to change is substance.

This deliberately separates two things that are often conflated:

- **Mobile-first as an engineering discipline** — designing for the most constrained case first, then progressively enhancing for more space — is encouraged, consistent with `005-design-principles.md`'s "progressive disclosure" and this portfolio's performance-as-a-feature stance (`000-philosophy.md`).
- **Mobile-first as an excuse to cut content** — trimming a Case Study's Trade-offs, hiding AgentPrep's Experiments, or truncating a diagram because "mobile users won't read that much" — is explicitly rejected. Every page's required sections (`015-case-studies.md`, `016-agentprep.md`, `018-resume.md`, and the rest) are required at every viewport size, without exception.

---

## 2. Breakpoint Philosophy

Breakpoints exist to preserve the reading and scanning experience at the device's actual width — not to hide or reveal different content. Per `006-design-system.md`'s Grid Philosophy, there is one grid and one set of components; a breakpoint is a rule for how that same grid reflows, never a fork into a separate mobile layout with different content decisions made independently.

No specific pixel values are defined here — that is an implementation detail. The principle governing every breakpoint is: **content must remain complete, legible, and in the correct hierarchy (`005-design-principles.md`, Section 2) at every width the site supports.**

---

## 3. Navigation Adaptation

All six primary navigation destinations (`003-information-architecture.md`, Section 3) remain reachable at every viewport size. The *presentation* of navigation may change — for example, collapsing into a single menu control on a narrow screen instead of a persistently visible bar — but this is a reflow of the same component, not a new variant in the sense `008-component-library.md`, Section 1 prohibits: the content ownership (exactly six items, current-page indication) does not change, only the arrangement does.

Breadcrumbs and Previous/Next (`027-application-behaviour.md`, Section 1) remain present at every size, potentially in a more compact presentation, but never removed.

---

## 4. Long-Form Reading on Small Screens

Case Studies, AgentPrep, and Journal Articles must remain fully readable on a small screen — no section is deferred to "read this on desktop." Specifically:

- The Table of Contents (`027-application-behaviour.md`, Section 2) may collapse into a compact control (e.g. an expandable list at the top of the article) rather than a persistent sidebar, but every section it links to remains one tap away.
- Reading progress and estimated reading time remain visible; they are cheap to show and directly serve the same time-budget need on mobile as on desktop (`002-user-personas.md`).
- Typography hierarchy (no more than three levels, per `005-design-principles.md`, Section 3) holds at every width — a narrow viewport is a reason to adjust line length, not a reason to invent a fourth visual weight to compensate for it.

---

## 5. Tables, Diagrams, and Evidence Blocks

No Metric / Evidence Block (`008-component-library.md`, Section 8) is cropped, truncated, or omitted on a smaller screen. Specifically:

- A diagram that cannot remain legible at a narrow viewport's width must support zoom or pan (`027-application-behaviour.md`, Section 3) rather than being shrunk past the point of legibility or hidden behind a "view on desktop" message.
- Any tabular data scrolls within its own bounded container rather than truncating columns or dropping data — the visitor sees the same table, not a subset of it.
- A required diagram (`015-case-studies.md`, Section 4; `016-agentprep.md`, Section 5) is still required at every viewport — there is no "simplified mobile version" of a case study that quietly drops its evidence.

---

## 6. Images and Code Blocks

- Images and diagrams scale to fit the available width while remaining zoomable for full detail, consistent with Section 5.
- Code blocks (`027-application-behaviour.md`, Section 3) scroll horizontally within their own container rather than wrapping in a way that breaks code semantics or truncating lines. The copy-to-clipboard control remains available at every viewport size.

---

## 7. Touch Interaction Rules

- **No interaction may depend on hover.** `005-design-principles.md`, Section 5 already prohibits hiding required content behind an interaction a keyboard or screen-reader user can't trigger; touch devices have no hover state at all, so this rule extends directly — anything revealed on hover on a larger screen must have an equivalent, always-available or tap-triggered path on a touch device.
- Every interactive element must be sized and spaced for reliable touch activation, without accidentally triggering an adjacent control.
- Interaction feedback (`005-design-principles.md`, Section 5) must be immediate on touch just as on pointer input — a visitor must never be left wondering whether a tap registered.

---

## 8. Performance Considerations Unique to Mobile

Per `000-philosophy.md`, performance is a feature, not an afterthought, and per `004-product-goals.md`, this applies to every visitor, not a desktop-first majority. Specifically:

- Images and diagrams are delivered appropriately sized for the requesting viewport — a mobile visitor should not pay the bandwidth cost of a desktop-sized asset to display a smaller one.
- Motion and interaction (governed fully once `009-motion-system.md` exists) must remain equally restrained on mobile hardware — nothing here introduces heavier client-side behaviour for smaller screens than for larger ones.
- Mobile is not treated as a secondary or degraded experience tier for performance purposes — the same Core Web Vitals expectations implied by `000-philosophy.md` and `004-product-goals.md` apply regardless of device.

---

## 9. What Must Never Disappear on Smaller Screens

- Any of the six primary navigation destinations (`003-information-architecture.md`).
- Any required section of a Case Study or AgentPrep entry (`015-case-studies.md`, `016-agentprep.md`).
- Any Metric / Evidence Block, diagram, or piece of required evidence (Section 5).
- Any Decision / Trade-off Block (`008-component-library.md`, Section 9) and the alternative or cost it states.
- Reading aids on long-form content — reading progress, estimated reading time, and access to the Table of Contents (in whatever compacted presentation).
- All three Contact Methods (`019-contact.md`, Section 4).
- Code block copy controls (`027-application-behaviour.md`, Section 3).

---

## 10. What May Legitimately Change

- Layout arrangement — single-column versus multi-column, stacked versus side-by-side.
- Information density and whitespace scale, within the bounds `005-design-principles.md`, Section 4 already sets.
- Navigation's presentation pattern (persistent bar versus collapsible control), provided all six destinations remain reachable.
- The Table of Contents's presentation (persistent sidebar versus a compact, expandable control).
- Diagram and image interaction pattern (static display on a large screen versus tap-to-zoom on a small one).
- Any hover-based secondary affordance, replaced by an equivalent tap-based one (Section 7) — the affordance's existence doesn't change, only how it's triggered.

---

## Review Checklist

- [ ] Every required section of every page (`014`–`019`, `026`) is present and complete at every viewport size.
- [ ] No evidence artifact (metric, diagram, trade-off, decision) is cropped, truncated, hidden, or deferred to a larger screen.
- [ ] All six primary navigation destinations remain reachable, regardless of presentation pattern.
- [ ] No interaction anywhere on the site depends on hover with no touch-equivalent path.
- [ ] Reading aids (progress, time estimate, TOC access) remain present on long-form content at every size.
- [ ] Images and diagrams remain legible at every width, via appropriate sizing or zoom, never by shrinking past legibility.
- [ ] Every persona journey in `003-information-architecture.md`, Section 5 remains completable, end to end, on a small screen.

---

## What This Document Is Not

This document does not define specific breakpoint pixel values, CSS or layout implementation, or animation behaviour (reserved for `009-motion-system.md`). It defines the principle every implementation-stage breakpoint decision must satisfy — that the product remains whole, only differently arranged, at any size.
