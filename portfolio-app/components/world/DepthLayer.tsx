"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

interface Ramp {
  /** Scroll-progress input stops (0 to 1). */
  at: number[];
  /** Matching output values. */
  to: number[];
}

interface DepthLayerProps {
  /** Global scroll progress from WorldBackground. */
  progress: MotionValue<number>;
  /** Opacity ramp keyed to scroll depth. */
  opacity: Ramp;
  /** Optional vertical parallax (px) keyed to scroll depth. */
  parallax?: Ramp;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

// Clamped piecewise-linear interpolation: below the first stop holds the first
// output, above the last stop holds the last output. We interpolate directly
// rather than via motion's array-form useTransform, which mis-extrapolates
// ramps that don't start and end at the same value (e.g. [1,0] or [0,1]),
// causing the dive to visually rewind to the surface at the bottom of the page.
function rampValue(v: number, at: number[], to: number[]): number {
  if (v <= at[0]) return to[0];
  const last = at.length - 1;
  if (v >= at[last]) return to[last];
  for (let i = 1; i <= last; i += 1) {
    if (v <= at[i]) {
      const span = at[i] - at[i - 1] || 1;
      const t = (v - at[i - 1]) / span;
      return to[i - 1] + t * (to[i] - to[i - 1]);
    }
  }
  return to[last];
}

/** A single fixed parallax layer in the dive world; opacity/Y track depth. */
export function DepthLayer({
  progress,
  opacity,
  parallax,
  className,
  style,
  children,
}: DepthLayerProps) {
  const opacityValue = useTransform(progress, (v) =>
    rampValue(v, opacity.at, opacity.to),
  );
  const y = useTransform(progress, (v) =>
    parallax ? rampValue(v, parallax.at, parallax.to) : 0,
  );

  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ opacity: opacityValue, y, ...style }}
    >
      {children}
    </motion.div>
  );
}
