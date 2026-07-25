/**
 * The six primary navigation destinations, per 003-information-architecture.md,
 * Section 3. Exactly six items, in this order — no secondary or link-discovered
 * pages belong here (008-component-library.md, Section 1).
 */
export const navItems = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/journal", label: "Journal" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;
