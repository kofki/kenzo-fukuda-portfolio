"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

interface Ramp {
  at: number[];
  to: number[];
}

interface DepthLayerProps {
  progress: MotionValue<number>;
  opacity: Ramp;
  parallax?: Ramp;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

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
