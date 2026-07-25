# Performance

**Version:** 1.0
**Status:** Active

---

## 1. Purpose

`000-philosophy.md` states that performance is part of the experience, not an optimisation step; `004-product-goals.md` names "excellent Core Web Vitals" as an expected outcome. Neither document gives that principle a number to be judged against. This document closes that gap: it converts a stated value into measurable, testable budgets.

Unlike most documents in this series, **this one is deliberately concrete.** Colours, spacing, and animation timing were left as qualitative principles because premature numbers there would be arbitrary tokens. Performance is different: "fast" is not a design opinion, it is a measurement, and a budget with no number is not a budget. Every figure below is a real acceptance criterion, not a placeholder.

---

## 2. Performance Philosophy

Performance is treated as a correctness property of the product, not a nice-to-have layered on afterward. A page that is slow has failed its job (`000-philosophy.md`'s one-job rule) just as surely as a page with the wrong content — a visitor from any persona (`002-user-personas.md`) who abandons a page before it loads never gets the chance to evaluate what was on it.

Performance work is budget-driven: a change that would exceed a budget below is not shipped as-is. The budget is not renegotiated after the fact to fit whatever was built — the budget comes first.

---

## 3. Core Web Vitals Targets

These are hard targets, not aspirations, measured as field data (real visitor experience) wherever possible:

| Metric | Target | Definition |
|---|---|---|
| **LCP** (Largest Contentful Paint) | ≤ 2.0s | The largest visible element (typically Hero on Homepage, or the first heading/image on a Case Study) renders within 2.0 seconds. |
| **INP** (Interaction to Next Paint) | ≤ 200ms | Any interaction (navigation, disclosure toggle, copy button) visibly responds within 200ms. |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | Content does not shift position after initial render — no image, font swap, or late-loading element pushes already-visible content around. |

These targets sit at or inside the "good" threshold Google's Core Web Vitals define — they are the floor, not a stretch goal, at the 75th percentile of real visitor traffic.

**Lighthouse minimums** (lab-measured, run pre-release):

| Category | Minimum Score |
|---|---|
| Performance | 90 |
| Accessibility | 95 |
| Best Practices | 95 |
| SEO | 90 |

The Accessibility score here is a lab-tooling floor, not the real acceptance test — per `010-accessibility.md`, Section 10, an automated score is necessary, not sufficient; the persona-journey test remains the actual standard.

---

## 4. Loading Strategy

- Content pages (Homepage, Case Studies, AgentPrep, Journal, Resume, Experience, Contact) are rendered as pre-built, static content wherever possible, rather than assembled client-side after load — a visitor should receive real content immediately, not a loading shell waiting on JavaScript execution.
- Above-the-fold content (Hero on Homepage, the opening of a Case Study or Journal article) is prioritised for the fastest possible render; below-the-fold images and non-critical assets load lazily.
- Critical assets required for first render (fonts, the Hero's content) are preloaded; nothing required for the first paint waits behind non-critical requests.

---

## 5. JavaScript Budget

- **Initial route JavaScript (compressed): ≤ 100KB**, with a hard ceiling of **150KB** that must never be crossed without a documented, deliberate exception.
- JavaScript is scoped to what a page actually needs to be interactive — per `000-philosophy.md`'s "minimal unnecessary JavaScript," a largely static, content-first site does not carry the JS weight of a fully client-rendered application.
- This budget is enforced as a build-time check: a change that pushes a route over budget fails review before it fails a real visitor.

---

## 6. Image Strategy

- Images are served in modern, compressed formats with fallback, sized appropriately for the requesting viewport — per `007-responsive-strategy.md`, Section 8, a mobile visitor is never sent a desktop-sized asset.
- **Per-image budgets:** hero/above-the-fold images ≤ 200KB; in-content diagrams, screenshots, and evidence images (`008-component-library.md`, Section 8) ≤ 300KB each, compressed.
- Below-the-fold images load lazily, per Section 4 — this must never delay or shift already-visible content (CLS budget, Section 3), so space for each image is reserved in layout before it loads.

---

## 7. Font Strategy

- No more than **two font families** load (the one interface/prose typeface and the one monospace typeface established in `006-design-system.md`, Section 4), across no more than roughly **four weight/style combinations total.**
- **Combined font payload budget: ≤ 100KB**, achieved by subsetting to the character set actually used.
- Fonts are loaded to avoid invisible text while waiting (no blank-text flash) and to avoid a late font swap causing layout shift — both directly protect the CLS budget in Section 3.

---

## 8. Third-Party Script Policy

- **The default is zero third-party scripts.** Every addition (analytics, embeds, widgets) must be individually justified — consistent with `000-philosophy.md`'s "never add libraries without justification" — against what it costs in JavaScript weight, blocking time, and privacy.
- Any approved third-party script loads asynchronously and never blocks initial render; its cost is measured against the JavaScript budget in Section 5 before it is added, not after.
- No third-party script may push a page past any budget in this document. If it would, it is not added, regardless of its usefulness.

---

## 9. Runtime Behaviour

- No layout shift is introduced by late-loading content — images, fonts, and any dynamically inserted element (disclosure controls, `027-application-behaviour.md`) reserve their layout space in advance, protecting the CLS budget.
- Long-running main-thread work is avoided in favour of small, interruptible tasks, protecting the INP budget — no single script task should be long enough to make an interaction (Section 3) feel unresponsive.
- Interactivity (hydration, event handling) is scoped only to the elements that actually need it — a page's static content does not wait on JavaScript execution to be visible or readable, consistent with the loading strategy in Section 4.

---

## 10. Monitoring Philosophy

Consistent with `004-product-goals.md`'s single-author constraint, monitoring is lightweight and sustainable, not a dedicated operations practice:

- **Lab testing** (Lighthouse or equivalent) runs as a gate before every release — the budgets in this document are checked before publishing, not discovered afterward from real visitor pain.
- **Field data** (real-visitor Core Web Vitals) is reviewed periodically, not continuously monitored in real time — sufficient to catch a genuine regression without demanding ongoing operational attention one person cannot sustain.
- A budget regression is treated the same as a broken build: it blocks release until resolved, not logged as a future improvement.

---

## 11. Performance Budget Ownership

Every new dependency introduced into the project inherits responsibility for remaining inside the budgets defined in this document. Exceeding a budget is justification for rejecting the dependency, even if the dependency is otherwise technically sound.

This reframes the question a proposed addition must answer — not "can we add this?" but "can this live within our performance contract?" A library that fails that question is not added, regardless of how useful it would otherwise be, in the same spirit as Section 8's third-party script policy applied to every dependency, not only third-party scripts specifically.

---

## Review Checklist

- [ ] LCP, INP, and CLS targets (Section 3) are met at the 75th percentile of real visitor traffic.
- [ ] Lighthouse Performance, Best Practices, and SEO scores meet their minimums (Section 3); Accessibility score is treated as a floor, not a substitute for the `010-accessibility.md` journey test.
- [ ] Initial route JavaScript stays within budget (Section 5); any exception is documented and deliberate.
- [ ] Every image meets its size budget (Section 6) and is served at an appropriate size for the requesting viewport.
- [ ] Font payload and family/weight count stay within budget (Section 7).
- [ ] No third-party script has been added without justification, async loading, and a measured cost against the JS budget (Section 8).
- [ ] No layout shift is introduced by late-loading images, fonts, or dynamic content (Section 9).
- [ ] A performance regression blocks release the same way a broken build would (Section 10).
- [ ] Every new dependency has been evaluated against the budgets in this document before being added, not after (Section 11).

---

## What This Document Is Not

This document does not choose a framework, build tool, hosting platform, or specific font family — those remain decisions for `020-tech-stack.md` and `006-design-system.md` respectively. It defines the measurable budgets any such implementation choice must meet, regardless of which specific technology is chosen to meet them. It also does not define animation timing values — those remain deliberately unspecified in `009-motion-system.md`; the numbers here are network and runtime measurements, a different kind of decision entirely.
