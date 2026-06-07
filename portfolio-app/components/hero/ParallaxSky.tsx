"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Deterministic star field — fixed positions avoid SSR hydration mismatch.
// Stars are invisible in light mode (the --star token is transparent there).
const STARS = [
  { top: "12%", left: "18%", size: 2, delay: "0s" },
  { top: "20%", left: "62%", size: 3, delay: "0.6s" },
  { top: "9%", left: "82%", size: 2, delay: "1.2s" },
  { top: "30%", left: "8%", size: 2, delay: "0.3s" },
  { top: "16%", left: "44%", size: 2, delay: "1.8s" },
  { top: "38%", left: "73%", size: 3, delay: "0.9s" },
  { top: "26%", left: "30%", size: 2, delay: "2.1s" },
  { top: "44%", left: "52%", size: 2, delay: "1.5s" },
  { top: "33%", left: "90%", size: 2, delay: "0.2s" },
  { top: "48%", left: "24%", size: 3, delay: "2.4s" },
];

/** Atmospheric hero backdrop: gradient sky, sun/moon, stars, scroll parallax. */
export function ParallaxSky() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "60%"]);
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Base sky + soft gradient-mesh haze. */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 52%, var(--sky-low) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 72% 28%, color-mix(in oklab, var(--sun) 55%, transparent), transparent 70%), radial-gradient(50% 45% at 20% 12%, color-mix(in oklab, var(--coral) 22%, transparent), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Stars (dark mode only). */}
      {STARS.map((star) => (
        <span
          key={`${star.top}-${star.left}`}
          className="absolute animate-twinkle rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: "var(--star)",
            animationDelay: star.delay,
          }}
        />
      ))}

      {/* Sun / moon disc with a soft glow. */}
      <motion.div
        style={{ y: sunY }}
        className="absolute right-[16%] top-[22%] size-28 rounded-full sm:size-36"
      >
        <span
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ backgroundColor: "color-mix(in oklab, var(--sun) 70%, transparent)" }}
        />
        <span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: "var(--sun)" }}
        />
      </motion.div>
    </div>
  );
}
