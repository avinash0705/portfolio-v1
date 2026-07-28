# Design System Philosophy

**Version:** 1.6
**Status:** Active

---

## Relationship to Design Principles

`005-design-principles.md` defines actionable rules (hierarchy, whitespace, motion, interaction) that any design decision must obey. This document defines the **character** those decisions should share — the point of view that makes every screen feel like it belongs to the same product, inspired by the restraint and precision of products like Linear, Vercel, Stripe Docs, and Apple Developer.

This document does not define tokens — no hex values, type scales, spacing units, or component APIs. It defines the philosophy those tokens must express when they are chosen later. It is opinionated on purpose: a design system with no point of view produces inconsistent output no matter how well-documented its tokens are.

---

## 1. Brand Personality

The portfolio should feel **precise, restrained, and quietly confident** — the visual equivalent of an engineer who doesn't need to raise their voice to be taken seriously.

It is:
- Technical, not corporate.
- Calm, not flashy.
- Confident, not boastful.
- Systematic, not expressive.

It is explicitly not playful, not "startup-friendly," not warm-and-approachable in the consumer-product sense. Per `000-philosophy.md`, the personality exists to support evidence, not to charm a visitor independent of the content.

---

## 2. Visual Language

The interface is built from **flat surfaces, strict alignment, and generous negative space**, with depth introduced only where it communicates layering (Section 8), never for texture or decoration.

Nothing in the interface should look hand-crafted or bespoke per-screen. The same handful of surface treatments, used consistently, should be recognizable across every page — this is what makes the system feel engineered rather than designed page-by-page.

**One narrow, explicit exception**: Call to Action (`008-component-library.md`, Section 10) adds a bold, hand-drawn marker-style underline beneath the primary weight's label only. This is a conscious brand-personality decision for this one component specifically, confirmed directly against a reference, not a reopening of "not hand-crafted" for the interface generally. It stays scoped to Call to Action alone: no other button, control, or surface in the system adopts this illustrative language, and this exception must not be read as licensing hand-drawn treatment elsewhere without its own explicit decision.

An earlier version of this exception also gave Call to Action an irregular, non-rectangular painted-stroke background in place of its normal solid fill. Reverted after a direct comparison against a reference showed a conventional solid rounded-rectangle button reads more clearly as a button — the hand-drawn touch that survives is the underline alone; the background is flat and rectangular again, per this document's general Visual Language rules, not a second illustrative element.

**Containers are the exception, not the default.** Information is organised by rhythm, alignment, and typography before borders, backgrounds, or shadows are introduced. A card, a bordered box, or a coloured background wrapped around a passive block of content must justify its existence the same way a component must (`005-design-principles.md`, Principle 8) — most content doesn't need one. The default question for any section is not "what should its container look like?" but "does it need a container at all?" This is what separates an editorial layout from a dashboard: a case study, a set of highlights, or a metric should read as part of one continuous, carefully typeset document, not as a grid of interchangeable cards.

- **A thin dividing rule between sections is not a container.** It's the same structural signal as whitespace itself, made only slightly more explicit — Navigation's bottom border is this, not a box.
- **Interactive controls are not subject to this rule.** A button or Call to Action needs a visible boundary to be usable — that boundary is a functional affordance, not decorative grouping, and stays governed by `008-component-library.md`'s own component specs.
- **Where a container is legitimate**: code snippets, architecture diagrams, interactive demos, and the zoomable evidence artifacts already described in `008-component-library.md`, Section 8's diagram/artifact variant — content with a genuine functional reason to be visually bounded. Everywhere else, whitespace, alignment, and typographic weight carry the hierarchy instead.

---

## 3. Colour Philosophy

The palette is **neutral-dominant**: the overwhelming majority of the interface is built from a small range of near-black, near-white, and grey surfaces. Colour is not the default state of the interface — it is the exception.

- A **single accent colour** exists, reserved for primary actions and the most important interactive signal on a screen. If more than one thing on a screen uses the accent colour, the hierarchy has failed (per `005-design-principles.md`, Section 2).
- Colour must never be the only carrier of meaning — it reinforces a distinction that size, weight, or position has already established, never the reverse.
- Status colours (success, error, warning) are distinct from the accent colour and used only to convey state, never for emphasis or decoration.
- Light and dark presentations are both first-class outcomes of the same philosophy, not a default theme with a "dark mode" bolted on afterward.

---

## 4. Typography Philosophy

Typography is the primary visual material of the site — per `005-design-principles.md`, content leads and visuals support, and nowhere is that truer than in type.

- One typeface family carries all interface and prose text, with one narrow exception below for large display headings. Outside that exception, visual contrast comes from weight and size, not from mixing multiple typefaces.
- A second, monospaced typeface is used deliberately for technical artifacts — code, metrics, identifiers — signaling technical precision the way Stripe Docs and Vercel use monospace to mark "this is exact," distinct from prose.
- A third, serif display typeface is licensed narrowly for large display headings only — Hero's positioning statement (`008-component-library.md`, Section 2), and any equivalent single largest, most editorial moment on a page. It marks that one moment as the answer to the page's single question, the same way the monospace typeface marks technical precision — it is never used for body copy, UI labels, navigation, or sub-headings (Section Heading, `008-component-library.md`, Section 3), all of which stay governed by the one-typeface rule above.
- Type should read as authored, not templated — line length, rhythm, and weight should feel considered on every page, not just adequate.

---

## 5. Spacing Philosophy

Spacing follows a single systematic rhythm applied everywhere, not ad-hoc values chosen per screen. The system should make it obvious, without measuring, whether two elements are meant to relate to each other.

- Generosity is the default. Density is only introduced deliberately, in contexts that require it (e.g. a metrics table in a case study), never as a byproduct of not having decided on spacing.
- The spacing rhythm is a shared constraint across every page — a page that needs "special" spacing to look right is a sign the layout itself is wrong, not that spacing needs an exception.

---

## 6. Grid Philosophy

A single content grid governs every page. Nothing is positioned outside it by eye.

- Content is constrained to a comfortable measure for reading and scanning — the grid serves comprehension, not decoration.
- The same underlying grid reflows across breakpoints rather than being replaced by a structurally different layout per device — responsive behaviour is the same system adapting, not multiple designs coexisting (breakpoint specifics belong to `007-responsive-strategy.md`).
- Alignment is strict. Elements that appear to float free of the grid undermine the "engineered" quality the brand personality depends on.

---

## 7. Border Radius Philosophy

A single, restrained radius personality is applied consistently across the interface — neither sharp and brutalist, nor soft and playful. The radius should read as a deliberate, quiet decision, not be noticeable on its own.

Very few distinct radius steps exist system-wide (e.g. one for small interactive elements, one for containers) — enough to keep small and large surfaces feeling proportionate to each other, not enough to create visual variety for its own sake.

---

## 8. Elevation Philosophy

Elevation communicates **state and layering**, never decoration. Something is elevated because it is temporarily above the rest of the interface (a menu, a modal, an active card) — not because elevation looks attractive.

- The interface is flat by default. Elevation is the exception, and its presence should always mean something specific to the visitor.
- Elevation is expressed subtly — through restrained shadow or border treatment — never through heavy, skeuomorphic shadow work that draws attention to itself.

This is distinct from Section 2's container principle: elevation governs when something is layered *above* the rest of the interface; Section 2 governs whether ordinary, non-layered content should be boxed at all. A flat, shadowless bordered card is still a container in the sense Section 2 argues against, even though it introduces no elevation whatsoever.

---

## 9. Iconography

A single icon set — Lucide, outline style only, at its default stroke weight — is used everywhere an icon appears. Mixing icon styles (e.g. filled and outlined, or icons from multiple sets) is not permitted, as it breaks the system's consistency principle (`005-design-principles.md`, Section 1). A hand-drawn SVG is permitted only where Lucide has no equivalent glyph the moment genuinely needs; it must still match Lucide's stroke weight and geometry, not introduce a visibly different hand.

Icons support a text label; they do not replace one, especially in navigation — per accessibility and clarity rules already established, an icon alone is rarely sufficient to communicate meaning unambiguously. Icons are used sparingly and only where they add real scanning speed, never as decoration. Choosing a single icon set does not obligate every component to use one — a component that already reads clearly as text alone (e.g. Contact Methods, `008-component-library.md`, Section 11) has no obligation to add icons just because a set now exists.

---

## 10. Illustration Policy

Custom illustration is avoided by default. Generic, stock-style illustration (abstract people, whimsical graphics, decorative blobs) directly contradicts "Engineering Over Marketing" and "Evidence Over Claims" (`000-philosophy.md`) — it is exactly the kind of visual filler that competes with content instead of supporting it.

Real technical diagrams (architecture diagrams, system flows, decision trees) are not illustration in this sense — they are content, and are encouraged wherever they clarify a real technical decision documented in a case study.

A narrow exception exists for abstract, non-figurative technical motifs — crosshairs, dotted grids, measurement marks, thin arcs, blueprint-style guide lines. These may be used where they reinforce information architecture or engineering context, provided they remain low contrast (approximately 3–5% opacity), never compete with primary content, and never depict people, products, metaphors, or illustrative scenes. This is distinct from the illustration this policy otherwise excludes: it carries no narrative or figurative content, only the same geometric, engineered visual language already licensed by Section 2 and Section 6. Which pages actually use this motif is a page-level decision (`014-homepage.md`, Section 6, for the Homepage's current scope) — this section licenses the visual language itself, not any specific placement.

---

## 11. Photography Policy

Stock photography is not used anywhere in the product. Any photography is limited to what is genuinely the author's own — a professional headshot where identity matters (e.g. Home, Resume, Contact) — and nothing else.

Screenshots of real, shipped work are preferred over any staged photography: a screenshot is evidence, in the sense `000-philosophy.md` uses the word; a photograph chosen for mood is not.

---

## 12. Data Visualisation Philosophy

Charts and graphs are used only to clarify a real, specific metric referenced in a case study or resume — never to visually decorate a claim that could otherwise be stated as a plain sentence.

- Every chart must represent real data the author can defend if questioned, consistent with `004-product-goals.md`'s truthfulness constraint.
- Charts prioritise honest, accurate representation (proportional scales, no truncation that exaggerates a trend) over visual drama.
- A single, consistent visual style and colour treatment is used for every chart across the site — a visitor should recognize a chart as belonging to this portfolio before reading its content.

---

## What This Document Is Not

This document does not define colour values, type scales, spacing units, grid breakpoints, radius values, shadow values, specific icon sets, or component APIs. It defines the point of view those future, concrete decisions must express — the decisions themselves belong to implementation-stage documentation, not this series.
