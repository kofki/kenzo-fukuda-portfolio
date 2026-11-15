"use client";

import { motion, motionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { createContext, useContext, useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const Leave = createContext<MotionValue<number> | null>(null);
// A still value for when there is no Grounded parent, or motion is reduced.
const still = motionValue(0);

/**
 * Scenery that stands on the sea floor along the bottom of a section: rocks,
 * coral, kelp. Its base never shows, so nothing floats:
 *
 * - On the way in, the section scrolls up from below as normal, so the base
 *   stays under the bottom edge of the screen.
 * - On the way out, the base stays pinned to the bottom edge while each piece
 *   inside (a `Pass`) slides away to the side or sinks under us, as if we
 *   were swimming forward over it.
 *
 * It sits above the next section's water (z-[5]) but below every section's
 * text (z-10), so the section must clip only sideways (`spill`).
 */
export function Grounded({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // 0 when the bottom of the section reaches the bottom of the screen, 1 when
  // it has scrolled up to the top.
  const { scrollYProgress: leave } = useScroll({ target: ref, offset: ["end end", "end start"] });
  const pin = useTransform(leave, (v) => (typeof window === "undefined" ? 0 : clamp01(v) * window.innerHeight));

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-[5] ${className}`}
      style={{ ...style, y: reduced ? 0 : pin }}
    >
      <Leave.Provider value={reduced ? null : leave}>{children}</Leave.Provider>
    </motion.div>
  );
}

/**
 * One piece of grounded scenery. `to` says where it goes as we swim past:
 * off to the left, off to the right, or down under us. Pieces grow a little
 * as they go, as things do when you swim towards them. `lag` holds a piece
 * back so they do not all leave at once.
 */
export function Pass({
  to,
  lag = 0,
  children,
  className = "",
  style,
}: {
  to: "left" | "right" | "down";
  lag?: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const leave = useContext(Leave);
  const source = leave ?? still;
  const t = (v: number) => Math.pow(clamp01((v - 0.03 - lag) / 0.4), 1.5);
  const x = useTransform(source, (v) => (to === "down" ? "0%" : `${(to === "left" ? -1 : 1) * t(v) * 90}%`));
  const y = useTransform(source, (v) => (to === "down" ? `${t(v) * 140}%` : `${t(v) * 12}%`));
  const scale = useTransform(source, (v) => 1 + t(v) * 0.35);
  // Once a piece is gone it stays gone, even after the section stops
  // following the screen.
  const opacity = useTransform(source, (v) => 1 - clamp01((t(v) - 0.8) / 0.2));
  const origin = to === "left" ? "0% 100%" : to === "right" ? "100% 100%" : "50% 100%";

  if (!leave) {
    return (
      <div className={`absolute inset-0 ${className}`} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div className={`absolute inset-0 will-change-transform ${className}`} style={{ ...style, x, y, scale, opacity, transformOrigin: origin }}>
      {children}
    </motion.div>
  );
}
