# Interaction Language

**Version:** 1.1
**Status:** Active

---

## Relationship to Prior Documents

This is not a redesign. `000-philosophy.md` through `025-roadmap.md` remain the source of truth, and this document cannot override any rule already established in `005-design-principles.md`, `006-design-system.md`, `009-motion-system.md`, `010-accessibility.md`, or `011-performance.md` — it operates strictly inside their boundaries.

What it adds is resolution. Several prior documents deliberately stopped short of a craft-level decision because nothing yet demanded one:

- `009-motion-system.md`, Section 8 explicitly withheld specific duration and easing values, calling them "an implementation-stage decision." That deferral is resolved here — Section 18 is where it's finally cashed in, because a signature interaction language is exactly the kind of concrete purpose that justifies committing to real numbers, the same way `011-performance.md` committed to real budgets where `006-design-system.md` stayed qualitative.
- `005-design-principles.md` and `006-design-system.md` establish qualitative rules (hierarchy never colour-only, motion communicates rather than decorates, restraint over decoration). This document is where those qualities get sharpened into an actual, consistent, executable system.

If anything below reads as a new rule, it is an application of an existing one — most often `000-philosophy.md`'s brand personality (precise, restrained, quietly confident) or `009-motion-system.md`'s "motion is not information" — made specific enough to build from, not a new decision made independently of them.

---

## Governing Standard

> **Every interaction must feel like it was considered on purpose. The craft is in what's removed, not what's added.**

The goal is not to look impressive. It's to be correct, fast, and quiet enough that a visitor never consciously notices the interface — and an experienced frontend engineer, looking closely, notices exactly how much restraint that took. Per `000-philosophy.md`'s brand personality, this system is not trying to look like a product demo; it's trying to disappear behind the evidence it presents.

Explicitly out of scope, regardless of how well-executed: fake terminals, Matrix-style effects, glassmorphism as decoration, particle or canvas backgrounds, exaggerated parallax, neon/cyberpunk treatments, unnecessary 3D or WebGL, and animation added because it would look good in isolation rather than because `009-motion-system.md`, Section 1's single-purpose test justifies it.

---

## 1. Typography Rhythm

- Headings use tight line-height (~1.1–1.2); body copy uses relaxed line-height (~1.6–1.7), optimised for the sustained reading `005-design-principles.md`, Section 3 already requires of Case Studies and Journal entries.
- Type sizes and spacing share the same underlying rhythm — a heading and the whitespace above it are never arbitrary; both derive from the same scale, so nothing needs to be eyeballed into alignment.
- Negative letter-spacing is reserved for large display headings only (e.g. Hero) — body text and UI labels are never tightened, which is a common but subtly harder-to-read mistake.
- Numerals in Metric / Evidence Blocks (`008-component-library.md`, Section 8) use tabular figures, so a metric that updates or animates (Section 12) never causes neighbouring characters to shift width mid-motion.

---

## 2. Visual Hierarchy

Refines `005-design-principles.md`, Section 2: hierarchy is carried by size, weight, and spacing, in that order — colour is always the last, smallest signal applied, never the first. The craft-level target: a visitor should know where to look first almost immediately after a page settles, without needing to read anything to figure out where to start.

---

## 3. Spacing Rhythm

Builds on `006-design-system.md`, Section 5's generosity-by-default rule with one concrete craft heuristic: the spacing used to separate **related** elements and the spacing used to separate **unrelated** ones must differ by a clearly perceptible ratio — never a subtle, borderline difference a visitor can't actually feel. If two spacing values are close enough that a visitor would need to measure them to tell them apart, they are not doing their job and should be pushed further apart.

---

## 4. Interaction Philosophy

An interaction is a conversation, not a performance. Every hover, focus, and press state should feel instantaneous and *correct* rather than *animated* — the visitor should feel acknowledged, not entertained. Restraint is the signature this entire system is built around: the absence of unnecessary motion is itself the polish, not a compromise on the way to it.

---

## 5. Spatial Continuity

> **Objects should appear to occupy continuous space. Interface elements move, transform, or morph between states instead of disappearing and being replaced, whenever practically possible.**

This is what separates an interface that merely follows the rules below from one that feels like it has integrity — the sense that things have *place*, not just appearance. It governs *how* an already-justified transition behaves; it does not license any motion beyond what the rest of this document already permits, and Section 18's duration tiers still apply to all of it.

- The Navigation's current-page indicator (`008-component-library.md`, Section 1) should move continuously to the next item when a visitor navigates, rather than disappearing from one item and reappearing on another. **This is a real, outstanding gap**: the Phase 1 Navigation component currently distinguishes the active item by colour and weight alone, with no continuity element between states. It should be revisited during Phase 2 component work and verified against this section, not treated as already satisfied.
- The theme toggle's icon morphs between states (Section 17) rather than swapping flatly — already established as one of this system's three delight moments.
- Responsive layout changes (`007-responsive-strategy.md`) never cause content to visibly jump or teleport between breakpoints where avoidable — a card's position and size settle continuously rather than snapping.
- A Metric / Evidence Block that expands to reveal more detail keeps its original position as the visible anchor of that detail, rather than the detail appearing disconnected elsewhere on the page.

---

## 6. Page Transitions

Per `027-application-behaviour.md`, Section 1, transitions are kept minimal. The craft-level rule sharpens "minimal" into a specific shape: a brief cross-fade of incoming content (Section 18's "fast" duration), never a slide, wipe, or push transition. Sliding/wiping full-page transitions read as an app-like gimmick this system deliberately avoids — the signature move here is how little motion is used, not how much. Scroll position handling remains exactly as `027-application-behaviour.md`, Section 1 already specifies.

---

## 7. Scroll Behaviour

- In-page anchor navigation (Table of Contents links, `027-application-behaviour.md`, Section 2) scrolls smoothly, with a duration that scales with distance but is capped (Section 18's "standard" ceiling) — a jump to a far-away section never takes multiple seconds. Reduced-motion preference replaces this with an instant jump, per `009-motion-system.md`, Section 7.
- Content may settle into view once as it first enters the viewport (a small opacity and position shift, Section 18's "standard" duration) — but only once per element, per session. It never re-triggers on scrolling back up, which would read as gimmicky rather than considered. The content is always fully present in the underlying HTML first; the reveal is a perceptual layer on top of already-real content, never a gate in front of it (`009-motion-system.md`, Section 2).

---

## 8. Hover Behaviour

Hover states adjust colour, border, or a subtle elevation shift only — never scale or transform. Scaling a card or image on hover is one of the most common portfolio clichés and reads as promotional rather than considered; it is explicitly excluded here. Hover transitions use Section 18's "fast" duration — quick enough to feel responsive, never sluggish.

---

## 9. Focus Behaviour

Per `010-accessibility.md`, Section 2's non-negotiable precedence, focus indication is never suppressed for aesthetic reasons. One consistent focus treatment is used everywhere, and it **appears instantly, with no transition** — focus is a functional signal, not a decorative moment, and `009-motion-system.md`'s rule against ever delaying a visitor's ability to act applies to it directly.

---

## 10. Cursor Behaviour

- No custom cursor replacements, cursor-follow effects, or blob cursors — a common cliché this system explicitly rejects.
- The pointer cursor appears only on genuinely interactive elements — never applied broadly for effect.
- Text selection is never disabled on evidence content. A visitor should be able to select and copy a real metric or quote to verify it themselves — consistent with `000-philosophy.md`'s "Evidence Over Claims," selectability is itself part of the trust signal.

---

## 11. Image Behaviour

- Every image reserves its aspect ratio in layout before it loads, protecting the CLS budget in `011-performance.md`, Section 3 — nothing shifts as images arrive.
- A subtle fade-in applies only on an image's first load, never retriggered on repeat scroll-into-view.
- Zoom-to-full-size (`027-application-behaviour.md`, Section 3) uses a calm scale-and-fade, never a sliding lightbox transition. Hover-zoom on static images is not used — it's a cliché, and it has no touch equivalent, conflicting with `007-responsive-strategy.md`, Section 7's touch-parity rule.

---

## 12. Metric Animations

A genuine numeric metric inside a Metric / Evidence Block (`008-component-library.md`, Section 8) may animate once, the first time it enters view, using Section 18's "deliberate" duration and easing — but only as a decorative layer on top of a value that is always present, correct, selectable, and accessible.

**The canonical evidence value is always present, correct, selectable, and accessible. Any animation is purely decorative and must never replace, modify, or temporarily obscure the canonical value.** This is what reconciles this section with Section 22's rule that a Metric / Evidence Block's actual content is never partially visible mid-animation: the evidence itself never changes or is obscured; at most, a separate, `aria-hidden` decorative representation animates alongside it.

The animation strategy is implementation-defined — a count from zero, a fade between values, an odometer effect, or partial interpolation are all acceptable — provided it never changes the canonical value. It never re-triggers, per session, regardless of technique.

**Extremely large values** (in the millions or billions, or values like "99.97%" where a full sweep from zero adds nothing) should not be animated end-to-end from a zero or near-zero baseline if doing so would run well past Section 18's duration ceiling or read as visual noise rather than reinforcement. Animation exists to reinforce perception, not to maximise duration — for such values, animating from a nearby baseline, animating only a portion of the value, or skipping animation entirely are all acceptable, under the same "motion serves information" standard as everywhere else in this document.

This is one of this system's few deliberate delight moments (Section 17), earned because it reinforces the evidentiary content rather than decorating it — the correct final number is always present in the static markup regardless of whether any animation runs, per `009-motion-system.md`, Section 2: the number is information; the animation is not.

---

## 13. Reveal Timing

Where multiple sibling elements enter together (e.g. several Highlights on the Homepage), a brief stagger between them (roughly 40–60ms apart) makes the reveal read as ordered rather than simultaneous — capped after four or five items, beyond which the remainder reveal together rather than extending the cascade further. This never delays readability or interactivity; it is purely an ordering cue applied to content that is already rendered and already real.

---

## 14. Theme Transition Philosophy

Switching between light and dark (`027-application-behaviour.md`, Section 4) cross-fades colour values uniformly across the page over Section 18's "fast" duration. Colour is the only thing that transitions — layout, spacing, and content never shift during a theme change. Nothing about the underlying content is re-read or re-flowed; only its colouring changes.

---

## 15. Loading Philosophy

Because the site is static-first (`020-tech-stack.md`, Section 4), genuine loading states are rare by design. Where a wait is possible: a loading indicator only appears if the wait is likely to exceed roughly 300–400ms. Flashing a skeleton or spinner for a shorter wait than that is itself dishonest — it signals more is happening than actually is, which `009-motion-system.md`, Section 4 already prohibits. Any skeleton used mirrors the real, final layout exactly; it is never invented for visual effect.

---

## 16. Perceived Performance Techniques

- Internal links prefetch on hover or viewport visibility (a Next.js default, per `020-tech-stack.md`), so navigation feels instant well before `011-performance.md`'s LCP budget is even relevant.
- Every interaction gets optimistic, immediate visual feedback, per `005-design-principles.md`, Section 5 — a visitor is never left wondering whether their action registered while real work finishes behind it.
- Nothing blocks a page from being interactive while a purely decorative transition plays out.

---

## 17. Delight Moments

Delight is capped and earned, not sprinkled throughout. Three moments qualify, each tied directly to the site's evidentiary purpose rather than decoration:

1. The metric's decorative first-view animation (Section 12).
2. A precise copy-to-clipboard confirmation (Section 19) — an icon swap and a brief accent-coloured flash, never a toast notification competing for attention.
3. The theme toggle's icon (sun/moon) morphs smoothly between states rather than swapping flatly (Section 5), at Section 18's "fast" duration.

No further delight moments are added without revisiting this document — the discipline of stopping at three is itself the point.

---

## 18. Animation Durations and Easing Philosophy

This is where `009-motion-system.md`, Section 8's deferred numeric decision is resolved. A small, named scale, applied consistently everywhere rather than choosing values ad hoc per interaction:

| Tier | Duration | Use |
|---|---|---|
| Instant / feedback | 100–150ms | Button press, focus ring (Section 9), pressed states |
| Fast | 120–180ms | Hover states, theme transition, icon morphs |
| Standard | 200–300ms | Disclosure (mobile nav, Table of Contents), scroll-triggered reveal |
| Deliberate | 400–600ms | Metric first-view animation, first-load image fade |

**No interface animation ever exceeds 600ms.** Beyond that, motion starts to feel sluggish and risks violating `005-design-principles.md`'s rule that motion must never delay a visitor's ability to act.

A single easing curve — a decelerating "ease-out" curve (e.g. `cubic-bezier(0.16, 1, 0.3, 1)`) — is used for nearly everything that isn't instantaneous, rather than mixing multiple easing styles. Linear easing is reserved for cases with no deceleration to express, which in practice means it's rarely used at all, since ambient/looping motion is already prohibited by `009-motion-system.md`, Section 4. Using one curve everywhere is what makes the whole system feel like it belongs to a single hand, per `009-motion-system.md`, Section 8's consistency rule.

---

## 19. Micro-interactions

- A pressed button darkens or shifts surface colour instantly — no scale transform (Section 8's rule extends to press states, not just hover).
- Text links within prose reveal a thin underline drawing in from the left on hover, at Section 18's "fast" duration — a small, precise detail rather than an instant underline appearing. Navigation items do not use this treatment; they already have their own active-state signal (`008-component-library.md`, Section 1; Section 5), and doubling up would be redundant, not additive.

---

## 20. Tactile Feedback

On touch devices, a pressed element shows its active state the instant a touch begins (`touchstart`), not after it ends — this is what makes touch interaction feel responsive rather than laggy, and it applies the same "immediate feedback" standard `005-design-principles.md`, Section 5 already requires. No haptic APIs are used — not excluded on principle, simply outside what any current specification requires.

---

## 21. Rules for Restraint

None of the following are used, regardless of how well they might be executed:

- Parallax scrolling.
- Particle or canvas-based backgrounds.
- Fake terminal or typewriter text effects.
- Glassmorphism as decoration (blur is only ever used where `006-design-system.md`'s elevation policy already permits a functional layering signal, never as a decorative surface texture).
- Neon or glow effects.
- Unnecessary 3D or WebGL.
- Custom cursor replacements.
- Hover-scale transforms on cards or images.
- Auto-playing carousels.
- Celebratory animation (confetti or similar) for routine actions.
- Skeleton loaders for waits under roughly 300–400ms.
- Any looping or idle animation.

---

## 22. What Should Never Animate

Distinct from Section 21's taste-driven exclusions, these are correctness rules — animating them risks misleading a visitor, not just looking undisciplined:

- The canonical value of a metric, once settled (Section 12) — it never re-animates on repeat view.
- Body text reflow or line-height — text never visibly re-wraps as an animated effect.
- Focus ring appearance (Section 9) — always instant.
- Any content a visitor currently needs to read — an in-progress animation never overlaps or obscures text mid-transition.
- A Decision / Trade-off Block's or Metric / Evidence Block's actual content (`008-component-library.md`, Sections 8–9) — evidence is never partially visible mid-animation in a way that could be misread. Section 12's metric animation satisfies this by construction: only a decorative overlay animates, never the canonical value itself.
- Layout or geometry during a theme change (Section 14) — only colour transitions.

---

## Review Checklist

- [ ] Every duration used anywhere in the interface maps to one of the four tiers in Section 18 — nothing was chosen ad hoc.
- [ ] The same easing curve is used everywhere motion decelerates; no interaction uses a different, one-off curve.
- [ ] No hover or press state uses a scale or transform effect on a card, button, or image.
- [ ] No element re-triggers a "first view" animation (metric animation, scroll reveal) on a repeat view.
- [ ] Every metric's canonical value is present, correct, and selectable independent of whether any animation ran (Section 12).
- [ ] Focus indication and pressed/touch states appear instantly, with no transition delay.
- [ ] None of the excluded patterns in Section 21 appear anywhere in the implementation.
- [ ] Delight moments are limited to the three named in Section 17 — no others have been added without revisiting this document.
- [ ] Every animated reveal has its real content already present in static markup, independent of whether the animation runs.
- [ ] Continuity elements (Section 5) — particularly Navigation's active-state indicator — have been implemented, not left at Phase 1's colour-only treatment.

---

## What This Document Is Not

This document does not choose an animation library, write component implementation, or override any rule already established in `005-design-principles.md`, `006-design-system.md`, `009-motion-system.md`, `010-accessibility.md`, or `011-performance.md`. It is a specification only — the interaction language Phase 2's component implementation must express, not a Phase 2 deliverable itself.
