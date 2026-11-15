"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Clamped linear map, so values never overshoot past either end. */
function ramp(v: number, a: number, b: number, from: number, to: number) {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return from + (to - from) * t;
}

interface ScrollLayerProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Vertical offset in % of the layer's own height, from → to. */
  y?: [number, number];
  /** Horizontal offset in % of the layer's own width, from → to. */
  x?: [number, number];
  opacity?: [number, number];
  /**
   * Portion of the layer's trip through the viewport the change runs over.
   * 0 is the moment its top enters at the bottom, 1 is when its bottom leaves
   * at the top.
   */
  range?: [number, number];
}

/**
 * Scenery that moves with the scroll position: the reef climbing in, the
 * jellyfish drifting over, the city lights coming up. Scrolling back plays it
 * in reverse. With reduced motion the layer sits still at its end state.
 */
export function ScrollLayer({
  children,
  className,
  style,
  y,
  x,
  opacity,
  range = [0, 0.5],
}: ScrollLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const [a, b] = range;
  const ty = useTransform(scrollYProgress, (v) =>
    y ? `${ramp(v, a, b, y[0], y[1])}%` : "0%",
  );
  const tx = useTransform(scrollYProgress, (v) =>
    x ? `${ramp(v, a, b, x[0], x[1])}%` : "0%",
  );
  const op = useTransform(scrollYProgress, (v) =>
    opacity ? ramp(v, a, b, opacity[0], opacity[1]) : 1,
  );

  if (reduced) {
    return (
      <div
        ref={ref}
        aria-hidden
        className={className}
        style={{ ...style, opacity: opacity ? opacity[1] : undefined }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={className}
      style={{ ...style, y: ty, x: tx, opacity: op }}
    >
      {children}
    </motion.div>
  );
}
