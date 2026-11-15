"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { BeachScene } from "@/components/home/BeachScene";
import { LiveScene } from "@/components/home/LiveScene";
import { useReducedMotion } from "@/lib/useReducedMotion";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** 0 → 1 as scroll progress goes from `from` to `to`, clamped. */
const ramp = (v: number, from: number, to: number) => clamp01((v - from) / (to - from));

// A foam line that repeats every 1440 units, drawn twice so it can scroll
// sideways forever without a visible seam.
function foamPath(phase: number, amp: number) {
  const pts: string[] = [];
  for (let x = 0; x <= 2880; x += 24) {
    const t = (x / 1440) * Math.PI * 2;
    const y = 18 + amp * Math.sin(3 * t + phase) + amp * 0.6 * Math.sin(7 * t + 1 + phase) + amp * 0.35 * Math.sin(13 * t + 2 + phase);
    pts.push(`${x} ${y.toFixed(1)}`);
  }
  return `M0 40 L${pts.join(" L")} L2880 40 Z`;
}
const FOAM_FRONT = foamPath(0, 6);
const FOAM_BACK = foamPath(1.7, 5);

/** Where the waterline starts climbing the screen, as a share of the scroll. */
const DIP = 0.5;

/**
 * Where the dive breaks the surface, as a share of the hero's pinned scroll.
 * `SeaBackdrop` starts at exactly this point, so keep the two in step.
 */
export const SURFACE = 0.86;

/**
 * Transition 1, the dive. The hero holds still while the camera leans in
 * towards the sea and the name falls away. Then the camera dips under: the
 * waterline, edged with foam, climbs up the screen. Below it is the water
 * itself (`SeaBackdrop`, the surface seen from below with sunlight coming
 * down); above it the beach is still there, until the line passes the top.
 * From there you just keep sinking into Projects.
 *
 * The zoom stays gentle, so the print never looks soft, and the cut-out waves
 * hold still while it runs, so their edges never come apart.
 *
 * The sticky frame is a size container: the beach and the hero text both size
 * themselves from it (cqh / cqw), so they stay locked together even when the
 * frame's 620px minimum is taller than the window.
 *
 * Reduced motion: no pin and no dive, just the hero.
 */
export function HeroDive({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const zoom = useTransform(p, (v) => 1 + 0.4 * Math.pow(ramp(v, 0.02, SURFACE), 1.4));
  const textOpacity = useTransform(p, (v) => 1 - ramp(v, 0.02, 0.24));
  const textY = useTransform(p, (v) => `${-ramp(v, 0.02, 0.3) * 18}%`);
  // The waterline: 0 at the bottom of the screen, 1 past the top. The beach
  // sits in a box whose bottom edge rides up with it (the box moves up, its
  // contents move back down by the same amount), all in transforms.
  const line = (v: number) => Math.pow(ramp(v, DIP, SURFACE), 0.9);
  const boxY = useTransform(p, (v) => `${-line(v) * 100}%`);
  const innerY = useTransform(p, (v) => `${line(v) * 100}%`);
  const foamY = useTransform(p, (v) => `${-line(v) * 100}cqh`);
  const foamOpacity = useTransform(p, (v) => (v < DIP || v > SURFACE + 0.02 ? 0 : 1));

  useMotionValueEvent(p, "change", (v) => {
    const el = frame.current;
    if (!el) return;
    if (v > 0.015) el.dataset.diving = "";
    else delete el.dataset.diving;
  });

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
    <div ref={ref} className="relative h-[200svh] max-sm:h-[170svh]">
      <div ref={frame} className="sticky top-0 h-[100svh] min-h-[620px]">
        <LiveScene className="absolute inset-0 overflow-hidden [container-type:size]">
          <motion.div className="absolute inset-0 overflow-hidden will-change-transform" style={{ y: boxY }}>
            <motion.div className="absolute inset-0 will-change-transform" style={{ y: innerY }}>
              {/* Lean in on the sea a little below the horizon (the horizon
                  is max(24.6cqh, 16.4cqw) up from the bottom of the frame). */}
              <motion.div
                className="absolute inset-0 will-change-transform"
                style={{ scale: zoom, transformOrigin: "50% calc(100% - max(15cqh, 10cqw))" }}
              >
                <BeachScene />
              </motion.div>
              <motion.div className="pointer-events-none absolute inset-0 z-20 will-change-transform [&>*]:h-full" style={{ opacity: textOpacity, y: textY }}>
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
          {/* The foam along the waterline as it climbs. */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[30px] translate-y-[60%] overflow-hidden will-change-transform"
            style={{ y: foamY, opacity: foamOpacity }}
          >
            <svg viewBox="0 0 2880 40" preserveAspectRatio="none" className="absolute inset-y-0 left-0 h-full w-[200%] animate-[wave-x_19s_linear_infinite] opacity-70">
              <path d={FOAM_BACK} fill="#c9d6d4" />
            </svg>
            <svg viewBox="0 0 2880 40" preserveAspectRatio="none" className="absolute inset-y-0 left-0 h-full w-[200%] animate-[wave-x_12s_linear_infinite_reverse]">
              <path d={FOAM_FRONT} fill="#e9dcc0" />
            </svg>
          </motion.div>
        </LiveScene>
      </div>
    </div>
  );
}
