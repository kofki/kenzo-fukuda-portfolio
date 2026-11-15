"use client";

import { motion, motionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { createContext, useContext, useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const Leave = createContext<MotionValue<number> | null>(null);
const Arrive = createContext<MotionValue<number> | null>(null);
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
  // 0 when the bottom of the section enters at the bottom of the screen, 1
  // when it reaches the bottom of the screen.
  const { scrollYProgress: arrive } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // The pieces follow the scroll through a spring, so a fast flick of the
  // wheel lets them glide away instead of snapping off. The pin itself stays
  // exact, so the base never lifts off the bottom of the screen.
  const spring = { stiffness: 55, damping: 18, mass: 1 };
  const leaveSoft = useSpring(leave, spring);
  const arriveSoft = useSpring(arrive, spring);
  const pin = useTransform(leave, (v) => (typeof window === "undefined" ? 0 : clamp01(v) * window.innerHeight));

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-[5] ${className}`}
      style={{ ...style, y: reduced ? 0 : pin }}
    >
      <Arrive.Provider value={reduced ? null : arriveSoft}>
        <Leave.Provider value={reduced ? null : leaveSoft}>{children}</Leave.Provider>
      </Arrive.Provider>
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
  hold = 0.04,
  span,
  distance = 90,
  enter = false,
  grow = true,
  children,
  className = "",
  style,
}: {
  to: "left" | "right" | "down";
  lag?: number;
  /** How much of the way out it stays put before it starts to move (0-1). */
  hold?: number;
  /** How much of the way out it takes to leave (0-1); the rest by default. */
  span?: number;
  /** How far it slides sideways, in % of its width. */
  distance?: number;
  /** Grow a little on the way out, as if swimming towards it. */
  grow?: boolean;
  /** Also drift in from that same side (or up from below) as the section arrives. */
  enter?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const leave = useContext(Leave);
  const arrive = useContext(Arrive);
  const source = leave ?? still;
  const coming = arrive ?? still;
  // Hold still for the first stretch of the way out, then drift off slowly.
  const t = (v: number) => Math.pow(clamp01((v - hold - lag) / (span ?? 1 - hold)), 1.3);
  const side = to === "left" ? -1 : 1;
  // Arriving: in from the side, easing to a stop as the section settles.
  const inX = (a: number) => (enter && to !== "down" ? side * 55 * Math.pow(1 - clamp01(a / 0.85), 2) : 0);
  const x = useTransform([source, coming], ([v, a]: number[]) => `${(to === "down" ? 0 : side * t(v) * distance) + inX(a)}%`);
  // Arriving from below: up into place, easing to a stop.
  const inY = (a: number) => (enter && to === "down" ? 30 * Math.pow(1 - clamp01(a / 0.85), 2) : 0);
  const y = useTransform([source, coming], ([v, a]: number[]) => `${(to === "down" ? t(v) * 70 : t(v) * 12) + inY(a)}%`);
  const scale = useTransform(source, (v) => (grow ? 1 + t(v) * 0.35 : 1));
  // Once a piece is gone it stays gone, even after the section stops
  // following the screen.
  const opacity = useTransform(source, (v) => 1 - clamp01((t(v) - 0.45) / 0.55));
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
