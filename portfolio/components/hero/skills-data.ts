import {
  Accessibility,
  Atom,
  Boxes,
  Braces,
  Code2,
  FileCode,
  FlaskConical,
  Gauge,
  Layers,
  Network,
  type LucideIcon,
} from "lucide-react";

export type Skill = {
  label: string;
  icon: LucideIcon;
  /** Degrees, standard math convention (0° = right, counter-clockwise
   * positive) — position around the centre is computed from this, not
   * hand-placed per skill. Data-driven per the suggested schema: editing
   * this array changes the diagram; `SkillsDiagram`'s rendering and
   * animation logic never needs to. */
  angle: number;
};

/**
 * Hero's Skills visualization content (008-component-library.md,
 * Section 2, as amended) — fixed, not passed in as a prop from
 * `app/page.tsx`, the same way Hero's own primary/secondary CTA copy is
 * hardcoded rather than configurable: there is exactly one Hero for
 * exactly one Homepage (008, Section 2's "Variants: None").
 *
 * Living inside this client-boundary module (not `app/page.tsx`, a
 * Server Component) isn't just organisational — it's required. Lucide
 * icon components are functions, and React cannot serialize a function
 * across the Server→Client boundary as a prop value; only already
 * client-side code can hold a live reference to one. Keeping this data
 * here, where `SkillsDiagram` (also `"use client"`) can import it
 * directly, avoids that boundary crossing entirely rather than working
 * around it.
 *
 * Five per side, angles spanning roughly the left half (90°–270°) and
 * right half (-90°–90°) of the diagram's ellipse respectively, ordered
 * top to bottom within each side.
 */
export const SKILLS_CENTER_LABEL = "Frontend Engineering";

export const SKILLS: Skill[] = [
  { label: "Accessibility", icon: Accessibility, angle: 145 },
  { label: "Performance", icon: Gauge, angle: 165 },
  { label: "React", icon: Atom, angle: 185 },
  { label: "TypeScript", icon: Braces, angle: 205 },
  { label: "JavaScript", icon: FileCode, angle: 225 },
  { label: "Next.js", icon: Layers, angle: 45 },
  { label: "Architecture", icon: Boxes, angle: 25 },
  { label: "System Design", icon: Network, angle: 5 },
  { label: "Testing", icon: FlaskConical, angle: -15 },
  { label: "DOM Manipulation", icon: Code2, angle: -35 },
];
