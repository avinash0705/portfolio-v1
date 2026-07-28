"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { SKILLS, SKILLS_CENTER_LABEL } from "@/components/hero/skills-data";

type SkillsDiagramProps = {
  className?: string;
};

// A true circle in a square viewBox — the previous version used a wide
// ellipse (left/right clusters), which a live screenshot showed
// overlapping on the left and clipping past Hero's own overflow-hidden
// edge on the right. Equal radius on both axes, evenly spaced by angle,
// is what actually produces a clock-face layout with equal spacing
// all the way around, not just within a left half and a right half.
const VIEW_W = 660;
const VIEW_H = 660;
const CENTER_X = VIEW_W / 2;
const CENTER_Y = VIEW_H / 2;
const RADIUS_X = 210;
const RADIUS_Y = 210;
const CHIP_HALF_W = 54;
const CENTER_SIZE = 96;

// Two constraints in tension, both checked empirically (measured DOM
// rects, not just hand math) rather than assumed: (1) radius + chip
// half-width must leave real margin inside the viewBox, or the outer
// chips clip past Hero's own overflow-hidden edge; (2) the radius must
// be large enough relative to chip width that adjacent chips (36° apart
// around 10 of them) don't overlap each other — a smaller radius that
// satisfies (1) can still fail (2). Hero's own grid ratio
// (`lg:grid-cols-[1fr_1.15fr]`, widened twice now from the original
// 1.3fr favouring the left column) gives this component
// more real width to work with, rather than only shrinking the diagram
// to fit an unnecessarily narrow column. This margin math only holds if
// chip size and the centre node scale WITH the container, not as fixed
// pixels — a real
// screenshot showed both "Architecture" clipped on the right and
// "React" overlapping the centre label on the left, because this
// component's actual rendered width (inside Hero's `1fr` grid column)
// is narrower than the 520 "logical" units above, and a fixed-pixel
// chip/centre size doesn't shrink to match a smaller container the way
// percentage-based position and the SVG's own viewBox already do. Both
// are expressed as percentages of the container below for exactly this
// reason — the whole diagram now scales as one consistent system
// regardless of the column's real width, rather than two systems
// (percentage position, fixed size) that only agree at one specific
// width.

// Reveal choreography (028-interaction-language.md, Section 13's
// exception for this component): each connector draws in, then its chip
// appears, one skill at a time, before the next one starts.
const LINE_DURATION = 0.7;
const CHIP_DURATION = 0.25;
const STEP = 0.9;

// The perpetual travelling highlight (028, Section 21's one narrow,
// explicit exception) — approximate dash/gap sizing rather than
// measuring each path's real length via getTotalLength(): every
// connector in this layout falls within a similar length range, so a
// single generous dash pattern reads as "a short segment, mostly gap"
// regardless of the small variation between them.
const PULSE_DASH = "16 420";
const PULSE_DURATION = 2.4;

function skillPosition(angle: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: CENTER_X + RADIUS_X * Math.cos(radians),
    y: CENTER_Y - RADIUS_Y * Math.sin(radians),
  };
}

/**
 * Hero's Skills visualization (008-component-library.md, Section 2, as
 * amended) — 000-philosophy.md, Section 1's one narrow, explicit
 * exception to Evidence Over Claims. A centre node, connected by curved
 * paths to a fixed set of named skill chips, each revealed one at a
 * time (connector draws, then its chip appears) before the next begins.
 *
 * The reveal runs once, on mount, and never re-triggers — the
 * perpetual travelling highlight that follows it is the one thing here
 * that keeps animating, under 028 Section 21's own narrow exception for
 * this component specifically.
 *
 * Chip labels are real text nodes, present and readable from the first
 * render regardless of whether any connector animation has run or
 * finished (008 Section 2's own accessibility expectation) — the
 * `opacity`/`y` entrance animation is a decorative layer on top of
 * content that already exists, the same relationship Metric / Evidence
 * Block's canonical-value/decorative-overlay split already establishes.
 */
export function SkillsDiagram({ className }: SkillsDiagramProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        {SKILLS.map((skill, index) => {
          const { x, y } = skillPosition(skill.angle);
          // Pull the path's chip-end back off the chip's own centre so
          // the line reads as touching its edge, not passing through it.
          const dx = CENTER_X - x;
          const dy = CENTER_Y - y;
          const length = Math.hypot(dx, dy) || 1;
          const pullBack = 34;
          const startX = x + (dx / length) * pullBack;
          const startY = y + (dy / length) * pullBack;
          const controlX = (startX + CENTER_X) / 2;
          const path = `M ${startX} ${startY} Q ${controlX} ${startY} ${CENTER_X} ${CENTER_Y}`;
          const revealDelay = reducedMotion ? 0 : index * STEP;

          return (
            <g key={skill.label}>
              <motion.path
                d={path}
                stroke="var(--color-border)"
                strokeWidth={1.5}
                fill="none"
                initial={{ pathLength: reducedMotion ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: reducedMotion ? 0 : LINE_DURATION,
                  delay: revealDelay,
                  ease: "easeInOut",
                }}
              />
              {!reducedMotion ? (
                <motion.path
                  d={path}
                  stroke="var(--color-accent)"
                  strokeWidth={1.5}
                  strokeDasharray={PULSE_DASH}
                  fill="none"
                  initial={{ strokeDashoffset: 0, opacity: 0 }}
                  animate={{ strokeDashoffset: -436, opacity: 0.6 }}
                  transition={{
                    opacity: {
                      delay: revealDelay + LINE_DURATION,
                      duration: 0.3,
                    },
                    strokeDashoffset: {
                      delay: revealDelay + LINE_DURATION,
                      duration: PULSE_DURATION,
                      ease: "linear",
                      repeat: Infinity,
                    },
                  }}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      <div
        className="absolute flex items-center justify-center rounded-full border border-border bg-surface text-center"
        style={{
          left: `${(CENTER_X / VIEW_W) * 100}%`,
          top: `${(CENTER_Y / VIEW_H) * 100}%`,
          width: `${(CENTER_SIZE / VIEW_W) * 100}%`,
          height: `${(CENTER_SIZE / VIEW_H) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <span className="px-2 text-xs leading-tight font-medium text-foreground">
          {SKILLS_CENTER_LABEL}
        </span>
      </div>

      {SKILLS.map((skill, index) => {
        const { x, y } = skillPosition(skill.angle);
        const Icon = skill.icon;
        const revealDelay = reducedMotion ? 0 : index * STEP + LINE_DURATION;

        return (
          <motion.div
            key={skill.label}
            className="absolute flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 shadow-sm transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent"
            style={{
              left: `${(x / VIEW_W) * 100}%`,
              top: `${(y / VIEW_H) * 100}%`,
              width: `${((CHIP_HALF_W * 2) / VIEW_W) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{
              opacity: reducedMotion ? 1 : 0,
              y: reducedMotion ? 0 : 6,
            }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : CHIP_DURATION,
              delay: revealDelay,
            }}
          >
            <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
            <span className="min-w-0 flex-1 text-xs font-medium break-words text-foreground">
              {skill.label}
            </span>
          </motion.div>
        );
      })}

      {/* Reserves layout space matching the diagram's own aspect ratio —
          everything above is absolutely positioned and would otherwise
          collapse this container to zero height. */}
      <div style={{ paddingTop: `${(VIEW_H / VIEW_W) * 100}%` }} />
    </div>
  );
}
