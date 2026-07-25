# Application Behaviour

**Version:** 1.0
**Status:** Active

---

## Relationship to Prior Documents

This document is the behavioural contract for the whole site — how it responds to navigation, reading, media, and edge cases, independent of what it looks like. It is deliberately separate from `006-design-system.md` (visual point of view), `008-component-library.md` (component responsibility), and the not-yet-written Motion System and Accessibility documents (animation specifics and conformance testing, respectively). This document answers *whether a behaviour exists and under what rule* — later documents answer *how it looks* and *how it's verified*.

It is governed by the same guardrail discipline already established in `008-component-library.md`: a behaviour earns a place here only if it serves a concrete need already identified in `002-user-personas.md`, `003-information-architecture.md`, or `004-product-goals.md` — not because it is common on other sites. Several items below are deliberately excluded for exactly this reason.

---

## Decision Rubric

Before any behaviour is included, it must answer yes to both:

1. Does at least one persona's journey (`002-user-personas.md`) genuinely need it, or would its absence create real friction?
2. Is it consistent with every exclusion already established elsewhere (`003-information-architecture.md`'s "What Should Not Exist," `004-product-goals.md`'s Non-Goals and Out of Scope, `006-design-system.md`'s policies)?

If either answer is no, the behaviour is excluded here, explicitly, with the reasoning stated — not silently omitted.

---

## Summary Table

| Behaviour | Included? | Where it applies |
|---|---|---|
| Route transitions | Minimal | Site-wide |
| Scroll reset on navigation | Yes | Site-wide |
| Scroll restoration on back | Yes | Index pages (Case Studies, Journal) |
| Current-page indication | Yes | Navigation (already required by `008-component-library.md`) |
| Breadcrumbs | Yes | Individual Case Study, Journal Article, AgentPrep |
| Previous / Next | Yes (Journal only) | Journal Articles |
| Reading progress | Yes | Case Studies, AgentPrep, Journal Articles |
| Estimated reading time | Yes | Case Studies, AgentPrep, Journal Articles |
| Table of contents | Yes | Case Studies, AgentPrep |
| Anchor links per section | Yes | Case Studies, AgentPrep |
| Image / diagram zoom | Yes | Anywhere a Metric / Evidence Block image appears |
| Code blocks (highlighting + copy) | Yes | Case Studies, AgentPrep, Journal |
| Video | Not currently required | — |
| Theme switching | Yes, with system default | Site-wide |
| Keyboard shortcuts (bespoke) | No | — |
| Copy button (email) | Yes | Contact |
| External link handling | Yes (new tab, marked) | Site-wide |
| 404 / not-found page | Yes | Site-wide |
| Empty states | Yes | Journal, Case Studies, AgentPrep sections with no content yet |
| Loading states | Minimal | Only where a real async action exists |
| Search | No | — (already excluded, `003-information-architecture.md`) |
| URL stability | Yes | Site-wide, especially Case Studies and Journal Articles |

---

## 1. Navigation Behaviour

- **Route transitions.** Kept minimal — a subtle, brief transition at most, present only if it helps a visitor understand that navigation occurred, per `005-design-principles.md`'s "motion should communicate, not decorate." No elaborate page-transition choreography; it would not pass that test.
- **Scroll position on navigation.** Navigating to a new page resets scroll to the top — a visitor arriving at a new page should start at its beginning, not wherever the previous page happened to be scrolled to.
- **Scroll restoration on back navigation.** Returning to an index page (Case Studies, Journal) after opening an entry restores the visitor's prior scroll position, so browsing a list isn't punished by losing your place.
- **Current-page indication.** Already required of the Navigation component (`008-component-library.md`, Section 1) — restated here only to confirm it is a behavioural, not purely visual, requirement: it must be programmatically available, not colour-only.
- **Breadcrumbs.** Included only on link-discovered pages — individual Case Studies, Journal Articles, and AgentPrep (`003-information-architecture.md`, Section 4) — since these pages sit one level below primary navigation and a visitor needs a stated way back to their index. Not included on primary navigation pages, which already have persistent top-level navigation.
- **Previous / Next.** Included for Journal Articles only, encouraging the continued reading that serves the Fellow Engineer persona (`002-user-personas.md`). Not included for Case Studies: case studies are not written as a sequential series, and imposing an artificial order would contradict `015-case-studies.md`'s standard that each stands as its own evidence, not a chapter in a story.

---

## 2. Reading Behaviour

- **Reading progress.** Shown on long-form, top-to-bottom content: Case Studies, AgentPrep, and Journal Articles. Not shown on Homepage, Resume, Experience, or Contact, which are scannable rather than sequentially read (`005-design-principles.md`, Section 3 on typography, and `014-homepage.md`/`018-resume.md` on scan-first design).
- **Estimated reading time.** Shown at the top of Case Studies, AgentPrep entries, and Journal Articles — directly serving the time budgets already established per persona (`002-user-personas.md`): an Engineering Manager deciding whether to invest their 10–15 minute allowance should know the cost before committing to it, not after starting.
- **Table of contents.** Included for Case Studies and AgentPrep, built directly from their fixed section structures (`015-case-studies.md`, `016-agentprep.md`) — this lets a time-constrained visitor jump straight to Key Technical Decisions or Current State rather than reading linearly. Not included for Journal entries, which are short enough (`017-journal.md`, Section 5) that a table of contents would add more clutter than it saves reading time.
- **Anchor links per section.** Included wherever a table of contents exists (Case Studies, AgentPrep) — every fixed section is independently linkable, so a specific piece of reasoning (e.g. a Trade-off) can be shared or referenced directly, serving the Fellow Engineer persona's tendency to arrive at or share one specific piece of content rather than a whole page.

---

## 3. Media Behaviour

- **Images and diagrams.** Every image on the site is, by `006-design-system.md`'s illustration and photography policies, either a real screenshot or a real diagram — there is no decorative imagery to make a behavioural exception for. Any such image supports zoom-to-full-size on interaction, since evidence artifacts (Metric / Evidence Blocks, `008-component-library.md`, Section 8) must be inspectable at full detail, not just at thumbnail size.
- **Code blocks.** Where Case Studies, AgentPrep, or Journal entries include code, it is rendered with syntax highlighting and the monospace typeface established in `006-design-system.md`, Section 4, with a copy-to-clipboard control on every block — a low-cost affordance for the Fellow Engineer persona who may want to reuse a specific snippet.
- **Video.** No page specification (`014`–`019`, `026`) currently requires video content. No video behaviour is defined; if a future need arises, it must be justified against the Decision Rubric first, and would still be bound by `006-design-system.md`'s "no stock/decorative media" standard — a demonstration of real, shipped work, not produced footage.

---

## 4. Global Behaviour

- **Theme switching.** The site defaults to the visitor's system preference (`006-design-system.md`, Section 3, treats light and dark as equally first-class) and offers a manual override that persists across visits. A manual override is included because it directly serves any visitor whose system preference doesn't match their actual reading preference in the moment — a low-complexity addition that earns its place.
- **Keyboard shortcuts (bespoke).** Not included. No persona in `002-user-personas.md` is a returning power user memorizing site-specific shortcuts across many visits — every visitor journey in `003-information-architecture.md` is a short, one-time-per-goal visit. Standard keyboard accessibility (tab order, focus visibility, activation via Enter/Space) is still mandatory per `005-design-principles.md`, Section 5 — this exclusion is specifically about custom shortcut layers (e.g. a "/" hotkey), not basic keyboard operability.
- **Copy button (contact email).** Included on the Contact page as a small, low-cost convenience for the audiences named in `019-contact.md`, Section 2.
- **External link handling.** Links leading away from the portfolio (LinkedIn, GitHub, external references within a Case Study or Journal entry) open in a new tab and are marked as external, so a visitor doesn't lose their place mid-read. Internal links always navigate within the same tab — there is no reason to interrupt a visitor's continuity within the site itself.
- **404 / not-found page.** Included, and must never be a dead end (`005-design-principles.md`, Section 5): it states plainly that the page wasn't found and offers the primary navigation destinations, in the same calm, restrained voice as the rest of the site (`006-design-system.md`, Section 1) — not a joke or a stylistic set-piece that contradicts that personality.
- **Empty states.** Where a section genuinely has little or no content yet (a new Journal with few entries, an early Case Studies index, AgentPrep's Roadmap or Experiments before much has happened), the empty or sparse state is shown honestly, stated as such, never disguised with placeholder or filler content — consistent with `001-vision.md`'s rejection of "placeholder or aspirational content" as a measure of success.
- **Loading states.** Kept minimal, because the site has very little asynchronous interaction by design — `019-contact.md` deliberately excludes a contact form, and `003-information-architecture.md` excludes search. Where any real async action does exist, feedback must be immediate and unambiguous, per `005-design-principles.md`, Section 5's interaction rules — no action is left to look unresponsive while it completes.
- **Search.** Not included. This reaffirms, rather than revisits, the exclusion already made in `003-information-architecture.md`, Section 6: no persona journey requires it, and adding it here would contradict a decision already made elsewhere in this documentation set.
- **Stable URLs.** Once a page, Case Study, or Journal Article is published at a URL, that URL remains stable. If content is renamed, restructured, or moved, a redirect is used rather than allowing the old URL to break. This matters specifically because `002-user-personas.md`'s Fellow Engineer persona arrives via shared links (LinkedIn, direct shares) rather than through the site's own navigation, and `001-vision.md`'s long-term vision treats the portfolio as a durable, accumulating record — a broken link to a previously shared piece of evidence directly undermines both.

---

## Review Checklist

- [ ] Every included behaviour above traces to a specific persona need or an already-established document — not general convention.
- [ ] Every excluded behaviour states its reasoning, rather than being silently absent.
- [ ] No behaviour in this document contradicts an exclusion already made in `003-information-architecture.md`, `004-product-goals.md`, or `006-design-system.md`.
- [ ] Reading-support behaviours (progress, time estimate, TOC, anchors) are scoped only to long-form content types, not applied to scannable pages where they would add clutter.
- [ ] No behaviour here duplicates a decision that belongs in Motion System or Accessibility once those documents exist — this document states policy, not animation timing or conformance testing.
- [ ] No published page, Case Study, or Journal Article URL is removed or changed without a redirect in place.

---

## What This Document Is Not

This document does not specify animation durations or easing (reserved for `009-motion-system.md`), accessibility conformance testing (reserved for `010-accessibility.md`), visual styling (`006-design-system.md`), or implementation technology. It defines what the application does and under what rule — those later documents define how precisely that behaviour is achieved and verified.
