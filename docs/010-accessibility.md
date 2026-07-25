# Accessibility

**Version:** 1.0
**Status:** Active

---

## 1. Purpose and Relationship to Other Documents

Accessibility rules already exist scattered across this documentation set: `005-design-principles.md` (hierarchy never colour-only, visible keyboard focus, immediate feedback, no interaction-only content), `006-design-system.md` (contrast-independent hierarchy, icons paired with labels), `007-responsive-strategy.md` (no hover-only interaction, touch parity), `008-component-library.md` (per-component accessibility expectations), and `009-motion-system.md` (motion is not information, mandatory reduced-motion support). This document does not repeat those rules. It is where they compose into a single, testable standard, and where the gaps between them — semantic structure, focus management, alternative text policy, error communication, and testing — are closed.

Per `000-philosophy.md`'s "Accessibility by default, not as a pass" (`005-design-principles.md`, Section 1), accessibility is treated here as a **product quality attribute** — as fundamental as whether a page loads — not a compliance checklist applied after design and implementation are otherwise finished.

**The governing test throughout this document:**

> Accessibility is judged by whether every persona can complete their intended journey, not by whether every UI element satisfies an isolated rule.

A page can pass every individual automated accessibility check and still fail this document, if a keyboard-only or screen-reader-using visitor from `002-user-personas.md` cannot actually complete their journey in `003-information-architecture.md`, Section 5. That end-to-end completion is the real acceptance criterion everything below serves.

---

## 2. Guiding Principles

- **Accessibility by default**, per `005-design-principles.md` — never retrofitted after visual or interaction decisions are already locked in.
- **Journey completion over isolated compliance** — the test stated in Section 1 governs every decision in this document.
- **Equivalent experience, not identical presentation.** A screen-reader user's experience of a diagram will never be pixel-identical to a sighted user's — it must be informationally equivalent. This is `009-motion-system.md`'s "motion is not information" principle, generalized: no modality may receive less than the full evidence or content another modality receives.
- **No feature may work for only one input modality.** Keyboard, touch, pointer, and screen reader are all first-class, extending `007-responsive-strategy.md`, Section 7's touch-parity rule to every modality, not just touch versus hover.
- **Accessibility is never sacrificed for aesthetic restraint.** Where the calm, minimal visual philosophy of `006-design-system.md` and a concrete accessibility need (e.g. a visible focus indicator) appear to conflict, accessibility wins — the same precedence `000-philosophy.md` already establishes for Philosophy over convenience applies here.

---

## 3. Semantic Structure

- Every page is built from real semantic structure — headings in a logical order that reflects the page's actual content hierarchy, not visual styling applied to generic elements. This is what `008-component-library.md`, Section 3 already requires of Section Heading; here it is stated as a page-wide requirement, not just a per-component one.
- Landmark regions (navigation, main content) are identifiable programmatically, not only by visual separation. Whitespace-as-grouping (`006-design-system.md`, Section 5) communicates grouping visually; semantic structure must communicate the same grouping to a visitor who cannot see the whitespace.
- Case Studies' and AgentPrep's fixed ten-section structures (`015-case-studies.md`, `016-agentprep.md`) map directly onto real heading structure — the Table of Contents (`027-application-behaviour.md`, Section 2) links to the same headings a screen-reader user would already navigate by, not a separate, disconnected list.
- Reading order matches visual order at every viewport. A layout that reflows for a smaller screen (`007-responsive-strategy.md`) must never reorder content visually in a way that breaks the underlying document order a keyboard or screen-reader user relies on.

---

## 4. Keyboard Operability

- Every interactive element is reachable and operable by keyboard alone, per `005-design-principles.md`, Section 5 and `007-responsive-strategy.md`, Section 7 — restated here as the page-wide baseline every other rule in this section builds on.
- A skip-to-main-content mechanism is available on every page, so a keyboard user does not have to tab through all six navigation items before reaching a page's actual content — directly serving the Technical Recruiter persona's 1–3 minute budget (`002-user-personas.md`), which a repeated six-stop tab sequence would meaningfully eat into.
- Disclosure controls (Table of Contents, mobile navigation, image zoom — `027-application-behaviour.md`) are operable via keyboard: Enter or Space toggles them, Escape closes an overlay where one exists, and no control causes a keyboard trap a visitor cannot tab or escape out of.

---

## 5. Focus Management

- Focus order follows logical reading order, site-wide — the rule `008-component-library.md`, Section 1 already states for Navigation, generalized to every page.
- When a disclosure control opens (an image zoom overlay, a mobile navigation menu), focus moves to the newly revealed content; when it closes, focus returns to the control that triggered it. A visitor must never lose their place because a control opened or closed around them.
- Visible focus indication is never suppressed for visual cleanliness. This is Section 2's precedence rule made concrete: a minimal aesthetic does not justify an invisible or ambiguous focus state.
- Route or page transitions (`009-motion-system.md`; `027-application-behaviour.md`, Section 1) move focus to the new page's main heading on navigation — focus is never left stranded on an element that no longer exists after a transition.

---

## 6. Visual Accessibility (Contrast, Scaling, Reflow)

**This document sets WCAG 2.1 Level AA as the baseline conformance target**, resolving a decision left open in the original specification review. AA is the standard that balances real rigor with what a single-author-maintained site (`004-product-goals.md`'s single-author constraint) can sustain indefinitely. Several AAA-level practices are already adopted elsewhere in this documentation where they don't conflict with other principles (e.g. the reduced-motion default in `009-motion-system.md`) — but AA is the floor every page must clear, not an aspiration.

- Contrast requirements hold in both the light and dark presentations `006-design-system.md`, Section 3 treats as equally first-class — neither theme is held to a lower standard.
- Visual hierarchy is never colour-only, per `005-design-principles.md`, Section 2 — restated here as a visual-accessibility requirement, not only a design principle.
- Text and layout remain fully usable at increased text scaling and zoom (up to 200%), reflowing without loss of content or function and without introducing page-level horizontal scrolling — the same "no truncation, contained overflow only" standard `007-responsive-strategy.md`, Section 5 already applies to tables and diagrams, generalized to zoomed text.

---

## 7. Non-Visual Accessibility (Screen Readers, Alternative Text)

- Every Metric / Evidence Block (`008-component-library.md`, Section 8) has a text equivalent that conveys what the evidence actually shows — "a bar chart showing a 40% latency reduction after migration," never a generic label that only confirms an image exists.
- Screenshots used as evidence (`006-design-system.md`'s photography policy — screenshots are evidence, not decoration) carry alternative text describing what is shown and why it qualifies as evidence, sufficient for a screen-reader user to receive the same evidentiary weight a sighted visitor does. A screen-reader-using Engineering Manager is still the Engineering Manager persona (`002-user-personas.md`) and must be able to form the same "specific, defensible opinion" `001-vision.md` and `004-product-goals.md` require — not a diminished version of it.
- Purely decorative elements (an icon already paired with a required text label, per `006-design-system.md`'s iconography policy) are hidden from assistive technology rather than read aloud as noise.
- Every link and button has an accessible name describing its destination or action specifically — already required per-component in `008-component-library.md` (Call to Action, Case Study Preview, Journal Preview, Contact Methods); restated here as a site-wide non-visual requirement, since a screen-reader user navigating by link list depends on this far more than a sighted visitor scanning visually.

---

## 8. Motion and Reduced-Motion Integration

`009-motion-system.md` already defines the full accessibility contract for motion — Section 2's "motion is not information" and Section 7's reduced-motion policy are not restated here. This document's role is to state the composition rule: a visitor may be keyboard-only, screen-reader-using, and reduced-motion-preferring simultaneously, and all three must be satisfiable at once. A disclosure control, for example, must remain keyboard-operable (Section 4), correctly announce its expanded/collapsed state to assistive technology (Section 7), and change state instantly rather than animate (`009-motion-system.md`, Section 7) — for the same visitor, at the same time, without any of the three requirements being dropped to satisfy another.

---

## 9. Error and Status Communication

- The 404 page (`027-application-behaviour.md`) is programmatically identifiable as an error/not-found state, not conveyed by page copy alone, and offers a real path forward — consistent with `005-design-principles.md`'s "no dead end" rule.
- Status changes that occur without a page navigation — a copy-button confirmation, an external-link indicator — are announced to assistive technology, not only shown visually. This is `009-motion-system.md`, Section 2's "persistent static equivalent" rule completed: the changed state must be perceivable by every modality, not just visible on screen.
- Because `019-contact.md` deliberately excludes a contact form, this site has minimal input-validation error surface by design. The rule above governs what status communication does exist (copy confirmations, external-link marking) rather than a large form-validation system this site doesn't have.

---

## 10. Testing Philosophy

Testing must be realistic and sustainable under `004-product-goals.md`'s single-author constraint — this document does not claim exhaustive, continuously-verified conformance, which one person cannot sustain indefinitely alongside writing content.

The baseline practice is:

1. A manual keyboard-only pass through each persona journey (`002-user-personas.md`, `003-information-architecture.md`, Section 5) before any significant release — the direct test of Section 1's governing principle.
2. A screen-reader spot-check of every new Case Study, AgentPrep entry, or Journal article's evidence content specifically, since these are added most frequently and carry the mandatory evidence requirements of `015-case-studies.md` and `016-agentprep.md`.
3. Automated accessibility auditing as a baseline safety net for regressions — a floor, not a substitute for the manual journey test above, since automated tools cannot verify whether a persona's journey actually completes successfully.

The journey-completion test in Section 1 is the real acceptance criterion. An automated tool reporting zero violations is necessary, not sufficient.

---

## Review Checklist

- [ ] Each persona's journey (`003-information-architecture.md`, Section 5) can be completed using only a keyboard.
- [ ] Each persona's journey can be completed using only a screen reader, with equivalent evidentiary content to a sighted visitor.
- [ ] Heading structure reflects real content hierarchy on every page, matching visual order at every viewport.
- [ ] A skip-to-main-content mechanism exists and functions on every page.
- [ ] Focus is never lost or stranded across any disclosure interaction or page transition.
- [ ] Focus indication is visible everywhere; it has not been suppressed for aesthetic reasons.
- [ ] Contrast meets WCAG 2.1 AA in both light and dark presentations.
- [ ] Text scales and reflows to 200% without loss of content, function, or introducing page-level horizontal scrolling.
- [ ] Every Metric / Evidence Block and evidentiary screenshot has alternative text conveying the actual evidence, not a generic label.
- [ ] Every status change (copy confirmation, external link, error state) is announced to assistive technology, not only shown visually.
- [ ] Reduced motion, keyboard-only use, and screen-reader use are all simultaneously satisfied for the same visitor.

---

## What This Document Is Not

This document does not define specific contrast hex values, testing tool selection, or automated audit implementation. It defines the conformance target (WCAG 2.1 AA), the structural and behavioral rules that target implies, and the real acceptance test — persona journey completion — that any later implementation and testing setup must be verified against.
