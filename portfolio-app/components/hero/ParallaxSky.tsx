"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useTheme } from "@/app/providers";
import { MoonPhase } from "@/components/hero/MoonPhase";
import { Sun } from "@/components/hero/Sun";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Deterministic star field - fixed positions avoid SSR hydration mismatch.
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

/**
 * The celestial layer of the hero: a textured sun by day, a real-phase moon by
 * night, plus a soft glow, stars, and scroll parallax.
 */
export function ParallaxSky() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { effective } = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "60%"]);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Soft sun / horizon glow (additive over the world gradient). */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 72% 28%, color-mix(in oklab, var(--sun) 45%, transparent), transparent 70%), radial-gradient(50% 45% at 20% 12%, color-mix(in oklab, var(--coral) 18%, transparent), transparent 70%)",
        }}
      />

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

      {/* Sun / moon disc with parallax. */}
      <motion.div
        style={{ y: sunY }}
        className="absolute right-[16%] top-[20%] size-28 sm:size-36"
      >
        {effective === "dark" ? (
          <MoonPhase className="absolute inset-0 h-full w-full" />
        ) : (
          <Sun className="absolute inset-0" />
        )}
      </motion.div>
    </div>
  );
}
