import Link from "next/link";
import { navItems } from "@/lib/nav-items";

/**
 * 027-application-behaviour.md, Section 4: never a dead end, calm and
 * restrained in voice, offering the primary navigation destinations.
 * Renders inside the root layout, so persistent Navigation is still present.
 */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24">
      <h1 className="text-2xl font-medium text-foreground">Page not found.</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        The page you were looking for doesn&apos;t exist, or may have moved.
        Here&apos;s where you can go instead:
      </p>
      <ul className="mt-6 flex flex-col gap-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-accent hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
