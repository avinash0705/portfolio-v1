# Motion System

**Version:** 1.0
**Status:** Active

---

## Relationship to Prior Documents

`005-design-principles.md`, Section 6 already establishes the core motion rules: a single communicative purpose per instance, never the sole signal of an important change, mandatory respect for reduced-motion, and never gating access behind a fixed duration. This document does not restate those rules — it elaborates them into categories, hierarchy, and consistency guidance, and answers the specific question those rules left open: **what is motion for, on this site, and where exactly does it apply?**

It governs the motion implied by `027-application-behaviour.md` (route transitions, disclosure controls, zoom interactions) and `007-responsive-strategy.md` (touch-triggered equivalents of hover states). It is not a catalogue of animations — it is the reasoning that should make any future animation decision self-evident rather than arbitrary.

---

## 1. Motion Principles — Why Motion Exists

Motion exists on this site for exactly one reason: to communicate something that would otherwise be unclear — a spatial relationship, a cause-and-effect connection, a change of state, or where attention should go next. It does not exist to make the interface feel alive, modern, or polished. Per `000-philosophy.md`'s brand personality — precise, restrained, quietly confident — motion should be felt more than noticed.

If a piece of motion cannot name the specific thing it communicates, it does not belong on the site, regardless of how good it looks in isolation.

---

## 2. Motion Is Not Information

This is the governing constraint on every other section in this document, and it connects directly to the accessibility standard that follows this one:

- **Nothing essential may be communicated only through animation.** If a visitor never saw the motion at all — because they have animations disabled, because they missed it, because it didn't render — they must still be able to determine the current state of the interface from a static view.
- **Motion may reinforce meaning; it may never create meaning that only exists while the animation is playing.** A transition can make a state change easier to follow; it must never be the only evidence that the state changed.
- **Every animated state change must have a static equivalent.** A control that expands must be genuinely expanded (and marked as such for assistive technology) whether or not the expansion animated; a copy button's confirmation must show a persistent changed state (e.g. changed text or icon), not just a transient flourish that vanishes leaving no evidence of success.

Any motion that fails this test is treated as a defect, not a stylistic choice.

---

## 3. When Motion Is Required

Motion is the right choice when it makes one of the following easier to understand than an instant, unanimated change would:

- **Navigation and wayfinding** — indicating that a route change occurred, or where a newly revealed section came from (`027-application-behaviour.md`, Section 1).
- **Disclosure** — a Table of Contents expanding, a collapsed mobile navigation menu opening, an image transitioning into its zoomed state (`027-application-behaviour.md`, Sections 2–3; `007-responsive-strategy.md`, Section 4) — motion here shows the relationship between the collapsed and expanded states.
- **Direct feedback** — a control acknowledging that an interaction registered (`005-design-principles.md`, Section 5's immediacy rule), such as a pressed or activated state.

If none of these apply, motion is not required, and its absence is the default, not a gap to fill.

---

## 4. When Motion Is Prohibited

- **Decorative or ambient motion** — looping animations, idle pulsing, or background movement with nothing to communicate. Directly excluded by `006-design-system.md`'s restraint-driven brand personality.
- **Attention-seeking motion on non-critical elements** — a bouncing or pulsing call to action would contradict the one-primary-action rule already established for Call to Action (`008-component-library.md`, Section 10).
- **Motion that fabricates activity that isn't occurring** — a skeleton loader or spinner implying content is still loading when it is, in fact, already available is a dishonesty problem, not a polish choice, and conflicts with the same evidence-over-claims standard (`000-philosophy.md`) applied at the interface level.
- **Motion that must be watched to completion to understand what happened** — any animated transition must be interruptible or skippable; a visitor should never have to wait out an animation to proceed, per `005-design-principles.md`'s rule that motion must never delay a visitor's ability to act.

---

## 5. Categories of Motion

- **Navigation** — route transitions, scroll-to-section behaviour from a Table of Contents, breadcrumb appearance. Kept minimal and brief, per `027-application-behaviour.md`, Section 1.
- **Disclosure** — expanding or collapsing a control (mobile navigation, Table of Contents, image zoom). Motion here shows the relationship between two states of the same thing, not two different things.
- **Feedback** — acknowledging an interaction (a control's pressed state, a copy button's confirmation). Always immediate, always brief.
- **Emphasis** — used more sparingly than the other three categories, and only where a specific, singular piece of content genuinely needs a moment of attention (e.g. a code block briefly indicating a successful copy). Emphasis motion must still satisfy the single-purpose test in Section 1 — it is never used simply to make a page feel more dynamic while scrolling.

No other category of motion exists. A proposed use that doesn't fit one of these four should be treated as decorative by default, per Section 4.

---

## 6. Motion Hierarchy

Motion has a hierarchy of attention in the same way visual design does (`005-design-principles.md`, Section 2):

- **Primary motion** accompanies a visitor-initiated, significant action or navigation event (opening a case study, expanding a major disclosure control). It is the most perceptible motion on the screen at that moment, but still brief.
- **Secondary motion** accompanies passive or incidental state feedback (hover/focus changes, minor interactive acknowledgments). It must be more subtle and quicker than primary motion, so it never competes with it.
- **At most one primary-weight motion occurs at a time.** Two simultaneous, equally prominent animations would create the same competing-focal-point problem `005-design-principles.md` prohibits for visual hierarchy — the same rule, applied to motion instead of layout.

---

## 7. Reduced-Motion Policy

A visitor's reduced-motion preference is respected without exception, on every category in Section 5, with no opt-out. When reduced motion is active:

- State changes (disclosure, navigation, feedback) still occur — instantly, or with a minimal cross-fade at most, rather than movement.
- Nothing that was communicated via motion becomes invisible, non-functional, or ambiguous — this is Section 2's rule enforced concretely, not a separate concern.
- Reduced motion is not treated as a degraded experience tier. It is a complete, equally functional presentation of the same product, in the same spirit `007-responsive-strategy.md`, Section 8 applies to mobile performance — a visitor who disables motion receives the same content and the same clarity, just without movement.

---

## 8. Motion Consistency Rules

- The same category of motion behaves identically everywhere it appears — every disclosure control opens the same way, every navigation transition behaves the same way, site-wide. This is `005-design-principles.md`'s "consistency over creativity" applied to motion specifically.
- Motion should feel quick and immediate across the board — brief enough that it is never the reason a visitor has to wait, consistent with Section 4's prohibition on delaying action. Where motion mimics physical movement (e.g. an expanding panel), it should decelerate into rest rather than move at a constant, mechanical rate.
- **Specific duration and easing values are not defined in this document.** Like `006-design-system.md`'s decision to withhold exact colour and spacing values, precise timing is an implementation-stage decision — this document defines the qualitative feel every future timing decision must satisfy (quick, purposeful, decelerating), not the numbers themselves.

---

## Review Checklist

- [ ] Every instance of motion can name the single thing it communicates (Section 1).
- [ ] Nothing essential is communicated only through animation — a static view still shows the correct state (Section 2).
- [ ] Every use of motion falls into one of the four categories in Section 5; nothing decorative or ambient has been added (Section 4).
- [ ] No more than one primary-weight motion occurs at the same moment (Section 6).
- [ ] The experience is fully complete and equally clear with reduced motion active (Section 7).
- [ ] The same category of motion behaves identically wherever it occurs on the site (Section 8).
- [ ] No animation blocks or delays a visitor's ability to act.

---

## What This Document Is Not

This document does not define specific duration values, easing curve formulas, animation libraries, or implementation code. It defines why motion exists on this site, when it is and isn't justified, and the qualitative standard any future timing decision must meet — not the numbers themselves.
