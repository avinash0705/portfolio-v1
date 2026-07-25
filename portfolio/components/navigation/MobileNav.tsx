"use client";

import { useState } from "react";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";
import { navItems } from "@/lib/nav-items";

/**
 * Small-screen presentation of the same six destinations — a reflow of the
 * Navigation component's presentation, not a new content-ownership variant
 * (007-responsive-strategy.md, Section 3; 008-component-library.md, Section 1).
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        className="rounded-sm border border-border px-3 py-1.5 text-sm text-foreground"
      >
        {isOpen ? "Close" : "Menu"}
      </button>
      {isOpen ? (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-border bg-background p-3"
        >
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
          <div className="pt-1">
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </div>
  );
}
