# Implementation Log

This is not a specification document — it's a working record kept during Phase 2 (`025-roadmap.md`) so specification maintenance stays intentional instead of happening after every single component.

**Triage rule in effect:**
- **Implementation bug** → fixed immediately, not logged here.
- **Ambiguity resolved by a defensible implementation-level judgment call, with no actual spec defect** → noted in the component's own commit message, not logged here either.
- **A genuine gap, inconsistency, or missing cross-reference in the specifications themselves** → logged below.
- **Once two or more logged gaps share a root cause**, or a single logged gap is confirmed still relevant after several more components, batch them into one small, deliberate specification maintenance commit — not one doc edit per component.

`v1.0-spec` (commit `0c6d809`) remains the frozen baseline throughout. Nothing here retroactively changes what that tag represents.

---

## Milestones

| Milestone | Reached at | Notes |
|---|---|---|
| **Phase 2A Complete** — core reusable UI foundation | commit `37d2500`, tag `phase-2a-complete` | Navigation, Section Heading, Highlight, Call to Action, and Metric / Evidence Block (numeric) implemented, each verified against `008` and `028`, each tracked through this log. The one genuine specification conflict encountered (item #2) was found and resolved *before* code existed, not discovered after. |
| **Component Library Complete** — all 11 entries in `008-component-library.md` | commit `937cd06`, tag `component-library-complete` | Track A finished. The strongest signal from the final three components (Decision/Trade-off Block, Case Study Preview, Journal Preview) wasn't how much they reused — it's that the library could correctly say *no* to reuse where responsibilities didn't genuinely match (Case Study Preview declining Section Heading; both previews declining to share code with each other despite near-identical shape), while still reusing where they did (Highlight embedded in Experience Summary). Zero new npm dependencies across all 11 components. |

**Track A is finished. Track B (page composition) is unblocked**: building the seven pages (`014`–`019`, `026`) is now compositional — assembling already-verified pieces against each page's own spec — rather than creative, which keeps implementation risk low precisely because it comes last, as planned from the start.

**Specification Coverage Review completed** before Track B began — see its own section below. Surfaced two real findings (`ThemeToggle` doesn't match `028`'s icon-morph spec; no automated test suite exists) and confirmed coverage/ownership/reuse held as intended across all of Track A.

**Track B, Page 1 — Homepage composed** (commit `92946ac`): assembled entirely from already-verified components in `014`'s exact section order, no new component created or needed. Two ambiguities (the sanctioned Primary CTA repeat; per-section heading titles) resolved before composing, both confirmed correct against real SSR output afterward — not discovered as problems during composition. Remaining pages: Case Studies, Experience, Journal, Contact, Resume, AgentPrep, per the architectural-value order agreed for Track B.

Per the agreed sequence, still pending, deliberately not done yet: the `ThemeToggle` conformance fix and the testing-strategy ADR — both scheduled after the first homepage integration pass, not before it.

**Post-Completion Amendments (v1.2) — Track B Prerequisites.** Not a reopening of the "Component Library Complete" milestone above, which remains a historically accurate record of what Track A actually shipped. What follows is new: Track B's Homepage composition exposed a genuine architectural gap (a structural primitive the page needed that didn't exist yet), resolved the same way every other real gap in this project has been — by amending the specification before writing code, not by treating the library as either frozen or casually editable. A product-level visual direction (reference screenshot plus external design discussion) proposed four elements — navigation refinement (already covered by the pending `ThemeToggle` fix), a hero background motif, a left-rail section index with numbering, and increased section spacing. Checking this against the frozen specification, rather than implementing directly, surfaced two genuine tensions instead of one straightforward addition:

1. The hero's capability-summary side panel is a container, conflicting with `006`'s "containers are the exception" principle (v1.1).
2. The hero background motif is a form of illustration, and `014-homepage.md`, Section 6 explicitly bans decorative illustration on the Homepage by name.
3. A scroll-linked fill on the proposed section index would be a fourth entry in `028`'s Delight Moments (Section 17), which explicitly caps itself at three.

All three resolved as amendments, before any component was built — the same "resolve real behavior-changing decisions immediately" discipline already applied to the `028` Section 12/22 conflict and the original containers amendment:

- `006-design-system.md` (v1.1 → v1.2): Hero's capability panel added as a named container exception (Section 2); a narrow, broadly-scoped exception added to the Illustration Policy (Section 10) for abstract, non-figurative technical motifs (crosshairs, dotted grids, measurement marks) at ~3–5% opacity — the exception licenses the visual language itself, not a specific placement, so it can be reused elsewhere (e.g. Case Study diagrams) without reopening this document.
- `014-homepage.md` (v1.0 → v1.1): Section 6's illustration ban now carves out the `006` Section 10 exception explicitly, so the two documents don't contradict each other; figurative illustration and stock art remain fully banned.
- `008-component-library.md` (v1.0 → v1.1): Hero's content ownership (Section 2) extended to permit the capability panel, gated on every bullet being independently verifiable elsewhere in the portfolio (`000-philosophy.md`'s "Evidence Over Claims"), not a generic unbacked claim. New **Section 12 — Section Index**, a genuinely new component (position/sequence/progress) kept deliberately distinct from Section Heading (identity/title/description) — satisfies the Guardrail Principle's two-page threshold on its own (Homepage, Case Studies, AgentPrep), no exception needed. Entirely `aria-hidden`, since it duplicates structure a screen reader already gets from real headings. Explicitly scoped to structural position, not reading-progress estimation, so it can't scope-creep into a percentage-read indicator later.
- `028-interaction-language.md` (v1.1 → v1.2): Section 5 (Spatial Continuity) gained the Section Index's scroll-driven advancement, classified positively as continuity ("communicates location, not reward or surprise") rather than merely excluded from Section 17 — the classification is what keeps Section 17's cap at three intact. Noted as exempt from Section 18's duration table, since it's continuous rather than a fixed-duration transition, for the same reason other scroll-position-driven behaviour already is.

No doc change was made for the increased section spacing — `006` Section 5 never defined a numeric scale, so this is a Tailwind token adjustment at implementation time, not a specification concern.

Not yet built: the Section Index component itself, the hero capability panel, and the technical motif — this entry records the specification amendment only. Implementation follows the usual pre-implementation → build → verify → post-implementation cycle, same as every Track A component.

**Section Index — implemented** (`components/section-index/SectionIndex.tsx`). Built first, per the agreed order (Section Index → technical motif → hero capability panel), since it's the only genuinely new primitive — the other two extend an existing component and an existing policy, respectively.

- **Against `008`, Section 12**: `sectionIds: string[]` is the entire content-ownership surface — no title, no description, matching the spec's boundary against Section Heading exactly. Position is measured against real section `offsetTop`/`offsetHeight` (the same DOM-measurement technique already established by `NavList.tsx`'s active-page indicator), not estimated from scroll percentage. A marker's `reached` state is a step function of which section index the visitor has crossed into — nothing is proportional to scroll distance within a section, satisfying the structure-not-reading-progress distinction directly.
- **Against `028`, Section 5**: the colour flip between "upcoming" and "reached" is a discrete 150ms transition (the house easing curve), applied only to the state change itself — there is no continuous, distance-proportional animation to exempt from Section 18's table in the first place, which resolves the amendment's classification question by construction rather than by convention.
- **Accessibility**: the entire element is `aria-hidden`, verified directly — real SSR output shows the Section Heading structure unchanged and no duplicate numeric content exposed to assistive technology.
- **Verified**: format/typecheck/lint/build all pass. A throwaway route (`app/section-index-smoke-test`) confirmed the component mounts without error, accepts `sectionIds` and renders nothing server-side (returns `null` until client-side measurement runs — same accepted pattern as `NavList`'s indicator), and that the real `<section id="...">` elements it depends on render with intact ids for client-side `getElementById` lookups. A `@ts-expect-error` check confirmed `sectionIds` is a required prop, not optional. Route deleted after verification; a full rebuild afterward confirmed no residue. **Not verified**: actual scroll-linked marker/line behaviour, and visual alignment against real section boundaries — both require a real browser, which isn't available in this environment, consistent with the same disclosed limitation already recorded for `NavList` and `AnimatedOverlay`.
- **Does the amendment justify its existence?** Honestly: more clearly for Case Studies and AgentPrep (ten fixed sections each, per `015`/`016`) than for the Homepage (six sections, a short page a visitor rarely loses their place in). The orientation value is real on long, fixed-structure pages; on the Homepage it leans more decorative than functional. That's not a reason to withhold it from the Homepage — `008`'s Guardrail Principle already requires two qualifying pages, and Homepage genuinely is one of them — but it is worth recording plainly rather than asserting uniform value across all three pages it will serve.
- **Not yet done**: wiring `SectionIndex` into the real Homepage composition (`app/page.tsx`), which needs a layout change (a two-column grid so the rail aligns with actual section boundaries) — deferred to when Homepage's composition is next revisited, not bundled into this component's own verification cycle, matching how Track A always verified components before any page used them for real.

**Technical Motif, Hero capability panel, and Section Index Homepage integration — implemented.** Completes the second and third items from the agreed order (technical motif, hero capability panel) and closes out Section Index's deferred integration in the same pass, since all three land on the same page.

- **`components/decorative/TechnicalMotif.tsx`**: inline SVG (dotted grid + concentric crosshair circles + an arc + a measurement mark), `currentColor` + a single `opacity-[0.04]` utility so it's correct in both themes without separate assets. Deliberately kept outside `008-component-library.md` — it owns no content or variant responsibility a page composes around, the same reasoning colour tokens and spacing don't get their own library entry either.
- **Hero (`components/hero/Hero.tsx`)**: added the optional `capabilities` prop per `008`'s amended content ownership, rendered as the one named container exception; asymmetric two-column layout (headline/CTA column, capability panel column) on `lg:`, stacking on smaller viewports; motif placed behind the row, `hidden` below `lg:` so it never competes with content at narrow widths. `id="hero"` added as Section Index's anchor.
- **Two deliberate omissions from the reference screenshot**, both content-ownership boundaries, not oversights: no icons in the capability panel (no icon library has been chosen for this project — `006`, Section 9; the same reasoning already applied to Contact Methods), and no second supporting sentence beside the positioning statement (`008`, Section 2 still caps Hero at *one* positioning sentence — the screenshot's extra sentence isn't licensed content).
- **`app/page.tsx`**: rewritten as a two-column layout (`SectionIndex` + content column), all six sections given ids matching `SECTION_IDS` exactly, a thin `border-t` between sections (the already-licensed dividing-rule pattern, `006` Section 2 — not a new exception), and increased vertical rhythm (`py-16` → `py-20 lg:py-28`, `Hero`'s `py-24` → `py-24 lg:py-32`). Highlights and Case Studies moved to responsive grids (`sm:grid-cols-3` / `sm:grid-cols-2`) now that the content column is wider than the previous `max-w-2xl` — a page-composition layout choice, not a component change (`008`'s own "Reasons not to create a new variant" reasoning for Case Study Preview and Journal Preview).
- **Also not carried over from the screenshot**: the per-section "View all →" links beside each heading. Nothing in `008` or `014` licenses this pattern on Section Heading or anywhere else — adding it now would be inventing UI the specification doesn't describe, not implementing something already decided.
- **Navigation**: a small `aria-hidden` accent dot added beside the wordmark, matching the reference. A visual-styling change within `006`'s existing token set, not a content-ownership change — Navigation's owned content (six items, current-page indicator) is unchanged.
- **Verified**: format/typecheck/lint/build all pass. Served the real production build on `/` and confirmed against actual rendered HTML: exactly one `<h1>`, five `<h2>`s in the correct order, all six section ids present in the correct order, the capability panel's three labels present in order, exactly two real "View Case Studies" CTAs (Hero + Case Studies section, the already-sanctioned repeat), and the motif SVG present exactly once. **Not verified**: `SectionIndex`'s actual scroll-linked behaviour and real pixel alignment against section boundaries now that it's wired into a real page (same disclosed limitation as its own entry above), and any visual/spacing judgment — no browser available in this environment.
- **Display typeface — flagged, then resolved.** The reference direction asked for a premium editorial serif on the large headline (Newsreader/Instrument Serif/Fraunces). `006-design-system.md`, Section 4 stated plainly that "one typeface family carries all interface and prose text... contrast comes from weight and size, not from mixing multiple typefaces" — a second, non-monospace typeface directly contradicted that sentence as written, so it was flagged rather than implemented, the same treatment as the container/illustration/delight-cap conflicts earlier in this document. Approved as a `006` amendment (v1.2 → v1.3): a third, serif *display* typeface, licensed narrowly for large display headings only (currently only Hero's positioning statement qualifies) — never body copy, UI labels, navigation, or sub-headings, which stay on the one interface typeface. Implemented with **Newsreader** (`next/font/google`, zero new dependency, same pattern as the existing Geist setup) — chosen over Instrument Serif and Fraunces for reading calmer and more literary at large sizes, closer to "precise, restrained, quietly confident" (`006`, Section 1) than a higher-contrast or more expressive display serif. Wired as a `--font-display` Tailwind theme token (`styles/globals.css`), giving a `font-display` utility class exactly like `font-sans`/`font-mono` already work — applied only to Hero's positioning statement. Verified: format/typecheck/lint/build clean; real production build confirmed the Newsreader CSS variable class on `<html>` and the `font-display` class on the actual headline element. **Not verified**: how the typeface actually looks rendered — no browser available in this environment.

**`ThemeToggle` conformance fix — implemented.** Closes Outstanding Item #1 from the Specification Coverage Review, the last of Track A's two disclosed gaps (the test suite ADR is still open). Replaced the text-label swap with a cross-fade + rotate between two stacked, hand-drawn sun/moon SVGs — `028` Section 17's third named delight moment, at Section 18's "fast" tier. No icon library added; both icons are inline, hand-drawn paths, consistent with the "no icon library chosen" decision already made for Contact Methods. Accessible name moved to `aria-label` on the button (`"Switch to light/dark mode"`), since the visible text label it previously carried is gone. `suppressHydrationWarning` moved from the inner text span to the button itself — the documented escape hatch for exactly this shape of unavoidable server/client mismatch (the server can't know the visitor's stored theme preference), now covering an icon pair and an aria-label instead of text content. Verified: format/typecheck/lint/build clean; real production build confirmed the correct default `aria-label` and both icon paths present in SSR output.

**Icons, Hero's second sentence, and Section Heading's "view all" link — approved as real scope changes, then implemented.** A follow-up design direction treated the reference screenshot as a literal reproduction target, which would have silently reversed three deliberate decisions from the round above (no icon library, Hero capped at one sentence, no "view all" pattern). Flagged each rather than implementing them — the same discipline as every other tension in this document — and got an explicit answer on both: yes to an icon library, yes to both content-scope amendments.

- **`lucide-react` added** — the first new npm dependency in this project's history, ending the "zero new dependencies" streak deliberately, not by drift. `npm audit` after install still reports only the same pre-existing dev-tooling vulnerability chain (`brace-expansion`/`minimatch`/eslint) already disclosed earlier in this document — nothing new introduced by this package.
- **`006-design-system.md` (v1.3 → v1.4)**: Section 9 amended to name Lucide (outline style, default stroke weight) as the one chosen icon set, with a narrow allowance for a hand-drawn SVG only where Lucide has no equivalent glyph, matched to Lucide's own weight/geometry. Also states explicitly that choosing a set doesn't obligate every component to use it — Contact Methods' text-only treatment stands unchanged, its stale "no icon library chosen" comment corrected for accuracy rather than reversed.
- **`008-component-library.md` (v1.1 → v1.2)**: Hero's content ownership (Section 2) extended for one optional supporting sentence beneath the positioning statement — capped at one sentence, and it may only restate or extend the positioning statement's existing claim, never introduce a new one. Section Heading's content ownership (Section 3) extended for an optional trailing "view all" link, licensed only where the fuller destination is a real, already-documented page in `003-information-architecture.md` — not a license to imply a page that doesn't exist.
- **Implementation**: `ThemeToggle`'s hand-drawn sun/moon paths replaced with Lucide's `Sun`/`Moon` (consistency with the new single-icon-set rule — mixing a hand-drawn pair with a library elsewhere would violate the very rule just written). Hero's capability panel gained an `icon: LucideIcon` field, caller-supplied per bullet (`Gauge`, `Accessibility`, `TrendingUp`) so Hero itself stays icon-agnostic. `CallToAction` gained a trailing `ArrowRight`, decorative only — the label alone remains the accessible name. `SectionHeading` gained `viewAllHref`/`viewAllLabel`, rendered only where both are supplied.
- **A disclosed omission, not an oversight**: Highlights' section heading has no "view all" link. `003-information-architecture.md` has no dedicated Highlights index page for one to point to — the amendment's own "only where a fuller version genuinely exists" clause rules it out. Experience, Case Studies, and Journal all got real links (`/experience`, `/case-studies`, `/journal`), since those destinations already exist.
- **Verified**: format/typecheck/lint/build clean; real production build confirmed the supporting sentence, all three real "view all" links (correct hrefs, correct sections) and zero occurrence of one inside Highlights, the capability panel's three icon wrappers, and the CTA arrow icons all present in actual rendered HTML.

**Hero panel replaced: capability claims → quick-links tiles.** After seeing the real rendered page, the capability panel (Performance/Accessibility/Impact) was replaced entirely with a 2×2 grid of icon-and-label tiles linking to Case Studies, Resume, Journal, and Contact — a different responsibility (secondary navigation, not evidence claims), not a restyle of the same content.

- **`006-design-system.md`**: the now-stale reference to "the Hero's capability-summary panel" removed from Section 2's legitimate-container list — the quick-link tiles need no named exception of their own, since each tile is a real link (an interactive control), already covered by the existing "interactive controls are not subject to this rule" carve-out. One fewer named exception than before, not one more.
- **`008-component-library.md` (v1.2 → v1.3)**: Hero's content ownership rewritten — the capability-summary panel's "independently verifiable claim" language is gone, replaced by a quick-links panel of up to four icon+label tiles, each required to point to a real, already-documented destination in `003-information-architecture.md`. Explicitly stated as a *secondary, lightweight navigation aid, not a second CTA hierarchy* — it must stay visually subordinate to the primary/secondary CTA above it, which is the mechanism that keeps a Contact tile here from violating `014-homepage.md` Section 4/6's rule against Contact competing with Case Studies for the visitor's first action. This was a real tension worth naming, not silently accepted: resolved by construction (muted, unfilled tile styling vs. the solid-accent primary CTA) rather than by dropping Contact from the grid or escalating for another decision.
- **Implementation**: `Hero.tsx`'s `capabilities` prop replaced with `quickLinks: {label, href, icon}[]`; each tile is a real `Link`, bordered (justified as an interactive control, not passive grouping), with a hover state that only shifts border/background colour and the icon's tint — never a scale or transform, per `028-interaction-language.md`, Section 8. `TechnicalMotif` is unchanged — it already sat behind the whole Hero row, not scoped to the old panel specifically.
- **Verified**: format/typecheck/lint/build clean; real production build confirmed all four tiles render with correct labels and hrefs (`/case-studies`, `/resume`, `/journal`, `/contact`), and that the old capability-panel copy is gone entirely.

**Quick-links refined: tic-tac-toe divider grid + hover icon morph.** After seeing the real rendered tiles, two craft-level refinements, both still governed by the same content-ownership boundary from the previous entry — no new spec amendment needed, this is styling and interaction, not a responsibility change.

- **Divider grid**: the four individually-bordered, gapped tiles replaced with one outer bordered/rounded container and a single vertical + single horizontal internal divider line — computed per-tile from grid position (`index % 2` for the column divider, `index < 2` for the row divider), not Tailwind's `divide-x`/`divide-y` utilities, which apply by DOM sibling order and produce an incorrect pattern on a 2-row grid (a spurious line would land on the bottom-left tile). Verified directly against real SSR output: exactly one tile has both a right and bottom border (top-left), one has right-only (bottom-left), one has bottom-only (top-right), and the fourth has neither (bottom-right) — the single vertical + single horizontal line this was meant to produce.
- **Hover icon morph**: each tile now shows a "closed" icon by default and its "open" counterpart on hover (`Folder`→`FolderOpen`, `File`→`FileText`, `Book`→`BookOpen`, `Mail`→`MailOpen`) — a CSS-only cross-fade (`group-hover:opacity`), the same technique as `ThemeToggle`'s click-triggered morph, applied on hover instead. Both icons in every pair come from Lucide, so this stays inside `006` Section 9's single-icon-set rule rather than introducing a second style. Being pure CSS (no JS state), `motion-reduce:transition-none` works as a native Tailwind variant here, unlike `ThemeToggle`/`NavList`/`SectionIndex`, which all need a JS `matchMedia` check because they compute inline styles — Hero stays a Server Component throughout.
- **A question raised, not acted on**: whether to add a `Sparkles`-style decorative icon elsewhere, referencing the earlier reference-image discussion. Not added — `Sparkles` doesn't map to any of the four real destinations these tiles link to, and doesn't have a natural closed/open pairing the way the four chosen icons do. Icons here are functional (identify a destination, demonstrate on hover), not decorative flourish, per `006` Section 9's "never as decoration" rule — flagged back rather than added without a clear purpose.
- **Verified**: format/typecheck/lint/build clean; real production build confirmed the divider pattern (above) and both icons of every pair present with correct opacity classes in actual rendered HTML.

**Section Index alignment fix + dashed connector.** An annotated reference screenshot flagged that each marker should align with its section's visible heading, not the section's top padding, and that the connecting line should read as dashed rather than solid.

- **Alignment**: `id` attributes moved from each `<section>` wrapper onto the heading itself — `Hero`'s role `<h1>`, and `SectionHeading`'s own `id` prop for every other section. Previously the id lived on the padded `<section>` box, so Section Index measured `offsetTop` at the top of ~80–112px of empty padding, not the heading text — the marker and the heading it corresponds to were never actually level with each other. This also incidentally fixes anchor-linking (`027-application-behaviour.md`, Section 2): a `#case-studies` link now lands at the heading, not at empty space above it. No `008` amendment needed — Section Index's own spec never dictated *which* element to measure, only what it represents.
- **Dashed connector**: the connecting segment between markers changed from a solid filled bar (`bg-accent`/`bg-border`) to a `border-l-2 border-dashed` line — still "the connecting line between markers" per `008` Section 12's content ownership, just styled differently. No spec change; a visual choice.
- **Verified**: format/typecheck/lint/build clean; real production build confirmed every section's `id` now lives on its `<h1>`/`<h2>` (not the outer `<section>`, confirmed absent), and the dashed-border class is present in the source. Section Index's own markup (measured, client-only) still can't be checked via `curl` — same disclosed limitation as its original implementation entry.

---

## Specification Coverage Review (run after Component Library Complete, before Track B)

Not a new specification, and not a restatement of one — five questions, answered against the real repository state, checked directly rather than assumed. Two real, previously undisclosed findings came out of doing this properly (see Sections 4 and 5) — the review earned its place by finding something.

### 1. Coverage — has each document from `000` onward actually influenced implementation?

| Document | Status | Where / why not |
|---|---|---|
| `000-philosophy.md` | Direct, pervasive | Every restraint decision (no icon library, hand-rolled `cn()`/theme instead of a dependency, no marketing language) traces back to this. |
| `001-vision.md` | Indirect | Shaped Hero's positioning-statement framing conceptually; not yet exercised against real content (Phase 3). |
| `002-user-personas.md` | Indirect | Cited in accessibility/testing reasoning (`010`, `023`); no persona journey has been walked end-to-end yet since no real pages exist. |
| `003-information-architecture.md` | Direct | Navigation's fixed six-item order (`lib/nav-items.ts`); link-discovered scoping for both previews. |
| `004-product-goals.md` | Direct | Single-author/no-unnecessary-dependency reasoning cited in nearly every dependency decision — directly responsible for zero new npm packages across all 11 components. |
| `005-design-principles.md` | Direct | Hierarchy, whitespace, and interaction rules implemented in every component. |
| `006-design-system.md` | Direct | Tailwind tokens; the containers-are-the-exception amendment shaped every component's no-box treatment. |
| `007-responsive-strategy.md` | Partial | Only Navigation's mobile disclosure exercises it; full page-level reflow untested — no pages exist yet. |
| `008-component-library.md` | Direct | Central governing document; all 11 entries implemented. |
| `009-motion-system.md` | Direct | Duration tiers and reduced-motion checks in `NavList`/`AnimatedOverlay`. |
| `010-accessibility.md` | Direct | Accessible names, single-link-target rules, alt text, semantic structure in every component. |
| `011-performance.md` | Partial | Zero-new-dependency and Server-Component-by-default discipline honored; Core Web Vitals/Lighthouse never actually measured against a real build. |
| `012-seo.md` | Not yet | No metadata/structured data work has touched any component — correctly deferred to Track B/Phase 3. |
| `013-content-strategy.md` | Not yet | Governs authored content, not component code — correctly untouched until real content exists. |
| `014-homepage.md` | Direct | Hero's content ownership. |
| `015-case-studies.md` | Direct | Metric/Evidence Block, Decision/Trade-off Block, Case Study Preview. |
| `016-agentprep.md` | Direct (via shared components) | No AgentPrep-specific component built — `Product Timeline` correctly stays page-scoped, not promoted, per `008` itself. |
| `017-journal.md` | Direct | Journal Preview's category taxonomy; Decision/Trade-off Block's Journal usage. |
| `018-resume.md` | Direct | Experience Summary's full-tabular variant. |
| `019-contact.md` | Direct | Contact Methods. |
| `020-tech-stack.md` | Direct | Foundational — the entire Phase 1 scaffold. |
| `021-folder-structure.md` | Direct | Component/content/lib folder structure. |
| `022-coding-standards.md` | Direct, pervasive | Discriminated unions, rule-of-three, Server/Client discipline in every component. |
| `023-testing.md` | Partial — see Section 4 | The most significant gap this review surfaced. |
| `024-deployment.md` | Partial | CI has typecheck/lint/format/build; the fuller gate pipeline (content validation, performance, accessibility) explicitly deferred, as disclosed in the CI workflow's own comments since Phase 1. |
| `025-roadmap.md` | Direct | Literally the executed plan. |
| `026-experience.md` | Direct | Experience Summary's narrative variant. |
| `027-application-behaviour.md` | Partial | Theme system, external link handling, 404 page implemented; reading behaviors (TOC, reading progress) untested — no long-form pages exist yet. |
| `028-interaction-language.md` | Partial — see Section 5 | Durations/easing/spatial continuity implemented; two of three delight moments not yet built. |

### 2. Ownership — did implementation ever require changing a component's content ownership?

**No.** Re-checked every component's final prop shape against `008`'s original content-ownership language for it. Additions like Section Heading's `id` or Experience Summary's `evolutionNote` are technical/rendering capability added *within* already-stated ownership, not new categories of content a component now owns. No component ended up owning more, less, or different content than `008` originally specified for it.

### 3. Reuse

- **Reused directly (component-in-component)**: `CallToAction` (by Hero), `Highlight` (by Experience Summary).
- **Reused as pattern, not code**: discriminated unions for variant safety; closed literal unions for fixed value sets (`JournalCategory`); configurable heading-level props; no-container styling everywhere; hover-colour-shift for block-level preview links (Case Study Preview, Journal Preview); underline-draw for inline prose links (Highlight, Contact Methods) — both CSS patterns sitting at exactly 2 occurrences, never forced to a third.
- **Deliberately not reused**: Section Heading declined by Case Study Preview; the two previews declined sharing code with each other; Metric/Evidence Block's three variants stayed separate rather than merging into one.

### 4. Verification — the most important finding in this review

- **Automated, in CI, every commit**: typecheck, lint, format, build.
- **Real, but manual and *not preserved***: every SSR/markup correctness check (throwaway routes + `curl`), every `@ts-expect-error` confirmation across all 11 components — genuinely run, genuinely passed, **none committed as a re-runnable test file**. This is the single most important thing this review surfaced: rigor at time-of-writing has not been converted into regression protection. A future change to, say, `Highlight`'s discriminated union could silently break tomorrow without anything in this repository catching it — every check this project has relied on so far only proved the code was correct *at the moment it was written*.
- **Not yet verifiable**: visual/interaction appearance (no browser available throughout this project); real accessibility testing (keyboard-only and screen-reader passes per persona journey, per `010`'s own testing philosophy — never actually performed); Core Web Vitals/Lighthouse against a real build; responsive reflow at real page scale.

### 5. Outstanding Items (deliberately deferred, not bugs)

1. ~~`ThemeToggle` uses a text-label swap ("Light mode"/"Dark mode"), not the icon morph `028`'s Delight Moment #3 specifies.~~ **Resolved** (see Post-Completion Amendments, below) — replaced with a cross-fade/rotate sun-moon icon pair, hand-drawn SVG (no icon library), accessible name moved to `aria-label` now that the visible text label is gone.
2. Copy-to-clipboard confirmation (`028`'s Delight Moment #2) — not built; no code blocks exist yet to attach it to.
3. In-page zoom overlay for diagram evidence — explicitly deferred at build time (progressive-enhancement baseline only), already disclosed in that commit.
4. Mobile navigation's disclosure panel has no sliding continuity indicator — a scoped decision from Navigation's original implementation.
5. **No automated test suite exists anywhere in the repository** — see Section 4.
6. `023`'s fuller testing pyramid (component tests, e2e persona journeys, automated content validation) — not implemented; only the base CI gates exist.
7. `024`'s fuller deployment pipeline (performance/accessibility automated gates) — not implemented, disclosed in the CI workflow's own comments since Phase 1.
8. `007`, `011`, `027`'s remaining behaviors (full responsive reflow, Core Web Vitals, reading progress/TOC) — untested, since no full pages exist yet to exercise them.
9. `012`/`013` (SEO, content strategy) — entirely unexercised, correctly deferred until Track B/Phase 3.

**Summary**: coverage and ownership held exactly as hoped — no document was ignored without a reason, and no component's boundaries had to move. The reuse result matches what emerged organically across Track A: real reuse where responsibility matched, real refusal where it didn't. The one place this review earned its keep is Section 4 — the gap between "verified" and "verified and protected going forward" was real, and items #1 and #5 in Section 5 were not previously known before this review checked the actual files rather than trusting prior summaries.

---

## Component Library Health Check (after Metric / Evidence Block completed all three variants)

A deliberate pause before Hero, per the same discipline as the design-review pauses — not another spec review, an implementation-quality one. Answered against the real, accumulated source, not from memory:

- **Single responsibility maintained across all six implemented pieces?** Yes, no drift found.
- **Any API grown more complex than intended?** No — the discriminated-union / required-not-defaulted pattern has kept APIs narrower than a naive implementation would, not wider.
- **Repeated pattern needing extraction?** Yes, found and fixed: a number-with-prefix/suffix formatter was duplicated near-identically in three files (`MetricEvidenceBlock.tsx`, `MetricEvidenceBlockComparative.tsx`, `AnimatedOverlay.tsx`) — a genuine third occurrence per `022-coding-standards.md`, Section 2's rule of three. Extracted to `lib/formatMetricValue.ts`; all three call sites updated; re-verified against real SSR output (both the numeric `40%` and the comparative `−52%` cases) that behavior is unchanged.
- **A second candidate, deliberately left alone**: the house easing curve string appears in `NavList.tsx` (JS constant) and as inline Tailwind arbitrary values in `Highlight.tsx`/`CallToAction.tsx` — two occurrences in one mechanism, one in a different mechanism. Below the extraction threshold; watched, not fixed, on purpose.
- **A disclosed, un-fixed inconsistency**: `AnimatedOverlay.tsx`'s JS-side interpolation uses a generic cubic ease-out as an approximation of the house `cubic-bezier(0.16, 1, 0.3, 1)` curve, not the exact curve (not cheaply expressible as a closed-form JS function). Visually negligible; not worth a real Bezier solver.
- **Any ownership boundary forced to change?** No.
- **Has the spec gap count changed?** No — still 1 open, 1 resolved, stable across both new variants.
- **Becoming more compositional?** Yes, in idiom: the "invalid states unrepresentable" pattern now appears consistently across four different components, converged rather than reinvented each time.

---

## Specification Clarifications Discovered During Implementation

| # | Found during | Gap | Status |
|---|---|---|---|
| 1 | Section Heading | `027-application-behaviour.md`, Section 2 requires per-section anchor-links for Case Studies/AgentPrep, but `008-component-library.md`, Section 3 (Section Heading's own spec) never cross-references that requirement — despite Section Heading being the component that has to expose it. Resolved in code (optional `id` prop); not yet reflected in the docs. | Open — 1 of 1, below the 2-gap threshold |
| 2 | Metric / Evidence Block design review (pre-implementation) | `028-interaction-language.md`, Sections 12 and 22 conflicted with each other: Section 12 licensed counting a metric up from zero; Section 22 required evidence never be partially visible mid-animation — a literal count-up is partially-visible-by-definition. Not a missing cross-reference like #1; an actual internal contradiction. | **Resolved** — `028` amended directly (v1.0 → v1.1) rather than logged-and-batched, since it changes component behaviour, not just editorial completeness. Canonical value is now always present/correct/selectable; any animation is a decorative overlay that never touches it. Animation technique de-mandated from "count from zero" to implementation-defined; added a large-value carve-out (no forced full sweep from zero for millions/billions-scale metrics). See commit amending `028-interaction-language.md`. |

---

## Implementation Matrix

| Component | Implemented | Verified vs `008` | Verified vs `028` | Spec gaps logged |
|---|:---:|:---:|:---:|:---:|
| Navigation | ✅ | ✅ | ✅ | 0 (3 ambiguities resolved as implementation choices — see commit `6438e93`; none rose to a logged spec gap) |
| Section Heading | ✅ | ✅ | ✅ | 1 (#1 above) |
| Highlight | ✅ | ✅ | ✅ | 0 (type-level enforcement of link accessibility verified directly — see commit) |
| Call to Action | ✅ | ✅ | ✅ | 0 ("one primary per page" enforcement boundary noted — component design supports it, cannot mechanically enforce it; consistent with existing 008/013 split, not a gap) |
| Metric / Evidence Block — numeric | ✅ | ✅ | ✅ | 0 net (item #2 above surfaced and resolved during design review, before code) — canonical-value claim verified directly against real SSR output, not just code inspection. |
| Metric / Evidence Block — comparative | ✅ | ✅ | ✅ | 0 — delta computation (normal, before=0, no-change cases) verified against real SSR output. |
| Metric / Evidence Block — diagram/artifact | ✅ | ✅ | ✅ | 0 — zoom ships as progressive-enhancement baseline only (disclosed scope decision, in-page overlay deferred); verified against a real generated test image, including fetching the linked full-size URL directly (200, image/png). **Metric / Evidence Block is now complete — all three variants implemented.** |
| Hero | ✅ | ✅ | ✅ | 0 — `<h1>` placement (role, not name or positioning statement) was a genuine open choice resolved as engineering judgment, not a spec defect. Heading structure, content, and both CTAs verified against real SSR output; caught and corrected a wrong attribute-order assumption in my own verification pattern before accepting the result. |
| Case Study Preview | ✅ | ✅ | ✅ | 0 — **the composition finding that mattered most**: the prediction going in was that this component would compose richly from Highlight/Metric/CTA. Re-reading 008's actual content ownership (title, one-line summary, link — nothing else), that would have been a spec violation, not an achievement. Reused almost nothing, deliberately: considered reusing Section Heading (shape matches — short label + optional description) and declined, since its stated responsibility (introduce a page section) genuinely differs from this one (identify a link within a list). Single-link-target structure and aria-label precision verified against real SSR output. |
| Journal Preview | ✅ | ✅ | ✅ | 0 — confirms the same pattern Case Study Preview established: near-identical shape to Case Study Preview, deliberately not shared as code (2 occurrences, below rule-of-three, same threshold applied to the underline-draw CSS). Category modeled as a closed literal union (`JournalCategory`, exported for reuse by future Journal pages) rather than a plain string — an invalid or missing category is a compile error, verified via @ts-expect-error. No colour-coding per category, confirmed against real SSR output. **Component Library Complete — all 11 entries in 008-component-library.md implemented and verified.** |
| Experience Summary | ✅ | ✅ | ✅ | 0 — two components, not three: condensed (genuinely different shape, teaser only) stays separate, but full-tabular and narrative unified into one (`ExperienceSummaryList`) since an optional per-role `evolutionNote` field is the only difference between them, per 008's own "same underlying data" framing. Reuses `Highlight` for role bullets (exported `HighlightProps` from Highlight.tsx first — additive, no behaviour change). Reused-union enforcement, heading structure, and the embedded Highlight's real markup all verified against SSR output. |
| Decision / Trade-off Block | ✅ | ✅ | ✅ | 0 — one component with a discriminated union (not two separate files, unlike Metric/Evidence Block's genuinely different variants), since decision and trade-off share identical rendering shape per 008's own "share the same content-ownership rule." Mandatory counter-statement and mixed-kind rejection both verified via @ts-expect-error; no-container compliance verified against real SSR output. |
| Contact Methods | ✅ | ✅ | ✅ | 0 — no icon (no library chosen for this project; not mandated by 006, only constrained if used). Email vs. LinkedIn/GitHub tab/external-marker asymmetry verified against real SSR output. Reuses the exact underline-draw CSS from `Highlight` — now 2 occurrences, still below the rule-of-three extraction threshold, watched not fixed, same discipline as the easing-curve constant. |

Order follows the sequence agreed in conversation, not `008-component-library.md`'s own listing order: Navigation → Section Heading → Highlight → Call to Action → Metric / Evidence Block (given deliberate extra attention, per its centrality to "Evidence Over Claims") → Hero → **Decision / Trade-off Block → Experience Summary → Contact Methods → Case Study Preview → Journal Preview** (re-sequenced to keep delaying page-shaped components until last).

---

## Engineering Metrics

Tracked from Navigation onward, backfilled accurately against the real commit history (not estimated) rather than only applied going forward, so the trend is visible across the whole matrix. "Abstractions reused" counts our own previously-built modules only — a platform built-in (e.g. `next/image`) is reflected in "new dependencies," not counted as a reused abstraction.

| Component | Spec changes required | New abstractions introduced | Existing abstractions reused | New dependencies |
|---|:---:|:---:|:---:|:---:|
| Navigation | 0 | 5 (`NavLink`, `ThemeToggle`, `MobileNav`, `NavList`, `cn()`) | 0 | 0 |
| Section Heading | 0 | 1 | 0 | 0 |
| Highlight | 0 | 1 | 0 | 0 |
| Call to Action | 0 | 1 | 1 (`cn()`) | 0 |
| Metric / Evidence Block — numeric | 1 (028 Section 12/22 amendment) | 2 (`MetricEvidenceBlock`, `AnimatedOverlay`) | 0 | 0 |
| Metric / Evidence Block — comparative | 0 | 1 | 0 (had its own local, later-duplicated formatter at ship time) | 0 |
| Metric / Evidence Block — diagram/artifact | 0 | 1 | 0 | 0 |
| *(health check)* Formatter extraction | 0 | 1 (`formatMetricValue`) | — (this is the reuse-creation event itself) | 0 |
| **006 containers amendment** | 1 (proactive addition, not a discovered gap — see note below) | 0 | — | 0 |
| Hero | 0 | 1 | 1 (`CallToAction`) — first genuine cross-*component* reuse beyond the `cn()` utility | 0 |
| Decision / Trade-off Block | 0 | 1 (one component, two variants via discriminated union) | 0 | 0 |
| Experience Summary | 0 | 2 (`ExperienceSummaryCondensed`, `ExperienceSummaryList`) | 1 (`Highlight`, embedded for role bullets — required exporting `HighlightProps` first) | 0 |
| Contact Methods | 0 | 1 | 0 (reused the underline-draw *CSS pattern* from `Highlight`, copied not extracted — below rule-of-three) | 0 |
| Case Study Preview | 0 | 1 | 0 (deliberately — considered reusing Section Heading, declined; the underline-draw pattern was also deliberately *not* applied here, staying at 2 occurrences rather than reflexively becoming 3) | 0 |
| Journal Preview | 0 | 1 | 0 (near-identical shape to Case Study Preview, deliberately not shared as code — 2 occurrences, below rule-of-three) | 0 |
| **Section Index & technical motif amendment (006/008/014/028)** | 4 (proactive, resolved before any code — see note below) | 0 (component not yet built) | — | 0 |

**Final running totals, Component Library Complete**: 2 specification changes across 13 components + 1 refactor + 1 proactive amendment; **0 new npm dependencies introduced across the entire component library**; reuse held steady rather than climbing every round — exactly what you'd expect if reuse tracks genuine shared responsibility rather than a quota. Two CSS patterns (underline-draw, easing constant) sat at 2 occurrences through to the end without ever forcing a third — the rule-of-three discipline was never violated in either direction (no premature extraction, no reflexive avoidance either).

**A note on the 006 amendment's category**: unlike items #1 and #2 below, this wasn't a gap *discovered* during implementation — it was a design direction proposed directly by the project owner (containers-are-the-exception, editorial layout over card-based dashboard layout) and resolved into `006-design-system.md` before Hero, following the same "resolve real behavior-changing decisions immediately, don't batch them" rule already established for item #2. Recorded here for the metric's sake, not folded into the gaps table below, since it isn't a specification defect.

**A note on the Section Index & technical motif amendment**: same category as the 006 containers amendment, not the gaps table — a proactive design direction (Track B Design Direction, see Milestones section above), checked against the frozen specification before any code existed, which surfaced two genuine tensions (illustration ban vs. the new motif; the Delight Moments cap vs. a scroll-linked index) and resolved both across four documents (`006`, `008`, `014`, `028`) in one deliberate round, before the Section Index component itself is built.

---

## Architecture Metrics (current snapshot, not per-component)

A single always-current rollup, distinct from the growing per-component table above. Recounted against `008-component-library.md`'s actual Overview table (11 named shared components — `Product Timeline` is explicitly page-scoped and excluded from this count) rather than estimated.

| Metric | Value |
|---|---:|
| Components implemented | 11 / 11 — **Component Library Complete** (Navigation, Hero, Section Heading, Highlight, Call to Action, Metric / Evidence Block, Decision / Trade-off Block, Experience Summary, Contact Methods, Case Study Preview, Journal Preview) |
| Components reused by another component | 2 (`CallToAction` by Hero; `Highlight` by Experience Summary) |
| Shared utilities | 2 (`cn()`, `formatMetricValue`) |
| New dependencies introduced | 0 |
| Specification defects found | 1 resolved (#2), 1 open (#1) |
| Specification revisions required after implementation began | 0 — every change made so far (#2, the 006 containers amendment, and the Section Index & technical motif amendment) was resolved *before* the code that depended on it was written, not discovered as a defect in already-shipped work |

The last row is the one worth watching over time: so far, every specification change has preceded the implementation it governs, not followed a discovery of something already built being wrong. That's the strongest available signal that the specification phase actually did its job.

---
