"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Lets creatures that ride along with a section swim away as it ends: they
 * stay put while you read, then, starting just before the bottom of the
 * section comes into view, swim up and off to one side, gone before the next
 * section's water reaches them. A spring keeps a fast scroll from snapping
 * them away.
 */
export function SwimAway({ children, className = "", toward = 1 }: { children: ReactNode; className?: string; toward?: 1 | -1 }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // 0 when the section's bottom is 40% of a screen below the screen, 1 when
  // it is 60% of the way up it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end 140%", "end 40%"] });
  const soft = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  const ease = (v: number) => {
    const t = clamp01(v);
    return t * t * (3 - 2 * t);
  };
  const y = useTransform(soft, (v) => `${-ease(v) * 115}vh`);
  const x = useTransform(soft, (v) => `${toward * ease(v) * 22}vw`);

  return (
    <motion.div ref={ref} className={className} style={reduced ? undefined : { y, x }}>
      {children}
    </motion.div>
  );
}
