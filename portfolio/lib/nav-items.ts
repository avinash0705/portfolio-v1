/**
 * The six primary navigation destinations, per 003-information-architecture.md,
 * Section 3. Exactly six items, in this order — no secondary or link-discovered
 * pages belong here (008-component-library.md, Section 1).
 *
 * Case Studies and Journal are temporarily commented out below, matching
 * the same deferral already applied to the Homepage's teaser sections
 * (docs/IMPLEMENTATION-LOG.md) — neither page exists yet, so linking to
 * them from persistent, sitewide navigation would be a dead end. This is
 * a deliberate, temporary deviation from "exactly six items," not a
 * change to 003's information architecture — re-enable both the moment
 * those pages are built, restoring the original six.
 */
export const navItems = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  // { href: "/case-studies", label: "Case Studies" }, — deferred, page doesn't exist yet
  // { href: "/journal", label: "Journal" }, — deferred, page doesn't exist yet
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;
