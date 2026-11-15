"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { BeachScene } from "@/components/home/BeachScene";
import { LiveScene } from "@/components/home/LiveScene";
import { useReducedMotion } from "@/lib/useReducedMotion";

// A foam line that repeats every 1440 units, drawn twice so it can scroll
// sideways forever without a visible seam.
function foamPath(phase: number, amp: number) {
  const pts: string[] = [];
  for (let x = 0; x <= 2880; x += 24) {
    const t = (x / 1440) * Math.PI * 2;
    const y =
      18 +
      amp * Math.sin(3 * t + phase) +
      amp * 0.6 * Math.sin(7 * t + 1 + phase) +
      amp * 0.35 * Math.sin(13 * t + 2 + phase);
    pts.push(`${x} ${y.toFixed(1)}`);
  }
  return `M0 40 L${pts.join(" L")} L2880 40 Z`;
}
const FOAM_FRONT = foamPath(0, 6);
const FOAM_BACK = foamPath(1.7, 5);

/**
 * Transition 1, "the beach goes under". The hero holds still for a stretch of
 * scrolling while the sea rises from the bottom over the sand, the props and
 * the name, until the screen is water. Then it releases and Projects scrolls
 * in from below, starting at the surface seen from underneath. The water's
 * bottom colour is the colour at the top of the Projects print, so the two
 * meet without a line.
 *
 * The sticky frame is a size container: the beach and the hero text both size
 * themselves from it (cqh / cqw), so they stay locked together even when the
 * frame's 620px minimum is taller than the window.
 *
 * Reduced motion: no pin and no rising sea, just the hero.
 */
export function HeroDive({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const seaY = useTransform(scrollYProgress, (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.12) / 0.78));
    return `${(1 - t) * 104}%`;
  });

  return (
    <div
      ref={ref}
      className={reduced ? "relative" : "relative h-[180svh] max-sm:h-[150svh]"}
    >
      <LiveScene className="sticky top-0 h-[100svh] min-h-[620px] overflow-hidden [container-type:size]">
        <BeachScene />
        {children}
        {reduced ? null : (
          <motion.div
            aria-hidden
            style={{ y: seaY }}
            className="pointer-events-none absolute inset-0 z-30 will-change-transform"
          >
            <div className="absolute -top-[22px] left-0 h-[26px] w-full overflow-hidden">
              <svg
                viewBox="0 0 2880 40"
                preserveAspectRatio="none"
                className="absolute inset-y-0 left-0 h-full w-[200%] animate-[wave-x_19s_linear_infinite] opacity-60"
              >
                <path d={FOAM_BACK} fill="#c9d6d4" />
              </svg>
              <svg
                viewBox="0 0 2880 40"
                preserveAspectRatio="none"
                className="absolute inset-y-0 left-0 h-full w-[200%] animate-[wave-x_12s_linear_infinite_reverse]"
              >
                <path d={FOAM_FRONT} fill="#e9dcc0" />
              </svg>
            </div>
            <div className="h-full w-full bg-[linear-gradient(180deg,#1f3460_0%,#2a5576_65%,#417c91_100%)]" />
            <div className="absolute inset-0 bg-[#050c1c] opacity-0 transition-opacity duration-700 dark:opacity-30" />
          </motion.div>
        )}
      </LiveScene>
    </div>
  );
}
