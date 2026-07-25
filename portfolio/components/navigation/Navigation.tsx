import Link from "next/link";
import { navItems } from "@/lib/nav-items";
import { NavLink } from "./NavLink";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Persistent, site-wide navigation (008-component-library.md, Section 1).
 * Exactly six items, present on every page, with no secondary or
 * link-discovered pages included (003-information-architecture.md, Section 4).
 * A Server Component by default — only the current-page indication and the
 * mobile disclosure need client-side behaviour (022-coding-standards.md,
 * Section 5).
 */
export function Navigation() {
  return (
    <header className="relative border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-sm font-medium text-foreground">
          Portfolio
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:flex md:items-center md:gap-1"
        >
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
