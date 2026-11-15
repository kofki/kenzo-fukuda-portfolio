"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { BeachScene } from "@/components/home/BeachScene";
import { Bubbles } from "@/components/home/Bubbles";
import { WaterMood } from "@/components/home/WaterMood";
import { LiveScene } from "@/components/home/LiveScene";
import { LightRays } from "@/components/home/SeaLife";
import { useReducedMotion } from "@/lib/useReducedMotion";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** 0 → 1 as scroll progress goes from `from` to `to`, clamped. */
const ramp = (v: number, from: number, to: number) => clamp01((v - from) / (to - from));

function useRamp(progress: MotionValue<number>, map: (v: number) => number | string) {
  return useTransform(progress, map);
}

/**
 * Transition 1, the dive. The hero holds still for a stretch of scrolling
 * while the camera plunges into the sea: the beach zooms in on the water just
 * below the horizon, faster and faster, the name falls away, and the screen
 * goes under. Underneath, light comes down through the water and bubbles
 * rise. Then the frame releases and Projects carries on from the same water
 * colour, so the dive keeps going down without a line.
 *
 * The sticky frame is a size container: the beach and the hero text both size
 * themselves from it (cqh / cqw), so they stay locked together even when the
 * frame's 620px minimum is taller than the window.
 *
 * Reduced motion: no pin and no dive, just the hero.
 */
export function HeroDive({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Accelerating zoom, like falling towards the water.
  const zoom = useRamp(p, (v) => 1 + 11 * Math.pow(ramp(v, 0.03, 0.78), 2.4));
  const textOpacity = useRamp(p, (v) => 1 - ramp(v, 0.02, 0.22));
  const textY = useRamp(p, (v) => `${-ramp(v, 0.02, 0.3) * 18}%`);
  // The surface: a bright flash of foam as you break through it.
  const splash = useRamp(p, (v) => {
    const t = ramp(v, 0.5, 0.74);
    return Math.sin(t * Math.PI) * 0.85;
  });
  const under = useRamp(p, (v) => ramp(v, 0.56, 0.76));
  const underScale = useRamp(p, (v) => 1.25 - 0.25 * ramp(v, 0.56, 1));

  if (reduced) {
    return (
      <div ref={ref} className="relative">
        <LiveScene className="relative h-[100svh] min-h-[620px] overflow-hidden [container-type:size]">
          <BeachScene />
          {children}
        </LiveScene>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[220svh] max-sm:h-[190svh]">
      <LiveScene className="sticky top-0 h-[100svh] min-h-[620px] overflow-hidden bg-[#2f6f8c] [container-type:size]">
        {/* Zoom aims at the sea a little below the horizon (the horizon is
            max(24.6cqh, 16.4cqw) up from the bottom of the frame). */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale: zoom, transformOrigin: "50% calc(100% - max(15cqh, 10cqw))" }}
        >
          <BeachScene />
        </motion.div>
        <motion.div className="pointer-events-none absolute inset-0 z-20 will-change-transform [&>*]:h-full" style={{ opacity: textOpacity, y: textY }}>
          {children}
        </motion.div>

        {/* Breaking the surface. */}
        <motion.div
          aria-hidden
          style={{ opacity: splash }}
          className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(ellipse_at_50%_70%,#f2ead6_0%,#c9e0dc_35%,#6fa8b6_75%,#3f7f98_100%)]"
        />

        {/* Under the water: the same colours Projects starts with. */}
        <motion.div aria-hidden style={{ opacity: under }} className="pointer-events-none absolute inset-0 z-30">
          <motion.div style={{ scale: underScale }} className="absolute inset-0 will-change-transform">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#5d9db0_0%,#3c7f9a_30%,#2a6888_65%,#1f5a80_100%)]" />
            <LightRays side="right" />
            <LightRays side="left" />
          </motion.div>
          <Bubbles count={6} />
          <WaterMood />
        </motion.div>
      </LiveScene>
    </div>
  );
}
