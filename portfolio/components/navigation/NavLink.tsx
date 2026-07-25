"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

/**
 * Current-page indication must be programmatically available, not
 * colour-only (005-design-principles.md, Section 2; 008-component-library.md,
 * Section 1). This is the one piece of Navigation that needs the client-side
 * pathname, kept as small as possible per 022-coding-standards.md, Section 5.
 */
export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "rounded-sm px-3 py-2 text-sm transition-colors hover:bg-surface",
        isActive ? "font-medium text-foreground" : "text-muted"
      )}
    >
      {label}
    </Link>
  );
}
