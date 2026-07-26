import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { CallToAction } from "@/components/call-to-action/CallToAction";
import { TechnicalMotif } from "@/components/decorative/TechnicalMotif";

type QuickLink = {
  label: string;
  href: string;
  /** Decorative only — the label already carries the meaning
   * (006-design-system.md, Section 9). The caller chooses the icon,
   * keeping Hero itself icon-agnostic. */
  icon: LucideIcon;
  /** The "opened" counterpart shown on hover (e.g. Folder → FolderOpen,
   * Mail → MailOpen) — both variants come from the same Lucide set, so
   * this stays within 006 Section 9's single-icon-set rule rather than
   * introducing a second style. A CSS-only cross-fade
   * (028-interaction-language.md, Section 8), the same technique as
   * ThemeToggle's icon morph, applied on hover instead of on click. */
  hoverIcon: LucideIcon;
};

type HeroProps = {
  name: string;
  /** Current role/level — not a job title alone, per
   * 014-homepage.md, Section 5. */
  role: string;
  /** The single sentence answering "who is this engineer?" directly —
   * never a slogan, never a technology list (014-homepage.md, Section 5). */
  positioningStatement: string;
  /** One optional supporting sentence beneath the positioning statement
   * (008-component-library.md, Section 2, as amended) — may only restate
   * or extend the positioning statement's own claim, never introduce a
   * new one, and is capped at one sentence. */
  supportingSentence?: string;
  /** Optional quick-links panel (008-component-library.md, Section 2, as
   * amended) — up to four icon + label tiles to major site destinations.
   * Each must point to a real, already-documented page in
   * 003-information-architecture.md, never an invented one. */
  quickLinks?: QuickLink[];
};

/**
 * 008-component-library.md, Section 2 — the one component exempted from
 * the two-page guardrail, because Homepage's entire one-job is
 * inseparable from it. No container for the primary content
 * (006-design-system.md, Section 2, as amended): typography and
 * whitespace only. The quick-links panel needs no named container
 * exception of its own — each tile is an interactive control (a real
 * link), already covered by Section 2's existing "interactive controls
 * are not subject to this rule" carve-out, the same reasoning
 * Call to Action's own visible boundary rests on.
 *
 * The quick-links panel is deliberately styled subordinate to the
 * primary/secondary CTA above it (muted icon tint, no accent fill,
 * smaller type) — 014-homepage.md, Section 4 requires Contact never
 * compete with Case Studies for the visitor's first action, and Section
 * 6 bans a second equally-weighted CTA. Visual weight is what keeps a
 * Contact tile here from becoming a second primary action rather than a
 * lightweight, secondary way to jump elsewhere on the site.
 *
 * No motion: nothing here is long-form, scroll-triggered content, and
 * every item is required to be understood in the first five seconds,
 * not revealed progressively.
 *
 * The primary/secondary CTA copy and destinations are fixed by
 * 014-homepage.md, Section 4 — not configurable props, since there is
 * exactly one Hero for exactly one Homepage (008, Section 2's "Variants:
 * None"). Reuses the existing CallToAction component rather than
 * reimplementing button markup.
 *
 * `id="hero"` lives on the name line (`{name}`), the very first line of
 * real content in Hero — not the outer `<section>`, and not the role
 * line below it — since that's what keeps Section Index's marker
 * aligned with the actual first line a visitor reads, matching every
 * other section's own heading-anchored alignment. Hero is always first
 * in the page's fixed section order (014-homepage.md, Section 3).
 *
 * The positioning statement is the one place on the site that uses the
 * display serif licensed by 006-design-system.md, Section 4's third
 * typeface exception — never the role/name lines above it, which stay in
 * the one interface typeface everything else uses.
 *
 * Quick-link icons come from Lucide (006-design-system.md, Section 9, as
 * amended) — the caller supplies the icon component per tile, since
 * matching a destination to a specific glyph is a content decision, not
 * something Hero should hardcode.
 */
export function Hero({
  name,
  role,
  positioningStatement,
  supportingSentence,
  quickLinks,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <TechnicalMotif className="hidden lg:block" />
      <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-16">
        <div>
          <p id="hero" className="text-sm text-muted">
            {name}
            <span aria-hidden="true" className="ml-3">
              —
            </span>
          </p>
          <h1 className="mt-1 text-sm font-medium tracking-wide text-accent uppercase">
            {role}
          </h1>
          <p className="mt-6 font-display text-4xl leading-[1.1] font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {positioningStatement}
          </p>
          {supportingSentence ? (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              {supportingSentence}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CallToAction
              label="View Case Studies"
              href="/case-studies"
              weight="primary"
            />
            <CallToAction
              label="View Resume"
              href="/resume"
              weight="secondary"
            />
          </div>
        </div>

        {quickLinks && quickLinks.length > 0 ? (
          <ul className="grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-surface">
            {quickLinks.map((quickLink, index) => {
              const Icon = quickLink.icon;
              const HoverIcon = quickLink.hoverIcon;
              const isLeftColumn = index % 2 === 0;
              const isTopRow = index < 2;
              return (
                <li
                  key={quickLink.label}
                  className={cn(
                    isLeftColumn && "border-r border-border",
                    isTopRow && "border-b border-border"
                  )}
                >
                  <Link
                    href={quickLink.href}
                    className="group flex flex-col items-center gap-3 px-4 py-8 text-center transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent/5"
                  >
                    <span
                      aria-hidden="true"
                      className="relative flex h-12 w-12 items-center justify-center rounded-md bg-muted/10 text-muted transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-accent"
                    >
                      <Icon className="h-6 w-6 opacity-100 transition-opacity duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-0 motion-reduce:transition-none" />
                      <HoverIcon className="absolute h-6 w-6 opacity-0 transition-opacity duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 motion-reduce:transition-none" />
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {quickLink.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
