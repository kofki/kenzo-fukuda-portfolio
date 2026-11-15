"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { BeachScene } from "@/components/home/BeachScene";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Transition 1, "the beach goes under". The hero holds still for a stretch of
 * scrolling while the sea rises from the bottom over the sand, the props and
 * the name, until the screen is water. Then it releases and Projects scrolls
 * in from below, starting at the surface seen from underneath.
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
      <div className="sticky top-0 h-[100svh] min-h-[620px] overflow-hidden">
        <BeachScene />
        {children}
        {reduced ? null : (
          <motion.div
            aria-hidden
            style={{ y: seaY }}
            className="pointer-events-none absolute inset-0 z-30"
          >
            {/* Foam edge, then water that lightens toward the bottom so it
                meets the surface band at the top of Projects. */}
            <svg
              viewBox="0 0 1440 40"
              preserveAspectRatio="none"
              className="absolute -top-[18px] left-0 h-[22px] w-full"
            >
              <path
                d="M0 22 Q 60 4 120 20 T 240 18 T 360 22 T 480 16 T 600 22 T 720 18 T 840 22 T 960 16 T 1080 22 T 1200 18 T 1320 22 T 1440 18 V40 H0 Z"
                fill="#e9dcc0"
              />
            </svg>
            <div className="h-full w-full bg-[linear-gradient(180deg,#1f3460_0%,#2a5576_70%,#488093_100%)]" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
