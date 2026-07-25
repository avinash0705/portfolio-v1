"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { formatMetricValue } from "@/lib/formatMetricValue";

// "Deliberate" tier and house easing curve (028-interaction-language.md,
// Section 18). The eased() function below approximates the same
// decelerating curve for a numeric interpolation, since CSS easing can't
// drive a changing text value on its own.
const DURATION_MS = 500;

// Large-value carve-out (028-interaction-language.md, Section 12): values
// at this scale don't get a full zero-to-value sweep — animating from a
// nearby baseline reinforces the value instead of reading as noise.
const LARGE_VALUE_THRESHOLD = 10_000;
const LARGE_VALUE_BASELINE_RATIO = 0.85;

function eased(progress: number): number {
  return 1 - Math.pow(1 - progress, 3);
}

type AnimatedOverlayProps = {
  value: number;
  prefix?: string;
  suffix?: string;
};

/**
 * The decorative layer described in 028-interaction-language.md, Section 12:
 * it never touches the canonical value rendered by MetricEvidenceBlock. It
 * only ever visually covers it, briefly, with its own animated text, then
 * removes that covering — the canonical element underneath is never
 * hidden, modified, or removed from the accessibility tree at any point.
 *
 * Known limitation: the opaque mask below assumes the immediate background
 * is --color-background. If this component is later composed onto a
 * --color-surface card, the mask would need to match that instead — not
 * yet parameterised, since no real page composition exists to verify
 * against (021-folder-structure.md's content/ is still empty).
 */
export function AnimatedOverlay({
  value,
  prefix,
  suffix,
}: AnimatedOverlayProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);
  const [animatedText, setAnimatedText] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const start =
      value >= LARGE_VALUE_THRESHOLD ? value * LARGE_VALUE_BASELINE_RATIO : 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (hasAnimatedRef.current) return;
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        hasAnimatedRef.current = true;
        observer.disconnect();

        const startTime = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - startTime) / DURATION_MS, 1);
          const current = start + (value - start) * eased(progress);
          setAnimatedText(formatMetricValue(current, prefix, suffix));

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setAnimatedText(null); // Settled — reveal the canonical value underneath.
          }
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, prefix, suffix]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 text-3xl leading-tight font-semibold tabular-nums text-foreground",
        animatedText !== null && "bg-background"
      )}
    >
      {animatedText}
    </span>
  );
}
